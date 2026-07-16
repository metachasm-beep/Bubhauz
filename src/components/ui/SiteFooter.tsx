import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer id="global-footer" className="w-full bg-[var(--foreground)] text-white py-3 px-6 z-40 relative mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-2">
        
        {/* Brand & Copyright */}
        <div className="flex items-center gap-4">
          <span className="font-bold text-[var(--primary)] text-sm tracking-widest">BUBHAUZ</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/legal/privacy" className="hover:text-[var(--primary)] transition-colors">Privacy</Link>
          <Link href="/legal/terms" className="hover:text-[var(--primary)] transition-colors">Terms</Link>
          <Link href="/legal/refund" className="hover:text-[var(--primary)] transition-colors">Refunds</Link>
          <Link href="/legal/shipping" className="hover:text-[var(--primary)] transition-colors">Shipping</Link>
        </div>

        {/* Grievance & Office (Ultra Compact) */}
        <div className="flex gap-4 text-gray-500">
          <span title="Bandra W, Mumbai 400050">📍 Mumbai HQ</span>
          <span title="Grievance: grievances@bubhauz.in">✉️ Support</span>
        </div>

      </div>
    </footer>
  );
}
