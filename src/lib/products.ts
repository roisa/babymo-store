import type { Category, Product } from "@/types";

export const CATEGORIES: Category[] = [
  {
    slug: "emotional-journals",
    name: "Emotional Journals",
    emoji: "📓",
    description: "Guided journals for your daily thoughts and feelings.",
  },
  {
    slug: "mood-stickers",
    name: "Mood Stickers",
    emoji: "🌸",
    description: "Pastel stickers for journaling and self-expression.",
  },
  {
    slug: "cozy-desk",
    name: "Cozy Desk Accessories",
    emoji: "🕯️",
    description: "Calming desk items for your softest workspace.",
  },
  {
    slug: "self-care-kits",
    name: "Self-Care Kits",
    emoji: "🧸",
    description: "Curated comfort kits for your gentle rituals.",
  },
  {
    slug: "affirmation-cards",
    name: "Affirmation Cards",
    emoji: "💌",
    description: "Soft reminders for the days you need them most.",
  },
  {
    slug: "support-merch",
    name: "Emotional Support Merch",
    emoji: "🎀",
    description: "Wearable comfort, designed with love.",
  },
  {
    slug: "aesthetic-posters",
    name: "Aesthetic Posters",
    emoji: "🖼️",
    description: "Minimal pastel art for cozy walls.",
  },
  {
    slug: "phone-wallpapers",
    name: "Phone Wallpapers",
    emoji: "📱",
    description: "Calming digital wallpapers for your daily scroll.",
  },
  {
    slug: "cute-stationery",
    name: "Cute Stationery",
    emoji: "✏️",
    description: "Tiny tools that bring a little joy.",
  },
  {
    slug: "digital-wellness",
    name: "Digital Wellness Packs",
    emoji: "✨",
    description: "Printable bundles for slow, intentional living.",
  },
];

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "p-001",
    name: "Baby Mo Emotional Journal",
    slug: "baby-mo-emotional-journal",
    category: "emotional-journals",
    price: 89000,
    description:
      "A soft-touch guided emotional journal with calming prompts, mood tracking pages, and gentle weekly reflections. Designed for slow mornings, late nights, and every quiet moment in between.",
    tagline: "for soft mornings & late-night thoughts",
    images: [
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=900&q=80",
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=900&q=80",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80",
    ],
    stock: 24,
    bestseller: true,
    featured: true,
  },
  {
    id: "p-002",
    name: "Mood Sticker Pack",
    slug: "mood-sticker-pack",
    category: "mood-stickers",
    price: 35000,
    description:
      "Cute waterproof pastel stickers for journaling, laptops, water bottles, and emotional expression. 24 pieces per pack — soft pinks, lavenders, and creamy beige.",
    tagline: "tiny moods, sticky little feelings",
    images: [
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=900&q=80",
      "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=900&q=80",
    ],
    stock: 80,
    bestseller: true,
    featured: true,
  },
  {
    id: "p-003",
    name: "Comfort Letter Set",
    slug: "comfort-letter-set",
    category: "affirmation-cards",
    price: 49000,
    description:
      "Beautiful affirmation cards and emotional support mini letters, ready to be tucked into pockets, bags, or sent to someone who needs it today.",
    tagline: "gentle words, hand-pressed onto paper",
    images: [
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=900&q=80",
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=900&q=80",
    ],
    stock: 40,
    featured: true,
  },
  {
    id: "p-004",
    name: "Sleep Well Poster",
    slug: "sleep-well-poster",
    category: "aesthetic-posters",
    price: 59000,
    description:
      "Minimal calming pastel wall art for cozy bedrooms and workspaces. Printed on matte premium paper that softens any room.",
    tagline: "for rooms that whisper goodnight",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&q=80",
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=900&q=80",
    ],
    stock: 18,
  },
  {
    id: "p-005",
    name: "Digital Self-Care Bundle",
    slug: "digital-self-care-bundle",
    category: "digital-wellness",
    price: 79000,
    description:
      "A downloadable bundle of phone wallpapers, printable journaling pages, affirmation cards, and mood trackers — delivered to your inbox right after payment.",
    tagline: "comfort, delivered straight to your phone",
    images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80",
      "https://images.unsplash.com/photo-1542435503-956c469947f6?w=900&q=80",
    ],
    stock: 999,
    featured: true,
  },
  {
    id: "p-006",
    name: "Baby Mo Plush Keychain",
    slug: "baby-mo-plush-keychain",
    category: "support-merch",
    price: 69000,
    description:
      "A cute emotional support plush accessory — softer than a sigh, packaged in our signature pastel gift box.",
    tagline: "your tiny pocket comfort",
    images: [
      "https://images.unsplash.com/photo-1559563458-527698bf5295?w=900&q=80",
      "https://images.unsplash.com/photo-1620421680010-0766ff230392?w=900&q=80",
    ],
    stock: 30,
    bestseller: true,
  },
  {
    id: "p-007",
    name: "Calm Mind Sticky Notes",
    slug: "calm-mind-sticky-notes",
    category: "cute-stationery",
    price: 29000,
    description:
      "Pastel productivity and emotional affirmation sticky notes. Perfect for to-do lists that don't shout at you.",
    tagline: "small notes for big feelings",
    images: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80",
      "https://images.unsplash.com/photo-1606166325683-e6deb697d301?w=900&q=80",
    ],
    stock: 60,
  },
  {
    id: "p-008",
    name: "Cozy Candle — Vanilla Hug",
    slug: "cozy-candle-vanilla-hug",
    category: "cozy-desk",
    price: 95000,
    description:
      "Hand-poured soy candle that smells like an afternoon nap. Burn time ~30 hours. Vegan and cruelty-free.",
    tagline: "smells like staying home all day",
    images: [
      "https://images.unsplash.com/photo-1602874801007-aa377efa0bc4?w=900&q=80",
      "https://images.unsplash.com/photo-1601000938259-9e92002320b2?w=900&q=80",
    ],
    stock: 22,
    featured: true,
  },
  {
    id: "p-009",
    name: "Self-Care Sunday Kit",
    slug: "self-care-sunday-kit",
    category: "self-care-kits",
    price: 159000,
    description:
      "Everything you need for a slow Sunday: tea sachets, a sheet mask, a mini journal, and a hand-written affirmation card.",
    tagline: "permission to rest, in a box",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80",
      "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=900&q=80",
    ],
    stock: 14,
    bestseller: true,
  },
  {
    id: "p-010",
    name: "Pastel Phone Wallpaper Pack",
    slug: "pastel-phone-wallpaper-pack",
    category: "phone-wallpapers",
    price: 25000,
    description:
      "30 calming, original phone wallpapers in soft pinks, lavenders, and creams. Instantly delivered after payment.",
    tagline: "a softer home screen, instantly",
    images: [
      "https://images.unsplash.com/photo-1486916856361-bf2999da9d57?w=900&q=80",
      "https://images.unsplash.com/photo-1531315396756-905d68d21b56?w=900&q=80",
    ],
    stock: 999,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return SAMPLE_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return SAMPLE_PRODUCTS.filter((p) => p.category === category);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return SAMPLE_PRODUCTS;
  return SAMPLE_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.tagline ?? "").toLowerCase().includes(q),
  );
}
