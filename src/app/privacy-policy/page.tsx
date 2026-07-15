export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen p-12 bg-white flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-light mb-8 text-[#2a2a2a]">Privacy Policy</h1>
        <div className="prose prose-lg text-gray-700 font-light">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mb-4">
            At Bubhauz, we prioritize your privacy as much as your baby's safety. This Privacy Policy outlines how we collect, use, and protect your information.
          </p>
          <h2 className="text-2xl mt-8 mb-4">1. Information Collection</h2>
          <p className="mb-4">We collect information when you submit inquiries, request a quote, or contact our customer support team.</p>
          <h2 className="text-2xl mt-8 mb-4">2. Use of Information</h2>
          <p className="mb-4">Your information is solely used to process inquiries, improve our catalogue, and ensure the best customer service experience.</p>
          {/* More content can be added by the CMS later */}
        </div>
      </div>
    </main>
  );
}
