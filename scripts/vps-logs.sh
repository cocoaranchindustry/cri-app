#!/usr/bin/env bash
# ============================================================================
# Logs en temps réel du container cri-web sur le VPS
# ============================================================================
VPS_HOST="${VPS_HOST:-root@votre-vps-hostinger}"
SSH_KEY="${SSH_KEY:-}"
SSH_OPTS=(-o StrictHostKeyChecking=accept-new)
[[ -n "$SSH_KEY" ]] && SSH_OPTS+=(-i "$SSH_KEY")

echo "[vps-logs] Connexion à ${VPS_HOST}..."
ssh "${SSH_OPTS[@]}" "$VPS_HOST" 'docker logs -f --tail=100 cri-web'
