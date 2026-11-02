import { DistanceCalculationResult } from '../types';
import { BlogPost } from '../types/blog';
import { BLOG_POSTS, getBlogPostBySlug } from '../content/blogData';
import { popularRoutes } from '../content/data';

export const apiService = {
  // Distance Microservice
  async calculateDistance(params: {
    originName: string;
    destName: string;
    car: string;
    tripType: 'oneway' | 'round';
    days?: number;
    isNight?: boolean;
  }): Promise<DistanceCalculationResult> {
    const res = await fetch('/api/distance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      throw new Error('Distance calculation failed');
    }
    const data = await res.json();
    return {
      from: data.from,
      to: data.to,
      km: data.km,
      duration: data.duration,
      durationSeconds: data.durationSeconds,
      fare: data.fare,
      car: data.car,
      tripType: data.tripType,
      days: data.days,
      nightChargeApplied: Boolean(params.isNight),
      tollNote: 'Toll & parking extra as per actual receipts',
      coordinates: data.coordinates,
      polylinePoints: data.routePoints
    };
  },

  // Booking Microservice
  async submitBooking(bookingData: {
    name: string;
    phone: string;
    pickup: string;
    drop: string;
    car: string;
    tripType: string;
    date: string;
    time: string;
    passengers: number;
    notes?: string;
  }): Promise<{ success: boolean; bookingId: string; message: string; whatsappUrl: string }> {
    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to submit booking');
    }
    return res.json();
  },

  // Blog Microservice
  getBlogPosts(category?: string, query?: string): BlogPost[] {
    let posts = [...BLOG_POSTS];
    if (category && category !== 'All') {
      posts = posts.filter(p => p.category === category);
    }
    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      posts = posts.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.title_hi.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return posts;
  },

  getBlogPost(slug: string): BlogPost | undefined {
    return getBlogPostBySlug(slug);
  },

  // Routes Microservice
  getRouteBySlug(slug: string) {
    return popularRoutes.find(r => r.slug === slug);
  }
};
