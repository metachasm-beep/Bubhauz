"use client";

import React, { useEffect, useState } from "react";

export default function ProgressNav() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage based on document height minus viewport height
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const currentScroll = window.scrollY;
      const progressPercent = (currentScroll / scrollHeight) * 100;
      setProgress(progressPercent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const skipToShop = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  };

  return (
    <>
      {/* Skip Presentation Button */}
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={skipToShop}
          className="px-4 py-2 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-white/70 text-xs font-semibold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all duration-300"
        >
          Skip to Shop
        </button>
      </div>

      {/* Vertical Progress Bar */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 h-48 w-[2px] bg-white/10 z-50 hidden md:block rounded-full">
        <div 
          className="absolute top-0 left-0 w-full bg-white rounded-full transition-all duration-100 ease-out"
          style={{ height: `${Math.max(0, Math.min(100, progress))}%`, boxShadow: "0 0 10px rgba(255,255,255,0.5)" }}
        />
        {/* Indicators for 3 main folds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/50 -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/50" />
      </div>
    </>
  );
}
