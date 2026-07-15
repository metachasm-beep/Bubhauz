import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="w-full bg-[var(--foreground)] text-white py-16 px-4 z-40 relative mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand & Mission */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-bold mb-4 text-[var(--primary)]">Bubhauz</h2>
          <p className="text-gray-400 text-sm mb-6">
            Designed with love, engineered for safety. The most premium, gentle essentials for your little one's everyday adventures.
          </p>
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Bubhauz Pvt. Ltd.
          </div>
        </div>

        {/* Links */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-lg font-semibold mb-4 text-white">Policies</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/legal/privacy" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/legal/terms" className="hover:text-[var(--primary)] transition-colors">Terms of Service</Link></li>
            <li><Link href="/legal/refund" className="hover:text-[var(--primary)] transition-colors">Refund & Cancellation Policy</Link></li>
            <li><Link href="/legal/shipping" className="hover:text-[var(--primary)] transition-colors">Shipping & Delivery Policy</Link></li>
          </ul>
        </div>

        {/* Registered Address */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-lg font-semibold mb-4 text-white">Registered Office</h3>
          <div className="text-gray-400 text-sm space-y-2">
            <p className="font-bold text-gray-300">Bubhauz Private Limited</p>
            <p>123 Safespace Avenue,</p>
            <p>Bandra West, Mumbai,</p>
            <p>Maharashtra, India 400050</p>
            <p className="mt-4">CIN: U12345MH2024PTC123456</p>
          </div>
        </div>

        {/* Grievance Officer - Mandatory for E-Commerce Rules 2020 */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-lg font-semibold mb-4 text-white">Grievance Officer</h3>
          <div className="text-gray-400 text-sm space-y-2 bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-xs text-gray-500 mb-2">As per Consumer Protection (E-Commerce) Rules, 2020</p>
            <p><span className="font-semibold text-gray-300">Name:</span> Aditi Sharma</p>
            <p><span className="font-semibold text-gray-300">Designation:</span> Chief Grievance Officer</p>
            <p><span className="font-semibold text-gray-300">Email:</span> grievances@bubhauz.in</p>
            <p><span className="font-semibold text-gray-300">Phone:</span> +91 98765 43210</p>
            <p className="text-xs mt-2 italic text-gray-500">Available Mon-Fri, 9am - 6pm IST</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
