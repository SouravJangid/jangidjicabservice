import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StickyBottomBar } from './components/StickyBottomBar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FleetPage } from './pages/FleetPage';
import { ServicesPage } from './pages/ServicesPage';
import { RoutesPage } from './pages/RoutesPage';
import { RouteDetailPage } from './pages/RouteDetailPage';
import { BlogHubPage } from './pages/BlogHubPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';
import { SeoHead } from './components/SeoHead';

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

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      <ScrollToTop />
      <SeoHead lang={lang} />

      {/* Persistent Sticky Header */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
      />

      {/* Dynamic Multi-Page Routes */}
      <main className="flex-1">
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
      </main>

      {/* Persistent Footer */}
      <Footer lang={lang} />

      {/* Sticky Mobile Bottom Bar (Call + WhatsApp) */}
      <StickyBottomBar lang={lang} />
    </div>
  );
}
