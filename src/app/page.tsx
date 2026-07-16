import ScrollAnimator from "@/components/home/ScrollAnimator";
import HeroOverlay from "@/components/home/HeroOverlay";
import MiniWardrobeOverlay from "@/components/home/MiniWardrobeOverlay";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <ScrollAnimator>
         <HeroOverlay />
         <MiniWardrobeOverlay />
      </ScrollAnimator>
    </main>
  );
}
