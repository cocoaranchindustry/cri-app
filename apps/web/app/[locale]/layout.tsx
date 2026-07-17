import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/request";

/**
 * Layout [locale] — Cocoa Ranch & Industry
 *
 * Active la locale pour les Server Components descendants (next-intl
 * v3.22+) et fournit le contexte i18n aux Client Components.
 *
 * Le `<html><body>`, le `<WhatsAppButton />` et le `<Toaster />`
 * sont portés par le layout racine (`app/layout.tsx`) pour qu'ils
 * apparaissent sur TOUTES les pages, y compris celles hors `[locale]/`.
 *
 * Pages traduites : `app/[locale]/page.tsx` (home). Les autres pages
 * restent à leur place (`app/contact/`, `app/projet/`, etc.) et sont
 * servies en FR ; le middleware les réécrit depuis `/en/*` via rewrite.
 */

export const metadata: Metadata = {};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }

  unstable_setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
