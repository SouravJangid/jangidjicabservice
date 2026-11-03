import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall, MessageSquare } from 'lucide-react';
import { faqData, brandData } from '../content/data';
import { FaqItem } from '../types';

interface FaqSectionProps {
  lang: 'en' | 'hi';
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            {lang === 'hi' ? 'अक्सर पूछे जाने वाले सवाल' : 'Frequently Asked Questions'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi' ? 'कैब बुकिंग से जुड़ी जानकारी' : 'Cab Booking Information'}
          </h2>
          <p className="text-slate-600 text-sm">
            {lang === 'hi'
              ? 'कैब के प्रकार, रूट, बुकिंग और लागू टैक्स से जुड़े सामान्य सवाल।'
              : 'Information about cab types, routes, booking, and applicable taxes.'}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqData.map((item: FaqItem, idx: number) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left bg-white hover:bg-slate-50 transition-colors flex items-center justify-between gap-4"
                >
                  <span className="text-sm font-bold text-slate-900">
                    {lang === 'hi' ? item.q_hi : item.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-amber-400 text-slate-950' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                    {lang === 'hi' ? item.a_hi : item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-sm font-bold text-amber-950">
              {lang === 'hi' ? 'कोई अन्य सवाल है?' : 'Have a custom itinerary or specific question?'}
            </h3>
            <p className="text-xs text-amber-900/80 mt-0.5">
              {lang === 'hi' ? 'रूट, किराए और उपलब्धता के लिए संपर्क करें।' : 'Contact us to enquire about routes, fares, and availability.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${brandData.phone}`}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Call Now
            </a>
            <a
              href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent('Hello Jangid Ji Cab Service, I have an enquiry about cab service.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#15803d] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
