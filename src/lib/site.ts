/**
 * Single source of truth for site-wide brand + URL constants used by
 * metadata, sitemap, robots, OG images, JSON-LD, and links.
 *
 * Override the URL by setting NEXT_PUBLIC_SITE_URL on Vercel when you
 * connect a custom domain (e.g. https://babymo.id). The fallback is
 * the current Vercel preview so sitemaps and canonicals stay valid
 * out of the box.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://babymo-shop.vercel.app";

export const SITE_NAME = "Baby Mo";

export const SITE_TAGLINE_ID =
  "Sesuatu yang lembut untuk hari-hari kecil.";
export const SITE_TAGLINE_EN = "Something soft for small days.";

export const SITE_DESCRIPTION_ID =
  "Buku cerita anak, buku mewarnai, stiker doa harian, kaos katun organik, poster pastel, boneka, pin dan keychain — dipilih dengan tenang untuk keluarga yang tumbuh pelan-pelan.";

export const SITE_DESCRIPTION_EN =
  "Storybooks, coloring books, daily-prayer stickers, organic-cotton kids tees, pastel posters, plush, pins and keychains — chosen calmly for families growing slowly.";

export const SITE_KEYWORDS = [
  "baby mo",
  "babymo",
  "buku cerita anak",
  "buku mewarnai",
  "stiker doa harian anak",
  "kaos anak katun organik",
  "boneka anak",
  "poster pastel anak",
  "homeschool indonesia",
  "parenting lifestyle indonesia",
  "slow parenting",
  "montessori indonesia",
];
