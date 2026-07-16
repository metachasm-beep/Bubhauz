"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Moon, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function NightShiftFold() {
  const foldRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!foldRef.current || !starsRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Create a timeline that scrubs as the user scrolls into and through the fold
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: foldRef.current,
          start: "top center", // Starts transitioning when the top of the fold hits the center of the viewport
          end: "top 10%",     // Finishes transition when top hits 10%
          scrub: 1,
        }
      });

      // Transition the background color of the fold wrapper to deep midnight blue
      tl.to(foldRef.current, {
        backgroundColor: "#0B132B",
        ease: "none"
      }, 0);

      // Fade in the stars overlay
      tl.to(starsRef.current, {
        opacity: 1,
        ease: "none"
      }, 0);

      // Fade and slide up the textual content
      tl.from(contentRef.current.children, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out",
        duration: 1
      }, 0);

    }, foldRef);

    return () => ctx.revert();
  }, []);

  // Generate random stars
  const generateStars = () => {
    return Array.from({ length: 50 }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const animationDuration = Math.random() * 3 + 2;
      const animationDelay = Math.random() * 2;

      return (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            opacity: Math.random() * 0.7 + 0.3,
            animation: `twinkle ${animationDuration}s infinite alternate ${animationDelay}s`
          }}
        />
      );
    });
  };

  return (
    <div 
      ref={foldRef} 
      className="relative w-full min-h-[80vh] flex items-center justify-center py-24 overflow-hidden rounded-[3rem] transition-colors duration-1000 my-20"
      style={{ backgroundColor: "var(--background)" }} // Starts with default background
    >
      {/* Starry Sky Overlay (hidden initially) */}
      <div 
        ref={starsRef} 
        className="absolute inset-0 pointer-events-none opacity-0"
      >
        {generateStars()}
        
        {/* CSS for twinkling effect */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes twinkle {
            0% { opacity: 0.2; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 10px rgba(255,255,255,0.8); }
          }
        `}} />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center text-white">
        <div className="flex justify-center mb-6">
          <Moon className="w-12 h-12 text-[#FFD700] opacity-80" />
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          The Night Shift
        </h2>
        
        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-16 leading-relaxed font-light">
          When the lights go down, our standards stay high. Discover our sleep collection, designed for uninterrupted dreams and absolute safety.
        </p>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl text-left hover:bg-white/15 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-semibold text-white">The Cloud Swaddle</h3>
              <Star className="w-6 h-6 text-[#FFD700] fill-[#FFD700]/20" />
            </div>
            <p className="text-blue-100 mb-6 font-light">
              100% GOTS certified organic cotton. Temperature-regulating and impossibly soft.
            </p>
            <span className="text-sm font-bold uppercase tracking-wider text-blue-300 group-hover:text-white transition-colors">
              Explore Swaddles &rarr;
            </span>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl text-left hover:bg-white/15 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-semibold text-white">Breathable Crib Sheets</h3>
              <Star className="w-6 h-6 text-[#FFD700] fill-[#FFD700]/20" />
            </div>
            <p className="text-blue-100 mb-6 font-light">
              Fitted for safety with a tight 360° elastic band. Non-toxic, hypoallergenic dyes.
            </p>
            <span className="text-sm font-bold uppercase tracking-wider text-blue-300 group-hover:text-white transition-colors">
              Explore Sheets &rarr;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
