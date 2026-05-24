import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import FloatingCartButton from "@/components/FloatingCartButton";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: {
    default: "Baby Mo — small comforts for your everyday moments",
    template: "%s · Baby Mo",
  },
  description:
    "Baby Mo creates emotional journals, mood stickers, affirmation cards, and cozy lifestyle products designed to make your everyday a little softer.",
  keywords: [
    "baby mo",
    "babymo",
    "emotional journal",
    "self care indonesia",
    "stationery",
    "wellness",
    "cozy lifestyle",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://babymo.id",
  ),
  openGraph: {
    title: "Baby Mo — small comforts for your everyday moments",
    description:
      "Emotional journals, mood stickers, affirmation cards and cozy little things.",
    type: "website",
    siteName: "Baby Mo",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baby Mo",
    description: "Small comforts for your everyday moments.",
  },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%8C%B7%3C/text%3E%3C/svg%3E",
        type: "image/svg+xml",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#FBF6EE",
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
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh">
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
      </body>
    </html>
  );
}
