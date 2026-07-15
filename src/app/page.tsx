import dynamic from 'next/dynamic';
import ScrollAnimator from "@/components/home/ScrollAnimator";
import HeroOverlay from "@/components/home/HeroOverlay";

// Lazy load the heavy lower-fold components so the Hero sequence renders instantly (Next.js Suspense Architecture)
const DynamicFeatureGrid = dynamic(() => import('@/components/home/FeatureGrid'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
       <div className="animate-pulse text-[var(--primary)] text-xl font-semibold">Loading experiences...</div>
    </div>
  ),
  ssr: false, // Forces client-side only rendering for heavy GSAP/Three.js components
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <ScrollAnimator>
         <HeroOverlay />
      </ScrollAnimator>
      
      <DynamicFeatureGrid />
    </main>
  );
}
