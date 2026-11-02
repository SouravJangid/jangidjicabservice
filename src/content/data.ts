import { BrandInfo, Vehicle, ServiceItem, RouteItem, ReviewItem, FaqItem, PricingConfig } from '../types';

export const brandData: BrandInfo = {
  name: "Sachin Sharma Cabs",
  driverName: "Sachin Sharma",
  tagline: "Your Journey. Your Local Driver. Safe, Comfortable & Affordable.",
  tagline_hi: "आपकी यात्रा, आपका स्थानीय ड्राइवर। सुरक्षित, आरामदायक और किफायती कैब सेवा।",
  baseCity: "Modinagar",
  district: "Ghaziabad",
  state: "Uttar Pradesh",
  country: "IN",
  phone: "+919084694715",
  phoneDisplay: "+91 90846 94715",
  whatsapp: "919084694715",
  email: "sachinsharmacabs@gmail.com",
  address: "Near Modinagar Bus Stand, Delhi-Meerut Expressway (NH-58), Modinagar, Ghaziabad, UP 201204",
  hours: "24x7 Available",
  operatingHours: "Open 24 Hours, 7 Days a Week",
  availabilityText: "Call directly anytime to check instant availability or schedule advance booking.",
  mapsLink: "https://maps.google.com/?q=Modinagar,Ghaziabad,Uttar+Pradesh",
  baseLocation: { lat: 28.8333, lng: 77.5833 }
};

export const fleetData: Vehicle[] = [
  {
    id: "wagonr",
    name: "WagonR 2025 (Featured)",
    category: "Hatchback",
    modelYear: 2025,
    models: "Maruti Suzuki WagonR ZXI+ 2025",
    seats: 4,
    luggage: "2 medium bags + 2 hand carries",
    ac: true,
    ratePerKm: 10,
    minFare: 750,
    badge: "Driver's Own 2025 Car",
    features: ["Super Clean 2025 Model", "Dual Air Conditioning", "High Headroom Tall-Boy", "Extra Rear Legroom", "FastTag Enabled"],
    bestFor: "Couples, small families, Delhi/Noida/Meerut daily runs, airport drop",
    description: "Sachin's brand new 2025 WagonR! Immaculate condition, quiet highway cruising, high ceiling comfort, and the most economical per-km rate."
  },
  {
    id: "sedan",
    name: "Dzire Sedan",
    category: "Sedan",
    modelYear: 2024,
    models: "Maruti Swift Dzire / Toyota Etios",
    seats: 4,
    luggage: "2 large suitcases + 2 small bags",
    ac: true,
    ratePerKm: 11,
    minFare: 900,
    badge: "Most Popular",
    features: ["Quiet Cabin", "Generous Trunk Space", "Chilled AC", "Smooth Expressway Ride"],
    bestFor: "Business trips, airport transfers, family outstation journeys",
    description: "Premium comfort for up to 4 passengers with a dedicated luggage trunk for Delhi IGI airport or outstation routes."
  },
  {
    id: "ertiga",
    name: "SUV Ertiga",
    category: "MUV / SUV",
    modelYear: 2024,
    models: "Maruti Suzuki Ertiga Smart Hybrid",
    seats: 6,
    luggage: "3 large bags + soft luggage",
    ac: true,
    ratePerKm: 14,
    minFare: 1400,
    badge: "Family Favorite",
    features: ["6 Passenger Seats", "Roof AC Vents for 2nd & 3rd Row", "Adjustable Reclining Seats", "Great Highway Stability"],
    bestFor: "Family trips to Haridwar, Rishikesh, Agra, wedding guest pickups",
    description: "Spacious 6-passenger carrier with dual air conditioning, perfect for pilgrimage journeys and extended outstation travel."
  },
  {
    id: "innova",
    name: "Innova Crysta",
    category: "Luxury MPV",
    modelYear: 2024,
    models: "Toyota Innova Crysta",
    seats: 7,
    luggage: "4 large suitcases + overhead bags",
    ac: true,
    ratePerKm: 18,
    minFare: 1800,
    badge: "Executive Comfort",
    features: ["Captain Seats", "Superior Hill Driving Comfort", "Large Luggage Capacity", "Extra Suspension Softness"],
    bestFor: "Long-haul outstation, Uttarakhand hill routes, corporate travel, VIP guests",
    description: "The gold standard of Indian highway travel. Supreme legroom, luxury suspension, and dependable power for hills."
  },
  {
    id: "tempo",
    name: "Tempo Traveller",
    category: "Van / Mini-Bus",
    modelYear: 2023,
    models: "Force Urbania / 12-17 Seater Traveller",
    seats: 14,
    luggage: "Dedicated luggage carrier",
    ac: true,
    ratePerKm: 25,
    minFare: 3500,
    badge: "Group & Yatra",
    features: ["Pushback Seats", "Individual AC Vents", "Surround Music System", "Top Luggage Carrier"],
    bestFor: "Kanwar Yatra, Char Dham, wedding groups, large family excursions",
    description: "Comfortable group travel across India with experienced drivers and heavy luggage accommodation."
  }
];

export const pricingConfig: PricingConfig = {
  currency: "INR",
  rates: {
    wagonr: { perKm: 10, minFare: 750, minKmPerDay: 250, driverAllowancePerNight: 300, waitingPerHour: 100 },
    sedan:  { perKm: 11, minFare: 900, minKmPerDay: 250, driverAllowancePerNight: 350, waitingPerHour: 120 },
    ertiga: { perKm: 14, minFare: 1400, minKmPerDay: 250, driverAllowancePerNight: 400, waitingPerHour: 150 },
    innova: { perKm: 18, minFare: 1800, minKmPerDay: 250, driverAllowancePerNight: 500, waitingPerHour: 200 },
    tempo:  { perKm: 25, minFare: 3500, minKmPerDay: 300, driverAllowancePerNight: 700, waitingPerHour: 250 }
  },
  nightCharge: { enabled: true, from: "22:00", to: "06:00", amount: 250 },
  notes: [
    "Kilometre-based pricing. Exact fare calculated on road distance.",
    "State road tax, expressway tolls, and parking charges are charged at actuals against government receipts.",
    "Outstation round trips are billed at a standard minimum 250 km per calendar day.",
    "No hidden charges or surprise surge fees. Always confirmed before journey starts."
  ]
};

export const servicesData: ServiceItem[] = [
  {
    id: "outstation",
    icon: "Navigation",
    title: "Outstation Trips (One-Way & Round)",
    title_hi: "आउटस्टेशन कैब (वन-वे और राउंड ट्रिप)",
    tagline: "Anywhere in India from Modinagar / NCR",
    text: "Safe, non-stop or customized outstation journeys. Transparent rate per km with no hidden surprise costs.",
    text_hi: "मोदीनगर, गाजियाबाद या दिल्ली एनसीआर से पूरे भारत के लिए सुरक्षित और आरामदायक यात्रा।",
    highlights: ["Doorstep pickup & drop", "Clean 2025 AC vehicle", "Experienced highway driver", "Night travel permitted"]
  },
  {
    id: "airport",
    icon: "Plane",
    title: "Delhi IGI Airport Transfers (24x7)",
    title_hi: "दिल्ली एयरपोर्ट ट्रांसफर (24x7)",
    tagline: "Terminal 1, 2 & 3 On-Time Guarantee",
    text: "Never miss a flight. 24x7 scheduled pickups from Modinagar, Ghaziabad, and Meerut directly to Terminal 1, 2, or 3.",
    text_hi: "मोदीनगर और गाजियाबाद से दिल्ली आईजीआई एयरपोर्ट के लिए समय पर 24 घंटे विश्वसनीय कैब सर्विस।",
    highlights: ["Flight tracking assistance", "Luggage boot space", "Expressway route (DME / EPE)", "Early morning & late night pickup"]
  },
  {
    id: "yatra",
    icon: "Mountain",
    title: "Haridwar & Rishikesh Pilgrimage Yatra",
    title_hi: "हरिद्वार व ऋषिकेश तीर्थ यात्रा",
    tagline: "Ganga Aarti, Mansa Devi & Neelkanth",
    text: "Special pilgrimage packages with an experienced hill and expressway driver. Same-day return or multi-day temple visits.",
    text_hi: "हर की पौड़ी गंगा आरती, मनसा देवी और ऋषिकेश के लिए विशेष यात्रा पैकेज। परिवार के लिए पूर्ण सुरक्षा।",
    highlights: ["Same-day Ganga Snan trips", "Kanwar Yatra bookings", "Comfortable halts at hygienic dhabas", "Senior citizen friendly driving"]
  },
  {
    id: "railway",
    icon: "Train",
    title: "Railway Station Pick & Drop",
    title_hi: "रेलवे स्टेशन पिकअप व ड्रॉप",
    tagline: "New Delhi, Old Delhi, Hazrat Nizamuddin, Anand Vihar",
    text: "Timely connectivity to Anand Vihar ISBT, New Delhi (NDLS), Old Delhi, Hazrat Nizamuddin, and Meerut City railway stations.",
    text_hi: "नई दिल्ली, आनंद विहार, हज़रत निज़ामुद्दीन और मेरठ स्टेशन के लिए बिना देरी की पिकअप सुविधा।",
    highlights: ["Platform side pickup coordination", "No luggage surcharge", "Clean seats", "Punctual driver"]
  },
  {
    id: "local",
    icon: "MapPin",
    title: "Local City & NCR Hourly Rides",
    title_hi: "लोकल सिटी व एनसीआर राउंड",
    tagline: "Modinagar, Ghaziabad, Noida, Gurugram",
    text: "Point-to-point and hourly packages for shopping, hospital visits, family functions, and official meetings across NCR.",
    text_hi: "शॉपिंग, डॉक्टर विजिट, रिश्तेदारी या ऑफिस काम के लिए मोदीनगर और पूरे एनसीआर में पर्सनल कैब।",
    highlights: ["Hourly rental options", "Multiple stopovers allowed", "Chilled air conditioning", "Zero surge pricing"]
  },
  {
    id: "wedding",
    icon: "Sparkles",
    title: "Wedding & Special Event Fleet",
    title_hi: "शादी व पारिवारिक समारोह",
    tagline: "Baraat, Guest Pickup & Decorated Cars",
    text: "Well-maintained, clean cars for family celebrations, wedding guest shuttles, and decorated bridal transport.",
    text_hi: "शादी-विवाह, बारात और मेहमानों को लाने-ले जाने के लिए साफ-सुथरी और सजी हुई गाड़ियां।",
    highlights: ["Polite, uniformed driver", "Punctual reporting", "Multi-car fleet coordination", "Flexible standby hours"]
  }
];

export const popularRoutes: RouteItem[] = [
  {
    slug: "modinagar-to-delhi-taxi",
    from: "Modinagar",
    to: "Delhi",
    approxKm: 45,
    approxTime: "1h 15m",
    title: "Modinagar to Delhi Taxi Service",
    title_hi: "मोदीनगर से दिल्ली टैक्सी सेवा",
    intro: "Fast travel via the Delhi-Meerut Expressway (DME). Direct drop to Connaught Place, South Delhi, East Delhi, or railway stations.",
    intro_hi: "दिल्ली-मेरठ एक्सप्रेसवे से सबसे तेज़ और आरामदायक सफर। किसी भी इलाके में डायरेक्ट ड्रॉप।",
    popularFor: "Office, Shopping, Hospital, NDLS Railway Station",
    tollNote: "Expressway toll as per FASTag toll plaza."
  },
  {
    slug: "modinagar-to-haridwar-taxi",
    from: "Modinagar",
    to: "Haridwar",
    approxKm: 165,
    approxTime: "3h 15m",
    title: "Modinagar to Haridwar Taxi Service",
    title_hi: "मोदीनगर से हरिद्वार टैक्सी सेवा",
    intro: "Direct highway ride via Meerut Bypass and Muzaffarnagar. Perfect for Ganga Snan, Har Ki Pauri darshan, and family rituals.",
    intro_hi: "हरिद्वार गंगा स्नान, हर की पौड़ी और धार्मिक यात्रा के लिए सुरक्षित व साफ-सुथरी कैब।",
    popularFor: "Ganga Snan, Har Ki Pauri, Family Pilgrimage, Kanwar Yatra",
    tollNote: "NH-58 tolls applicable."
  },
  {
    slug: "ghaziabad-to-delhi-airport-cab",
    from: "Ghaziabad",
    to: "Delhi Airport (IGI T1/T2/T3)",
    approxKm: 42,
    approxTime: "1h 10m",
    title: "Ghaziabad to Delhi Airport Cab",
    title_hi: "गाजियाबाद से दिल्ली एयरपोर्ट कैब",
    intro: "24x7 punctual airport transfers. Clean luggage boot in 2025 WagonR & Sedan. Guaranteed on-time arrival.",
    intro_hi: "24x7 फ्लाइट समय के अनुसार एयरपोर्ट ड्रॉप। सामान रखने की पूरी जगह।",
    popularFor: "Domestic & International Flights, Corporate Travel",
    tollNote: "Toll included via expressway FASTag as per actual."
  },
  {
    slug: "modinagar-to-meerut-taxi",
    from: "Modinagar",
    to: "Meerut",
    approxKm: 26,
    approxTime: "40m",
    title: "Modinagar to Meerut Taxi",
    title_hi: "मोदीनगर से मेरठ टैक्सी",
    intro: "Quick, convenient ride between Modinagar and Meerut (Begum Bridge, Subharti, Shastri Nagar, Cantt).",
    intro_hi: "मोदीनगर से मेरठ के किसी भी इलाके के लिए 40 मिनट में आसान यात्रा।",
    popularFor: "University, Medical Care, Shopping, Relatives",
    tollNote: "Expressway / Highway toll extra if chosen."
  },
  {
    slug: "noida-to-gurugram-taxi",
    from: "Noida",
    to: "Gurugram (Cyber City)",
    approxKm: 55,
    approxTime: "1h 30m",
    title: "Noida to Gurugram Taxi",
    title_hi: "नोएडा से गुरुग्राम टैक्सी",
    intro: "Seamless inter-city travel across Delhi-NCR with zero surge pricing and hassle-free pickup.",
    intro_hi: "नोएडा और गुरुग्राम के बीच बिना सर्ज चार्ज के आरामदायक ऑफिस व पर्सनल यात्रा।",
    popularFor: "Corporate Tech Parks, Cyber Hub, Airport link",
    tollNote: "MCD / State toll applicable."
  },
  {
    slug: "delhi-to-haridwar-taxi",
    from: "Delhi",
    to: "Haridwar / Rishikesh",
    approxKm: 220,
    approxTime: "4h 15m",
    title: "Delhi to Haridwar & Rishikesh Taxi",
    title_hi: "दिल्ली से हरिद्वार व ऋषिकेश टैक्सी",
    intro: "Comfortable long-distance journey for couples, families, and group pilgrims with rest stop flexibility.",
    intro_hi: "दिल्ली से उत्तराखंड तीर्थ यात्रा के लिए भरोसेमंद ड्राइवर और आरामदायक गाड़ियां।",
    popularFor: "Char Dham, River Rafting, Yoga Retreats, Temples",
    tollNote: "NH-58 & State Entry Tax as per receipt."
  },
  {
    slug: "modinagar-to-agra-taxi",
    from: "Modinagar",
    to: "Agra (Taj Mahal)",
    approxKm: 215,
    approxTime: "3h 45m",
    title: "Modinagar to Agra Taj Expressway Cab",
    title_hi: "मोदीनगर से आगरा ताजमहल कैब",
    intro: "Fast journey via Eastern Peripheral Expressway (EPE) and Yamuna Expressway. Day tours and hotel drop.",
    intro_hi: "ईस्टर्न पेरिफेरल और यमुना एक्सप्रेसवे से आगरा ताजमहल के लिए सुखद टूर।",
    popularFor: "Taj Mahal Tour, Agra Fort, Petha Shopping",
    tollNote: "Yamuna Expressway toll extra at actuals."
  },
  {
    slug: "modinagar-to-all-india",
    from: "Modinagar",
    to: "All India Destinations",
    approxKm: 500,
    approxTime: "Variable",
    title: "All India Outstation Cab Service",
    title_hi: "ऑल इंडिया आउटस्टेशन कैब सेवा",
    intro: "Authorized commercial permit for smooth inter-state travel to Rajasthan, Punjab, Himachal, UP, and Uttarakhand.",
    intro_hi: "ऑल इंडिया कमर्शियल परमिट के साथ राजस्थान, पंजाब, हिमाचल, हरियाणा और पूरे भारत में यात्रा।",
    popularFor: "Tourism, Family Vacations, Long Distance Relocation",
    tollNote: "State border road taxes and tolls at actual receipts."
  }
];

export const reviewsData: ReviewItem[] = [
  {
    name: "Ramesh Sharma",
    city: "Modinagar",
    rating: 5,
    route: "Modinagar to Haridwar (Round Trip)",
    text: "Took Sachin ji's 2025 WagonR for our family visit to Haridwar. Car was spotless, AC was great, and his driving was extremely smooth. No rash overtaking. Rates were very reasonable!",
    text_hi: "सचिन जी की 2025 वैगनआर से परिवार के साथ हरिद्वार गए। गाड़ी बहुत साफ थी और ड्राइविंग एकदम सुरक्षित। बहुत अच्छा अनुभव रहा।",
    date: "October 2026",
    verified: true
  },
  {
    name: "Amit Kumar Verma",
    city: "Ghaziabad (Raj Nagar Ext.)",
    rating: 5,
    route: "Ghaziabad to Delhi Airport Terminal 3",
    text: "Had an early morning 4:30 AM pickup for flight to Bangalore. Sachin arrived 15 minutes before time at my society gate. Punctual, polite, and reached T3 well before schedule. 10/10 recommended!",
    text_hi: "सुबह 4:30 बजे एयरपोर्ट के लिए समय से 15 मिनट पहले आ गए। बहुत ही समय के पाबंद और विनम्र स्वभाव।",
    date: "October 2026",
    verified: true
  },
  {
    name: "Dr. Sunita Tyagi",
    city: "Meerut",
    rating: 5,
    route: "Meerut to Gurugram Cyber Hub",
    text: "Needed a reliable cab for a two-day medical conference in Gurugram. Transparent per-km billing without any surprise hidden charges. Very professional local driver.",
    text_hi: "गुरुग्राम कॉन्फ्रेंस के लिए कैब ली। किलोमीटर के हिसाब से बिल्कुल साफ और सही हिसाब।",
    date: "September 2026",
    verified: true
  },
  {
    name: "Vikram Chauhan",
    city: "Delhi",
    rating: 5,
    route: "Delhi to Rishikesh & Neelkanth",
    text: "Booked an Ertiga for 5 friends to Rishikesh. Sachin knows all the good dhabas on the highway and drove very safely on the mountain twists. Super friendly!",
    text_hi: "दोस्तों के साथ ऋषिकेश यात्रा पर गए। रास्ते में बेहतरीन ढाबा और पहाड़ों में सुरक्षित ड्राइविंग।",
    date: "September 2026",
    verified: true
  }
];

export const faqData: FaqItem[] = [
  {
    category: "Fare & Pricing",
    q: "How is the taxi fare calculated?",
    q_hi: "टैक्सी का किराया कैसे तय होता है?",
    a: "Fare is calculated transparently on actual road distance (km) based on our per-km rate for the chosen car. Use our online distance calculator above to see your exact estimate.",
    a_hi: "किराया वास्तविक सड़क दूरी (किलोमीटर) के आधार पर गाड़ी के प्रति-किमी रेट से तय होता है।"
  },
  {
    category: "Tolls & Taxes",
    q: "Are expressway tolls and state entry taxes included?",
    q_hi: "क्या टोल टैक्स और स्टेट टैक्स किराए में शामिल हैं?",
    a: "No. FASTag expressway tolls, parking receipts, and inter-state commercial entry taxes are paid at actuals with valid government receipts shown to you.",
    a_hi: "नहीं, टोल टैक्स और पार्किंग रसीद के अनुसार वास्तविक खर्च पर अलग से देय होते हैं।"
  },
  {
    category: "Booking & Cancellation",
    q: "What is your cancellation policy?",
    q_hi: "बुकिंग कैंसिल करने के क्या नियम हैं?",
    a: "We believe in honest customer relationships. If your travel plans change, please call Sachin at +91 90846 94715 as early as possible before the cab departs for pickup. There is zero cancellation fee if informed prior to cab dispatch.",
    a_hi: "यदि प्लान बदल जाए तो गाड़ी निकलने से पहले फोन कर दें। गाड़ी रवाना होने से पहले कोई कैंसिलेशन चार्ज नहीं है।"
  },
  {
    category: "Safety & Driver",
    q: "Is Sachin Sharma a verified commercial driver?",
    q_hi: "क्या ड्राइवर सचिन शर्मा वेरिफाइड हैं?",
    a: "Yes! Sachin holds an active commercial driving licence, valid commercial vehicle permit, fitness certificate, and clean police verification records with 10+ years of driving experience across Delhi-NCR and North India.",
    a_hi: "हाँ, सचिन शर्मा के पास 10+ साल का ड्राइविंग अनुभव, कमर्शियल लाइसेंस और पुलिस सत्यापन है।"
  },
  {
    category: "Vehicles",
    q: "Can I specifically request the new 2025 WagonR?",
    q_hi: "क्या मुझे विशेष रूप से 2025 वैगनआर मिल सकती है?",
    a: "Absolutely! The 2025 WagonR is Sachin Sharma's primary vehicle. Simply select WagonR in the calculator or mention it when you call or WhatsApp.",
    a_hi: "बिल्कुल! 2025 वैगनआर सचिन जी की अपनी गाड़ी है। बुकिंग के समय वैगनआर चुन लें।"
  },
  {
    category: "Coverage",
    q: "Do you provide outstation cabs for all of India?",
    q_hi: "क्या आप पूरे भारत के लिए टैक्सी उपलब्ध कराते हैं?",
    a: "Yes. From Modinagar and Ghaziabad, we cover all destinations in Uttar Pradesh, Uttarakhand, Delhi-NCR, Haryana, Punjab, Rajasthan, Himachal Pradesh, and nationwide on request.",
    a_hi: "हाँ, मोदीनगर और एनसीआर से उत्तराखंड, राजस्थान, हरियाणा, पंजाब और पूरे भारत के लिए सेवा उपलब्ध है।"
  }
];

export const promptAndMarketResearch = {
  marketResearch: {
    summary: "Most taxi customers in Tier-2/Tier-3 NCR (Modinagar, Ghaziabad, Meerut) make cab booking decisions within 10 seconds. Their primary questions are: Can I trust this driver? What is the real cost per km? Can I reach him directly on phone or WhatsApp without third-party app hassle?",
    keyDriversOfConversion: [
      "Sticky 1-tap Call Now and WhatsApp buttons available on every screen, especially on mobile bottom bar.",
      "Clear driver identity: Driver's real name (Sachin Sharma), local base (Modinagar), 10+ years experience, 4.9★ rating.",
      "Vehicle clarity: Highlighting the brand new 2025 WagonR and fleet specs (seats, luggage, AC).",
      "Real road km distance calculator with transparent per-km breakdown instead of vague surge prices.",
      "Popular local routes with quick-fill chips (Modinagar to Haridwar, Delhi Airport, Meerut, Gurugram).",
      "Bilingual support (English & Hindi) to cater to local families and pilgrims."
    ],
    colorPalette: [
      { role: "Primary / Attention", name: "Taxi Yellow", hex: "#FFC107", use: "Brand accents, price tags, highlight badges" },
      { role: "Dark / Text / Contrast", name: "Charcoal Black", hex: "#111827", use: "Headings, navbar, high-contrast dark surfaces" },
      { role: "Direct Call CTA", name: "Call Green", hex: "#16A34A", use: "Primary 1-tap phone call button" },
      { role: "WhatsApp CTA", name: "WhatsApp Green", hex: "#25D366", use: "Instant chat and quote button" },
      { role: "Trust & Safety", name: "Trust Blue", hex: "#2563EB", use: "Verified badges, map pins, route lines" },
      { role: "Background", name: "Clean Off-White", hex: "#F9FAFB", use: "Airy, clean viewport background" }
    ]
  },
  prompts: [
    {
      id: "prompt1",
      title: "Prompt 1: UI Design Image Prompt (Midjourney / v0 / Figma AI)",
      description: "Use this exact prompt in Midjourney v6, v0, or Figma AI to generate photo-realistic mockups of Sachin Sharma Cabs.",
      promptText: `Design a modern, high-converting, mobile-first website UI for an individual cab/taxi driver based in Modinagar, Ghaziabad (NCR), India named 'Sachin Sharma Cabs'. Show a mobile mockup (390px) and a desktop mockup (1440px) side by side.

STYLE: Clean, bold, trustworthy, professional. Color palette: taxi yellow #FFC107, charcoal black #111827, call-button green #16A34A, WhatsApp green #25D366, accent blue #2563EB, background #F9FAFB, white cards. Fonts: Poppins (headings), Inter (body). Rounded corners 16px, soft shadows, high contrast, large tap targets.

SECTIONS (top to bottom):
1. Sticky top navbar: logo 'Sachin Sharma Cabs', links (Home, Services, Fleet, Routes, Reviews, Contact), language toggle EN/हिंदी, green 'Call Now (+91 90846 94715)' button.
2. Hero: left side headline 'Safe, Comfortable & Affordable Cab Service – Modinagar to All India', subtext '24x7 Available | Verified Driver Sachin Sharma | 2025 WagonR | Fixed Rates'. Two big buttons: green '📞 Call Sachin' and WhatsApp green 'Chat on WhatsApp'. Right side: friendly driver photo next to a clean white 2025 WagonR and sedan. Small trust chips: '10+ Years Experience', '500+ Trips', '4.9★ Rating'.
3. Floating card overlapping the hero: 'Check Distance & Fare' with From location field (Modinagar), To location field, car type dropdown (2025 WagonR, Sedan, Ertiga, Innova, Tempo), trip type toggle (One-way / Round trip), and yellow 'Calculate' button. Below it a result strip: 'Distance: 165 km | Time: 3h 15m | Estimated Fare: ₹1,650'.
4. Services grid: Local Rides, Delhi Airport Transfer, Railway Station Pickup, Outstation, Haridwar-Rishikesh Yatra, Wedding & Events.
5. Fleet cards: WagonR 2025 (4 seats), Sedan (4 seats), SUV Ertiga (6 seats), Innova Crysta (7 seats), Tempo Traveller. Each with car photo, seats, bags, AC badge, '₹/km' and a 'Book Now' button.
6. Popular routes: cards for Modinagar–Delhi, Modinagar–Haridwar, Ghaziabad–Meerut, Noida–Gurugram, Delhi–Haridwar, and All India Trips.
7. Why choose us: 4 icon blocks (Verified Driver, Clean AC 2025 Cars, No Hidden Charges, 24x7 Support).
8. Customer reviews carousel with star ratings and Google-review badge.
9. Booking form card: Name, Phone, Pickup, Drop, Date, Time, Car type, Passengers, 'Book via WhatsApp' and 'Request Callback' buttons.
10. FAQ accordion (toll, waiting charges, night charges, cancellation).
11. Footer: address in Modinagar, phone +91 90846 94715, WhatsApp, working hours 'Open 24x7', embedded map.
12. Mobile only: sticky bottom bar with two equal buttons, green 'Call Sachin' and WhatsApp green 'WhatsApp'.`
    },
    {
      id: "prompt2",
      title: "Prompt 2: Distance (km) & Fare Calculator Feature Prompt",
      description: "Use this prompt in Claude Code / Cursor to architect the distance routing API and pricing engine.",
      promptText: `Build a 'Distance & Fare Calculator' component for a taxi website for Sachin Sharma Cabs (Modinagar, UP, India).

FUNCTIONALITY:
- Two inputs: 'Pickup location' and 'Drop location' with live autocomplete.
- Autocomplete must prioritize: Modinagar, Ghaziabad, Meerut, Delhi, Noida, Gurugram, Haridwar, Rishikesh, and support all cities/towns across India.
- On submit, calculate REAL ROAD distance (not straight-line) and travel duration using a routing API (Routes API or OSRM).
- Show: distance in km (rounded to 1 decimal), estimated duration (hours & mins), estimated fare (₹), and a route preview on a map with pickup and drop markers.
- Options: car type (WagonR 2025, Sedan Dzire, SUV Ertiga, Innova Crysta, Tempo Traveller) and trip type (One-way / Round trip).
- Fare formula:
    one-way fare = max(distance_km * rate_per_km[car], minimum_fare[car])
    round-trip   = max(distance_km * 2, min_daily_km * days) * rate_per_km + driver_allowance (if overnight) + night_charge (if 10pm-6am)
  Show 'Toll and parking extra as per actual' as a note.
- Result card has two CTAs: 'Book on WhatsApp' (pre-filled message with pickup, drop, km, fare, car type) and 'Call Now (+91 90846 94715)'.
- Quick-pick chips: Modinagar→Delhi (45 km), Modinagar→Haridwar (165 km), Ghaziabad→Delhi Airport (42 km), Modinagar→Meerut (26 km), Noida→Gurugram (55 km), Delhi→Haridwar (220 km).`
    },
    {
      id: "prompt3",
      title: "Prompt 3: System Prompt for AI Builder",
      description: "Use this system prompt when initializing or extending the full-stack website.",
      promptText: `You are a senior full-stack engineer and UI/UX designer with 10 years of experience in web design and business analysis. Build a production-ready, mobile-first website for Sachin Sharma Cabs, an individual cab driver in Modinagar, Ghaziabad (Delhi-NCR, India). Phone: +91 90846 94715.

PRIORITIES (in order): 1) one-tap call/WhatsApp everywhere, 2) transparent pricing, 3) trust & 2025 vehicle highlight, 4) speed, 5) local SEO.

TECH STACK: React 19, TypeScript, Tailwind CSS, Express backend, Leaflet / Google Maps, Three.js 3D car visualizer, Gemini Image Generation for promo flyers.

SITE STRUCTURE:
- Home: Hero, Fare Calculator, 3D Car Showcase, Services, Fleet, Popular Routes, Trust Badges, Reviews, FAQ, Booking Form.
- Distance & Fare: Real road distance calculation with quick-pick chips and Leaflet map routing.
- Direct Contact: tel:+919084694715 and wa.me/919084694715 with pre-filled route message.
- Bilingual: Full toggle between English and हिन्दी.
- Sticky mobile bottom bar: 50% Call, 50% WhatsApp.`
    }
  ]
};
