"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
        if (i === 0) drawFrame(0, loadedSeq1);
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

  const drawFrame = (index: number, imgArray: HTMLImageElement[]) => {
    if (!canvasRef.current || !imgArray[index]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = imgArray[index];
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // GSAP ScrollTrigger Sequence
  useEffect(() => {
    if (seq1Images.length !== frameCount1 || seq2Images.length !== frameCount2 || !containerRef.current) return;

    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      drawFrame(0, seq1Images);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1200%", // 12 full scrolls for both sequences + holds
          scrub: 1, 
          pin: true,
        }
      });

      // ---- FOLD 1: HERO ----
      // Phase 1: Text Reveal
      tl.to(".hero-title-word", { 
        opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.2, duration: 1, ease: "power2.out" 
      })
      .to(".hero-subtitle", { 
        opacity: 1, x: 0, duration: 1, ease: "power2.out" 
      }, "-=0.5")
      .to(".hero-button", { 
        opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" 
      }, "-=0.5");

      // Phase 2: Canvas Image Sequence 1
      const frameObj1 = { frame: 0 };
      tl.to(frameObj1, {
        frame: frameCount1 - 1,
        duration: 2.5,
        snap: "frame",
        ease: "none",
        onUpdate: () => drawFrame(frameObj1.frame, seq1Images)
      });

      // Phase 3: Transition out Hero & Switch to Seq 2 & Fade in Wardrobe text
      // Instant transition: Hero text fades out, Wardrobe text fades in, canvas swaps
      tl.to(".hero-overlay-container", { opacity: 0, duration: 0.5, ease: "power2.inOut" }, "transition")
      .set(canvasRef.current, { 
        onComplete: () => drawFrame(0, seq2Images),
        onReverseComplete: () => drawFrame(frameCount1 - 1, seq1Images)
      }, "transition")
      .to(".wardrobe-overlay-container", { opacity: 1, duration: 0.1 }, "transition")
      .to(".wardrobe-title", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "transition")
      .to(".wardrobe-subtitle", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "transition")
      .to(".wardrobe-button", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "transition");

      // Phase 6: Canvas Image Sequence 2
      const frameObj2 = { frame: 0 };
      tl.to(frameObj2, {
        frame: frameCount2 - 1,
        duration: 2.5,
        snap: "frame",
        ease: "none",
        onUpdate: () => drawFrame(frameObj2.frame, seq2Images)
      });

      // Phase 7: Hold for interaction (Fold 2)
      tl.to({}, { duration: 1 });

      // Phase 8: Transition out Wardrobe Fold (Pure fade)
      tl.to(canvasRef.current, { opacity: 0, duration: 1, ease: "power2.inOut" }, "transitionOut2")
      .to(".wardrobe-overlay-container", { opacity: 0, duration: 1, ease: "power2.inOut" }, "transitionOut2");

    }, containerRef);

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [seq1Images, seq2Images]);

  return (
    <section ref={containerRef} style={{ height: "100vh", position: "relative" }}>
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

        {/* Render overlays inside the pinned container */}
        {children}
      </div>
    </section>
  );
}
