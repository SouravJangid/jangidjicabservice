import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  MapPin, 
  Car, 
  Clock, 
  ArrowRight, 
  PhoneCall, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { fleetData, brandData, pricingConfig } from '../content/data';
import { estimateRoadDistanceAndDuration, findLocationByName, generateRoutePoints, POPULAR_INDIAN_LOCATIONS } from '../lib/indianPlaces';
import { calculateFare } from '../lib/fare';
import { DistanceCalculationResult } from '../types';
import { RouteMap } from './RouteMap';

interface FareCalculatorProps {
  lang?: 'en' | 'hi';
  onBookClick?: (details: any) => void;
}

const QUICK_ROUTES = [
  { from: 'Modinagar', to: 'Delhi', label: 'Modinagar ➔ Delhi' },
  { from: 'Modinagar', to: 'Noida', label: 'Modinagar ➔ Noida' },
  { from: 'Modinagar', to: 'Ghaziabad', label: 'Modinagar ➔ Ghaziabad' },
  { from: 'Modinagar', to: 'Meerut', label: 'Modinagar ➔ Meerut' },
  { from: 'Ghaziabad', to: 'Gurugram', label: 'Ghaziabad ➔ Gurugram' },
  { from: 'Delhi', to: 'Haridwar', label: 'Delhi ➔ Haridwar' },
  { from: 'Delhi', to: 'Rishikesh', label: 'Delhi ➔ Rishikesh' },
  { from: 'Modinagar', to: 'Dehradun', label: 'Modinagar ➔ Dehradun' },
  { from: 'Modinagar', to: 'Agra', label: 'Modinagar ➔ Agra' },
  { from: 'Ghaziabad', to: 'Chandigarh', label: 'Ghaziabad ➔ Chandigarh' },
];

export const FareCalculator: React.FC<FareCalculatorProps> = ({ lang = 'en', onBookClick }) => {
  const [pickup, setPickup] = useState<string>('Modinagar');
  const [drop, setDrop] = useState<string>('Delhi');
  const [selectedCar, setSelectedCar] = useState<string>(fleetData[0]?.id ?? '');
  const [tripType, setTripType] = useState<'oneway' | 'round'>('oneway');
  const [days, setDays] = useState<number>(1);
  const [isNight, setIsNight] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<DistanceCalculationResult | null>(null);
  const [calculationNotice, setCalculationNotice] = useState<{ type: 'fallback' | 'error'; text: string } | null>(null);

  // Autocomplete dropdown states
  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
  const [dropSuggestions, setDropSuggestions] = useState<string[]>([]);
  const [showPickupList, setShowPickupList] = useState<boolean>(false);
  const [showDropList, setShowDropList] = useState<boolean>(false);

  // Auto-calculate on initial load
  useEffect(() => {
    handleCalculate();
  }, []);

  const filterPlaces = (val: string) => {
    if (!val.trim()) return POPULAR_INDIAN_LOCATIONS.slice(0, 6).map(p => p.name);
    const q = val.toLowerCase();
    const matches = POPULAR_INDIAN_LOCATIONS
      .filter(p => p.name.toLowerCase().includes(q) || p.aliases?.some(a => a.toLowerCase().includes(q)))
      .slice(0, 6)
      .map(p => p.name);
    const looksLikeAddress = /[,\d]/.test(val) || val.trim().split(/\s+/).length >= 3;
    if (looksLikeAddress && !findLocationByName(val)) {
      return [val.trim(), ...matches.filter((place) => place.toLowerCase() !== q)].slice(0, 6);
    }
    return matches.length ? matches : [val.trim()];
  };

  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPickup(val);
    setPickupSuggestions(filterPlaces(val));
    setShowPickupList(true);
  };

  const handleDropChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDrop(val);
    setDropSuggestions(filterPlaces(val));
    setShowDropList(true);
  };

  const handleSelectQuickRoute = (r: { from: string; to: string }) => {
    setPickup(r.from);
    setDrop(r.to);
    triggerCalculation(r.from, r.to, selectedCar, tripType, days, isNight);
  };

  const triggerCalculation = async (
    p: string,
    d: string,
    car: string,
    type: 'oneway' | 'round',
    numDays: number,
    night: boolean
  ) => {
    setLoading(true);
    setCalculationNotice(null);
    try {
      const res = await fetch('/api/distance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originName: p,
          destName: d,
          car,
          tripType: type,
          days: numDays,
          isNight: night
        })
      });

      if (!res.ok) throw new Error(`Distance API returned ${res.status}`);
      const data = await res.json();
      if (!Number.isFinite(data.km) || !data.coordinates?.origin || !data.coordinates?.dest) {
        throw new Error('Distance API returned an invalid response');
      }
      setResult({
        from: data.from,
        to: data.to,
        km: data.km,
        duration: data.duration,
        durationSeconds: data.durationSeconds,
        fare: data.fare,
        car: data.car,
        tripType: data.tripType,
        days: data.days,
        nightChargeApplied: night,
        tollNote: 'Toll & parking extra as per actual receipts',
        coordinates: data.coordinates,
        polylinePoints: data.routePoints
      });
    } catch {
      const origin = findLocationByName(p);
      const destination = findLocationByName(d);
      if (!origin || !destination) {
        setResult(null);
        setCalculationNotice({
          type: 'error',
          text: lang === 'hi'
            ? 'स्थान नहीं मिला। दूरी देखने के लिए सूची से स्थान चुनें।'
            : 'Location not found. Choose a suggested location to calculate distance.'
        });
        return;
      }

      const estimate = estimateRoadDistanceAndDuration(
        { lat: origin.lat, lng: origin.lng, name: origin.name },
        { lat: destination.lat, lng: destination.lng, name: destination.name }
      );
      const fare = calculateFare({ distanceKm: estimate.km, carId: car, tripType: type, days: numDays, isNight: night });
      setResult({
        from: origin.name,
        to: destination.name,
        km: estimate.km,
        duration: estimate.duration,
        durationSeconds: estimate.durationSec,
        fare: fare.totalFare,
        car,
        tripType: type,
        days: numDays,
        nightChargeApplied: night,
        tollNote: 'Toll & parking extra as per actual receipts',
        coordinates: { origin: [origin.lat, origin.lng], dest: [destination.lat, destination.lng] },
        polylinePoints: generateRoutePoints([origin.lat, origin.lng], [destination.lat, destination.lng])
      });
      setCalculationNotice({
        type: 'fallback',
        text: lang === 'hi'
          ? 'स्थानीय अनुमान दिखाया जा रहा है। सटीक रूट उपलब्ध नहीं है।'
          : 'Showing a local estimate because live route calculation is unavailable.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = () => {
    triggerCalculation(pickup, drop, selectedCar, tripType, days, isNight);
  };

  // Build WhatsApp Pre-filled link
  const getWhatsAppBookingLink = () => {
    const carObj = fleetData.find(c => c.id === selectedCar);
    const carName = carObj ? carObj.name : 'AC or Non-AC cab';
    const kmText = result ? `${result.km} km` : 'Pending';

    const msg = `Hello Jangid Ji Cab Service, I would like to enquire about a cab booking.
*Pickup:* ${pickup}
*Drop:* ${drop}
*Vehicle:* ${carName}
*Trip Type:* ${tripType === 'oneway' ? 'One-Way' : `Round Trip (${days} Day${days > 1 ? 's' : ''})`}
*Road Distance:* ${kmText}
*Fare:* Please share the fare
Please confirm cab availability and fare for my travel date.`;

    return `https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  const activeVehicle = fleetData.find(c => c.id === selectedCar) || fleetData[0];

  return (
    <div id="calculator" className="w-full max-w-6xl mx-auto relative">
      {/* Decorative ambient backdrop orbs */}
      <div className="absolute -top-12 -left-12 w-72 h-72 bg-gradient-to-tr from-violet-600/15 to-transparent rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-gradient-to-br from-amber-400/15 to-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-float-reverse" />

      {/* Iridescent Gen-Z Border Frame */}
      <div className="p-[1px] rounded-3xl bg-gradient-to-r from-amber-400/40 via-violet-500/30 to-emerald-400/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)]">
        <div className="relative glass-panel rounded-3xl overflow-hidden">
          {/* Top Header Strip with Cyber Obsidian style */}
          <div className="bg-[#070B14]/95 backdrop-blur-2xl px-6 py-5 text-white flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-500 text-slate-950 flex items-center justify-center font-black shadow-[0_0_15px_rgba(245,158,11,0.4)] shrink-0">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2 flex-wrap">
                  <span>{lang === 'hi' ? 'दूरी और किराया पूछताछ' : 'Distance & Fare Enquiry'}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                    {lang === 'hi' ? 'अनुमानित सड़क दूरी' : 'Road KM Estimate'}
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  {lang === 'hi'
                    ? 'रूट की दूरी देखें और WhatsApp पर किराए की पुष्टि करें।'
                    : 'Check a route distance and enquire on WhatsApp to confirm the fare.'}
                </p>
              </div>
            </div>

            {/* Trip Type Toggle (One-way vs Round Trip) - Gen-Z Glass Pill */}
            <div className="flex items-center bg-white/5 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-inner">
              <button
                type="button"
                onClick={() => {
                  setTripType('oneway');
                  triggerCalculation(pickup, drop, selectedCar, 'oneway', days, isNight);
                }}
                className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  tripType === 'oneway'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)] font-black'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {lang === 'hi' ? 'एक तरफ (One-Way)' : 'One-Way'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setTripType('round');
                  triggerCalculation(pickup, drop, selectedCar, 'round', days, isNight);
                }}
                className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  tripType === 'round'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)] font-black'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {lang === 'hi' ? 'राउंड ट्रिप (Round Trip)' : 'Round Trip'}
              </button>
            </div>
          </div>

          {/* Quick Pick Route Chips - Frosted sub-strip */}
          <div className="bg-white/50 backdrop-blur-md px-6 py-3 border-b border-slate-200/60 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-xs font-black text-slate-700 whitespace-nowrap flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {lang === 'hi' ? 'लोकप्रिय रूट:' : 'Popular Routes:'}
            </span>
            <div className="flex items-center gap-2">
              {QUICK_ROUTES.map((r, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectQuickRoute(r)}
                  className="text-xs font-semibold px-3 py-1 bg-white hover:bg-amber-100 hover:text-amber-900 text-slate-700 rounded-full border border-slate-200/80 transition-all shadow-xs whitespace-nowrap active:scale-95"
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

        {/* Main Form Body */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end">
            {/* Pickup Input */}
            <div className="md:col-span-4 relative">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                {lang === 'hi' ? 'पिकअप स्थान (Pickup Location)' : 'Pickup Location'}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                <input
                  type="text"
                  value={pickup}
                  onChange={handlePickupChange}
                  onFocus={() => {
                    setPickupSuggestions(filterPlaces(pickup));
                    setShowPickupList(true);
                  }}
                  onBlur={() => setTimeout(() => setShowPickupList(false), 200)}
                  placeholder={lang === 'hi' ? 'शहर, लैंडमार्क या पूरा पता' : 'City, landmark, or full address'}
                  maxLength={250}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-300/80 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white/90 backdrop-blur-sm shadow-xs transition-all"
                />
              </div>

              {/* Autocomplete Dropdown */}
              {showPickupList && (
                <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto">
                  {pickupSuggestions.map((place, idx) => (
                    <div
                      key={idx}
                      onMouseDown={() => {
                        setPickup(place);
                        setShowPickupList(false);
                      }}
                      className="px-4 py-2.5 text-xs text-slate-800 hover:bg-amber-50 hover:text-amber-900 cursor-pointer border-b border-slate-100 last:border-none flex items-center justify-between"
                    >
                      <span className="font-medium">{place}</span>
                      <span className="text-[10px] text-slate-400">{findLocationByName(place) ? (lang === 'hi' ? 'चुनें' : 'Select') : (lang === 'hi' ? 'पूरा पता इस्तेमाल करें' : 'Use this address')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Drop Input */}
            <div className="md:col-span-4 relative">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                {lang === 'hi' ? 'ड्रॉप स्थान (Drop Destination)' : 'Drop Destination'}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
                <input
                  type="text"
                  value={drop}
                  onChange={handleDropChange}
                  onFocus={() => {
                    setDropSuggestions(filterPlaces(drop));
                    setShowDropList(true);
                  }}
                  onBlur={() => setTimeout(() => setShowDropList(false), 200)}
                  placeholder={lang === 'hi' ? 'शहर, लैंडमार्क या पूरा पता' : 'City, landmark, or full address'}
                  maxLength={250}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-300/80 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white/90 backdrop-blur-sm shadow-xs transition-all"
                />
              </div>

              {/* Autocomplete Dropdown */}
              {showDropList && (
                <div className="absolute top-full left-0 right-0 z-30 mt-1.5 bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-2xl overflow-hidden max-h-48 overflow-y-auto">
                  {dropSuggestions.map((place, idx) => (
                    <div
                      key={idx}
                      onMouseDown={() => {
                        setDrop(place);
                        setShowDropList(false);
                      }}
                      className="px-4 py-2.5 text-xs text-slate-800 hover:bg-amber-50 hover:text-amber-900 cursor-pointer border-b border-slate-100 last:border-none flex items-center justify-between transition-colors"
                    >
                      <span className="font-semibold">{place}</span>
                      <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md">{findLocationByName(place) ? (lang === 'hi' ? 'चुनें' : 'Select') : (lang === 'hi' ? 'पूरा पता इस्तेमाल करें' : 'Use this address')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Car Selection */}
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>{lang === 'hi' ? 'गाड़ी का प्रकार (Car Type)' : 'Car Type'}</span>
                <span className="text-amber-600 font-extrabold px-2 py-0.5 bg-amber-50 rounded-md border border-amber-200/60 text-[11px]">{lang === 'hi' ? 'किराया पूछें' : 'Fare on enquiry'}</span>
              </label>
              <div className="relative">
                <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <select
                  value={selectedCar}
                  onChange={(e) => {
                    setSelectedCar(e.target.value);
                    triggerCalculation(pickup, drop, e.target.value, tripType, days, isNight);
                  }}
                  className="w-full h-12 pl-10 pr-8 rounded-xl border border-slate-300/80 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white/90 backdrop-blur-sm shadow-xs cursor-pointer appearance-none transition-all"
                >
                  {fleetData.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Controls (Days for roundtrip & Night travel toggle) */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-1 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-6">
              {/* Days selection if round-trip */}
              {tripType === 'round' && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-semibold text-slate-700">
                    {lang === 'hi' ? 'यात्रा के दिन:' : 'Trip Duration:'}
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          setDays(d);
                          triggerCalculation(pickup, drop, selectedCar, tripType, d, isNight);
                        }}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                          days === d
                            ? 'bg-amber-400 text-slate-950 shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {d}d
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Calculate / Refresh Button */}
            <button
              type="button"
              onClick={handleCalculate}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all active:scale-95 ml-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              {loading ? (lang === 'hi' ? 'गणना हो रही है...' : 'Calculating...') : (lang === 'hi' ? 'दूरी देखें' : 'Check Distance')}
            </button>
          </div>

          {calculationNotice && (
            <p
              role={calculationNotice.type === 'error' ? 'alert' : 'status'}
              className={`text-xs ${calculationNotice.type === 'error' ? 'text-red-700' : 'text-amber-800'}`}
            >
              {calculationNotice.text}
            </p>
          )}

          {/* Result Strip Banner with glass-panel-dark */}
          {result && (
            <div className="rounded-3xl bg-slate-950/90 backdrop-blur-2xl text-white p-6 md:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/15 relative overflow-hidden">
              {/* Subtle radial ambient glow inside result card */}
              <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Distance & Time */}
                <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
                  <span className="text-[11px] uppercase tracking-widest text-slate-400 font-bold block mb-1">
                    {lang === 'hi' ? 'अनुमानित सड़क दूरी व समय' : 'Approximate Road Distance & Time'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-5xl font-black text-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                      {result.km}
                    </span>
                    <span className="text-sm font-bold text-slate-300">KM</span>
                    <span className="text-slate-600 mx-1">|</span>
                    <span className="text-lg font-bold text-white flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-400" />
                      {result.duration}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    {lang === 'hi'
                      ? 'दूरी और समय अनुमानित हैं। अंतिम जानकारी बुकिंग के समय कन्फर्म करें।'
                      : 'Distance and time are estimates. Confirm trip details when enquiring.'}
                  </p>
                </div>

                {/* Fare Enquiry */}
                <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
                  <span className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                    {lang === 'hi' ? 'किराया' : 'Fare'}
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-2xl md:text-3xl font-black text-emerald-400">{lang === 'hi' ? 'पूछताछ करें' : 'On enquiry'}</span>
                  </div>
                  <p className="text-[11px] text-amber-300/90 mt-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    {lang === 'hi' ? 'लागू राज्य टैक्स और रोड टैक्स अलग से देय' : 'Applicable state tax and road tax are payable separately'}
                  </p>
                </div>

                {/* Action CTAs (WhatsApp & Phone) with glowing shining beam style */}
                <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5">
                  <a
                    href={getWhatsAppBookingLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shining-beam flex-1 h-12 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1ebe5d] hover:from-[#20ba59] hover:to-[#17a84e] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all hover:scale-[1.02] active:scale-95 border border-emerald-300/40"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    {lang === 'hi' ? 'व्हाट्सएप पर बुक करें' : 'Book on WhatsApp'}
                  </a>

                  <a
                    href={brandData.phone}
                    className="shining-beam flex-1 h-12 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all hover:scale-[1.02] active:scale-95 border border-emerald-400/40"
                  >
                    <PhoneCall className="w-4 h-4" />
                    {lang === 'hi' ? 'अभी कॉल करें' : 'Call Now'}
                  </a>
                </div>
              </div>

            </div>
          )}

          {/* Route Map Preview */}
          {result && (
            <div className="pt-2">
              <RouteMap
                origin={result.from}
                destination={result.to}
                km={result.km}
                duration={result.duration}
                coordinates={result.coordinates}
                routePoints={result.polylinePoints}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};
