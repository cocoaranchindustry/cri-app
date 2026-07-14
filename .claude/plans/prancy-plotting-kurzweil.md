# Plan — Pages publiques du site Cocoa Ranch & Industry

## Contexte

Le projet a déjà :

- ✅ Monorepo Next.js 14 + TypeScript + Tailwind (Brandbook v5 câblé)
- ✅ Page d'accueil `/` complète (hero, 4 KPIs, 2 pôles, RSE, CTA investisseurs)
- ✅ Pages légales `/privacy` et `/mentions-legales`
- ✅ Composants UI prêts : `Button`, `Card`, `KpiCard`, `SectionImpact`, `Navbar`, `Footer`, `Logo`, `CookieBanner`
- ✅ i18n FR/EN (`fr.json`, `en.json`, `request.ts`, `navigation.ts`)
- ✅ Brandbook complet dans `tailwind.config.ts` (palette cacao/vert/or, Georgia + Calibri)
- ✅ Dev server tourne sur `localhost:3000`
- ✅ 78 skills installés (5 CRI + 1 Vercel + 47 marketing + 25 SEO)
- ✅ Brief marketing dans `.agents/product-marketing.md`
- ✅ Firebase configuré (côté client + admin)

**13 pages publiques manquent**. Liens cassés vers : `/projet`, `/activites`, `/activites/cacao`, `/activites/provendes`, `/activites/elevage`, `/impact`, `/produits`, `/actualites`, `/publications`, `/contact`, `/investisseurs`, `/brevet`, `/cookies`.

## Décisions prises

| Question                              | Décision                                                                                                                           |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Chiffres clés**                     | Aligner la home sur le brief (5 000 producteurs, 200 ha ranch, 18 000 t/an, 1,7 Md FCFA CA) — annoter "objectif 2028" sur les KPIs |
| **Visuels hero**                      | Photos terrain via placeholders Unsplash (cocoa plantation, farm, factory)                                                         |
| **Formulaire contact**                | Cloud Function Firebase (`functions/src/contact/sendContactEmail.ts`) avec Brevo                                                   |
| **Pages /actualites + /publications** | Contenu placeholder réaliste (3-5 articles + 3-4 études)                                                                           |

## Architecture cible

### Pages publiques (13 à créer + 2 existantes + 1 à aligner)

```
app/
├── page.tsx                            🔄 aligner (chiffres brief)
├── privacy/page.tsx                    ✅ existant
├── mentions-legales/page.tsx           ✅ existant
├── projet/page.tsx                     🔴 manquant
├── activites/
│   ├── page.tsx                        🔴 manquant (hub)
│   ├── cacao/page.tsx                  🔴 manquant
│   ├── provendes/page.tsx              🔴 manquant
│   └── elevage/page.tsx                🔴 manquant
├── impact/page.tsx                     🔴 manquant
├── produits/page.tsx                   🔴 manquant
├── actualites/page.tsx                 🔴 manquant
├── publications/page.tsx               🔴 manquant
├── contact/page.tsx                    🔴 manquant
├── investisseurs/page.tsx              🔴 manquant
├── brevet/page.tsx                     🔴 manquant
└── cookies/page.tsx                    🔴 manquant
```

### Routes "à venir" (post-MVP)

- `/dashboard/*` (espace authentifié par rôle)
- `/investisseurs/data-room` (data room KYC-gated)
- `/en/*` (i18n EN, le switcher pointe vers `/lang/en` à corriger)

## Plan d'exécution

### Phase 1 — Fondations (1h30)

1. **Aligner la home** sur le brief : 5 000 producteurs, 200 ha, 18 000 t/an, 1,7 Md FCFA
2. **Étendre `fr.json` + `en.json`** avec les sections des nouvelles pages
3. **Créer `PageHero` + `SectionCTA` + `Timeline` + `DataTable`** (composants partagés)
4. **Corriger le switcher i18n** : `/lang/en` → `/en` (ou laisser tel quel si next-intl est en place)

### Phase 2 — Pages "Le projet & Impact" (2h)

5. **`/projet`** : mission, vision, gouvernance AGRO-PME, modèle intégré (3 piliers), équipe, partenaires CIMAR
6. **`/impact`** : RSE, EUDR, certifications (Rainforest Alliance, Fair Trade), rapport d'impact, zero-CO₂
7. **`/brevet`** : OAPI #XXX, formulation CRI-PROVEND CACAO, R&D, innovation

### Phase 3 — Pages "Activités" (2h)

8. **`/activites`** : hub avec 3 cartes (cacao, provendes, élevage) + intro économie circulaire
9. **`/activites/cacao`** : process fermentation (5-7j), séchage, qualité zéro défaut, traçabilité QR/blockchain
10. **`/activites/provendes`** : formulation brevetée, prix -15% vs marché, cibles poulet/porc
11. **`/activites/elevage`** : ferme intégrée, démonstration économique, 5 000 → 15 000 poulets/an

### Phase 4 — Pages "Produits & Publications" (2h)

12. **`/produits`** : catalogue fèves premium (origines, grades) + provendes (formulations)
13. **`/publications`** : 3-4 études (faisabilité, EUDR, ESG, modèle économique) avec liens PDF placeholder
14. **`/actualites`** : 3-5 articles placeholder (lancement, certification, salon, partenariat)

### Phase 5 — Pages "Investisseurs & Contact" (2h)

15. **`/investisseurs`** : hero, levée 3,2 Md FCFA, data room teaser, formulaire KYC (avec consentement)
16. **`/contact`** : formulaire (nom, email, message, sujet) + carte Leaflet Cameroun + email + RGPD
17. **`/cookies`** : page de gestion des préférences (renforce la bannière existante)

### Phase 6 — Cloud Function contact (1h)

18. **`functions/src/contact/sendContactEmail.ts`** : Callable function avec validation Zod + Brevo + hash IP
19. **`functions/src/contact/index.ts`** : export
20. **Test local** : `firebase emulators:start` + appel depuis le formulaire

### Phase 7 — Tests & vérifications (1h)

21. **Type-check** : `npm run type-check`
22. **Build production** : `npm run build`
23. **Vérification manuelle** : naviguer chaque page sur `localhost:3000`
24. **Tests Vitest** : `npm test`
25. **Audit brandbook** : skill `brandbook-cri-guardian` sur les nouvelles pages
26. **Commit** propre par phase

## Composants partagés à créer

| Composant    | Rôle                                                               | Pages utilisatrices                            |
| ------------ | ------------------------------------------------------------------ | ---------------------------------------------- |
| `PageHero`   | En-tête de page (titre + sous-titre + breadcrumb + image Unsplash) | Toutes                                         |
| `SectionCTA` | Bloc CTA en bas de page (titre + 2 boutons)                        | projet, impact, contact, investisseurs, brevet |
| `Timeline`   | Frise chronologique (étapes 2026-2030)                             | projet, impact                                 |
| `DataTable`  | Tableau de données (chiffres, certifications,产品规格)             | impact, investisseurs, produits                |
| `Breadcrumb` | Fil d'Ariane (Accueil > Rubrique > Page)                           | Toutes les pages internes                      |

## Contenu placeholder réaliste

### Articles `/actualites` (5)

1. **"CRI signe un partenariat avec Puratos CacaoTrace"** (mai 2026) — certification bean-to-bar
2. **"Première récolte du Ranch Pilote de 50 ha"** (mars 2026) — 200 t de fèves premium
3. **"Le Brevet OAPI CRI-PROVEND CACAO est délivré"** (jan 2026) — protection intellectuelle
4. **"CRI au Salon du Chocolat de Paris 2026"** (oct 2026) — visibilité internationale
5. **"Lancement du programme d'engagement des 1 200 producteurs"** (fév 2026) — ancrage terrain

### Publications `/publications` (4)

1. **Étude de faisabilité 2026** (PDF, 124 p.) — business plan complet
2. **Rapport ESG 2025-2026** (PDF, 48 p.) — impact social/environnemental
3. **Note EUDR — Conformité 2025/1115** (PDF, 22 p.) — guide pratique
4. **Modèle économique circulaire** (PDF, 36 p.) — analyse des flux

## Fichiers critiques

| Fichier                                          | Action                  | Phase |
| ------------------------------------------------ | ----------------------- | ----- |
| `apps/web/app/page.tsx`                          | Modifier (aligner KPIs) | 1     |
| `apps/web/i18n/fr.json`                          | Étendre                 | 1     |
| `apps/web/i18n/en.json`                          | Étendre                 | 1     |
| `apps/web/components/ui/PageHero.tsx`            | Créer                   | 1     |
| `apps/web/components/ui/SectionCTA.tsx`          | Créer                   | 1     |
| `apps/web/components/ui/Timeline.tsx`            | Créer                   | 1     |
| `apps/web/components/ui/DataTable.tsx`           | Créer                   | 1     |
| `apps/web/components/ui/Breadcrumb.tsx`          | Créer                   | 1     |
| `apps/web/components/layout/Navbar.tsx`          | Corriger switcher       | 1     |
| `apps/web/app/projet/page.tsx`                   | Créer                   | 2     |
| `apps/web/app/impact/page.tsx`                   | Créer                   | 2     |
| `apps/web/app/brevet/page.tsx`                   | Créer                   | 2     |
| `apps/web/app/activites/page.tsx`                | Créer                   | 3     |
| `apps/web/app/activites/cacao/page.tsx`          | Créer                   | 3     |
| `apps/web/app/activites/provendes/page.tsx`      | Créer                   | 3     |
| `apps/web/app/activites/elevage/page.tsx`        | Créer                   | 3     |
| `apps/web/app/produits/page.tsx`                 | Créer                   | 4     |
| `apps/web/app/publications/page.tsx`             | Créer                   | 4     |
| `apps/web/app/actualites/page.tsx`               | Créer                   | 4     |
| `apps/web/app/investisseurs/page.tsx`            | Créer                   | 5     |
| `apps/web/app/contact/page.tsx`                  | Créer                   | 5     |
| `apps/web/app/cookies/page.tsx`                  | Créer                   | 5     |
| `apps/web/components/forms/ContactForm.tsx`      | Créer (client)          | 5     |
| `apps/web/components/forms/InvestorKYCForm.tsx`  | Créer (client)          | 5     |
| `functions/src/contact/sendContactEmail.ts`      | Créer (Callable)        | 6     |
| `functions/src/contact/index.ts`                 | Créer (export)          | 6     |
| `functions/src/contact/sendContactEmail.test.ts` | Créer (test)            | 6     |

## Visual assets (Unsplash placeholders)

| Page                   | Image Unsplash              |
| ---------------------- | --------------------------- |
| `/` (home)             | `cacao-pods-cameroon`       |
| `/projet`              | `cacao-plantation-aerial`   |
| `/activites/cacao`     | `cacao-fermentation-boxes`  |
| `/activites/provendes` | `animal-feed-factory`       |
| `/activites/elevage`   | `poultry-farm-africa`       |
| `/impact`              | `agroforestry-cameroon`     |
| `/produits`            | `cocoa-beans-premium`       |
| `/investisseurs`       | `business-handshake-africa` |
| `/contact`             | `office-douala-cameroon`    |
| `/brevet`              | `laboratory-research-cocoa` |

URLs Unsplash à insérer dans `PageHero` via `next/image` ou `<img>`.

## Sécurité & conformité

- **Formulaires** : validation Zod côté client + serveur
- **RGPD** : consentement explicite (case non pré-cochée) + lien `/privacy`
- **Hash IP** : `hashIP()` de `lib/utils.ts` avant envoi à la Cloud Function
- **Cloud Function** : vérification App Check + validation du format email
- **Brevo** : envoi via `BREVO_API_KEY` (à configurer dans `.env.local`)
- **Anti-spam** : rate limiting via middleware Next.js (`/api/contact` → 5 req/min/IP)

## Vérification end-to-end

```bash
# Phase 1-5
cd apps/web
npm run type-check         # 0 erreur
npm run lint               # 0 erreur
npm run build              # Build OK
npm test                   # 22/22 verts
npm run dev                # Dev server

# Phase 6 - Cloud Function
cd functions
npm run build
npm run test

# Test manuel sur localhost:3000
# → /  /projet  /impact  /activites  /activites/cacao  /activites/provendes  /activites/elevage
# → /produits  /publications  /actualites  /contact  /investisseurs  /brevet  /cookies

# Skill audit (optionnel mais recommandé)
# → invoquer brandbook-cri-guardian sur les nouvelles pages
# → invoquer rgpd-antic-checker sur /contact et /investisseurs
```

## Livrables

- **15 pages** (13 nouvelles + 1 alignée + 1 composant)
- **5 composants partagés** (`PageHero`, `SectionCTA`, `Timeline`, `DataTable`, `Breadcrumb`)
- **2 formulaires** (`ContactForm`, `InvestorKYCForm`)
- **1 Cloud Function** (`sendContactEmail` avec Brevo)
- **2 fichiers i18n étendus** (`fr.json`, `en.json`)
- **1 home alignée** sur le brief
- **~7 commits** (un par phase)

## Effort total estimé

**~9h30** sur 1-2 jours de travail (selon vitesse d'exécution).

## Critères de succès

- ✅ Toutes les routes répondent en 200 sur `localhost:3000`
- ✅ Build production OK
- ✅ Type-check + Lint à 0 erreur
- ✅ Tous les tests verts
- ✅ Aucune couleur interdite (rouge/bleu) — audité par `brandbook-cri-guardian`
- ✅ Tous les formulaires avec consentement RGPD et hash IP
- ✅ i18n FR/EN complet (chaque page traduite)
- ✅ Tous les liens internes fonctionnent (pas de 404)
- ✅ Site responsive (mobile + tablette + desktop)
- ✅ Accessibilité AA (contraste, focus visible, ARIA)
