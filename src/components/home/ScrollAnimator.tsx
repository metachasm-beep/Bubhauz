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
    
    // Mobile optimization: Use blur-fill to prevent massive cropping on portrait screens
    if (canvasRatio < 0.8 && imgRatio > 1) { 
      // 1. Draw blurred cover background
      let bgWidth = canvas.height * imgRatio;
      let bgHeight = canvas.height;
      let bgOffsetX = (canvas.width - bgWidth) / 2;
      
      ctx.filter = 'blur(30px) brightness(0.3)';
      ctx.drawImage(img, bgOffsetX, 0, bgWidth, bgHeight);
      
      // 2. Draw contained sharp image perfectly in the center (middle third), zoomed by 15%
      ctx.filter = 'none';
      let fgWidth = canvas.width * 1.15;
      let fgHeight = (canvas.width / imgRatio) * 1.15;
      let fgOffsetX = (canvas.width - fgWidth) / 2;
      let fgOffsetY = (canvas.height - fgHeight) / 2; 
      
      ctx.drawImage(img, fgOffsetX, fgOffsetY, fgWidth, fgHeight);
    } else {
      // Standard cover behavior for desktop
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
      
      ctx.filter = 'none';
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
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
          end: "+=14000", // Doubled to reduce scroll animation speed to 50%
          scrub: 1.5, // Smooth lag
        }
      });
      const foldCount = folds.length;

            // INITIAL STATE SETUP
      gsap.set(".fold-wrapper", { autoAlpha: 0 }); // ALL text starts hidden

      const frameTracker = [-1, -1, -1, -1, -1, -1]; // Tracks the current frame of each sequence
      frameTracker[0] = 0; // Initialize canvas at frame 0 of heroscroll
      
      // ============================================
      // UNIVERSAL PARALLAX SLIDER (Folds 0 to 5)
      // ============================================
      for (let i = 0; i < foldCount; i++) {
        const animLabel = `canvas-anim-${i}`;
        const textInLabel = `text-in-${i}`;
        const textOutLabel = `text-out-${i}`;
        const duration = 8;
        
        // --- PHASE: CANVAS ANIMATION (Sequence i) ---
        tl.add(animLabel);
        if (i < sequencesRef.current.length) {
          const seqObj = { frame: 0 };
          tl.to(seqObj, {
            frame: frameCounts[i] - 1,
            duration: duration,
            ease: "none",
            onUpdate: () => {
              for(let j=0; j<i; j++) frameTracker[j] = frameCounts[j] - 1;
              frameTracker[i] = Math.max(0, Math.round(seqObj.frame));
              for(let j=i+1; j<foldCount; j++) frameTracker[j] = -1;
              drawFrame(frameTracker);
            }
          }, animLabel);
        }
        
        tl.to({}, { duration: 1 }); // Pause after sequence completes
        
        // --- PHASE: TEXT IN FOR FOLD i ---
        tl.add(textInLabel);
        
        // Hide previous fold's wrapper completely
        if (i > 0) tl.set(`.fold-${i - 1}`, { autoAlpha: 0 }, textInLabel);
        
        // Fade in current fold's wrapper over the END frame of sequence i
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
        
        // Animate the text elements IN (Kinetic Blur - Option A)
        tl.to(`.fold-${i} .animate-up`, { 
          opacity: 1, 
          filter: "blur(0px)",
          stagger: 0.15, 
          duration: 1.2, 
          ease: "power2.out" 
        }, `${textInLabel}+=0.2`);
        
        tl.to({}, { duration: 3 }); // Pause for user to read
        
        // --- PHASE: TEXT OUT FOR FOLD i ---
        tl.add(textOutLabel);
        tl.to(`.fold-${i} .animate-up`, {
          opacity: 0,
          filter: "blur(10px)",
          duration: 1.2,
          ease: "power2.inOut"
        }, textOutLabel);
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
        
        {/* Subtle overlay to ensure text is readable over the canvas without glass cards */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 z-10 pointer-events-none" />

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
