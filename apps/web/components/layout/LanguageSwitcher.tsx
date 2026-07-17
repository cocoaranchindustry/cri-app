"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * LanguageSwitcher — Sélecteur de langue FR / EN
 *
 * Composant client localisé :
 * - Lit la locale active via `useLocale()` (next-intl)
 * - Bascule via `useRouter().replace(pathname, { locale })`
 *   avec `usePathname()` de `@/i18n/navigation` (préfixe strippé)
 * - Dropdown accessible (role=listbox, aria-haspopup, fermeture au
 *   clic extérieur, transitions pending pour feedback visuel)
 *
 * Brandbook CRI v6 :
 * - Couleur or (cri-gold) pour la bordure / l'icône (cohérent avec
 *   le CTA Investisseurs)
 * - Fond parchemin au survol des options
 * - Typographie mono pour le code langue (FR / EN)
 *
 * Utilisé dans la Navbar (desktop + mobile).
 */

const OPTIONS = [
  { code: "fr" as const, label: "Français" },
  { code: "en" as const, label: "English" },
];

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const currentLocale = useLocale() as "fr" | "en";
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const t = useTranslations("nav");

  const handleSelect = (next: "fr" | "en") => {
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("languageSwitcher")}
        className={cn(
          "flex items-center gap-1.5 rounded-md px-2.5 py-1.5",
          "text-cri-gold text-sm font-bold transition-colors",
          "hover:bg-cri-forest-light/20 hover:text-cri-gold-light",
          "focus:ring-cri-gold focus:ring-offset-cri-forest focus:outline-none focus:ring-2 focus:ring-offset-2",
          isPending && "opacity-60"
        )}
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="uppercase tracking-wider">{currentLocale}</span>
      </button>

      {open && (
        <>
          {/* Backdrop invisible pour fermer au clic extérieur */}
          <button
            type="button"
            className="fixed inset-0 z-30 cursor-default"
            onClick={() => setOpen(false)}
            aria-hidden="true"
            tabIndex={-1}
          />
          <ul
            role="listbox"
            aria-label={t("languageSwitcher")}
            className={cn(
              "rounded-cri absolute right-0 top-full z-40 mt-2 w-44 overflow-hidden",
              "text-cri-humus shadow-cri-lg border-cri-moss/10 border bg-white"
            )}
          >
            {OPTIONS.map((opt) => {
              const active = opt.code === currentLocale;
              return (
                <li key={opt.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => handleSelect(opt.code)}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm",
                      "hover:bg-cri-parchment hover:text-cri-canopy",
                      "focus:bg-cri-parchment focus:outline-none",
                      active && "text-cri-canopy font-semibold"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-cri-cacao font-mono text-[10px] font-bold uppercase tracking-widest">
                        {opt.code}
                      </span>
                      <span>{opt.label}</span>
                    </span>
                    {active && <Check className="text-cri-canopy h-3.5 w-3.5" aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
