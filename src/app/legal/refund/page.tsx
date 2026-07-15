import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Bubhauz',
};

export default function RefundPolicyPage() {
  return (
    <article className="max-w-none text-[var(--foreground)] text-lg leading-relaxed space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[var(--primary)] mb-2">Refund & Cancellation Policy</h1>
        <p className="text-sm text-[var(--text-muted)]">Last Updated: July 2026</p>
      </div>
      
      <p>
        At Bubhauz, we strive for 100% customer satisfaction. In compliance with the Consumer Protection (E-Commerce) Rules, 2020, we offer a transparent and easy return and refund process.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">1. Order Cancellations</h2>
      <p>You may cancel your order at any time before it is dispatched from our warehouse without any penalty. To cancel an order, please contact our support team or use the cancellation button in your order history. Once dispatched, the order cannot be cancelled, but you may refuse delivery or initiate a return.</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">2. Returns</h2>
      <div className="space-y-4">
        <p>We accept returns within 15 days of the delivery date. To be eligible for a return, your item must be unused, unwashed, and in the same condition that you received it, with all original tags and packaging intact.</p>
        <p>Hygiene-sensitive items (such as teething rings, pacifiers, and unsealed baby washes) cannot be returned unless they are defective or damaged upon receipt.</p>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">3. Refunds</h2>
      <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">4. Defective or Damaged Products</h2>
      <p>If you receive a defective or damaged product, please contact us immediately with photographic evidence. We will arrange for a free replacement or a full refund, including shipping charges.</p>
    </article>
  );
}
