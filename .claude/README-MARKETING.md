# Guide d'usage des skills marketing — CRI

> Les 47 skills de `coreyhaines31/marketingskills` sont installés dans `.claude/skills/`.
> Ce guide t'aide à choisir **le bon skill** selon la tâche.

## ⚠️ Règle n°1 — Toujours lire le contexte produit d'abord

Avant d'invoquer **n'importe quel** skill marketing, le skill `product-marketing` doit avoir été exécuté. Le document de référence est à :

```
.agents/product-marketing.md
```

✅ Il est déjà créé et contient : produit, audience, positionnement, brand, channels, KPIs.

## 🎯 Skills les plus pertinents pour CRI (phase 1)

### 🔥 Top 5 (à utiliser régulièrement)

| Skill | Usage CRI |
|---|---|
| `seo` | **Orchestrateur SEO** — audit site complet, technique, contenu, E-E-A-T, AI Overviews |
| `cro` | Optimiser les pages d'accueil, `/investisseurs`, `/contact` |
| `copywriting` | Écrire les headlines, les sections de pages, les CTA |
| `marketing-plan` | Construire le plan marketing 2026-2027 |
| `pricing` | Pricing data room, accès investisseurs, certifications |

### 📚 Top 10 (selon les besoins)

| Skill | Usage CRI |
|---|---|
| `analytics` | Mettre en place Plausible, définir les événements clés |
| `content-strategy` | Calendrier éditorial, rubriques ressources/articles |
| `copy-editing` | Relecture des pages avant publication |
| `signup` | Optimiser le formulaire d'onboarding producteurs |
| `lead-magnets` | Étude de faisabilité, business plan, EUDR statement (PDF gated) |
| `marketing-psychology` | Pour les pages investisseurs (preuves sociales, urgence) |
| `competitor-profiling` | Benchmark vs Cargill, Barry Callebaut, autres agtech |
| `schema` | Schema.org pour Product, Organization, FAQPage |

### 🌍 SEO & Contenu (à mettre en place)

| Skill | Usage CRI |
|---|---|
| `seo` (orchestrateur) | **Audit site complet** — délègue à 24 sub-skills et 18 agents en parallèle |
| `seo-audit` | Audit SEO complet d'une URL ou du site |
| `seo-page` | Analyse approfondie d'une page |
| `seo-technical` | Audit technique (9 catégories, INP, Core Web Vitals) |
| `seo-content` | Qualité contenu, E-E-A-T |
| `seo-content-brief` | Briefs détaillés (mots-clés, outline, liens internes) |
| `seo-schema` | Détection, validation, génération JSON-LD |
| `seo-geo` | **AI Overviews / GEO** — optimisation pour ChatGPT, Perplexity |
| `seo-hreflang` | SEO international (FR/EN) |
| `seo-sitemap` | Analyse / génération sitemaps XML |
| `seo-images` | Optimisation images |
| `seo-programmatic` | Pages départements Cameroun (Littoral, Centre, Sud-Ouest...) |
| `seo-plan` | Planification stratégique SEO |
| `seo-cluster` | Clustering sémantique SERP |
| `seo-sxo` | Search Experience Optimization |

### 📧 Contenu à produire

| Skill | Usage CRI |
|---|---|
| `emails` | Templates Brevo (newsletter, transactionnel) |
| `cold-email` | Outreach investisseurs family offices |
| `social` | Posts LinkedIn (sponsors bailleurs, personnel) |
| `image` | Briefs de création d'images (hero, illustrations) |
| `video` | Scripts vidéos (drone plantation, témoignages) |

### 🧲 Acquisition / Growth

| Skill | Usage CRI |
|---|---|
| `referrals` | Programme de parrainage producteurs |
| `co-marketing` | Partenariats chocolatiers bean-to-bar |
| `launch` | Plan de lancement 2026-2027 |
| `marketing-loops` | Boucles de rétention producteurs |

## ⛔ Skills à NE PAS utiliser (ou plus tard)

| Skill | Raison |
|---|---|
| `ads`, `ad-creative` | Pas de budget paid media en phase 1 (on fait du contenu organique d'abord) |
| `paywalls` | La data room n'est pas un SaaS |
| `churn-prevention` | Pas pertinent (on a des producteurs, pas des abonnés) |
| `aso` | Pas d'app mobile native à ce stade (PWA suffit) |
| `sms` | À utiliser plus tard, quand la base producteurs sera grande |
| `free-tools` | Pas de SaaS B2C à proposer |
| `popups` | À éviter sur le site institutionnel (UX dégradée) |
| `prospecting` | Pas de sales outbound B2B en phase 1 |
| `public-relations` | À voir quand on aura un track record à pitcher |
| `revops` | Pas de sales pipeline structuré (trop tôt) |
| `sales-enablement` | Idem |

## 💡 Workflow recommandé

1. **Phase 1 (maintenant — Q3 2026)** : site institutionnel + pages clés
   - `product-marketing` ✅ (fait)
   - `site-architecture` → pour structurer l'arborescence
   - `copywriting` → pour les pages
   - `cro` → pour optimiser les CTA
   - `seo-audit` → avant le go-live
   - `schema` → pour les données structurées
   - `lead-magnets` → pour les PDF gated (étude de faisabilité, EUDR)

2. **Phase 2 (Q4 2026 — Q1 2027)** : lancement + notoriété
   - `marketing-plan` → plan annuel
   - `content-strategy` → calendrier éditorial
   - `analytics` → instrumentation
   - `copy-editing` → relecture finale
   - `launch` → plan de lancement
   - `cold-email` → outreach investisseurs
   - `emails` → templates Brevo

3. **Phase 3 (2027+)** : scale + growth
   - `co-marketing`, `referrals`, `marketing-loops`
   - `sms` quand la base producteurs grossit
   - `pricing` quand on affine la data room
   - `competitor-profiling` régulièrement

## 🚀 Comment invoquer un skill

```
"Utilise le skill `cro` pour optimiser la page /investisseurs"
"Audite le site avec le skill `seo-audit`"
"Génère un plan marketing 2027 avec le skill `marketing-plan`"
```

Le skill se chargera automatiquement de lire `.agents/product-marketing.md` pour le contexte.
