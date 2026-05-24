import HomePageClient from "./HomePageClient";
import { SAMPLE_PRODUCTS } from "@/lib/products";

export default function HomePage() {
  const featured = SAMPLE_PRODUCTS.filter((p) => p.featured).slice(0, 4);
  const bestsellers = SAMPLE_PRODUCTS.filter((p) => p.bestseller).slice(0, 4);

  return <HomePageClient featured={featured} bestsellers={bestsellers} />;
}
