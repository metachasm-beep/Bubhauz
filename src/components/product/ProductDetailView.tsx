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
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-[#F9F6F0]/80 backdrop-blur-xl border-b border-black/5 px-6 py-4 flex items-center justify-between">
        <Link 
          href={`/category/${category}`}
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-medium text-[#111]/70 hover:text-[#C67D53] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to {category}
        </Link>
        <span className="text-xs uppercase tracking-[0.3em] font-light opacity-50 hidden md:block text-[#111]">
          Bubhauz // {category}
        </span>
      </header>

      {/* Editorial Split Layout */}
      <div className="flex flex-col md:flex-row min-h-screen">
        
        {/* Left: Image (Sticky on Desktop) */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 bg-[#EFEBE4] flex items-center justify-center p-4">
          <div className="relative w-full h-full">
            <Image 
              src={imageUrl} 
              alt={name}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 px-6 py-12 md:py-32 md:px-16 lg:px-24 flex flex-col justify-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter leading-tight mb-8 uppercase">
              {name}
            </h1>

            <div className="w-full h-px bg-black/10 mb-8" />

            <p className="text-lg leading-relaxed text-[#111]/70 font-light mb-12">
              {description}
            </p>

            {/* Enquire CTA */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 bg-[#111] text-[#F9F6F0] text-sm uppercase tracking-[0.2em] font-medium mb-16 hover:bg-[#C67D53] transition-colors"
            >
              Enquire Now
            </motion.button>

            {/* Accordions */}
            <div className="flex flex-col border-t border-black/10">

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
    </main>
  );
}
