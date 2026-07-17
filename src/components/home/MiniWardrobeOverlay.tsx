export default function MiniWardrobeOverlay() {
  return (
    <div className="wardrobe-overlay-container absolute top-0 left-0 w-full h-[100vh] flex items-end pb-40 md:items-center md:pb-0 justify-center pointer-events-none z-30">
      <div className="relative z-20 text-center px-6 md:px-12 py-8 md:py-12 max-w-5xl mx-4 md:mx-auto pointer-events-auto flex flex-col items-center glass-card">
        <h2 className="fold-title wardrobe-title text-6xl md:text-8xl lg:text-[7rem] font-bold text-white mb-6 drop-shadow-xl tracking-tight leading-none font-heading" style={{ opacity: 0, transform: 'translateY(60px)' }}>
          The Mini Wardrobe
        </h2>
        <p className="fold-subtitle wardrobe-subtitle text-xl md:text-3xl text-white max-w-3xl mx-auto drop-shadow-lg font-medium opacity-90 mb-10" style={{ opacity: 0, transform: 'translateY(60px)' }}>
          A collection designed for those little whirlwinds of joy.
        </p>
          </div>
        <div className="relative z-20 pointer-events-auto md:mt-10">
          <button className="fold-button wardrobe-button liquid-button px-10 py-5 bg-[var(--primary)] text-white rounded-full text-xl font-bold hover:bg-[var(--primary-hover)] transition-all duration-300 shadow-glass-colored" style={{ opacity: 0, transform: 'scale(0.8)' }}>
          Shop Collection
        </button>
      </div>
    </div>
  );
}
