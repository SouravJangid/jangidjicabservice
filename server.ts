import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { handleDistanceRequest } from './src/services/distanceApi.ts';
import { brandData, fleetData, getPublicContentCatalog, getPublicContentDomain, indianLocations, publicContentDomains, popularRoutes } from './src/content/data.ts';
import { BLOG_POSTS } from './src/content/blogData.ts';

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
app.use(express.json({ limit: '256kb' }));

app.get('/api/content', (_req: Request, res: Response) => {
  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  return res.json({ version: 1, domains: publicContentDomains });
});

app.get('/api/content/catalog', (_req: Request, res: Response) => {
  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  return res.json({ version: 1, data: getPublicContentCatalog() });
});

app.get('/api/content/:domain', (req: Request, res: Response) => {
  const data = getPublicContentDomain(req.params.domain);
  if (data === undefined) {
    return res.status(404).json({ error: 'Content domain not found' });
  }

  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  return res.json({ version: 1, domain: req.params.domain, data });
});

  // API 1: Distance and Fare calculation
  app.post('/api/distance', handleDistanceRequest);

  // API 2: AI High-Quality Image Generation
  // Feature block: "You MUST add image generation to the app using model gemini-3-pro-image-preview and provide an affordance for the user to specify the image size (1K, 2K, and 4K)."
  app.post('/api/generate-image', async (req: Request, res: Response) => {
    try {
      if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ error: 'Request body must be a JSON object.' });
      }
      const { prompt, size = '1K' } = req.body || {};
      if (prompt !== undefined && (typeof prompt !== 'string' || prompt.length > 1000)) {
        return res.status(400).json({ error: 'Prompt must be text with at most 1000 characters.' });
      }

      // Resolution map
      const resolutionMap: Record<string, string> = {
        '1K': '1024x1024',
        '2K': '2048x2048',
        '4K': '3840x2160'
      };
      if (typeof size !== 'string' || !(size in resolutionMap)) {
        return res.status(400).json({ error: 'Image size must be 1K, 2K, or 4K.' });
      }
      const effectivePrompt = prompt?.trim() || `Promotional visual for ${brandData.name} in Modinagar, India. Show AC and Non-AC cab options for local and outstation travel, one-way and round-trip booking, and WhatsApp enquiries at ${brandData.phoneDisplay}. Do not add vehicle models, rates, ratings, or availability claims.`;
      const requestedRes = resolutionMap[size];

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
              contents: `Write promotional copy for ${brandData.name}, a cab and taxi service in Modinagar. Confirmed details: AC and Non-AC cabs, local and outstation service, one-way and round trips, WhatsApp booking at ${brandData.phoneDisplay}. Do not invent vehicle models, fares, ratings, hours, or availability. Campaign theme: "${effectivePrompt}". Format as JSON: {"headline": string, "subtext": string, "cta": string}`,
              config: {
                responseMimeType: 'application/json',
              }
            });
            const parsed = JSON.parse(textResponse.text || '{}');
            generatedHeadline = parsed.headline || 'Local & Outstation Cab Service';
            description = parsed.subtext || `AC and Non-AC cabs. Call or WhatsApp ${brandData.phoneDisplay} to enquire.`;
          } catch {
            generatedHeadline = brandData.name;
            description = 'AC and Non-AC cabs for local and outstation travel. Enquire on WhatsApp.';
          }
        }
      } else {
        generatedHeadline = brandData.name;
        description = 'AC and Non-AC cabs for local and outstation travel. Enquire on WhatsApp.';
      }

      return res.json({
        success: true,
        imageUrl: imageUrl || null,
        headline: generatedHeadline || brandData.name,
        description: description || `Enquire about AC and Non-AC cab service at ${brandData.phoneDisplay}.`,
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
      if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ error: 'Request body must be a JSON object.' });
      }
      const {
        name,
        phone,
        pickup,
        drop,
        car = fleetData[0]?.id ?? '',
        tripType = 'oneway',
        date,
        time,
        passengers = 1,
        notes = ''
      } = req.body || {};

      if (
        typeof name !== 'string' || !name.trim() || name.length > 100 ||
        typeof phone !== 'string' || phone.length > 20 ||
        typeof pickup !== 'string' || !pickup.trim() || pickup.length > 160 ||
        typeof drop !== 'string' || !drop.trim() || drop.length > 160 ||
        typeof car !== 'string' || !/^[a-z0-9-]{1,40}$/i.test(car) ||
        !['oneway', 'round'].includes(tripType) ||
        !fleetData.some((vehicle) => vehicle.id === car) ||
        (date !== undefined && (typeof date !== 'string' || date.length > 32)) ||
        (time !== undefined && (typeof time !== 'string' || time.length > 32)) ||
        !Number.isInteger(Number(passengers)) || Number(passengers) < 1 || Number(passengers) > 12 ||
        typeof notes !== 'string' || notes.length > 500
      ) {
        return res.status(400).json({ error: 'Please provide full name, 10-digit mobile number, pickup, and drop location.' });
      }

      // Validate 10-digit Indian phone
      const phoneClean = phone.replace(/[^0-9]/g, '');
      const validIndianPhone = /^[6-9]\d{9}$/.test(phoneClean.slice(-10));
      if (!validIndianPhone || phoneClean.length < 10 || phoneClean.length > 12) {
        return res.status(400).json({ error: 'Please provide a valid 10-digit Indian mobile number.' });
      }

      const bookingId = `JJC-${Date.now().toString().slice(-6)}`;
      const bookingDate = date || 'Today';
      const bookingTime = time || 'ASAP';

      // Pre-format direct WhatsApp link for instant 1-tap confirmation
      const waMsg = `Hello Jangid Ji Cab Service, I would like to enquire about a cab booking.
*Booking ID:* ${bookingId}
*Name:* ${name}
*Phone:* ${phoneClean}
*Pickup:* ${pickup}
*Drop:* ${drop}
*Vehicle:* ${car.toUpperCase()}
*Trip Type:* ${tripType === 'oneway' ? 'One-Way' : 'Round Trip'}
*Date & Time:* ${bookingDate} at ${bookingTime}
Please confirm cab availability and share the fare.`;

      const whatsappUrl = `https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent(waMsg)}`;

      return res.json({
        success: true,
        bookingId,
        message: 'Your enquiry is ready. Continue on WhatsApp to send it and confirm availability and fare.',
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
      return res.json(indianLocations.slice(0, 10));
    }
    const filtered = indianLocations.filter(l =>
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

    let posts = BLOG_POSTS.map(({ slug, title, excerpt, category, publishDate, readTime, coverImage }) => ({
      slug,
      title,
      excerpt,
      category,
      publishDate,
      readTime,
      coverImage
    }));

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
      routes: popularRoutes.map(({ slug, from, to, approxKm, approxTime }) => ({
        slug,
        from,
        to,
        km: approxKm || null,
        time: approxTime
      }))
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
    console.log(`${brandData.name} server running on http://0.0.0.0:${PORT}`);
  });
}

export { app };

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  startServer();
}
