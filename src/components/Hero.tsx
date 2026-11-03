import React, { useEffect, useState } from 'react';
import { PhoneCall, MessageSquare, ShieldCheck, Star, Award, Clock, MapPin, CheckCircle2, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { brandData, componentContent, fleetData, heroContent, imageData } from '../content/data';

interface HeroProps {
  lang: 'en' | 'hi';
  onCalculateClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onCalculateClick }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeVehicleIndex, setActiveVehicleIndex] = useState(0);

  useEffect(() => {
    if (fleetData.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setActiveVehicleIndex((index) => (index + 1) % fleetData.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const configuredPhrases = lang === 'hi' ? heroContent.rotatingPhrases_hi : heroContent.rotatingPhrases;
    const phrases = configuredPhrases.length ? configuredPhrases : [brandData.tagline];
    const phrase = phrases[phraseIndex % phrases.length];

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedText(phrases[0]);
      return;
    }

    const isComplete = typedText === phrase;
    const delay = isDeleting ? 45 : isComplete ? 1400 : 75;
    const timer = window.setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true);
      } else if (isDeleting && typedText.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((index) => (index + 1) % phrases.length);
      } else {
        setTypedText((current) => isDeleting
          ? current.slice(0, -1)
          : phrase.slice(0, current.length + 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [lang, phraseIndex, typedText, isDeleting]);

  const activeVehicle = fleetData[activeVehicleIndex % fleetData.length];

  return (
    <div className="relative overflow-hidden bg-[#050811] text-white pt-10 pb-16 md:pt-16 md:pb-24 border-b border-white/10">
      {/* Animated Floating Gradient Mesh Orbs - Gen-Z Electric Violet, Solar Gold, Cyber Emerald */}
      <div 
        className="absolute -top-32 left-1/4 w-[550px] h-[550px] bg-gradient-to-tr from-violet-600/25 via-indigo-500/20 to-transparent rounded-full blur-[110px] pointer-events-none animate-float"
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-24 right-10 w-[600px] h-[600px] bg-gradient-to-br from-amber-400/20 via-yellow-500/15 to-orange-500/10 rounded-full blur-[120px] pointer-events-none animate-float-reverse"
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/2 left-6 w-80 h-80 bg-emerald-500/15 rounded-full blur-[90px] pointer-events-none animate-pulse-subtle"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Trust Chips, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Local Verified Driver Pill with shining sheen */}
            <div className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-[#0D1424]/90 backdrop-blur-xl border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wide shadow-[0_0_25px_rgba(245,158,11,0.25)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              </span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{lang === 'hi' ? heroContent.badge_hi : heroContent.badge}</span>
            </div>

            {/* Main Headline with metallic chrome and Gen-Z gold gradient */}
            <h1
              aria-label={`${brandData.name}, ${lang === 'hi' ? componentContent.hero.title_hi : componentContent.hero.title}`}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]"
            >
              {lang === 'hi' ? (
                <>
                  {componentContent.hero.title_hi}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-400 drop-shadow-[0_4px_25px_rgba(245,158,11,0.4)]">
                    <span aria-hidden="true" className="inline-block min-h-[1.15em] align-bottom">
                      {typedText}<span className="motion-safe:animate-pulse">|</span>
                    </span>
                  </span>
                </>
              ) : (
                <>
                  {brandData.name}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-400 drop-shadow-[0_4px_25px_rgba(245,158,11,0.4)]">
                    <span aria-hidden="true" className="inline-block min-h-[1.15em] align-bottom">
                      {typedText}<span className="motion-safe:animate-pulse">|</span>
                    </span>
                  </span>
                </>
              )}
            </h1>

            {/* Subtext description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {lang === 'hi' ? heroContent.description_hi : heroContent.description}
            </p>

            {/* Cab options and trip types */}
            <div className="shining-beam inline-flex items-center gap-3.5 p-3.5 rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-2xl border border-white/20 text-left shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:border-amber-400/60 transition-all">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-500 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-amber-300 flex items-center gap-2">
                  <span>{lang === 'hi' ? componentContent.fleet.title_hi : componentContent.fleet.title}</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 uppercase font-black shadow-xs">
                    {lang === 'hi' ? componentContent.fleet.fareLabel_hi : componentContent.fleet.fareLabel}
                  </span>
                </p>
                <p className="text-[11px] text-slate-300">
                  {lang === 'hi' ? componentContent.routes.title_hi : componentContent.routes.title}
                </p>
              </div>
            </div>

            {/* Gen-Z Glowing Shining Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={`tel:${brandData.phone}`}
                className="shining-beam w-full sm:w-auto px-8 h-14 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.45)] transition-all hover:scale-105 active:scale-95 border border-emerald-400/40"
              >
                <PhoneCall className="w-5 h-5 animate-pulse-subtle" />
                <span>{lang === 'hi' ? '📞 अभी कॉल करें' : '📞 Call Now'}</span>
              </a>

              <a
                href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent('Hello Jangid Ji Cab Service, I would like to enquire about a cab booking.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shining-beam w-full sm:w-auto px-8 h-14 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#1ebe5d] hover:from-[#20ba59] hover:to-[#17a84e] text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all hover:scale-105 active:scale-95 border border-emerald-300/40"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>{lang === 'hi' ? 'व्हाट्सएप पर बात करें' : 'Chat on WhatsApp'}</span>
              </a>

              <button
                type="button"
                onClick={onCalculateClick}
                className="w-full sm:w-auto px-6 h-14 rounded-2xl bg-white/10 hover:bg-white/15 text-amber-400 hover:text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-amber-400/30 backdrop-blur-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)] active:scale-95"
              >
                <span>{lang === 'hi' ? 'सड़क दूरी जांचें' : 'Check Road Distance'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Chips Bar - Glassmorphic pills */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-slate-300">
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xs">
                <div className="p-1.5 rounded-xl bg-amber-400/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-white">AC & Non-AC</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Cab Options</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xs">
                <div className="p-1.5 rounded-xl bg-violet-500/20 text-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-white">Local</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Cab Service</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xs">
                <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-white">Outstation</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Cab Service</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xs">
                <div className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-white">WhatsApp</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Booking</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphic Driver Profile & Vehicle Card with Iridescent Aura */}
          <div className="lg:col-span-5">
            <div className="relative max-w-md mx-auto">
              {/* Outer decorative glowing iridescent ring */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-amber-500/40 via-violet-500/30 to-emerald-500/40 blur-xl opacity-80 animate-pulse-subtle" />

              {/* Glassmorphic Card Frame */}
              <div className="relative bg-[#0A0F1D]/85 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.7)] space-y-5">
                {/* Driver Photo & Badge Header */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={imageData.heroDriver}
                      loading="eager"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = imageData.cabAc;
                      }}
                      alt="Cab service representative"
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#0A0F1D] flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.7)]" aria-hidden="true">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-white tracking-tight">Jangid Ji Cab Service</h3>
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 uppercase tracking-wider shadow-sm">
                        {lang === 'hi' ? 'कैब एवं टैक्सी सेवा' : 'Cab & Taxi Service'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1 font-medium">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      {lang === 'hi' ? 'मोदीनगर' : 'Modinagar'}
                    </p>
                    <div className="flex items-center gap-1 text-amber-400 text-xs mt-1.5">
                      <span className="text-slate-300 text-[11px] font-semibold">{lang === 'hi' ? 'AC एवं Non-AC कैब' : 'AC & Non-AC Cabs'}</span>
                    </div>
                  </div>
                </div>

                {/* Car Banner Showcase with Shining Gloss */}
                <div className="shining-beam relative rounded-2xl overflow-hidden bg-black/60 border border-white/10 p-3.5" aria-label="Available cab models" aria-roledescription="carousel">
                  <img
                    key={activeVehicle.id}
                    src={activeVehicle.imageUrl || imageData.cabAc}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = imageData.cabAc;
                    }}
                    alt={activeVehicle.name}
                    className="w-full h-36 sm:h-44 object-contain rounded-xl bg-white shadow-md"
                  />
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-white">{activeVehicle.name}</span>
                      <p className="text-[11px] text-slate-400">{activeVehicle.category} · {activeVehicle.ac ? 'AC Cab' : 'Non-AC Cab'}</p>
                    </div>
                    <span className="px-3.5 py-1 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                      {activeVehicle.ratePerKm > 0 ? `₹${activeVehicle.ratePerKm}/km` : lang === 'hi' ? 'किराया पूछें' : 'Fare on enquiry'}
                    </span>
                  </div>
                  {fleetData.length > 1 && (
                    <div className="mt-3 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveVehicleIndex((index) => (index + fleetData.length - 1) % fleetData.length)}
                        aria-label="Previous vehicle"
                        className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2" role="group" aria-label="Choose a vehicle">
                        {fleetData.map((vehicle, index) => (
                          <button
                            key={vehicle.id}
                            type="button"
                            onClick={() => setActiveVehicleIndex(index)}
                            aria-label={`Show ${vehicle.name}`}
                            aria-pressed={index === activeVehicleIndex}
                            className={`h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400 ${index === activeVehicleIndex ? 'w-6 bg-amber-400' : 'w-2.5 bg-white/40 hover:bg-white/70'}`}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveVehicleIndex((index) => (index + 1) % fleetData.length)}
                        aria-label="Next vehicle"
                        className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Direct quick call card */}
                <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium">{lang === 'hi' ? 'संपर्क नंबर:' : 'Contact Number:'}</span>
                    <p className="font-black text-white text-sm tracking-wide">{brandData.phoneDisplay}</p>
                  </div>
                  <a
                    href={`tel:${brandData.phone}`}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all hover:scale-105 active:scale-95"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
