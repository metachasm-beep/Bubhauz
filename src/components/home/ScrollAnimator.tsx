"use client";

import React, { useEffect, useRef, useState, ReactNode, Children } from "react";
import Image from "next/image";
import gsap from "gsap";

interface ScrollAnimatorProps {
  children?: ReactNode;
}

export default function ScrollAnimator({ children }: ScrollAnimatorProps) {
  const [activeFold, setActiveFold] = useState(0);
  const foldRefs = useRef<(HTMLDivElement | null)[]>([]);

  const folds = Children.toArray(children);

  const heroImages = [
    `/heroscroll/000.webp`,
    `/scroll2/use_the_clouds_whirlwind_image-ezremove_101.webp`,
    `/scroll3/use_the_baby_apparel_image_as-ezremove_101.webp`,
    `/scroll4/Basic%20Model-1784277948000_101.webp`,
    `/scroll5/use_the_baby_bed_image_as_firs_GStory_1784279637_101.webp`,
    `/scroll6/use_the_baby_toys_image_as_fir_GStory_1784280854_101.webp`,
  ];

  // Intersection Observer for active fold detection and text animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = foldRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setActiveFold(index);
            // Quick stagger in animation for elements in the active fold
            gsap.fromTo(
              entry.target.querySelectorAll('.animate-up'),
              { opacity: 0, y: 20, filter: "blur(10px)" },
              { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.1, duration: 1, ease: "power2.out" }
            );
          }
        } else {
          // Fade out when leaving
          gsap.to(entry.target.querySelectorAll('.animate-up'), {
            opacity: 0, filter: "blur(10px)", duration: 0.5
          });
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of the fold is visible

    foldRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [folds.length]);

  // Hide global footer on mount so it can be handled seamlessly if necessary
  useEffect(() => {
    const globalFooter = document.getElementById("global-footer");
    if (globalFooter) {
      globalFooter.style.position = "fixed";
      globalFooter.style.bottom = "0";
      globalFooter.style.left = "0";
      globalFooter.style.width = "100%";
      globalFooter.style.zIndex = "40";
      globalFooter.style.opacity = "0";
      globalFooter.style.pointerEvents = "none";
    }

    return () => {
      if (globalFooter) {
        globalFooter.style.position = "";
        globalFooter.style.bottom = "";
        globalFooter.style.left = "";
        globalFooter.style.width = "";
        globalFooter.style.zIndex = "";
        globalFooter.style.opacity = "";
        globalFooter.style.pointerEvents = "";
      }
    };
  }, []);

  const [progress, setProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollHeight = target.scrollHeight - target.clientHeight;
    if (scrollHeight <= 0) return;
    const currentScroll = target.scrollTop;
    setProgress((currentScroll / scrollHeight) * 100);
  };

  return (
    <main className="relative w-full h-[100dvh] bg-black text-white overflow-hidden">
      
      {/* Sticky Crossfade Backgrounds */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {heroImages.map((src, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeFold === idx ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Desktop / Landscape Image */}
            <div className="hero-bg-desktop absolute inset-0">
              <Image 
                src={src} 
                alt={`Background ${idx}`}
                fill
                priority={idx === 0}
                className="object-cover"
              />
            </div>
            {/* Mobile Portrait Image */}
            <div className="hero-bg-mobile absolute inset-0">
              <Image 
                src={`/mobile/fold_${idx + 1}.webp`} 
                alt={`Mobile Background ${idx}`}
                fill
                priority={idx === 0}
                className="object-cover"
              />
            </div>
          </div>
        ))}
        {/* Subtle overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80 z-10 pointer-events-none" />
      </div>

      {/* Vertical Progress Bar & Navigation Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 h-48 w-[2px] bg-white/10 z-50 hidden md:block rounded-full pointer-events-auto">
        <div 
          className="absolute top-0 left-0 w-full bg-white rounded-full transition-all duration-100 ease-out"
          style={{ height: `${Math.max(0, Math.min(100, progress))}%`, boxShadow: "0 0 10px rgba(255,255,255,0.5)" }}
        />
        {/* Indicators for folds */}
        {folds.map((_, idx) => {
          const topPercent = folds.length > 1 ? (idx / (folds.length - 1)) * 100 : 0;
          return (
            <button
              key={idx}
              onClick={() => {
                foldRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 cursor-pointer ${
                activeFold === idx ? "bg-white w-2.5 h-2.5 shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "bg-white/50 w-1.5 h-1.5 hover:bg-white/80 hover:w-2 hover:h-2"
              }`}
              style={{ top: `${topPercent}%` }}
              aria-label={`Go to fold ${idx + 1}`}
            />
          );
        })}
      </div>

      {/* Foreground Content */}
      <div 
        className="absolute inset-0 z-20 w-full h-full overflow-y-auto snap-y snap-mandatory hide-scrollbar"
        data-lenis-prevent="true"
        onScroll={handleScroll}
      >
        {folds.map((child, index) => (
          <div 
            key={index}
            ref={(el) => { foldRefs.current[index] = el; }}
            className="w-full h-[100dvh] snap-center snap-always flex items-center justify-center pointer-events-auto"
          >
            <div className="w-full h-full relative flex flex-col items-center justify-center">
               {child}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
