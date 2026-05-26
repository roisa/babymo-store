import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://babymo-shop.vercel.app";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/payment/", "/shipping-label/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
