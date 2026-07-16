import ScrollAnimator from "@/components/home/ScrollAnimator";
import HeroOverlay from "@/components/home/HeroOverlay";
import MiniWardrobeOverlay from "@/components/home/MiniWardrobeOverlay";
import NourishOverlay from "@/components/home/NourishOverlay";

export default function Home() {
  return (
    <main className="home-page-no-footer w-full bg-black">
      <ScrollAnimator>
         <HeroOverlay />
         <MiniWardrobeOverlay />
         <NourishOverlay />
      </ScrollAnimator>
    </main>
  );
}
