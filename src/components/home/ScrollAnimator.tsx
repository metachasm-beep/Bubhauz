"use client";

import React, { useEffect, useRef, useState, ReactNode, Children } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import SiteFooter from "@/components/ui/SiteFooter";

interface ScrollAnimatorProps {
  children?: ReactNode;
}

export default function ScrollAnimator({ children }: ScrollAnimatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  
  const sequencesRef = useRef<HTMLImageElement[][]>([[], [], [], [], [], []]);
  const [isReady, setIsReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const frameCounts = [102, 102, 102, 102, 102, 102];
  
  const folds = Children.toArray(children);

  // Load images
  useEffect(() => {
    if (sequencesRef.current[0].length > 0) return; // Prevent double load in strict mode
    
    const configs = [
      (i: number) => `/heroscroll/${i.toString().padStart(3, "0")}.webp?v=1`,
      (i: number) => `/scroll2/use_the_clouds_whirlwind_image-ezremove_${i.toString().padStart(3, "0")}.webp?v=1`,
      (i: number) => `/scroll3/use_the_baby_apparel_image_as-ezremove_${i.toString().padStart(3, "0")}.webp?v=1`,
      (i: number) => `/scroll4/Basic%20Model-1784277948000_${i.toString().padStart(3, "0")}.webp?v=1`,
      (i: number) => `/scroll5/use_the_baby_bed_image_as_firs_GStory_1784279637_${i.toString().padStart(3, "0")}.webp?v=1`,
      (i: number) => `/scroll6/use_the_baby_toys_image_as_fir_GStory_1784280854_${i.toString().padStart(3, "0")}.webp?v=1`
    ];

    let totalLoaded = 0;
    const totalFrames = frameCounts.reduce((a, b) => a + b, 0);

    const updateProgress = () => {
      totalLoaded++;
      // Throttle state updates to prevent re-render spam
      if (totalLoaded % 10 === 0 || totalLoaded === totalFrames) {
        setLoadingProgress(Math.floor((totalLoaded / totalFrames) * 100));
      }
      if (totalLoaded === totalFrames) {
        setIsReady(true);
      }
    };

    configs.forEach((getUrl, seqIndex) => {
      for (let i = 0; i < frameCounts[seqIndex]; i++) {
        const img = new window.Image();
        
        img.onload = () => {
          updateProgress();
          if (seqIndex === 0 && i === 0) drawFrame([0, -1, -1, -1, -1, -1]);
        };
        
        img.onerror = () => {
          console.error(`Failed to load image: ${img.src}`);
          updateProgress();
        };
        
        img.src = getUrl(i);
        sequencesRef.current[seqIndex].push(img);
      }
    });
  }, []);

  // Hide global footer on mount so it can be animated in at the end
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

  const drawSingleImage = (img: HTMLImageElement, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!img || !img.complete || img.naturalHeight === 0) return; // Prevent broken image exception
    
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;
    
    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const drawFrame = (indices: number[]) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw each active sequence layered on top of each other
    indices.forEach((frameIdx, seqIdx) => {
      if (frameIdx >= 0 && sequencesRef.current[seqIdx] && sequencesRef.current[seqIdx].length > 0) {
        const img = sequencesRef.current[seqIdx][Math.round(frameIdx)];
        if (img) drawSingleImage(img, ctx, canvas);
      }
    });
  };

  // GSAP Observer Sequence (Zero Physical Scroll, Universal Parallax Folds)
  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      drawFrame([0, -1, -1, -1, -1, -1]);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: "+=7000", // Adjusted from 10000 for more responsive scrolling
          scrub: 1.5, // Smooth lag
        }
      });
      const foldCount = folds.length;

      // INITIAL STATE SETUP
      if (foldCount > 0) {
        gsap.set(".fold-wrapper", { autoAlpha: (i) => i === 0 ? 1 : 0 }); 
      }

      // ---- HERO INTERNAL ANIMATIONS (Happens instantly on load / scroll 0) ----
      gsap.to(".hero-title-word", { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.2, duration: 1, ease: "power2.out", delay: 0.2 });
      gsap.to(".hero-subtitle", { opacity: 1, x: 0, duration: 1, ease: "power2.out", delay: 0.8 });
      gsap.to(".hero-button", { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", delay: 1.1 });

      const frameTracker = [-1, -1, -1, -1, -1, -1]; // Tracks the current frame of each sequence
      frameTracker[0] = 0;
      
      // ============================================
      // HERO TEXT FADE OUT (Immediately on scroll)
      // ============================================
      tl.add("hero-out");
      tl.to([".hero-title-word", ".hero-subtitle", ".hero-button"], {
        opacity: 0,
        y: -20,
        duration: 2,
        ease: "power2.inOut"
      }, "hero-out");

      // ============================================
      // HERO CANVAS SCRUB
      // ============================================
      tl.add("canvas-anim-0");
      const frameObj0 = { frame: -1 };
      tl.to(frameObj0, {
        frame: frameCounts[0] - 1,
        duration: 8, // Stretched out for smoother scrolling
        ease: "none",
        onUpdate: () => {
           frameTracker[0] = Math.max(0, Math.round(frameObj0.frame));
           
           // Ensure all future sequences are completely hidden when scrubbing back to hero
           for(let j=1; j<foldCount; j++) {
              frameTracker[j] = -1;
           }
           
           drawFrame(frameTracker);
        }
      }, "canvas-anim-0");
      
      tl.to({}, { duration: 1 }); // Pause before next fold

      // ============================================
      // UNIVERSAL PARALLAX SLIDER (Folds 1 to 5)
      // ============================================
      for (let i = 1; i < foldCount; i++) {
        const textInLabel = `text-in-${i}`;
        const textOutLabel = `text-out-${i}`;
        const animLabel = `canvas-anim-${i}`;
        const duration = 8; // HUGE duration relative to the timeline so it maps to a large scroll chunk
        
        // --- PHASE: PREVIOUS FOLD HIDE & NEW TEXT IN ---
        tl.add(textInLabel);
        
        // Hide previous fold's wrapper completely (its text is already out, but this prevents clicks/overlap)
        tl.set(`.fold-${i - 1}`, { autoAlpha: 0 }, textInLabel);
        
        // Fade in current fold's wrapper
        tl.to(`.fold-${i}`, { 
           autoAlpha: 1, 
           duration: 2,
           ease: "power2.inOut",
           onStart: () => {
             if (typeof navigator !== 'undefined' && navigator.vibrate) {
               navigator.vibrate(50);
             }
           }
        }, textInLabel);
        
        // Animate the text elements for the current fold IN
        tl.to(`.fold-${i} .fold-title`, { opacity: 1, y: 0, duration: 2, ease: "power2.out" }, `${textInLabel}+=0.5`)
          .to(`.fold-${i} .fold-subtitle`, { opacity: 1, y: 0, duration: 2, ease: "power2.out" }, `${textInLabel}+=1`)
          .to(`.fold-${i} .fold-button`, { opacity: 1, scale: 1, duration: 2, ease: "back.out(1.7)" }, `${textInLabel}+=1.5`);
        
        tl.to({}, { duration: 3 }); // Pause for user to read
        
        // --- PHASE: CURRENT TEXT OUT ---
        tl.add(textOutLabel);
        tl.to([`.fold-${i} .fold-title`, `.fold-${i} .fold-subtitle`, `.fold-${i} .fold-button`], {
          opacity: 0,
          y: -20,
          duration: 2,
          ease: "power2.inOut"
        }, textOutLabel);

        // --- PHASE: CANVAS ANIMATION ---
        tl.add(animLabel);
        
        // If there is a canvas sequence corresponding to this fold transition, play it!
        if (i < sequencesRef.current.length) {
          const seqObj = { frame: -1 };
          tl.to(seqObj, {
            frame: frameCounts[i] - 1,
            duration: duration,
            ease: "none",
            onUpdate: () => {
              // Ensure previous sequences are pinned at their last frame
              for(let j=0; j<i; j++) {
                 frameTracker[j] = frameCounts[j] - 1;
              }
              // Ensure future sequences are completely hidden (critical for backward scrub)
              for(let j=i+1; j<foldCount; j++) {
                 frameTracker[j] = -1;
              }
              frameTracker[i] = Math.max(0, Math.round(seqObj.frame));
              drawFrame(frameTracker);
            }
          }, animLabel);
        }
        
        tl.to({}, { duration: 1 }); // Small pause before next transition
      }

      // ---- TRANSITION IN FOOTER OVERLAY ----
      tl.add("footerIn");
      const footerEl = document.getElementById("global-footer");
      if (footerEl) {
        tl.to(footerEl, { 
          opacity: 1, 
          pointerEvents: "auto",
          duration: 1, 
          ease: "power2.inOut" 
        }, "footerIn");
      }

    }, containerRef);

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Basic redraw
        drawFrame([frameCounts[0] - 1, -1, -1, -1, -1, -1]);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [isReady, folds.length]);

  return (
    <section ref={containerRef} style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", overflow: "hidden", backgroundColor: "#000" }}>
        
        {/* Fallback Image */}
        <div className={`absolute inset-0 z-0 transition-opacity duration-700 ${isReady ? 'opacity-0' : 'opacity-100'}`}>
            <Image src="/heroscroll/000.webp" alt="Hero Background" fill className="object-cover" priority />
        </div>
        
        <canvas 
          ref={canvasRef} 
          className="relative z-10"
          style={{ width: "100%", height: "100%", display: "block", transformOrigin: "center center" }}
        />
        
        {/* Subtle overlay to ensure text is readable over the canvas */}
        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

        {/* UNIVERSAL FOLDS CONTAINER */}
        <div className="universal-folds-container absolute inset-0 z-20 pointer-events-none">
          {folds.map((child, index) => (
             <div 
               key={index} 
               className={`fold-wrapper fold-${index} absolute inset-0 w-full h-full pointer-events-auto`}
             >
               {child}
             </div>
          ))}
        </div>

        {/* Elegant Preloader Overlay */}
        <div 
          className={`absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${loadingProgress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
        >
          <div className="w-64 h-[1px] bg-white/20 rounded-full overflow-hidden mb-6 relative">
             <div 
               className="h-full bg-white transition-all duration-300 ease-out absolute left-0 top-0" 
               style={{ width: `${loadingProgress}%`, boxShadow: '0 0 10px rgba(255,255,255,0.8)' }} 
             />
          </div>
          <p className="text-white/60 text-sm tracking-[0.2em] uppercase font-light animate-pulse">
            {loadingProgress < 100 ? `Preparing the nursery... ${loadingProgress}%` : "Ready"}
          </p>
        </div>
      </div>
    </section>
  );
}
