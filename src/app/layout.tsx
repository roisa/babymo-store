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
import {
  SITE_DESCRIPTION_ID,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TAGLINE_ID,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE_ID.toLowerCase().replace(/\.$/, "")}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION_ID,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "shopping",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE_ID}`,
    description: SITE_DESCRIPTION_ID,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_TAGLINE_ID,
  },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%232BB14C'/%3E%3Ctext y='.9em' font-size='80' x='12' fill='white'%3E%F0%9F%8C%B1%3C/text%3E%3C/svg%3E",
        type: "image/svg+xml",
      },
    ],
    apple: {
      url:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'%3E%3Crect width='180' height='180' rx='40' fill='%232BB14C'/%3E%3Ctext y='.9em' font-size='140' x='22' fill='white'%3E%F0%9F%8C%B1%3C/text%3E%3C/svg%3E",
    },
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF7EC" },
    { media: "(prefers-color-scheme: dark)", color: "#2BB14C" },
  ],
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
        {/* Speed up the first hit to our product photo CDN */}
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin=""
        />
        <link
          rel="dns-prefetch"
          href="https://images.unsplash.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
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
