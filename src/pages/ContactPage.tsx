import React from 'react';
import { BookingForm } from '../components/BookingForm';
import { 
  PhoneCall, 
  MessageSquare, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Mail, 
  ExternalLink,
  Car
} from 'lucide-react';
import { brandData } from '../content/data';

interface ContactPageProps {
  lang: 'en' | 'hi';
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  return (
    <div className="py-10 md:py-16 bg-slate-50 min-h-screen space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
            <PhoneCall className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'hi' ? 'सीधा ड्राइवर हेल्पलाइन (24x7)' : 'Direct Driver Helpline (24x7)'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {lang === 'hi'
              ? 'सचिन शर्मा से सीधे संपर्क करें'
              : 'Contact Sachin Sharma — 24x7 Taxi Enquiries'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {lang === 'hi'
              ? 'बिना किसी थर्ड-पार्टी ब्रोकर या ऐप के सीधे ड्राइवर से बात करें। उपलब्धता व अंतिम किराया तुरंत जानें।'
              : 'Speak directly with your driver. No automated bots or call-centre hold times—get your route quotation and availability confirmed in seconds.'}
          </p>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Phone */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Phone Call (24x7)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Call directly for urgent bookings, airport departures, or instant availability checks.
              </p>
              <p className="text-xl font-black text-emerald-600 pt-1">
                {brandData.phoneDisplay}
              </p>
            </div>
            <a
              href={brandData.phone}
              className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Call Sachin Now
            </a>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#25D366] flex items-center justify-center font-bold">
                <MessageSquare className="w-6 h-6 fill-[#25D366]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">WhatsApp Chat</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Send your travel date, pickup location, and destination for an immediate WhatsApp quotation.
              </p>
              <p className="text-xl font-black text-slate-900 pt-1">
                {brandData.phoneDisplay}
              </p>
            </div>
            <a
              href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent('Hello Sachin Sharma ji, I would like to enquire about cab booking.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Card 3: Base Location */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Driver Base Location</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {brandData.address}
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 pt-1">
                <Clock className="w-4 h-4" />
                <span>Open 24 Hours, 7 Days a Week</span>
              </div>
            </div>
            <a
              href={brandData.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Embedded Booking Form */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingForm lang={lang} />
      </section>
    </div>
  );
};
