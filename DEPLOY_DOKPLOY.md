# Déploiement Dokploy (VPS Hostinger) — Cocoa Ranch & Industry

> Guide pas-à-pas pour héberger le site web CRI sur **Dokploy**,
> installé sur un **VPS Hostinger**. **Aucun Docker requis sur votre poste** :
> le build se fait directement sur le VPS.

---

## 📋 Prérequis

| Côté                          | Besoin                                                                    |
| ----------------------------- | ------------------------------------------------------------------------- |
| **VPS Hostinger**             | Plan KVM 1 (2 GB RAM) ou KVM 2 (4 GB) — Ubuntu 22.04 / 24.04 ou Debian 12 |
| **Domaine**                   | Acheté chez Hostinger (ou ailleurs)                                       |
| **Local (Windows/Mac/Linux)** | **Aucun logiciel requis** — juste un terminal SSH (intégré partout)       |
| **Backend**                   | Firebase (Firestore + Auth + Storage) — **conservé externe**              |

> 💡 **Bonne nouvelle** : vous n'avez **pas besoin de Docker Desktop** sur votre poste. Le VPS build l'image lui-même. Fonctionne même si la virtualisation est désactivée dans votre BIOS.

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────┐
│  VPS Hostinger                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │  Dokploy (UI :3001, Traefik :80/:443)        │  │
│  │  ┌────────────┐    ┌─────────────────────┐   │  │
│  │  │  cri-web   │    │  cri-functions      │   │  │
│  │  │  Next.js   │    │  (optionnel)        │   │  │
│  │  │  :3000     │    │  :5001              │   │  │
│  │  └────────────┘    └─────────────────────┘   │  │
│  │           ↓                                  │  │
│  │  HTTPS auto (Let's Encrypt via Traefik)      │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────┬───────────────────────────┘
                         │  (firebase-admin + client SDK)
                         ▼
        ┌────────────────────────────┐
        │  Firebase (Google)         │
        │  • Auth · Firestore · Storage │
        │  • Functions (optionnel)   │
        └────────────────────────────┘

Votre poste (Windows/Mac/Linux) :
  → Terminal SSH (OpenSSH, intégré)
  → Aucun Docker, aucun Node.js, aucun Git nécessaire
```

---

## 🚀 Déploiement en 7 étapes

### Étape 1 — Commander un VPS Hostinger

1. https://hpanel.hostinger.com → **VPS** → Commander
2. Plan recommandé :
   - **KVM 1** (2 Go RAM, 1 vCPU) — 1 site, ~5 €/mois
   - **KVM 2** (4 Go RAM, 2 vCPU) — si trafic important, ~10 €/mois
3. OS : **Ubuntu 22.04 LTS** ou **Debian 12**
4. Région : France ou Pays-Bas (le plus proche de vos visiteurs)
5. Vous recevez par email : **IP publique** + **mot de passe root**

> 📝 **Notez l'IP** : vous en aurez besoin à chaque étape. Exemple : `82.66.43.21`

---

### Étape 2 — Pointer le domaine (DNS)

> À faire **avant** l'installation Dokploy, car la propagation DNS peut prendre 1 à 48 h.

1. **hPanel** → **Domaines** → votre-domaine.com → **DNS / Zone**
2. Modifiez ou ajoutez :

| Type | Nom | Valeur                   | TTL   |
| ---- | --- | ------------------------ | ----- |
| A    | @   | `<IP_VPS>`               | 14400 |
| A    | www | `<IP_VPS>`               | 14400 |
| AAAA | @   | `<IPv6_VPS>` (optionnel) | 14400 |

3. Vérifier la propagation :
   ```bash
   dig votre-domaine.com A
   nslookup votre-domaine.com 8.8.8.8
   ```

Si l'IP VPS s'affiche, on peut continuer. Sinon : patience (1-48 h) ou utiliser l'IP en attendant.

---

### Étape 3 — Première connexion SSH + durcissement

#### 3.1. Connexion initiale

**Sur Windows** : ouvrez `Windows Terminal` ou `PowerShell`.  
**Sur macOS/Linux** : ouvrez `Terminal`.

```bash
ssh root@<IP_VPS>
```

Acceptez la fingerprint (`yes`), collez le mot de passe reçu par email.

#### 3.2. Mise à jour + changement de mot de passe

```bash
apt update && apt upgrade -y
passwd                       # change le mot de passe root
hostnamectl set-hostname cri-vps
```

#### 3.3. Installer une clé SSH (recommandé)

**Sur votre machine locale** (pas le VPS) :

```bash
# Génère une clé dédiée (une seule fois)
ssh-keygen -t ed25519 -f ~/.ssh/hostinger_ed25519 -C "cri-deploy"

# Pousse la clé publique sur le VPS (dernière fois avec mot de passe)
ssh-copy-id -i ~/.ssh/hostinger_ed25519 root@<IP_VPS>

# Test : doit se connecter sans mot de passe
ssh -i ~/.ssh/hostinger_ed25519 root@<IP_VPS>
```

> 🔐 Sous Windows avec `ssh-copy-id` indisponible, faites :
>
> ```powershell
> type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh root@<IP_VPS> "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
> ```

#### 3.4. (Optionnel) Désactiver le login par mot de passe

⚠️ **D'abord** vérifiez dans une 2e fenêtre SSH que la clé fonctionne.

```bash
nano /etc/ssh/sshd_config
# Modifier : PasswordAuthentication no
systemctl restart sshd
```

---

### Étape 4 — Installer Dokploy sur le VPS

#### Option A — Script officiel (3 min)

```bash
curl -sSL https://dokploy.com/install.sh | sh
```

#### Option B — Script du projet (Docker + Dokploy + UFW)

**Sur votre poste** :

```bash
# Depuis la racine du projet cri-app/
export VPS_HOST=root@<IP_VPS>
export SSH_KEY=~/.ssh/hostinger_ed25519      # si clé dédiée

npm run vps:setup
```

> Ce script installe aussi Docker, configure le pare-feu UFW (22, 80, 443, 3001) et affiche un récap.

#### Première connexion à l'UI Dokploy

1. Ouvrez **http://`<IP_VPS>`:3001** dans votre navigateur
2. Créez le compte administrateur
3. Vous arrivez sur le dashboard

> 🔒 **Sécuriser le port 3001** (en production) :
>
> ```bash
> ssh root@<IP_VPS>
> ufw delete allow 3001/tcp
> ufw allow from VOTRE_IP to any port 3001 proto tcp
> ```

---

### Étape 5 — Préparer le projet

#### 5.1. Configurer les variables d'environnement Firebase

Éditez le fichier `apps/web/.env.production` du projet :

```bash
cd "C:/Users/HP/Desktop/Dossier Pour Felix B UGP/COCOA RANCH AND INDUSTRY/LIVRABLES/cri-app"
code apps/web/.env.production          # ou notepad, nano, etc.
```

Remplissez les variables Firebase (voir `DEPLOY_DOKPLOY.html` section 8.2 pour le tableau complet).

**Sources des valeurs** :

- `NEXT_PUBLIC_FIREBASE_*` → Firebase Console → ⚙️ Paramètres → Général → "Vos applications" → Config SDK
- `FIREBASE_PRIVATE_KEY` → Firebase Console → Paramètres → Comptes de service → "Générer une nouvelle clé privée"

**Générer les secrets** (Node.js doit être installé) :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"     # SESSION_COOKIE_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"   # ENCRYPTION_KEY
```

#### 5.2. (Facultatif) Tester en local

Si vous avez Docker sur un autre poste, vous pouvez tester avant de pousser :

```bash
docker build -t cri-web:test .
docker run --rm -p 3000:3000 --env-file apps/web/.env.production cri-web:test
# → http://localhost:3000
```

Si Docker ne marche pas sur votre poste : **passez directement à l'étape 6**, le VPS build l'image pour vous.

---

### Étape 6 — Déployer sur le VPS

**Le plus simple :**

```bash
cd "C:/Users/HP/Desktop/Dossier Pour Felix B UGP/COCOA RANCH AND INDUSTRY/LIVRABLES/cri-app"

# Configurer (une seule fois par session terminal)
export VPS_HOST=root@<IP_VPS>
export SSH_KEY=~/.ssh/hostinger_ed25519        # ou vide si clé par défaut

# Déployer
npm run vps:deploy
```

**Ce que fait le script :**

1. 📦 Compresse le code source (`tar.gz` en excluant `node_modules`, `.next`, etc.)
2. 📤 SCP vers `/opt/cri/cri-src.tar.gz` sur le VPS
3. 📝 Envoie `.env.production` aussi
4. 🔨 Sur le VPS : `docker build` de l'image (2-5 min)
5. 🔄 Stoppe l'ancien container, démarre le nouveau
6. ✅ Healthcheck : attend que `/api/health` réponde 200

**Durée totale** : 3-6 min selon la taille du projet et la connexion.

#### Workflow alternatif (via UI Dokploy)

1. Dokploy UI → **Projects** → **Create Project** → `cri-app`
2. **Create Service** → **Docker Image**
3. Image : `cri-web:latest` (build distant — voir option ci-dessous)
4. Onglet **Environment** → collez le contenu de `apps/web/.env.production`
5. Onglet **Domains** → votre-domaine.com + port 3000 + HTTPS ✅

> Pour que Dokploy build l'image : créez d'abord un dépôt Git (GitHub, GitLab, Gitea) avec le code, puis dans Dokploy choisissez **Source: Git** au lieu de Docker Image.

---

### Étape 7 — Activer HTTPS et vérifier

#### 7.1. Domaine + SSL (via Dokploy UI)

> Si vous avez utilisé la méthode `npm run vps:deploy` (container Docker direct), Dokploy ne gère pas automatiquement le HTTPS. Deux options :
>
> **Option 1 — Installer Traefik sur le VPS** (recommandé)
>
> **Option 2 — Laisser Dokploy gérer** : recréez le service via Dokploy UI (Projects → Compose), il ajoute Traefik + Let's Encrypt automatiquement.

Si vous utilisez **Dokploy UI** pour orchestrer :

1. Service → onglet **Domains**
2. **Add Domain** :
   - Host : `votre-domaine.com` (+ `www.votre-domaine.com`)
   - Service Port : `3000`
   - HTTPS : ✅ (Let's Encrypt auto)
   - HSTS : ✅
3. **Save** → certificat généré en ~30 s

#### 7.2. Vérification

```bash
# 1. Container tourne ?
npm run vps:status

# 2. Logs en direct
npm run vps:logs

# 3. Test HTTP direct (si pas de domaine encore)
curl -I http://<IP_VPS>:3000

# 4. Test HTTPS (si domaine propagé)
curl -I https://votre-domaine.com
# Attendu : HTTP/2 200, HSTS, etc.
```

#### 7.3. Checklist post-déploiement

- [ ] Homepage `https://votre-domaine.com` charge la home FR
- [ ] i18n : `https://votre-domaine.com/en` affiche EN
- [ ] Auth Firebase : login modal s'ouvre
- [ ] Firestore : data-room investisseurs lit les docs
- [ ] Storage : upload photo producteur fonctionne
- [ ] `/admin` sans login → redirige vers `/auth/login`
- [ ] SSL : cadenas vert + certificat Let's Encrypt valide
- [ ] Console DevTools : pas d'erreur CSP

#### 7.4. Domaine Firebase Auth (étape souvent oubliée)

Sans cela, l'auth Firebase renverra `auth/unauthorized-domain`.

1. https://console.firebase.google.com → Projet `cri-app-prod`
2. **Authentication** → **Settings** → **Authorized domains**
3. Ajouter : `votre-domaine.com` et `www.votre-domaine.com`

---

## 🔄 Mises à jour ultérieures

### Workflow standard (depuis votre poste)

```bash
cd "C:/Users/HP/Desktop/Dossier Pour Felix B UGP/COCOA RANCH AND INDUSTRY/LIVRABLES/cri-app"

# 1. Modifier le code dans votre éditeur préféré

# 2. Pousser la nouvelle version
VPS_HOST=root@<IP_VPS> npm run vps:deploy
```

Durée : 3-6 min (le build est sur le VPS, votre connexion n'est sollicitée que pour ~5 MB).

### Commandes utiles

```bash
# Synchroniser le code SANS rebuild (édition rapide)
npm run vps:sync

# Voir les logs
npm run vps:logs

# Statut
npm run vps:status

# Rollback manuel (sur le VPS)
ssh root@<IP_VPS>
docker images cri-web        # voir les tags
docker stop cri-web && docker rm cri-web
docker run -d --name cri-web --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  --env-file /opt/cri/.env.production \
  cri-web:VERSION_PRECEDENTE
```

---

## 🆘 Troubleshooting

### Container restart en boucle

```bash
npm run vps:logs       # voir les erreurs
```

Causes fréquentes :

- **Variables env manquantes** : vérifier `.env.production` (SSH sur VPS : `cat /opt/cri/.env.production`)
- **Firebase unreachable** : `curl -I https://firestore.googleapis.com` depuis le VPS
- **Port 3000 occupé** : `docker ps` sur le VPS

### 502 Bad Gateway (si via Traefik)

```bash
ssh root@<IP_VPS> "docker exec cri-web wget -qO- http://127.0.0.1:3000/"
# Si KO → problème Next.js
# Si OK → problème Traefik
```

### DNS ne propage pas

```bash
dig votre-domaine.com A @8.8.8.8
dig votre-domaine.com A @1.1.1.1
```

Attendre 1-48 h ou tester avec l'IP directement.

### Build Docker échoue sur le VPS (out of memory)

Si vous avez pris KVM 1 (2 GB), Dokploy consomme ~1 GB, le build peut être juste :

```bash
ssh root@<IP_VPS> "free -h"   # vérifier la RAM dispo
```

Solutions :

- Upgrade vers KVM 2 (4 GB)
- Ajouter du swap :
  ```bash
  ssh root@<IP_VPS> "fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile && echo '/swapfile none swap sw 0 0' >> /etc/fstab"
  ```

### Erreur `auth/unauthorized-domain`

Vous avez oublié d'ajouter le domaine dans Firebase Auth (étape 7.4).

---

## 💰 Coûts mensuels

| Ressource                                          | Coût             |
| -------------------------------------------------- | ---------------- |
| VPS Hostinger KVM 1 (2 GB)                         | ~5 €/mois        |
| Domaine (renouvellement annuel)                    | ~10 €/an         |
| Firebase Blaze (plan gratuit → payant selon usage) | 0-5 €/mois       |
| Let's Encrypt                                      | Gratuit          |
| **Total**                                          | **~5-10 €/mois** |

---

## 🆚 Comparaison avec l'ancien workflow Railway

| Aspect         | Railway (avant)          | Dokploy + VPS (maintenant) |
| -------------- | ------------------------ | -------------------------- |
| Build          | Nixpacks (cloud)         | Docker (sur VPS)           |
| Coût           | ~5-25 $/mois selon usage | ~5-10 €/mois fixe          |
| Contrôle       | Limité                   | Total (root SSH)           |
| HTTPS          | Auto                     | Auto (Traefik)             |
| Backup DB      | Manquant                 | Possible (snapshot VPS)    |
| Scaling        | Automatique (cher)       | Manuel (rebuild VPS)       |
| Vendor lock-in | Fort (Railway)           | Aucun (Docker standard)    |

---

## 📚 Ressources

- [Dokploy documentation](https://docs.dokploy.com)
- [Next.js Standalone Output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)
- [Hostinger VPS docs](https://www.hostinger.com/tutorials/vps)
- [Traefik reverse-proxy](https://doc.traefik.io/traefik/)
- [Let's Encrypt](https://letsencrypt.org/)
