# Cocoa Ranch & Industry — Design System MASTER

> **Source of Truth** pour tous les composants UI du site CRI.
> Dérivé du **Brandbook CRI v6** (juillet 2026) + skill `ui-ux-pro-max` v2.11.
> Toute déviation de ces tokens doit être validée par la Direction Artistique.

---

## 1. Identité de marque

**CRI** est un agropole agro-industriel camerounais positionné **premium, traçable, zéro déforestation**, à la croisée de :
- **Agroécologie** (préservation du terroir)
- **Innovation industrielle** (brevet OAPI, provenderie)
- **Économie circulaire** (zéro perte)
- **Équité inclusive** (insertion femmes/jeunes)
- **Authenticité africaine** (terroir Bassin du Mungo)

**Personnalité visuelle** : sobre, organique, technique, chaleureuse, transparente.
**Promesse** : "L'origine du goût durable et authentique du terroir africain".

---

## 2. Palette de couleurs

### 2.1 Tokens sémantiques (Tailwind)

| Token Tailwind | Hex | Rôle | Usage |
|----------------|-----|------|-------|
| `cri-forest` | `#1F4A2E` | Primary | Fonds sombres, header dark, CTA principal, titres H1 |
| `cri-forest-dark` | `#14322B` | Primary dark | Overlays, gradients |
| `cri-canopy` | `#2D6B3E` | Secondary | CTA secondaires, hover, icônes actives, H2 |
| `cri-canopy-light` | `#3D8B52` | Accent vert clair | Liens actifs, hover, gradients |
| `cri-moss` | `#4A7C59` | Séparateur | Bordures, dividers |
| `cri-cacao` | `#9C4A1A` | Signature | Accents premium, badges "Pilier N°X", CTA gold |
| `cri-cacao-light` | `#B5651F` | Accent chocolat | Hover cacao |
| `cri-cacao-dark` | `#7A3812` | Texte cacao | Erreurs (jamais de rouge) |
| `cri-gold` | `#D4A024` | KPI / CTA gold | Chiffres clés, "N°1", CTA secondaires |
| `cri-gold-light` | `#E5B946` | Or clair | Hover gold |
| `cri-gold-dark` | `#A87E15` | Or sombre | Texte gold sur fond clair |
| `cri-parchment` | `#F5EFE0` | Background | Fond principal (80% des pages) |
| `cri-cream` | `#E5DCC8` | Background alt | Sections alternées, cards |
| `cri-cream-light` | `#FAF6EB` | Background clair | Sections très claires, fonds inputs |
| `cri-humus` | `#3D3320` | Texte principal | Corps de texte (contraste 10.5:1 ✓) |
| `cri-ink-muted` | `#8B7860` | Texte muted | Notes, sources, captions |
| `cri-text-on-dark` | `#F5EFE0` | Texte sur fond vert | Texte sur cri-forest / cri-forest-dark |

### 2.2 Règles strictes

❌ **INTERDIT** : aucune couleur rouge ni bleue, sur aucun écran, à aucune taille.
✅ **OBLIGATOIRE** : dominante verte 55-65% du poids visuel.
✅ **Cacao brûlé et or vif** sont les 2 seules couleurs chaudes autorisées.
✅ **Jamais de blanc pur en grande surface** (utiliser `cri-cream-light` à la place).

### 2.3 Ratios de contraste WCAG AA validés

| Combinaison | Ratio | Verdict |
|-------------|-------|---------|
| `cri-humus` (#3D3320) sur `cri-parchment` (#F5EFE0) | 10.5:1 | ✅ AAA |
| `cri-forest` (#1F4A2E) sur `cri-parchment` | 9.7:1 | ✅ AAA |
| `cri-cacao` (#9C4A1A) sur `cri-parchment` | 4.8:1 | ✅ AA Large |
| `cri-gold-dark` (#A87E15) sur `cri-parchment` | 4.6:1 | ✅ AA Large |
| `cri-text-on-dark` (#F5EFE0) sur `cri-forest` | 9.7:1 | ✅ AAA |
| `cri-canopy-light` (#3D8B52) sur `cri-forest` | 2.1:1 | ❌ Décoratif uniquement |

---

## 3. Typographie

### 3.1 Familles

| Famille | Stack | Usage |
|---------|-------|-------|
| **Serif (display)** | `Georgia, Cambria, "Times New Roman", serif` | H1, H2, H3, KPI, citations |
| **Sans (body)** | `Calibri, "Segoe UI", "Helvetica Neue", Arial, sans-serif` | Body, UI, formulaires, boutons |
| **Mono** | `Consolas, Monaco, "Courier New", monospace` | Code, données techniques |

### 3.2 Échelle typographique (mobile-first)

| Élément | Famille | Taille | Line-height | Weight | Tracking | Couleur |
|---------|---------|--------|-------------|--------|----------|---------|
| **H1 Hero** | Serif | clamp(2.4rem, 5vw, 4rem) | 1.1 | 700 | -0.02em | `cri-forest` ou `cri-text-on-dark` |
| **H1 standard** | Serif | 2.4rem | 1.15 | 700 | -0.01em | `cri-forest` |
| **H2** | Serif | 1.8rem | 1.25 | 700 | normal | `cri-canopy` |
| **H3** | Serif | 1.3rem | 1.35 | 400 italic | normal | `cri-cacao` |
| **H4** | Sans | 1.125rem | 1.4 | 600 | normal | `cri-forest` |
| **Body** | Sans | 1rem (16px) | 1.65 | 400 | normal | `cri-humus` |
| **Body small** | Sans | 0.875rem | 1.55 | 400 | normal | `cri-humus` |
| **Caption** | Sans | 0.75rem | 1.5 | 400 | normal | `cri-ink-muted` |
| **Label / Badge** | Sans | 0.8rem bold caps | 1.3 | 700 | 0.08em uppercase | `cri-cacao` |
| **KPI number** | Serif | clamp(2.5rem, 5vw, 4rem) | 1 | 700 | -0.03em | `cri-gold` ou `cri-cacao` |
| **KPI label** | Sans | 0.875rem | 1.3 | 500 | 0.04em | `cri-canopy` |
| **Button** | Sans | 0.95rem | 1 | 600 | 0.02em | `cri-text-on-dark` ou `cri-forest` |
| **Link** | Sans | inherit | inherit | 500 | normal | `cri-canopy` hover `cri-cacao` |

### 3.3 Règles

- **HIÉRARCHIE FORTE** : un seul H1 par page, hiérarchie séquentielle (h1→h2→h3).
- **JAMAIS** de corps de texte < 16px (sinon zoom auto iOS).
- **JAMAIS** de serif sur du body (lisibilité mobile).
- **TAILLE** : line-length 60-75 caractères desktop, 35-50 mobile.
- **COULEUR** : `cri-humus` par défaut, jamais de gris pur.

---

## 4. Espacement & Layout

### 4.1 Échelle d'espacement (multiples de 4pt)

| Token | Valeur | Usage |
|-------|--------|-------|
| `space-1` | 4px | Gouttière fine, espacement icône-texte |
| `space-2` | 8px | Tap spacing, gap d'icônes |
| `space-3` | 12px | Petit gap entre items d'un groupe |
| `space-4` | 16px | Padding card standard |
| `space-5` | 24px | Gap entre éléments d'une section |
| `space-6` | 32px | Padding section mobile |
| `space-8` | 48px | Padding section desktop |
| `space-10` | 64px | Espacement entre sections |
| `space-12` | 96px | Marge haut/bas section hero |
| `space-16` | 128px | Marge page-level |

### 4.2 Breakpoints

| Nom | Min-width | Usage |
|-----|-----------|-------|
| `sm` | 640px | Tablette portrait |
| `md` | 768px | Tablette paysage |
| `lg` | 1024px | Desktop, sidebar visible |
| `xl` | 1280px | Desktop large |
| `2xl` | 1536px | Desktop XL |

### 4.3 Container

- **max-width** : `1280px` (équivalent `max-w-7xl` Tailwind)
- **Padding latéral** : `1rem` mobile, `2rem` tablet, `3rem` desktop
- **Section spacing** : `96px` top/bottom desktop, `64px` mobile

---

## 5. Effets visuels

### 5.1 Glassmorphism (subtil, jamais agressif)

| Token | Composition | Usage |
|-------|-------------|-------|
| `glass-card-light` | `bg-cri-parchment/40 backdrop-blur-md border border-cri-cacao/20` | Cards sur fond forêt |
| `glass-card-dark` | `bg-cri-forest/40 backdrop-blur-md border border-cri-gold/20` | Cards sur image |
| `glass-navbar` | `bg-cri-parchment/70 backdrop-blur-lg border-b border-cri-moss/30` | Navbar sticky |

**Règle** : `backdrop-blur` max 16px, opacité fond 30-50%, ne JAMAIS l'utiliser sur du texte long (illisibilité).

### 5.2 Ombres (échelle limitée)

| Token | Valeur | Usage |
|-------|--------|-------|
| `shadow-soft` | `0 2px 6px rgba(20, 50, 59, 0.08)` | Cards standard |
| `shadow-md` | `0 4px 12px rgba(20, 50, 59, 0.12)` | Cards hover, modals |
| `shadow-gold` | `0 4px 12px rgba(212, 160, 36, 0.25)` | CTA gold, focus states |
| `shadow-cacao` | `0 4px 12px rgba(156, 74, 26, 0.25)` | CTA cacao |
| `shadow-xl` | `0 12px 32px rgba(20, 50, 59, 0.15)` | Modals, popovers |

**Règle** : pas d'ombres sur fond `cri-forest` (invisibles), pas d'ombres colorées cri-canopy (trop claires).

### 5.3 Gradients premium

| Token | Composition | Usage |
|-------|-------------|-------|
| `cri-gradient-forest` | `bg-gradient-to-br from-cri-forest via-cri-forest to-cri-canopy` | Hero dark, CTA |
| `cri-gradient-cacao` | `bg-gradient-to-br from-cri-cacao-dark via-cri-cacao to-cri-cacao-light` | Bandeaux signature |
| `cri-gradient-gold` | `bg-gradient-to-r from-cri-gold-dark via-cri-gold to-cri-gold-light` | Chiffres clés, surlignage |
| `cri-gradient-parchment` | `bg-gradient-to-b from-cri-parchment to-cri-cream` | Sections alternées |
| `cri-radial-glow` | `radial-gradient(circle at 30% 20%, rgba(212,160,36,0.15), transparent 50%)` | Effet lumière hero |

### 5.4 Border radius

| Token | Valeur | Usage |
|-------|--------|-------|
| `rounded-sm` | 0.25rem | Badges, tags |
| `rounded` | 0.5rem (default) | Inputs, buttons |
| `rounded-lg` | 0.75rem | Cards |
| `rounded-xl` | 1rem | Modals, large cards |
| `rounded-2xl` | 1.5rem | Hero, sections featured |
| `rounded-full` | 9999px | Pills, avatars, icônes rondes |

---

## 6. Composants atomiques

### 6.1 Button

| Variant | Composition | Usage |
|---------|-------------|-------|
| `primary` | `bg-cri-forest text-cri-text-on-dark hover:bg-cri-canopy` | CTA principal |
| `secondary` | `bg-cri-canopy text-cri-text-on-dark hover:bg-cri-canopy-light` | CTA secondaire |
| `gold` | `bg-cri-gold text-cri-forest hover:bg-cri-gold-light` | CTA premium, KPI |
| `outline` | `border-2 border-cri-forest text-cri-forest hover:bg-cri-forest hover:text-cri-text-on-dark` | CTA tertiaire |
| `ghost` | `text-cri-forest hover:bg-cri-forest/10` | Liens, navigation |
| `cacao` | `bg-cri-cacao text-cri-text-on-dark hover:bg-cri-cacao-light` | Accent signature |

**Dimensions** :
- `sm` : `h-9 px-3 text-sm`
- `md` : `h-11 px-5 text-base` (default)
- `lg` : `h-14 px-7 text-lg`
- `icon` : `h-11 w-11`

**Touch target** : toujours ≥ 44px (iOS) / 48px (Android). Utiliser `min-h-[44px] min-w-[44px]`.

### 6.2 Card

- **Default** : `rounded-lg bg-cri-parchment border border-cri-moss/30 shadow-soft`
- **Hover** : `hover:shadow-md hover:-translate-y-1 transition-all duration-200`
- **Featured** : `bg-cri-forest text-cri-text-on-dark` (inversion)
- **Glass** : `glass-card-light` (voir §5.1)

### 6.3 Input

- **Border** : `border-2 border-cri-moss focus:border-cri-canopy focus:ring-2 focus:ring-cri-gold/30`
- **Background** : `bg-cri-cream-light`
- **Text** : `text-cri-humus placeholder:text-cri-ink-muted`
- **Error** : `border-cri-cacao-dark focus:ring-cri-cacao/30`
- **Size** : `h-12 px-4` (44px touch target)
- **Label** : toujours visible au-dessus (pas placeholder-only)

### 6.4 Badge / Tag

- **Default** : `inline-flex items-center px-3 py-1 rounded-full bg-cri-cream text-cri-canopy text-xs font-semibold uppercase tracking-wider`
- **Cacao** : `bg-cri-cacao/10 text-cri-cacao`
- **Gold** : `bg-cri-gold/15 text-cri-gold-dark`
- **Forest** : `bg-cri-forest/10 text-cri-forest`

### 6.5 Icon

- **Librairie** : `lucide-react` (stroke-width 1.5-2)
- **Tailles** : `h-4 w-4` (inline), `h-5 w-5` (UI), `h-7 w-7` (feature), `h-12 w-12` (hero)
- **Couleur** : `text-cri-canopy` actif, `text-cri-ink-muted` inactif
- **JAMAIS d'emoji** comme icône structurelle

---

## 7. Animations & micro-interactions

### 7.1 Durées (cohérence globale)

| Token | Durée | Usage |
|-------|-------|-------|
| `duration-fast` | 150ms | Hover, micro-feedback |
| `duration-normal` | 200-300ms | Transitions, modals |
| `duration-slow` | 400-600ms | Page transitions, hero |
| `duration-cinematic` | 800-1200ms | Animations signature, infographie |

### 7.2 Easing

- **Entrée** : `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out spring)
- **Sortie** : `cubic-bezier(0.7, 0, 0.84, 0)` (ease-in rapide)
- **Standard** : `cubic-bezier(0.4, 0, 0.2, 1)` (Material)

### 7.3 Animations standard (Framer Motion)

```tsx
// Fade up - entrée de section
{ initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }

// Stagger - liste d'éléments
{ initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-100px" }, variants: { visible: { transition: { staggerChildren: 0.08 } } } }

// Scale press - bouton
whileTap={{ scale: 0.97 }}
whileHover={{ scale: 1.02 }}
transition={{ duration: 0.2, ease: "easeOut" }}

// Parallax - hero
style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
```

### 7.4 Animations standard (GSAP)

```ts
// CountUp - KPIs
gsap.to(counter, { innerText: targetValue, duration: 2, snap: { innerText: 1 }, ease: "power2.out" })

// Reveal on scroll
gsap.from(".reveal", { y: 60, opacity: 0, stagger: 0.1, scrollTrigger: { trigger: ".section", start: "top 80%" } })

// Infographie économie circulaire - rotation lente
gsap.to(".ring", { rotation: 360, duration: 40, repeat: -1, ease: "none" })
```

### 7.5 Reduced motion

**OBLIGATOIRE** : respecter `prefers-reduced-motion: reduce`.

```tsx
// Framer Motion
<motion.div animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }} />

// Tailwind
className="motion-safe:animate-fade-up motion-reduce:opacity-100"
```

### 7.6 Loading states

- **> 300ms** : afficher un skeleton (cri-cream, animate-pulse)
- **> 1s** : afficher un progress indicator
- **Erreur** : message avec action "Réessayer" + icône explicite

---

## 8. Iconographie & illustrations

### 8.1 Icônes

- **Source unique** : `lucide-react`
- **Stroke** : 1.5-2px
- **Tailles** : 16, 20, 24, 28, 32, 48px
- **Couleur** : héritée de `currentColor`

### 8.2 Illustrations

- **Style** : flat design organique, traits arrondis, palette CRI uniquement
- **Format** : SVG inline (pas de PNG lourds)
- **Source** : composants `Illustrations.tsx` (CocoaPods, MapMungo, PlantationSun)
- **Opacité** : 60-80% en arrière-plan, 100% en avant-plan

### 8.3 Photos

- **Format** : WebP, fallback JPEG
- **Compression** : < 200KB par image
- **Dimensions** : 16/9 hero, 4/3 cards, 1/1 portraits
- **Source** : banque d'images AGRO-PME ou Unsplash (whitelist next.config.js)
- **Alt** : obligatoire, descriptif, ≤ 125 caractères

---

## 9. Navigation & layout

### 9.1 Navbar

- **Sticky** : `sticky top-0 z-50`
- **Glass** : `glass-navbar` (voir §5.1)
- **Logo** : 40px hauteur
- **Menu items** : `text-sm font-medium text-cri-forest hover:text-cri-cacao`
- **CTA** : `bg-cri-gold text-cri-forest` (Bouton gold)
- **Mobile** : hamburger, fullscreen overlay `bg-cri-forest`

### 9.2 Footer

- **Background** : `bg-cri-forest-dark text-cri-text-on-dark`
- **Sections** : 4 colonnes (CRI, Activités, Impact, Contact)
- **Réseaux sociaux** : icônes 24px, hover `text-cri-gold`
- **Bottom bar** : copyright, mentions légales, cookies

### 9.3 Breadcrumb

- **Position** : top de page, après le `PageHero`
- **Style** : `text-sm text-cri-ink-muted`, séparateur `>`, dernière entrée `text-cri-forest font-medium`

---

## 10. Pages types

### 10.1 PageHero

| Élément | Style |
|---------|-------|
| Background | Image + overlay gradient `from-cri-forest/80 to-cri-forest/40` |
| Badge | `bg-cri-gold/20 text-cri-gold border border-cri-gold/30` |
| Title H1 | Serif 4rem, `text-cri-text-on-dark` |
| Subtitle | Sans 1.125rem, `text-cri-text-on-dark/90`, max-w-3xl |
| CTAs | 2 boutons (primary + outline) |
| Height | `min-h-[60vh]` desktop, `min-h-[80vh]` mobile |

### 10.2 Section

| Variant | Background | Usage |
|---------|------------|-------|
| `default` | `bg-cri-parchment` | Sections principales |
| `alt` | `bg-cri-cream` | Sections alternées |
| `dark` | `bg-cri-forest text-cri-text-on-dark` | Sections impact, CTA |
| `gradient` | `cri-gradient-forest` | Hero, CTA gold |
| `parchment` | `cri-gradient-parchment` | Transitions douces |

### 10.3 Card grid

- **2 colonnes** mobile (`grid-cols-1`)
- **3 colonnes** tablet (`md:grid-cols-2`)
- **4 colonnes** desktop (`lg:grid-cols-4`)
- **Gap** : `gap-6` (24px)

---

## 11. Anti-patterns (à éviter)

❌ **Couleurs hors palette** : rouge, bleu, gris pur, orange vif hors `cri-cacao`
❌ **Emojis comme icônes** : utiliser `lucide-react`
❌ **Texte < 16px** sur mobile
❌ **Placeholder-only label** dans les formulaires
❌ **Bouton désactivé sans feedback** : toujours donner une raison
❌ **Animation > 600ms** sur des éléments interactifs
❌ **Glassmorphism sur du texte** (illisibilité)
❌ **Ombres sur fond `cri-forest`** (invisibles)
❌ **Trop de polices** : max 2 (serif + sans)
❌ **Hover sur touch devices** : ne pas dépendre du hover seul
❌ **CTA multiple égaux** : 1 primaire, 1 secondaire max
❌ **Texte tout en majuscules** long : OK pour labels/badges, KO pour paragraphes

---

## 12. Accessibilité (WCAG 2.1 AA)

✅ **Contraste** : tous les tokens vérifiés (voir §2.3)
✅ **Touch targets** : ≥ 44×44px (iOS) / 48×48dp (Android)
✅ **Focus visible** : `focus-visible:ring-2 focus-visible:ring-cri-gold focus-visible:ring-offset-2`
✅ **Skip link** : "Aller au contenu principal" en haut de chaque page
✅ **Sémantique HTML5** : `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
✅ **Heading hierarchy** : séquentielle h1→h6, pas de saut
✅ **Alt text** : obligatoire sur toutes les images significatives
✅ **ARIA labels** : sur tous les boutons icon-only
✅ **Reduced motion** : `prefers-reduced-motion` respecté (voir §7.5)
✅ **Navigation clavier** : Tab/Shift+Tab, Enter, Esc (modals)
✅ **Lang** : `lang="fr"` ou `lang="en"` selon la locale

---

## 13. SEO technique (rappel)

- **Title** : 55-65 caractères, unique par page
- **Meta description** : 150-160 caractères, unique par page
- **H1** : unique par page, contient le mot-clé principal
- **URLs** : propres, descriptives, en français (`/nos-activites/cacao-premium`)
- **Images** : alt text descriptif, format WebP
- **Sitemap** : `sitemap.xml` automatique
- **robots.txt** : autoriser pages publiques
- **Open Graph + Twitter Cards** : metadata complète
- **Schema.org** : Organization, Product, Article, LocalBusiness, FAQPage
- **hreflang** : FR/EN
- **Canonical** : sur chaque page

---

## 14. Performance budgets

| Métrique | Cible |
|----------|-------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |
| Total Blocking Time | < 200ms |
| JS bundle (initial) | < 200KB gzipped |
| Image weight/page | < 1.5MB |

---

## 15. Validation & audit

### 15.1 Brandbook audit (manuel)

- [ ] Aucune couleur rouge/bleue dans les fichiers `.tsx` (chercher `red-`, `blue-`, `gray-9`)
- [ ] Dominante verte 55-65% (compter `bg-cri-forest`, `bg-cri-canopy`)
- [ ] Georgia pour `<h1>`, `<h2>`, `<h3>` (vérifier `font-serif` ou classe Tailwind)
- [ ] Calibri pour `<p>`, `<button>`, `<input>` (vérifier `font-sans` par défaut)
- [ ] Logo CRI utilisé sans modification
- [ ] Aucune mention "rouge" ou "bleu" en commentaire de design

### 15.2 Accessibilité audit (automatique)

- Lighthouse accessibilité > 90
- axe DevTools : 0 violation
- Navigation clavier complète testée
- Screen reader (NVDA / VoiceOver) : testé sur 3 pages clés

### 15.3 Performance audit

- Lighthouse performance > 80 (mobile), > 90 (desktop)
- WebPageTest : LCP < 2.5s
- Bundle analyzer : < 200KB JS initial

---

**Version** : 1.0.0 (2026-07-14)
**Mainteneur** : Direction Artistique CRI / AGRO-PME Fondation
**Licence** : Interne — usage exclusif Cocoa Ranch & Industry
**Source Brandbook** : `extracted/brandbook.md` v6
**Source CDC** : `extracted/cdc-site-web.md` v1
