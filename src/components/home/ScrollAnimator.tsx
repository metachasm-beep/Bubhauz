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
  const frameCount1 = 102; // 000.webp to 101.webp
  const frameCount2 = 102; // 000.webp to 101.webp
  
  const folds = Children.toArray(children);

  // Load images
  useEffect(() => {
    const loadedSeq1: HTMLImageElement[] = [];
    const loadedSeq2: HTMLImageElement[] = [];
    let loadedCount1 = 0;
    let loadedCount2 = 0;
    
    // Load Sequence 1
    for (let i = 0; i < frameCount1; i++) {
      const img = new window.Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/heroscroll/${paddedIndex}.webp`;
      img.onload = () => {
        loadedCount1++;
        if (i === 0) drawFrame(0, -1, loadedSeq1, []);
        if (loadedCount1 === frameCount1) setSeq1Images(loadedSeq1);
      };
      loadedSeq1.push(img);
    }

    // Load Sequence 2
    for (let i = 0; i < frameCount2; i++) {
      const img = new window.Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/scroll2/use_the_clouds_whirlwind_image-ezremove_${paddedIndex}.webp`;
      img.onload = () => {
        loadedCount2++;
        if (loadedCount2 === frameCount2) setSeq2Images(loadedSeq2);
      };
      loadedSeq2.push(img);
    }
  }, []);

  // Bulletproof viewport lock and global footer hider
  useEffect(() => {
    // 1. Force zero physical scroll via JS styles on mount
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100vh";
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    
    // 2. Hide the physical layout footer if it exists
    const globalFooter = document.getElementById("global-footer");
    if (globalFooter) {
      globalFooter.style.display = "none";
    }

    // Cleanup on unmount (if they navigate away from home)
    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
      if (globalFooter) {
        globalFooter.style.display = "";
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
    
    // Fill screen (object-fit: cover)
    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const drawFrame = (seq1Index: number, seq2Index: number, imgs1 = seq1Images, imgs2 = seq2Images) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Sequence 1
    const img1 = imgs1[Math.round(seq1Index)];
    if (img1) drawSingleImage(img1, ctx, canvas);
    
    // Draw Sequence 2 over Sequence 1 if it has started
    if (seq2Index >= 0) {
      const img2 = imgs2[Math.round(seq2Index)];
      if (img2) drawSingleImage(img2, ctx, canvas);
    }
  };

  // GSAP Observer Sequence (Zero Physical Scroll, Universal Parallax Folds)
  useEffect(() => {
    if (seq1Images.length !== frameCount1 || seq2Images.length !== frameCount2 || !containerRef.current) return;

    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      drawFrame(0, -1);
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

      // ---- HERO CANVAS ANIMATION ----
      const frameObj1 = { frame: 0 };
      tl.to(frameObj1, {
        frame: frameCount1 - 1,
        duration: 3,
        snap: "frame",
        ease: "none",
        onUpdate: () => drawFrame(frameObj1.frame, -1)
      });

      // ---- UNIVERSAL PARALLAX SLIDER ----
      // Loop over every subsequent fold and slide it up with a parallax effect
      for (let i = 1; i < foldCount; i++) {
        const transitionLabel = `transition-${i}`;
        
        // If it's the very first fold transition, we also want the second canvas sequence to play!
        if (i === 1) {
          const frameObj2 = { frame: 0 };
          tl.to(frameObj2, {
            frame: frameCount2 - 1,
            duration: 3,
            snap: "frame",
            ease: "none",
            onUpdate: () => drawFrame(frameCount1 - 1, frameObj2.frame) 
          }, transitionLabel);
        }
        
        // Parallax Transition between Fold[i-1] and Fold[i]
        // Fold i-1 moves up slowly (depth effect) and fades out slightly
        tl.to(`.fold-${i - 1}`, { 
           yPercent: -50, 
           opacity: 0,  
           duration: i === 1 ? 3 : 2, // Match canvas duration for first transition
           ease: "power2.inOut" 
        }, transitionLabel)
        // Fold i moves up quickly from the bottom
        .to(`.fold-${i}`, { 
           yPercent: 0, 
           autoAlpha: 1, 
           duration: i === 1 ? 3 : 2, 
           ease: "power2.inOut" 
        }, transitionLabel);
        
        // Specific internal animations for Wardrobe (Fold 1)
        if (i === 1) {
          // Play these right as the transition finishes
          tl.to(".wardrobe-title", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, `${transitionLabel}+=1.5`)
          .to(".wardrobe-subtitle", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, `${transitionLabel}+=1.5`)
          .to(".wardrobe-button", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, `${transitionLabel}+=1.5`);
        }
        
        // Pause for user to read this fold before next scrub
        tl.to({}, { duration: 1.5 });
      }

      // ---- TRANSITION IN FOOTER OVERLAY ----
      tl.to(".footer-overlay-container", { 
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
        wheelSpeed: -1,
        tolerance: 10,
        preventDefault: true, // Absolutely prevents any physical scrolling
        onChange: (self) => {
          const speedMultiplier = 0.0003; 
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
        // Redraw current frame
        drawFrame(
           seq1Images.length === frameCount1 ? frameCount1 - 1 : 0, 
           -1 // Simplified resize logic for now
        );
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [seq1Images, seq2Images, folds.length]);

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

        {/* Footer Overlay */}
        <div className="footer-overlay-container absolute bottom-0 left-0 w-full z-40 pointer-events-none" style={{ opacity: 0 }}>
          <SiteFooter />
        </div>
      </div>
    </section>
  );
}
