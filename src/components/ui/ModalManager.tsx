"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

type ModalType = "nursery" | "safety" | "contact" | null;

interface ModalManagerProps {
  activeModal: ModalType;
  onClose: () => void;
}

export default function ModalManager({ activeModal, onClose }: ModalManagerProps) {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const renderContent = () => {
    switch (activeModal) {
      case "nursery":
        return (
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-6">
            <span className="text-[#C67D53] text-sm uppercase tracking-[0.2em] font-medium mb-8">Exclusive Preview</span>
            <h2 className="text-5xl md:text-7xl font-light text-[#F9F6F0] tracking-tighter leading-none mb-6">
              The Nursery Collection.
            </h2>
            <p className="text-lg md:text-xl text-[#F9F6F0]/70 font-light max-w-lg mb-12">
              Curated essentials for the modern nursery. Arriving Winter 2026.
            </p>
            <div className="flex w-full max-w-md mx-auto border-b border-[#F9F6F0]/20 pb-2 focus-within:border-[#F9F6F0]/60 transition-colors">
              <input 
                type="email" 
                placeholder="Enter your email to be notified" 
                className="bg-transparent w-full outline-none text-[#F9F6F0] placeholder:text-[#F9F6F0]/30 font-light"
              />
              <button className="text-[#C67D53] uppercase text-xs tracking-widest font-medium hover:text-[#F9F6F0] transition-colors whitespace-nowrap ml-4">
                Notify Me
              </button>
            </div>
          </div>
        );
      case "safety":
        return (
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-6">
            <span className="text-[#C67D53] text-sm uppercase tracking-[0.2em] font-medium mb-8">Uncompromising Standard</span>
            <h2 className="text-5xl md:text-7xl font-light text-[#F9F6F0] tracking-tighter leading-none mb-6">
              Engineered for Safety.
            </h2>
            <p className="text-lg md:text-xl text-[#F9F6F0]/70 font-light max-w-lg mb-12">
              Every Bubhauz product undergoes rigorous independent testing to exceed global safety standards. Because nothing matters more.
            </p>
            <button className="border border-[#F9F6F0]/20 text-[#F9F6F0] px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#F9F6F0] hover:text-[#111] transition-all">
              Read Safety Report
            </button>
          </div>
        );
      case "contact":
        return (
          <div className="flex flex-col items-start text-left max-w-2xl mx-auto px-6 w-full">
            <h2 className="text-5xl md:text-7xl font-light text-[#F9F6F0] tracking-tighter leading-none mb-12">
              Let's talk.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="text-[#C67D53] text-xs uppercase tracking-widest font-medium mb-2">Visit Us</h3>
                  <p className="text-[#F9F6F0]/80 font-light leading-relaxed">
                    1/57, Old Double Storey<br/>
                    Lajpat Nagar IV<br/>
                    New Delhi
                  </p>
                </div>
                <div>
                  <h3 className="text-[#C67D53] text-xs uppercase tracking-widest font-medium mb-2">Call Us</h3>
                  <p className="text-[#F9F6F0]/80 font-light leading-relaxed">
                    +91 8368827681<br/>
                    +91 7838121294
                  </p>
                </div>
              </div>

              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="border-b border-[#F9F6F0]/20 pb-2 focus-within:border-[#F9F6F0]/60 transition-colors">
                  <input type="text" placeholder="Name" className="bg-transparent w-full outline-none text-[#F9F6F0] placeholder:text-[#F9F6F0]/30 font-light" />
                </div>
                <div className="border-b border-[#F9F6F0]/20 pb-2 focus-within:border-[#F9F6F0]/60 transition-colors">
                  <input type="email" placeholder="Email" className="bg-transparent w-full outline-none text-[#F9F6F0] placeholder:text-[#F9F6F0]/30 font-light" />
                </div>
                <div className="border-b border-[#F9F6F0]/20 pb-2 focus-within:border-[#F9F6F0]/60 transition-colors">
                  <textarea placeholder="Message" rows={3} className="bg-transparent w-full outline-none text-[#F9F6F0] placeholder:text-[#F9F6F0]/30 font-light resize-none" />
                </div>
                <button type="submit" className="text-[#C67D53] uppercase text-xs tracking-widest font-medium hover:text-[#F9F6F0] transition-colors self-start mt-2 border-b border-[#C67D53] hover:border-[#F9F6F0] pb-1">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-2xl p-4 md:p-12"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-10 md:right-10 text-[#F9F6F0]/50 hover:text-[#F9F6F0] transition-colors p-2 z-[160]"
          >
            <X size={32} strokeWidth={1} />
          </button>

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {renderContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
