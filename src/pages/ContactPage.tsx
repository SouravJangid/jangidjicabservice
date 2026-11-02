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
import { brandData, componentContent } from '../content/data';

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
            <span>{lang === 'hi' ? componentContent.contact.title_hi : componentContent.contact.title}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {lang === 'hi'
              ? `${brandData.name} से संपर्क करें`
              : `Contact ${brandData.name}`}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {lang === 'hi'
              ? componentContent.contact.description_hi
              : componentContent.contact.description}
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
              <h3 className="text-lg font-bold text-slate-900">{lang === 'hi' ? componentContent.contact.phoneTitle_hi : componentContent.contact.phoneTitle}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'hi' ? componentContent.contact.phoneDescription_hi : componentContent.contact.phoneDescription}
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
              Call Now
            </a>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#25D366] flex items-center justify-center font-bold">
                <MessageSquare className="w-6 h-6 fill-[#25D366]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{lang === 'hi' ? componentContent.contact.whatsappTitle_hi : componentContent.contact.whatsappTitle}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'hi' ? componentContent.contact.whatsappDescription_hi : componentContent.contact.whatsappDescription}
              </p>
              <p className="text-xl font-black text-slate-900 pt-1">
                {brandData.phoneDisplay}
              </p>
            </div>
            <a
              href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent('Hello Jangid Ji Cab Service, I would like to enquire about cab booking.')}`}
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
              <h3 className="text-lg font-bold text-slate-900">{lang === 'hi' ? componentContent.contact.serviceBaseTitle_hi : componentContent.contact.serviceBaseTitle}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {brandData.address}
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 pt-1">
                <Clock className="w-4 h-4" />
                <span>{lang === 'hi' ? componentContent.contact.availabilityLabel_hi : componentContent.contact.availabilityLabel}</span>
              </div>
            </div>
            <a
              href={brandData.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {lang === 'hi' ? componentContent.contact.mapButtonLabel_hi : componentContent.contact.mapButtonLabel}
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
