import { useEffect, useState } from 'react';

export function WelcomeIntro() {
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const englishTimer = window.setTimeout(() => setLanguage('en'), 1500);
    const exitTimer = window.setTimeout(() => setIsLeaving(true), 3000);

    return () => {
      window.clearTimeout(englishTimer);
      window.clearTimeout(exitTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`welcome-intro${isLeaving ? ' welcome-intro--leaving' : ''}`}
      onAnimationEnd={(event) => {
        if (event.animationName === 'welcome-slide-up') setIsVisible(false);
      }}
      role="status"
      aria-live="polite"
      aria-label={language === 'hi' ? 'जय श्री महाकाल' : 'Jay Shri MahaKal'}
    >
      <div className="welcome-intro__content">
        <p className="welcome-intro__eyebrow">JANGID JI CAB SERVICE</p>

        <div className="welcome-intro__images">
          <img
            src="/assets/images/gansashji.jpg"
            alt=""
            fetchPriority="high"
            decoding="async"
            width={1080}
            height={1920}
          />
          <div className="welcome-intro__title-wrap">
            <h1 key={language} className="welcome-intro__title" lang={language}>
              {language === 'hi' ? 'जय श्री महाकाल' : 'Jay Shri MahaKal'}
            </h1>
            <span className="welcome-intro__rule" />
          </div>
          <img
            src="/assets/images/vishsvakarma.jpg"
            alt=""
            fetchPriority="high"
            decoding="async"
            width={399}
            height={501}
          />
        </div>

        <p className="welcome-intro__blessing" lang={language === 'hi' ? 'hi' : 'en'}>
          {language === 'hi' ? 'आपकी यात्रा मंगलमय हो' : 'May your journey be blessed'}
        </p>
      </div>
    </div>
  );
}
