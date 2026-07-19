import { Home, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getTranslations, getLocale } from "next-intl/server";

/**
 * Page 404 — Cocoa Ranch & Industry
 *
 * Server Component (pas de "use client") pour pouvoir appeler
 * `getTranslations` côté serveur. Le `Link` provient de
 * `@/i18n/navigation` pour préserver le préfixe `/en` si la locale
 * active est l'anglais.
 *
 * Affichée par Next.js pour toute route non trouvée.
 */

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  return (
    <main className="container-cri flex min-h-[70vh] items-center justify-center py-16">
      <div className="max-w-lg text-center">
        <h1 className="text-cri-gold text-7xl">404</h1>
        <h2 className="text-cri-forest mt-4 text-2xl">{t("title")}</h2>
        <p className="text-cri-humus mt-4">{t("description")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn bg-cri-forest hover:bg-cri-canopy text-white">
            <Home className="mr-2 h-5 w-5" aria-hidden="true" />
            {t("ctaHome")}
          </Link>
          <Link
            href="/contact"
            className="btn border-cri-cacao text-cri-cacao hover:bg-cri-cacao border-2 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
            {tCommon("contactUs")}
          </Link>
        </div>
      </div>
    </main>
  );
}
