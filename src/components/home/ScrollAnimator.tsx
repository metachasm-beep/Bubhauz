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

  return (
    <main className="relative w-full h-[100dvh] bg-black text-white overflow-hidden">
      
      {/* Sticky Crossfade Backgrounds */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {heroImages.map((src, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeFold === idx ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image 
              src={src} 
              alt={`Background ${idx}`}
              fill
              priority={idx === 0}
              className="object-cover"
            />
          </div>
        ))}
        {/* Subtle overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80 z-10 pointer-events-none" />
      </div>

      {/* Foreground Content */}
      <div className="absolute inset-0 z-20 w-full h-full overflow-y-auto snap-y snap-mandatory hide-scrollbar">
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
