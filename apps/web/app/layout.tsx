import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Toaster } from "@/components/ui/Toaster";
import "./globals.css";

/**
 * Layout racine — Cocoa Ranch & Industry
 *
 * Responsabilités :
 * - `<html><body>` globaux
 * - Metadata globale (title, description, OpenGraph, Twitter, robots)
 * - Viewport (themeColor Brandbook)
 * - Skip-link accessibilité
 * - Liens alternates SEO multilingues
 * - NextIntlClientProvider minimal (pour que Navbar/Footer, qui
 *   utilisent `useLocale` via `Link` de `@/i18n/navigation`, aient
 *   accès au contexte même sur les pages hors `[locale]/`).
 *
 * i18n complet (messages) est porté par `app/[locale]/layout.tsx`.
 */

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://cocoa-ranch.africa"),
  title: {
    default: "Cocoa Ranch & Industry — Agropole circulaire au Cameroun",
    template: "%s | Cocoa Ranch & Industry",
  },
  description:
    "Agropole agro-industriel au Cameroun : cacao premium zéro déforestation, provendes animales brevetées OAPI, économie circulaire, traçabilité EUDR. 5 000 producteurs accompagnés, 200 ha de ranch moderne, 18 000 t/an.",
  keywords: [
    "cacao Cameroun",
    "cacao premium",
    "zéro déforestation",
    "EUDR",
    "CacaoTrace",
    "économie circulaire",
    "provendes animales",
    "CRI-PROVEND CACAO",
    "OAPI",
    "AGRO-PME",
    "Bassin du Mungo",
    "Njombé-Penja",
    "investissement cacao",
    "innovation durable",
    "traçabilité cacao",
    "création de valeur",
    "agro-industrie Cameroun",
  ],
  authors: [{ name: "Tchaha Monkam Lorraine Nadia" }, { name: "AGRO-PME Fondation" }],
  creator: "Cocoa Ranch & Industry — Présidente : TCHAHA MONKAM epouse AWUNGIA TAZINYA Lorraine Nadia",
  publisher: "Cocoa Ranch & Industry",
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    url: "/",
    siteName: "COCOA RANCH & INDUSTRY",
    title: "COCOA RANCH & INDUSTRY — N°1 du cacao camerounais",
    description:
      "Cacao premium zéro déforestation, provendes brevetées, 5 000 producteurs accompagnés. Agropole circulaire au Bassin du Mungo.",
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: "COCOA RANCH & INDUSTRY — N°1 du cacao camerounais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "COCOA RANCH & INDUSTRY",
    description: "N°1 du cacao camerounais — Agropole circulaire",
    images: ["/og-default.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1F4A2E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-cri focus:bg-cri-gold focus:px-4 focus:py-2 focus:font-bold focus:text-cri-forest focus:shadow-cri-lg focus:outline-none"
        >
          Aller au contenu principal
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}

