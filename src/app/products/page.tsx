import Link from 'next/link';

export default function ProductListingPage() {
  const dummyProducts = [
    { id: 'bubhauz-stroller-v1', name: 'Bubhauz Stroller V1' },
    { id: 'bubhauz-crib-pro', name: 'Bubhauz Crib Pro' },
  ];

  return (
    <main className="min-h-screen p-12 bg-white">
      <h1 className="text-4xl font-light mb-8 text-[#2a2a2a]">Product Catalogue</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyProducts.map(p => (
          <Link href={`/products/${p.id}`} key={p.id}>
            <div className="glass-card p-6 cursor-pointer hover:shadow-2xl transition-all h-64 flex flex-col justify-end">
              <h2 className="text-xl font-medium">{p.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
