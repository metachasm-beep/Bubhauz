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
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 102; // 000.webp to 101.webp

  // Load images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/heroscroll/${paddedIndex}.webp`;
      
      img.onload = () => {
        loadedCount++;
        if (i === 0) {
          drawFrame(0, loadedImages);
        }
        if (loadedCount === frameCount) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
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
    if (images.length !== frameCount || !containerRef.current) return;

    // Ensure canvas size is set
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      drawFrame(0, images);
    }

    const ctx = gsap.context(() => {
      // Create master timeline pinned to the container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // 4 full scrolls
          scrub: 1, // Smooth scrub
          pin: true,
        }
      });

      // Phase 1: Text Reveal (Scroll 1)
      tl.to(".hero-title-word", { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)", 
        stagger: 0.2, 
        duration: 1,
        ease: "power2.out"
      })
      .to(".hero-subtitle", { 
        opacity: 1, 
        x: 0, 
        duration: 1,
        ease: "power2.out"
      }, "-=0.5")
      .to(".hero-button", { 
        opacity: 1, 
        scale: 1, 
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.5");

      // Phase 2 & 3: Canvas Image Sequence (Scrolls 2 & 3)
      const frameObj = { frame: 0 };
      tl.to(frameObj, {
        frame: frameCount - 1,
        duration: 2, // Take up 2 "scrolls" of duration
        snap: "frame",
        ease: "none",
        onUpdate: () => drawFrame(frameObj.frame, images)
      });

      // Phase 4: Tunnel Parallax Transition (Scroll 4)
      tl.to(canvasRef.current, { 
        scale: 10, 
        opacity: 0, 
        duration: 1, 
        ease: "power3.in" 
      }, "+=0.1")
      .to(".hero-overlay-container", {
        scale: 5,
        opacity: 0,
        duration: 1,
        ease: "power3.in"
      }, "<");

    }, containerRef);

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Re-draw current frame (approximate by reading timeline progress if possible, 
        // but simple redraw of frame 0 is a fallback)
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [images]);

  return (
    <section ref={containerRef} style={{ height: "100vh", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", overflow: "hidden", backgroundColor: "#000" }}>
        {/* Fallback Image */}
        <div className={`absolute inset-0 z-0 transition-opacity duration-700 ${images.length === frameCount ? 'opacity-0' : 'opacity-100'}`}>
            <Image src="/heroscroll/000.webp" alt="Hero Background" fill className="object-cover" priority />
        </div>
        
        <canvas 
          ref={canvasRef} 
          className="relative z-10"
          style={{ width: "100%", height: "100%", display: "block", transformOrigin: "center center" }}
        />
        
        {/* Render children inside the pinned container */}
        {children}
      </div>
    </section>
  );
}
