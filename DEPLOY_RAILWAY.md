# Déploiement Railway — Cocoa Ranch & Industry

> Guide pas-à-pas pour héberger le site web CRI sur [Railway](https://railway.com/).

## 📋 Prérequis

- Un compte Railway (https://railway.com) — gratuit pour commencer ($5 de crédit)
- Un dépôt Git (GitHub / GitLab / Bitbucket) contenant ce code
- Node.js 20+ (vérifié : `package.json` → `engines.node >= 20.0.0`)

## 🚀 Déploiement en 5 minutes

### Étape 1 — Pousser le code sur Git

```bash
cd cri-app
git init           # si pas déjà fait
git add .
git commit -m "chore(railway): add nixpacks.toml + railway.json"
git branch -M main
git remote add origin https://github.com/<votre-org>/cri-app.git
git push -u origin main
```

### Étape 2 — Créer un nouveau projet Railway

1. Aller sur https://railway.com/new
2. Cliquer sur **Deploy from GitHub repo**
3. Sélectionner le dépôt `cri-app`
4. Railway détecte automatiquement `nixpacks.toml` et lance le build

> Si Railway demande de choisir le service root, sélectionner **"Deploy from a monorepo"** et pointer vers `apps/web` si demandé.

### Étape 3 — Configurer les variables d'environnement

Dans l'onglet **Variables** du service, ajouter **toutes** les variables du fichier `apps/web/.env.example`. Voici les **obligatoires** pour la mise en ligne :

| Variable                                   | Valeur exemple                   | Obligatoire               |
| ------------------------------------------ | -------------------------------- | ------------------------- |
| `NEXT_PUBLIC_APP_URL`                      | `https://cri-app.up.railway.app` | ✅                        |
| `NEXT_PUBLIC_APP_ENV`                      | `production`                     | ✅                        |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | `<depuis Firebase Console>`      | ⚠️ Requis pour Auth       |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | `cri-app.firebaseapp.com`        | ⚠️                        |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | `cri-app`                        | ⚠️                        |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | `cri-app.appspot.com`            | ⚠️                        |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `<10 chiffres>`                  | ⚠️                        |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | `<depuis Firebase>`              | ⚠️                        |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`      | `G-XXXXXXXXXX`                   | Optionnel                 |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`             | `cri.africa`                     | Optionnel                 |
| `SESSION_COOKIE_SECRET`                    | `<32+ caractères aléatoires>`    | ⚠️ Pour routes protégées  |
| `ENCRYPTION_KEY`                           | `<32 bytes base64>`              | ⚠️ Pour données sensibles |
| `BREVO_API_KEY`                            | `<depuis Brevo>`                 | Optionnel (newsletter)    |
| `SENTRY_DSN`                               | `<depuis Sentry>`                | Optionnel (monitoring)    |
| `PORT`                                     | `3000` (auto par Railway)        | Auto                      |
| `HOSTNAME`                                 | `0.0.0.0` (auto par Railway)     | Auto                      |

> **Important** : `FIREBASE_PRIVATE_KEY` doit être saisi **en une seule ligne** avec les `\n` conservés. Railway le détecte automatiquement.

### Étape 4 — Configurer Firebase (domaines autorisés)

Dans **Firebase Console → Authentication → Settings → Authorized domains**, ajouter :

- `cri-app.up.railway.app` (ou votre domaine Railway)
- Votre domaine custom (ex. `cri.africa`)

### Étape 5 — Exposer le site

1. Dans Railway, aller dans **Settings → Networking**
2. Cliquer sur **Generate Domain** → Railway fournit une URL `*.up.railway.app`
3. (Optionnel) Ajouter un **domaine custom** dans **Settings → Custom Domain**

## 🔧 Configuration technique

### Build command (automatique via `nixpacks.toml`)

```bash
npm ci --include=dev --workspaces --include-workspace-root
npm run build --workspace=apps/web
```

### Start command (automatique via `railway.json`)

```bash
npm run start --workspace=apps/web
```

Le serveur Next.js démarre sur le port défini par `$PORT` (par Railway).

### Healthcheck

`GET /` → 200 attendu (page d'accueil FR).

## 📁 Structure des fichiers de déploiement

```
cri-app/
├── railway.json          # Config Railway (builder, start, healthcheck)
├── nixpacks.toml         # Build config Nixpacks (Node 20, npm 10)
├── package.json          # Monorepo npm workspaces
├── apps/
│   └── web/              # App Next.js 14 (cible du déploiement)
└── functions/            # Cloud Functions Firebase (déployé séparément)
```

## 🔍 Vérification post-déploiement

```bash
# Vérifier la home
curl -I https://<votre-app>.up.railway.app/
# → HTTP/2 200 attendu

# Vérifier la version EN
curl -I https://<votre-app>.up.railway.app/en
# → HTTP/2 200 attendu (home traduite)

# Vérifier une page secondaire
curl -I https://<votre-app>.up.railway.app/projet
# → HTTP/2 200 attendu
```

## 💰 Coûts estimés

| Plan      | Coût                | Limites               |
| --------- | ------------------- | --------------------- |
| **Trial** | Gratuit ($5 crédit) | 500h/mois, 1GB RAM    |
| **Hobby** | $5/mois + usage     | 8GB RAM, 100GB egress |
| **Pro**   | $20/mois + usage    | 32GB RAM, illimité    |

Pour le site CRI (Next.js statique + Server Components), le plan **Hobby à $5/mois** suffit largement (~50-200 MB RAM, < 10 GB egress/mois).

## 🚨 Dépannage

### Build échoue avec "Cannot find module"

→ Vérifier que `package-lock.json` est commité. Le `npm ci` en a besoin.

### Build échoue avec "Module not found: Can't resolve '@/...' "

→ Les alias `@/*` sont définis dans `apps/web/tsconfig.json` → `paths`. Le build Next.js les résout automatiquement, pas d'action requise.

### L'app démarre mais 404 sur toutes les routes

→ Vérifier que `NEXT_PUBLIC_APP_URL` correspond à l'URL Railway. Cette variable est utilisée dans `metadataBase` (voir `apps/web/app/layout.tsx`).

### `FIREBASE_PRIVATE_KEY` invalide

→ Dans Railway, saisir la clé **avec les `\n` littéraux** (pas de conversion automatique). Format attendu :

```
-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n
```

### i18n : `/en` affiche une 404

→ Vérifier que `apps/web/app/[locale]/page.tsx` existe (déplacé depuis `app/page.tsx`). Si vous mettez à jour le code, ne pas oublier de redéployer.

## 📚 Ressources

- Railway Docs : https://docs.railway.com
- Next.js Deployment : https://nextjs.org/docs/app/building-your-application/deploying
- Nixpacks : https://nixpacks.com/docs
- Firebase Hosting (alternative) : https://firebase.google.com/docs/hosting

---

**Auteur** : TCHAHA MONKAM epouse AWUNGIA TAZINYA Lorraine Nadia — Présidente, COCOA RANCH & INDUSTRY
**Contact** : tchahanadial@yahoo.com · +237 694 89 77 10
