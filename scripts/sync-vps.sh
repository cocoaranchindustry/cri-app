#!/usr/bin/env bash
# ============================================================================
# Synchronise UNIQUEMENT le code vers le VPS (sans rebuild)
# Utile pour éditer un fichier et tester sans redéployer.
# ============================================================================
set -euo pipefail

VPS_HOST="${VPS_HOST:-root@votre-vps-hostinger}"
REMOTE_DIR="${REMOTE_DIR:-/opt/cri}"
LOCAL_ENV_FILE="${LOCAL_ENV_FILE:-apps/web/.env.production}"
SSH_KEY="${SSH_KEY:-}"
SSH_PORT="${SSH_PORT:-22}"

SSH_OPTS=(-p "$SSH_PORT" -o StrictHostKeyChecking=accept-new)
[[ -n "$SSH_KEY" ]] && SSH_OPTS+=(-i "$SSH_KEY")
SCP_OPTS=(-P "$SSH_PORT" -o StrictHostKeyChecking=accept-new)
[[ -n "$SSH_KEY" ]] && SCP_OPTS+=(-i "$SSH_KEY")

echo "[sync] → ${VPS_HOST}:${REMOTE_DIR}"

TMP_TAR="$(mktemp -t cri-src.XXXXXX.tar.gz)"
trap 'rm -f "$TMP_TAR"' EXIT

tar -czf "$TMP_TAR" \
  --exclude='.git' --exclude='node_modules' --exclude='**/node_modules' \
  --exclude='.next' --exclude='**/.next' --exclude='*.log' \
  --exclude='.env.local' --exclude='brandbook-inspirations' \
  --exclude='design-system' --exclude='.github' --exclude='.husky' \
  --exclude='.agents' --exclude='.claude' --exclude='dev.log' \
  apps/web functions scripts

scp "${SCP_OPTS[@]}" "$TMP_TAR" "${VPS_HOST}:${REMOTE_DIR}/cri-src.tar.gz"
scp "${SCP_OPTS[@]}" "$LOCAL_ENV_FILE" "${VPS_HOST}:${REMOTE_DIR}/.env.production"

ssh "${SSH_OPTS[@]}" "$VPS_HOST" "cd ${REMOTE_DIR} && tar -xzf cri-src.tar.gz --overwrite && rm -f cri-src.tar.gz && echo '[sync] ✓ code synchronisé'"

echo ""
echo "✓ Sync terminé. Le container tourne toujours avec l'ancienne version."
echo "  Pour rebuild + redéployer : npm run vps:deploy"
