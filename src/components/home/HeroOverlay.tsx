import SplashCursor from '../react-bits/SplashCursor';

export default function HeroOverlay() {
  return (
    <>
      <div className="fixed inset-0 z-50 pointer-events-none">
        <SplashCursor />
      </div>
      <div className="hero-overlay-container absolute top-0 left-0 w-full h-[100vh] flex items-center justify-center pointer-events-none z-30">
        <div className="text-center px-4 max-w-4xl mx-auto flex flex-col items-center pointer-events-auto mt-20">
          <div className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 animate-float drop-shadow-2xl flex gap-3 flex-wrap justify-center items-center">
            <span className="hero-title-word inline-block drop-shadow-xl" style={{ opacity: 0, filter: 'blur(10px)', transform: 'translateY(30px)' }}>Welcome to the</span>
            <span className="hero-title-word text-[var(--primary)] drop-shadow-xl inline-block" style={{ opacity: 0, filter: 'blur(10px)', transform: 'translateY(30px)' }}>Bubhauz</span>
            <span className="hero-title-word inline-block drop-shadow-xl" style={{ opacity: 0, filter: 'blur(10px)', transform: 'translateY(30px)' }}>Family</span>
          </div>
          <p className="hero-subtitle text-lg md:text-2xl text-[var(--foreground)] mb-10 font-semibold max-w-2xl glass-card p-6" style={{ opacity: 0, transform: 'translateX(-40px)' }}>
            Gentle, safe, and beautifully crafted essentials for your little one's everyday adventures.
          </p>
          <button className="hero-button px-10 py-5 bg-[var(--primary)] text-white rounded-full text-xl font-bold hover:bg-[var(--primary-hover)] transition-all duration-300 shadow-glass-colored" style={{ opacity: 0, transform: 'scale(0.8)' }}>
            Explore Our Nursery Collection
          </button>
        </div>
      </div>
    </>
  );
}
