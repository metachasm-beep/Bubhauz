import ScrollAnimator from "@/components/home/ScrollAnimator";
import MiniWardrobeOverlay from "@/components/home/MiniWardrobeOverlay";
import NourishOverlay from "@/components/home/NourishOverlay";

export default function Home() {
  return (
    <main className="home-page-no-footer w-full bg-black">
      <ScrollAnimator>
         <div className="empty-hero-overlay pointer-events-none" />
         <MiniWardrobeOverlay />
         <NourishOverlay />
      </ScrollAnimator>
    </main>
  );
}
