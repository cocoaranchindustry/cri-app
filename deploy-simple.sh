#!/usr/bin/env bash
# ============================================================================
# Cocoa Ranch & Industry — Déploiement SIMPLE (sans Firebase)
# ============================================================================
# Pour : afficher le site Next.js sur www.cocoaranchindustry.cloud
# Usage : depuis votre poste Windows (PowerShell, Git Bash, ou WSL)
#
#   1) Copier ce fichier à la racine du projet cri-app/
#   2) Configurer VPS_HOST
#   3) Lancer :  bash deploy-simple.sh
#
# Pré-requis :
#   - Clé SSH déjà autorisée sur le VPS (ssh-copy-id déjà fait)
#   - Dokploy installé sur le VPS (déjà fait)
#   - DNS @ et www pointent vers l'IP du VPS
# ============================================================================
set -euo pipefail

# ─── CONFIGURATION ─────────────────────────────────────────────────────
VPS_HOST="${VPS_HOST:-root@187.55.229.153}"
REMOTE_DIR="${REMOTE_DIR:-/opt/cri}"
CONTAINER_NAME="${CONTAINER_NAME:-cri-web}"
SSH_KEY="${SSH_KEY:-}"           # ex: -i ~/.ssh/hostinger_ed25519
SSH_PORT="${SSH_PORT:-22}"
DOMAIN="${DOMAIN:-cocoaranchindustry.cloud}"
DOMAIN_WWW="www.${DOMAIN}"

# ─── COULEURS ──────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
log()  { printf "${BLUE}[deploy]${NC} %s\n" "$*"; }
ok()   { printf "${GREEN}[ok]${NC} %s\n"      "$*"; }
warn() { printf "${YELLOW}[warn]${NC} %s\n"   "$*"; }
die()  { printf "${RED}[fail]${NC} %s\n"     "$*" >&2; exit 1; }

# ─── CHECKS INITIAUX ───────────────────────────────────────────────────
cd "$(dirname "$0")"  # se place à la racine du projet
[[ -f Dockerfile ]]     || die "Dockerfile introuvable — lance depuis cri-app/"
[[ -f docker-compose.yml ]] || die "docker-compose.yml introuvable"

SSH_OPTS=(-p "$SSH_PORT" -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10)
[[ -n "$SSH_KEY" ]] && SSH_OPTS+=(-i "$SSH_KEY")
SCP_OPTS=(-P "$SSH_PORT" -o StrictHostKeyChecking=accept-new)
[[ -n "$SSH_KEY" ]] && SCP_OPTS+=(-i "$SSH_KEY")

log "VPS : $VPS_HOST"
log "Domaine : $DOMAIN + $DOMAIN_WWW"

# ─── TEST SSH ──────────────────────────────────────────────────────────
log "Test de connexion SSH..."
if ! ssh "${SSH_OPTS[@]}" "$VPS_HOST" 'echo OK' >/dev/null 2>&1; then
  die "Connexion SSH impossible. Vérifier clé SSH et IP."
fi
ok "SSH OK"

# ─── 1. TRANSFERT DU CODE ─────────────────────────────────────────────
log "Étape 1/3 — envoi du code source..."
ssh "${SSH_OPTS[@]}" "$VPS_HOST" "mkdir -p $REMOTE_DIR"

# Crée un .env.production minimal si absent (sans Firebase)
if [[ ! -f apps/web/.env.production ]]; then
  warn "apps/web/.env.production absent — création d'un fichier minimal"
  cat > apps/web/.env.production <<EOF
NEXT_PUBLIC_APP_URL=https://${DOMAIN_WWW}
NEXT_PUBLIC_APP_NAME="Cocoa Ranch & Industry"
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_LOCALE_DEFAULT=fr
NEXT_PUBLIC_LOCALE_SUPPORTED=fr,en
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
EOF
fi

# Envoie juste le strict minimum
ssh "${SSH_OPTS[@]}" "$VPS_HOST" "rm -rf $REMOTE_DIR/apps $REMOTE_DIR/scripts 2>/dev/null || true"
scp -r "${SCP_OPTS[@]}" apps/web "$VPS_HOST:$REMOTE_DIR/apps/web"
scp -r "${SCP_OPTS[@]}" functions "$VPS_HOST:$REMOTE_DIR/functions" 2>/dev/null || true
scp "${SCP_OPTS[@]}" docker-compose.yml "$VPS_HOST:$REMOTE_DIR/docker-compose.yml"
scp "${SCP_OPTS[@]}" Dockerfile "$VPS_HOST:$REMOTE_DIR/Dockerfile"
scp "${SCP_OPTS[@]}" apps/web/.env.production "$VPS_HOST:$REMOTE_DIR/.env.production"
ok "Code transféré."

# ─── 2. BUILD SUR LE VPS ──────────────────────────────────────────────
log "Étape 2/3 — build de l'image Docker sur le VPS (3-5 min)..."
ssh "${SSH_OPTS[@]}" "$VPS_HOST" bash <<REMOTE
set -euo pipefail
cd $REMOTE_DIR

echo "[vps] docker build..."
docker build -t cri-web:latest -f Dockerfile . 2>&1 | tail -20
echo "[vps] ✓ image construite"
REMOTE
ok "Image construite."

# ─── 3. LANCEMENT AVEC TRAEFIK AUTO ───────────────────────────────────
log "Étape 3/3 — détection réseau Traefik + lancement..."

# Le script bash distant détecte le réseau et lance le container avec les bons labels
ssh "${SSH_OPTS[@]}" "$VPS_HOST" bash -s "$CONTAINER_NAME" "$DOMAIN" "$DOMAIN_WWW" "$REMOTE_DIR" <<'REMOTE'
set -euo pipefail
NAME="$1"; DOMAIN="$2"; DOMAIN_WWW="$3"; DIR="$4"
cd "$DIR"

echo "[vps] recherche du réseau Traefik Dokploy..."
TRAEFIK_NETWORK=""
for net in dokploy-network dokploy traefik traefik-public dokploy_traefik dokploy_default; do
  if docker network inspect "$net" >/dev/null 2>&1; then
    TRAEFIK_NETWORK="$net"
    echo "[vps] ✓ réseau trouvé : $net"
    break
  fi
done

# Stoppe l'ancien container
echo "[vps] arrêt de l'ancien container..."
docker stop "$NAME" 2>/dev/null || true
docker rm   "$NAME" 2>/dev/null || true

if [[ -n "$TRAEFIK_NETWORK" ]]; then
  echo "[vps] lancement avec Traefik (HTTPS auto via Let's Encrypt)..."
  docker run -d \
    --name "$NAME" \
    --restart unless-stopped \
    --network "$TRAEFIK_NETWORK" \
    --label traefik.enable=true \
    --label traefik.docker.network="$TRAEFIK_NETWORK" \
    --label "traefik.http.routers.${NAME}.rule=Host(\`${DOMAIN}\`) || Host(\`${DOMAIN_WWW}\`)" \
    --label "traefik.http.routers.${NAME}.entrypoints=websecure" \
    --label "traefik.http.routers.${NAME}.tls=true" \
    --label "traefik.http.routers.${NAME}.tls.certresolver=letsencrypt" \
    --label "traefik.http.routers.${NAME}-http.rule=Host(\`${DOMAIN}\`) || Host(\`${DOMAIN_WWW}\`)" \
    --label "traefik.http.routers.${NAME}-http.entrypoints=web" \
    --label "traefik.http.routers.${NAME}-http.middlewares=redirect-to-https@docker" \
    --label "traefik.http.services.${NAME}.loadbalancer.server.port=3000" \
    --env-file .env.production \
    -e NODE_ENV=production \
    -e PORT=3000 \
    -e HOSTNAME=0.0.0.0 \
    --health-cmd="wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1" \
    --health-interval=30s \
    --health-timeout=10s \
    --health-retries=3 \
    cri-web:latest
else
  echo "[vps] ⚠ réseau Traefik non trouvé, fallback sur 127.0.0.1:3000"
  docker run -d \
    --name "$NAME" \
    --restart unless-stopped \
    -p 127.0.0.1:3000:3000 \
    --env-file .env.production \
    -e NODE_ENV=production \
    -e PORT=3000 \
    -e HOSTNAME=0.0.0.0 \
    --health-cmd="wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1" \
    --health-interval=30s \
    --health-timeout=10s \
    --health-retries=3 \
    cri-web:latest
fi

echo "[vps] attente du healthcheck (30s)..."
for i in {1..15}; do
  sleep 2
  STATUS=$(docker inspect --format='{{.State.Health.Status}}' "$NAME" 2>/dev/null || echo "starting")
  echo "  [$i] $STATUS"
  if [ "$STATUS" = "healthy" ]; then
    echo "[vps] ✓ container healthy"
    exit 0
  fi
done

echo "[vps] ⚠ non healthy, logs :"
docker logs --tail 30 "$NAME" || true
exit 1
REMOTE

ok "Container démarré."

# ─── RÉSUMÉ ────────────────────────────────────────────────────────────
echo ""
echo "════════════════════════════════════════════════════"
printf "${GREEN}✓ Déploiement terminé${NC}\n"
echo "════════════════════════════════════════════════════"
echo ""
echo "🌐 Test : https://${DOMAIN_WWW}"
echo "         https://${DOMAIN}"
echo ""
echo "📊 Statut : ssh ${VPS_HOST} 'docker ps --filter name=cri-web'"
echo "📋 Logs   : ssh ${VPS_HOST} 'docker logs -f cri-web'"
echo ""
warn "Si DNS pas encore propagé, le HTTPS peut prendre 1-48h."
warn "Pour tester direct par IP : http://187.55.229.153:3000 (si ouvert)"
