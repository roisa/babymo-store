import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL;
  return {
    rules: [
      {
        userAgent: "*",
        // /order is the public lookup page; /order/<id> is per-customer
        // and lives behind localStorage, so it shouldn't be indexed.
        allow: ["/", "/order"],
        disallow: [
          "/admin",
          "/api/",
          "/payment/",
          "/shipping-label/",
          "/invoice/",
          "/order/",
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
