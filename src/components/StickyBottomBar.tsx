import React from 'react';
import { PhoneCall, MessageSquare } from 'lucide-react';
import { brandData } from '../content/data';

interface StickyBottomBarProps {
  lang?: 'en' | 'hi';
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({ lang = 'en' }) => {
  const waUrl = `https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent('Hello Jangid Ji Cab Service, I would like to enquire about a cab booking.')}`;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 flex gap-2.5 p-2.5 bg-[#050811]/90 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.7)] 2xl:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t border-white/10">
      {/* 50% Green Call Button with shining beam & glow */}
      <a
        href={`tel:${brandData.phone}`}
        className="shining-beam flex-1 h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-sm tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 transition-all border border-emerald-400/40"
      >
        <PhoneCall className="w-4 h-4 animate-pulse-subtle" />
        <span>{lang === 'hi' ? '📞 कॉल करें' : '📞 Call Now'}</span>
      </a>

      {/* 50% WhatsApp Button with shining beam & glow */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shining-beam flex-1 h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#1ebe5d] hover:from-[#20ba59] hover:to-[#17a84e] text-white font-black text-sm tracking-wide shadow-[0_0_20px_rgba(37,211,102,0.4)] active:scale-95 transition-all border border-emerald-300/40"
      >
        <MessageSquare className="w-4 h-4 fill-white" />
        <span>{lang === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</span>
      </a>
    </div>
  );
};
