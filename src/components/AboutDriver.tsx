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
import { brandData } from '../content/data';

interface AboutDriverProps {
  lang?: 'en' | 'hi';
}

export const AboutDriver: React.FC<AboutDriverProps> = ({ lang = 'en' }) => {
  return (
    <section id="about-driver" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>{lang === 'hi' ? 'ड्राइवर का परिचय व भरोसा' : 'Meet Your Driver • Trust & Safety'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi'
              ? 'सचिन शर्मा — आपका अपना स्थानीय व भरोसेमंद सारथी'
              : 'About Sachin Sharma — Your Trusted Local Driver'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === 'hi'
              ? 'मोदीनगर (गाजियाबाद) निवासी, 10+ वर्षों का हाईवे ड्राइविंग अनुभव और सुरक्षित पारिवारिक सफर का अटूट वादा।'
              : 'Modinagar resident with over a decade of accident-free highway experience, dedicated to safe, respectful and punctual passenger travel.'}
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
                      src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400"
                      alt="Driver Sachin Sharma"
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.35)]"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-[#080C17] shadow-[0_0_12px_rgba(16,185,129,0.7)]">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-center sm:text-left space-y-1.5">
                    <div className="inline-block px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(245,158,11,0.35)]">
                      {lang === 'hi' ? 'वेरिफाइड ओनर-ड्राइवर' : 'Verified Owner-Driver'}
                    </div>
                    <h3 className="text-2xl font-black text-white">Sachin Sharma</h3>
                  <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Modinagar, Ghaziabad (Uttar Pradesh)
                  </p>
                  <p className="text-xs font-semibold text-emerald-400 flex items-center justify-center sm:justify-start gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    {lang === 'hi' ? '24 घंटे कॉल व व्हाट्सएप उपलब्ध' : 'Available 24x7 • Direct Phone & WhatsApp'}
                  </p>
                </div>
              </div>

              {/* Verified Credentials Pills - Glass Cards */}
              <div className="relative z-10 mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-start gap-2.5 hover:bg-white/10 transition-colors">
                  <FileCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white text-[11px]">Commercial DL</p>
                    <p className="text-[10px] text-slate-400">UP RTO Approved</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-start gap-2.5 hover:bg-white/10 transition-colors">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white text-[11px]">Police Verified</p>
                    <p className="text-[10px] text-slate-400">Clean Background</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-start gap-2.5 hover:bg-white/10 transition-colors">
                  <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white text-[11px]">10+ Years Exp.</p>
                    <p className="text-[10px] text-slate-400">500+ Outstation Trips</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-start gap-2.5 hover:bg-white/10 transition-colors">
                  <Car className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white text-[11px]">2025 WagonR</p>
                    <p className="text-[10px] text-slate-400">Brand New Fleet</p>
                  </div>
                </div>
              </div>

              {/* Personal Quote Card with Frosted Glass Accent */}
              <div className="relative z-10 mt-5 p-4 rounded-2xl bg-amber-400/10 backdrop-blur-md border border-amber-400/30 text-xs text-amber-200/90 italic shadow-inner">
                "{lang === 'hi'
                  ? 'मेरे लिए हर सवारी सिर्फ एक बुकिंग नहीं, बल्कि एक परिवार का विश्वास है। सुरक्षित पहुंचाना मेरी पहली जिम्मेदारी है।'
                  : 'For me, every passenger is not just a ride, but a family placing their trust in me. Getting you there safely and comfortably is my highest duty.'}"
              </div>
            </div>
          </div>
        </div>

          {/* Right Column: In-Depth Biography & Safety Commitment */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {lang === 'hi'
                  ? 'अज्ञात ऐप कैब छोड़ें — जानिए आप किसके साथ सफर कर रहे हैं'
                  : 'Skip Anonymous App Cabs — Know Exactly Who Drives You'}
              </h3>
              
              <p>
                {lang === 'hi' ? (
                  <>
                    सचिन शर्मा मोदीनगर के मूल निवासी हैं और पिछले 10 से अधिक वर्षों से दिल्ली-एनसीआर, 
                    मेरठ, गाजियाबाद, हरिद्वार, ऋषिकेश, देहरादून और राजस्थान के हाईवे पर कमर्शियल गाड़ियां 
                    चला रहे हैं। एग्रीगेटर ऐप्स में जहाँ कभी भी ड्राइवर कैंसल कर देते हैं या ड्राइवर की पहचान संदिग्ध 
                    होती है, सचिन शर्मा के साथ आपको मिलता है <strong>सीधा व्यक्तिगत संपर्क</strong>।
                  </>
                ) : (
                  <>
                    Sachin Sharma is a proud resident of Modinagar, Ghaziabad. For over ten years, he has 
                    safely navigated the expressways and hill routes connecting Delhi-NCR to Haridwar, Rishikesh, 
                    Dehradun, Agra, Jaipur, and Chandigarh. Unlike rideshare aggregator apps where rides get 
                    canceled at the last minute or an unknown driver arrives, booking with Sachin gives you 
                    a <strong>direct personal relationship with your driver</strong>.
                  </>
                )}
              </p>

              <p>
                {lang === 'hi' ? (
                  <>
                    सचिन जी अपनी नई <strong>2025 मारुति सुजुकी वैगनआर</strong> स्वयं चलाते हैं। गाड़ी हमेशा धुली हुई, 
                    सुगंधित, चिल्ड एसी और साफ-सुथरी सीटों के साथ मिलती है। गाड़ी में कभी धूम्रपान या गुटखा की अनुमति 
                    नहीं है, जिससे परिवार, बुजुर्ग और महिलाएं पूरी तरह निश्चिंत होकर यात्रा कर सकते हैं।
                  </>
                ) : (
                  <>
                    Sachin drives his own brand-new <strong>2025 Maruti Suzuki WagonR ZXI+</strong> along with 
                    access to premium sedans and Ertiga/Innova for larger families. His car is strictly non-smoking, 
                    sanitized before every outstation trip, and equipped with powerful dual air conditioning 
                    for long summer journeys.
                  </>
                )}
              </p>
            </div>

            {/* 4 Core Pillars of Safe Travel - Frosted Glass Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4.5 rounded-2xl glass-card hover:shadow-xl hover:-translate-y-0.5 transition-all space-y-1.5 border border-slate-200/80">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                  <div className="p-1 rounded-lg bg-emerald-100 text-emerald-700">
                    <HeartHandshake className="w-4 h-4 shrink-0" />
                  </div>
                  <h4>{lang === 'hi' ? 'पारिवारिक व सम्मानजनक व्यवहार' : 'Family & Senior Friendly'}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  {lang === 'hi'
                    ? 'बुजुर्गों और बच्चों के साथ धैर्यपूर्वक व्यवहार। रास्ते में साफ और सुरक्षित फैमिली ढाबों पर ही रुकना।'
                    : 'Patience and care for elderly travelers and families. Halts only at clean, hygienic, verified dhabas.'}
                </p>
              </div>

              <div className="p-4.5 rounded-2xl glass-card hover:shadow-xl hover:-translate-y-0.5 transition-all space-y-1.5 border border-slate-200/80">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                  <div className="p-1 rounded-lg bg-blue-100 text-blue-700">
                    <Clock className="w-4 h-4 shrink-0" />
                  </div>
                  <h4>{lang === 'hi' ? '15 मिनट पहले पहुंचना' : 'Punctual 15-Min Early Arrival'}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  {lang === 'hi'
                    ? 'सुबह 4 बजे की फ्लाइट हो या रात की ट्रेन, समय से 15 मिनट पहले आपके दरवाजे पर गाड़ी हाजिर।'
                    : 'Whether a 4:00 AM flight or a late-night railway pickup, Sachin reports 15 minutes before scheduled time.'}
                </p>
              </div>

              <div className="p-4.5 rounded-2xl glass-card hover:shadow-xl hover:-translate-y-0.5 transition-all space-y-1.5 border border-slate-200/80">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                  <div className="p-1 rounded-lg bg-amber-100 text-amber-700">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                  </div>
                  <h4>{lang === 'hi' ? 'सुरक्षित व नियंत्रित स्पीड' : 'Strict Defensive Driving'}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  {lang === 'hi'
                    ? 'एक्सप्रेसवे पर तय गति सीमा का पालन। कोई खतरनाक ओवरटेकिंग नहीं, स्मूथ व आरामदायक ड्राइविंग।'
                    : 'Adherence to expressway speed limits. No rash overtaking or sudden braking—smooth cruising throughout.'}
                </p>
              </div>

              <div className="p-4.5 rounded-2xl glass-card hover:shadow-xl hover:-translate-y-0.5 transition-all space-y-1.5 border border-slate-200/80">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                  <div className="p-1 rounded-lg bg-purple-100 text-purple-700">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                  </div>
                  <h4>{lang === 'hi' ? 'पारदर्शी प्रति-किमी हिसाब' : 'Zero Hidden Charges'}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  {lang === 'hi'
                    ? 'कोई सर्ज प्राइजिंग नहीं। टोल टैक्स और पार्किंग सरकारी रसीद के अनुसार वास्तविक खर्चे पर।'
                    : 'Kilometre-based transparent billing. Toll receipts shared openly—what you discuss is what you pay.'}
                </p>
              </div>
            </div>

            {/* Direct Call to Action buttons with shining beam */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={brandData.phone}
                className="shining-beam px-6 h-12 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all active:scale-95 border border-emerald-400/40"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{lang === 'hi' ? 'सचिन शर्मा से बात करें' : 'Call Sachin Directly'}</span>
              </a>

              <a
                href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent('Hello Sachin Sharma ji, I read your profile on your website and would like to discuss a cab booking.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shining-beam px-6 h-12 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1ebe5d] hover:from-[#20ba59] hover:to-[#17a84e] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.35)] transition-all active:scale-95 border border-emerald-300/40"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>{lang === 'hi' ? 'व्हाट्सएप पर संपर्क करें' : 'WhatsApp Sachin'}</span>
              </a>

              <span className="text-xs text-slate-500 font-semibold">
                {lang === 'hi' ? '📞 सीधे ड्राइवर से बात करें • नो ब्रोकर' : 'Direct driver line: +91 90846 94715'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
