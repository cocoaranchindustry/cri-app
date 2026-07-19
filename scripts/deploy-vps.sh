#!/usr/bin/env bash
# ============================================================================
# Cocoa Ranch & Industry — Synchronisation code + déploiement via Dokploy
# ============================================================================
# Workflow : on ne build PAS l'image Docker en local. On :
#   1. Synchronise le code source vers le VPS (rsync/scp + tar.gz)
#   2. Déclenche le build distant via docker compose (sur le VPS)
#   3. Redémarre le container
#
# Avantage : pas besoin de Docker Desktop / WSL2 / Hyper-V sur le poste local.
# Le VPS a déjà Docker (installé par dokploy-setup.sh).
#
# Usage :
#   ./scripts/deploy-vps.sh                                  # workflow complet
#   VPS_HOST=root@82.66.43.21 ./scripts/deploy-vps.sh        # autre hôte
#   SKIP_SYNC=1 ./scripts/deploy-vps.sh                      # pas de sync
#   NO_BUILD=1 ./scripts/deploy-vps.sh                       # sync seulement
#
# Pré-requis :
#   - VPS Hostinger avec Dokploy installé (cf. scripts/dokploy-setup.sh)
#   - Clé SSH configurée (ssh-copy-id déjà fait)
#   - /opt/cri créé sur le VPS
# ============================================================================
set -euo pipefail

# ─── Configuration (surchargeable par env) ───────────────────────────────
VPS_HOST="${VPS_HOST:-root@votre-vps-hostinger}"
REMOTE_DIR="${REMOTE_DIR:-/opt/cri}"
CONTAINER_NAME="${CONTAINER_NAME:-cri-web}"
LOCAL_ENV_FILE="${LOCAL_ENV_FILE:-apps/web/.env.production}"
SSH_PORT="${SSH_PORT:-22}"
SSH_KEY="${SSH_KEY:-}"
SKIP_SYNC="${SKIP_SYNC:-0}"
NO_BUILD="${NO_BUILD:-0}"

# Domaine(s) à router vers cri-web via Traefik (Dokploy).
# Par défaut : cocoaranchindustry.cloud + www.
DOMAIN_PRIMARY="${DOMAIN_PRIMARY:-cocoaranchindustry.cloud}"
DOMAIN_WWW="${DOMAIN_WWW:-www.${DOMAIN_PRIMARY}}"
# Réseau Docker utilisé par Dokploy/Traefik (laisser vide pour ne PAS s'y attacher)
DOKPLOY_NETWORK="${DOKPLOY_NETWORK:-dokploy-network}"

# ─── Couleurs ─────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log()  { printf "${BLUE}[deploy]${NC} %s\n" "$*"; }
ok()   { printf "${GREEN}[ok]${NC} %s\n"      "$*"; }
warn() { printf "${YELLOW}[warn]${NC} %s\n"   "$*"; }
die()  { printf "${RED}[fail]${NC} %s\n"     "$*" >&2; exit 1; }

# ─── Sanity checks ───────────────────────────────────────────────────────
[[ -f Dockerfile ]]            || die "Dockerfile introuvable (lance depuis la racine du projet)"
[[ -f "$LOCAL_ENV_FILE" ]]     || die "Fichier env manquant : $LOCAL_ENV_FILE"
[[ -f docker-compose.yml ]]    || die "docker-compose.yml introuvable (lance depuis la racine du projet)"

# SSH options réutilisables
SSH_OPTS=(-p "$SSH_PORT" -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10)
[[ -n "$SSH_KEY" ]] && SSH_OPTS+=(-i "$SSH_KEY")
SCP_OPTS=(-P "$SSH_PORT" -o StrictHostKeyChecking=accept-new)
[[ -n "$SSH_KEY" ]] && SCP_OPTS+=(-i "$SSH_KEY")

SSH="ssh ${SSH_OPTS[*]} $VPS_HOST"
SCP="scp ${SCP_OPTS[*]}"

log "VPS cible   : ${VPS_HOST}"
log "Dossier VPS : ${REMOTE_DIR}"
log "Env local   : ${LOCAL_ENV_FILE}"

# ─── Test de connectivité SSH ───────────────────────────────────────────
log "Test de connectivité SSH..."
if ! $SSH 'echo OK' >/dev/null 2>&1; then
  die "Connexion SSH impossible vers ${VPS_HOST}.
   → Vérifier que Dokploy est installé
   → ssh-copy-id -i ${SSH_KEY:-~/.ssh/id_rsa} $VPS_HOST"
fi
ok "SSH OK"

# ─── 1. Synchronisation du code source ──────────────────────────────────
if [[ "$SKIP_SYNC" != "1" ]]; then
  log "Étape 1/3 — création de l'archive source..."

  TMP_TAR="$(mktemp -t cri-src.XXXXXX.tar.gz)"
  trap 'rm -f "$TMP_TAR"' EXIT

  # Tar gzip en excluant tout ce qu'on n'a pas besoin d'envoyer au VPS.
  tar --exclude='.git' \
      --exclude='node_modules' \
      --exclude='**/node_modules' \
      --exclude='.next' \
      --exclude='**/.next' \
      --exclude='out' \
      --exclude='**/out' \
      --exclude='*.log' \
      --exclude='.env.local' \
      --exclude='.env.*.local' \
      --exclude='coverage' \
      --exclude='playwright-report' \
      --exclude='test-results' \
      --exclude='.tsbuildinfo' \
      --exclude='.DS_Store' \
      --exclude='brandbook-inspirations' \
      --exclude='design-system' \
      --exclude='.github' \
      --exclude='.husky' \
      --exclude='.agents' \
      --exclude='.claude' \
      --exclude='dev.log' \
      --exclude='npm-install.log' \
      --exclude='skills-lock.json' \
      -czf "$TMP_TAR" \
      -- \
      apps/web \
      functions \
      scripts \
      public_html_.htaccess 2>/dev/null || true \
      apps/web \
      functions \
      scripts \
      public_html_.htaccess 2>/dev/null || true \
      apps/web functions scripts

  SRC_SIZE=$(du -h "$TMP_TAR" | cut -f1)
  log "Archive créée : ${SRC_SIZE}"

  log "Transfert vers ${VPS_HOST}:${REMOTE_DIR}/..."
  $SSH "mkdir -p ${REMOTE_DIR}"
  $SCP "$TMP_TAR" "${VPS_HOST}:${REMOTE_DIR}/cri-src.tar.gz"

  # Envoie aussi l'env de prod.
  $SCP "$LOCAL_ENV_FILE" "${VPS_HOST}:${REMOTE_DIR}/.env.production"

  log "Extraction sur le VPS..."
  $SSH "cd ${REMOTE_DIR} && tar -xzf cri-src.tar.gz --overwrite && rm -f cri-src.tar.gz && ls -la"
  ok "Code synchronisé."
else
  log "Étape 1/3 — SKIP_SYNC=1, pas de transfert de code."
fi

# ─── 2. Build distant + redémarrage ────────────────────────────────────
if [[ "$NO_BUILD" != "1" ]]; then
  log "Étape 2/3 — build distant + redémarrage du container..."

  $SSH bash <<REMOTE
set -euo pipefail
cd ${REMOTE_DIR}

echo "[vps] Docker version :"
docker --version

echo "[vps] Nettoyage des containers/images orphelins..."
docker container prune -f >/dev/null 2>&1 || true
docker image prune -f >/dev/null 2>&1 || true

echo "[vps] Build de l'image cri-web:latest (peut prendre 2-5 min)..."
docker build \
  -t cri-web:latest \
  -f Dockerfile \
  . 2>&1 | tail -20

echo "[vps] Arrêt de l'ancien container ${CONTAINER_NAME} (s'il existe)..."
docker stop ${CONTAINER_NAME} 2>/dev/null || true
docker rm   ${CONTAINER_NAME} 2>/dev/null || true

echo "[vps] Lancement du nouveau container..."

# Détection automatique du réseau Traefik (Dokploy) parmi les candidats courants.
# Si trouvé : on attache le container à ce réseau + on colle les labels Traefik
# (HTTPS via Let's Encrypt automatique).
# Sinon : fallback sur 127.0.0.1:3000 (le user devra alors router via Dokploy UI).
TRAEFIK_NETWORK=""
for net in "${DOKPLOY_NETWORK}" dokploy-network dokploy traefik traefik-public dokploy_traefik dokploy_default; do
  if docker network inspect "$net" >/dev/null 2>&1; then
    TRAEFIK_NETWORK="$net"
    break
  fi
done

if [[ -n "$TRAEFIK_NETWORK" ]]; then
  echo "[vps] réseau Traefik détecté : '${TRAEFIK_NETWORK}' → activation HTTPS auto"
  # shellcheck disable=SC2086
  docker run -d \
    --name ${CONTAINER_NAME} \
    --restart unless-stopped \
    --network ${TRAEFIK_NETWORK} \
    --label traefik.enable=true \
    --label traefik.docker.network=${TRAEFIK_NETWORK} \
    --label "traefik.http.routers.${CONTAINER_NAME}.rule=Host(\`${DOMAIN_PRIMARY}\`) || Host(\`${DOMAIN_WWW}\`)" \
    --label traefik.http.routers.${CONTAINER_NAME}.entrypoints=websecure \
    --label traefik.http.routers.${CONTAINER_NAME}.tls=true \
    --label traefik.http.routers.${CONTAINER_NAME}.tls.certresolver=letsencrypt \
    --label "traefik.http.routers.${CONTAINER_NAME}-http.rule=Host(\`${DOMAIN_PRIMARY}\`) || Host(\`${DOMAIN_WWW}\`)" \
    --label traefik.http.routers.${CONTAINER_NAME}-http.entrypoints=web \
    --label traefik.http.routers.${CONTAINER_NAME}-http.middlewares=redirect-to-https@docker \
    --label traefik.http.services.${CONTAINER_NAME}.loadbalancer.server.port=3000 \
    --env-file .env.production \
    -e NODE_ENV=production \
    -e PORT=3000 \
    -e HOSTNAME=0.0.0.0 \
    --health-cmd="wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/" \
    --health-interval=30s \
    --health-timeout=10s \
    --health-retries=3 \
    cri-web:latest
else
  echo "[vps] ⚠ aucun réseau Traefik trouvé (${DOKPLOY_NETWORK}, dokploy-network, ...)"
  echo "[vps]   → fallback : container exposé sur 127.0.0.1:3000 (à router via Dokploy UI)"
  docker run -d \
    --name ${CONTAINER_NAME} \
    --restart unless-stopped \
    -p 127.0.0.1:3000:3000 \
    --env-file .env.production \
    -e NODE_ENV=production \
    -e PORT=3000 \
    -e HOSTNAME=0.0.0.0 \
    --health-cmd="wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/" \
    --health-interval=30s \
    --health-timeout=10s \
    --health-retries=3 \
    cri-web:latest
fi

echo "[vps] Attente du healthcheck (30 s)..."
for i in {1..15}; do
  sleep 2
  STATUS=\$(docker inspect --format='{{.State.Health.Status}}' ${CONTAINER_NAME} 2>/dev/null || echo "starting")
  echo "  [\$i] status: \$STATUS"
  if [ "\$STATUS" = "healthy" ]; then
    echo "[vps] ✓ container healthy"
    exit 0
  fi
done

echo "[vps] ⚠ container non healthy après 30 s, voici les logs :"
docker logs --tail 30 ${CONTAINER_NAME} || true
exit 1
REMOTE

  ok "Container redéployé."
else
  log "Étape 2/3 — NO_BUILD=1, build ignoré."
fi

# ─── 3. Vérification finale ────────────────────────────────────────────
log "Étape 3/3 — vérification..."
$SSH "docker ps --filter name=${CONTAINER_NAME} --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'"

ok "════════════════════════════════════════════════════"
ok "✓ Déploiement terminé sur ${VPS_HOST}"
ok "════════════════════════════════════════════════════"
log "Pour voir les logs en temps réel :"
log "  npm run vps:logs"
log ""
log "Pour voir le statut :"
log "  npm run vps:status"
log ""
log "URL de l'app (si DNS configuré) :"
log "  https://votre-domaine.com"
