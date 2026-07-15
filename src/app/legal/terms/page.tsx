import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Bubhauz',
};

export default function TermsPage() {
  return (
    <article className="max-w-none text-[var(--foreground)] text-lg leading-relaxed space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[var(--primary)] mb-2">Terms of Service</h1>
        <p className="text-sm text-[var(--text-muted)]">Last Updated: July 2026</p>
      </div>
      
      <p>
        Welcome to Bubhauz. These Terms of Service ("Terms") govern your use of the website operated by Bubhauz Private Limited. By accessing or using our website, you agree to be bound by these Terms and our Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">1. Eligibility</h2>
      <p>In accordance with the Indian Contract Act, 1872, you must be at least 18 years of age to enter into a legally binding contract. By using this site, you represent that you are at least 18 years old or are accessing the site under the supervision of a parent or legal guardian.</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">2. E-Commerce Compliance</h2>
      <p>We operate in compliance with the Consumer Protection (E-Commerce) Rules, 2020. All product pricing is inclusive of applicable taxes, and any additional charges (such as delivery fees) will be clearly indicated before checkout.</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">3. Intellectual Property</h2>
      <p>All content included on this site, such as text, graphics, logos, images, and software, is the property of Bubhauz or its content suppliers and protected by Indian and international copyright laws.</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">4. Limitation of Liability</h2>
      <p>To the fullest extent permitted by applicable law, Bubhauz shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the site or products.</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">5. Governing Law</h2>
      <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts at Mumbai, Maharashtra.</p>
    </article>
  );
}
