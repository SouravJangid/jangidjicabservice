import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  MapPin, 
  PhoneCall, 
  MessageSquare, 
  Mail, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { brandData, popularRoutes } from '../content/data';

interface FooterProps {
  lang: 'en' | 'hi';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Driver Identity */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg group-hover:scale-105 transition-transform">
                <Car className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white">
                Sachin Sharma <span className="text-amber-400">Cabs</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {lang === 'hi'
                ? 'मोदीनगर, गाजियाबाद स्थित आपका अपना स्थानीय कैब ड्राइवर। 2025 वैगनआर, सेडान और एसयूवी के साथ हरिद्वार, दिल्ली एयरपोर्ट व पूरे भारत के लिए सुरक्षित व किफायती सेवा।'
                : 'Your trusted local driver based in Modinagar, Ghaziabad. Offering 24x7 verified cab services across Delhi-NCR, Haridwar, Rishikesh, and all of India in clean, comfortable 2025 AC vehicles.'}
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{brandData.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-emerald-400">{brandData.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Direct Contact & Booking */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              {lang === 'hi' ? 'सीधा संपर्क (24x7)' : 'Direct Driver Contact'}
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={brandData.phone}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-200 transition-colors group"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Driver Mobile (Call)</span>
                  <span className="font-bold text-white text-sm">{brandData.phoneDisplay}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent('Hello Sachin Sharma ji, I would like to book a cab.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#25D366] text-slate-200 transition-colors group"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] fill-[#25D366] group-hover:scale-110 transition-transform" />
                <div>
                  <span className="text-[10px] text-slate-400 block">WhatsApp Direct Chat</span>
                  <span className="font-bold text-white text-sm">{brandData.phoneDisplay}</span>
                </div>
              </a>

              <a
                href={brandData.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline pt-1"
              >
                <span>View Modinagar location on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 3: Popular Route Landing Links & Pages */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              {lang === 'hi' ? 'प्रमुख रूट्स व गाइड' : 'Popular Routes & SEO Guides'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {popularRoutes.slice(0, 5).map(r => (
                <li key={r.slug}>
                  <Link to={`/routes/${r.slug}`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                    <span className="text-amber-400">›</span>
                    <span>{r.title}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link to="/blog" className="text-amber-300 hover:underline flex items-center gap-1 font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'सभी ब्लॉग व यात्रा गाइड ➔' : 'View All Travel Blogs ➔'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Verification Badges */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              {lang === 'hi' ? 'भरोसा व सुरक्षा' : 'Trust & Safety'}
            </h4>
            <div className="space-y-2 text-[11px] text-slate-300">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Police Verified Driver</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>10+ Years Clean Record</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                <Car className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>2025 WagonR & Fleet</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-900">
              <span>DPDP Compliance: Private passenger data is never shared.</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Sachin Sharma Cabs (Modinagar, Ghaziabad). All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>FastTag Enabled</span>
            <span>•</span>
            <span>Commercial Permit</span>
            <span>•</span>
            <span>Police Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
