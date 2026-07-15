import ScrollAnimator from "@/components/home/ScrollAnimator";
import HeroOverlay from "@/components/home/HeroOverlay";
import FeatureGrid from "@/components/home/FeatureGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <ScrollAnimator>
         <HeroOverlay />
      </ScrollAnimator>
      
      <FeatureGrid />
    </main>
  );
}
