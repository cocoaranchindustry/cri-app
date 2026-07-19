# 🔐 Guide pas-à-pas — Finalisation `.env.production`

> **Objectif** : remplir le fichier `apps/web/.env.production` avec des valeurs
> 100 % valides et opérationnelles, et ajouter le domaine dans Firebase Auth.
>
> **Pré-requis** : accès à https://console.firebase.google.com avec un compte
> ayant les droits **Owner** sur le projet `cocoaranchindustry-98c05`.
>
> **Durée estimée** : 8-12 minutes.

---

## 📍 Étape A — Récupérer la config Web App Firebase

Ces valeurs servent aux variables `NEXT_PUBLIC_FIREBASE_*` (côté client).

1. Ouvrir https://console.firebase.google.com
2. Sélectionner le projet **cocoaranchindustry-98c05**
3. ⚙️ **Paramètres du projet** (roue crantée) → **Général**
4. Faire défiler jusqu'à la section **"Vos applications"**
5. Si aucune Web App n'est enregistrée :
   - Cliquer sur l'icône **`</>`** (Web)
   - Surnom : `CRI Web` (ou `cri-web-prod`)
   - Cocher **"Configurer aussi Firebase Hosting"** → **Non** (on utilise Dokploy)
   - Cliquer **"Enregistrer l'application"**
6. Sur l'écran **"Ajouter le SDK Firebase"** → section **"Config"** (en bas, dans `<script>`) :
   ```
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "cocoaranchindustry-98c05.firebaseapp.com",
     projectId: "cocoaranchindustry-98c05",
     storageBucket: "cocoaranchindustry-98c05.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abcdef...",
     measurementId: "G-XXXXXXX"
   };
   ```
7. **Copier** ces 4 valeurs dans un bloc-notes temporaire :
   - `apiKey`
   - `messagingSenderId`
   - `appId`
   - `measurementId`

✅ **Valeurs à noter** : `apiKey`, `messagingSenderId`, `appId`, `measurementId`.

---

## 📍 Étape B — Régénérer la clé Firebase Admin SDK (compromised)

> ⚠️ **L'ancienne clé est marquée comme compromise dans `.env.production`.**
> Cette étape est critique : sans clé valide, **le serveur Next.js ne peut pas
> accéder à Firestore/Auth côté admin**.

1. Toujours dans **Paramètres du projet** → onglet **"Comptes de service"**
2. Section **"Firebase Admin SDK"** → cliquer sur **"Générer une nouvelle clé privée"**
3. Confirmer en cliquant **"Générer la clé"**
4. Un fichier JSON se télécharge (ex. `cocoaranchindustry-98c05-firebase-adminsdk-xxxxx.json`)
5. ⚠️ **NE PAS COMMITER CE FICHIER.** Le déplacer dans un dossier sécurisé
   (par ex. `~/.secrets/cri/`) et le supprimer du dossier Téléchargements.
6. Ouvrir le JSON avec un éditeur. Vous verrez :
   ```json
   {
     "type": "service_account",
     "project_id": "cocoaranchindustry-98c05",
     "private_key_id": "abc123...",
     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n",
     "client_email": "firebase-adminsdk-xxxxx@cocoaranchindustry-98c05.iam.gserviceaccount.com",
     ...
   }
   ```
7. **Copier** :
   - `client_email` (utilisé comme `FIREBASE_CLIENT_EMAIL`)
   - `private_key` (⚠️ **avec les `\n` littéraux**, ne pas les convertir en vrais retours à la ligne)

✅ **Valeurs à noter** : `client_email`, `private_key` (entre guillemets, avec `\n`).

### ⚠️ SÉCURITÉ après cette étape

- [ ] Vérifier que l'ancien fichier JSON (potentiellement compromis) est supprimé
- [ ] Si l'ancienne clé a fuité (push Git, etc.) : la **révoquer explicitement** dans
      Google Cloud Console → IAM & Admin → Comptes de service → clés API → supprimer
- [ ] Le nouveau fichier JSON n'est **jamais** commité (déjà protégé par `.gitignore`)

---

## 📍 Étape C — Ajouter le domaine dans Firebase Auth

> Sans cette étape, l'authentification Firebase renverra `auth/unauthorized-domain`
> dès qu'un utilisateur tentera de se connecter en production.

1. Dans Firebase Console → **Authentication** (menu latéral)
2. Onglet **"Settings"** (en haut) → sous-onglet **"Authorized domains"**
3. Vous voyez déjà : `localhost`, `cocoaranchindustry-98c05.firebaseapp.com`
4. Cliquer **"Add domain"** et ajouter **les 2 domaines suivants** (un par un) :
   - `cocoaranchindustry.cloud`
   - `www.cocoaranchindustry.cloud`
5. Cliquer **"Add"** pour chaque

✅ **Vérification** : les 2 domaines apparaissent dans la liste "Authorized domains".

---

## 📍 Étape D — Récupérer les autres variables (optionnelles mais recommandées)

### D.1. reCAPTCHA Enterprise (App Check)

1. Firebase Console → **App Check** (menu latéral)
2. Onglet **"Apps"** → cliquer sur votre Web App
3. Section **"reCAPTCHA Enterprise"** → **"Register"**
4. Copier la **Site Key** → c'est `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`

### D.2. Sentry (monitoring d'erreurs)

1. https://sentry.io → créer un projet `cri-web-prod` (plateforme Next.js)
2. **Settings** → **Client Keys (DSN)** → copier le DSN → `NEXT_PUBLIC_SENTRY_DSN`
3. **Settings** → **Auth Tokens** → **"Create New Token"** → cocher `project:releases` →
   copier → `SENTRY_AUTH_TOKEN`

### D.3. Brevo (newsletter / CRM)

1. https://app.brevo.com → **Settings** → **API Keys** → **"Create a new API key"**
2. Scope : au minimum `contacts:write` (pour la fonction `onNewInvestorLead`)
3. Copier → `BREVO_API_KEY`

### D.4. Google Maps API (si utilisé)

1. https://console.cloud.google.com → projet `cocoaranchindustry-98c05`
2. **APIs & Services** → **Library** → activer **Maps JavaScript API**
3. **Credentials** → **Create credentials** → **API key** → restreindre à votre domaine
4. Copier → `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

> 💡 **Si vous n'utilisez pas certains services tiers**, vous pouvez laisser la
> valeur vide : les features concernées seront simplement désactivées.

---

## 📍 Étape E — Me transmettre les valeurs

Une fois les étapes A → D terminées, collez dans le chat :

```
# Web App config (étape A)
apiKey=AIzaSy...
messagingSenderId=1234567890
appId=1:1234567890:web:abcdef...
measurementId=G-XXXXXXX

# Admin SDK (étape B)
client_email=firebase-adminsdk-xxxxx@cocoaranchindustry-98c05.iam.gserviceaccount.com
private_key="-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...\n-----END PRIVATE KEY-----\n"

# Optionnels (étape D)
recaptcha_site_key=6Lc...
sentry_dsn=https://...@sentry.io/...
sentry_auth_token=sntrys_...
brevo_api_key=xkeysib-...
google_maps_key=AIzaSy...

# Domaine Auth déjà ajouté (étape C)
domains_added=cocoaranchindustry.cloud,www.cocoaranchindustry.cloud
```

⚠️ **Ne collez pas le fichier JSON complet** ici (risque d'exposition). Seulement
les 2 champs `client_email` et `private_key`.

---

## 🤖 Ce que je ferai une fois les valeurs reçues

1. **Écrire** `apps/web/.env.production` avec les 2 secrets auto-générés + vos valeurs
2. **Lancer** `node scripts/validate-env.mjs` pour vérifier :
   - Aucun placeholder `<REMPLIR_*>` restant
   - Format PEM valide pour `FIREBASE_PRIVATE_KEY`
   - `SESSION_COOKIE_SECRET` = 64 caractères hex
   - `ENCRYPTION_KEY` = 44 caractères base64
   - Toutes les URLs `https://`
3. **Lancer** `npm run test:firebase` (script déjà dans `package.json`) pour
   confirmer la connexion Admin SDK → Firestore
4. **Vous montrer le diff** final du fichier (lecture seule, à valider)

---

## 🔑 Récapitulatif des secrets auto-générés (déjà prêts)

J'ai généré en local, à utiliser tels quels :

```bash
SESSION_COOKIE_SECRET=1f34d0fd9fe0e870d14d9e1b44d9263e18196156488c46c7a6bb2a456d4f0098
ENCRYPTION_KEY=iFy9Z+UXfxoGOA9NAXjVjbXJPQrSc3ebalsJFnakB5k=
```

> Si vous préférez regénérer les vôtres localement :
>
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
> ```
