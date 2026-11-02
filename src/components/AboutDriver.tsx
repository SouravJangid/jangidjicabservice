import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Clock, 
  Car, 
  HeartHandshake, 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare, 
  MapPin, 
  FileCheck, 
  AlertTriangle,
  Sparkles,
  Users
} from 'lucide-react';
import { brandData, componentContent, imageData } from '../content/data';

interface AboutDriverProps {
  lang?: 'en' | 'hi';
}

const ABOUT_HIGHLIGHT_ICONS: Record<string, React.ReactNode> = {
  HeartHandshake: <HeartHandshake className="w-4 h-4 shrink-0" />,
  Clock: <Clock className="w-4 h-4 shrink-0" />,
  Car: <Car className="w-4 h-4 shrink-0" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 shrink-0" />
};

export const AboutDriver: React.FC<AboutDriverProps> = ({ lang = 'en' }) => {
  return (
    <section id="about-driver" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>{lang === 'hi' ? componentContent.about.title_hi : componentContent.about.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {brandData.name}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === 'hi' ? componentContent.about.description_hi : componentContent.about.description}
          </p>
        </div>

        {/* Main Grid: Biography + Commitment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Driver Photo Card with Iridescent Frame */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-[1px] rounded-3xl bg-gradient-to-r from-amber-400/50 via-violet-500/40 to-emerald-400/50 shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
              <div className="relative rounded-3xl bg-[#080C17]/95 backdrop-blur-2xl p-6 sm:p-7 text-white overflow-hidden">
                {/* Background ambient glow */}
                <div className="absolute top-0 right-0 w-56 h-56 bg-amber-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="relative shrink-0">
                    <img
                      src={imageData.heroDriver}
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = imageData.cabAc;
                      }}
                      alt={`Owner of ${brandData.name}`}
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.35)]"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-[#080C17] shadow-[0_0_12px_rgba(16,185,129,0.7)]">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-center sm:text-left space-y-1.5">
                    <div className="inline-block px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(245,158,11,0.35)]">
                      {lang === 'hi' ? 'कैब एवं टैक्सी सेवा' : 'Cab & Taxi Service'}
                    </div>
                    <h3 className="text-2xl font-black text-white">Jangid Ji Cab Service</h3>
                  <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {brandData.address}
                  </p>
                  <p className="text-xs font-semibold text-emerald-400 flex items-center justify-center sm:justify-start gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                      {lang === 'hi' ? componentContent.about.bookingText_hi : componentContent.about.bookingText}
                  </p>
                </div>
              </div>

              {/* Verified Credentials Pills - Glass Cards */}
              <div className="relative z-10 mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-start gap-2.5 hover:bg-white/10 transition-colors">
                  <FileCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white text-[11px]">AC & Non-AC</p>
                    <p className="text-[10px] text-slate-400">Cab Types</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-start gap-2.5 hover:bg-white/10 transition-colors">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white text-[11px]">Local</p>
                    <p className="text-[10px] text-slate-400">Cab Service</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-start gap-2.5 hover:bg-white/10 transition-colors">
                  <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white text-[11px]">Outstation</p>
                    <p className="text-[10px] text-slate-400">Cab Service</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-start gap-2.5 hover:bg-white/10 transition-colors">
                  <Car className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white text-[11px]">One-Way</p>
                    <p className="text-[10px] text-slate-400">& Round Trips</p>
                  </div>
                </div>
              </div>

              {/* Personal Quote Card with Frosted Glass Accent */}
              <div className="relative z-10 mt-5 p-4 rounded-2xl bg-amber-400/10 backdrop-blur-md border border-amber-400/30 text-xs text-amber-200/90 italic shadow-inner">
                {lang === 'hi' ? componentContent.about.bookingText_hi : componentContent.about.bookingText}
              </div>
            </div>
          </div>
        </div>

          {/* Right Column: In-Depth Biography & Safety Commitment */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {lang === 'hi'
                  ? 'आपकी यात्रा के लिए कैब विकल्प'
                  : 'Cab Options for Your Journey'}
              </h3>
              
              <p>
                {lang === 'hi' ? componentContent.about.serviceDetails_hi : componentContent.about.serviceDetails}
              </p>

              <p>
                {lang === 'hi' ? componentContent.about.serviceAreaDetails_hi : componentContent.about.serviceAreaDetails}
              </p>
            </div>

            {/* 4 Core Pillars of Safe Travel - Frosted Glass Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {componentContent.about.highlights.map((item, index) => (
                <div key={`${item.title}-${index}`} className="p-4.5 rounded-2xl glass-card hover:shadow-xl hover:-translate-y-0.5 transition-all space-y-1.5 border border-slate-200/80">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <div className={`p-1 rounded-lg ${index % 2 === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                      {ABOUT_HIGHLIGHT_ICONS[item.icon] || <Car className="w-4 h-4 shrink-0" />}
                    </div>
                    <h4>{lang === 'hi' ? item.title_hi : item.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    {lang === 'hi' ? item.text_hi : item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Call to Action buttons with shining beam */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={brandData.phone}
                className="shining-beam px-6 h-12 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all active:scale-95 border border-emerald-400/40"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{lang === 'hi' ? 'अभी कॉल करें' : 'Call Now'}</span>
              </a>

              <a
                href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent('Hello Jangid Ji Cab Service, I would like to enquire about a cab booking.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shining-beam px-6 h-12 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1ebe5d] hover:from-[#20ba59] hover:to-[#17a84e] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.35)] transition-all active:scale-95 border border-emerald-300/40"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>{lang === 'hi' ? 'व्हाट्सएप पर संपर्क करें' : 'WhatsApp'}</span>
              </a>

              <span className="text-xs text-slate-500 font-semibold">
                {lang === 'hi' ? `📞 संपर्क नंबर: ${brandData.phoneDisplay}` : `Contact: ${brandData.phoneDisplay}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
