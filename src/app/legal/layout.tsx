import Link from "next/link";
import { X } from "lucide-react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[var(--background)] pt-32 pb-24 px-4 relative z-10">
      <div className="max-w-4xl mx-auto glass-card p-8 md:p-16 border border-white/40 relative">
        <Link 
          href="/" 
          className="absolute top-6 right-6 md:top-8 md:right-8 text-[var(--foreground)] hover:text-[#C67D53] transition-colors p-2 bg-white/40 hover:bg-white/80 rounded-full backdrop-blur-md"
        >
          <X className="w-6 h-6" />
          <span className="sr-only">Close</span>
        </Link>
        {children}
      </div>
    </div>
  );
}
