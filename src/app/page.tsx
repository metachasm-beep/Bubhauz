import ScrollAnimator from "@/components/home/ScrollAnimator";
import HeroOverlay from "@/components/home/HeroOverlay";
import MiniWardrobeOverlay from "@/components/home/MiniWardrobeOverlay";
import NourishOverlay from "@/components/home/NourishOverlay";
import SleepOverlay from "@/components/home/SleepOverlay";
import PlayOverlay from "@/components/home/PlayOverlay";
import MamaEditOverlay from "@/components/home/MamaEditOverlay";
import ProgressNav from "@/components/ui/ProgressNav";

export default function Home() {
  return (
    <main className="home-page-no-footer w-full bg-black">
      <ProgressNav />
      <ScrollAnimator>
         <HeroOverlay />
         <div className="blank-overlay w-full h-[100vh] pointer-events-none" />
         <MiniWardrobeOverlay />
         <NourishOverlay />
         <SleepOverlay />
         <PlayOverlay />
         <MamaEditOverlay />
      </ScrollAnimator>
    </main>
  );
}
