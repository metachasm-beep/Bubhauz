"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSequence({ 
  scrollerRef,
  frameCount = 102,
  imagePrefix = "/scroll2/use_the_clouds_whirlwind_image-ezremove_",
  imageSuffix = ".webp"
}: { 
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
  frameCount?: number;
  imagePrefix?: string;
  imageSuffix?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    
    // Set internal canvas resolution
    canvas.width = 1000;
    canvas.height = 1000;
    
    const images: HTMLImageElement[] = [];
    const state = { frame: 0 };
    
    // Load images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      // format 000, 001, etc.
      const numStr = i.toString().padStart(3, '0');
      img.src = `${imagePrefix}${numStr}${imageSuffix}`;
      images.push(img);
    }
    
    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const img = images[state.frame];
      if (img && img.complete) {
        // Draw image covering the canvas
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio  = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width*ratio) / 2;
        const centerShift_y = (canvas.height - img.height*ratio) / 2;  
        context.drawImage(img, 0,0, img.width, img.height,
                           centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  
      }
    };
    
    // Initial render when first image loads
    images[0].onload = render;
    
    // Delay GSAP setup slightly to ensure scroller is mounted and ready
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: canvas,
          scroller: scrollerRef?.current || window,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          animation: gsap.to(state, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            onUpdate: render
          })
        });
      });
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timeout);
  }, [scrollerRef, frameCount, imagePrefix, imageSuffix]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full object-cover rounded-[2rem]"
    />
  );
}
