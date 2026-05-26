import type { MetadataRoute } from "next";
import { CATEGORIES, SAMPLE_PRODUCTS } from "@/lib/products";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://babymo-shop.vercel.app";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    {
      url: `${base}/products`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...CATEGORIES.map((c) => ({
      url: `${base}/categories/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...SAMPLE_PRODUCTS.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
