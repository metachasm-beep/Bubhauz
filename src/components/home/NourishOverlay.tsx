export default function NourishOverlay() {
  return (
    <div className="nourish-overlay-container absolute top-0 left-0 w-full h-[100vh] flex items-center justify-center pointer-events-none z-30">
      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto pointer-events-auto">
        <h2 className="nourish-title text-6xl md:text-8xl lg:text-[7rem] font-bold text-white mb-6 drop-shadow-xl tracking-tight leading-none" style={{ opacity: 0, transform: 'translateY(60px)' }}>
          Nourish and Nurture
        </h2>
        <p className="nourish-subtitle text-xl md:text-3xl text-white max-w-3xl mx-auto drop-shadow-lg font-medium opacity-90 mb-10" style={{ opacity: 0, transform: 'translateY(60px)' }}>
          Everything your baby needs for a healthy, happy start.
        </p>
        <button className="nourish-button px-10 py-5 bg-[var(--primary)] text-white rounded-full text-xl font-bold hover:bg-[var(--primary-hover)] transition-all duration-300 shadow-glass-colored" style={{ opacity: 0, transform: 'scale(0.8)' }}>
          Shop Feeding Essentials
        </button>
      </div>
    </div>
  );
}
