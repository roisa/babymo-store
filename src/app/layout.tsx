import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import FloatingCartButton from "@/components/FloatingCartButton";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: {
    default: "Baby Mo — kenyamanan kecil untuk hari-hari kamu",
    template: "%s · Baby Mo",
  },
  description:
    "Baby Mo membuat jurnal emosional, mood stickers, kartu afirmasi, dan barang lifestyle lembut untuk membuat harimu sedikit lebih hangat.",
  keywords: [
    "baby mo",
    "babymo",
    "jurnal emosional",
    "self care indonesia",
    "stationery",
    "wellness",
    "cozy lifestyle",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://babymo.id",
  ),
  openGraph: {
    title: "Baby Mo — kenyamanan kecil untuk hari-hari kamu",
    description:
      "Jurnal emosional, mood stickers, kartu afirmasi, dan barang lembut lainnya.",
    type: "website",
    siteName: "Baby Mo",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baby Mo",
    description: "Kenyamanan kecil untuk hari-hari kamu.",
  },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%23F58A2E'/%3E%3Ctext y='.9em' font-size='80' x='12' fill='white'%3E%F0%9F%8C%B1%3C/text%3E%3C/svg%3E",
        type: "image/svg+xml",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#2BB14C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin=""
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh">
        <LanguageProvider>
          <ToastProvider>
            <CartProvider>
              <Header />
              <main className="pb-32 sm:pb-12">{children}</main>
              <Footer />
              <MobileNav />
              <FloatingCartButton />
              <CartDrawer />
            </CartProvider>
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
