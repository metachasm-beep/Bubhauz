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
    <div className="fixed bottom-32 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:w-[350px] bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] z-[110] p-5 flex flex-col gap-4 animate-slide-up">
      <div className="text-[var(--foreground)] text-xs md:text-sm">
        <p>
          We use cookies to improve your experience. By continuing, you agree to our <Link href="/legal/privacy" className="text-[var(--primary)] font-semibold underline">Privacy Policy</Link>.
        </p>
      </div>
      <button 
        onClick={acceptCookies}
        className="w-full py-2.5 bg-[var(--primary)] text-white font-bold rounded-xl hover:bg-[var(--primary-hover)] transition-colors shadow-md text-sm cursor-pointer"
      >
        Got it!
      </button>
    </div>
  );
}
