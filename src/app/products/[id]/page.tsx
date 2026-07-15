export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen p-12 bg-white flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-light mb-4 text-[#2a2a2a] capitalize">
          {params.id.replace(/-/g, ' ')}
        </h1>
        <div className="w-full h-96 bg-gray-100 rounded-3xl mb-8 flex items-center justify-center">
          <span className="text-gray-400">Product Image Area</span>
        </div>
        <p className="text-xl font-light text-gray-700 mb-8 leading-relaxed">
          Premium design meets uncompromising safety. Engineered with the finest materials and rigorously tested to exceed global safety standards for your baby.
        </p>
        <button className="px-8 py-4 bg-[#2a2a2a] text-white rounded-full text-lg hover:bg-black transition-colors shadow-xl">
          Request a Quote
        </button>
      </div>
    </main>
  );
}
