import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Bubhauz',
};

export default function PrivacyPolicyPage() {
  return (
    <article className="max-w-none text-[var(--foreground)] text-lg leading-relaxed space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[var(--primary)] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[var(--text-muted)]">Last Updated: July 2026</p>
      </div>
      
      <p>
        At Bubhauz Private Limited ("we", "our", or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy is published in accordance with the provisions of the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">1. Information We Collect</h2>
      <p>We collect personal information that you voluntarily provide to us when registering on the website, expressing an interest in obtaining information about us or our products, or otherwise contacting us. This includes your name, phone number, email address, shipping address, and payment information.</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">2. How We Use Your Information</h2>
      <p>We use the information we collect to fulfill and manage your orders, deliver products, process payments, and communicate with you regarding your order status or promotional offers (if you have opted in).</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">3. Data Security</h2>
      <p>We have implemented reasonable security practices and procedures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. We utilize industry-standard encryption protocols for transmitting payment information.</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">4. Sharing Your Information</h2>
      <p>We do not sell, rent, or trade your personal information to third parties. We may share your information with trusted third-party service providers (such as courier partners and payment gateways) strictly for the purpose of fulfilling your orders.</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">5. Your Rights</h2>
      <p>You have the right to access, correct, update, or request the deletion of your personal information. Please contact our Grievance Officer to exercise these rights.</p>
    </article>
  );
}
