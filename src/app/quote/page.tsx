"use client";

import { useState } from "react";

export default function RequestQuotePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData))
      });

      if (!res.ok) throw new Error("Failed to submit inquiry");
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-12 bg-[#f9f9f9] flex items-center justify-center">
      <div className="glass-card max-w-lg w-full p-8">
        <h1 className="text-3xl font-light mb-6 text-[#2a2a2a]">Request a Quote</h1>
        
        {success ? (
          <div className="text-center py-12">
            <h2 className="text-2xl text-green-600 mb-4">Request Sent!</h2>
            <p className="text-gray-600">Our team will be in touch with you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <label className="flex flex-col text-sm text-gray-700">
              Name *
              <input name="name" required className="mt-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#2a2a2a] bg-white/80" />
            </label>
            
            <label className="flex flex-col text-sm text-gray-700">
              Email *
              <input type="email" name="email" required className="mt-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#2a2a2a] bg-white/80" />
            </label>

            <label className="flex flex-col text-sm text-gray-700">
              Phone
              <input type="tel" name="phone" className="mt-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#2a2a2a] bg-white/80" />
            </label>

            <label className="flex flex-col text-sm text-gray-700">
              Product of Interest *
              <select name="productOfInterest" required className="mt-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#2a2a2a] bg-white/80">
                <option value="">Select a product...</option>
                <option value="bubhauz-stroller-v1">Bubhauz Stroller V1</option>
                <option value="bubhauz-crib-pro">Bubhauz Crib Pro</option>
              </select>
            </label>

            <label className="flex flex-col text-sm text-gray-700">
              Additional Details
              <textarea name="message" rows={4} className="mt-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#2a2a2a] bg-white/80"></textarea>
            </label>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-4 px-8 py-4 bg-[#2a2a2a] text-white rounded-full text-lg hover:bg-black transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Submit Inquiry"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
