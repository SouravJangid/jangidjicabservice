import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Clock, ArrowRight, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { popularRoutes, brandData } from '../content/data';

interface RoutesPageProps {
  lang: 'en' | 'hi';
}

export const RoutesPage: React.FC<RoutesPageProps> = ({ lang }) => {
  return (
    <div className="py-10 md:py-16 bg-slate-50 min-h-screen space-y-16">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
            <Navigation className="w-4 h-4 text-amber-600" />
            <span>{lang === 'hi' ? 'लोकप्रिय यात्रा रूट्स' : 'Highway Taxi Routes & SEO Pages'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {lang === 'hi'
              ? 'मोदीनगर व एनसीआर से प्रमुख हाईवे रूट्स'
              : 'Direct Highway Cabs from Modinagar to All India'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {lang === 'hi'
              ? 'हरिद्वार, दिल्ली एयरपोर्ट, मेरठ, नोएडा, गुरुग्राम और आगरा के लिए वास्तविक दूरी व पारदर्शी किराया।'
              : 'Explore verified highway road distances, driving durations, and fixed per-km taxi rates for our most popular routes across North India.'}
          </p>
        </div>
      </div>

      {/* Routes Grid with Dedicated Detail Page Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {popularRoutes.map((route) => (
            <div
              key={route.slug}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Distance Badge & Time */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-amber-900 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-300">
                    {route.approxKm > 0 ? `~${route.approxKm} KM` : 'All India'}
                  </span>
                  <span className="text-slate-500 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {route.approxTime}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {lang === 'hi' ? route.title_hi : route.title}
                  </h2>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {lang === 'hi' ? route.intro_hi : route.intro}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                  <p className="font-semibold text-slate-800">
                    <span className="text-amber-600 font-bold">From:</span> {route.from} ➔ <span className="text-emerald-600 font-bold">To:</span> {route.to}
                  </p>
                  <p className="text-[11px] text-slate-500">{route.tollNote}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/routes/${route.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors uppercase tracking-wider"
                >
                  <span>{lang === 'hi' ? 'रूट विवरण व किराया' : 'View Route Details'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent(`Hello Sachin Sharma ji, what is the fare for ${route.from} to ${route.to}?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#25D366] hover:underline"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
