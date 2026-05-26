import type { Metadata } from "next";
import { SAMPLE_PRODUCTS } from "@/lib/products";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { JsonLd, breadcrumbLd, itemListLd } from "@/lib/seo";
import ProductsListing from "./ProductsListing";

export const metadata: Metadata = {
  title: "Belanja semua produk",
  description:
    "Rak lengkap Baby Mo — buku cerita anak, buku mewarnai, stiker doa harian, kaos katun organik, poster pastel, boneka, pin, dan keychain. Dikirim ke seluruh Indonesia.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: `Belanja semua produk · ${SITE_NAME}`,
    description:
      "Rak lengkap Baby Mo — dipilih dengan tenang untuk keluarga yang tumbuh pelan-pelan.",
    url: `${SITE_URL}/products`,
  },
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Beranda", url: SITE_URL },
            { name: "Belanja", url: `${SITE_URL}/products` },
          ]),
          itemListLd(
            "Semua produk Baby Mo",
            SAMPLE_PRODUCTS.map((p) => ({
              name: p.name,
              url: `${SITE_URL}/products/${p.slug}`,
            })),
          ),
        ]}
      />
      <ProductsListing />
    </>
  );
}
