import BlurText from '../react-bits/BlurText';
import SplashCursor from '../react-bits/SplashCursor';

export default function HeroOverlay() {
  return (
    <>
      <div className="fixed inset-0 z-50 pointer-events-none">
        <SplashCursor />
      </div>
      <div className="absolute top-0 left-0 w-full h-[100vh] flex items-center justify-center pointer-events-none z-30">
        <div className="text-center px-4 max-w-4xl mx-auto flex flex-col items-center pointer-events-auto mt-20">
          <div className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 animate-float drop-shadow-2xl flex gap-3 flex-wrap justify-center items-center">
            <BlurText text="Welcome to the" delay={50} className="inline-block drop-shadow-xl" />
            <span className="text-[var(--primary)] drop-shadow-xl"><BlurText text="Bubhauz" delay={150} className="inline-block" /></span>
            <BlurText text="Family" delay={200} className="inline-block drop-shadow-xl" />
          </div>
          <p className="text-lg md:text-2xl text-[var(--foreground)] mb-10 font-semibold max-w-2xl glass-card p-6">
            Gentle, safe, and beautifully crafted essentials for your little one's everyday adventures.
          </p>
          <button className="px-10 py-5 bg-[var(--primary)] text-white rounded-full text-xl font-bold hover:bg-[var(--primary-hover)] hover:-translate-y-1 transition-all duration-300 shadow-glass-colored">
            Explore Our Nursery Collection
          </button>
        </div>
      </div>
    </>
  );
}
