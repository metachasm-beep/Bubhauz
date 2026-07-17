"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function SiteFooter() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('toggle-footer', handleToggle);
    return () => window.removeEventListener('toggle-footer', handleToggle);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] cursor-pointer"
          />

          {/* Drawer */}
          <motion.footer 
            id="global-footer"
            initial={{ y: "100%", filter: "blur(10px)" }}
            animate={{ y: "0%", filter: "blur(0px)" }}
            exit={{ y: "100%", filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 w-full bg-[#111]/90 backdrop-blur-xl border-t border-[#F9F6F0]/10 text-[#F9F6F0] py-8 px-6 z-[210] shadow-2xl rounded-t-3xl"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-6 md:top-6 md:right-8 text-[#F9F6F0]/50 hover:text-[#C67D53] transition-colors p-2"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-[#F9F6F0]/70 gap-8">
              
              {/* Brand & Copyright */}
              <div className="flex flex-col gap-2">
                <span className="font-light text-[#C67D53] text-lg tracking-widest uppercase">BUBHAUZ</span>
                <span className="font-light text-xs opacity-70">&copy; {new Date().getFullYear()} All Rights Reserved.</span>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-6 md:gap-8 font-light text-xs tracking-wide uppercase">
                <Link href="/legal/privacy" className="hover:text-[#C67D53] transition-colors">Privacy</Link>
                <Link href="/legal/terms" className="hover:text-[#C67D53] transition-colors">Terms</Link>
                <Link href="/legal/refund" className="hover:text-[#C67D53] transition-colors">Refunds</Link>
                <Link href="/legal/shipping" className="hover:text-[#C67D53] transition-colors">Shipping</Link>
              </div>

              {/* Grievance & Office */}
              <div className="flex flex-col gap-2 text-xs font-light tracking-wide md:text-right">
                <span className="opacity-90">1/57, Old Double Storey, Lajpat Nagar IV, New Delhi</span>
                <span className="opacity-90">+91 8368827681, +91 7838121294</span>
                <a href="https://instagram.com/bubhauz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#C67D53] transition-colors md:justify-end mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  @bubhauz
                </a>
              </div>

            </div>
          </motion.footer>
        </>
      )}
    </AnimatePresence>
  );
}
