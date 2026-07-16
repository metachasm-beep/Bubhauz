"use client";

import React, { useEffect, useRef, useState, ReactNode, Children } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import SiteFooter from "@/components/ui/SiteFooter";

gsap.registerPlugin(Observer);

interface ScrollAnimatorProps {
  children?: ReactNode;
}

export default function ScrollAnimator({ children }: ScrollAnimatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  
  const [seq1Images, setSeq1Images] = useState<HTMLImageElement[]>([]);
  const [seq2Images, setSeq2Images] = useState<HTMLImageElement[]>([]);
  const [seq3Images, setSeq3Images] = useState<HTMLImageElement[]>([]);
  
  const frameCount1 = 102;
  const frameCount2 = 102;
  const frameCount3 = 102;
  
  const sequences = [seq1Images, seq2Images, seq3Images];
  const frameCounts = [frameCount1, frameCount2, frameCount3];
  
  const folds = Children.toArray(children);

  // Load images
  useEffect(() => {
    const loadedSeq1: HTMLImageElement[] = [];
    const loadedSeq2: HTMLImageElement[] = [];
    const loadedSeq3: HTMLImageElement[] = [];
    let loadedCount1 = 0;
    let loadedCount2 = 0;
    let loadedCount3 = 0;
    
    // Load Sequence 1
    for (let i = 0; i < frameCount1; i++) {
      const img = new window.Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/heroscroll/${paddedIndex}.webp?v=1`;
      img.onload = () => {
        loadedCount1++;
        if (i === 0) drawFrame([0]);
        if (loadedCount1 === frameCount1) setSeq1Images(loadedSeq1);
      };
      loadedSeq1.push(img);
    }

    // Load Sequence 2
    for (let i = 0; i < frameCount2; i++) {
      const img = new window.Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/scroll2/use_the_clouds_whirlwind_image-ezremove_${paddedIndex}.webp?v=1`;
      img.onload = () => {
        loadedCount2++;
        if (loadedCount2 === frameCount2) setSeq2Images(loadedSeq2);
      };
      loadedSeq2.push(img);
    }

    // Load Sequence 3
    for (let i = 0; i < frameCount3; i++) {
      const img = new window.Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/scroll3/use_the_baby_apparel_image_as-ezremove_${paddedIndex}.webp?v=1`;
      img.onload = () => {
        loadedCount3++;
        if (loadedCount3 === frameCount3) setSeq3Images(loadedSeq3);
      };
      loadedSeq3.push(img);
    }
  }, []);

  // Bulletproof viewport lock and global footer hider
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100vh";
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    
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
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
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
      if (frameIdx >= 0 && sequences[seqIdx] && sequences[seqIdx].length > 0) {
        const img = sequences[seqIdx][Math.round(frameIdx)];
        if (img) drawSingleImage(img, ctx, canvas);
      }
    });
  };

  // GSAP Observer Sequence (Zero Physical Scroll, Universal Parallax Folds)
  useEffect(() => {
    if (seq1Images.length !== frameCount1 || seq2Images.length !== frameCount2 || seq3Images.length !== frameCount3 || !containerRef.current) return;

    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      drawFrame([0]);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      const foldCount = folds.length;

      // INITIAL STATE SETUP
      if (foldCount > 0) {
        gsap.set(".fold-wrapper", { yPercent: (i) => i === 0 ? 0 : 100 });
        gsap.set(".fold-wrapper", { autoAlpha: (i) => i === 0 ? 1 : 0 }); 
      }

      // ---- HERO INTERNAL ANIMATIONS (Happens instantly on load / scroll 0) ----
      tl.to(".hero-title-word", { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.2, duration: 1, ease: "power2.out" })
      .to(".hero-subtitle", { opacity: 1, x: 0, duration: 1, ease: "power2.out" }, "-=0.5")
      .to(".hero-button", { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }, "-=0.5");

      // ---- CANVAS SEQUENCE 0 (Base layer) ----
      const frameTracker = [0, -1, -1]; // Tracks the current frame of each sequence
      
      const frameObj0 = { frame: 0 };
      tl.to(frameObj0, {
        frame: frameCounts[0] - 1,
        duration: 3,
        snap: "frame",
        ease: "none",
        onUpdate: () => {
           frameTracker[0] = frameObj0.frame;
           drawFrame(frameTracker);
        }
      });

      // ---- UNIVERSAL PARALLAX SLIDER ----
      // Loop over every subsequent fold and slide it up with a parallax effect
      for (let i = 1; i < foldCount; i++) {
        const transitionLabel = `transition-${i}`;
        const duration = 3; // Standardize duration
        
        // If there is a canvas sequence corresponding to this fold transition, play it!
        if (i < sequences.length) {
          const seqObj = { frame: 0 };
          tl.to(seqObj, {
            frame: frameCounts[i] - 1,
            duration: duration,
            snap: "frame",
            ease: "none",
            onUpdate: () => {
              // Ensure previous sequences are pinned at their last frame
              for(let j=0; j<i; j++) {
                 frameTracker[j] = frameCounts[j] - 1;
              }
              frameTracker[i] = seqObj.frame;
              drawFrame(frameTracker);
            }
          }, transitionLabel);
        }
        
        // Parallax Transition between Fold[i-1] and Fold[i]
        // Fold i-1 moves up slowly (depth effect) and fades out slightly
        tl.to(`.fold-${i - 1}`, { 
           yPercent: -50, 
           opacity: 0,  
           duration: duration,
           ease: "power2.inOut" 
        }, transitionLabel)
        // Fold i moves up quickly from the bottom
        .to(`.fold-${i}`, { 
           yPercent: 0, 
           autoAlpha: 1, 
           duration: duration,
           ease: "power2.inOut" 
        }, transitionLabel);
        
        // Specific internal animations for known folds
        if (i === 1) { // Wardrobe (Fold 2)
          tl.to(".wardrobe-title", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, `${transitionLabel}+=1.5`)
          .to(".wardrobe-subtitle", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, `${transitionLabel}+=1.5`)
          .to(".wardrobe-button", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, `${transitionLabel}+=1.5`);
        } else if (i === 2) { // Nourish (Fold 3)
          tl.to(".nourish-title", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, `${transitionLabel}+=1.5`)
          .to(".nourish-subtitle", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, `${transitionLabel}+=1.5`)
          .to(".nourish-button", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, `${transitionLabel}+=1.5`);
        }
        
        // Pause for user to read this fold before next scrub
        tl.to({}, { duration: 1.5 });
      }

      // ---- TRANSITION IN FOOTER OVERLAY ----
      tl.to("#global-footer", { 
        opacity: 1, 
        pointerEvents: "auto",
        duration: 1, 
        ease: "power2.inOut" 
      }, "footerIn");

      // --- OBSERVER: ZERO PHYSICAL SCROLL SCRUBBING ---
      let scrollProgress = 0;
      
      Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        tolerance: 10,
        preventDefault: true, 
        onChange: (self) => {
          const speedMultiplier = 0.0005; // Balanced speed for 3 folds
          scrollProgress += self.deltaY * speedMultiplier;
          scrollProgress = Math.max(0, Math.min(1, scrollProgress));
          
          gsap.to(tl, {
            progress: scrollProgress,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto"
          });
        }
      });

    }, containerRef);

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Basic redraw
        drawFrame([frameCount1 - 1, -1, -1]);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [seq1Images, seq2Images, seq3Images, folds.length]);

  return (
    <section ref={containerRef} style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", overflow: "hidden", backgroundColor: "#000" }}>
        
        {/* Fallback Image */}
        <div className={`absolute inset-0 z-0 transition-opacity duration-700 ${seq1Images.length === frameCount1 ? 'opacity-0' : 'opacity-100'}`}>
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
      </div>
    </section>
  );
}
