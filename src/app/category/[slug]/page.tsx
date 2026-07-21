import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { getProductsByCategory } from '@/data/products';

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

  const products = getProductsByCategory(slug);

  return (
    <main className="bg-[#F9F6F0] text-[#111] selection:bg-[#C67D53] selection:text-[#F9F6F0]">
      
      {/* Sleek Floating Back Button */}
      <Link 
        href="/" 
        className="fixed top-14 md:top-20 left-4 md:left-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/20 shadow-sm text-[#111]/70 hover:text-[#C67D53] hover:bg-white/60 transition-all"
        aria-label="Go Back"
      >
        <ArrowLeft size={18} />
      </Link>

      {/* Mobile Snapping Wrapper */}
      <div className="h-[100dvh] overflow-y-auto snap-y snap-mandatory hide-scrollbar md:h-auto md:overflow-y-visible md:snap-none">
        
        <div className="max-w-[1400px] mx-auto md:px-12 md:pt-28 md:pb-32">
          
          {/* Fold 1: Category Hero (Full height on mobile) */}
          <div className="h-[100dvh] md:h-auto w-full flex flex-col justify-center snap-center snap-always px-6 md:px-0 md:mb-24">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-none mb-4 md:mb-6">
                {title}.
              </h1>
              <p className="text-lg md:text-xl text-[#111]/70 leading-relaxed font-light">
                {description}
              </p>
            </div>
          </div>

          {/* Fold 2: Swipe Carousel (Mobile Full height) / Asymmetric Grid (Desktop) */}
          <div className="h-[100dvh] md:h-auto w-full flex flex-col justify-center snap-center snap-always">
            <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-x-8 md:gap-y-16 px-6 md:px-0 pb-12 snap-x snap-mandatory hide-scrollbar">
              {products.map((product, idx) => (
                <Link 
                  href={`/products/${product.id}`}
                  key={product.id} 
                  className={`group flex flex-col gap-3 cursor-pointer min-w-[75vw] md:min-w-0 snap-center ${idx % 3 === 1 ? 'md:mt-12' : ''}`}
                >
                  {/* Image Container with Hover zoom */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-white shadow-sm border border-black/5 p-4 flex items-center justify-center rounded-xl md:rounded-none">
                    <div className="relative w-full h-full">
                      <Image 
                        src={product.imageUrl} 
                        alt={product.name}
                        fill
                        className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 75vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    
                    {/* Subtle Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  </div>

                  {/* Product Meta */}
                  <div className="flex justify-between items-start pt-1 px-1">
                    <h3 className="text-xs md:text-sm font-medium tracking-wide uppercase text-[#111]/90">{product.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
