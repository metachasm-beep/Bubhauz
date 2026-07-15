"use client";

import { useState, useRef, MouseEvent } from 'react';

export default function ProductLens() {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // The placeholder image used for both base and zoomed view
  // In a real app, the zoomed image could be a higher resolution asset of the microscopic weave.
  const imageUrl = "https://images.unsplash.com/photo-1596525624796-03c03565e386?q=80&w=2000&auto=format&fit=crop";

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate cursor position relative to the container
    const x = e.clientX - left;
    const y = e.clientY - top;

    setPosition({ x, y });
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-20 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[var(--primary)] mb-4">Microscopic Safety</h2>
        <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
          Hover over our GOTS-certified organic cotton swaddle to inspect the breathable weave and non-toxic dyes on a microscopic level. We have nothing to hide.
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl cursor-crosshair border-4 border-white/50"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Base Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        
        {/* Subtle overlay text on the base image */}
        <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg">
          <span className="font-bold text-[var(--primary)] uppercase tracking-wider text-sm">GOTS Certified Organic</span>
        </div>

        {/* The Lens (Magnifying Glass) */}
        <div 
          className={`absolute pointer-events-none transition-opacity duration-300 rounded-full border-4 border-white shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center`}
          style={{
            opacity: isHovering ? 1 : 0,
            width: '250px',
            height: '250px',
            left: `${position.x - 125}px`,
            top: `${position.y - 125}px`,
            // Background is the same image but scaled up. We shift background position inversely to the cursor.
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: 'no-repeat',
            // Scale factor. 2000px is roughly the width of the image. 
            // By setting background size very large, we zoom in.
            backgroundSize: '250%', 
            // Calculate exact background position to center the hovered area inside the lens
            backgroundPosition: `${(position.x / (containerRef.current?.offsetWidth || 1)) * 100}% ${(position.y / (containerRef.current?.offsetHeight || 1)) * 100}%`
          }}
        >
          {/* Magnified UI Overlay inside the lens */}
          <div className="absolute bottom-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-md">
             <span className="text-white text-xs font-mono font-bold tracking-widest">10x MAGNIFICATION</span>
          </div>
          {/* Center reticle */}
          <div className="w-2 h-2 bg-[var(--primary)] rounded-full shadow-md"></div>
        </div>
      </div>
    </div>
  );
}
