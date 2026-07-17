export default function SleepOverlay() {
  return (
    <div className="absolute inset-0 w-full h-[100dvh] flex flex-col justify-end md:justify-center items-start text-left pl-6 pr-6 md:pl-[10vw] md:pr-[50vw] pb-[15vh] md:pb-0 pointer-events-none z-30">
      <div className="pointer-events-auto flex flex-col items-start gap-6">
        <h2 className="text-5xl md:text-[6vw] font-light text-white tracking-tighter leading-[1.1] drop-shadow-md">
          <span className="animate-up inline-block" style={{ opacity: 0, transform: 'translateY(24px)' }}>Sleep</span>{' '}
          <span className="animate-up inline-block" style={{ opacity: 0, transform: 'translateY(24px)' }}>&amp;</span>{' '}
          <span className="animate-up inline-block font-medium" style={{ opacity: 0, transform: 'translateY(24px)' }}>Nursery.</span>
        </h2>
        <p className="animate-up text-lg md:text-xl text-white/90 max-w-[35ch] leading-relaxed drop-shadow-sm" style={{ opacity: 0, transform: 'translateY(24px)' }}>
          Cozy, safe, and dreamy essentials for peaceful nights.
        </p>
        <div className="animate-up mt-4" style={{ opacity: 0, transform: 'translateY(24px)' }}>
           <button className="text-sm uppercase tracking-[0.2em] font-medium border-b border-white/30 pb-1 hover:border-white transition-colors cursor-pointer text-white">
             Shop Nursery
           </button>
        </div>
      </div>
    </div>
  );
}
