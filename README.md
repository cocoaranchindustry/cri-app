# Cocoa Ranch & Industry — Plateforme web

> **Stack** : React 18 · Next.js 14 (App Router) · TypeScript strict · Firebase v10 · Tailwind CSS
> **Charte** : Brandbook CRI v5 (Forêt profonde `#1F4A2E`, Or cacao `#9C7A3A`, Parchemin `#F5F0E8`)
> **Conformité** : RGPD + ANTIC Cameroun
> **Infra** : Vercel (edge) + Firebase (Auth, Firestore, Storage, Functions, Hosting)

Plateforme web institutionnelle pour **Cocoa Ranch & Industry** — incluant 4 portails :
- **Public** (vitrine, blog, RSE, catalogue)
- **Investisseurs** (auth MFA, documents confidentiels)
- **Admin** (CMS, gestion producteurs / parcelles / lots, KPI)
- **Terrain** (PWA offline-first, géoloc, traçabilité EUDR/CacaoTrace)

## 📁 Structure monorepo

```
cri-app/
├── apps/
│   └── web/                    # Next.js 14 app
│       ├── app/                 # Routes (App Router)
│       ├── components/          # UI partagés
│       ├── features/            # Modules métier (traceability, investors, content, impact)
│       ├── lib/                 # Utils, hooks
│       ├── firebase/            # Config Firebase (client + admin)
│       ├── i18n/                # Traductions FR/EN
│       ├── types/               # Types TypeScript partagés
│       └── tests/               # Tests unitaires + e2e
├── packages/                   # (réservé) libs partagées futures
├── .github/workflows/          # CI/CD GitHub Actions
└── docs/                        # Documentation
```

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Copier le fichier d'env
cp .env.example apps/web/.env.local

# 3. Renseigner les variables Firebase (voir apps/web/.env.example)

# 4. Lancer en dev
npm run dev
```

L'app sera accessible sur `http://localhost:3000`.

## 🛠️ Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur dev Next.js |
| `npm run build` | Build de production |
| `npm run start` | Démarrer en mode prod |
| `npm run lint` | Vérifier le code (ESLint) |
| `npm run lint:fix` | Corriger auto |
| `npm run type-check` | Vérifier les types TypeScript |
| `npm run format` | Formater avec Prettier |
| `npm run test` | Tests unitaires (Vitest) |
| `npm run test:e2e` | Tests E2E (Playwright) |
| `npm run rules:deploy` | Déployer les Firestore + Storage rules |
| `npm run functions:deploy` | Déployer les Cloud Functions |

## 🔒 Sécurité

- Headers CSP/HSTS stricts (voir `apps/web/next.config.js`)
- Firestore Security Rules multi-rôles (`firestore.rules`)
- Storage Rules avec validation MIME et taille (`storage.rules`)
- Custom claims Firebase (RBAC : `admin`, `manager`, `enqueteur`, `supervisor`, `investor`)
- MFA TOTP obligatoire pour rôles sensibles
- Audit logs immutables (`auditLogs` collection)
- IP hashing sur les leads (RGPD)
- Chiffrement at-rest (AES-256 + Cloud KMS pour champs sensibles)

## 📋 Conformité

- **RGPD** (UE 2016/679) — registre des traitements, consentement, droit à l'oubli
- **ANTIC Cameroun** — données personnelles Cameroun
- **EUDR 2023/1115** — traçabilité cacao zéro déforestation
- **CacaoTrace standard** — chaîne de custody

## 📚 Documentation

- **Plan d'implémentation** : `../Plan_implementation_CRI_app.md` et `.html`
- **Note de synthèse projet** : `../Note_synthese_CRI.html`
- **Cahier des charges** : `../CDC_Site_Web_v1.0.md` (à venir)
- **Brandbook** : Brandbook CRI v5 (à venir)
- **CDC Traçabilité** : `../CDC_Tracabilite_geolocalisee.md` (à venir)

## 📞 Contact

- **DPO** : `dpo@cri.africa`
- **Équipe** : AGRO-PME Fondation
- **Promoteur** : Cocoa Ranch & Industry SARL
- **Localisation** : Bassin du Mungo, Cameroun

## 📄 Licence

Code UNLICENSED — Propriétaire AGRO-PME Fondation / Cocoa Ranch & Industry.
Tous droits réservés.
