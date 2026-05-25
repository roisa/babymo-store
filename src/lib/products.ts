import type { Category, Product } from "@/types";

/**
 * Baby Mo — sample catalogue.
 *
 * Categories mirror the real merchandise lineup
 * (BABY_MO_IP/MERCHANDISE):
 *   01_STICKER, 02_APPAREL (KAOS), 03_POSTER, 04_BUKU CERITA ANAK,
 *   05_BUKU MEWARNAI, 06_STICKER DOA HARIAN ANAK, 07_BONEKA,
 *   08_KEYCHAIN, 09_PIN.
 *
 * Product naming is emotional (never generic). Descriptions feel like
 * a gentle conversation with the parent, not a feature list.
 *
 * Imagery direction (when swapped for the merchant's real product
 * shots):
 * - Buku Cerita    → cozy reading corner, warm sunlight, soft blanket,
 *                    wooden bookshelf, Scandinavian nursery.
 * - Buku Mewarnai  → crayons, wooden desk, soft natural light, child
 *                    drawing peacefully.
 * - Stiker         → flat-lay sticker sheets on cream paper.
 * - Stiker Doa     → tiny prayer cards / hijaiyah cards, Islamic motifs
 *                    in pastel.
 * - Kaos & Apparel → Korean-kidswear-style: oversized fit, natural
 *                    movement, playful warm atmosphere.
 * - Poster         → minimal pastel print on textured wall, wooden
 *                    frame.
 * - Boneka         → mascot plush on linen, soft daylight.
 * - Aksesoris      → tiny enamel pins / keychains on cream surface.
 *
 * Note: the URLs below are a curated set of Unsplash photos that have
 * been verified to render. They're stand-ins in the right mood until
 * the merchant's real product photography is dropped in — swap each
 * `IMG.*` reference for the actual product photo URL when ready.
 */

/**
 * Verified photo pool — only Unsplash photos whose actual content has
 * been observed rendering correctly on the deployed site. The sandbox
 * network can't reach images.unsplash.com to spot-check, so anything
 * outside this pool risks rendering as an unrelated subject (e.g. the
 * "cozy notebook" ID turned out to be a laptop with code on screen).
 *
 * Swap each `IMG.*` for the merchant's real product photo URL when
 * ready — the names below describe what the photo currently shows.
 */
const IMG = {
  // Books / journals — small library / open notebook flat-lays
  bookshelf:
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80",
  notebookOpen:
    "https://images.unsplash.com/photo-1517842645767-c639042777db?w=900&q=80",
  notebookSpiral:
    "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=900&q=80",

  // Stickers — colorful flat-lay sticker sheets
  stickerColor:
    "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=900&q=80",
  stickerFloral:
    "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=900&q=80",
  stickyNotes:
    "https://images.unsplash.com/photo-1606166325683-e6deb697d301?w=900&q=80",

  // Cards / letters — soft paper goods (used for hijaiyah card mood)
  cardLetter:
    "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=900&q=80",
  cardEnvelope:
    "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=900&q=80",

  // Plush — soft toy on linen
  plushBear:
    "https://images.unsplash.com/photo-1559563458-527698bf5295?w=900&q=80",
  plushPastel:
    "https://images.unsplash.com/photo-1620421680010-0766ff230392?w=900&q=80",

  // Wall art / posters
  posterFrame:
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&q=80",
  posterArt:
    "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=900&q=80",
  pastelWall:
    "https://images.unsplash.com/photo-1486916856361-bf2999da9d57?w=900&q=80",

  // Candles / cozy lifestyle (used for bedtime mood on Goodnight Little Moon)
  candle:
    "https://images.unsplash.com/photo-1602874801007-aa377efa0bc4?w=900&q=80",
  candleFlat:
    "https://images.unsplash.com/photo-1601000938259-9e92002320b2?w=900&q=80",
};

export const CATEGORIES: Category[] = [
  {
    slug: "buku-cerita",
    name: "Buku Cerita",
    emoji: "📖",
    description: "cerita lembut untuk hati yang sedang tumbuh.",
  },
  {
    slug: "buku-mewarnai",
    name: "Buku Mewarnai",
    emoji: "🖍️",
    description: "halaman tenang untuk sore yang pelan.",
  },
  {
    slug: "stiker",
    name: "Stiker",
    emoji: "✨",
    description: "stiker mungil untuk hari-hari yang manis.",
  },
  {
    slug: "stiker-doa",
    name: "Stiker Doa Harian",
    emoji: "🌙",
    description: "pengingat lembut untuk doa-doa kecil.",
  },
  {
    slug: "kaos",
    name: "Kaos & Apparel",
    emoji: "👕",
    description: "kain lembut untuk hari-hari kecil.",
  },
  {
    slug: "poster",
    name: "Poster",
    emoji: "🖼️",
    description: "cetakan hangat untuk dinding rumah.",
  },
  {
    slug: "boneka",
    name: "Boneka",
    emoji: "🧸",
    description: "teman pelukan yang selalu siap.",
  },
  {
    slug: "aksesoris",
    name: "Aksesoris",
    emoji: "🔑",
    description: "pin dan gantungan kunci si kecil.",
  },
];

export const SAMPLE_PRODUCTS: Product[] = [
  // ═══════════════════════════════════════════
  // Buku Cerita
  // ═══════════════════════════════════════════
  {
    id: "p-101",
    name: "Tiny Brave Steps",
    slug: "tiny-brave-steps",
    category: "buku-cerita",
    price: 109000,
    description:
      "Cerita lembut tentang langkah pertama si kecil — keberanian yang tumbuh perlahan, satu halaman setiap malam. Kertas tebal, ilustrasi pastel, dan kata-kata yang menenangkan.",
    tagline: "small stories for growing hearts",
    images: [IMG.bookshelf, IMG.notebookOpen, IMG.notebookSpiral],
    stock: 28,
    bestseller: true,
    featured: true,
  },
  {
    id: "p-102",
    name: "Goodnight Little Moon",
    slug: "goodnight-little-moon",
    category: "buku-cerita",
    price: 119000,
    description:
      "Ritual menjelang tidur yang menenangkan — buku rima lembut untuk dibaca bersama saat lampu malam mulai redup. Sampul kain, sudut tumpul, aman untuk tangan mungil.",
    tagline: "for cozy bedtime moments",
    images: [IMG.bookshelf, IMG.notebookSpiral, IMG.candle],
    stock: 24,
    featured: true,
  },
  {
    id: "p-103",
    name: "Quiet Morning Stories",
    slug: "quiet-morning-stories",
    category: "buku-cerita",
    price: 99000,
    description:
      "Kumpulan delapan cerita pendek untuk pagi yang pelan. Cocok dibaca sambil sarapan, saat cahaya hangat baru menembus tirai. 32 halaman, kertas matte.",
    tagline: "gentle learning for little minds",
    images: [IMG.notebookOpen, IMG.bookshelf, IMG.candleFlat],
    stock: 32,
  },
  {
    id: "p-104",
    name: "My First Feelings Book",
    slug: "my-first-feelings-book",
    category: "buku-cerita",
    price: 115000,
    description:
      "Buku interaktif untuk mengenalkan perasaan pertama — senang, sedih, takut, tenang — dengan ilustrasi lembut dan halaman touch & feel.",
    tagline: "small stories for growing hearts",
    images: [IMG.notebookSpiral, IMG.notebookOpen],
    stock: 18,
    bestseller: true,
  },

  // ═══════════════════════════════════════════
  // Buku Mewarnai
  // ═══════════════════════════════════════════
  {
    id: "p-201",
    name: "Calm Coloring Time",
    slug: "calm-coloring-time",
    category: "buku-mewarnai",
    price: 69000,
    description:
      "Halaman mewarnai bermotif lembut dengan garis tebal dan ruang luas — dirancang untuk anak yang baru belajar memegang krayon. 48 halaman, kertas tebal yang tidak tembus.",
    tagline: "quiet little moments of creativity",
    images: [IMG.stickerColor, IMG.stickerFloral, IMG.stickyNotes],
    stock: 45,
    bestseller: true,
    featured: true,
  },
  {
    id: "p-202",
    name: "Rainy Day Coloring Pages",
    slug: "rainy-day-coloring-pages",
    category: "buku-mewarnai",
    price: 65000,
    description:
      "Halaman mewarnai bertema awan, hujan, dan teh hangat — untuk sore yang mendung. Ditemani secangkir cokelat hangat lebih baik lagi.",
    tagline: "for slow afternoon learning",
    images: [IMG.stickerFloral, IMG.stickyNotes, IMG.stickerColor],
    stock: 38,
  },
  {
    id: "p-203",
    name: "Tiny Hands Coloring Book",
    slug: "tiny-hands-coloring-book",
    category: "buku-mewarnai",
    price: 79000,
    description:
      "Buku mewarnai pertama dengan motif sederhana — pas untuk tangan mungil yang sedang belajar mengontrol gerakan. Bebas BPA, tinta water-based.",
    tagline: "playful pages for curious hands",
    images: [IMG.stickerColor, IMG.stickyNotes],
    stock: 30,
    featured: true,
  },

  // ═══════════════════════════════════════════
  // Stiker
  // ═══════════════════════════════════════════
  {
    id: "p-301",
    name: "Tiny Wins Sticker Pack",
    slug: "tiny-wins-sticker-pack",
    category: "stiker",
    price: 35000,
    description:
      "30 stiker waterproof untuk merayakan kemenangan kecil — 'kamu hebat hari ini', 'istirahat dulu yuk', dan banyak lagi. Tempel di laptop, botol minum, atau jurnal.",
    tagline: "little things that feel comforting",
    images: [IMG.stickerColor, IMG.stickerFloral, IMG.stickyNotes],
    stock: 80,
    bestseller: true,
    featured: true,
  },
  {
    id: "p-302",
    name: "Soft Words Stickers",
    slug: "soft-words-stickers",
    category: "stiker",
    price: 39000,
    description:
      "Stiker dengan kata-kata penyemangat lembut dalam Bahasa Indonesia dan English — cocok ditempel di jurnal, kotak makan, atau laptop kerja.",
    tagline: "small notes for soft days",
    images: [IMG.stickyNotes, IMG.stickerFloral],
    stock: 65,
  },
  {
    id: "p-303",
    name: "Tiny Mo Sticker Sheet",
    slug: "tiny-mo-sticker-sheet",
    category: "stiker",
    price: 29000,
    description:
      "Lembar stiker dengan ilustrasi Mo si maskot dalam berbagai pose — untuk dipajang, dikoleksi, atau dibagikan ke teman sekolah.",
    tagline: "little Mo, little smiles",
    images: [IMG.stickerFloral, IMG.stickerColor],
    stock: 90,
  },

  // ═══════════════════════════════════════════
  // Stiker Doa Harian
  // ═══════════════════════════════════════════
  {
    id: "p-401",
    name: "Doa Harian Sticker Set",
    slug: "doa-harian-sticker-set",
    category: "stiker-doa",
    price: 45000,
    description:
      "Stiker pengingat doa harian untuk anak — sebelum makan, sebelum tidur, masuk dan keluar rumah. Ilustrasi pastel lembut, ukuran pas untuk dinding kamar.",
    tagline: "soft reminders, small prayers",
    images: [IMG.cardLetter, IMG.cardEnvelope, IMG.stickyNotes],
    stock: 50,
    bestseller: true,
    featured: true,
  },
  {
    id: "p-402",
    name: "Adab Pagi Stickers",
    slug: "adab-pagi-stickers",
    category: "stiker-doa",
    price: 49000,
    description:
      "Stiker adab pagi untuk si kecil — bangun tidur, sarapan, bersiap berangkat. Cocok ditempel di kulkas atau cermin kamar mandi sebagai pengingat lembut.",
    tagline: "tiny habits, gentle days",
    images: [IMG.cardEnvelope, IMG.cardLetter],
    stock: 40,
  },

  // ═══════════════════════════════════════════
  // Kaos & Apparel
  // ═══════════════════════════════════════════
  {
    id: "p-501",
    name: "Soft Sunday Tee",
    slug: "soft-sunday-tee",
    category: "kaos",
    price: 139000,
    description:
      "Kaos katun supima organik dengan potongan oversized lembut — sempurna untuk hari Minggu di rumah. Jahitan rata, label dari kain lembut. Ukuran 1–6 tahun.",
    tagline: "tiny clothes for cozy days",
    images: [IMG.plushBear, IMG.plushPastel, IMG.candle],
    stock: 22,
    bestseller: true,
    featured: true,
  },
  {
    id: "p-502",
    name: "Tiny Explorer Shirt",
    slug: "tiny-explorer-shirt",
    category: "kaos",
    price: 149000,
    description:
      "Kaos lengan pendek dengan sablon lembut bertuliskan 'tiny explorer' — kain bernapas dan ringan, untuk anak aktif yang suka berlari di rumput.",
    tagline: "soft cotton for tiny adventures",
    images: [IMG.plushPastel, IMG.plushBear],
    stock: 26,
  },
  {
    id: "p-503",
    name: "Warm Hug Club Tee",
    slug: "warm-hug-club-tee",
    category: "kaos",
    price: 159000,
    description:
      "Kaos panjang katun lembut dengan motif 'warm hug club' di dada — cocok untuk hari sejuk atau dipakai berlapis dengan jaket favoritnya.",
    tagline: "tiny clothes for cozy days",
    images: [IMG.plushBear, IMG.plushPastel],
    stock: 18,
    featured: true,
  },

  // ═══════════════════════════════════════════
  // Poster
  // ═══════════════════════════════════════════
  {
    id: "p-601",
    name: "Tiny Morning Wall Art",
    slug: "tiny-morning-wall-art",
    category: "poster",
    price: 89000,
    description:
      "Poster minimal dengan ilustrasi pagi yang tenang — secangkir teh, tirai yang terbuka, cahaya hangat. Ukuran A3, dicetak di kertas matte premium.",
    tagline: "gentle art for soft rooms",
    images: [IMG.posterFrame, IMG.posterArt, IMG.pastelWall],
    stock: 35,
    bestseller: true,
  },
  {
    id: "p-602",
    name: "Slow Living Print",
    slug: "slow-living-print",
    category: "poster",
    price: 95000,
    description:
      "Poster tipografi 'slow living' dengan warna pastel lembut — untuk mengingatkan diri sendiri agar tidak buru-buru. A3, kertas matte 200gsm.",
    tagline: "a soft reminder on the wall",
    images: [IMG.posterArt, IMG.pastelWall, IMG.posterFrame],
    stock: 40,
    featured: true,
  },
  {
    id: "p-603",
    name: "Asmaul Husna Pastel Poster",
    slug: "asmaul-husna-pastel-poster",
    category: "poster",
    price: 119000,
    description:
      "Poster Asmaul Husna dengan kaligrafi modern dan warna pastel hangat — pas untuk kamar anak. Dicetak di kertas matte premium ukuran A3.",
    tagline: "soft words for warm walls",
    images: [IMG.pastelWall, IMG.posterArt],
    stock: 28,
  },

  // ═══════════════════════════════════════════
  // Boneka
  // ═══════════════════════════════════════════
  {
    id: "p-701",
    name: "Mo Plush",
    slug: "mo-plush",
    category: "boneka",
    price: 169000,
    description:
      "Boneka maskot Mo setinggi 25cm — kain bulu lembut, isi serat poliester anti-alergi, jahitan ganda. Teman pelukan si kecil di kasur atau di perjalanan.",
    tagline: "your tiny pocket comfort",
    images: [IMG.plushBear, IMG.plushPastel],
    stock: 24,
    bestseller: true,
    featured: true,
  },
  {
    id: "p-702",
    name: "Little Hug Plushie",
    slug: "little-hug-plushie",
    category: "boneka",
    price: 129000,
    description:
      "Versi mini dari Mo Plush — setinggi 15cm, cukup kecil untuk masuk tas sekolah. Bisa dicuci dengan mesin (gentle cycle), aman untuk bayi.",
    tagline: "small hugs, anywhere",
    images: [IMG.plushPastel, IMG.plushBear],
    stock: 30,
  },

  // ═══════════════════════════════════════════
  // Aksesoris (Keychain & Pin)
  // ═══════════════════════════════════════════
  {
    id: "p-801",
    name: "Tiny Mo Keychain",
    slug: "tiny-mo-keychain",
    category: "aksesoris",
    price: 49000,
    description:
      "Gantungan kunci Mo dari acrylic glossy dengan rantai logam berlapis emas — cocok untuk kunci rumah, tas sekolah, atau tas si kecil.",
    tagline: "carry a little softness",
    images: [IMG.stickyNotes, IMG.cardEnvelope],
    stock: 60,
    bestseller: true,
  },
  {
    id: "p-802",
    name: "Soft Days Enamel Pin",
    slug: "soft-days-enamel-pin",
    category: "aksesoris",
    price: 39000,
    description:
      "Pin enamel keras dengan ilustrasi Mo dan tulisan 'soft days' — 25mm, warna pastel matte. Pas disematkan di tas, jaket, atau topi favorit.",
    tagline: "little wins, worn proudly",
    images: [IMG.cardEnvelope, IMG.stickyNotes],
    stock: 70,
    featured: true,
  },
  {
    id: "p-803",
    name: "Warm Hug Keychain Set",
    slug: "warm-hug-keychain-set",
    category: "aksesoris",
    price: 59000,
    description:
      "Set tiga gantungan kunci berbeda warna — krem, sage, dan tangerine pastel. Cocok dibagi dengan teman atau dikoleksi sendiri.",
    tagline: "tiny things for everyday",
    images: [IMG.stickyNotes, IMG.cardLetter],
    stock: 45,
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
