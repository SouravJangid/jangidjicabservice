import React from 'react';
import { 
  Navigation, 
  Plane, 
  Mountain, 
  Train, 
  MapPin, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { servicesData, brandData } from '../content/data';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  lang: 'en' | 'hi';
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Navigation: <Navigation className="w-6 h-6 text-amber-500" />,
  Plane: <Plane className="w-6 h-6 text-blue-500" />,
  Mountain: <Mountain className="w-6 h-6 text-emerald-500" />,
  Train: <Train className="w-6 h-6 text-indigo-500" />,
  MapPin: <MapPin className="w-6 h-6 text-rose-500" />,
  Sparkles: <Sparkles className="w-6 h-6 text-amber-500" />
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang }) => {
  return (
    <section id="services" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            {lang === 'hi' ? 'हमारी प्रमुख सेवाएं' : 'Professional Cab Services'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi'
              ? 'मोदीनगर व एनसीआर से हर प्रकार की यात्रा के लिए'
              : 'Reliable Cab Solutions for Every Travel Need'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'hi'
              ? 'एयरपोर्ट ड्रॉप, हरिद्वार यात्रा या दिल्ली मीटिंग—सचिन शर्मा के साथ बिना किसी तनाव के सफर करें।'
              : 'Direct one-on-one booking with Sachin Sharma. No call-center waiting, no last-minute app cancellations.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((svc: ServiceItem) => (
            <div
              key={svc.id}
              className="p-6 md:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  {ICON_MAP[svc.icon] || <Navigation className="w-6 h-6 text-amber-500" />}
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                    {svc.tagline}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {lang === 'hi' ? svc.title_hi : svc.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'hi' ? svc.text_hi : svc.text}
                </p>

                {/* Highlights */}
                <div className="pt-2 border-t border-slate-200/60 space-y-1.5">
                  {svc.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4">
                <a
                  href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent(`Hello Sachin ji, I need cab service for: ${svc.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors"
                >
                  <span>{lang === 'hi' ? 'पूछताछ करें' : 'Enquire Now'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
