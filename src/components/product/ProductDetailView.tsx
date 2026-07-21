"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProductById } from "@/data/products";

interface ProductDetailViewProps {
  id: string;
}

export default function ProductDetailView({ id }: ProductDetailViewProps) {
  const router = useRouter();
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const product = getProductById(id);

  const toggleAccordion = (val: string) => {
    setActiveAccordion(prev => prev === val ? null : val);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F6F0]">
        <h1 className="text-2xl font-light">Product not found.</h1>
      </div>
    );
  }

  const { category, name, price, imageUrl, description, materials, shipping } = product;

  return (
    <main className="min-h-[100dvh] bg-[#F9F6F0] text-[#111] selection:bg-[#C67D53] selection:text-[#F9F6F0]">
      
      {/* Sleek Floating Back Button */}
      <Link 
        href={`/category/${category}`}
        className="fixed top-6 left-4 md:top-10 md:left-10 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/20 shadow-sm text-[#111]/70 hover:text-[#C67D53] hover:bg-white/60 transition-all"
        aria-label={`Back to ${category}`}
      >
        <ArrowLeft size={18} />
      </Link>

      {/* Editorial Split Layout */}
      <div className="flex flex-col md:flex-row min-h-screen">
        
        {/* Left: Image (Sticky on Desktop, Edge-to-Edge on Mobile) */}
        <div className="w-full md:w-1/2 h-[65vh] md:h-screen sticky top-0 bg-[#EFEBE4] flex items-center justify-center pt-8 md:pt-0">
          <div className="relative w-full h-full">
            <Image 
              src={imageUrl} 
              alt={name}
              fill
              className="object-contain md:p-8"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Right: Details (Bottom Sheet Aesthetic on Mobile) */}
        <div className="w-full md:w-1/2 px-6 pt-10 pb-32 md:py-32 md:px-16 lg:px-24 flex flex-col justify-center bg-[#F9F6F0] rounded-t-[40px] md:rounded-none -mt-12 md:mt-0 relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] md:shadow-none">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Mobile Sheet Drag Indicator */}
            <div className="w-12 h-1.5 bg-black/10 rounded-full mx-auto mb-8 md:hidden" />

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter leading-tight mb-8 uppercase text-center md:text-left">
              {name}
            </h1>

            <div className="w-full h-px bg-black/10 mb-8 hidden md:block" />

            <p className="text-lg leading-relaxed text-[#111]/70 font-light mb-12 text-center md:text-left">
              {description}
            </p>

            {/* Desktop Enquire CTA (Hidden on Mobile) */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden md:block w-full py-5 bg-[#111] text-[#F9F6F0] text-sm uppercase tracking-[0.2em] font-medium mb-16 hover:bg-[#C67D53] transition-colors rounded-full"
            >
              Enquire Now
            </motion.button>

            {/* Accordions */}
            <div className="flex flex-col border-t border-black/10 mt-8 md:mt-0">

              {/* Material & Care */}
              <div className="border-b border-black/10">
                <button 
                  onClick={() => toggleAccordion('care')}
                  className="w-full py-6 flex items-center justify-between text-left text-sm uppercase tracking-widest font-medium"
                >
                  Material & Care
                  <motion.div animate={{ rotate: activeAccordion === 'care' ? 180 : 0 }}>
                    <ChevronDown size={16} className="text-[#111]/50" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeAccordion === 'care' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[#111]/70 font-light leading-relaxed">
                        {materials}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shipping & Returns */}
              <div className="border-b border-black/10">
                <button 
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full py-6 flex items-center justify-between text-left text-sm uppercase tracking-widest font-medium"
                >
                  Shipping & Returns
                  <motion.div animate={{ rotate: activeAccordion === 'shipping' ? 180 : 0 }}>
                    <ChevronDown size={16} className="text-[#111]/50" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeAccordion === 'shipping' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[#111]/70 font-light leading-relaxed">
                        {shipping}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#F9F6F0]/90 backdrop-blur-lg border-t border-black/5 md:hidden">
        <button className="w-full py-4 bg-[#111] text-[#F9F6F0] text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#C67D53] transition-colors rounded-full shadow-lg">
          Enquire Now
        </button>
      </div>

    </main>
  );
}
