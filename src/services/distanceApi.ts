import type { Request, Response } from 'express';
import { calculateFare } from '../lib/fare.ts';
import {
  estimateRoadDistanceAndDuration,
  findLocationByName,
  generateRoutePoints
} from '../lib/indianPlaces.ts';
import { fleetData } from '../content/data.ts';

type GeocodedPlace = { lat: number; lng: number };

const geocodeCache = new Map<string, { place: GeocodedPlace; expiresAt: number }>();

async function geocodeIndianAddress(address: string): Promise<GeocodedPlace | undefined> {
  const cacheKey = address.trim().toLowerCase();
  const cached = geocodeCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.place;
  if (cached) geocodeCache.delete(cacheKey);

  const query = /\bindia\b/i.test(address) ? address : `${address}, India`;
  const url = new URL('https://photon.komoot.io/api/');
  url.searchParams.set('q', query);
  url.searchParams.set('limit', '5');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'JangidJiCabService/1.0' }
    });
    if (!response.ok) return undefined;

    const payload = await response.json();
    const feature = payload.features?.find((item: any) => item.properties?.countrycode === 'IN');
    const [lng, lat] = feature?.geometry?.coordinates ?? [];
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < 6 || lat > 38 || lng < 67 || lng > 98) {
      return undefined;
    }

    const place = { lat, lng };
    if (geocodeCache.size >= 500) geocodeCache.delete(geocodeCache.keys().next().value!);
    geocodeCache.set(cacheKey, { place, expiresAt: Date.now() + 24 * 60 * 60 * 1000 });
    return place;
  } catch {
    return undefined;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function handleDistanceRequest(req: Request, res: Response): Promise<void> {
  try {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      res.status(400).json({ error: 'Request body must be a JSON object.' });
      return;
    }

    const {
      originName,
      destName,
      originLat,
      originLng,
      destLat,
      destLng,
      car = fleetData[0]?.id ?? '',
      tripType = 'oneway',
      days = 1,
      isNight = false
    } = req.body;

    if (
      typeof originName !== 'string' || typeof destName !== 'string' ||
      !originName.trim() || !destName.trim() ||
      originName.length > 250 || destName.length > 250
    ) {
      res.status(400).json({ error: 'Pickup and destination are required (up to 250 characters each).' });
      return;
    }

    const hasOriginCoordinates = originLat !== undefined || originLng !== undefined;
    const hasDestinationCoordinates = destLat !== undefined || destLng !== undefined;
    const isValidCoordinates = (lat: unknown, lng: unknown) =>
      typeof lat === 'number' && Number.isFinite(lat) && lat >= -90 && lat <= 90 &&
      typeof lng === 'number' && Number.isFinite(lng) && lng >= -180 && lng <= 180;

    if (
      (hasOriginCoordinates && !isValidCoordinates(originLat, originLng)) ||
      (hasDestinationCoordinates && !isValidCoordinates(destLat, destLng))
    ) {
      res.status(400).json({ error: 'Coordinates must contain valid latitude and longitude values.' });
      return;
    }

    const [originPlace, destinationPlace] = await Promise.all([
      hasOriginCoordinates
        ? Promise.resolve({ lat: originLat as number, lng: originLng as number })
        : Promise.resolve(findLocationByName(originName)).then((place) => place ?? geocodeIndianAddress(originName)),
      hasDestinationCoordinates
        ? Promise.resolve({ lat: destLat as number, lng: destLng as number })
        : Promise.resolve(findLocationByName(destName)).then((place) => place ?? geocodeIndianAddress(destName))
    ]);

    if (!originPlace || !destinationPlace) {
      res.status(422).json({ error: 'Could not locate one or both places. Try a more complete address in India.' });
      return;
    }

    const startLat = originPlace.lat;
    const startLng = originPlace.lng;
    const endLat = destinationPlace.lat;
    const endLng = destinationPlace.lng;
    let distanceKm = 0;
    let durationStr = '';
    let durationSeconds = 0;
    let routePoints: [number, number][] = [];

    if (process.env.GMAPS_SERVER_KEY) {
      try {
        const gRes = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': process.env.GMAPS_SERVER_KEY,
            'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline'
          },
          body: JSON.stringify({
            origin: { location: { latLng: { latitude: startLat, longitude: startLng } } },
            destination: { location: { latLng: { latitude: endLat, longitude: endLng } } },
            travelMode: 'DRIVE',
            routingPreference: 'TRAFFIC_AWARE',
            regionCode: 'IN'
          })
        });

        if (gRes.ok) {
          const gData = await gRes.json();
          const route = gData.routes?.[0];
          if (route) {
            distanceKm = Math.round((route.distanceMeters / 1000) * 10) / 10;
            durationSeconds = parseInt(route.duration) || 3600;
            durationStr = `${Math.floor(durationSeconds / 3600)}h ${Math.round((durationSeconds % 3600) / 60)}m`;
          }
        }
      } catch {
        // Continue with the public routing service or local estimate.
      }
    }

    if (distanceKm === 0) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);
      try {
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=simplified&geometries=geojson`;
        const osrmRes = await fetch(osrmUrl, { signal: controller.signal });
        if (osrmRes.ok) {
          const osrmData = await osrmRes.json();
          const primaryRoute = osrmData.routes?.[0];
          if (primaryRoute) {
            distanceKm = Math.round((primaryRoute.distance / 1000) * 10) / 10;
            durationSeconds = Math.round(primaryRoute.duration);
            const hours = Math.floor(durationSeconds / 3600);
            const minutes = Math.round((durationSeconds % 3600) / 60);
            durationStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
            if (primaryRoute.geometry?.coordinates) {
              routePoints = primaryRoute.geometry.coordinates.map((coordinates: [number, number]) => [
                coordinates[1],
                coordinates[0]
              ]);
            }
          }
        }
      } catch {
        // Continue with the local estimate if the public routing service is unavailable.
      } finally {
        clearTimeout(timeoutId);
      }
    }

    if (distanceKm === 0) {
      const estimate = estimateRoadDistanceAndDuration(
        { lat: startLat, lng: startLng, name: originName },
        { lat: endLat, lng: endLng, name: destName }
      );
      distanceKm = estimate.km;
      durationStr = estimate.duration;
      durationSeconds = estimate.durationSec;
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

    res.json({
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
  } catch (error) {
    console.error('Distance route error:', error);
    res.status(500).json({ error: 'Failed to calculate distance' });
  }
}
