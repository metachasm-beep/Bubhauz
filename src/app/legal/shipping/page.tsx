import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | Bubhauz',
};

export default function ShippingPolicyPage() {
  return (
    <article className="max-w-none text-[var(--foreground)] text-lg leading-relaxed space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[var(--primary)] mb-2">Shipping & Delivery Policy</h1>
        <p className="text-sm text-[var(--text-muted)]">Last Updated: July 2026</p>
      </div>
      
      <p>
        We aim to deliver your premium baby essentials safely and quickly to your doorstep across India.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">1. Delivery Timelines</h2>
      <p>Orders are typically processed and dispatched within 1-2 business days. Delivery times vary depending on your location:</p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Metro Cities:</strong> 2-4 business days</li>
        <li><strong>Non-Metro Cities:</strong> 4-7 business days</li>
        <li><strong>Remote Locations:</strong> 7-10 business days</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">2. Shipping Charges</h2>
      <p>We offer free standard shipping on all orders above ₹999. For orders below ₹999, a flat shipping fee of ₹99 will be applied at checkout. The total cost, inclusive of all shipping charges and taxes, will be displayed before you complete your purchase.</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">3. Order Tracking</h2>
      <p>Once your order is dispatched, you will receive a shipping confirmation email and SMS containing a tracking link and the details of our courier partner. You can use this link to track your shipment in real-time.</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-gray-200 pb-2">4. Non-Delivery</h2>
      <p>If you are unavailable to receive your package, our courier partner will typically make up to 3 delivery attempts. If the package is returned to us after failed attempts, we will initiate a refund to your original payment method, deducting the initial shipping cost.</p>
    </article>
  );
}
