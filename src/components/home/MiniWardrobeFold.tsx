"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollSequence from './ScrollSequence';

gsap.registerPlugin(ScrollTrigger);

export default function MiniWardrobeFold() {
  const foldRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".wardrobe-text", 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: foldRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, foldRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={foldRef} className="relative w-full h-screen overflow-hidden bg-[var(--background)] flex items-center justify-center z-10">
      {/* Background Canvas Animation */}
      <div className="absolute inset-0 z-0">
         <ScrollSequence />
         {/* Subtle overlay to ensure text is readable depending on the background frames */}
         <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
      </div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto pointer-events-none">
        <h2 className="wardrobe-text text-6xl md:text-8xl lg:text-[7rem] font-bold text-white mb-6 drop-shadow-xl tracking-tight leading-none">
          The Mini Wardrobe
        </h2>
        <p className="wardrobe-text text-xl md:text-3xl text-white max-w-3xl mx-auto drop-shadow-lg font-medium opacity-90">
          A collection designed for those little whirlwinds of joy.
        </p>
      </div>
    </section>
  );
}
