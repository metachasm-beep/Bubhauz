"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductDetailViewProps {
  id: string;
}

export default function ProductDetailView({ id }: ProductDetailViewProps) {
  const router = useRouter();
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  // Parse ID to generate deterministic mock data
  // id looks like "wardrobe-1" or "nourish-2"
  const [category, numberStr] = id.split('-');
  const index = parseInt(numberStr) || 1;
  const seedId = category.charCodeAt(0) * index * 10;
  
  const title = `Premium ${category.charAt(0).toUpperCase() + category.slice(1)} Item 0${index}`;
  const price = `₹${(index * 10 + 20) * 100}`;
  const imageUrl = `https://picsum.photos/seed/${seedId}/1200/1600`;

  const toggleAccordion = (val: string) => {
    setActiveAccordion(prev => prev === val ? null : val);
  };

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
        <div className="w-full md:w-1/2 h-[70vh] md:h-screen sticky top-0 bg-[#EFEBE4]">
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 px-6 py-12 md:py-32 md:px-16 lg:px-24 flex flex-col justify-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter leading-tight mb-4 uppercase">
              {title}
            </h1>
            <p className="text-2xl text-[#C67D53] font-light mb-8">
              {price}
            </p>

            <div className="w-full h-px bg-black/10 mb-8" />

            <p className="text-lg leading-relaxed text-[#111]/70 font-light mb-12">
              Engineered with the finest materials and rigorously tested to exceed global safety standards. 
              Because your little one deserves nothing less than absolute perfection.
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
              {/* Product Details */}
              <div className="border-b border-black/10">
                <button 
                  onClick={() => toggleAccordion('details')}
                  className="w-full py-6 flex items-center justify-between text-left text-sm uppercase tracking-widest font-medium"
                >
                  Product Details
                  <motion.div animate={{ rotate: activeAccordion === 'details' ? 180 : 0 }}>
                    <ChevronDown size={16} className="text-[#111]/50" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeAccordion === 'details' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[#111]/70 font-light leading-relaxed">
                        Dimensions: 12" x 18" x 4" <br/>
                        Weight: 1.2 kg <br/>
                        Suitable for ages 0+ months.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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
                        100% Organic GOTS Certified Cotton. <br/>
                        Machine wash cold, tumble dry low. Do not bleach.
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
                        Complimentary shipping on orders above ₹5000. <br/>
                        14-day hassle-free return policy.
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
