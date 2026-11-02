import React from 'react';
import { Navigation, Clock, ArrowRight } from 'lucide-react';
import { componentContent, popularRoutes, brandData } from '../content/data';
import { RouteItem } from '../types';

interface RoutesSectionProps {
  lang: 'en' | 'hi';
  onSelectRoute: (from: string, to: string) => void;
}

export const RoutesSection: React.FC<RoutesSectionProps> = ({ lang, onSelectRoute }) => {
  return (
    <section id="routes" className="py-16 md:py-24 bg-slate-950 text-white border-b border-white/10 relative overflow-hidden">
      {/* Ambient background light orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Navigation className="w-3.5 h-3.5 text-amber-400" />
            {lang === 'hi' ? componentContent.routes.title_hi : componentContent.routes.title}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'hi'
              ? 'मोदीनगर से लोकप्रिय रूट'
              : 'Popular Routes from Modinagar and Nearby Areas'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'hi'
              ? 'रूट के लिए AC या Non-AC कैब और वन-वे या राउंड ट्रिप के बारे में पूछताछ करें।'
              : 'Enquire about AC or Non-AC cabs and one-way or round-trip bookings for these routes.'}
          </p>
        </div>

        {/* Routes Grid - Glassmorphic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRoutes.map((route: RouteItem) => (
            <div
              key={route.slug}
              className="shining-beam p-6 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-amber-400/70 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-[0_15px_35px_rgba(245,158,11,0.25)] hover:-translate-y-1.5"
            >
              <div className="space-y-3">
                {/* Route Header */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    {lang === 'hi' ? componentContent.fleet.title_hi : componentContent.fleet.title}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {route.approxTime}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                  {lang === 'hi' ? route.title_hi : route.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {lang === 'hi' ? route.intro_hi : route.intro}
                </p>

                <div className="pt-2 text-[11px] text-slate-400">
                    <span className="text-slate-300 font-semibold">{lang === 'hi' ? 'बुकिंग प्रकार: ' : 'Trip types: '}</span>
                  {lang === 'hi' ? 'वन-वे और राउंड ट्रिप' : 'One-way and round trip'}
                </div>
              </div>

              {/* Action */}
              <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onSelectRoute(route.from, route.to);
                    const el = document.getElementById('calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>{lang === 'hi' ? 'रूट पूछताछ' : 'Enquire About Route'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent(`Hello Jangid Ji Cab Service, please share the fare and availability for ${route.from} to ${route.to}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-emerald-400 hover:underline font-semibold"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
