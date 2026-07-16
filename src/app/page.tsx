import ScrollAnimator from "@/components/home/ScrollAnimator";
import HeroOverlay from "@/components/home/HeroOverlay";
import MiniWardrobeOverlay from "@/components/home/MiniWardrobeOverlay";

export default function Home() {
  return (
    <main className="home-page-no-footer fixed inset-0 w-full h-[100dvh] bg-black overflow-hidden pointer-events-auto">
      <ScrollAnimator>
         <HeroOverlay />
         <MiniWardrobeOverlay />
      </ScrollAnimator>
    </main>
  );
}
