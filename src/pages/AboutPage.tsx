import React from 'react';
import { AboutDriver } from '../components/AboutDriver';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  FileCheck, 
  Car, 
  PhoneCall, 
  MessageSquare, 
  MapPin, 
  Star,
  Clock,
  HeartHandshake,
  Users
} from 'lucide-react';
import { brandData, componentContent } from '../content/data';

const ABOUT_HIGHLIGHT_ICONS: Record<string, React.ReactNode> = {
  HeartHandshake: <HeartHandshake className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />
};

interface AboutPageProps {
  lang: 'en' | 'hi';
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang }) => {
  return (
    <div className="py-10 md:py-16 bg-slate-50 min-h-screen space-y-16">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-600" />
            <span>{lang === 'hi' ? componentContent.about.title_hi : componentContent.about.title}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {brandData.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {lang === 'hi' ? componentContent.about.description_hi : componentContent.about.description}
          </p>
        </div>
      </div>

      {/* Embedded In-Depth Driver Profile */}
      <AboutDriver lang={lang} />

      {/* Detailed Standards & Certifications Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {lang === 'hi' ? componentContent.about.title_hi : componentContent.about.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === 'hi' ? componentContent.about.bookingText_hi : componentContent.about.bookingText}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {componentContent.about.highlights.map((item, index) => (
              <div key={`${item.title}-${index}`} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className={`w-10 h-10 rounded-xl ${index % 2 === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'} flex items-center justify-center font-bold`}>
                  {ABOUT_HIGHLIGHT_ICONS[item.icon] || <CheckCircle2 className="w-5 h-5" />}
                </div>
                <h3 className="text-base font-bold text-slate-900">{lang === 'hi' ? item.title_hi : item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{lang === 'hi' ? item.text_hi : item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Driver Contact CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {lang === 'hi' ? `${brandData.name} से पूछताछ करें` : `Enquire with ${brandData.name}`}
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            {lang === 'hi' ? componentContent.about.bookingText_hi : componentContent.about.bookingText}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${brandData.phone}`}
              className="px-8 h-13 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg transition-transform active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call: {brandData.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent('Hello Jangid Ji Cab Service, I would like to enquire about a cab booking.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 h-13 rounded-xl bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg transition-transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
