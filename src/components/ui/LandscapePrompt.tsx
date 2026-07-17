export default function LandscapePrompt() {
  return (
    <div className="landscape-prompt fixed inset-0 z-[99999] bg-[#111] flex-col items-center justify-center text-[#F9F6F0] p-8 text-center hidden pointer-events-auto">
      {/* 
         Targets touch devices in portrait mode.
         Desktop windows resized to portrait won't trigger this because hover:none + pointer:coarse targets mobile.
      */}
      <style dangerouslySetInnerHTML={{__html: `
        .landscape-prompt {
           display: none !important;
        }
        @media (hover: none) and (pointer: coarse) and (orientation: portrait) {
           .landscape-prompt {
              display: flex !important;
           }
        }
      `}} />
      
      <div className="mb-8 animate-pulse flex justify-center items-center">
         <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(-90deg)' }}>
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <path d="M12 18h.01"></path>
         </svg>
      </div>
      <h2 className="text-3xl font-light tracking-tighter mb-4 text-[#C67D53]">Rotate Device</h2>
      <p className="text-base text-[#F9F6F0]/70 max-w-[30ch]">
        This cinematic experience is designed exclusively for landscape viewing.
      </p>
    </div>
  );
}
