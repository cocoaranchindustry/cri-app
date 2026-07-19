# 🚀 Guide de déploiement Dokploy — Cocoa Ranch & Industry

> **Domaine cible** : https://www.cocoaranchindustry.cloud
> **Hébergement** : VPS Hostinger (KVM 2 minimum recommandé)
> **Orchestrateur** : Dokploy (reverse proxy Traefik + Let's Encrypt automatique)

---

## 📋 Pré-requis serveur

- **VPS** Hostinger (KVM 2 minimum : 2 vCPU, 4 GB RAM, 80 GB SSD)
- **OS** : Ubuntu 22.04 LTS ou 24.04 LTS
- **Dokploy** installé ([doc officielle](https://docs.dokploy.com/docs/getting-started/installation))
- **Domaine** `cocoaranchindustry.cloud` pointant vers l'IP du VPS (DNS A + AAAA)
- **Sous-domaine** `www.cocoaranchindustry.cloud` avec CNAME vers `cocoaranchindustry.cloud`

## 1️⃣ Préparer le repo Git

Le repo doit être pushé sur GitHub (ou GitLab) :

```bash
cd "C:\Users\HP\Desktop\Dossier Pour Felix B UGP\COCOA RANCH AND INDUSTRY\LIVRABLES\cri-app"
git init  # si pas déjà fait
git add .
git commit -m "feat: ready for Dokploy deployment"
git branch -M main
git remote add origin https://github.com/<votre-org>/cri-app.git
git push -u origin main
```

> ⚠️ Vérifier que `.env.production` est bien dans `.gitignore` (il l'est déjà).

## 2️⃣ Créer le projet Dokploy

1. Connectez-vous à l'interface Dokploy (ex. `https://dokploy.votreserveur.com`)
2. **Projects** → **Create Project** → nommer `cri-app`
3. À l'intérieur du projet, cliquer **Create Service** → **Application** → **Docker Compose**

## 3️⃣ Configurer la source

- **Source type** : Git
- **Repository** : `https://github.com/<votre-org>/cri-app.git`
- **Branch** : `main`
- **Dockerfile path** : `./Dockerfile` (par défaut)
- **Compose path** : `./docker-compose.yml` (par défaut)
- **Build context** : `.` (par défaut)

## 4️⃣ Variables d'environnement

Dans **Environment Variables** de Dokploy, ajouter **toutes les variables** du fichier `apps/web/.env.production` (⚠️ Dokploy les chiffre au repos) :

| Variable                                   | Valeur (rappel)                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | `<AIza…>`                                                         |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | `cocoaranchindustry-98c05.firebaseapp.com`                                                        |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | `cocoaranchindustry-98c05`                                                                        |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `1001536445407`                                                                                   |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | `1:1001536445407:web:d67d6023fab9c9f0c2826a`                                                      |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`      | `G-WPK22RVV9P`                                                                                    |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`           | (vide ou `6Lc...`)                                                                                |
| `FIREBASE_CLIENT_EMAIL`                    | `<firebase-adminsdk-…@…iam.gserviceaccount.com>`                        |
| `FIREBASE_PRIVATE_KEY`                     | ⚠️ **en gardant les `\n` littéraux** entre les lignes                                             |
| `SESSION_COOKIE_SECRET`                    | `<64 hex chars>`                                |
| `ENCRYPTION_KEY`                           | `<44 base64 chars>`                                                    |
| `BREVO_API_KEY`                            | `<xkeysib-…>`       |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`             | `moccasin-crane-322888.hostingersite.com`                                                         |
| `NEXT_PUBLIC_SENTRY_DSN`                   | `<Sentry DSN>` |
| `SENTRY_AUTH_TOKEN`                        | `<sntryu_…>`                         |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`          | (vide)                                                                                            |
| `NEXT_PUBLIC_APP_URL`                      | `https://www.cocoaranchindustry.cloud`                                                            |

## 5️⃣ Configurer le domaine + HTTPS

1. **Domains** (dans Dokploy) → **Add Domain**
2. **Host** : `www.cocoaranchindustry.cloud`
3. **Service** : `web`
4. **Port** : `3000`
5. **HTTPS** : activé par défaut (Let's Encrypt auto)
6. **HSTS** : activé

Répéter pour le domaine apex (sans `www`) :

- **Host** : `cocoaranchindustry.cloud`
- **Service** : `web`
- **Port** : `3000`

> Dokploy provisionne automatiquement les certificats Let's Encrypt (~30 s).

## 6️⃣ Déployer

1. Cliquer **Deploy** (ou `Save` + `Redeploy` si déjà déployé)
2. Suivre les logs dans l'onglet **Logs**
3. Le build prend ~3-5 min (installe deps + build Next.js)
4. Le healthcheck doit passer en vert

## 7️⃣ Vérification post-déploiement

```bash
# Page d'accueil FR
curl -I https://www.cocoaranchindustry.cloud
# → 200 OK, HSTS, X-Frame-Options: DENY, NEXT_LOCALE=fr

# Page EN
curl -I https://www.cocoaranchindustry.cloud/en
# → 200 OK, NEXT_LOCALE=en

# Headers sécurité
curl -sI https://www.cocoaranchindustry.cloud | grep -iE "(strict-transport|x-frame|content-security)"

# Hreflang SEO
curl -s https://www.cocoaranchindustry.cloud | grep hreflang

# Vérifier que Firebase fonctionne (Auth / Firestore)
curl -s https://www.cocoaranchindustry.cloud/contact
# → 200 OK, formulaire affiché
```

## 8️⃣ Activer la surveillance Sentry (optionnel mais recommandé)

Le token Sentry est déjà dans `.env.production`. Les erreurs 500+ seront automatiquement remontées sur https://sentry.io → projet `cri-web-prod`.

## 9️⃣ Sauvegardes et maintenance

- **Dokploy** sauvegarde automatiquement les `docker-compose.yml` et `.env`
- Pour les **données Firestore** : activer les exports quotidiens via `gcloud firestore export gs://cri-backups-prod/`
- **Monitoring** : Dokploy affiche CPU/RAM/IOPS dans l'onglet **Stats**

## 🆘 Dépannage

| Problème                          | Cause probable                     | Solution                                                           |
| --------------------------------- | ---------------------------------- | ------------------------------------------------------------------ |
| Build fail : "Cannot find module" | Cache npm corrompu                 | Dokploy → **Rebuild** (sans cache)                                 |
| 502 Bad Gateway                   | Le conteneur n'a pas démarré       | Voir **Logs**, vérifier que toutes les env vars sont définies      |
| HSTS pas activé                   | HTTPS pas encore propagé           | Attendre 2-3 min, Dokploy provisionne le cert                      |
| `auth/unauthorized-domain`        | Domaine pas ajouté à Firebase Auth | Retour dans Firebase Console → Authentication → Authorized domains |
| Routes FR/EN KO en prod           | Mauvaise config middleware         | Vérifier `middleware.ts` est bien dans `apps/web/`                 |

## 📞 Contacts

- **DevOps** : équipe CRI
- **Urgences** : [numéro à compléter]
- **Status page** : à créer via https://uptime.statuspage.io (optionnel)
