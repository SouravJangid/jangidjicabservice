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
import { brandData } from '../content/data';

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
            <span>{lang === 'hi' ? 'ड्राइवर प्रोफाइल व पहचान' : 'Driver Biography & Professional Standards'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {lang === 'hi'
              ? 'सचिन शर्मा — मोदीनगर का भरोसेमंद स्थानीय कैब साथी'
              : 'Sachin Sharma — Dedicated Local Driver from Modinagar'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {lang === 'hi'
              ? '10 से अधिक वर्षों का निष्कलंक हाईवे ड्राइविंग अनुभव, नई 2025 वैगनआर और बुजुर्गों व परिवारों के लिए समर्पित सुरक्षित सेवा।'
              : 'With over 10 years of incident-free highway driving, Sachin Sharma offers families, pilgrims, and corporate commuters accountable, punctual, and safe journeys across North India.'}
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
              {lang === 'hi' ? 'हमारे 6 मुख्य सुरक्षा व सेवा सिद्धांत' : 'Our 6 Core Safety & Service Standards'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Every trip with Sachin Sharma adheres strictly to these professional benchmarks:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Commercial Verification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Active commercial heavy and light motor vehicle passenger license issued by UP RTO, with valid police verification and fitness records.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">15-Min Advance Reporting</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Never stress about missing a morning train or airport flight. Sachin arrives 15 minutes before the scheduled pickup time at your society gate.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Brand New 2025 WagonR</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Immaculate condition with quiet highway cruising, high tall-boy ceiling, powerful dual AC, and clean upholstery.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Family & Senior Friendly</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Courteous conduct, zero tobacco/smoking tolerance in the vehicle, and luggage assistance for women and elderly passengers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Emergency & Safety Kit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Equipped with automotive fire extinguisher, first aid medical kit, fully inflated spare wheel, and emergency hydraulic jack.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Direct Accountable Pricing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero app commissions or surge prices. 100% per-km billing with expressway toll receipts shared transparently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Driver Contact CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Travel with Sachin Sharma?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Call Sachin directly to check vehicle availability, confirm your route, and receive an instant transparent quote.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={brandData.phone}
              className="px-8 h-13 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg transition-transform active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call: {brandData.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent('Hello Sachin Sharma ji, I would like to book a cab with you.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 h-13 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg transition-transform active:scale-95"
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
