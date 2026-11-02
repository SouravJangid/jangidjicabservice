import { indianLocations } from '../services/contentCatalog';

export interface IndianLocation {
  name: string;
  state: string;
  lat: number;
  lng: number;
  category: 'primary' | 'airport' | 'pilgrimage' | 'city' | 'railway';
  aliases?: string[];
}

export const POPULAR_INDIAN_LOCATIONS = indianLocations as IndianLocation[];

const ROUTE_ESTIMATES: Record<string, { km: number; duration: string; durationSec: number }> = {};

// Great-circle Haversine formula
export function haversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Estimates road distance from coordinates accounting for Indian road sinuosity
export function estimateRoadDistanceAndDuration(
  origin: { lat: number; lng: number; name?: string },
  destination: { lat: number; lng: number; name?: string }
): { km: number; duration: string; durationSec: number } {
  // Use any configured route estimates before falling back to an approximation.
  const oName = (origin.name || '').toLowerCase();
  const dName = (destination.name || '').toLowerCase();

  for (const [key, val] of Object.entries(ROUTE_ESTIMATES)) {
    const [kOrigin, kDest] = key.split('-');
    if (
      (oName.includes(kOrigin) && dName.includes(kDest)) ||
      (oName.includes(kDest) && dName.includes(kOrigin))
    ) {
      return val;
    }
  }

  const straightKm = haversineDistanceKm(origin.lat, origin.lng, destination.lat, destination.lng);
  
  // Indian road factor: Expressways/plains ~1.25x, Hilly terrain ~1.45x
  const isHilly = origin.lat > 29.5 || destination.lat > 29.5;
  const roadFactor = isHilly ? 1.42 : 1.28;
  const roadKm = Math.round(Math.max(straightKm * roadFactor, 12) * 10) / 10;

  // Average speed in India: 48-60 km/h overall accounting for tolls, city exits, speed limits
  const avgSpeedKmh = isHilly ? 38 : 52;
  const hours = roadKm / avgSpeedKmh;
  const durationSec = Math.round(hours * 3600);

  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  const durationStr = h > 0 ? `${h}h ${m}m` : `${m}m`;

  return {
    km: roadKm,
    duration: durationStr,
    durationSec
  };
}

export function findLocationByName(query: string): IndianLocation | undefined {
  const q = query.trim().toLowerCase();
  if (!q) return undefined;
  const locations = indianLocations as IndianLocation[];

  // Exact or alias match
  const match = locations.find(loc => {
    if (loc.name.toLowerCase() === q) return true;
    return loc.aliases?.some(a => a.toLowerCase() === q) ?? false;
  });

  return match;
}

// Generate intermediate bezier-curved points between two coordinates for smooth map route visualization
export function generateRoutePoints(
  start: [number, number],
  end: [number, number],
  numPoints = 25
): [number, number][] {
  const points: [number, number][] = [];
  const [lat1, lon1] = start;
  const [lat2, lon2] = end;

  // Create subtle curvature representing highway deviations
  const midLat = (lat1 + lat2) / 2 + (lon2 - lon1) * 0.08;
  const midLon = (lon1 + lon2) / 2 - (lat2 - lat1) * 0.08;

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    // Quadratic Bezier formula
    const lat = (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * midLat + t * t * lat2;
    const lon = (1 - t) * (1 - t) * lon1 + 2 * (1 - t) * t * midLon + t * t * lon2;
    points.push([lat, lon]);
  }

  return points;
}
