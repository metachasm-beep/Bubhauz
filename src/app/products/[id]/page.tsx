import ProductDetailView from "@/components/product/ProductDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  return <ProductDetailView id={id} />;
}
