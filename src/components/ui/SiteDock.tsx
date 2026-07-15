"use client";

import Dock from "@/components/react-bits/Dock";
import { Home, Phone, ShoppingBag, ShieldCheck } from "lucide-react";

export default function SiteDock() {
  const dockItems = [
    { icon: <Home size={24} color="white" />, label: "Home", onClick: () => window.location.href="/" },
    { icon: <ShoppingBag size={24} color="white" />, label: "Nursery", onClick: () => window.location.href="/quote?category=nursery" },
    { icon: <ShieldCheck size={24} color="white" />, label: "Safety", onClick: () => window.location.href="/quote?category=safety" },
    { icon: <Phone size={24} color="white" />, label: "Contact", onClick: () => window.location.href="/quote" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
      <Dock items={dockItems} />
    </div>
  );
}
