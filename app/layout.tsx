import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { restaurant } from "@/data/restaurant";
import { CustomerLayoutShell } from "@/components/customer-layout-shell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const heading = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kebab-house.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${restaurant.name} — ${restaurant.tagline}`,
    template: `%s — ${restaurant.name}`,
  },
  description: `Kebab 100% Halal a Policoro, ${restaurant.address.fullAddress}. Prenota il tuo tavolo online.`,
  keywords: [
    "kebab Policoro",
    "kebab halal Policoro",
    "street food Policoro",
    "Kebab House",
    "prenotazione kebab",
    "Via Dante Alighieri Policoro",
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    title: `${restaurant.name} — ${restaurant.tagline}`,
    description: "Kebab 100% Halal a Policoro. Menù e prenotazione tavolo online.",
    siteName: restaurant.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f1e6",
  width: "device-width",
  initialScale: 1,
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: restaurant.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: restaurant.address.street,
    addressLocality: restaurant.address.city,
    postalCode: restaurant.address.postalCode,
    addressRegion: restaurant.address.province,
    addressCountry: restaurant.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: restaurant.coords.lat,
    longitude: restaurant.coords.lng,
  },
  telephone: restaurant.phone,
  url: siteUrl,
  servesCuisine: restaurant.cuisine,
  priceRange: restaurant.priceRange,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${inter.variable} ${heading.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <CustomerLayoutShell>{children}</CustomerLayoutShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </body>
    </html>
  );
}
