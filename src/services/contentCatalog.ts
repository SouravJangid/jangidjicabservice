import rawContent from '../data/content.json';
import {
  BrandInfo,
  FaqItem,
  PricingConfig,
  RouteItem,
  ServiceItem,
  Vehicle
} from '../types';
import { BlogPost } from '../types/blog';

let raw = rawContent;
const requiredArrays = ['fleet', 'services', 'routes', 'locations', 'reviews', 'faqs', 'blogs'] as const;

function isSafeAsset(value: string) {
  if (value.startsWith('/') && !value.startsWith('//') && !value.includes('\\') && !value.split('/').includes('..')) return true;
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

function validateCatalog(catalog: typeof rawContent = raw) {
  if (!catalog.brand?.name || !/^\+?[0-9]{10,15}$/.test(catalog.brand.phone) || !/^[0-9]{10,15}$/.test(catalog.brand.whatsapp)) {
    throw new Error('Content catalog has an invalid business name or phone number.');
  }

  for (const key of requiredArrays) {
    if (!Array.isArray(catalog[key])) {
      throw new Error(`Content catalog field "${key}" must be an array.`);
    }
  }

  const maximumItems: Record<(typeof requiredArrays)[number], number> = {
    fleet: 30,
    services: 50,
    routes: 250,
    locations: 300,
    reviews: 100,
    faqs: 100,
    blogs: 250
  };
  for (const key of requiredArrays) {
    if (catalog[key].length > maximumItems[key]) {
      throw new Error(`Content catalog field "${key}" exceeds ${maximumItems[key]} items.`);
    }
  }
  if (catalog.fleet.length === 0 || catalog.services.length === 0 || catalog.locations.length === 0) {
    throw new Error('Content catalog must include at least one fleet item, service, and location.');
  }

  const requiredComponents = ['hero', 'fleet', 'routes', 'services', 'reviews'] as const;
  for (const section of requiredComponents) {
    if (!catalog.components[section] || typeof catalog.components[section] !== 'object') {
      throw new Error(`Content catalog component copy "${section}" is required.`);
    }
  }

  for (const assetKey of ['cabAc', 'cabNonAc'] as const) {
    if (!isSafeAsset(catalog.assets[assetKey])) {
      throw new Error(`Content catalog requires a valid "${assetKey}" image.`);
    }
  }

  const routeSlugs = catalog.routes.map((route) => route.slug);
  if (routeSlugs.some((slug) => !slug) || new Set(routeSlugs).size !== routeSlugs.length) {
    throw new Error('Content catalog route slugs must be present and unique.');
  }

  const fleetIds = catalog.fleet.map((vehicle) => vehicle.id);
  if (fleetIds.some((id) => !id) || new Set(fleetIds).size !== fleetIds.length) {
    throw new Error('Content catalog vehicle IDs must be present and unique.');
  }

  const serviceIds = catalog.services.map((service) => service.id);
  if (serviceIds.some((id) => !id) || new Set(serviceIds).size !== serviceIds.length) {
    throw new Error('Content catalog service IDs must be present and unique.');
  }

  for (const [vehicleId, rate] of Object.entries(catalog.pricing.rates)) {
    for (const [field, value] of Object.entries(rate)) {
      if (value !== null && (typeof value !== 'number' || !Number.isFinite(value) || value < 0)) {
        throw new Error(`Pricing field "${vehicleId}.${field}" must be null or a non-negative number.`);
      }
    }
  }

  for (const vehicle of catalog.fleet) {
    if (vehicle.image && !(vehicle.image in catalog.assets)) {
      throw new Error(`Vehicle "${vehicle.id}" references an unknown image key.`);
    }
    if (typeof vehicle.name !== 'string' || typeof vehicle.ac !== 'boolean') {
      throw new Error(`Vehicle "${vehicle.id}" has invalid required fields.`);
    }
  }

  for (const location of catalog.locations) {
    if (
      typeof location.name !== 'string' ||
      !Number.isFinite(location.lat) ||
      !Number.isFinite(location.lng) ||
      location.lat < -90 || location.lat > 90 ||
      location.lng < -180 || location.lng > 180
    ) {
      throw new Error('Each location must include a name and valid latitude/longitude coordinates.');
    }
  }

  const blogSlugs = catalog.blogs.map((post) => post.slug);
  if (blogSlugs.some((slug) => !slug) || new Set(blogSlugs).size !== blogSlugs.length) {
    throw new Error('Content catalog blog slugs must be present and unique.');
  }

  for (const post of catalog.blogs) {
    if (!(post.coverImageKey in catalog.assets) || !(post.authorImageKey in catalog.assets)) {
      throw new Error(`Blog "${post.slug}" references an unknown image key.`);
    }
  }

  for (const [key, value] of Object.entries(catalog.assets)) {
    if (typeof value !== 'string' || (value && !isSafeAsset(value))) {
      throw new Error(`Content asset "${key}" must use HTTPS or a site-relative URL.`);
    }
  }

  for (const reviewValue of catalog.reviews as unknown[]) {
    if (!reviewValue || typeof reviewValue !== 'object') {
      throw new Error('Each review must be an object.');
    }
    const review = reviewValue as Record<string, unknown>;
    if (
      typeof review.name !== 'string' ||
      typeof review.rating !== 'number' ||
      !Number.isInteger(review.rating) ||
      review.rating < 1 ||
      review.rating > 5 ||
      typeof review.text !== 'string' ||
      typeof review.city !== 'string'
    ) {
      throw new Error('Each review must include a name, city, text, and rating from 1 to 5.');
    }
  }
}

validateCatalog();

function safeAsset(key: string | undefined, fallbackKey: string): string {
  const requested = key ? raw.assets[key as keyof typeof raw.assets] : '';
  const fallback = raw.assets[fallbackKey as keyof typeof raw.assets];
  const candidate = requested || fallback;
  return typeof candidate === 'string' && isSafeAsset(candidate)
    ? candidate
    : '';
}

const toAmount = (value: number | null): number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : 0;

export let contentCatalog = raw;
export let brandData = raw.brand as BrandInfo;
export let serviceAreas = raw.serviceAreas;
export let heroContent = raw.hero;
export let componentContent = raw.components;
export let seoContent = raw.seo;
export let imageData = raw.assets;
export let servicesData = raw.services as ServiceItem[];
export let popularRoutes: RouteItem[] = raw.routes.map((route) => ({
  ...route,
  approxKm: route.approxKm ?? 0
}));
export let reviewsData = raw.reviews as unknown as import('../types').ReviewItem[];
export let faqData = raw.faqs as FaqItem[];
export let indianLocations = raw.locations;
export let blogPosts: BlogPost[] = raw.blogs.map((post) => ({
  slug: post.slug,
  title: post.title,
  title_hi: post.title_hi,
  excerpt: post.excerpt,
  excerpt_hi: post.excerpt_hi,
  category: post.category as BlogPost['category'],
  publishDate: post.publishDate,
  readTime: post.readTime,
  author: {
    name: post.authorName,
    role: post.authorRole,
    avatar: safeAsset(post.authorImageKey, 'heroDriver')
  },
  coverImage: safeAsset(post.coverImageKey, 'blogCab'),
  tags: post.tags,
  tableOfContents: post.tableOfContents,
  contentHtml: post.contentHtml,
  contentHtml_hi: post.contentHtml_hi,
  faq: post.faq
}));

export let fleetData: Vehicle[] = raw.fleet.map((vehicle) => {
  const rate = (raw.pricing.rates as Record<string, (typeof raw.pricing.rates)[keyof typeof raw.pricing.rates]>)[vehicle.id];
  return {
    ...vehicle,
    modelYear: vehicle.modelYear ?? 0,
    seats: vehicle.seats ?? 0,
    ratePerKm: toAmount(rate?.perKm ?? vehicle.ratePerKm),
    minFare: toAmount(rate?.minFare ?? vehicle.minFare),
    imageUrl: safeAsset(vehicle.image, vehicle.ac ? 'cabAc' : 'cabNonAc')
  } as Vehicle;
});

export let pricingConfig: PricingConfig = {
  currency: raw.pricing.currency,
  rates: Object.fromEntries(Object.entries(raw.pricing.rates).map(([id, rate]) => [id, {
    perKm: toAmount(rate.perKm),
    minFare: toAmount(rate.minFare),
    minKmPerDay: toAmount(rate.minKmPerDay),
    driverAllowancePerNight: toAmount(rate.driverAllowancePerNight),
    waitingPerHour: toAmount(rate.waitingPerHour)
  }])),
  nightCharge: {
    ...raw.pricing.nightCharge,
    amount: toAmount(raw.pricing.nightCharge.amount)
  },
  notes: raw.pricing.notes
};

export const publicContentDomains = [
  'brand', 'assets', 'hero', 'components', 'seo', 'serviceAreas', 'fleet',
  'pricing', 'services', 'routes', 'locations', 'reviews', 'faqs', 'blogs'
] as const;

export type PublicContentDomain = typeof publicContentDomains[number];

export function getPublicContentDomain(domain: string): unknown | undefined {
  if (!publicContentDomains.includes(domain as PublicContentDomain)) return undefined;
  return raw[domain as PublicContentDomain];
}

export function getPublicContentCatalog() {
  return raw;
}

export function replacePublicContentCatalog(value: unknown): boolean {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const catalog = value as typeof rawContent;

  try {
    validateCatalog(catalog);
  } catch {
    return false;
  }

  raw = catalog;
  contentCatalog = raw;
  brandData = raw.brand as BrandInfo;
  serviceAreas = raw.serviceAreas;
  heroContent = raw.hero;
  componentContent = raw.components;
  seoContent = raw.seo;
  imageData = raw.assets;
  servicesData = raw.services as ServiceItem[];
  popularRoutes = raw.routes.map((route) => ({ ...route, approxKm: route.approxKm ?? 0 }));
  reviewsData = raw.reviews as unknown as import('../types').ReviewItem[];
  faqData = raw.faqs as FaqItem[];
  indianLocations = raw.locations;
  blogPosts = raw.blogs.map((post) => ({
    slug: post.slug,
    title: post.title,
    title_hi: post.title_hi,
    excerpt: post.excerpt,
    excerpt_hi: post.excerpt_hi,
    category: post.category as BlogPost['category'],
    publishDate: post.publishDate,
    readTime: post.readTime,
    author: {
      name: post.authorName,
      role: post.authorRole,
      avatar: safeAsset(post.authorImageKey, 'heroDriver')
    },
    coverImage: safeAsset(post.coverImageKey, 'blogCab'),
    tags: post.tags,
    tableOfContents: post.tableOfContents,
    contentHtml: post.contentHtml,
    contentHtml_hi: post.contentHtml_hi,
    faq: post.faq
  }));
  fleetData = raw.fleet.map((vehicle) => {
    const rate = (raw.pricing.rates as Record<string, (typeof raw.pricing.rates)[keyof typeof raw.pricing.rates]>)[vehicle.id];
    return {
      ...vehicle,
      modelYear: vehicle.modelYear ?? 0,
      seats: vehicle.seats ?? 0,
      ratePerKm: toAmount(rate?.perKm ?? vehicle.ratePerKm),
      minFare: toAmount(rate?.minFare ?? vehicle.minFare),
      imageUrl: safeAsset(vehicle.image, vehicle.ac ? 'cabAc' : 'cabNonAc')
    } as Vehicle;
  });
  pricingConfig = {
    currency: raw.pricing.currency,
    rates: Object.fromEntries(Object.entries(raw.pricing.rates).map(([id, rate]) => [id, {
      perKm: toAmount(rate.perKm),
      minFare: toAmount(rate.minFare),
      minKmPerDay: toAmount(rate.minKmPerDay),
      driverAllowancePerNight: toAmount(rate.driverAllowancePerNight),
      waitingPerHour: toAmount(rate.waitingPerHour)
    }])),
    nightCharge: { ...raw.pricing.nightCharge, amount: toAmount(raw.pricing.nightCharge.amount) },
    notes: raw.pricing.notes
  };
  return true;
}
