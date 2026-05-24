# Baby Mo 🌱

> Kenyamanan kecil untuk hari-hari kamu.

A production-ready, mobile-first ecommerce web app for **Baby Mo** — a modern
emotional creator-commerce brand focused on comfort, self-expression, and
cozy lifestyle products. Built for Indonesian WhatsApp-native shopping
behaviour.

**Default language: Indonesian** (ID). Toggle to English (EN) from the
header — the choice persists across visits via `localStorage`.

**Visual identity** follows the babymo.id brand: chunky rounded display
type (Fredoka), vibrant grass green (#2BB14C), playful tangerine
(#F58A2E), sunny yellow highlights, warm cream backgrounds, and 3D-toy
"pop" shadow blocks.

This is not a marketplace clone. It's a playful, premium-feeling store
that pairs the babymo brand identity with a lightweight operational backend
(WhatsApp checkout, static QRIS, semi-automatic verification).

---

## Tech stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** end to end
- **Tailwind CSS** with a custom soft pastel design system
- **Supabase** for products / orders / payments (optional in dev — the app
  falls back to a sample catalogue + `localStorage`)
- **localStorage** cart with cross-tab sync
- **wa.me deep links** for Phase 1 WhatsApp checkout
- **Fonnte-ready** WhatsApp service layer for Phase 2 transactional messages
- Vercel-ready (zero config)

---

## Quick start

```bash
# 1. install dependencies
npm install

# 2. (optional) configure environment
cp .env.example .env.local

# 3. run dev
npm run dev
# → http://localhost:3000
```

The app runs **without any env vars** — it will use the bundled sample
products and persist orders to `localStorage`. Add Supabase keys to switch
to a real database.

### Useful scripts

```bash
npm run dev        # local dev with Turbopack
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # global shell (header / footer / cart drawer)
│   ├── page.tsx                # homepage
│   ├── globals.css             # tailwind + design tokens
│   ├── products/
│   │   ├── page.tsx            # product listing + search + filters
│   │   └── [slug]/
│   │       ├── page.tsx        # PDP (SSG)
│   │       └── ProductDetailClient.tsx
│   ├── categories/[category]/page.tsx
│   ├── checkout/page.tsx       # delivery form + summary
│   ├── payment/[orderId]/page.tsx     # QRIS + upload proof
│   ├── order-success/[orderId]/page.tsx
│   ├── admin/page.tsx          # dashboard (passcode-gated)
│   ├── shipping-label/[orderId]/page.tsx  # printable label
│   └── api/
│       ├── orders/route.ts
│       ├── orders/[orderId]/route.ts
│       ├── upload-proof/route.ts
│       └── send-whatsapp/route.ts
├── components/                 # Header, Footer, MobileNav, CartDrawer,
│                               # ProductCard, Hero, QuoteCarousel,
│                               # Testimonials, FAQ, TrustBadges,
│                               # InstagramGallery, ShippingLabel, ...
├── context/                    # CartProvider, ToastProvider
├── lib/
│   ├── products.ts             # sample catalogue + categories
│   ├── cart.ts                 # localStorage cart helpers
│   ├── orders.ts               # localStorage order store (fallback)
│   ├── supabase.ts             # browser + service-role clients
│   ├── whatsapp.ts             # wa.me builders + Fonnte transactional API
│   └── utils.ts                # formatIDR, generateOrderId, …
├── types/index.ts              # Product, Order, CartItem, …
└── …
public/manifest.webmanifest     # PWA-ready
supabase/schema.sql             # database schema
```

---

## Features

### Shopping
- Elegant emotional hero, quote carousel, testimonials, IG gallery, FAQ
- Mobile-first product browsing + sticky search/filter bar
- Detailed PDP with gallery, emotional storytelling, related products
- WhatsApp consultation link on every PDP

### Cart
- `localStorage` persistence, cross-tab updates via `storage` event
- Slide-out cart drawer with quantity stepper + delivery notes
- Floating "view cart" pill on desktop, sticky mobile checkout bar on PDP
- Calming empty-state illustration

### Checkout
- Lightweight form (name, WA, address, city, postal code, notes)
- Generates `BMYYMMDDNNNN` order ID + **unique payment code** (e.g.
  `Rp89.000 → Rp89.237`) so payments can be matched semi-automatically
- Opens `wa.me/<store>?text=<prefilled message>` in a new tab
- Saves order to Supabase (if configured) **and** `localStorage`

### Payment
- Calm QRIS page with countdown, copy-amount button, payment instructions
- Upload payment proof (stored locally for the customer + sent to
  `/api/upload-proof` for the server)
- Order success page with a gentle WhatsApp follow-up

### Admin dashboard (`/admin`)
- Passcode-gated client view (replace with real auth for production)
- Tabs by status, fuzzy search, expandable order cards
- Preview uploaded proof, one-click WhatsApp customer, copy address,
  print shipping label
- Approve / reject payment, mark packed / shipped / completed

### Shipping label (`/shipping-label/[orderId]`)
- 100×150 mm thermal-printer friendly
- Customer + items + notes + order ID + QR placeholder
- `@media print` rules clean up the layout

---

## WhatsApp integration

### Phase 1 — wa.me deep links (working out of the box)
The checkout opens WhatsApp with a prefilled message:

```
Halo Baby Mo 🌷

Saya ingin order (ID: BM2605240219):
• 1x Baby Mo Emotional Journal = Rp89.000
• 1x Mood Sticker Pack         = Rp35.000

TOTAL PEMBAYARAN:
Rp124.237

DATA PENERIMA:
Nama: ...
Nomor WA: ...
Alamat Lengkap: ...
Kode Pos: ...
Catatan Pengiriman: ...

Terima kasih 💖
```

Set the destination number with `NEXT_PUBLIC_WHATSAPP_NUMBER`.

### Phase 2 — Fonnte transactional messages (ready)
`src/lib/whatsapp.ts` ships with `sendPaymentConfirmed`,
`sendOrderShipped`, and `sendThankYouMessage`. They route through
`sendMessage(to, message)` which is wired to **Fonnte** by default — swap
this single function to upgrade to **WhatsApp Cloud API** or an
AI-driven chatbot later.

Trigger from the admin dashboard:

```bash
curl -X POST http://localhost:3000/api/send-whatsapp \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "payment_confirmed",
    "order": { "order_id": "BM2605240219", "customer_name": "Maria", "whatsapp": "628123…" }
  }'
```

Requires `FONNTE_API_KEY` in the environment.

---

## Database

Run `supabase/schema.sql` in the Supabase SQL editor to create:

- `products` — public read
- `orders` — public insert, service-role read/update
- `payments` — public insert, service-role read/update

Create a private storage bucket for payment proofs:

```sql
select storage.create_bucket('payment-proofs', public => false);
```

The app degrades gracefully if Supabase isn't configured: the API routes
no-op, and the client keeps a local order history in `localStorage`.

---

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | optional | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | optional | Supabase anon key (browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | optional | Server-side writes |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | yes (default `6281234567890`) | Store WA number |
| `WHATSAPP_NUMBER` | optional | Server-side fallback |
| `FONNTE_API_KEY` | Phase 2 | Outbound WA via Fonnte |
| `FONNTE_API_URL` | optional | Defaults to `https://api.fonnte.com/send` |
| `NEXT_PUBLIC_ADMIN_PASSCODE` | optional | Demo admin gate (default `babymo2026`) |
| `NEXT_PUBLIC_SITE_URL` | optional | Used in metadata / OG |

See [`.env.example`](./.env.example) for a copy-pasteable template.

---

## Deployment

Vercel-ready — just import the repo, paste env vars, deploy. No edge
functions, no special config required. The app also runs on any Node 20+
runtime (`npm run build && npm run start`).

---

## Design philosophy

Combining Apple cleanliness, Korean/Japanese soft UI, Pinterest visual
calm, and modern creator-commerce — pastel pinks, lavenders, creams, and
warm beiges, with elegant serif display type for emotional warmth.
Everything is mobile-first, with subtle glassmorphism, gentle micro
animations, and silence where silence helps.

Soft things for soft people. 🌷
