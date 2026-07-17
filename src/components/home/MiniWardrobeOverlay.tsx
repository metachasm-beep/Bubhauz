export default function MiniWardrobeOverlay() {
  return (
    <div className="wardrobe-overlay-container absolute top-0 left-0 w-full h-[100vh] flex items-end pb-40 md:items-center md:pb-0 justify-center pointer-events-none z-30">
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto pointer-events-auto flex flex-col items-center">
        <h2 className="fold-title wardrobe-title text-4xl md:text-7xl lg:text-[7rem] font-bold text-white mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] tracking-tight leading-none font-heading" style={{ opacity: 0, transform: 'translateY(60px)', filter: 'blur(10px)' }}>
          The Mini Wardrobe
        </h2>
        <p className="fold-subtitle wardrobe-subtitle text-base md:text-2xl text-white max-w-3xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] font-medium opacity-90 mb-10" style={{ opacity: 0, transform: 'translateY(60px)', filter: 'blur(10px)' }}>
          A collection designed for those little whirlwinds of joy.
        </p>
        <button className="fold-button wardrobe-button liquid-button px-10 py-5 bg-[var(--primary)] text-white rounded-full text-xl font-bold hover:bg-[var(--primary-hover)] transition-all duration-300 shadow-glass-colored" style={{ opacity: 0, transform: 'scale(0.8)', filter: 'blur(10px)' }}>
          Shop Collection
        </button>
      </div>
    </div>
  );
}
