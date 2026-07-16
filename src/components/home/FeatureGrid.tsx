"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MiniWardrobeFold from './MiniWardrobeFold';
gsap.registerPlugin(ScrollTrigger);

export default function FeatureGrid() {
  const gridRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax blobs
      gsap.to(".parallax-blob", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: -150
      });
    }, gridRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={gridRef} className="min-h-screen flex flex-col items-center justify-start bg-[var(--background)] relative z-10 pt-24 overflow-hidden">
      {/* Parallax Spatial Depth blobs */}
      <div className="parallax-blob absolute top-0 left-0 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="parallax-blob absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-[#A3D5D3]/10 rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="w-full relative z-10">
        <MiniWardrobeFold />
      </div>


    </section>
  );
}
