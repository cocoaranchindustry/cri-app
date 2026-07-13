import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

/**
 * Configuration next-intl
 *
 * Langues supportées : fr (défaut), en
 */

export const locales = ["fr", "en"] as const;
export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "fr";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as AppLocale)) notFound();

  return {
    messages: (await import(`./${locale}.json`)).default,
  };
});
