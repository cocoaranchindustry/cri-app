# 🔐 Déploiement CI/CD Firebase avec Service Account

> **Objectif** : permettre à Dokploy (ou GitHub Actions, GitLab CI, etc.) de
> déployer automatiquement les Security Rules, Indexes et Cloud Functions
> **sans intervention humaine** (pas de `firebase login` à chaque fois).
>
> **Pré-requis** : accès Owner sur le projet Firebase `cocoaranchindustry-98c05`.

---

## 🎯 Pourquoi un Service Account (au lieu de `firebase login`) ?

| Méthode                  | Usage                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| `firebase login`         | Authentification OAuth Google **interactive** (navigateur). OK pour dev local, KO en CI/CD. |
| **Service Account JSON** | Identifiant machine-to-machine. **Standard pour CI/CD** (Dokploy, GitHub Actions, etc.).    |

---

## 📍 Étape 1 — Créer le Service Account

1. Console GCP : https://console.cloud.google.com/iam-admin/serviceaccounts?project=cocoaranchindustry-98c05
2. Cliquer **+ Créer un compte de service**
3. **Nom** : `cri-deployer-prod`
4. **ID** : auto-généré → garder celui proposé
5. **Description** : "Service account utilisé par Dokploy pour déployer rules/indexes/functions"
6. Cliquer **Créer et continuer**

## 📍 Étape 2 — Attribuer les rôles

Sur l'écran **"Accorder à ce compte de service l'accès au projet"**, ajouter **uniquement** ces 3 rôles (principe du moindre privilège) :

| Rôle                     | Pourquoi                        |
| ------------------------ | ------------------------------- |
| `Cloud Datastore User`   | Écriture dans Firestore         |
| `Firebase Rules Admin`   | Déploiement des Security Rules  |
| `Firebase Hosting Admin` | (optionnel) déploiement Hosting |

> ⚠️ **NE PAS** donner `Owner` ni `Editor` — trop permissif.

Cliquer **Continuer** puis **OK** (pas besoin d'accès utilisateur).

## 📍 Étape 3 — Générer la clé JSON

1. Sur la liste des comptes de service, cliquer sur `cri-deployer-prod@cocoaranchindustry-98c05.iam.gserviceaccount.com`
2. Onglet **"Clés"** → **Ajouter une clé** → **Créer une clé** → **JSON**
3. Un fichier `cri-deployer-prod-xxxxx.json` se télécharge
4. ⚠️ **NE JAMAIS COMMITER CE FICHIER** (déjà protégé par `.gitignore`)

## 📍 Étape 4 — Stocker le JSON dans Dokploy (en secret)

### Option A — Variable d'environnement (recommandé)

1. Dokploy → ton projet `cri-app` → onglet **Environment Variables**
2. Ajouter une variable **multi-ligne** :
   - **Name** : `GOOGLE_APPLICATION_CREDENTIALS_JSON`
   - **Value** : coller le **contenu complet** du fichier JSON
3. Sauvegarder

### Option B — Fichier monté

1. Dokploy → ton service `web` → onglet **Mounts**
2. **Mount path** : `/app/secrets/firebase-sa.json`
3. Coller le contenu du JSON dans le champ **File content**
4. Ajouter une env var : `GOOGLE_APPLICATION_CREDENTIALS=/app/secrets/firebase-sa.json`

## 📍 Étape 5 — Ajouter le script de déploiement au projet

Le script `scripts/deploy-firebase.sh` (à la racine du repo) gère l'authentification
et déploie les cibles demandées en une seule commande.

```bash
# Déployer uniquement les Security Rules
./scripts/deploy-firebase.sh prod rules

# Déployer Rules + Indexes (le plus courant)
./scripts/deploy-firebase.sh prod

# Tout déployer (rules + indexes + functions + storage)
./scripts/deploy-firebase.sh prod all
```

---

## 🔌 Étape 6 — Utilisation dans Dokploy

### Option A : commande dans la pipeline de build

Dans Dokploy → ton service `web` → onglet **Advanced** → **Build Command** :

```bash
chmod +x scripts/deploy-firebase.sh && ./scripts/deploy-firebase.sh prod
```

### Option B : job séparé (recommandé pour ne pas coupler)

Créer un **second service** dans Dokploy qui :

- Utilise la **même image** `cri-web:latest` (pour réutiliser node_modules)
- N'expose **aucun port**
- A comme **command override** : `["bash", "-c", "./scripts/deploy-firebase.sh prod"]`
- Tourne **une seule fois** puis s'arrête (`restart: no`)

### Option C : GitHub Actions (si tu pousses sur GitHub)

Créer `.github/workflows/deploy-firebase.yml` :

```yaml
name: Deploy Firebase
on:
  push:
    branches: [main]
    paths:
      - "firestore.rules"
      - "storage.rules"
      - "firestore.indexes.json"
      - "functions/**"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - name: Decode Service Account
        run: echo "${{ secrets.FIREBASE_SA_JSON }}" | base64 -d > /tmp/sa.json
      - name: Deploy
        env:
          GOOGLE_APPLICATION_CREDENTIALS: /tmp/sa.json
        run: ./scripts/deploy-firebase.sh prod
```

Et tu stockes le JSON du SA (encodé base64) dans **Settings → Secrets → FIREBASE_SA_JSON**.

---

## 🔒 Sécurité

- Le SA JSON ne doit **jamais** apparaître dans les logs (utiliser `--quiet` si besoin)
- **Rotation** : régénérer une nouvelle clé tous les 90 jours
- **Révocation** : si le SA fuit, le supprimer immédiatement dans GCP IAM
- **Principe du moindre privilège** : n'ajouter que les rôles strictement nécessaires

---

## 🆘 Dépannage

| Problème                            | Solution                                                                     |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| `Permission denied` au deploy       | Vérifier que le SA a bien `Firebase Rules Admin` + `Cloud Datastore User`    |
| `Key file not found`                | La variable env `GOOGLE_APPLICATION_CREDENTIALS_JSON` est vide ou mal copiée |
| `Invalid grant`                     | La clé a expiré ou a été révoquée — en régénérer une                         |
| Le script se plaint d'env manquante | Toutes les variables du `.env.production` doivent aussi être dans Dokploy    |

---

## 📚 Ressources

- [Firebase CLI : authentification CI](https://firebase.google.com/docs/cli/admin-cli#set_up_ci)
- [GCP Service Accounts](https://cloud.google.com/iam/docs/service-accounts)
- [Dokploy : Environment Variables](https://docs.dokploy.com/docs/core/environment)
