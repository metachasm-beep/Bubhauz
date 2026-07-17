import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  // Formatting the title
  const title = slug === 'mama' ? 'The Mama Edit' : slug.charAt(0).toUpperCase() + slug.slice(1);
  
  // Category-specific descriptions
  const descriptions: Record<string, string> = {
    wardrobe: "Elevated essentials for their everyday adventures.",
    nourish: "Premium feeding tools designed for little hands.",
    sleep: "Restful nights start with the softest materials.",
    play: "Spark imagination with our curated collection of toys.",
    mama: "Because you deserve premium care, too."
  };
  const description = descriptions[slug] || "Curated premium selections.";

  // Mock Products generator based on category
  const generateMockProducts = (category: string) => {
    const products = [];
    const count = category === 'wardrobe' ? 6 : category === 'play' ? 4 : 5;
    
    for (let i = 1; i <= count; i++) {
      // Different deterministic seeds for different images
      const seedId = category.charCodeAt(0) * i * 10;
      products.push({
        id: `${category}-${i}`,
        name: `Premium ${title} Item 0${i}`,
        price: `₹${(Math.floor(Math.random() * 50) + 10) * 100}`,
        imageUrl: `https://picsum.photos/seed/${seedId}/600/800`
      });
    }
    return products;
  };

  const products = generateMockProducts(slug);

  return (
    <main className="min-h-screen bg-[#F9F6F0] text-[#111] selection:bg-[#C67D53] selection:text-[#F9F6F0]">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-[#F9F6F0]/80 backdrop-blur-xl border-b border-black/5 px-6 py-4 flex items-center justify-between">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-medium text-[#111]/70 hover:text-[#C67D53] transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <span className="text-xs uppercase tracking-[0.3em] font-light opacity-50 hidden md:block">
          Bubhauz Catalogue
        </span>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-32">
        {/* Category Hero */}
        <div className="max-w-2xl mb-24">
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-none mb-6">
            {title}.
          </h1>
          <p className="text-lg md:text-xl text-[#111]/70 leading-relaxed font-light">
            {description}
          </p>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product, idx) => (
            <Link 
              href={`/products/${product.id}`}
              key={product.id} 
              className={`group flex flex-col gap-4 cursor-pointer ${idx % 3 === 1 ? 'md:mt-12' : ''}`}
            >
              {/* Image Container with Hover zoom */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-white shadow-sm border border-black/5">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Subtle Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>

              {/* Product Meta */}
              <div className="flex justify-between items-start pt-2">
                <h3 className="text-sm font-medium tracking-wide uppercase">{product.name}</h3>
                <span className="text-sm text-[#C67D53]">{product.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
