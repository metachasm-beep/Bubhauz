export default function HeroOverlay() {
  return (
    <div className="absolute inset-0 w-full h-[100dvh] flex flex-col justify-end md:justify-center items-start text-left pl-6 pr-6 md:pl-[10vw] md:pr-[50vw] pb-[15vh] md:pb-0 pointer-events-none z-30">
      <div className="pointer-events-auto flex flex-col items-start gap-6">
        <h1 className="text-5xl md:text-[6vw] font-light text-white tracking-tighter leading-[1.1] drop-shadow-md flex flex-wrap gap-x-[1.5vw] gap-y-2">
          <span className="animate-up inline-block" style={{ opacity: 0, transform: 'translateY(24px)' }}>Welcome</span>
          <span className="animate-up inline-block" style={{ opacity: 0, transform: 'translateY(24px)' }}>to</span>
          <span className="animate-up inline-block font-medium" style={{ opacity: 0, transform: 'translateY(24px)' }}>Bubhauz.</span>
        </h1>
        <p className="animate-up text-lg md:text-xl text-white/90 max-w-[35ch] leading-relaxed drop-shadow-sm" style={{ opacity: 0, transform: 'translateY(24px)' }}>
          Gentle, safe, and beautifully crafted essentials for your little one's everyday adventures.
        </p>
      </div>
    </div>
  );
}
