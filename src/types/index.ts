export interface BrandInfo {
  name: string;
  driverName: string;
  tagline: string;
  tagline_hi: string;
  baseCity: string;
  district: string;
  state: string;
  country: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  operatingHours: string;
  availabilityText: string;
  mapsLink: string;
  baseLocation: { lat: number; lng: number };
}

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  modelYear: number;
  models: string;
  seats: number;
  luggage: string;
  ac: boolean;
  ratePerKm: number;
  minFare: number;
  imageUrl?: string;
  badge?: string;
  features: string[];
  bestFor: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  title_hi: string;
  tagline: string;
  text: string;
  text_hi: string;
  highlights: string[];
}

export interface RouteItem {
  slug: string;
  from: string;
  to: string;
  approxKm: number;
  approxTime: string;
  title: string;
  title_hi: string;
  intro: string;
  intro_hi: string;
  popularFor: string;
  tollNote: string;
  faq?: { q: string; a: string }[];
}

export interface ReviewItem {
  name: string;
  city: string;
  rating: number;
  route: string;
  text: string;
  text_hi?: string;
  date: string;
  verified: boolean;
}

export interface FaqItem {
  q: string;
  q_hi: string;
  a: string;
  a_hi: string;
  category: string;
}

export interface PricingConfig {
  currency: string;
  rates: Record<string, { perKm: number; minFare: number; minKmPerDay: number; driverAllowancePerNight: number; waitingPerHour: number }>;
  nightCharge: { enabled: boolean; from: string; to: string; amount: number };
  notes: string[];
}

export interface DistanceCalculationResult {
  from: string;
  to: string;
  km: number;
  duration: string;
  durationSeconds: number;
  fare: number;
  car: string;
  tripType: 'oneway' | 'round';
  days: number;
  nightChargeApplied: boolean;
  tollNote: string;
  coordinates: {
    origin: [number, number]; // [lat, lng]
    dest: [number, number];   // [lat, lng]
  };
  polylinePoints?: [number, number][];
}
