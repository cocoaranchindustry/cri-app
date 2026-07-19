# 🌍 Guide i18n — Ajouter une page localisée FR/EN

> Conventions et procédure pour ajouter une nouvelle page traduite en
> français ET anglais, ou pour rendre traduisible une page existante.

---

## 🎯 Règle d'or

**Toute page de `apps/web/app/` doit vivre sous `[locale]/` et tout libellé
visible doit provenir des JSON `i18n/{fr,en}.json` via `useTranslations` /
`getTranslations`.**

---

## 📁 Étape 1 — Créer la page au bon endroit

```
apps/web/app/[locale]/ma-page/page.tsx    ← ✅ bon endroit
apps/web/app/ma-page/page.tsx             ← ❌ hors [locale], pas d'i18n
```

Le dossier `[locale]/` garantit que le `NextIntlClientProvider` englobe la
page et que `useTranslations` fonctionne.

---

## 🧩 Étape 2 — Choisir le type de composant

### A. Page **Client** (`"use client"` — la majorité des pages)

Pour les pages interactives (formulaires, animations, hooks navigateur) :

```tsx
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function MyPage() {
  const t = useTranslations("pages.myPage");

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          image="..."
          imageAlt="..."
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
          viewportHeight
        />
        {/* ... contenu ... */}
      </main>
      <Footer />
    </>
  );
}
```

### B. Page **Server** (pas de `"use client"`)

Pour les pages avec `generateMetadata` (title SEO localisé) ou qui n'ont pas
besoin d'interactivité :

```tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageMeta" });
  return { title: t("myPage") };
}

export default async function MyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.myPage");

  return <>{/* ... */}</>;
}
```

---

## 📝 Étape 3 — Ajouter les traductions

### Section `pages` (titres des pages)

Éditer **les deux** fichiers : `apps/web/i18n/fr.json` ET `apps/web/i18n/en.json`.

```jsonc
// fr.json
{
  "pages": {
    // ... sections existantes ...
    "myPage": {
      "badge": "Ma page",
      "title": "Titre de ma page",
      "subtitle": "Sous-titre descriptif."
    }
  }
}

// en.json — STRUCTURE IDENTIQUE obligatoire
{
  "pages": {
    // ... existing sections ...
    "myPage": {
      "badge": "My page",
      "title": "My page title",
      "subtitle": "Descriptive subtitle."
    }
  }
}
```

### Section `pageMeta` (title SEO)

Pour que la balise `<title>` du navigateur change selon la langue :

```jsonc
// fr.json
{ "pageMeta": { "myPage": "Ma page — Cocoa Ranch & Industry" } }
// en.json
{ "pageMeta": { "myPage": "My page — Cocoa Ranch & Industry" } }
```

---

## 🧪 Étape 4 — Vérifier la parité

```bash
npm run i18n:check
```

Ce script **doit** retourner 0 erreur. Si une clé manque en EN ou en FR,
il refuse de sortir 0.

> 💡 **Bon réflexe** : lancez ce script avant chaque commit.

---

## 🔗 Étape 5 — Liens internes

**Toujours** utiliser `Link` de `@/i18n/navigation`, jamais `next/link` brut :

```tsx
// ✅ Conserve le préfixe /en lors de la navigation
import { Link } from "@/i18n/navigation";
<Link href="/contact">Contact</Link>;

// ❌ Perd le préfixe /en
import Link from "next/link";
<Link href="/contact">Contact</Link>;
```

---

## 🌐 Étape 6 — Tester en FR et EN

```bash
# Page en français (par défaut)
curl -s http://localhost:3000/ma-page | grep "Titre attendu FR"

# Page en anglais (préfixe /en)
curl -s http://localhost:3000/en/ma-page | grep "Expected EN title"
```

Vérifier aussi :

- Le cookie `NEXT_LOCALE` est posé (`curl -sI http://localhost:3000/`)
- La balise `<html lang="...">` est correcte
- Le sélecteur de langue bascule bien

---

## 🛠 Dépannage

| Erreur                                     | Cause                                                   | Solution                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `useTranslations` retourne une chaîne vide | Clé absente du JSON de la locale active                 | Vérifier `npm run i18n:check`                                                                                                   |
| `useTranslations` plante au runtime        | La page est hors `[locale]/`                            | Déplacer la page sous `app/[locale]/`                                                                                           |
| `<title>` toujours en français             | `generateMetadata` non async / pas de `getTranslations` | Convertir en `async`, utiliser `getTranslations`                                                                                |
| Lien qui "perd" le `/en`                   | `next/link` brut utilisé                                | Remplacer par `Link` de `@/i18n/navigation`                                                                                     |
| Cookie `NEXT_LOCALE` non posé              | Le middleware ne matche pas la route                    | Vérifier `matcher` dans `middleware.ts`                                                                                         |
| Page introuvable en EN                     | Pas de `generateStaticParams` exporté                   | Ajouter `export function generateStaticParams() { return locales.map(locale => ({ locale })); }` dans `app/[locale]/layout.tsx` |

---

## 📚 Ressources

- [next-intl v3 docs](https://next-intl-docs.vercel.app/)
- [Next.js App Router i18n](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- Fichiers de référence : `apps/web/i18n/{fr,en}.json`, `apps/web/i18n/request.ts`,
  `apps/web/middleware.ts`
- Script de parité : `apps/web/scripts/check-i18n-parity.mjs`
