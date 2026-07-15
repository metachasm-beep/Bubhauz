"use client";

import { useState } from "react";
import StatusBanner from "@/components/ui/StatusBanner";
import Link from "next/link";

export default function RequestQuotePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const [formData, setFormData] = useState({
    category: "",
    productOfInterest: "",
    message: "",
    name: "",
    email: "",
    phone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (category: string) => {
    setFormData({ ...formData, category });
    setStep(2);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to submit inquiry");
      setSubmittedEmail(formData.email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 md:p-12 bg-[var(--background)] flex items-center justify-center overflow-hidden relative">
      {/* Playful background blobs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-3xl animate-float pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[var(--secondary)]/20 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="glass-card max-w-2xl w-full p-8 md:p-12 relative z-10">
        
        {/* Navigation & Header */}
        <div className="mb-8">
           <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--primary)] font-bold text-sm mb-4 inline-block">← Back Home</Link>
           {(!success) && (
             <div className="flex items-center justify-between mt-2">
               <h1 className="text-3xl font-bold text-[var(--primary)]">Let's Chat!</h1>
               <div className="bg-white/60 px-4 py-2 rounded-full text-sm font-bold text-[var(--foreground)] shadow-sm">
                 Step {step} of 3
               </div>
             </div>
           )}
        </div>
        
        {success ? (
          <div className="flex flex-col gap-6">
            <StatusBanner 
              type="success" 
              message={`Inquiry Received! We sent a confirmation to ${submittedEmail} and will reply within 24 hours.`}
            />
            <Link href="/" className="mt-4 px-8 py-4 bg-[var(--primary)] text-white text-center rounded-full text-xl font-bold hover:bg-[var(--primary-hover)] hover:-translate-y-1 transition-all duration-300 shadow-glass-colored">
              Return to Homepage
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && <StatusBanner type="error" message={error} />}
            
            {/* STEP 1: DECISION GATE */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-semibold mb-6 text-[var(--foreground)]">⚠️ What are you looking for today?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button type="button" onClick={() => handleCategorySelect('Nursery')} className="p-6 rounded-3xl border-2 border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white text-[var(--primary)] transition-all font-bold text-lg isometric-hover shadow-sm">
                    Nursery
                  </button>
                  <button type="button" onClick={() => handleCategorySelect('Safety')} className="p-6 rounded-3xl border-2 border-[#A3D5D3] hover:bg-[#A3D5D3] hover:text-white text-[#A3D5D3] transition-all font-bold text-lg isometric-hover shadow-sm">
                    Home Safety
                  </button>
                  <button type="button" onClick={() => handleCategorySelect('Play')} className="p-6 rounded-3xl border-2 border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-white text-[var(--foreground)] transition-all font-bold text-lg isometric-hover shadow-sm">
                    Playtime
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DETAILS */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-5">
                <h2 className="text-xl font-semibold mb-2 text-[var(--foreground)]">Tell us more about your {formData.category} needs</h2>
                
                <label className="flex flex-col text-sm font-bold text-[var(--foreground)]">
                  Product of Interest *
                  <select name="productOfInterest" required value={formData.productOfInterest} onChange={handleChange} className="mt-2 p-4 rounded-2xl border-2 border-white/60 focus:outline-none focus:border-[var(--primary)] bg-white/80 transition-colors shadow-sm font-medium text-base">
                    <option value="">Select a product...</option>
                    <option value="bubhauz-stroller-v1">Bubhauz Stroller V1</option>
                    <option value="bubhauz-crib-pro">Bubhauz Crib Pro</option>
                  </select>
                </label>

                <label className="flex flex-col text-sm font-bold text-[var(--foreground)]">
                  How can we help?
                  <textarea name="message" rows={4} value={formData.message} onChange={handleChange} className="mt-2 p-4 rounded-2xl border-2 border-white/60 focus:outline-none focus:border-[var(--primary)] bg-white/80 transition-colors shadow-sm font-medium text-base resize-none" placeholder="I'm looking for a stroller that fits in a small car trunk..."></textarea>
                </label>

                <div className="flex gap-4 mt-4">
                  <button type="button" onClick={prevStep} className="px-6 py-4 bg-white text-[var(--foreground)] rounded-full font-bold hover:bg-gray-50 transition-all border-2 border-gray-100 flex-1">Back</button>
                  <button type="button" onClick={nextStep} disabled={!formData.productOfInterest} className="px-6 py-4 bg-[var(--primary)] text-white rounded-full font-bold hover:bg-[var(--primary-hover)] transition-all shadow-md flex-1 disabled:opacity-50">Next Step</button>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-5">
                <h2 className="text-xl font-semibold mb-2 text-[var(--foreground)]">Where should we send your quote?</h2>
                
                <label className="flex flex-col text-sm font-bold text-[var(--foreground)]">
                  Your Name *
                  <input name="name" required value={formData.name} onChange={handleChange} className="mt-2 p-4 rounded-2xl border-2 border-white/60 focus:outline-none focus:border-[var(--primary)] bg-white/80 transition-colors shadow-sm font-medium text-base" placeholder="Jane Doe" />
                </label>
                
                <label className="flex flex-col text-sm font-bold text-[var(--foreground)]">
                  Your Email *
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="mt-2 p-4 rounded-2xl border-2 border-white/60 focus:outline-none focus:border-[var(--primary)] bg-white/80 transition-colors shadow-sm font-medium text-base" placeholder="jane@example.com" />
                </label>

                <label className="flex flex-col text-sm font-bold text-[var(--foreground)]">
                  Phone Number
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-2 p-4 rounded-2xl border-2 border-white/60 focus:outline-none focus:border-[var(--primary)] bg-white/80 transition-colors shadow-sm font-medium text-base" placeholder="(555) 123-4567" />
                </label>

                <div className="flex gap-4 mt-4">
                  <button type="button" onClick={prevStep} className="px-6 py-4 bg-white text-[var(--foreground)] rounded-full font-bold hover:bg-gray-50 transition-all border-2 border-gray-100 flex-1">Back</button>
                  <button type="submit" disabled={loading} className="px-6 py-4 bg-[#A3D5D3] text-white rounded-full font-bold hover:bg-[#8ebfb7] transition-all shadow-glass-colored flex-1 disabled:opacity-50">
                    {loading ? "Sending gently..." : "Submit Inquiry"}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
