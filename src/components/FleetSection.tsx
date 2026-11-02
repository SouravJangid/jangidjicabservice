import React from 'react';
import { Users, Luggage, Wind, ArrowRight, Sparkles, Check } from 'lucide-react';
import { fleetData, brandData, componentContent, imageData } from '../content/data';
import { Vehicle } from '../types';

interface FleetSectionProps {
  lang: 'en' | 'hi';
  onSelectCar: (carId: string) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ lang, onSelectCar }) => {
  return (
    <section id="fleet" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            {lang === 'hi' ? componentContent.fleet.title_hi : componentContent.fleet.title}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi'
              ? 'लोकल एवं आउटस्टेशन कैब सेवा'
              : 'Local & Outstation Cab Service'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'hi'
              ? 'AC और Non-AC कैब के विकल्प। बुकिंग से पहले किराया और उपलब्धता की पुष्टि करें।'
              : 'Choose an AC or Non-AC cab for local or outstation travel. Confirm the fare and availability before booking.'}
          </p>
        </div>

        {/* Fleet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fleetData.map((car: Vehicle) => {
            const isFeatured = car.id === 'ac';
            return (
              <div
                key={car.id}
                className={`relative rounded-3xl backdrop-blur-xl border transition-all duration-300 hover:shadow-2xl flex flex-col justify-between overflow-hidden group ${
                  isFeatured
                    ? 'shining-beam bg-white/95 border-amber-400 ring-2 ring-amber-400/60 shadow-[0_20px_50px_rgba(245,158,11,0.25)] hover:-translate-y-2'
                    : 'bg-white/85 border-slate-200/80 shadow-md hover:border-slate-300 hover:-translate-y-1'
                }`}
              >
                {/* Top Badge */}
                {car.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full shadow-lg ${
                        isFeatured
                          ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 animate-pulse-subtle shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                          : 'bg-slate-900/90 backdrop-blur-md text-white border border-white/20'
                      }`}
                    >
                      {car.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Car Image Placeholder / Photography */}
                  <div className="relative h-48 bg-slate-900 overflow-hidden flex items-center justify-center">
                    <img
                      src={car.imageUrl || (car.ac ? imageData.cabAc : imageData.cabNonAc)}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = imageData.cabAc;
                      }}
                      alt={car.name}
                      className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                          {car.category}
                        </span>
                        <h3 className="text-xl font-extrabold text-white leading-tight">
                          {car.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-amber-400">
                          {car.ratePerKm > 0
                            ? `₹${car.ratePerKm}`
                            : (lang === 'hi' ? componentContent.fleet.fareLabel_hi : componentContent.fleet.fareLabel)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    {/* Model description */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {car.description}
                    </p>

                    {/* Quick Specs Chips */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs font-semibold text-slate-700 text-center">
                      <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50">
                        <Users className="w-4 h-4 text-slate-500 mb-1" />
                        <span>{lang === 'hi' ? 'लोकल एवं आउटस्टेशन' : 'Local & Outstation'}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50">
                        <Luggage className="w-4 h-4 text-slate-500 mb-1" />
                        <span className="truncate max-w-full text-[10px]">{lang === 'hi' ? 'वन-वे और राउंड ट्रिप' : 'One-way & round trips'}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50">
                        <Wind className="w-4 h-4 text-blue-500 mb-1" />
                        <span>{car.ac ? 'AC Cab' : 'Non-AC Cab'}</span>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-1.5 pt-1">
                      {car.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCar(car.id);
                      const el = document.getElementById('calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full h-12 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${
                      isFeatured
                        ? 'shining-beam bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{lang === 'hi' ? 'इस कैब के बारे में पूछें' : `Enquire about ${car.name}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent(`Hello Jangid Ji Cab Service, I would like to enquire about an ${car.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center block text-[11px] font-semibold text-slate-500 hover:text-emerald-600 py-1"
                  >
                    Or chat on WhatsApp ➔
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
