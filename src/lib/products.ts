import type { Category, Product } from "@/types";

/**
 * Baby Mo — sample catalogue.
 *
 * Brand: warm, calm, slow-parenting lifestyle.
 * Vibe references: Muji, Kinfolk, Korean parenting brands, Montessori homes,
 * Pinterest cozy aesthetic.
 *
 * Product naming is emotional (never generic). Descriptions feel like a
 * gentle conversation with the parent, not a feature list.
 *
 * Imagery direction (when swapped for real photography):
 * - Kids Books → cozy reading corner, warm sunlight, soft blankets, wooden
 *   bookshelf, Scandinavian nursery.
 * - Activity Books → crayons, wooden desk, soft natural lighting, child
 *   drawing peacefully.
 * - Flashcards → Montessori shelf, wooden toys, soft neutral tones, parent
 *   and child together.
 * - Toddler T-Shirts → Korean kidswear, oversized fit, natural movement,
 *   playful warm atmosphere.
 * - Parenting Merch → cafe table, journaling setup, cozy workspace, soft
 *   sunlight.
 *
 * The image URLs below are tasteful Unsplash stand-ins in the same mood —
 * swap them for the merchant's real product photography before going live.
 */

const IMG = {
  notebook1:
    "https://images.unsplash.com/photo-1517842645767-c639042777db?w=900&q=80",
  notebook2:
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80",
  notebook3:
    "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=900&q=80",
  stickers1:
    "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=900&q=80",
  stickers2:
    "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=900&q=80",
  cards1:
    "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=900&q=80",
  cards2:
    "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=900&q=80",
  cozy1:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80",
  cozy2:
    "https://images.unsplash.com/photo-1542435503-956c469947f6?w=900&q=80",
  plush:
    "https://images.unsplash.com/photo-1559563458-527698bf5295?w=900&q=80",
  plush2:
    "https://images.unsplash.com/photo-1620421680010-0766ff230392?w=900&q=80",
  stickyNotes:
    "https://images.unsplash.com/photo-1606166325683-e6deb697d301?w=900&q=80",
  mug1: "https://images.unsplash.com/photo-1602874801007-aa377efa0bc4?w=900&q=80",
  mug2: "https://images.unsplash.com/photo-1601000938259-9e92002320b2?w=900&q=80",
  kit: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80",
  kit2: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=900&q=80",
  wallpaper:
    "https://images.unsplash.com/photo-1486916856361-bf2999da9d57?w=900&q=80",
  poster:
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&q=80",
};

export const CATEGORIES: Category[] = [
  {
    slug: "kids-books",
    name: "Buku Anak",
    emoji: "📖",
    description: "cerita lembut untuk hati yang sedang tumbuh.",
  },
  {
    slug: "activity-books",
    name: "Buku Aktivitas",
    emoji: "🖍️",
    description: "halaman tenang untuk sore yang pelan.",
  },
  {
    slug: "flashcards",
    name: "Flashcards",
    emoji: "🃏",
    description: "kartu kecil untuk rasa ingin tahu yang besar.",
  },
  {
    slug: "toddler-tshirts",
    name: "Baju Mungil",
    emoji: "👕",
    description: "kain lembut untuk hari-hari kecil.",
  },
  {
    slug: "parenting-merch",
    name: "Untuk Orang Tua",
    emoji: "☕",
    description: "barang hangat untuk pagi yang pelan.",
  },
];

export const SAMPLE_PRODUCTS: Product[] = [
  // ═══════════════════════════════════════════
  // Kids Books
  // ═══════════════════════════════════════════
  {
    id: "p-101",
    name: "Tiny Brave Steps",
    slug: "tiny-brave-steps",
    category: "kids-books",
    price: 109000,
    description:
      "Cerita lembut tentang langkah pertama si kecil — keberanian yang tumbuh perlahan, satu halaman setiap malam. Kertas tebal, ilustrasi pastel, dan kata-kata yang menenangkan.",
    tagline: "small stories for growing hearts",
    images: [IMG.notebook1, IMG.notebook3, IMG.cozy1],
    stock: 28,
    bestseller: true,
    featured: true,
  },
  {
    id: "p-102",
    name: "Goodnight Little Moon",
    slug: "goodnight-little-moon",
    category: "kids-books",
    price: 119000,
    description:
      "Ritual menjelang tidur yang menenangkan — buku rima lembut untuk dibaca bersama saat lampu malam mulai redup. Sampul kain, sudut tumpul, aman untuk tangan mungil.",
    tagline: "for cozy bedtime moments",
    images: [IMG.notebook3, IMG.poster, IMG.cozy2],
    stock: 24,
    featured: true,
  },
  {
    id: "p-103",
    name: "Quiet Morning Stories",
    slug: "quiet-morning-stories",
    category: "kids-books",
    price: 99000,
    description:
      "Kumpulan cerita pendek untuk pagi yang pelan. Cocok dibaca sambil sarapan, saat cahaya hangat baru menembus tirai. 32 halaman, 8 cerita.",
    tagline: "gentle learning for little minds",
    images: [IMG.notebook2, IMG.cozy1],
    stock: 32,
  },
  {
    id: "p-104",
    name: "My First Feelings Book",
    slug: "my-first-feelings-book",
    category: "kids-books",
    price: 115000,
    description:
      "Buku interaktif untuk mengenalkan perasaan pertama — senang, sedih, takut, tenang — dengan ilustrasi lembut dan halaman touch & feel.",
    tagline: "small stories for growing hearts",
    images: [IMG.notebook3, IMG.notebook1],
    stock: 18,
    bestseller: true,
  },
  {
    id: "p-105",
    name: "Little Explorer Journal",
    slug: "little-explorer-journal",
    category: "kids-books",
    price: 95000,
    description:
      "Jurnal mungil untuk mencatat hal baru yang ditemukan si kecil hari ini — dari bentuk daun di kebun sampai bunyi hujan di jendela. Diisi bersama orang tua.",
    tagline: "gentle learning for little minds",
    images: [IMG.notebook2, IMG.cozy2],
    stock: 26,
  },

  // ═══════════════════════════════════════════
  // Activity Books
  // ═══════════════════════════════════════════
  {
    id: "p-201",
    name: "Calm Coloring Time",
    slug: "calm-coloring-time",
    category: "activity-books",
    price: 69000,
    description:
      "Halaman mewarnai bermotif lembut dengan garis tebal dan ruang luas — dirancang untuk anak yang baru belajar memegang krayon. 48 halaman, kertas matte tebal.",
    tagline: "quiet little moments of creativity",
    images: [IMG.stickers1, IMG.stickers2, IMG.notebook2],
    stock: 45,
    bestseller: true,
    featured: true,
  },
  {
    id: "p-202",
    name: "Rainy Day Workbook",
    slug: "rainy-day-workbook",
    category: "activity-books",
    price: 79000,
    description:
      "Kumpulan aktivitas tenang untuk sore yang mendung — labirin lembut, titik-titik, dan teka-teki ringan. Ditemani secangkir cokelat hangat lebih baik lagi.",
    tagline: "for slow afternoon learning",
    images: [IMG.notebook2, IMG.stickyNotes],
    stock: 34,
  },
  {
    id: "p-203",
    name: "Play & Learn Journal",
    slug: "play-and-learn-journal",
    category: "activity-books",
    price: 85000,
    description:
      "Gabungan halaman menggambar, menulis, dan bermain peran — untuk anak usia 4–7 tahun yang sedang ingin tahu segalanya. 64 halaman penuh kemungkinan.",
    tagline: "playful pages for curious hands",
    images: [IMG.notebook1, IMG.cozy1],
    stock: 28,
    featured: true,
  },
  {
    id: "p-204",
    name: "Tiny Focus Book",
    slug: "tiny-focus-book",
    category: "activity-books",
    price: 55000,
    description:
      "Buku saku untuk melatih fokus — pola sederhana yang ditelusuri dengan jari, ideal untuk perjalanan singkat atau menunggu di restoran. Ukuran pas di tangan kecil.",
    tagline: "quiet little moments of creativity",
    images: [IMG.notebook2, IMG.notebook3],
    stock: 60,
  },

  // ═══════════════════════════════════════════
  // Flashcards
  // ═══════════════════════════════════════════
  {
    id: "p-301",
    name: "Little Words Flashcards",
    slug: "little-words-flashcards",
    category: "flashcards",
    price: 89000,
    description:
      "60 kartu dua bahasa (ID/EN) dengan kata-kata pertama — keluarga, perasaan, alam — dicetak di kertas matte tebal dan dilaminasi. Dikemas dalam kotak kayu mini.",
    tagline: "small cards for curious minds",
    images: [IMG.cards1, IMG.cards2],
    stock: 38,
    bestseller: true,
    featured: true,
  },
  {
    id: "p-302",
    name: "Tiny Nature Cards",
    slug: "tiny-nature-cards",
    category: "flashcards",
    price: 95000,
    description:
      "Kartu kenalan dengan alam — daun, bunga, batu, awan. Foto natural berlatar tenang, cocok untuk dibawa berjalan-jalan di taman bersama si kecil.",
    tagline: "learning gently, one card at a time",
    images: [IMG.kit, IMG.kit2],
    stock: 30,
  },
  {
    id: "p-303",
    name: "Animal Friends Learning Set",
    slug: "animal-friends-learning-set",
    category: "flashcards",
    price: 115000,
    description:
      "Set kartu Montessori-inspired berisi 48 hewan — dengan nama, suara, dan habitat. Dikemas dalam kotak kain lembut yang bisa dipakai berkali-kali.",
    tagline: "small cards for curious minds",
    images: [IMG.plush, IMG.plush2],
    stock: 20,
    featured: true,
  },
  {
    id: "p-304",
    name: "First Alphabet Moments",
    slug: "first-alphabet-moments",
    category: "flashcards",
    price: 75000,
    description:
      "26 kartu huruf dengan ilustrasi pastel untuk diperkenalkan satu per satu — A untuk awan, B untuk bunga, C untuk cahaya pagi.",
    tagline: "learning gently, one card at a time",
    images: [IMG.cards1, IMG.wallpaper],
    stock: 42,
  },

  // ═══════════════════════════════════════════
  // Toddler T-Shirts
  // ═══════════════════════════════════════════
  {
    id: "p-401",
    name: "Soft Sunday Tee",
    slug: "soft-sunday-tee",
    category: "toddler-tshirts",
    price: 139000,
    description:
      "Kaos katun supima organik dengan potongan oversized lembut — sempurna untuk hari Minggu di rumah. Jahitan rata, label dari kain lembut. Ukuran 1–6 tahun.",
    tagline: "tiny clothes for cozy days",
    images: [IMG.plush, IMG.kit, IMG.cozy2],
    stock: 22,
    bestseller: true,
    featured: true,
  },
  {
    id: "p-402",
    name: "Tiny Explorer Shirt",
    slug: "tiny-explorer-shirt",
    category: "toddler-tshirts",
    price: 149000,
    description:
      "Kaos lengan pendek dengan sablon lembut bertuliskan 'tiny explorer' — kain bernapas dan ringan, untuk anak aktif yang suka berlari di rumput.",
    tagline: "soft cotton for tiny adventures",
    images: [IMG.plush2, IMG.kit2],
    stock: 26,
  },
  {
    id: "p-403",
    name: "Warm Hug Club",
    slug: "warm-hug-club",
    category: "toddler-tshirts",
    price: 159000,
    description:
      "Kaos panjang katun lembut dengan motif 'warm hug club' di dada — cocok untuk hari sejuk atau dipakai berlapis dengan jaket favoritnya.",
    tagline: "tiny clothes for cozy days",
    images: [IMG.kit, IMG.plush],
    stock: 18,
    featured: true,
  },
  {
    id: "p-404",
    name: "Little Dreamer Tee",
    slug: "little-dreamer-tee",
    category: "toddler-tshirts",
    price: 129000,
    description:
      "Pewarnaan natural plant-based, jahitan halus, dan label dari bahan lembut — tidak menggesek kulit. Untuk anak yang lagi rajin bermimpi.",
    tagline: "soft cotton for tiny adventures",
    images: [IMG.plush2, IMG.cozy2],
    stock: 24,
  },

  // ═══════════════════════════════════════════
  // Parenting Merchandise
  // ═══════════════════════════════════════════
  {
    id: "p-501",
    name: "Warm Hug Tote Bag",
    slug: "warm-hug-tote-bag",
    category: "parenting-merch",
    price: 89000,
    description:
      "Tote bag kanvas tebal dengan sablon 'warm hug' — cukup besar untuk perlengkapan anak, buku, dan satu termos hangat. Pegangan lembut yang tidak menggores bahu.",
    tagline: "little things that feel comforting",
    images: [IMG.cozy1, IMG.kit2],
    stock: 40,
    bestseller: true,
  },
  {
    id: "p-502",
    name: "Soft Morning Mug",
    slug: "soft-morning-mug",
    category: "parenting-merch",
    price: 99000,
    description:
      "Mug keramik dengan glaze matte krem dan ilustrasi mini di sisi dalam — untuk teh hangat sebelum si kecil bangun. Kapasitas 320 ml, aman dishwasher.",
    tagline: "for slow mornings and warm drinks",
    images: [IMG.mug1, IMG.mug2],
    stock: 30,
    featured: true,
  },
  {
    id: "p-503",
    name: "Tiny Wins Sticker Pack",
    slug: "tiny-wins-sticker-pack",
    category: "parenting-merch",
    price: 35000,
    description:
      "30 stiker waterproof untuk merayakan kemenangan kecil — 'kamu hebat hari ini', 'istirahat dulu yuk', dan banyak lagi. Tempel di laptop, botol minum, atau jurnal.",
    tagline: "little things that feel comforting",
    images: [IMG.stickers1, IMG.stickers2],
    stock: 80,
    bestseller: true,
  },
  {
    id: "p-504",
    name: "Notes for Gentle Days",
    slug: "notes-for-gentle-days",
    category: "parenting-merch",
    price: 49000,
    description:
      "Catatan adhesif pastel dengan kata-kata penyemangat lembut — cocok ditempel di kulkas, laptop, atau lunch box anak. 50 lembar per pack.",
    tagline: "for slow mornings and warm drinks",
    images: [IMG.stickyNotes, IMG.notebook2],
    stock: 55,
    featured: true,
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
