export type Lang = "id" | "en";

export const DEFAULT_LANG: Lang = "id";
export const LANG_STORAGE_KEY = "babymo:lang";

type Dict = {
  // header / nav
  nav_shop: string;
  nav_bestsellers: string;
  nav_faq: string;
  nav_admin: string;
  nav_home: string;
  nav_help: string;
  nav_cart: string;
  nav_search: string;

  // hero
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_shop: string;
  hero_cta_best: string;
  hero_trust_orders: string;
  hero_trust_rating: string;
  hero_trust_packing: string;
  hero_quote: string;
  hero_quote_author: string;

  // sections
  section_featured_eyebrow: string;
  section_featured_title: string;
  section_featured_subtitle: string;
  section_categories_eyebrow: string;
  section_categories_title: string;
  section_categories_subtitle: string;
  section_bestsellers_eyebrow: string;
  section_bestsellers_title: string;
  section_testimonials_eyebrow: string;
  section_testimonials_title: string;
  section_ig_eyebrow: string;
  section_ig_title: string;
  section_ig_cta: string;
  section_faq_eyebrow: string;
  section_faq_title: string;
  section_related_eyebrow: string;
  section_related_title: string;
  see_all: string;

  // products
  product_search_placeholder: string;
  product_filter_all: string;
  product_listing_title: string;
  product_listing_subtitle: string;
  product_bestseller_title: string;
  product_bestseller_active: string;
  product_clear: string;
  product_empty_title: string;
  product_empty_sub: string;
  product_badge_bestseller: string;
  product_badge_sold_out: string;
  product_badge_low_stock: (n: number) => string;
  product_add_aria: string;

  // PDP
  pdp_breadcrumb_home: string;
  pdp_breadcrumb_shop: string;
  pdp_story_eyebrow: string;
  pdp_info_packing: string;
  pdp_info_packing_sub: string;
  pdp_info_eta: string;
  pdp_info_eta_sub: string;
  pdp_info_support: string;
  pdp_info_support_sub: string;
  pdp_info_stock: (n: number) => string;
  pdp_info_stock_sub: string;
  pdp_add_to_bag: string;
  pdp_sold_out: string;
  pdp_consult: string;
  pdp_reviews: string;
  pdp_reviews_meta: string;
  pdp_reviews_placeholder: string;

  // cart drawer
  cart_title: string;
  cart_subtitle_empty: string;
  cart_subtitle_count: (n: number) => string;
  cart_notes_label: string;
  cart_notes_placeholder: string;
  cart_subtotal: string;
  cart_checkout: string;
  cart_helper: string;
  cart_remove: string;
  cart_empty_title: string;
  cart_empty_sub: string;
  cart_empty_cta: string;
  cart_view: string;

  // toasts
  toast_added: (name: string) => string;
  toast_added_qty: (name: string, qty: number) => string;
  toast_amount_copied: string;
  toast_amount_copy_fail: string;
  toast_proof_uploaded: string;
  toast_order_updated: string;
  toast_address_copied: string;
  toast_address_copy_fail: string;
  toast_wrong_passcode: string;
  toast_wa_sent: string;
  toast_wa_gateway_off: string;
  toast_wa_failed: string;
  toast_stock_decremented: (n: number) => string;
  admin_tracking_prompt: string;

  // checkout
  checkout_eyebrow: string;
  checkout_title: string;
  checkout_subtitle: string;
  checkout_form_title: string;
  field_name: string;
  field_name_ph: string;
  field_whatsapp: string;
  field_whatsapp_ph: string;
  field_address: string;
  field_address_ph: string;
  field_city: string;
  field_city_ph: string;
  field_postal: string;
  field_postal_ph: string;
  field_notes: string;
  field_notes_ph: string;
  summary_title: string;
  summary_subtotal: string;
  summary_unique: string;
  summary_unique_chip: string;
  summary_shipping: string;
  summary_shipping_value: string;
  summary_total: string;
  summary_unique_help: string;
  checkout_btn: string;
  checkout_btn_loading: string;
  checkout_terms: string;
  checkout_err_name: string;
  checkout_err_whatsapp: string;
  checkout_err_address: string;
  checkout_err_city: string;
  checkout_err_postal: string;
  checkout_empty_title: string;
  checkout_empty_sub: string;
  checkout_empty_cta: string;

  // payment
  payment_not_found_title: string;
  payment_not_found_sub: string;
  payment_chat: string;
  payment_waiting: string;
  payment_title: string;
  payment_subtitle: string;
  payment_order_id: string;
  payment_amount_caption: string;
  payment_unique_caption: (code: string) => string;
  payment_copy: string;
  payment_steps_title: string;
  payment_step_1: string;
  payment_step_2: string;
  payment_step_3: string;
  payment_step_4: string;
  payment_step_5: string;
  payment_upload: string;
  payment_upload_replace: string;
  payment_uploading: string;
  payment_proof_caption: string;
  payment_help: string;
  back_home: string;

  // success
  success_eyebrow: string;
  success_title: string;
  success_subtitle: string;
  success_order_label: string;
  success_total_label: string;
  success_keep_browsing: string;
  success_msg: string;

  // admin
  admin_title: string;
  admin_subtitle: string;
  admin_passcode_ph: string;
  admin_unlock: string;
  admin_passcode_hint: string;
  admin_refresh: string;
  admin_lock: string;
  admin_dashboard_eyebrow: string;
  admin_dashboard_title: string;
  admin_search_ph: string;
  admin_empty_title: string;
  admin_empty_sub: string;
  admin_tab_all: string;
  admin_tab_pending: string;
  admin_tab_verify: string;
  admin_tab_paid: string;
  admin_tab_packed: string;
  admin_tab_shipped: string;
  admin_tab_completed: string;
  admin_card_items: string;
  admin_card_shipping: string;
  admin_card_proof: string;
  admin_card_proof_empty: string;
  admin_action_wa: string;
  admin_action_copy: string;
  admin_action_label: string;
  admin_action_approve: string;
  admin_action_reject: string;
  admin_action_packed: string;
  admin_action_shipped: string;
  admin_action_completed: string;

  // shipping label
  label_back: string;
  label_print: string;
  label_loading: (id: string) => string;
  label_to: string;
  label_notes: string;
  label_items: string;
  label_created: string;
  label_thanks: string;

  // footer
  footer_tagline: string;
  footer_shop: string;
  footer_shop_all: string;
  footer_help: string;
  footer_help_shipping: string;
  footer_help_wa: string;
  footer_stay: string;
  footer_stay_sub: string;
  footer_rights: string;
  footer_motto: string;

  // language toggle
  lang_label: string;

  // misc
  loading: string;
};

export const STRINGS: Record<Lang, Dict> = {
  id: {
    nav_shop: "Belanja",
    nav_bestsellers: "Terlaris",
    nav_faq: "Tanya Jawab",
    nav_admin: "Admin",
    nav_home: "Beranda",
    nav_help: "Bantuan",
    nav_cart: "Keranjang",
    nav_search: "Cari",

    hero_eyebrow: "Sekarang kirim ke seluruh Indonesia",
    hero_title: "Sesuatu yang lembut.",
    hero_subtitle:
      "Hal-hal kecil untuk hari yang terasa hangat — buku cerita, kartu belajar, dan barang lembut lainnya untuk keluarga yang tumbuh pelan-pelan.",
    hero_cta_shop: "Lihat koleksi",
    hero_cta_best: "Yang paling dicari",
    hero_trust_orders: "🌱 12.000+ keluarga",
    hero_trust_rating: "💌 rating 4,9",
    hero_trust_packing: "📦 packing hari sama",
    hero_quote: "Buku ceritanya jadi ritual sebelum tidur favorit kami.",
    hero_quote_author: "— Sarah, Yogyakarta",

    section_featured_eyebrow: "pilihan",
    section_featured_title: "Untuk hari yang lembut.",
    section_featured_subtitle:
      "Pilihan dari rak kami minggu ini — dikurasi dengan tenang.",
    section_categories_eyebrow: "rak",
    section_categories_title: "Sudut hangat untuk si kecil",
    section_categories_subtitle:
      "Pilih rak yang paling cocok dengan hari kalian hari ini.",
    section_bestsellers_eyebrow: "terlaris",
    section_bestsellers_title:
      "Yang paling sering dipilih para orang tua.",
    section_testimonials_eyebrow: "kata mereka",
    section_testimonials_title:
      "Dari para orang tua yang ingin tumbuh pelan-pelan.",
    section_ig_eyebrow: "@babymo.official",
    section_ig_title: "Momen hangat, dari rumah-rumah kecil di Indonesia.",
    section_ig_cta: "Ikuti kami →",
    section_faq_eyebrow: "pertanyaan umum",
    section_faq_title: "Jawaban lembut untuk yang ingin tahu.",
    section_related_eyebrow: "mungkin kamu suka juga",
    section_related_title: "Dari rak hangat yang sama.",
    see_all: "Lihat semua →",

    product_search_placeholder: "Cari buku, stiker, kaos, boneka…",
    product_filter_all: "Semua",
    product_listing_title: "Rak lengkap untuk hari-hari kecil.",
    product_listing_subtitle:
      "Dipilih dengan tenang untuk keluarga yang tumbuh pelan-pelan.",
    product_bestseller_title: "Yang paling dicintai komunitas kami.",
    product_bestseller_active: "Menampilkan yang terlaris ·",
    product_clear: "hapus",
    product_empty_title: "Belum ada di sini.",
    product_empty_sub:
      "Coba pencarian atau kategori lain — kami selalu menambah hal-hal lembut.",
    product_badge_bestseller: "Terlaris",
    product_badge_sold_out: "Habis",
    product_badge_low_stock: (n) => `Tinggal ${n} lagi`,
    product_add_aria: "Tambahkan ke keranjang",

    pdp_breadcrumb_home: "Beranda",
    pdp_breadcrumb_shop: "Belanja",
    pdp_story_eyebrow: "cerita kecilnya",
    pdp_info_packing: "Packing hari sama",
    pdp_info_packing_sub: "sebelum 15.00 WIB",
    pdp_info_eta: "Estimasi 2–5 hari",
    pdp_info_eta_sub: "seluruh Indonesia",
    pdp_info_support: "Bantuan WhatsApp",
    pdp_info_support_sub: "manusia sungguhan",
    pdp_info_stock: (n) => `Stok: ${n}`,
    pdp_info_stock_sub: "siap kirim",
    pdp_add_to_bag: "Masukkan keranjang",
    pdp_sold_out: "Stok habis",
    pdp_consult: "Tanya tentang produk ini di WhatsApp",
    pdp_reviews: "Ulasan",
    pdp_reviews_meta: "4,9 · 128 ulasan",
    pdp_reviews_placeholder:
      "Ulasan terverifikasi dari komunitas kami segera hadir 🌷",

    cart_title: "Keranjangmu",
    cart_subtitle_empty: "Sedang tenang dan kosong di sini",
    cart_subtitle_count: (n) =>
      `${n} produk sedang istirahat dengan tenang`,
    cart_notes_label: "Catatan pengiriman (opsional)",
    cart_notes_placeholder:
      "mis. tolong bungkus rapi, ini hadiah 🌷",
    cart_subtotal: "Subtotal",
    cart_checkout: "Checkout",
    cart_helper: "Ongkir dihitung saat checkout · Konfirmasi via WhatsApp",
    cart_remove: "Hapus",
    cart_empty_title: "Keranjangmu sedang istirahat sebentar.",
    cart_empty_sub:
      "Temukan sesuatu yang lembut untuk menemani harimu.",
    cart_empty_cta: "Jelajahi produk",
    cart_view: "Lihat keranjang",

    toast_added: (name) => `${name} ditambahkan 🌷`,
    toast_added_qty: (name, qty) => `${name} × ${qty} ditambahkan 🌷`,
    toast_amount_copied: "Nominal disalin 🌷",
    toast_amount_copy_fail: "Tidak bisa menyalin. Mohon salin manual.",
    toast_proof_uploaded:
      "Bukti diunggah — kami verifikasi segera 💌",
    toast_order_updated: "Order diperbarui 🌷",
    toast_address_copied: "Alamat disalin 📋",
    toast_address_copy_fail: "Tidak bisa menyalin",
    toast_wrong_passcode: "Passcode salah",
    toast_wa_sent: "Pesan WhatsApp terkirim 💬",
    toast_wa_gateway_off:
      "Status disimpan. Gateway WhatsApp belum aktif.",
    toast_wa_failed: "WhatsApp gagal terkirim",
    toast_stock_decremented: (n) => `Stok ${n} produk diperbarui 🌱`,
    admin_tracking_prompt: "Nomor resi pengiriman (opsional):",

    checkout_eyebrow: "checkout",
    checkout_title: "Tinggal beberapa detail lembut.",
    checkout_subtitle:
      "Kami akan konfirmasi pesananmu via WhatsApp setelah ini.",
    checkout_form_title: "Detail pengiriman",
    field_name: "Nama lengkap",
    field_name_ph: "Maria Putri",
    field_whatsapp: "Nomor WhatsApp",
    field_whatsapp_ph: "08123456789",
    field_address: "Alamat lengkap",
    field_address_ph:
      "Jl. Melati No. 12, RT 03/RW 05, Kel. Mawar",
    field_city: "Kota",
    field_city_ph: "Bandung",
    field_postal: "Kode pos",
    field_postal_ph: "40115",
    field_notes: "Catatan pengiriman (opsional)",
    field_notes_ph: "tolong bungkus rapi, ini hadiah 🌷",
    summary_title: "Ringkasan pesanan",
    summary_subtotal: "Subtotal",
    summary_unique: "Kode unik",
    summary_unique_chip: "otomatis",
    summary_shipping: "Ongkir",
    summary_shipping_value: "dikonfirmasi via WhatsApp",
    summary_total: "Total",
    summary_unique_help:
      "Kode unik membantu kami mencocokkan pembayaranmu dengan cepat. Mohon transfer dengan nominal pas.",
    checkout_btn: "Checkout via WhatsApp",
    checkout_btn_loading: "Membuka WhatsApp…",
    checkout_terms:
      "Dengan melanjutkan, kamu setuju dihubungi via WhatsApp tentang pesananmu.",
    checkout_err_name: "Nama tidak boleh kosong",
    checkout_err_whatsapp: "Nomor WhatsApp tidak valid",
    checkout_err_address: "Alamat tidak boleh kosong",
    checkout_err_city: "Kota tidak boleh kosong",
    checkout_err_postal: "Kode pos tidak valid",
    checkout_empty_title: "Keranjangmu kosong.",
    checkout_empty_sub:
      "Tambahkan sesuatu yang lembut dulu, lalu kembali ke sini.",
    checkout_empty_cta: "Lihat toko",

    payment_not_found_title:
      "Hmm, kami tidak menemukan order itu di perangkat ini.",
    payment_not_found_sub:
      "Kalau kamu sudah checkout, pesananmu aman bersama kami — chat saja via WhatsApp.",
    payment_chat: "Chat kami di WhatsApp",
    payment_waiting: "Menunggu pembayaranmu",
    payment_title: "Hampir selesai.",
    payment_subtitle:
      "Scan QRIS di bawah dan bayar dengan nominal pas. Lalu unggah buktinya — kami verifikasi dalam beberapa menit.",
    payment_order_id: "ID Order",
    payment_amount_caption: "Bayar dengan nominal pas",
    payment_unique_caption: (code) => `termasuk kode unik ${code}`,
    payment_copy: "Salin nominal",
    payment_steps_title: "5 langkah lembut",
    payment_step_1: "Buka e-wallet atau aplikasi bankmu",
    payment_step_2: "Scan QRIS di atas",
    payment_step_3: "Bayar dengan nominal pas, termasuk kode unik",
    payment_step_4: "Unggah bukti pembayaran di bawah",
    payment_step_5: "Kami konfirmasi via WhatsApp 💖",
    payment_upload: "Unggah bukti pembayaran",
    payment_upload_replace: "Ganti bukti pembayaran",
    payment_uploading: "Mengunggah…",
    payment_proof_caption: "Preview bukti yang diunggah:",
    payment_help: "Butuh bantuan? Chat kami di WhatsApp",
    back_home: "← Kembali ke beranda",

    success_eyebrow: "terima kasih",
    success_title: "Pesananmu sedang dalam proses verifikasi.",
    success_subtitle:
      "Kami konfirmasi via WhatsApp segera. Tarik napas dalam — kamu sudah melakukan hal lembut hari ini.",
    success_order_label: "Order",
    success_total_label: "Total dibayar",
    success_keep_browsing: "Terus jelajahi",
    success_msg: "Chat Baby Mo",

    admin_title: "Admin Baby Mo",
    admin_subtitle: "Masukkan passcode untuk lanjut.",
    admin_passcode_ph: "Passcode",
    admin_unlock: "Buka",
    admin_passcode_hint:
      "Passcode dev default: babymo2026 — ubah via NEXT_PUBLIC_ADMIN_PASSCODE.",
    admin_refresh: "Refresh",
    admin_lock: "Kunci",
    admin_dashboard_eyebrow: "dashboard",
    admin_dashboard_title: "Antrian lembut hari ini.",
    admin_search_ph: "Cari ID order, nama, WhatsApp, kota...",
    admin_empty_title: "Semua sudah dikerjakan.",
    admin_empty_sub:
      "Pesanan baru muncul di sini otomatis — tarik napas lembut 💖",
    admin_tab_all: "Semua",
    admin_tab_pending: "Belum bayar",
    admin_tab_verify: "Verifikasi",
    admin_tab_paid: "Dibayar",
    admin_tab_packed: "Packing",
    admin_tab_shipped: "Dikirim",
    admin_tab_completed: "Selesai",
    admin_card_items: "Produk",
    admin_card_shipping: "Pengiriman",
    admin_card_proof: "Bukti pembayaran",
    admin_card_proof_empty: "Belum ada bukti yang diunggah",
    admin_action_wa: "💬 WhatsApp customer",
    admin_action_copy: "📋 Salin alamat",
    admin_action_label: "🏷 Cetak label",
    admin_action_approve: "✓ Setujui pembayaran",
    admin_action_reject: "✗ Tolak",
    admin_action_packed: "📦 Tandai packed",
    admin_action_shipped: "🚚 Tandai dikirim",
    admin_action_completed: "🌷 Tandai selesai",

    label_back: "← Kembali ke admin",
    label_print: "🖨 Cetak label",
    label_loading: (id) => `Memuat label untuk ${id}…`,
    label_to: "Kepada",
    label_notes: "Catatan",
    label_items: "Produk",
    label_created: "Dibuat",
    label_thanks: "terima kasih sudah memilih lembut 🌷",

    footer_tagline:
      "Kenyamanan kecil untuk hari-hari kamu. Dibuat di Indonesia dengan banyak cinta.",
    footer_shop: "Belanja",
    footer_shop_all: "Semua produk",
    footer_help: "Bantuan",
    footer_help_shipping: "Pengiriman",
    footer_help_wa: "WhatsApp kami",
    footer_stay: "Tetap lembut",
    footer_stay_sub:
      "Ikuti @babymo.id untuk drop produk dan pengumuman lembut.",
    footer_rights: "Dibuat dengan cinta di Indonesia.",
    footer_motto: "Soft things for soft people. 🌷",

    lang_label: "Bahasa",
    loading: "Memuat…",
  },

  en: {
    nav_shop: "Shop",
    nav_bestsellers: "Bestsellers",
    nav_faq: "FAQ",
    nav_admin: "Admin",
    nav_home: "Home",
    nav_help: "Help",
    nav_cart: "Cart",
    nav_search: "Search",

    hero_eyebrow: "Now shipping across Indonesia",
    hero_title: "Something soft.",
    hero_subtitle:
      "Tiny moments for growing hearts — storybooks, learning cards, and gentle things for families growing slowly.",
    hero_cta_shop: "Browse the shelf",
    hero_cta_best: "Most loved",
    hero_trust_orders: "🌱 12,000+ families",
    hero_trust_rating: "💌 4.9 average rating",
    hero_trust_packing: "📦 Same-day packing",
    hero_quote: "The storybook is now our favourite bedtime ritual.",
    hero_quote_author: "— Sarah, Yogyakarta",

    section_featured_eyebrow: "this week",
    section_featured_title: "For softer days.",
    section_featured_subtitle:
      "Picks from our shelf this week — chosen quietly.",
    section_categories_eyebrow: "shelves",
    section_categories_title: "Warm corners for little ones",
    section_categories_subtitle:
      "Pick the shelf that fits your family's day today.",
    section_bestsellers_eyebrow: "most loved",
    section_bestsellers_title: "Most loved by other parents.",
    section_testimonials_eyebrow: "kind words",
    section_testimonials_title:
      "From parents choosing to grow slowly.",
    section_ig_eyebrow: "@babymo.official",
    section_ig_title: "Warm moments, from small homes across Indonesia.",
    section_ig_cta: "Follow us →",
    section_faq_eyebrow: "frequently asked",
    section_faq_title: "Soft answers for curious parents.",
    section_related_eyebrow: "you might also love",
    section_related_title: "From the same warm shelf.",
    see_all: "See all →",

    product_search_placeholder: "Search storybooks, stickers, tees, plush…",
    product_filter_all: "All",
    product_listing_title: "Our full shelf for small days.",
    product_listing_subtitle:
      "Carefully chosen for families growing gently — quietly stocked, never rushed.",
    product_bestseller_title: "Most loved by our community.",
    product_bestseller_active: "Showing most loved ·",
    product_clear: "clear",
    product_empty_title: "Nothing here yet.",
    product_empty_sub:
      "Try a different search or category — we're stocking gentle things all the time.",
    product_badge_bestseller: "Bestseller",
    product_badge_sold_out: "Sold out",
    product_badge_low_stock: (n) => `Only ${n} left`,
    product_add_aria: "Add to cart",

    pdp_breadcrumb_home: "Home",
    pdp_breadcrumb_shop: "Shop",
    pdp_story_eyebrow: "the little story",
    pdp_info_packing: "Same-day packing",
    pdp_info_packing_sub: "before 3pm WIB",
    pdp_info_eta: "Est. 2–5 days",
    pdp_info_eta_sub: "across Indonesia",
    pdp_info_support: "WhatsApp support",
    pdp_info_support_sub: "real humans",
    pdp_info_stock: (n) => `Stock: ${n}`,
    pdp_info_stock_sub: "ready to ship",
    pdp_add_to_bag: "Add to bag",
    pdp_sold_out: "Sold out",
    pdp_consult: "Ask about this product on WhatsApp",
    pdp_reviews: "Reviews",
    pdp_reviews_meta: "4.9 · 128 reviews",
    pdp_reviews_placeholder:
      "Verified reviews from our community coming soon 🌷",

    cart_title: "Your bag",
    cart_subtitle_empty: "It's quietly empty in here",
    cart_subtitle_count: (n) =>
      `${n} item${n > 1 ? "s" : ""} resting softly`,
    cart_notes_label: "Delivery notes (optional)",
    cart_notes_placeholder:
      "e.g. tolong bungkus rapi, ini hadiah 🌷",
    cart_subtotal: "Subtotal",
    cart_checkout: "Checkout",
    cart_helper: "Shipping calculated at checkout · WhatsApp confirmation",
    cart_remove: "Remove",
    cart_empty_title: "Your bag is taking a quiet moment.",
    cart_empty_sub:
      "Find something gentle to keep you company today.",
    cart_empty_cta: "Browse products",
    cart_view: "View cart",

    toast_added: (name) => `${name} added 🌷`,
    toast_added_qty: (name, qty) => `${name} × ${qty} added 🌷`,
    toast_amount_copied: "Amount copied 🌷",
    toast_amount_copy_fail: "Couldn't copy. Please copy manually.",
    toast_proof_uploaded:
      "Proof uploaded — we'll verify shortly 💌",
    toast_order_updated: "Order updated 🌷",
    toast_address_copied: "Address copied 📋",
    toast_address_copy_fail: "Couldn't copy",
    toast_wrong_passcode: "Wrong passcode",
    toast_wa_sent: "WhatsApp message sent 💬",
    toast_wa_gateway_off: "Status saved. WhatsApp gateway not active yet.",
    toast_wa_failed: "WhatsApp couldn't send",
    toast_stock_decremented: (n) => `Stock updated for ${n} item${n > 1 ? "s" : ""} 🌱`,
    admin_tracking_prompt: "Tracking number (optional):",

    checkout_eyebrow: "checkout",
    checkout_title: "Just a few soft details.",
    checkout_subtitle:
      "We'll confirm your order through WhatsApp right after this.",
    checkout_form_title: "Delivery details",
    field_name: "Full name",
    field_name_ph: "Maria Putri",
    field_whatsapp: "WhatsApp number",
    field_whatsapp_ph: "08123456789",
    field_address: "Full address",
    field_address_ph:
      "Jl. Melati No. 12, RT 03/RW 05, Kel. Mawar",
    field_city: "City",
    field_city_ph: "Bandung",
    field_postal: "Postal code",
    field_postal_ph: "40115",
    field_notes: "Delivery notes (optional)",
    field_notes_ph: "tolong bungkus rapi, ini hadiah 🌷",
    summary_title: "Order summary",
    summary_subtotal: "Subtotal",
    summary_unique: "Unique code",
    summary_unique_chip: "auto",
    summary_shipping: "Shipping",
    summary_shipping_value: "confirmed via WhatsApp",
    summary_total: "Total",
    summary_unique_help:
      "The unique code helps us match your payment instantly. Please transfer the exact amount.",
    checkout_btn: "Checkout via WhatsApp",
    checkout_btn_loading: "Opening WhatsApp…",
    checkout_terms:
      "By continuing, you agree to be contacted via WhatsApp about your order.",
    checkout_err_name: "Name cannot be empty",
    checkout_err_whatsapp: "Invalid WhatsApp number",
    checkout_err_address: "Address cannot be empty",
    checkout_err_city: "City cannot be empty",
    checkout_err_postal: "Invalid postal code",
    checkout_empty_title: "Your bag is empty.",
    checkout_empty_sub:
      "Add something gentle first, then come back here.",
    checkout_empty_cta: "Browse the shop",

    payment_not_found_title:
      "Hmm, we can't find that order on this device.",
    payment_not_found_sub:
      "If you completed checkout, your order is safe with us — just message us on WhatsApp.",
    payment_chat: "Chat us on WhatsApp",
    payment_waiting: "Waiting for your payment",
    payment_title: "Almost there.",
    payment_subtitle:
      "Scan the QRIS below and pay the exact amount. Then upload your proof — we'll verify within a few minutes.",
    payment_order_id: "Order ID",
    payment_amount_caption: "Pay exactly this amount",
    payment_unique_caption: (code) => `includes unique code ${code}`,
    payment_copy: "Copy amount",
    payment_steps_title: "5 gentle steps",
    payment_step_1: "Open your e-wallet or banking app",
    payment_step_2: "Scan the QRIS above",
    payment_step_3:
      "Pay the exact amount, including the unique code",
    payment_step_4: "Upload your payment proof below",
    payment_step_5: "We'll confirm via WhatsApp 💖",
    payment_upload: "Upload payment proof",
    payment_upload_replace: "Replace payment proof",
    payment_uploading: "Uploading…",
    payment_proof_caption: "Uploaded proof preview:",
    payment_help: "Need help? Chat us on WhatsApp",
    back_home: "← Back to home",

    success_eyebrow: "thank you",
    success_title:
      "Your order is on its way to being verified.",
    success_subtitle:
      "We'll confirm via WhatsApp shortly. Take a deep breath — you've done the soft thing today.",
    success_order_label: "Order",
    success_total_label: "Total paid",
    success_keep_browsing: "Keep browsing",
    success_msg: "Message Baby Mo",

    admin_title: "Baby Mo admin",
    admin_subtitle: "Enter passcode to continue.",
    admin_passcode_ph: "Passcode",
    admin_unlock: "Unlock",
    admin_passcode_hint:
      "Default dev passcode: babymo2026 — change via NEXT_PUBLIC_ADMIN_PASSCODE.",
    admin_refresh: "Refresh",
    admin_lock: "Lock",
    admin_dashboard_eyebrow: "dashboard",
    admin_dashboard_title: "Today's gentle queue.",
    admin_search_ph: "Search order ID, name, WhatsApp, city…",
    admin_empty_title: "All caught up here.",
    admin_empty_sub:
      "New orders show up here automatically — take a soft breath 💖",
    admin_tab_all: "All",
    admin_tab_pending: "Pending payment",
    admin_tab_verify: "Verify",
    admin_tab_paid: "Paid",
    admin_tab_packed: "Packing",
    admin_tab_shipped: "Shipped",
    admin_tab_completed: "Completed",
    admin_card_items: "Items",
    admin_card_shipping: "Shipping",
    admin_card_proof: "Payment proof",
    admin_card_proof_empty: "No proof uploaded yet",
    admin_action_wa: "💬 WhatsApp customer",
    admin_action_copy: "📋 Copy address",
    admin_action_label: "🏷 Print label",
    admin_action_approve: "✓ Approve payment",
    admin_action_reject: "✗ Reject",
    admin_action_packed: "📦 Mark packed",
    admin_action_shipped: "🚚 Mark shipped",
    admin_action_completed: "🌷 Mark completed",

    label_back: "← Back to admin",
    label_print: "🖨 Print label",
    label_loading: (id) => `Loading label for ${id}…`,
    label_to: "To",
    label_notes: "Notes",
    label_items: "Items",
    label_created: "Created",
    label_thanks: "thank you for choosing soft 🌷",

    footer_tagline:
      "Small comforts for your everyday moments. Designed in Indonesia, with so much love.",
    footer_shop: "Shop",
    footer_shop_all: "All products",
    footer_help: "Help",
    footer_help_shipping: "Shipping",
    footer_help_wa: "WhatsApp us",
    footer_stay: "Stay soft",
    footer_stay_sub:
      "Follow @babymo.id for gentle drops and quiet announcements.",
    footer_rights: "Made with care in Indonesia.",
    footer_motto: "Soft things for soft people. 🌷",

    lang_label: "Language",
    loading: "Loading…",
  },
};

export function getDict(lang: Lang): Dict {
  return STRINGS[lang] ?? STRINGS[DEFAULT_LANG];
}
