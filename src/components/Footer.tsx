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
import { brandData, componentContent, popularRoutes } from '../content/data';

interface FooterProps {
  lang: 'en' | 'hi';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-16 pb-24 2xl:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Driver Identity */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg group-hover:scale-105 transition-transform">
                <Car className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white">
                {brandData.name}
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {lang === 'hi' ? componentContent.footer.description_hi : componentContent.footer.description}
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
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              {lang === 'hi' ? componentContent.contact.title_hi : componentContent.contact.title}
            </h2>
            <div className="space-y-3 text-xs">
              <a
                href={`tel:${brandData.phone}`}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-200 transition-colors group"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="text-[10px] text-slate-400 block">{lang === 'hi' ? componentContent.contact.phoneTitle_hi : componentContent.contact.phoneTitle}</span>
                  <span className="font-bold text-white text-sm">{brandData.phoneDisplay}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent('Hello Jangid Ji Cab Service, I would like to enquire about a cab booking.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#25D366] text-slate-200 transition-colors group"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] fill-[#25D366] group-hover:scale-110 transition-transform" />
                <div>
                  <span className="text-[10px] text-slate-400 block">{lang === 'hi' ? componentContent.contact.whatsappTitle_hi : componentContent.contact.whatsappTitle}</span>
                  <span className="font-bold text-white text-sm">{brandData.phoneDisplay}</span>
                </div>
              </a>

              <a
                href={brandData.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline pt-1"
              >
                  <span>{lang === 'hi' ? 'Google Maps पर देखें' : 'View Modinagar on Google Maps'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 3: Popular Route Landing Links & Pages */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              {lang === 'hi' ? 'लोकप्रिय रूट' : 'Popular Routes'}
            </h2>
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
                  <span>{lang === 'hi' ? 'यात्रा जानकारी देखें ➔' : 'View Travel Information ➔'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Verification Badges */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              {lang === 'hi' ? 'कैब सेवा जानकारी' : 'Cab Service Details'}
            </h2>
            <div className="space-y-2 text-[11px] text-slate-300">
              {(lang === 'hi' ? componentContent.footer.serviceBadges_hi : componentContent.footer.serviceBadges).map((badge, index) => (
                <div key={`${badge}-${index}`} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                  {index === 0 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    : index === 1 ? <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    : <Car className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                  <span>{badge}</span>
                </div>
              ))}
            </div>
            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-900">
              <span>{lang === 'hi' ? componentContent.footer.taxNotice_hi : componentContent.footer.taxNotice}</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {brandData.name} (Modinagar). All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>AC & Non-AC</span>
            <span>•</span>
            <span>Local & Outstation</span>
            <span>•</span>
            <span>WhatsApp Booking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
