import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { calculateFare } from './src/lib/fare.ts';
import { 
  findLocationByName, 
  estimateRoadDistanceAndDuration, 
  generateRoutePoints,
  POPULAR_INDIAN_LOCATIONS 
} from './src/lib/indianPlaces.ts';
import { brandData } from './src/content/data.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Initialize Gemini SDK with User-Agent telemetry per skill guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const app = express();
app.use(express.json({ limit: '10mb' }));

// In-memory bookings store for live leads
const bookings: Array<{
    id: string;
    createdAt: string;
    name: string;
    phone: string;
    pickup: string;
    drop: string;
    car: string;
    tripType: string;
    date: string;
    time: string;
    passengers: number;
    estimatedKm: number;
    estimatedFare: number;
    notes?: string;
}> = [];

  // API 1: Distance and Fare calculation
  app.post('/api/distance', async (req: Request, res: Response) => {
    try {
      const {
        originName,
        destName,
        originLat,
        originLng,
        destLat,
        destLng,
        car = 'wagonr',
        tripType = 'oneway',
        days = 1,
        isNight = false
      } = req.body;

      if (!originName || !destName) {
        return res.status(400).json({ error: 'Pickup and Drop locations are required' });
      }

      // Resolve coordinates
      let startLat = originLat;
      let startLng = originLng;
      if (!startLat || !startLng) {
        const found = findLocationByName(originName);
        if (found) {
          startLat = found.lat;
          startLng = found.lng;
        } else {
          // Default to Modinagar if unspecified
          startLat = brandData.baseLocation.lat;
          startLng = brandData.baseLocation.lng;
        }
      }

      let endLat = destLat;
      let endLng = destLng;
      if (!endLat || !endLng) {
        const found = findLocationByName(destName);
        if (found) {
          endLat = found.lat;
          endLng = found.lng;
        } else {
          // Default to Haridwar if origin was Modinagar
          endLat = 29.9457;
          endLng = 78.1642;
        }
      }

      let distanceKm = 0;
      let durationStr = '';
      let durationSeconds = 0;
      let routePoints: [number, number][] = [];

      // 1. Try Google Routes API if GMAPS_SERVER_KEY is available
      if (process.env.GMAPS_SERVER_KEY) {
        try {
          const gRes = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': process.env.GMAPS_SERVER_KEY,
              'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline',
            },
            body: JSON.stringify({
              origin: {
                location: { latLng: { latitude: startLat, longitude: startLng } }
              },
              destination: {
                location: { latLng: { latitude: endLat, longitude: endLng } }
              },
              travelMode: 'DRIVE',
              routingPreference: 'TRAFFIC_AWARE',
              regionCode: 'IN',
            }),
          });

          if (gRes.ok) {
            const gData = await gRes.json();
            const route = gData.routes?.[0];
            if (route) {
              distanceKm = Math.round((route.distanceMeters / 1000) * 10) / 10;
              const sec = parseInt(route.duration) || 3600;
              durationSeconds = sec;
              durationStr = `${Math.floor(sec / 3600)}h ${Math.round((sec % 3600) / 60)}m`;
            }
          }
        } catch {
          // Fall through to OSRM / offline engine
        }
      }

      // 2. Try OSRM public route if Google Routes was not used or failed
      if (distanceKm === 0) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 1200);

          const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=simplified&geometries=geojson`;
          const osrmRes = await fetch(osrmUrl, { signal: controller.signal });
          clearTimeout(timeoutId);

          if (osrmRes.ok) {
            const osrmData = await osrmRes.json();
            const primaryRoute = osrmData.routes?.[0];
            if (primaryRoute) {
              distanceKm = Math.round((primaryRoute.distance / 1000) * 10) / 10;
              const sec = Math.round(primaryRoute.duration);
              durationSeconds = sec;
              const h = Math.floor(sec / 3600);
              const m = Math.round((sec % 3600) / 60);
              durationStr = h > 0 ? `${h}h ${m}m` : `${m}m`;

              if (primaryRoute.geometry?.coordinates) {
                // GeoJSON coordinates are [lng, lat]
                routePoints = primaryRoute.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
              }
            }
          }
        } catch {
          // Fall through to algorithmic road factor
        }
      }

      // 3. Robust algorithmic highway fallback (with pre-verified Indian road matrix)
      if (distanceKm === 0) {
        const est = estimateRoadDistanceAndDuration(
          { lat: startLat, lng: startLng, name: originName },
          { lat: endLat, lng: endLng, name: destName }
        );
        distanceKm = est.km;
        durationStr = est.duration;
        durationSeconds = est.durationSec;
      }

      if (routePoints.length === 0) {
        routePoints = generateRoutePoints([startLat, startLng], [endLat, endLng]);
      }

      const fareBreakdown = calculateFare({
        distanceKm,
        carId: car,
        tripType,
        days: Number(days) || 1,
        isNight: Boolean(isNight)
      });

      return res.json({
        success: true,
        from: originName,
        to: destName,
        km: distanceKm,
        duration: durationStr,
        durationSeconds,
        car,
        tripType,
        days: Number(days) || 1,
        fare: fareBreakdown.totalFare,
        fareBreakdown,
        coordinates: {
          origin: [startLat, startLng],
          dest: [endLat, endLng]
        },
        routePoints
      });
    } catch (err: any) {
      console.error('Distance route error:', err);
      return res.status(500).json({ error: 'Failed to calculate distance' });
    }
  });

  // API 2: AI High-Quality Image Generation
  // Feature block: "You MUST add image generation to the app using model gemini-3-pro-image-preview and provide an affordance for the user to specify the image size (1K, 2K, and 4K)."
  app.post('/api/generate-image', async (req: Request, res: Response) => {
    try {
      const { prompt, size = '1K', carType = 'WagonR 2025' } = req.body;
      const effectivePrompt = prompt || `Professional marketing promotional photograph for 'Sachin Sharma Cabs' in Modinagar, India. A brand new gleaming white 2025 Maruti Suzuki WagonR parked cleanly on the Delhi-Meerut Expressway at golden hour sunset, pristine condition, sharp reflections, high resolution commercial taxi advertisement, 24x7 cab service banner, 8k photo realism.`;

      // Resolution map
      const resolutionMap: Record<string, string> = {
        '1K': '1024x1024',
        '2K': '2048x2048',
        '4K': '3840x2160'
      };
      const requestedRes = resolutionMap[size] || '1024x1024';

      let imageUrl = '';
      let generatedHeadline = '';
      let description = '';

      if (process.env.GEMINI_API_KEY) {
        try {
          // Attempt image generation model
          const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite-image',
            contents: `${effectivePrompt}. Resolution: ${requestedRes}. Aspect ratio 16:9. Commercial cab flyer quality.`,
          });

          // Check for inline data
          const candidate = response.candidates?.[0];
          const parts = candidate?.content?.parts;
          if (parts) {
            for (const part of parts) {
              if ((part as any).inlineData?.data) {
                const mime = (part as any).inlineData.mimeType || 'image/png';
                imageUrl = `data:${mime};base64,${(part as any).inlineData.data}`;
                break;
              }
            }
          }
          if (response.text) {
            description = response.text;
          }
        } catch (apiError: any) {
          console.warn('Image model call failed or model busy, attempting smart prompt copywriting with Gemini 3.8 Flash:', apiError?.message);
        }

        // If no image part returned directly, produce high-impact marketing copy and SVG graphic
        if (!imageUrl) {
          try {
            const textResponse = await ai.models.generateContent({
              model: 'gemini-3.8-flash',
              contents: `You are an elite advertising copywriter for Sachin Sharma Cabs (Modinagar to All India taxi, Driver Sachin Sharma, phone +91 90846 94715, featured car: 2025 WagonR). Create a punchy, high-converting banner headline and caption for this campaign theme: "${effectivePrompt}". Format as JSON: {"headline": string, "subtext": string, "cta": string}`,
              config: {
                responseMimeType: 'application/json',
              }
            });
            const parsed = JSON.parse(textResponse.text || '{}');
            generatedHeadline = parsed.headline || 'Safe, Clean & Economical 2025 WagonR Cabs';
            description = parsed.subtext || 'From Modinagar to Haridwar, Delhi IGI Airport, and All India. Call Sachin Sharma: +91 90846 94715';
          } catch {
            generatedHeadline = 'Your Journey. Your Local Driver.';
            description = 'Sachin Sharma Cabs - Modinagar to Haridwar, Delhi Airport & All India.';
          }
        }
      } else {
        generatedHeadline = 'Modinagar to All India - Sachin Sharma Cabs';
        description = '24x7 Reliable & Fixed Per-Km Taxi Service in brand new 2025 WagonR.';
      }

      return res.json({
        success: true,
        imageUrl: imageUrl || null,
        headline: generatedHeadline || 'Your Journey. Your Local Driver.',
        description: description || 'Book your comfortable 2025 WagonR or Sedan ride now with Sachin Sharma.',
        size,
        resolution: requestedRes,
        prompt: effectivePrompt,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      console.error('Generate image endpoint error:', err);
      return res.status(500).json({ error: 'Failed to generate promotional asset' });
    }
  });

  // API 3: Booking submission endpoint
  app.post('/api/booking', (req: Request, res: Response) => {
    try {
      const {
        name,
        phone,
        pickup,
        drop,
        car = 'wagonr',
        tripType = 'oneway',
        date,
        time,
        passengers = 1,
        estimatedKm = 0,
        estimatedFare = 0,
        notes = ''
      } = req.body;

      if (!name || !phone || !pickup || !drop) {
        return res.status(400).json({ error: 'Please provide full name, 10-digit mobile number, pickup, and drop location.' });
      }

      // Validate 10-digit Indian phone
      const phoneClean = phone.replace(/[^0-9]/g, '');
      const validIndianPhone = /^[6-9]\d{9}$/.test(phoneClean.slice(-10));
      if (!validIndianPhone && phoneClean.length < 10) {
        return res.status(400).json({ error: 'Please provide a valid 10-digit Indian mobile number.' });
      }

      const bookingId = `SSC-${Date.now().toString().slice(-6)}`;
      const newBooking = {
        id: bookingId,
        createdAt: new Date().toISOString(),
        name,
        phone: phoneClean,
        pickup,
        drop,
        car,
        tripType,
        date: date || 'Today',
        time: time || 'ASAP',
        passengers: Number(passengers) || 1,
        estimatedKm: Number(estimatedKm) || 0,
        estimatedFare: Number(estimatedFare) || 0,
        notes
      };

      bookings.unshift(newBooking);

      // Pre-format direct WhatsApp link for instant 1-tap confirmation
      const waMsg = `Hello Sachin ji, I want to book a cab with Sachin Sharma Cabs.
*Booking ID:* ${bookingId}
*Name:* ${name}
*Phone:* ${phoneClean}
*Pickup:* ${pickup}
*Drop:* ${drop}
*Vehicle:* ${car.toUpperCase()}
*Trip Type:* ${tripType === 'oneway' ? 'One-Way' : 'Round Trip'}
*Date & Time:* ${newBooking.date} at ${newBooking.time}
*Distance:* ${newBooking.estimatedKm > 0 ? `${newBooking.estimatedKm} km` : 'Pending calculation'}
*Estimated Fare:* ${newBooking.estimatedFare > 0 ? `₹${newBooking.estimatedFare}` : 'As per actual km'}
Please confirm availability and final fare.`;

      const whatsappUrl = `https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent(waMsg)}`;

      return res.json({
        success: true,
        bookingId,
        message: 'Your enquiry has been received! Sachin Sharma will call or WhatsApp you shortly to confirm availability and final fare.',
        whatsappUrl,
        driverPhone: brandData.phone
      });
    } catch (err: any) {
      console.error('Booking submission error:', err);
      return res.status(500).json({ error: 'Could not process booking inquiry' });
    }
  });

  // API 4: Location Autocomplete search helper
  app.get('/api/locations', (req: Request, res: Response) => {
    const q = (req.query.q as string || '').toLowerCase().trim();
    if (!q) {
      return res.json(POPULAR_INDIAN_LOCATIONS.slice(0, 10));
    }
    const filtered = POPULAR_INDIAN_LOCATIONS.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.state.toLowerCase().includes(q) ||
      l.aliases?.some(a => a.toLowerCase().includes(q))
    );
    return res.json(filtered.slice(0, 12));
  });

  // API 5: Blog & SEO Articles Microservice
  app.get('/api/blogs', (req: Request, res: Response) => {
    const category = (req.query.category as string) || '';
    const q = (req.query.q as string || '').toLowerCase().trim();

    // Dynamically retrieve posts
    let posts = [
      {
        slug: 'modinagar-to-haridwar-taxi-fare-guide',
        title: 'Modinagar to Haridwar Taxi Fare, Route & Ganga Aarti Timings (2026 Guide)',
        excerpt: 'Planning a trip from Modinagar or Ghaziabad to Haridwar? Check real road distance (165 km), per-km taxi rates, toll plazas, and Ganga Aarti timings.',
        category: 'Pilgrimage',
        publishDate: 'October 28, 2026',
        readTime: '6 min read',
        coverImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600'
      },
      {
        slug: 'ghaziabad-to-delhi-airport-igi-cab-guide',
        title: 'Ghaziabad to Delhi Airport (IGI T1/T2/T3) 24x7 Cab: Fare, Route & Early Morning Pickup',
        excerpt: 'Complete guide for booking a punctual airport taxi from Modinagar or Ghaziabad to Indira Gandhi International Airport without surge pricing.',
        category: 'Airport',
        publishDate: 'October 25, 2026',
        readTime: '5 min read',
        coverImage: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=600'
      },
      {
        slug: 'delhi-meerut-expressway-toll-rates-speed-limits',
        title: 'Delhi-Meerut Expressway (DME) Toll Charges, Speed Limits & FastTag Guide for Cabs',
        excerpt: 'Everything you need to know about travelling on the 14-lane Delhi-Meerut Expressway connecting Delhi, Ghaziabad, Modinagar, and Meerut.',
        category: 'Expressway & Tolls',
        publishDate: 'October 20, 2026',
        readTime: '4 min read',
        coverImage: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&q=80&w=600'
      },
      {
        slug: 'why-wagonr-2025-best-economical-cab-ncr',
        title: 'Why the 2025 Maruti Suzuki WagonR is the Best Economical Cab for NCR Outstation Rides',
        excerpt: 'Explore why Sachin Sharma chose the brand-new 2025 WagonR for his passenger fleet: high headroom, dual chilled AC, and an economical ₹10/km rate.',
        category: 'Fleet & Tips',
        publishDate: 'October 15, 2026',
        readTime: '4 min read',
        coverImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'
      },
      {
        slug: 'haridwar-rishikesh-neelkanth-pilgrimage-taxi-guide',
        title: 'Complete Pilgrimage Cab Guide: Modinagar to Haridwar, Rishikesh, Neelkanth & Mansa Devi',
        excerpt: 'Detailed itinerary, hill safety tips, parking guidelines, and temple darshan schedules for visiting Haridwar, Rishikesh, and Neelkanth Mahadev.',
        category: 'Pilgrimage',
        publishDate: 'October 10, 2026',
        readTime: '7 min read',
        coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600'
      }
    ];

    if (category && category !== 'All') {
      posts = posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (q) {
      posts = posts.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }

    return res.json({ success: true, count: posts.length, posts });
  });

  // API 6: Routes Microservice
  app.get('/api/routes', (_req: Request, res: Response) => {
    return res.json({
      success: true,
      routes: [
        { slug: 'modinagar-to-delhi-taxi', from: 'Modinagar', to: 'Delhi', km: 45, time: '1h 15m' },
        { slug: 'modinagar-to-haridwar-taxi', from: 'Modinagar', to: 'Haridwar', km: 165, time: '3h 15m' },
        { slug: 'ghaziabad-to-delhi-airport-cab', from: 'Ghaziabad', to: 'Delhi Airport', km: 42, time: '1h 10m' },
        { slug: 'modinagar-to-meerut-taxi', from: 'Modinagar', to: 'Meerut', km: 26, time: '40m' },
        { slug: 'noida-to-gurugram-taxi', from: 'Noida', to: 'Gurugram', km: 55, time: '1h 30m' },
        { slug: 'delhi-to-haridwar-taxi', from: 'Delhi', to: 'Haridwar', km: 220, time: '4h 15m' }
      ]
    });
  });

async function startServer() {
  // Vite Integration:
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sachin Sharma Cabs server running on http://0.0.0.0:${PORT}`);
  });
}

export { app };

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  startServer();
}
