"use client";

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '../react-bits/ScrollReveal';
import SpotlightCard from '../react-bits/SpotlightCard';
import CircularGallery from '../react-bits/CircularGallery';

gsap.registerPlugin(ScrollTrigger);

export default function FeatureGrid() {
  const gridRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered Domino Entrance
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });

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
    <section ref={gridRef} className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] relative z-10 py-20 overflow-hidden">
      {/* Parallax Spatial Depth blobs */}
      <div className="parallax-blob absolute top-0 left-0 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="parallax-blob absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-[#A3D5D3]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center px-4 w-full max-w-5xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-[var(--primary)] animate-float">Discover More</h2>
        <div className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-10 h-[60px]">
          <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10}>
            Explore our extensive catalogue of hand-picked, lovingly crafted baby products below.
          </ScrollReveal>
        </div>

        {/* Search-First Navigation */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          <input 
            type="text" 
            placeholder="What are you looking for your little one today?" 
            className="w-full py-4 pl-6 pr-14 text-lg rounded-full border-2 border-[var(--primary)] shadow-glass-colored focus:outline-none focus:ring-4 focus:ring-[var(--primary-hover)]/30 transition-all text-[var(--foreground)] bg-white/50"
          />
          <button className="absolute right-2 top-2 bottom-2 aspect-square bg-[var(--primary)] rounded-full text-white flex items-center justify-center hover:bg-[var(--primary-hover)] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
        
        {/* Atomic Product Discovery Cards with Isometric Hover and Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <SpotlightCard spotlightColor="rgba(163, 213, 211, 0.25)" className="feature-card glass-card p-10 flex flex-col items-center isometric-hover cursor-pointer border border-white/60">
            <div className="w-32 h-32 bg-[#A3D5D3]/20 rounded-full mb-6 flex items-center justify-center text-[#A3D5D3]">
               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </div>
            <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-3">Nursery Essentials</h3>
            <p className="text-[var(--text-muted)] text-center mb-8 flex-grow">Gentle fabrics and safe designs for sweet dreams.</p>
            <Link href="/quote?category=nursery" className="w-full py-4 bg-[#A3D5D3] text-white rounded-full font-bold text-lg hover:bg-[#8ebfb7] transition-all shadow-md text-center z-10">
              View Nursery
            </Link>
          </SpotlightCard>
          <SpotlightCard spotlightColor="rgba(244, 179, 147, 0.25)" className="feature-card glass-card p-10 flex flex-col items-center isometric-hover cursor-pointer border border-white/60">
            <div className="w-32 h-32 bg-[var(--primary)]/20 rounded-full mb-6 flex items-center justify-center text-[var(--primary)]">
               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </div>
            <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-3">Home Safety</h3>
            <p className="text-[var(--text-muted)] text-center mb-8 flex-grow">Baby-proofing solutions that blend into your home.</p>
            <Link href="/quote?category=safety" className="w-full py-4 bg-[var(--primary)] text-white rounded-full font-bold text-lg hover:bg-[var(--primary-hover)] transition-all shadow-md text-center z-10">
              View Safety
            </Link>
          </SpotlightCard>
        </div>
      </div>
      
      {/* Product Circular Gallery */}
      <div className="w-full h-[600px] relative z-10 mt-10">
        <h3 className="text-center text-3xl font-bold text-[var(--primary)] mb-4">Our Curated Collection</h3>
        <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
      </div>
    </section>
  );
}
