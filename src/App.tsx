import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StickyBottomBar } from './components/StickyBottomBar';
import { HomePage } from './pages/HomePage';
import { SeoHead } from './components/SeoHead';
import { apiService } from './services/api';

const AboutPage = lazy(() => import('./pages/AboutPage').then(({ AboutPage: page }) => ({ default: page })));
const FleetPage = lazy(() => import('./pages/FleetPage').then(({ FleetPage: page }) => ({ default: page })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(({ ServicesPage: page }) => ({ default: page })));
const RoutesPage = lazy(() => import('./pages/RoutesPage').then(({ RoutesPage: page }) => ({ default: page })));
const RouteDetailPage = lazy(() => import('./pages/RouteDetailPage').then(({ RouteDetailPage: page }) => ({ default: page })));
const BlogHubPage = lazy(() => import('./pages/BlogHubPage').then(({ BlogHubPage: page }) => ({ default: page })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(({ BlogPostPage: page }) => ({ default: page })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(({ ContactPage: page }) => ({ default: page })));

// Scroll to top automatically when route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [contentVersion, setContentVersion] = useState(0);

  useEffect(() => {
    void apiService.loadContentCatalog().then((loaded) => {
      if (loaded) setContentVersion((version) => version + 1);
    });
  }, []);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  return (
    <div data-content-version={contentVersion} className="min-h-screen bg-[#F9FAFB] text-[#111827] flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      <ScrollToTop />
      <SeoHead lang={lang} />

      {/* Persistent Sticky Header */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
      />

      {/* Dynamic Multi-Page Routes */}
      <main className="flex-1">
        <Suspense fallback={<div role="status" className="min-h-[40vh] grid place-items-center text-sm text-slate-500">Loading page...</div>}>
          <Routes>
            <Route path="/" element={<HomePage lang={lang} />} />
            <Route path="/about" element={<AboutPage lang={lang} />} />
            <Route path="/fleet" element={<FleetPage lang={lang} />} />
            <Route path="/services" element={<ServicesPage lang={lang} />} />
            <Route path="/routes" element={<RoutesPage lang={lang} />} />
            <Route path="/routes/:slug" element={<RouteDetailPage lang={lang} />} />
            <Route path="/blog" element={<BlogHubPage lang={lang} />} />
            <Route path="/blog/:slug" element={<BlogPostPage lang={lang} />} />
            <Route path="/contact" element={<ContactPage lang={lang} />} />
            {/* Fallback route */}
            <Route path="*" element={<HomePage lang={lang} />} />
          </Routes>
        </Suspense>
      </main>

      {/* Persistent Footer */}
      <Footer lang={lang} />

      {/* Sticky Mobile Bottom Bar (Call + WhatsApp) */}
      <StickyBottomBar lang={lang} />
    </div>
  );
}
