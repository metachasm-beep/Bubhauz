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

        {/* Grievance & Office */}
        <div className="flex flex-col items-center md:items-end gap-1 text-gray-400 mt-4 md:mt-0 text-center md:text-right">
          <span className="flex items-center gap-1">📍 1/57, Old Double Storey, Lajpat Nagar IV, New Delhi</span>
          <span className="flex items-center gap-1">📞 +91 8368827681, +91 7838121294</span>
          <a href="https://instagram.com/bubhauz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[var(--primary)] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            @bubhauz
          </a>
        </div>

      </div>
    </footer>
  );
}
