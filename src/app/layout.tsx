import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
    default: "Baby Mo — sesuatu yang lembut untuk hari-hari kecil",
    template: "%s · Baby Mo",
  },
  description:
    "Buku cerita anak, buku aktivitas, flashcards Montessori, baju mungil katun organik, dan barang hangat untuk orang tua — dipilih dengan tenang untuk keluarga yang tumbuh pelan-pelan.",
  keywords: [
    "baby mo",
    "babymo",
    "buku anak",
    "buku aktivitas anak",
    "flashcard montessori",
    "baju anak katun organik",
    "homeschool indonesia",
    "parenting lifestyle",
    "slow parenting",
    "tote bag parenting",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://babymo.id",
  ),
  openGraph: {
    title: "Baby Mo — sesuatu yang lembut untuk hari-hari kecil",
    description:
      "Buku cerita, kartu belajar, baju mungil, dan barang hangat untuk keluarga yang tumbuh pelan-pelan.",
    type: "website",
    siteName: "Baby Mo",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baby Mo",
    description: "Sesuatu yang lembut untuk hari-hari kecil.",
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
              <main>{children}</main>
              <Footer />
              <MobileNav />
              <FloatingCartButton />
              <CartDrawer />
            </CartProvider>
          </ToastProvider>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
