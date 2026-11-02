import React from 'react';
import { 
  PhoneCall, 
  MessageSquare, 
  ShieldCheck, 
  Star, 
  Award, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { brandData } from '../content/data';

interface HeroProps {
  lang: 'en' | 'hi';
  onCalculateClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onCalculateClick }) => {
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
              <span>
                {lang === 'hi' ? 'मोदीनगर का अपना वेरिफाइड ड्राइवर • 24x7 उपलब्ध' : 'Modinagar Verified Local Driver • 24x7 Ready'}
              </span>
            </div>

            {/* Main Headline with metallic chrome and Gen-Z gold gradient */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              {lang === 'hi' ? (
                <>
                  सुरक्षित, आरामदायक और किफायती कैब –{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-400 drop-shadow-[0_4px_25px_rgba(245,158,11,0.4)]">
                    मोदीनगर से पूरे भारत तक
                  </span>
                </>
              ) : (
                <>
                  Your Journey. Your Local Driver.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-400 drop-shadow-[0_4px_25px_rgba(245,158,11,0.4)]">
                    Modinagar to All India
                  </span>
                </>
              )}
            </h1>

            {/* Subtext description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {lang === 'hi'
                ? 'ड्राइवर सचिन शर्मा (मोदीनगर, गाजियाबाद)। हरिद्वार, दिल्ली एयरपोर्ट, मेरठ, नोएडा, गुरुग्राम और पूरे भारत के लिए पारदर्शी प्रति-किमी दर व सुरक्षित पारिवारिक सेवा।'
                : 'Contact Sachin Sharma in Modinagar for comfortable outstation trips to Ghaziabad, Meerut, Delhi Airport, Noida, Haridwar & All India. 100% transparent kilometre-based billing.'}
            </p>

            {/* Gen-Z Iridescent Shining 2025 WagonR Highlight Card */}
            <div className="shining-beam inline-flex items-center gap-3.5 p-3.5 rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-2xl border border-white/20 text-left shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:border-amber-400/60 transition-all">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-500 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-amber-300 flex items-center gap-2">
                  <span>{lang === 'hi' ? 'नई 2025 वैगनआर ZXI+ में सफर करें!' : 'Ask about travelling in our brand new 2025 WagonR!'}</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 uppercase font-black shadow-xs">
                    2025 Model
                  </span>
                </p>
                <p className="text-[11px] text-slate-300">
                  {lang === 'hi' ? 'सुपर क्लीन एसी केबिन, अतिरिक्त लेगरूम व सबसे किफायती ₹10/किमी दर' : 'Super clean AC cabin, tall-boy comfort & economical ₹10/km rate'}
                </p>
              </div>
            </div>

            {/* Gen-Z Glowing Shining Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={brandData.phone}
                className="shining-beam w-full sm:w-auto px-8 h-14 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.45)] transition-all hover:scale-105 active:scale-95 border border-emerald-400/40"
              >
                <PhoneCall className="w-5 h-5 animate-pulse-subtle" />
                <span>{lang === 'hi' ? '📞 सचिन को कॉल करें' : '📞 Call Sachin Now'}</span>
              </a>

              <a
                href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent('Hello Sachin Sharma ji, I want to check cab availability and fare.')}`}
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
                  <p className="text-sm font-black text-white">4.9 / 5.0</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Google Rating</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xs">
                <div className="p-1.5 rounded-xl bg-violet-500/20 text-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-white">10+ Years</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Driving Exp.</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xs">
                <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-white">500+ Trips</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Happy Travelers</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xs">
                <div className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-white">24x7</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Anytime Pickup</p>
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
                      src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=260"
                      alt="Sachin Sharma Driver"
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#0A0F1D] flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.7)]" title="Verified Driver">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-white tracking-tight">Sachin Sharma</h3>
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 uppercase tracking-wider shadow-sm">
                        Owner & Driver
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1 font-medium">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      Modinagar, Ghaziabad, UP
                    </p>
                    <div className="flex items-center gap-1 text-amber-400 text-xs mt-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                      <span className="text-slate-300 text-[11px] ml-1 font-semibold">4.9 (500+ Trips)</span>
                    </div>
                  </div>
                </div>

                {/* Car Banner Showcase with Shining Gloss */}
                <div className="shining-beam relative rounded-2xl overflow-hidden bg-black/60 border border-white/10 p-3.5">
                  <img
                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800"
                    alt="2025 WagonR Taxi"
                    className="w-full h-36 object-cover rounded-xl shadow-md"
                  />
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">Featured 2025 WagonR ZXI+</span>
                      <p className="text-[11px] text-slate-400">Tall-Boy Comfort • Chilled AC</p>
                    </div>
                    <span className="px-3.5 py-1 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                      ₹10 / KM
                    </span>
                  </div>
                </div>

                {/* Direct quick call card */}
                <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium">Direct Driver Line:</span>
                    <p className="font-black text-white text-sm tracking-wide">{brandData.phoneDisplay}</p>
                  </div>
                  <a
                    href={brandData.phone}
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
  );
};
