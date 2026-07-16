"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      return;
    }
    
    document.body.style.cursor = "none";
    // Also add a global style to ensure buttons/links don't show the hand cursor
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position off-screen
    gsap.set(cursor, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        autoAlpha: 1,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        gsap.to(cursor, {
          scale: 3,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.8)",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderColor: "rgba(255, 255, 255, 0.8)",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "";
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full border border-white bg-white pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
      }}
    />
  );
}
