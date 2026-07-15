import ScrollSequence from "@/components/ScrollSequence";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section (Fold 1) */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_bg.png" 
            alt="Bubhauz Hero" 
            fill 
            className="object-cover"
            priority 
          />
          {/* Subtle overlay for better text contrast */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-light text-[#2a2a2a] tracking-tight mb-6" style={{ textShadow: "0px 4px 20px rgba(255,255,255,0.8)" }}>
            Welcome to <span className="font-semibold text-[#1a1a1a]">Bubhauz</span>
          </h1>
          <p className="text-lg md:text-2xl text-[#4a4a4a] mb-8 font-light max-w-2xl" style={{ textShadow: "0px 2px 10px rgba(255,255,255,0.8)" }}>
            Where premium design meets the safety and comfort your baby deserves. 
            Discover the next generation of nursery essentials.
          </p>
          <button className="px-8 py-4 bg-[#2a2a2a] text-white rounded-full text-lg hover:bg-black transition-colors duration-300 shadow-xl">
            Explore the Collection
          </button>
        </div>
      </section>

      {/* Scroll Sequence (Fold 2) */}
      <ScrollSequence />
      
      {/* Additional content to allow scrolling past the sequence */}
      <section className="h-screen flex items-center justify-center bg-[#f9f9f9]">
         <div className="text-center">
            <h2 className="text-4xl font-light mb-4 text-[#2a2a2a]">Discover More</h2>
            <p className="text-[#555]">Explore our extensive catalogue below.</p>
         </div>
      </section>
    </main>
  );
}
