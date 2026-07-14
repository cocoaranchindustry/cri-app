import { getRequestConfig } from "next-intl/server";

/**
 * Configuration next-intl — Cocoa Ranch & Industry
 *
 * Mode : sans préfixe de locale (`localePrefix: 'as-needed'` côté
 * middleware / routing). Le site est servi en français par défaut à
 * la racine ; un préfixe `/en/...` est ajouté par le rewrite de
 * l'hébergeur (Vercel / Firebase Hosting) pour basculer en anglais.
 *
 * Langues supportées : fr (défaut), en
 */

export const locales = ["fr", "en"] as const;
export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "fr";

export default getRequestConfig(async ({ requestLocale }) => {
  // À partir de next-intl 3.22, `locale` est déprécié au profit de
  // `requestLocale` (Promise<string | undefined>).
  const requested = await requestLocale;
  const active: AppLocale = (locales as readonly string[]).includes(requested ?? "")
    ? (requested as AppLocale)
    : defaultLocale;

  return {
    locale: active,
    messages: (await import(`./${active}.json`)).default,
  };
});
