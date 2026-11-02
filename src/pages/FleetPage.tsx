import React, { useState } from 'react';
import { FleetSection } from '../components/FleetSection';
import { FareCalculator } from '../components/FareCalculator';
import { Car } from 'lucide-react';
import { componentContent, fleetData } from '../content/data';

interface FleetPageProps {
  lang: 'en' | 'hi';
}

export const FleetPage: React.FC<FleetPageProps> = ({ lang }) => {
  const [selectedCar, setSelectedCar] = useState<string>('ac');

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
            <span>{lang === 'hi' ? 'कैब के प्रकार' : 'Cab Types'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {lang === 'hi'
              ? 'AC और Non-AC कैब सेवा'
              : 'AC & Non-AC Cab Service'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {lang === 'hi'
              ? 'लोकल एवं आउटस्टेशन यात्रा के लिए वन-वे और राउंड ट्रिप बुकिंग। किराया और उपलब्धता की पुष्टि करें।'
              : 'One-way and round-trip bookings for local and outstation travel. Confirm the fare and availability before booking.'}
          </p>
        </div>
      </div>

      {/* Fleet Cards Section */}
      <FleetSection
        lang={lang}
        onSelectCar={scrollToCalculator}
      />

      {/* Cab Type Information Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {componentContent.fleet.title} & Booking Options
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {componentContent.footer.taxNotice}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse rounded-2xl overflow-hidden shadow-xs">
              <thead className="bg-slate-900 text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Cab Type</th>
                  <th className="p-3.5">Service</th>
                  <th className="p-3.5">Trip Types</th>
                  <th className="p-3.5">Availability</th>
                  <th className="p-3.5">Fare</th>
                  <th className="p-3.5">Booking</th>
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
                    <td className="p-3.5 font-semibold text-slate-800">Local & Outstation</td>
                    <td className="p-3.5 text-slate-600">One-Way & Round Trip</td>
                    <td className="p-3.5 font-extrabold text-emerald-600">
                      {car.ratePerKm > 0 ? `₹${car.ratePerKm} / km` : componentContent.fleet.fareLabel}
                    </td>
                    <td className="p-3.5 text-slate-600">Confirm before booking</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => scrollToCalculator(car.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Enquire
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
