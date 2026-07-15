"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('bubhauz_cookie_consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('bubhauz_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t-4 border-[var(--primary)] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 p-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-slide-up">
      <div className="text-[var(--foreground)] text-sm md:text-base max-w-4xl">
        <p>
          <strong>We use cookies to ensure you get the best experience on our website.</strong> By continuing to use our site, you agree to our use of cookies and our updated <Link href="/legal/privacy" className="text-[var(--primary)] font-semibold underline hover:text-[var(--primary-hover)]">Privacy Policy</Link> as per the Information Technology (IT) Rules, 2011.
        </p>
      </div>
      <div className="flex shrink-0">
        <button 
          onClick={acceptCookies}
          className="px-8 py-3 bg-[var(--primary)] text-white font-bold rounded-full hover:bg-[var(--primary-hover)] transition-colors shadow-lg"
        >
          I Accept
        </button>
      </div>
    </div>
  );
}
