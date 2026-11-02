import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  PhoneCall, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { BLOG_POSTS } from '../content/blogData';
import { brandData } from '../content/data';

interface BlogHubPageProps {
  lang: 'en' | 'hi';
}

const CATEGORIES = ['All', 'Service Information', 'Routes', 'Booking'];

export const BlogHubPage: React.FC<BlogHubPageProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesQuery =
      !searchQuery.trim() ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.title_hi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>{lang === 'hi' ? 'कैब गाइड व हाईवे ब्लॉग' : 'Taxi Route Guides & Highway Travel Blog'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {lang === 'hi'
              ? 'कैब सेवा और यात्रा जानकारी'
              : 'Cab Service & Travel Information'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {lang === 'hi'
              ? 'सेवा क्षेत्रों, लोकप्रिय रूट, बुकिंग और लागू टैक्स की जानकारी।'
              : 'Information about service areas, popular routes, booking, and applicable taxes.'}
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'hi' ? 'रूट या सेवा खोजें...' : 'Search routes or services...'}
                className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Cover Image */}
                  <div className="relative h-52 overflow-hidden bg-slate-900">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-4 left-4 bg-amber-400 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {post.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {post.publishDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug line-clamp-2">
                      <Link to={`/blog/${post.slug}`}>
                        {lang === 'hi' ? post.title_hi : post.title}
                      </Link>
                    </h2>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {lang === 'hi' ? post.excerpt_hi : post.excerpt}
                    </p>

                    {/* Author chip */}
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-amber-400"
                      />
                      <div>
                        <p className="text-[11px] font-bold text-slate-800">{post.author.name}</p>
                        <p className="text-[10px] text-slate-400">Cab & Taxi Service</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="p-6 pt-0">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="w-full h-11 rounded-xl bg-slate-100 hover:bg-amber-400 hover:text-slate-950 text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <span>{lang === 'hi' ? 'पूरा लेख पढ़ें' : 'Read Travel Guide'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
            <p className="text-base font-bold text-slate-800">No guides found for your query.</p>
            <p className="text-xs text-slate-500">Try searching for a listed city or route.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-amber-400 text-slate-950 rounded-xl font-bold text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Direct Booking Helpline Banner */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-extrabold text-white">
              {lang === 'hi' ? 'कैब के बारे में पूछताछ करें' : 'Enquire About a Cab'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'hi'
                ? 'किराया और उपलब्धता की पुष्टि के लिए अपना रूट और यात्रा विवरण भेजें।'
                : 'Share your route and travel details to confirm fare and cab availability.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={brandData.phone}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-transform active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{brandData.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent('Hello Jangid Ji Cab Service, I would like to enquire about a cab booking.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
