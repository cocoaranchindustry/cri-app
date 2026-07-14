import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import "./globals.css";
import { defaultLocale } from "@/i18n/request";
import { Toaster } from "@/components/ui/Toaster";

/**
 * Layout racine — Cocoa Ranch & Industry
 *
 * SÉCURITÉ :
 * - MetadataBase défini
 * - robots par défaut = index, follow
 * - format-detection désactivé (téléphone, adresse)
 * - metadata color = Brandbook (forêt)
 *
 * i18n géré via next-intl en mode "sans préfixe" (locale par défaut
 * `fr` à la racine, préfixe `/en/...` ajouté par l'hébergeur). Les
 * traductions sont chargées côté serveur et exposées au client via
 * `NextIntlClientProvider`.
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
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#1F4A2E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Active la locale par défaut pour les Server Components (rendu
  // statique compatible avec next-intl en mode "sans préfixe").
  unstable_setRequestLocale(defaultLocale);
  const messages = await getMessages();

  return (
    <html lang={defaultLocale}>
      <body>
        <NextIntlClientProvider locale={defaultLocale} messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
