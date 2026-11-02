import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Download, RefreshCw, Wand2, Check, ArrowRight, Share2 } from 'lucide-react';
import { brandData } from '../content/data';

interface AiImageStudioProps {
  lang?: 'en' | 'hi';
}

const TEMPLATES = [
  {
    title: 'Modinagar to Haridwar Ganga Aarti',
    title_hi: 'मोदीनगर से हरिद्वार गंगा आरती पोस्टर',
    prompt: 'Premium commercial promotional poster for Sachin Sharma Cabs. A gleaming brand new 2025 white Maruti Suzuki WagonR taxi parked gracefully near the holy ghats of Haridwar with the golden sunset illuminating the sacred Ganga river, Ganga Aarti floating diyas, vibrant Indian temple aesthetic, sharp commercial taxi advertisement quality.'
  },
  {
    title: 'Delhi IGI Airport 24x7 Express',
    title_hi: 'दिल्ली एयरपोर्ट 24x7 एक्सप्रेस बैनर',
    prompt: 'High resolution digital advertising banner for Sachin Sharma Cabs. Clean white 2025 WagonR and sedan cruising on the illuminated Delhi-Meerut Expressway heading towards Indira Gandhi International Airport Terminal 3, sleek highway lights, luggage bags visible, modern Indian transportation service.'
  },
  {
    title: 'WagonR 2025 Luxury Highway Fleet',
    title_hi: 'वैगनआर 2025 हाईवे फ्लीट शोकेस',
    prompt: 'Studio commercial photography of 2025 Maruti Suzuki WagonR taxi with custom Sachin Sharma Cabs branding, pristine glossy finish, dynamic front 3/4 angle, golden hour lighting on smooth highway, advertising poster format.'
  }
];

export const AiImageStudio: React.FC<AiImageStudioProps> = ({ lang = 'en' }) => {
  const [prompt, setPrompt] = useState<string>(TEMPLATES[0].prompt);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<{
    imageUrl: string | null;
    headline: string;
    description: string;
    size: string;
    resolution: string;
  } | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          size: imageSize,
          carType: 'WagonR 2025'
        })
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedResult({
          imageUrl: data.imageUrl,
          headline: data.headline,
          description: data.description,
          size: data.size,
          resolution: data.resolution
        });
      }
    } catch (err) {
      console.error('Image generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-studio" className="w-full max-w-6xl mx-auto my-12">
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-10 shadow-2xl border border-indigo-900/40 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                {lang === 'hi' ? 'एआई मार्केटिंग स्टूडियो' : 'AI Marketing & Flyer Studio'}
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {lang === 'hi'
                  ? 'सचिन शर्मा कैब्स - हाई-क्वालिटी पोस्टर जनरेटर'
                  : 'Generate High-Quality Promotional Cab Flyers'}
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl mt-1">
                {lang === 'hi'
                  ? 'हरिद्वार, दिल्ली एयरपोर्ट और ऑल-इंडिया यात्रा के लिए 1K, 2K या 4K रेजोल्यूशन में हाई-इम्पैक्ट विजुअल्स बनाएं।'
                  : 'Create photorealistic marketing banners and WhatsApp promotional graphics for Sachin Sharma Cabs in 1K, 2K, or 4K resolution.'}
              </p>
            </div>

            {/* Resolution Selector (1K, 2K, 4K affordance) */}
            <div className="bg-slate-900/90 border border-slate-700/80 p-1.5 rounded-2xl flex items-center gap-1 shadow-lg">
              <span className="text-xs font-semibold text-slate-400 px-2.5">
                {lang === 'hi' ? 'साइज:' : 'Resolution:'}
              </span>
              {(['1K', '2K', '4K'] as const).map(res => (
                <button
                  key={res}
                  type="button"
                  onClick={() => setImageSize(res)}
                  className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                    imageSize === res
                      ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {res}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Preset Templates */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {lang === 'hi' ? 'रेडीमेड टेम्पलेट्स:' : 'Suggested Campaign Themes:'}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(tmpl.prompt)}
                  className={`p-3.5 rounded-xl border text-left transition-all text-xs ${
                    prompt === tmpl.prompt
                      ? 'bg-amber-500/10 border-amber-400 text-amber-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <p className="font-bold text-white mb-1">
                    {lang === 'hi' ? tmpl.title_hi : tmpl.title}
                  </p>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {tmpl.prompt}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input Box */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              {lang === 'hi' ? 'प्रॉम्प्ट कस्टमाइज़ करें:' : 'Campaign Visual Prompt:'}
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              placeholder="Describe your desired cab promotion banner..."
            />
          </div>

          {/* Action button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-xl transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {lang === 'hi' ? 'जनरेट हो रहा है...' : 'Generating High-Res Asset...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {lang === 'hi' ? `जनरेट करें (${imageSize})` : `Generate with Gemini (${imageSize})`}
                </>
              )}
            </button>
          </div>

          {/* Result Output Preview */}
          {generatedResult && (
            <div className="mt-8 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    High Quality {generatedResult.size} Asset Ready
                  </span>
                  <span className="text-xs text-slate-400">({generatedResult.resolution})</span>
                </div>
              </div>

              {/* Graphic Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7">
                  {generatedResult.imageUrl ? (
                    <img
                      src={generatedResult.imageUrl}
                      alt="Generated cab promo"
                      className="w-full h-auto rounded-xl object-cover shadow-lg border border-slate-700 max-h-[380px]"
                    />
                  ) : (
                    // High-converting styled promo canvas card
                    <div className="w-full h-[280px] rounded-xl bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-900 p-6 flex flex-col justify-between border border-amber-500/30 shadow-inner relative overflow-hidden">
                      <div className="space-y-2 relative z-10">
                        <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow">
                          Sachin Sharma Cabs • Modinagar
                        </span>
                        <h3 className="text-2xl font-black text-white mt-2 leading-tight">
                          {generatedResult.headline}
                        </h3>
                        <p className="text-xs text-slate-300 max-w-md">
                          {generatedResult.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-700/60 pt-4 relative z-10">
                        <div className="text-xs">
                          <p className="font-semibold text-amber-300">New 2025 WagonR & Fleet</p>
                          <p className="text-[11px] text-slate-400">Haridwar • Delhi Airport • All India</p>
                        </div>
                        <div className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-md">
                          Call: +91 90846 94715
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:col-span-5 space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">
                      {generatedResult.headline}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {generatedResult.description}
                    </p>
                  </div>

                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
                    <p className="text-slate-400 font-medium">Included Call to Actions:</p>
                    <p className="font-semibold text-emerald-400">📞 Call: +91 90846 94715</p>
                    <p className="font-semibold text-[#25D366]">💬 WhatsApp: +91 90846 94715</p>
                    <p className="text-[11px] text-slate-400">Base: Modinagar, Ghaziabad (UP)</p>
                  </div>

                  {generatedResult.imageUrl && (
                    <a
                      href={generatedResult.imageUrl}
                      download={`sachin-cabs-flyer-${generatedResult.size}.png`}
                      className="w-full h-11 rounded-xl bg-white text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-200 shadow-md transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download {generatedResult.size} Flyer
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
