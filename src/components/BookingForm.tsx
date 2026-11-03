import React, { useState } from 'react';
import { 
  MessageSquare, 
  PhoneCall, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Clock, 
  Users, 
  Car, 
  MapPin, 
  Luggage
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { brandData, fleetData } from '../content/data';

interface BookingFormProps {
  lang?: 'en' | 'hi';
}

export const BookingForm: React.FC<BookingFormProps> = ({ lang = 'en' }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickup, setPickup] = useState('Modinagar');
  const [drop, setDrop] = useState('Delhi');
  const [car, setCar] = useState(fleetData[0]?.id ?? '');
  const [tripType, setTripType] = useState('oneway');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam honeypot

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string; waUrl?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot detected

    if (!name.trim() || !phone.trim() || !pickup.trim() || !drop.trim()) {
      setStatusMessage({
        type: 'error',
        text: lang === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' : 'Please fill all required fields.'
      });
      return;
    }

    // Validate 10-digit Indian phone
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setStatusMessage({
        type: 'error',
        text: lang === 'hi' ? 'कृपया 10 अंकों का मान्य भारतीय मोबाइल नंबर दर्ज करें।' : 'Please provide a valid 10-digit Indian mobile number.'
      });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: cleanPhone,
          pickup,
          drop,
          car,
          tripType,
          date,
          time,
          passengers,
          notes
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });

        setStatusMessage({
          type: 'success',
          text: lang === 'hi'
            ? 'आपकी पूछताछ तैयार है। इसे भेजने और उपलब्धता व किराया कन्फर्म करने के लिए WhatsApp पर आगे बढ़ें।'
            : 'Your enquiry is ready. Continue to WhatsApp to send it and confirm cab availability and fare.',
          waUrl: data.whatsappUrl
        });
        setName('');
        setPhone('');
        setPickup('');
        setDrop('');
        setCar(fleetData[0]?.id ?? '');
        setTripType('oneway');
        setDate('');
        setTime('');
        setPassengers(2);
        setNotes('');
      } else {
        setStatusMessage({
          type: 'error',
          text: data.error || 'Failed to submit inquiry'
        });
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Network error. Please contact Jangid Ji Cab Service directly.'
      });
    } finally {
      setLoading(false);
    }
  };

  const getDirectWhatsAppUrl = () => {
    const selectedCarObj = fleetData.find(c => c.id === car);
    const carTitle = selectedCarObj ? selectedCarObj.name : 'AC or Non-AC cab';
    const msg = `Hello Jangid Ji Cab Service, I would like to enquire about a cab booking.
*Name:* ${name || 'Customer'}
*Phone:* ${phone || 'Pending'}
*Pickup:* ${pickup}
*Drop:* ${drop}
*Vehicle:* ${carTitle}
*Travel Date:* ${date || 'Upcoming'} at ${time || 'Flexible'}
*Passengers:* ${passengers}
Please check availability and send me the quote.`;

    return `https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div id="booking" className="w-full max-w-4xl mx-auto my-12 relative">
      {/* Ambient background blur */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative glass-panel rounded-3xl overflow-hidden shadow-2xl">
        {/* Form Header */}
        <div className="bg-slate-950/95 backdrop-blur-xl text-white p-6 md:p-8 border-b border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 block mb-1">
                {lang === 'hi' ? 'कैब बुकिंग पूछताछ' : 'Cab Booking Enquiry'}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                {lang === 'hi' ? 'कैब बुकिंग के लिए पूछताछ करें' : 'Enquire About a Cab Booking'}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm">
              <span className="font-semibold">{lang === 'hi' ? 'राज्य और रोड टैक्स अलग से' : 'State and road taxes extra'}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {lang === 'hi'
              ? 'अपनी यात्रा की जानकारी भेजें। बुकिंग से पहले कैब की उपलब्धता और किराया कन्फर्म करें।'
              : 'Share your travel details and confirm cab availability and fare before booking.'}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* Honeypot field (hidden from real users, traps bots) */}
          <input
            type="text"
            name="website_url"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {lang === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Sharma"
                className="w-full h-12 px-4 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {lang === 'hi' ? 'मोबाइल नंबर (10 अंक) *' : 'Mobile Number (10 digits) *'}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="9876543210"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Pickup */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {lang === 'hi' ? 'पिकअप लोकेशन *' : 'Pickup Location *'}
              </label>
              <input
                type="text"
                required
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Modinagar, Muradnagar, Ghaziabad..."
                className="w-full h-12 px-4 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Drop */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                {lang === 'hi' ? 'ड्रॉप लोकेशन *' : 'Drop Destination *'}
              </label>
              <input
                type="text"
                required
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                placeholder="Delhi, Noida, Meerut, Haridwar..."
                className="w-full h-12 px-4 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Vehicle Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-slate-600" />
                {lang === 'hi' ? 'कैब का प्रकार' : 'Cab Type'}
              </label>
              <select
                value={car}
                onChange={(e) => setCar(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              >
                {fleetData.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Trip Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {lang === 'hi' ? 'यात्रा का प्रकार' : 'Trip Type'}
              </label>
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              >
                <option value="oneway">One-Way</option>
                <option value="round">Round Trip</option>
              </select>
            </div>

            {/* Travel Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-600" />
                {lang === 'hi' ? 'यात्रा की तारीख' : 'Travel Date'}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              />
            </div>

            {/* Travel Time */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-600" />
                {lang === 'hi' ? 'पिकअप का समय' : 'Pickup Time'}
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              />
            </div>

            {/* Passengers & Luggage */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-600" />
                {lang === 'hi' ? 'यात्रियों की संख्या' : 'Passengers'}
              </label>
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="w-full h-12 px-4 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 12].map(n => (
                  <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Luggage className="w-3.5 h-3.5 text-slate-600" />
                {lang === 'hi' ? 'सामान या विशेष अनुरोध' : 'Luggage / Notes'}
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any travel preferences"
                className="w-full h-12 px-4 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Feedback messages */}
          {statusMessage && (
            <div
              className={`p-4 rounded-xl text-xs font-medium flex items-center justify-between gap-3 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>

              {statusMessage.waUrl && (
                <a
                  href={statusMessage.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-bold text-xs shrink-0 flex items-center gap-1.5 shadow"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                </a>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
            <a
              href={getDirectWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="shining-beam w-full sm:flex-1 h-13 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1ebe5d] hover:from-[#20ba59] hover:to-[#17a84e] text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.35)] transition-all active:scale-95 border border-emerald-300/40"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              {lang === 'hi' ? 'WhatsApp पर पूछताछ करें' : 'Enquire on WhatsApp'}
            </a>

            <a
              href={`tel:${brandData.phone}`}
              className="w-full sm:w-auto px-6 h-13 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              {lang === 'hi' ? 'कॉल करें' : 'Call'}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
