import React from 'react';
import { ServicesSection } from '../components/ServicesSection';
import { BookingForm } from '../components/BookingForm';
import { ShieldCheck, PhoneCall, MessageSquare, MapPin, CheckCircle2 } from 'lucide-react';
import { brandData } from '../content/data';

interface ServicesPageProps {
  lang: 'en' | 'hi';
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ lang }) => {
  return (
    <div className="py-10 md:py-16 bg-slate-50 min-h-screen space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'hi' ? 'समर्पित कैब सेवाएं' : 'Tailored Passenger Cab Services'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {lang === 'hi'
              ? 'लोकल एवं आउटस्टेशन कैब सेवा'
              : 'Local & Outstation Cab Service'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {lang === 'hi'
              ? 'AC और Non-AC कैब के लिए वन-वे और राउंड ट्रिप बुकिंग। किराया और उपलब्धता की पुष्टि के लिए संपर्क करें।'
              : 'Book AC or Non-AC cabs for one-way or round trips. Contact us to confirm the fare and availability.'}
          </p>
        </div>
      </div>

      {/* Services Section */}
      <ServicesSection lang={lang} />

      {/* Booking Form Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingForm lang={lang} />
      </section>
    </div>
  );
};
