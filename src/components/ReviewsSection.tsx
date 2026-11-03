import React, { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { brandData, componentContent, reviewsData } from '../content/data';

interface ReviewsSectionProps {
  lang: 'en' | 'hi';
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState('5');
  const [reviewRoute, setReviewRoute] = useState('');
  const [reviewText, setReviewText] = useState('');

  const reviewMessage = `Hello ${brandData.name}, I would like to share feedback about my cab trip.
*Name:* ${reviewName.trim() || 'Not provided'}
*Rating:* ${reviewRating}/5
*Route:* ${reviewRoute.trim() || 'Not provided'}
*Review:* ${reviewText.trim()}`;
  const reviewUrl = `https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent(reviewMessage)}`;

  return (
    <section id="reviews" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            {lang === 'hi' ? 'ग्राहक समीक्षाएं' : 'Customer Reviews'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi'
              ? 'ग्राहकों की राय'
              : 'What Customers Say'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'hi'
              ? 'समीक्षाएं उपलब्ध होने पर यहां दिखाई जाएंगी।'
              : 'Customer feedback will appear here when available.'}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {reviewsData.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating and route */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {rev.date}
                  </span>
                </div>

                {/* Route chip */}
                <div className="inline-block text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/60">
                  Route: {rev.route}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{lang === 'hi' && rev.text_hi ? rev.text_hi : rev.text}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    {rev.name}
                    {rev.verified && (
                      <span title="Verified Customer">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    )}
                  </p>
                  <p className="text-[11px] text-slate-500">{rev.city}</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                  Google Review
                </span>
              </div>
            </div>
          ))}
          {reviewsData.length === 0 && (
            <div className="md:col-span-2 p-6 md:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-md space-y-5">
              <div className="text-center">
                <h3 className="text-base font-bold text-slate-900">
                  {lang === 'hi' ? componentContent.reviews.title_hi : componentContent.reviews.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {lang === 'hi'
                    ? componentContent.reviews.submissionNotice_hi
                    : componentContent.reviews.submissionNotice}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block text-xs font-semibold text-slate-700">
                  {lang === 'hi' ? 'आपका नाम (वैकल्पिक)' : 'Your Name (Optional)'}
                  <input
                    value={reviewName}
                    onChange={(event) => setReviewName(event.target.value)}
                    className="mt-1.5 w-full h-11 px-3 rounded-xl border border-slate-300 text-sm font-normal text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    autoComplete="name"
                  />
                </label>
                <label className="block text-xs font-semibold text-slate-700">
                  {lang === 'hi' ? 'रेटिंग' : 'Rating'}
                  <select
                    value={reviewRating}
                    onChange={(event) => setReviewRating(event.target.value)}
                    className="mt-1.5 w-full h-11 px-3 rounded-xl border border-slate-300 text-sm font-normal text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating}>{rating} / 5</option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs font-semibold text-slate-700 sm:col-span-2">
                  {lang === 'hi' ? 'रूट (वैकल्पिक)' : 'Route (Optional)'}
                  <input
                    value={reviewRoute}
                    onChange={(event) => setReviewRoute(event.target.value)}
                    placeholder={lang === 'hi' ? 'उदा. मोदीनगर से दिल्ली' : 'e.g. Modinagar to Delhi'}
                    className="mt-1.5 w-full h-11 px-3 rounded-xl border border-slate-300 text-sm font-normal text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </label>
                <label className="block text-xs font-semibold text-slate-700 sm:col-span-2">
                  {lang === 'hi' ? 'आपकी समीक्षा' : 'Your Review'}
                  <textarea
                    value={reviewText}
                    onChange={(event) => setReviewText(event.target.value)}
                    required
                    rows={3}
                    className="mt-1.5 w-full p-3 rounded-xl border border-slate-300 text-sm font-normal text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-y"
                  />
                </label>
              </div>

              <a
                href={reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!reviewText.trim()}
                onClick={(event) => {
                  if (!reviewText.trim()) event.preventDefault();
                }}
                className={`mx-auto w-full sm:w-auto min-h-11 px-5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                  reviewText.trim()
                    ? 'bg-[#15803d] hover:bg-[#166534] text-white'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                {lang === 'hi' ? 'WhatsApp पर समीक्षा भेजें' : 'Send Review on WhatsApp'}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
