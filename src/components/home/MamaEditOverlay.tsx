"use client";

export default function MamaEditOverlay() {
  return (
    <div className="absolute inset-0 w-full h-[100dvh] flex flex-col justify-end md:justify-center items-start text-left pl-6 pr-6 md:pl-[10vw] md:pr-[50vw] pb-[15vh] md:pb-0 pointer-events-none z-30">
      <div className="pointer-events-auto flex flex-col items-start gap-6">
        <h2 className="text-5xl md:text-[6vw] font-light text-[#F9F6F0] tracking-tighter leading-[1.1] drop-shadow-md">
          <span className="animate-up inline-block" style={{ opacity: 0, filter: 'blur(20px)' }}>The</span>{' '}
          <span className="animate-up inline-block text-[#C67D53]" style={{ opacity: 0, filter: 'blur(20px)' }}>Mama</span>{' '}
          <span className="animate-up inline-block font-medium" style={{ opacity: 0, filter: 'blur(20px)' }}>Edit.</span>
        </h2>
        <p className="animate-up text-lg md:text-xl text-[#F9F6F0]/90 max-w-[35ch] leading-relaxed drop-shadow-sm" style={{ opacity: 0, filter: 'blur(20px)' }}>
          Because you deserve premium care, too.
        </p>
        <div className="animate-up mt-4 flex items-center gap-6" style={{ opacity: 0, filter: 'blur(20px)' }}>
           <Link href="/category/mama" className="inline-block text-sm uppercase tracking-[0.2em] font-medium border-b border-[#F9F6F0]/30 pb-1 hover:border-[#F9F6F0] transition-colors cursor-pointer text-[#F9F6F0]">
             Shop Mama
           </Link>
           <button 
             onClick={() => window.dispatchEvent(new Event("toggle-footer"))}
             className="text-sm uppercase tracking-[0.2em] font-medium text-[#C67D53] hover:text-[#F9F6F0] transition-colors cursor-pointer"
           >
             Site Index +
           </button>
        </div>
      </div>
    </div>
  );
}
