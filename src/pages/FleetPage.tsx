import React, { useState } from 'react';
import { FleetSection } from '../components/FleetSection';
import { FareCalculator } from '../components/FareCalculator';
import { Car, Sparkles, ShieldCheck, Check, Users, Luggage, Wind, PhoneCall, MessageSquare } from 'lucide-react';
import { fleetData, brandData, pricingConfig } from '../content/data';

interface FleetPageProps {
  lang: 'en' | 'hi';
}

export const FleetPage: React.FC<FleetPageProps> = ({ lang }) => {
  const [selectedCar, setSelectedCar] = useState<string>('wagonr');

  const scrollToCalculator = (carId: string) => {
    setSelectedCar(carId);
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="py-10 md:py-16 bg-slate-50 min-h-screen space-y-16">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
            <Car className="w-4 h-4 text-amber-600" />
            <span>{lang === 'hi' ? 'गाड़ियां व प्रति-किमी दरें' : 'Vehicle Fleet & Per-KM Rates'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {lang === 'hi'
              ? 'नई 2025 वैगनआर से लेकर लग्जरी इनोवा क्रिस्टा तक'
              : 'Our Complete Passenger Fleet & Transparent Pricing'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {lang === 'hi'
              ? 'सभी गाड़ियां 100% एयर-कंडीशंड, साफ-सुथरी और कमर्शियल परमिट युक्त। अपनी यात्रा के अनुसार सही गाड़ी चुनें।'
              : 'Every vehicle in our fleet is fully air-conditioned, FastTag equipped, regularly sanitized, and backed by transparent per-km billing.'}
          </p>
        </div>
      </div>

      {/* Fleet Cards Section */}
      <FleetSection
        lang={lang}
        onSelectCar={scrollToCalculator}
      />

      {/* Rate Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Vehicle Rates & Specifications Comparison
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Tolls and state entry taxes extra at actual government receipts.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse rounded-2xl overflow-hidden shadow-xs">
              <thead className="bg-slate-900 text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Car Model</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Seats</th>
                  <th className="p-3.5">Luggage Boot</th>
                  <th className="p-3.5">Rate / KM</th>
                  <th className="p-3.5">Min. Outstation KM</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {fleetData.map((car) => (
                  <tr key={car.id} className="hover:bg-amber-50/60 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      {car.name}
                    </td>
                    <td className="p-3.5 text-slate-600">{car.category}</td>
                    <td className="p-3.5 font-semibold text-slate-800">{car.seats} Passengers</td>
                    <td className="p-3.5 text-slate-600">{car.luggage}</td>
                    <td className="p-3.5 font-extrabold text-emerald-600">₹{car.ratePerKm} / km</td>
                    <td className="p-3.5 text-slate-600">250 km / day</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => scrollToCalculator(car.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Calculate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Embedded Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FareCalculator lang={lang} />
      </section>
    </div>
  );
};
