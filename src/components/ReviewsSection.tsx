import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Quote, Award } from 'lucide-react';
import { reviewsData } from '../content/data';
import { ReviewItem } from '../types';

interface ReviewsSectionProps {
  lang: 'en' | 'hi';
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            {lang === 'hi' ? 'सच्चे ग्राहकों की राय' : 'Verified Passenger Reviews'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi'
              ? 'मोदीनगर व एनसीआर के परिवारों का 100% भरोसा'
              : 'Trusted by Families, Pilgrims & Daily Commuters'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'hi'
              ? 'सुरक्षित ड्राइविंग, समय की पाबंदी और विनम्र व्यवहार के लिए 4.9★ गूगल रेटिंग।'
              : 'Real customer feedback from trips to Haridwar, Delhi Airport, Meerut, and Rishikesh.'}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {reviewsData.map((rev: ReviewItem, idx: number) => (
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
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    {rev.name}
                    {rev.verified && (
                      <span title="Verified Customer">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-500">{rev.city}</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                  Google Review
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
