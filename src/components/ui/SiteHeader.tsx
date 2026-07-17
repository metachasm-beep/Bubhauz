"use client";

import Link from "next/link";
import { Home, Phone, ShoppingBag, ShieldCheck } from "lucide-react";
import { useState } from "react";
import ModalManager from "./ModalManager";
import { motion } from "framer-motion";

export default function SiteHeader() {
  const [activeModal, setActiveModal] = useState<"nursery" | "safety" | "contact" | null>(null);

  const navItems = [
    { icon: <Home size={18} />, label: "Home", type: "link", href: "/" },
    { icon: <ShoppingBag size={18} />, label: "Nursery", type: "modal", modalId: "nursery" },
    { icon: <ShieldCheck size={18} />, label: "Safety", type: "modal", modalId: "safety" },
    { icon: <Phone size={18} />, label: "Contact", type: "modal", modalId: "contact" },
  ];

  const springTransition: any = { type: "spring", stiffness: 400, damping: 17 };

  return (
    <>
      <ModalManager activeModal={activeModal} onClose={() => setActiveModal(null)} />
      
      <header className="fixed top-0 left-0 w-full h-10 md:h-16 z-[100] bg-black/40 backdrop-blur-lg border-b border-white/10 shadow-lg flex items-center justify-between px-3 md:px-12 transition-all duration-300">
        {/* Logo */}
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={springTransition}
        >
          <Link href="/" className="flex items-center">
            <img src="/logo-vector.png" alt="Bubhauz Logo" className="h-5 md:h-10 w-auto drop-shadow-md invert opacity-90 transition-opacity" />
          </Link>
        </motion.div>

        {/* Navigation */}
        <nav className="flex items-center gap-3 md:gap-10">
          {navItems.map((item, i) => {
            if (item.type === "link") {
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -2, color: "#C67D53" }}
                  whileTap={{ scale: 0.95 }}
                  transition={springTransition}
                  className="text-[#F9F6F0]/80"
                >
                  <Link 
                    href={item.href!}
                    className="flex items-center gap-1 md:gap-2 text-inherit text-[10px] md:text-sm font-medium"
                  >
                    <span className="hidden md:inline-block">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              );
            }
            return (
              <motion.button 
                key={i} 
                onClick={() => setActiveModal(item.modalId as any)}
                whileHover={{ y: -2, color: "#C67D53" }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
                className="flex items-center gap-1 md:gap-2 text-[#F9F6F0]/80 text-[10px] md:text-sm font-medium cursor-pointer"
              >
                <span className="hidden md:inline-block">{item.icon}</span>
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </header>
    </>
  );
}
