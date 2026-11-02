import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { popularRoutes, brandData, fleetData } from '../content/data';
import { FareCalculator } from '../components/FareCalculator';
import { 
  Navigation, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  PhoneCall, 
  MessageSquare, 
  ArrowLeft, 
  Car, 
  CheckCircle2,
  HelpCircle,
  Share2
} from 'lucide-react';

interface RouteDetailPageProps {
  lang: 'en' | 'hi';
}

export const RouteDetailPage: React.FC<RouteDetailPageProps> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>();

  const route = popularRoutes.find((r) => r.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!route) {
    return (
      <div className="py-24 text-center space-y-4 max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-slate-900">Route Not Found</h1>
        <p className="text-xs text-slate-500">The destination route you are looking for was not found.</p>
        <Link
          to="/routes"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          View All Routes
        </Link>
      </div>
    );
  }

  // Schema.org LocalBusiness & TaxiService JSON-LD
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: route.title,
    provider: {
      '@type': 'LocalBusiness',
      name: brandData.name,
      telephone: brandData.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Modinagar',
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'IN'
      }
    },
    areaServed: [route.from, route.to],
    description: route.intro
  };

  return (
    <div className="py-10 md:py-16 bg-slate-50 min-h-screen space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-amber-600">Home</Link>
          <span>/</span>
          <Link to="/routes" className="hover:text-amber-600">Routes</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{route.title}</span>
        </nav>

        {/* Route Hero Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              <Navigation className="w-4 h-4 text-amber-400" />
              <span>{lang === 'hi' ? 'लोकप्रिय कैब रूट' : 'Popular Cab Route'}</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-800 px-3.5 py-1 rounded-xl text-xs font-bold text-amber-300 border border-slate-700">
              <Clock className="w-3.5 h-3.5" />
              <span>{route.approxTime}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {lang === 'hi' ? route.title_hi : route.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              {lang === 'hi' ? route.intro_hi : route.intro}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[11px]">Distance</span>
              <span className="text-lg font-black text-amber-400">{route.approxKm > 0 ? `~${route.approxKm} KM` : 'Confirm on enquiry'}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[11px]">Pickup</span>
              <span className="text-sm font-bold text-white truncate block">{route.from}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[11px]">Destination</span>
              <span className="text-sm font-bold text-white truncate block">{route.to}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 block text-[11px]">Cab Types</span>
              <span className="text-sm font-bold text-emerald-400">AC & Non-AC</span>
            </div>
          </div>

          {/* Direct CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={brandData.phone}
              className="px-6 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call: {brandData.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent(`Hello Jangid Ji Cab Service, I would like to enquire about a cab from ${route.from} to ${route.to}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 h-12 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Book via WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Live Distance & Fare Calculator */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              Check Distance & Enquire About Fare for {route.to}
            </h2>
          </div>
          <FareCalculator lang={lang} />
        </section>

        {/* Route Vehicle Rate Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900">
            Cab Types for {route.from} to {route.to}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fleetData.map((car) => (
              <div key={car.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm">{car.name}</span>
                <p className="text-xs text-slate-600">{car.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            Common Questions for this Route
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">Are state and road taxes included?</h3>
              <p className="text-xs text-slate-600">Applicable state tax and road tax are payable separately by the customer.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">How do I book?</h3>
              <p className="text-xs text-slate-600">Contact Jangid Ji Cab Service at {brandData.phoneDisplay} or use WhatsApp to confirm your travel date, cab availability, and fare.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
