import type { Metadata, Viewport } from "next";
import "./globals.css";

/**
 * Layout racine — Cocoa Ranch & Industry
 *
 * SÉCURITÉ :
 * - MetadataBase défini
 * - robots par défaut = index, follow
 * - format-detection désactivé (téléphone, adresse)
 * - metadata color = Brandbook (forêt)
 *
 * i18n géré via middleware + next-intl dans [locale]/layout.tsx
 */

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://cocoa-ranch.africa"
  ),
  title: {
    default: "Cocoa Ranch & Industry — Agropole circulaire au Cameroun",
    template: "%s | Cocoa Ranch & Industry",
  },
  description:
    "Agropole agro-industriel au Cameroun : cacao premium zéro déforestation, provendes animales brevetées OAPI, économie circulaire, traçabilité EUDR. 1 200 producteurs, 6 villages, bassin du Mungo.",
  keywords: [
    "cacao Cameroun",
    "cacao premium",
    "zéro déforestation",
    "EUDR",
    "CacaoTrace",
    "économie circulaire",
    "provendes animales",
    "OAPI",
    "AGRO-PME",
    "Bassin du Mungo",
    "Njombé-Penja",
    "investissement cacao",
  ],
  authors: [{ name: "AGRO-PME Fondation" }],
  creator: "AGRO-PME Fondation",
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
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    url: "/",
    siteName: "Cocoa Ranch & Industry",
    title: "Cocoa Ranch & Industry — Agropole circulaire au Cameroun",
    description:
      "Cacao premium zéro déforestation, provendes brevetées, 1 200 producteurs accompagnés.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Cocoa Ranch & Industry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cocoa Ranch & Industry",
    description: "Agropole circulaire au Cameroun",
    images: ["/og-default.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1F4A2E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
