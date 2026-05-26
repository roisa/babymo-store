import HomePageClient from "./HomePageClient";
import { SAMPLE_PRODUCTS } from "@/lib/products";
import { FAQS } from "@/lib/faqs";
import {
  JsonLd,
  faqPageLd,
  organizationLd,
  websiteLd,
} from "@/lib/seo";

export default function HomePage() {
  const featured = SAMPLE_PRODUCTS.filter((p) => p.featured).slice(0, 4);
  const bestsellers = SAMPLE_PRODUCTS.filter((p) => p.bestseller).slice(0, 4);

  return (
    <>
      <JsonLd
        data={[
          organizationLd(),
          websiteLd(),
          faqPageLd(FAQS.id as unknown as { q: string; a: string }[]),
        ]}
      />
      <HomePageClient featured={featured} bestsellers={bestsellers} />
    </>
  );
}
