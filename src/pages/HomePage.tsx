import React from 'react';
import { Hero } from '../components/Hero';
import { AboutDriver } from '../components/AboutDriver';
import { FareCalculator } from '../components/FareCalculator';
import { FleetSection } from '../components/FleetSection';
import { RoutesSection } from '../components/RoutesSection';
import { ServicesSection } from '../components/ServicesSection';
import { ReviewsSection } from '../components/ReviewsSection';
import { FaqSection } from '../components/FaqSection';
import { BookingForm } from '../components/BookingForm';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../content/blogData';

interface HomePageProps {
  lang: 'en' | 'hi';
}

export const HomePage: React.FC<HomePageProps> = ({ lang }) => {
  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const recentPosts = BLOG_POSTS.slice(0, 3);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <Hero lang={lang} onCalculateClick={scrollToCalculator} />

      {/* Cab service information */}
      <AboutDriver lang={lang} />

      {/* Distance & Fare Calculator */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-slate-100/50">
        <FareCalculator
          lang={lang}
          onBookClick={() => {
            const el = document.getElementById('booking');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </section>

      {/* Vehicle Fleet with Rates */}
      <FleetSection
        lang={lang}
        onSelectCar={() => scrollToCalculator()}
      />

      {/* Popular Routes */}
      <RoutesSection
        lang={lang}
        onSelectRoute={() => scrollToCalculator()}
      />

      {/* Core Services */}
      <ServicesSection lang={lang} />

      {/* SEO Travel Guides / Blog Preview Strip */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                <span>{lang === 'hi' ? 'यात्रा गाइड व ब्लॉग' : 'Travel Guides & Route Blogs'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {lang === 'hi'
                  ? 'हरिद्वार, दिल्ली एयरपोर्ट व हाईवे यात्रा की उपयोगी जानकारी'
                  : 'Expert Highway & Pilgrimage Travel Guides'}
              </h2>
            </div>

            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 uppercase tracking-wider group"
            >
              <span>{lang === 'hi' ? 'सभी ब्लॉग देखें' : 'View All Articles'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-3 left-3 bg-amber-400 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {post.publishDate} • {post.readTime}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {lang === 'hi' ? post.title_hi : post.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {lang === 'hi' ? post.excerpt_hi : post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center gap-1 text-xs font-bold text-amber-600 group-hover:text-amber-700">
                  <span>{lang === 'hi' ? 'पूरा लेख पढ़ें' : 'Read Full Guide'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <ReviewsSection lang={lang} />

      {/* FAQ Section */}
      <FaqSection lang={lang} />

      {/* Booking Enquiry Form */}
      <section className="px-4 sm:px-6 lg:px-8">
        <BookingForm lang={lang} />
      </section>
    </div>
  );
};
