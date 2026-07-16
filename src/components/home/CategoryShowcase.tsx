"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { title: "Tiny Threads", subtitle: "Clothing & Apparel", color: "bg-rose-50" },
  { title: "Nourish & Nurture", subtitle: "Feeding & Nursing", color: "bg-orange-50" },
  { title: "Bubbles & Splashes", subtitle: "Bath & Skincare", color: "bg-cyan-50" },
  { title: "Dreamland", subtitle: "Nursery & Sleep", color: "bg-indigo-50" },
  { title: "Tiny Travelers", subtitle: "Travel & Gear", color: "bg-emerald-50" },
  { title: "Curious Minds", subtitle: "Play & Learning", color: "bg-yellow-50" },
  { title: "Safe & Sound", subtitle: "Health & Safety", color: "bg-teal-50" },
  { title: "The Mama Edit", subtitle: "Maternity & Postpartum", color: "bg-fuchsia-50" },
  { title: "Welcome Bundles", subtitle: "Gifting & Bundles", color: "bg-purple-50" }
];

export default function CategoryShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIdx(Number(entry.target.getAttribute('data-index')));
          }
        });
      },
      { 
        root: containerRef.current,
        threshold: 0.5 
      }
    );
    
    const folds = document.querySelectorAll('.category-fold');
    folds.forEach((fold) => observer.observe(fold));
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const folds = gsap.utils.toArray('.category-fold');
      
      folds.forEach((fold: any) => {
        const textElements = fold.querySelectorAll('.animate-text');
        const imageElement = fold.querySelector('.animate-image');
        
        // Setup initial state
        gsap.set(textElements, { y: 40, opacity: 0 });
        gsap.set(imageElement, { scale: 0.95, opacity: 0 });
        
        // ScrollTrigger for enter/leave animations
        ScrollTrigger.create({
          trigger: fold,
          scroller: containerRef.current,
          start: 'top 60%',
          onEnter: () => {
            gsap.to(textElements, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out"
            });
            gsap.to(imageElement, {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              delay: 0.2
            });
          },
          onLeaveBack: () => {
            gsap.to(textElements, { y: 40, opacity: 0, duration: 0.4 });
            gsap.to(imageElement, { scale: 0.95, opacity: 0, duration: 0.4 });
          },
          onLeave: () => {
             // Fade out when scrolling past
             gsap.to(textElements, { y: -40, opacity: 0, duration: 0.4 });
             gsap.to(imageElement, { opacity: 0, duration: 0.4 });
          },
          onEnterBack: () => {
             gsap.to(textElements, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out"
            });
            gsap.to(imageElement, {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              delay: 0.2
            });
          }
        });
        
        // Parallax image within the fold
        gsap.to(imageElement, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: fold,
            scroller: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full h-screen bg-white shadow-xl z-20">
      {/* Side Navigation Dots */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {categories.map((cat, idx) => (
          <button 
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeIdx === idx 
                ? 'bg-slate-800 scale-125 shadow-md' 
                : 'bg-black/15 hover:bg-black/30'
            }`}
            onClick={() => {
              const folds = containerRef.current?.querySelectorAll('.category-fold');
              if (folds && folds[idx]) {
                folds[idx].scrollIntoView({ behavior: 'smooth' });
              }
            }}
            aria-label={`Go to ${cat.title}`}
            title={cat.title}
          />
        ))}
      </div>

      {/* Main scroll container */}
      <div 
        ref={containerRef} 
        className="h-screen w-full overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ scrollBehavior: 'smooth' }}
      >
        {categories.map((cat, idx) => (
          <div 
            key={cat.title}
            data-index={idx}
            className={`category-fold w-full h-screen snap-center relative flex items-center justify-center overflow-hidden ${cat.color}`}
          >
            <div className="container mx-auto px-6 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full py-20">
              
              {/* Text Content */}
              <div className="flex flex-col z-10 order-2 lg:order-1 text-center lg:text-left justify-center">
                <h3 className="animate-text text-lg md:text-xl font-semibold text-[var(--primary)] tracking-widest uppercase mb-4">
                  {cat.subtitle}
                </h3>
                <h2 className="animate-text text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6 md:mb-8 leading-tight">
                  {cat.title}
                </h2>
                <div className="animate-text mt-2 md:mt-4 flex justify-center lg:justify-start">
                  <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3 group">
                    Shop {cat.title.split(' ')[0]}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Image Placeholder */}
              <div className="w-full h-[40vh] md:h-[50vh] lg:h-[70vh] relative z-0 order-1 lg:order-2 flex items-center justify-center">
                <div className="animate-image w-full h-full max-w-sm md:max-w-md lg:max-w-lg rounded-[2rem] bg-white/50 backdrop-blur-md border border-white/60 shadow-2xl flex items-center justify-center overflow-hidden">
                   <div className="text-slate-400 flex flex-col items-center gap-3">
                     <svg className="w-12 h-12 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                     </svg>
                     <span className="font-medium tracking-wider uppercase text-xs">Visual Asset</span>
                   </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
