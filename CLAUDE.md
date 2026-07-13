# Cocoa Ranch & Industry — Guide Claude

> Programme porté par **AGRO-PME Fondation** (Cameroun, Bassin du Mungo).
> Application web institutionnelle + plateforme de traçabilité EUDR + espace investisseurs.

## Vue d'ensemble

- **Type** : Monorepo `npm workspaces`
- **Frontend** : Next.js 14 (App Router) + TypeScript strict + Tailwind CSS
- **Backend** : Firebase (Auth, Firestore, Storage) + Cloud Functions
- **Conformité** : RGPD + ANTIC Cameroun + EUDR 2023/1115

## Structure

```
cri-app/
├── apps/
│   └── web/              # Next.js 14 app (public + investisseurs + admin + terrain)
├── functions/            # Cloud Functions Firebase (auth, validation, anti-fraude)
├── brandbook-inspirations/  # DESIGN.md de références (Vercel, Stripe, etc.)
├── firestore.rules       # Règles de sécurité multi-rôles
├── storage.rules         # Validation MIME + taille
├── firestore.indexes.json
└── firebase.json
```

## Brandbook CRI v5 — référence rapide

| Token | Hex | Usage |
|---|---|---|
| `cri-cacao` | `#1F4A2E` | Vert profond (fonds) |
| `cri-vert` | `#2D6B3E` | Vert secondaire (CTA) |
| `cri-cacao-clair` | `#9C7A3A` | Brun cacao clair (accents) |
| `cri-or` | `#C8A84B` | Or lumière (KPIs) |
| `cri-cream` | `#F5F0E8` | Crème (fonds clairs) |
| `cri-ink` | `#3D3320` | Brun foncé (texte) |

**Règles strictes** : pas de rouge ni de bleu. Dominante verte 60-70%. Or réservé aux KPIs.

## Skills disponibles dans `.claude/skills/`

### Skills CRI (spécifiques)
| Skill | Usage |
|---|---|
| `brandbook-cri-guardian` | Auditer une UI contre la charte CRI v5 |
| `firestore-rules-auditor` | Auditer les règles Firestore (RBAC + RGPD + EUDR) |
| `rgpd-antic-checker` | Vérifier la conformité RGPD/ANTIC d'un formulaire |
| `eudr-traceability-reviewer` | Vérifier un flux de traçabilité EUDR |
| `cri-code-style` | Conventions de code (nommage, TypeScript, imports) |

### Skills UI génériques
| Skill | Usage |
|---|---|
| `web-design-guidelines` | Audit UI conforme Web Interface Guidelines (Vercel Labs) |

### Skills marketing (`coreyhaines31/marketingskills` — 47 installés)
Voir **`.claude/README-MARKETING.md`** pour le guide complet (top 5, à éviter, workflow par phase).

**Top 5 phase 1** : `cro`, `copywriting`, `seo-audit`, `marketing-plan`, `pricing`.

⚠️ **Avant d'invoquer un skill marketing**, s'assurer que `.agents/product-marketing.md` est à jour (il contient le brief produit/audience).

Invoquer un skill : décrire la tâche + mentionner le skill, ou demander "utilise le skill X".

## Commandes principales

```bash
# Développement
npm run dev              # Lancer apps/web sur :3000
npm run test:firebase    # Vérifier la config Firebase
npm test                 # Tests unitaires (Vitest)

# Build
npm run build            # Build production
npm run type-check       # tsc --noEmit
npm run lint             # ESLint

# Firebase
firebase deploy --only firestore:rules,storage,firestore:indexes
firebase emulators:start
```

## Variables d'environnement (apps/web/.env.local)

- `NEXT_PUBLIC_FIREBASE_*` : config client Firebase (7 variables)
- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` : Admin SDK
- `SESSION_COOKIE_SECRET`, `ENCRYPTION_KEY` : sécurité
- `BREVO_API_KEY`, `PLAUSIBLE_DOMAIN`, `SENTRY_DSN` : tiers

⚠️ **JAMAIS** commit `.env.local` — déjà protégé par `.gitignore`.

## Rôles et custom claims

| Rôle | Custom claim | Capacités |
|---|---|---|
| `anonymous` | (aucun) | Lecture publique |
| `producer` | `role: "producer"` | Ses propres données |
| `investor` | `role: "investor"` | Data room (après KYC) |
| `staff` | `role: "staff"` | Producteurs assignés |
| `admin` | `role: "admin"` | Full access + audit |

## Routes Next.js (apps/web/app/)

- `/` — accueil
- `/privacy` — politique RGPD
- `/mentions-legales` — mentions
- *(à venir)* `/programme/ranch`, `/programme/usine`, `/investisseurs`, `/traceability`, `/contact`, `/dashboard`

## État actuel

- ✅ Monorepo scaffoldé
- ✅ 3 commits sur `main`
- ✅ 22/22 tests unitaires verts
- ✅ Build production OK
- ✅ Firebase 4/4 tests verts
- 🟡 Dev server en cours sur :3000
- 🟡 DESIGN.md en cours de téléchargement (agent background)

## Conventions de commit

```
feat: nouvelle fonctionnalité
fix: correction
chore: maintenance
docs: documentation
style: formatage
refactor: refactoring
test: tests
```

Préfixer le scope si utile : `feat(firebase):`, `fix(ui):`, `chore(deps):`.

**Ne jamais commiter** : secrets, `.env.local`, `node_modules/`, `.next/`.
