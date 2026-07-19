# Plan — Finalisation du mécanisme de traduction FR / EN

## Contexte

L'application `cri-app` est architecturée autour de `next-intl` v3.25+ (middleware,
routing `[locale]/`, `LanguageSwitcher`, JSON FR/EN de 180 lignes déjà traduits).

**Constat après audit** : la mécanique de routage fonctionne (HTTP 200 sur `/` et
`/en`, cookie `NEXT_LOCALE` posé, `Link hreflang` corrects), mais
**les composants affichent toujours le français** quand on est en locale `en` :

- `Navbar.tsx` : 100% hardcodé (`"Le projet"`, `"Activités"`, …) — aucun
  `useTranslations`
- `Footer.tsx` : idem + utilise `next/link` brut (pas le `Link` localisé) → les
  routes EN ne gardent pas le préfixe
- `app/[locale]/page.tsx` (home) : seule page qui appelle `useTranslations` →
  preuve que les clés JSON fonctionnent
- 13 dossiers de pages (`/contact`, `/projet`, `/brevet`, `/impact`, etc.)
  restent hors `[locale]/` : le `RootLayout` leur fournit un `NextIntlClientProvider`
  vide, donc `useTranslations` n'y a pas les messages

**Décisions utilisateur (déjà prises)** :

1. Profondeur **complète** : toutes les pages publiques sont traduites
2. **Migrer** les pages vers `app/[locale]/<route>/` pour hériter du
   `NextIntlClientProvider` complet

## Approche retenue

Stratégie en **4 passes successives** pour rester incrémental et testable à
chaque étape :

### Passe 1 — Composants partagés (Navbar, Footer)

- Convertir `Navbar.tsx` et `Footer.tsx` en lecture depuis les JSON via
  `useTranslations("nav" | "footer")`
- Remplacer `next/link` par `Link` de `@/i18n/navigation` dans le Footer
- Le `LanguageSwitcher` est déjà OK

**Fichiers modifiés** :

- `apps/web/components/layout/Navbar.tsx`
- `apps/web/components/layout/Footer.tsx`

**Critère de validation** : `http://localhost:3000/en` → le menu et le footer
affichent leurs libellés en anglais, et le toggle conserve l'URL active.

### Passe 2 — Enrichissement des JSON FR/EN

Les JSON actuels couvrent `nav`, `home`, `footer`, `cookies`, `common`. Il faut
ajouter des sections pour les pages secondaires. Pour ne pas exploser la
complexité, on **n'ajoute que les libellés strictement visibles** (titres,
badges, sous-titres, CTA) ; les contenus éditoriaux longs resteront en français
avec un TODO documenté par page (priorité reportée).

**Cibles JSON** (sections à créer) :

- `contact` (titre, sous-titre, labels formulaire, horaires, CTA)
- `projet` (titre, sous-titre, sections)
- `impact` (titre, sous-titre, KPIs)
- `brevet` (titre, sous-titre)
- `mentions-legales`, `privacy`, `cookies` (titres principaux)
- `notFound` (page 404)
- `produits`, `activites`, `actualites`, `publications` (titres + CTAs)

**Fichiers modifiés** :

- `apps/web/i18n/fr.json`
- `apps/web/i18n/en.json`

**Critère de validation** : les deux JSON restent structurellement identiques
(vérifié par un petit script de parité).

### Passe 3 — Migration des 13 pages vers `[locale]/`

Déplacer chaque page `app/<route>/page.tsx` vers `app/[locale]/<route>/page.tsx`.
Le middleware actuel (`middleware.ts` § "Toutes les autres routes : laisser
passer") et le rewrite `/en/<path>` → `/<path>` (FR) couvrent déjà le cas.

**Pages à migrer** :

- `contact/`, `projet/`, `impact/`, `brevet/`, `cookies/`, `mentions-legales/`,
  `privacy/`, `produits/`, `activites/`, `actualites/`, `publications/`,
  `investisseurs/`
- Note : `[locale]/produits/cacao`, `[locale]/produits/provendes`,
  `[locale]/produits/elevage` existent déjà → il faut juste déplacer
  `app/produits/cacao/` etc. sous `app/[locale]/produits/cacao/`

**Fichiers modifiés** : déplacements (mv) — pas de modification de contenu.
Pour chaque page, ajouter en haut du fichier :

```ts
import { setRequestLocale } from "next-intl/server";
// ...
export default async function XPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  // ...
}
```

**Critère de validation** : aucune page en 404 sur `/` ni sur `/en`, et chaque
page affiche bien la locale détectée via le `<html lang>`.

### Passe 4 — Finitions & robustesse

- **Page 404** : `app/not-found.tsx` doit afficher un message localisé via
  `useTranslations("notFound")`
- **Composant `LanguageSwitcher`** : passer `usePathname` + `useRouter` en
  `import { usePathname as useI18nPathname, useRouter as useI18nRouter } from "@/i18n/navigation"`
  pour conserver le préfixe EN. _(Déjà fait selon l'audit — vérifier.)_
- **`<html lang={locale}>`** : déjà en place dans `RootLayout` ✅
- **`<title>` par locale** : compléter `generateMetadata` dans les pages
  `[locale]/<route>/page.tsx` pour basculer la balise title selon la locale
- **Test rapide** : un mini-test d'intégration qui charge `/` puis `/en` et
  vérifie qu'au moins une chaîne change de langue

## Fichiers critiques (résumé)

| Fichier                                              | Action                                                             |
| ---------------------------------------------------- | ------------------------------------------------------------------ |
| `apps/web/i18n/fr.json`                              | Enrichir (sections `contact`, `projet`, `impact`, …)               |
| `apps/web/i18n/en.json`                              | Enrichir (mêmes sections, en anglais)                              |
| `apps/web/components/layout/Navbar.tsx`              | Remplacer strings par `useTranslations("nav")`                     |
| `apps/web/components/layout/Footer.tsx`              | Idem + `Link` de `@/i18n/navigation`                               |
| `apps/web/middleware.ts`                             | Aucun changement nécessaire (déjà OK)                              |
| 13 pages `app/<route>/page.tsx`                      | Déplacer vers `app/[locale]/<route>/page.tsx` + `setRequestLocale` |
| `apps/web/app/not-found.tsx`                         | Localiser le message                                               |
| `apps/web/scripts/check-i18n-parity.mjs` _(nouveau)_ | Script de parité FR/EN                                             |

## Fonctions / utilitaires à réutiliser (déjà existants)

- `useTranslations(ns)` de `next-intl` (déjà utilisé dans `LanguageSwitcher`)
- `useLocale()` de `next-intl` (déjà utilisé dans `LanguageSwitcher`)
- `Link` / `usePathname` / `useRouter` de `@/i18n/navigation` (exportés par
  `createSharedPathnamesNavigation` dans `i18n/navigation.ts`)
- `setRequestLocale(locale)` de `next-intl/server` (à appeler en haut de chaque
  page Server Component sous `[locale]/`)
- `NextIntlClientProvider` (déjà dans `[locale]/layout.tsx` et `RootLayout`)

## Vérification end-to-end

1. **Type-check** : `npm run type-check` → 0 erreur
2. **Lint** : `npm run lint` → 0 erreur
3. **Parité JSON** : nouveau script `npm run i18n:check` qui échoue si les deux
   JSON n'ont pas la même structure
4. **Smoke test manuel** :
   - `curl -s http://localhost:3000/ | grep -i "L'agropole"` → doit trouver
   - `curl -s http://localhost:3000/en | grep -i "agropole"` → ne doit PAS
     trouver `L'agropole` (le `L'` n'existe qu'en FR)
   - `curl -sI http://localhost:3000/en | grep "NEXT_LOCALE"` → doit contenir
     `NEXT_LOCALE=en`
5. **Test de régression** : `npm test` (Vitest, 22 tests actuels doivent rester
   verts) + `npm run test:e2e` (Playwright si scénarios i18n présents)

## Hors scope (à reporter)

- Traduction des **contenus éditoriaux longs** (paragraphes denses, témoignages,
  articles) : nécessite un travail éditorial/copieur, à budgéter séparément
- Traduction des **emails transactionnels** (Brevo) : déjà géré par les templates
  Brevo, hors de cette passe
- **Persistance du choix de langue** autre que le cookie `NEXT_LOCALE` (ex.
  compte utilisateur) : pas demandé
- **3e langue** (ex. allemand, swahili) : `locales` dans `i18n/request.ts`
  suffit à ajouter, mais aucune priorité exprimée
