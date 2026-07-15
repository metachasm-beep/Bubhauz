"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import SpotlightCard from '../react-bits/SpotlightCard';

// Mock product database for the Search-First Hub
const PRODUCTS = [
  { id: '1', title: 'Organic Cotton Sleep Sack', category: 'sleep', desc: 'Ultra-soft, breathable organic cotton for safe, cozy sleep.', link: '/quote?item=sleep-sack' },
  { id: '2', title: 'Natural Rubber Teether', category: 'teething', desc: 'Soothes sore gums with 100% natural, non-toxic rubber.', link: '/quote?item=teether' },
  { id: '3', title: 'SafeSleep Crib Mattress', category: 'sleep', desc: 'Firm, breathable, and waterproof for ultimate safety.', link: '/quote?item=crib-mattress' },
  { id: '4', title: 'Compact Travel Stroller', category: 'travel', desc: 'Lightweight, one-hand fold for seamless adventures.', link: '/quote?item=travel-stroller' },
  { id: '5', title: 'Gentle Baby Wash', category: 'bath', desc: 'Tear-free, plant-based formula for sensitive skin.', link: '/quote?item=baby-wash' },
  { id: '6', title: 'Smart Nursery Monitor', category: 'safety', desc: 'Crystal clear HD video with room temp and humidity tracking.', link: '/quote?item=monitor' },
];

export default function SearchFirstHub() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  
  const hasInput = query.length > 0;
  
  // Filter products based on query
  const filteredProducts = PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.desc.toLowerCase().includes(query.toLowerCase())
  );

  // Animate cards entry using GSAP when results change
  useEffect(() => {
    if (hasInput && cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll('.search-result-card');
      if (cards.length > 0) {
        gsap.fromTo(cards, 
          { y: 50, opacity: 0, scale: 0.9 }, 
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" }
        );
      }
    }
  }, [query, hasInput]);

  return (
    <div className={`w-full relative transition-colors duration-1000 ease-in-out rounded-[3rem] overflow-hidden ${hasInput ? 'bg-[#A3D5D3]/20 py-24' : 'bg-transparent py-10'}`}>
      
      {/* Dramatic Dynamic Background Blob */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] pointer-events-none transition-all duration-1000 ease-in-out z-0`}
        style={{
          width: hasInput ? '120vw' : '0vw',
          height: hasInput ? '120vw' : '0vw',
          backgroundColor: 'rgba(244, 179, 147, 0.4)', // Warm peach color that dramatically floods the background
          opacity: hasInput ? 1 : 0
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
        
        {/* Dynamic Header */}
        <h2 className={`font-semibold text-center transition-all duration-700 ease-in-out ${hasInput ? 'text-3xl mb-8 text-[var(--foreground)]' : 'text-4xl md:text-6xl mb-12 text-[var(--primary)]'}`}>
          {hasInput ? 'Anticipating your needs...' : 'What does your little one need today?'}
        </h2>

        {/* Massive Search Input */}
        <div className={`w-full transition-all duration-700 ease-in-out relative ${hasInput ? 'max-w-3xl mb-16' : 'max-w-4xl mb-0'}`}>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search 'teething', 'sleep', or 'travel'..." 
            className={`w-full pl-8 pr-20 transition-all duration-700 ease-in-out rounded-full border-[3px] border-[var(--primary)] shadow-2xl focus:outline-none focus:ring-4 focus:ring-[var(--primary-hover)]/30 text-[var(--foreground)] bg-white/80 backdrop-blur-md ${hasInput ? 'py-5 text-xl' : 'py-8 text-2xl md:text-3xl'}`}
          />
          <div className="absolute right-3 top-3 bottom-3 aspect-square bg-[var(--primary)] rounded-full text-white flex items-center justify-center pointer-events-none transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        {/* Dynamic Results Grid */}
        <div 
          ref={cardsContainerRef}
          className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-in-out ${hasInput ? 'opacity-100 max-h-[2000px] mt-0' : 'opacity-0 max-h-0 overflow-hidden mt-0'}`}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <SpotlightCard key={product.id} spotlightColor="rgba(255, 255, 255, 0.4)" className="search-result-card glass-card p-8 flex flex-col items-center cursor-pointer border border-white/60 hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 text-center">{product.title}</h3>
                <span className="text-xs uppercase tracking-wider text-[var(--primary)] font-bold mb-4 bg-[var(--primary)]/10 px-3 py-1 rounded-full">{product.category}</span>
                <p className="text-[var(--text-muted)] text-center mb-6 flex-grow text-sm">{product.desc}</p>
                <Link href={product.link} className="w-full py-3 bg-[var(--primary)] text-white rounded-full font-bold text-md hover:bg-[var(--primary-hover)] transition-all shadow-md text-center">
                  View Item
                </Link>
              </SpotlightCard>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-[var(--text-muted)] text-xl font-medium">
              We couldn't find exactly that, but our experts can help you source it!
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
