"use client";

import Link from "next/link";
import { Home, Phone, ShoppingBag, ShieldCheck } from "lucide-react";
import { useState } from "react";
import ModalManager from "./ModalManager";

export default function SiteHeader() {
  const [activeModal, setActiveModal] = useState<"nursery" | "safety" | "contact" | null>(null);

  const navItems = [
    { icon: <Home size={18} />, label: "Home", type: "link", href: "/" },
    { icon: <ShoppingBag size={18} />, label: "Nursery", type: "modal", modalId: "nursery" },
    { icon: <ShieldCheck size={18} />, label: "Safety", type: "modal", modalId: "safety" },
    { icon: <Phone size={18} />, label: "Contact", type: "modal", modalId: "contact" },
  ];

  return (
    <>
      <ModalManager activeModal={activeModal} onClose={() => setActiveModal(null)} />
      
      <header className="fixed top-0 left-0 w-full h-10 md:h-16 z-[100] bg-black/40 backdrop-blur-lg border-b border-white/10 shadow-lg flex items-center justify-between px-3 md:px-12 transition-all duration-300">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/logo-vector.png" alt="Bubhauz Logo" className="h-5 md:h-10 w-auto drop-shadow-md invert opacity-90 hover:opacity-100 transition-opacity" />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-3 md:gap-10">
          {navItems.map((item, i) => {
            if (item.type === "link") {
              return (
                <Link 
                  key={i} 
                  href={item.href!}
                  className="flex items-center gap-1 md:gap-2 text-[#F9F6F0]/80 hover:text-[#F9F6F0] transition-colors text-[10px] md:text-sm font-medium"
                >
                  <span className="hidden md:inline-block">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            }
            return (
              <button 
                key={i} 
                onClick={() => setActiveModal(item.modalId as any)}
                className="flex items-center gap-1 md:gap-2 text-[#F9F6F0]/80 hover:text-[#F9F6F0] transition-colors text-[10px] md:text-sm font-medium cursor-pointer"
              >
                <span className="hidden md:inline-block">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </header>
    </>
  );
}
