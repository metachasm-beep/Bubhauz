"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Feather, Droplet, Leaf, ShieldCheck, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PurityWaterfall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Create a stagger parallax effect for all elements with class 'parallax-item'
      elementsRef.current.forEach((el, index) => {
        if (!el) return;
        
        // Vary the speed based on index so they fall at different rates
        const speed = 1 + (index * 0.5);
        
        gsap.to(el, {
          y: () => window.innerHeight * speed, // Moves down the screen
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const materials = [
    {
      Icon: Feather,
      title: "Ultra-Soft",
      desc: "Premium, unbleached Egyptian cotton.",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      top: "10%",
      left: "15%"
    },
    {
      Icon: Droplet,
      title: "Non-Toxic Dyes",
      desc: "Zero heavy metals. Safe for chewing.",
      color: "text-teal-500",
      bg: "bg-teal-500/10",
      top: "5%",
      left: "70%"
    },
    {
      Icon: Leaf,
      title: "GOTS Organic",
      desc: "100% certified organic farming.",
      color: "text-green-500",
      bg: "bg-green-500/10",
      top: "20%",
      left: "40%"
    },
    {
      Icon: ShieldCheck,
      title: "Oeko-Tex Standard 100",
      desc: "Tested for harmful substances.",
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      top: "15%",
      left: "85%"
    },
    {
      Icon: Sparkles,
      title: "Hypoallergenic",
      desc: "Gentle on the most sensitive newborn skin.",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      top: "0%",
      left: "25%"
    }
  ];

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[150vh] flex flex-col items-center justify-start pt-32 overflow-hidden my-20 bg-gradient-to-b from-transparent via-white/50 to-transparent"
    >
      <div className="relative z-20 text-center max-w-3xl px-6 mb-20">
        <h2 className="text-5xl font-bold text-[var(--primary)] mb-6">The Purity Standard</h2>
        <p className="text-xl text-[var(--text-muted)]">
          We strip away the harsh chemicals, synthetics, and heavy metals. What's left is pure, unadulterated comfort for your baby.
        </p>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {materials.map((mat, i) => (
          <div
            key={i}
            ref={(el) => {
              elementsRef.current[i] = el;
            }}
            className="absolute parallax-item pointer-events-auto"
            style={{ top: mat.top, left: mat.left }}
          >
            {/* The Icon Container */}
            <div className={`relative group cursor-pointer p-6 rounded-full ${mat.bg} backdrop-blur-sm border border-white shadow-lg transition-transform hover:scale-110 duration-300`}>
              <mat.Icon className={`w-12 h-12 ${mat.color}`} strokeWidth={1.5} />
              
              {/* Glassmorphism Tooltip (Hidden by default, fades in on hover) */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-4 text-center">
                  <h4 className="font-bold text-gray-800 text-sm mb-1">{mat.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{mat.desc}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
