"use client";

import Link from "next/link";
import { Home, Phone, ShoppingBag, ShieldCheck } from "lucide-react";

export default function SiteHeader() {
  const navItems = [
    { icon: <Home size={18} />, label: "Home", href: "/" },
    { icon: <ShoppingBag size={18} />, label: "Nursery", href: "/quote?category=nursery" },
    { icon: <ShieldCheck size={18} />, label: "Safety", href: "/quote?category=safety" },
    { icon: <Phone size={18} />, label: "Contact", href: "/quote" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full h-16 z-[100] bg-black/40 backdrop-blur-lg border-b border-white/10 shadow-lg flex items-center justify-between px-6 md:px-12 transition-all duration-300">
      {/* Logo */}
      <Link href="/" className="flex flex-col">
        <span className="hidden md:block text-white text-xl font-bold tracking-widest uppercase">Bubhauz</span>
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-6 md:gap-10">
        {navItems.map((item, i) => (
          <Link 
            key={i} 
            href={item.href}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
          >
            <span className="hidden md:inline-block">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
