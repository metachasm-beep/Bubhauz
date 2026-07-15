"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 102; // 000.webp to 101.webp

  useEffect(() => {
    // Preload images
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/heroscroll/${paddedIndex}.webp`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          // Draw first frame immediately
          drawFrame(0, loadedImages);
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
    
    // Maintain aspect ratio and cover canvas
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

  useEffect(() => {
    if (images.length === 0) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (top > 0) {
        drawFrame(0, images);
        return;
      }

      const scrollRange = height - windowHeight;
      const scrollPosition = -top;
      
      let progress = scrollPosition / scrollRange;
      progress = Math.max(0, Math.min(1, progress));
      
      const frameIndex = Math.floor(progress * (frameCount - 1));
      drawFrame(frameIndex, images);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        handleScroll(); // redraw based on new size
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [images]);

  return (
    <section ref={containerRef} style={{ height: "300vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", backgroundColor: "#f9f9f9" }}>
        <canvas 
          ref={canvasRef} 
          style={{ width: "100%", height: "100%", display: "block" }}
        />
        {/* Overlay typography matching a premium baby brand */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#111", pointerEvents: "none" }}>
            <h2 style={{ fontSize: "clamp(3rem, 5vw, 6rem)", fontWeight: "300", letterSpacing: "-0.04em", margin: 0, textShadow: "0px 4px 32px rgba(255,255,255,0.9)" }}>
              Pure Comfort
            </h2>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", fontWeight: "400", color: "#444", marginTop: "1rem" }}>
              Engineered for your baby's safety.
            </p>
        </div>
      </div>
    </section>
  );
}
