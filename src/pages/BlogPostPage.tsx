import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  getBlogPostBySlug, 
  getRelatedBlogPosts 
} from '../content/blogData';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  PhoneCall, 
  MessageSquare, 
  ShieldCheck, 
  Car, 
  MapPin, 
  HelpCircle,
  ChevronDown,
  Tag
} from 'lucide-react';
import { brandData, imageData } from '../content/data';

interface BlogPostPageProps {
  lang: 'en' | 'hi';
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = getBlogPostBySlug(slug || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="py-24 text-center space-y-4 max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-slate-900">Article Not Found</h1>
        <p className="text-xs text-slate-500">The travel guide you requested does not exist or has been moved.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog Hub
        </Link>
      </div>
    );
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, 2);
  const articleHtml = DOMPurify.sanitize(
    lang === 'hi' && post.contentHtml_hi ? post.contentHtml_hi : post.contentHtml,
    {
      ALLOWED_TAGS: ['a', 'br', 'em', 'h2', 'li', 'ol', 'p', 'strong', 'ul'],
      ALLOWED_ATTR: ['href', 'id'],
      ALLOW_DATA_ATTR: false
    }
  );

  // Schema.org BlogPosting + FAQPage Structured Data
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishDate,
    author: {
      '@type': 'Organization',
      name: post.author.name,
      jobTitle: post.author.role
    },
    publisher: {
      '@type': 'Organization',
      name: brandData.name,
      logo: {
        '@type': 'ImageObject',
        url: imageData.cabAc
      }
    },
    mainEntityOfPage: { '@type': 'WebPage' }
  };

  return (
    <article className="py-10 md:py-16 bg-white min-h-screen">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-amber-600 transition-colors">Travel Blog</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Header Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-xs">
              {post.category}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {post.publishDate}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {lang === 'hi' ? post.title_hi : post.title}
          </h1>

          <p className="text-base text-slate-600 leading-relaxed italic border-l-4 border-amber-400 pl-4 py-1 bg-amber-50/50 rounded-r-xl">
            {lang === 'hi' ? post.excerpt_hi : post.excerpt}
          </p>

          {/* Author Badge */}
          <div className="flex items-center gap-3 pt-2">
            <img
              src={post.author.avatar}
              loading="lazy"
              decoding="async"
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-md"
            />
            <div>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                {post.author.name}
              </p>
              <p className="text-xs text-slate-500">{post.author.role}</p>
            </div>
          </div>
        </div>

        {/* Featured Cover Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <img
            src={post.coverImage}
            loading="lazy"
            decoding="async"
            alt={post.title}
            className="w-full h-[320px] sm:h-[420px] object-cover"
          />
        </div>

        {/* Table of Contents */}
        {post.tableOfContents && post.tableOfContents.length > 0 && (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              Table of Contents
            </h3>
            <ul className="space-y-1.5 text-xs font-medium text-slate-700">
              {post.tableOfContents.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="hover:text-amber-600 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-amber-400">›</span>
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Article Body */}
        <div
          className="prose prose-slate max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700"
          dangerouslySetInnerHTML={{
            __html: articleHtml
          }}
        />

        {/* Route Booking Callout Widget */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-2xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider">
                Book This Journey
              </span>
              <h3 className="text-xl font-extrabold text-white mt-2">
                Travelling on this route?
              </h3>
              <p className="text-xs text-slate-300 max-w-lg mt-1">
                {brandData.name} offers AC and Non-AC cabs for local and outstation travel. Contact us to confirm the fare and availability.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href={`tel:${brandData.phone}`}
                className="w-full sm:w-auto px-6 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Now</span>
              </a>

              <a
                href={`https://wa.me/${brandData.whatsapp}?text=${encodeURIComponent(`Hello Jangid Ji Cab Service, I read your article "${post.title}" and would like to enquire about cab booking.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 h-12 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        {post.faq && post.faq.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              Frequently Asked Questions for this Route
            </h3>
            <div className="space-y-3">
              {post.faq.map((f, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900">{f.q}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-amber-500" />
            Tags:
          </span>
          {post.tags.map((t, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* Related Articles Strip */}
        {relatedPosts.length > 0 && (
          <div className="pt-10 border-t border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Related Travel Guides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}`}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all flex items-center gap-3 group"
                >
                  <img
                    src={rel.coverImage}
                    loading="lazy"
                    decoding="async"
                    alt={rel.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {lang === 'hi' ? rel.title_hi : rel.title}
                    </p>
                    <p className="text-[10px] text-slate-400">{rel.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
