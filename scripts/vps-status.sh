#!/usr/bin/env bash
# ============================================================================
# Statut du container cri-web sur le VPS (CPU/RAM/healthcheck)
# ============================================================================
VPS_HOST="${VPS_HOST:-root@votre-vps-hostinger}"
SSH_KEY="${SSH_KEY:-}"
SSH_OPTS=(-o StrictHostKeyChecking=accept-new)
[[ -n "$SSH_KEY" ]] && SSH_OPTS+=(-i "$SSH_KEY")

echo "════════════════════════════════════════════════════"
echo " CRI App — Statut VPS"
echo "════════════════════════════════════════════════════"

ssh "${SSH_OPTS[@]}" "$VPS_HOST" bash <<'REMOTE'
echo ""
echo "▸ Containers actifs :"
docker ps --filter name=cri-web --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}' || echo "  (aucun)"

echo ""
echo "▸ Healthcheck :"
docker inspect --format='{{.State.Health.Status}}' cri-web 2>/dev/null || echo "  (container absent)"

echo ""
echo "▸ Image déployée :"
docker images cri-web --format 'table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedSince}}' 2>/dev/null

echo ""
echo "▸ Utilisation disque Docker :"
docker system df 2>/dev/null

echo ""
echo "▸ Espace disque VPS :"
df -h / 2>/dev/null | tail -2

echo ""
echo "▸ Utilisation RAM :"
free -h 2>/dev/null | head -3
REMOTE
