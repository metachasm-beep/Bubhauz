"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '../react-bits/ScrollReveal';
import CircularGallery from '../react-bits/CircularGallery';
import SearchFirstHub from './SearchFirstHub';
import ProductLens from './ProductLens';
import NightShiftFold from './NightShiftFold';

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

      <div className="w-full relative z-10 px-4 mb-10">
        <SearchFirstHub />
      </div>
      
      {/* Microscopic Product Lens */}
      <div className="w-full relative z-10 mb-10">
        <ProductLens />
      </div>

      {/* The Night Shift Transition */}
      <div className="w-full relative z-10 px-4 mb-20">
        <NightShiftFold />
      </div>

      {/* Product Circular Gallery */}
      <div className="w-full h-[600px] relative z-10 mt-10">
        <h3 className="text-center text-3xl font-bold text-[var(--primary)] mb-4">Our Curated Collection</h3>
        <div className="text-center text-lg text-[var(--text-muted)] mb-10 max-w-xl mx-auto h-[40px]">
          <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={3} blurStrength={8}>
            Browse our hand-picked favorites in a continuous, playful loop.
          </ScrollReveal>
        </div>
        <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
      </div>
    </section>
  );
}
