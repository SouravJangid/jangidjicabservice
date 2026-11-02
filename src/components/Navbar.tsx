import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  PhoneCall, 
  MessageSquare, 
  Globe, 
  Menu, 
  X, 
  Car, 
  Sparkles,
  MapPin,
  BookOpen
} from 'lucide-react';
import { brandData } from '../content/data';

interface NavbarProps {
  lang: 'en' | 'hi';
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-[#070B14]/85 backdrop-blur-2xl border-b border-white/10 text-white transition-all shadow-[0_10px_35px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand with glowing iridescent halo */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-400 via-violet-500 to-emerald-400 opacity-70 blur-sm group-hover:opacity-100 transition-opacity animate-pulse-subtle" />
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0B0F19] to-slate-900 border border-amber-400/50 text-amber-400 flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-105 transition-transform">
                <Car className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight group-hover:text-amber-300 transition-colors">
                  Sachin Sharma <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">Cabs</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-400/30 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  24x7
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                <MapPin className="w-3 h-3 text-amber-400" />
                Modinagar, Ghaziabad (UP)
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links with Gen-Z Glass Pills */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-inner text-xs font-semibold">
            <Link
              to="/"
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                isActive('/')
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {lang === 'hi' ? 'होम' : 'Home'}
            </Link>
            <Link
              to="/about"
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                isActive('/about')
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {lang === 'hi' ? 'ड्राइवर परिचय' : 'About'}
            </Link>
            <Link
              to="/fleet"
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                isActive('/fleet')
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {lang === 'hi' ? 'गाड़ियां' : 'Fleet & Rates'}
            </Link>
            <Link
              to="/routes"
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                isActive('/routes')
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {lang === 'hi' ? 'रूट्स' : 'Routes'}
            </Link>
            <Link
              to="/services"
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                isActive('/services')
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {lang === 'hi' ? 'सेवाएं' : 'Services'}
            </Link>
            <Link
              to="/blog"
              className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                isActive('/blog') || location.pathname.startsWith('/blog/')
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'hi' ? 'ब्लॉग व गाइड' : 'Travel Blog'}</span>
            </Link>
            <Link
              to="/contact"
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                isActive('/contact')
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {lang === 'hi' ? 'संपर्क' : 'Contact'}
            </Link>
          </div>

          {/* Actions: Lang toggle, Shining Glass buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Switcher Glass Pill */}
            <button
              onClick={onToggleLang}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold border border-white/15 flex items-center gap-1.5 transition-all shadow-xs active:scale-95 backdrop-blur-md"
              title="Switch language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* WhatsApp Direct CTA */}
            <a
              href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent('Hello Sachin Sharma ji, I would like to enquire about cab booking.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#25D366]/90 hover:bg-[#25D366] text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,211,102,0.35)] border border-[#25D366]/40"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
            </a>

            {/* Direct Call CTA with Shining Light Beam & Emerald Aura */}
            <a
              href={brandData.phone}
              className="shining-beam px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all hover:scale-105 active:scale-95 border border-emerald-400/40"
            >
              <PhoneCall className="w-4 h-4 animate-pulse-subtle" />
              <span>{lang === 'hi' ? 'कॉल करें' : 'Call Now'}</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1.5 rounded-xl bg-white/10 text-slate-200 text-xs font-bold border border-white/15 backdrop-blur-md"
            >
              {lang === 'en' ? 'हिन्दी' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 text-slate-200 hover:text-white border border-white/15 backdrop-blur-md"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown with Glass Panel */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950/95 border-b border-white/10 px-5 pt-3 pb-6 space-y-3 backdrop-blur-2xl">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-300">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                isActive('/')
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                  : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}
            >
              {lang === 'hi' ? 'होम' : 'Home'}
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                isActive('/about')
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                  : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}
            >
              {lang === 'hi' ? 'ड्राइवर परिचय' : 'About'}
            </Link>
            <Link
              to="/fleet"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                isActive('/fleet')
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                  : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}
            >
              {lang === 'hi' ? 'गाड़ियां' : 'Fleet & Rates'}
            </Link>
            <Link
              to="/routes"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                isActive('/routes')
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                  : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}
            >
              {lang === 'hi' ? 'लोकप्रिय रूट्स' : 'Routes'}
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                isActive('/services')
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                  : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}
            >
              {lang === 'hi' ? 'सेवाएं' : 'Services'}
            </Link>
            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                isActive('/blog')
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                  : 'bg-white/5 border-white/5 hover:bg-white/10 text-amber-300'
              }`}
            >
              {lang === 'hi' ? 'ब्लॉग व गाइड' : 'Travel Blog'}
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`col-span-2 p-2.5 rounded-xl border text-center transition-all ${
                isActive('/contact')
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                  : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}
            >
              {lang === 'hi' ? 'संपर्क करें' : 'Contact Us'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
