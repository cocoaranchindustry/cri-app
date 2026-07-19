#!/usr/bin/env bash
# ============================================================================
# Cocoa Ranch & Industry — Installation Dokploy sur VPS Hostinger
# ============================================================================
# À exécuter UNE SEULE FOIS sur le VPS, après vous être connecté en SSH.
#
# Usage (en local) :
#   scp scripts/dokploy-setup.sh root@<ip-vps>:/tmp/
#   ssh root@<ip-vps> 'bash /tmp/dokploy-setup.sh'
#
# Ou directement depuis le VPS :
#   curl -sSL https://raw.githubusercontent.com/<votre-org>/cri-app/main/scripts/dokploy-setup.sh | bash
#
# Pré-requis : Ubuntu 22.04+ ou Debian 12+, accès root.
# ============================================================================
set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
log()  { printf "${BLUE}[setup]${NC} %s\n" "$*"; }
ok()   { printf "${GREEN}[ok]${NC} %s\n"    "$*"; }
warn() { printf "${YELLOW}[warn]${NC} %s\n" "$*"; }
die()  { printf "${RED}[fail]${NC} %s\n"   "$*" >&2; exit 1; }

# ─── 0. Vérifications préalables ────────────────────────────────────────
[[ $EUID -eq 0 ]] || die "Lance ce script en root : sudo bash $0"

. /etc/os-release
case "${ID:-}" in
  ubuntu) [[ "${VERSION_ID:-0}" =~ ^(20\.04|22\.04|24\.04)$ ]] || warn "Ubuntu ${VERSION_ID} non testé (recommandé : 22.04 ou 24.04)" ;;
  debian) [[ "${VERSION_ID:-0}" =~ ^(11|12)$ ]]                || warn "Debian ${VERSION_ID} non testé (recommandé : 12)" ;;
  *) die "OS non supporté : ${ID:-inconnu}. Utilise Ubuntu 22.04/24.04 ou Debian 12." ;;
esac

# ─── 1. Mise à jour + paquets de base ────────────────────────────────────
log "Étape 1/5 — apt update + paquets de base..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y --no-install-recommends \
  ca-certificates curl wget gnupg lsb-release \
  apt-transport-https software-properties-common \
  ufw fail2ban jq
ok "Paquets de base installés."

# ─── 2. Installation Docker (si absent) ─────────────────────────────────
if ! command -v docker >/dev/null 2>&1; then
  log "Étape 2/5 — installation de Docker..."
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/${ID}/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/${ID} \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -qq
  apt-get install -y --no-install-recommends docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  ok "Docker installé : $(docker --version)"
else
  ok "Docker déjà installé : $(docker --version)"
fi

# ─── 3. Pare-feu UFW (80/443/22) ───────────────────────────────────────
log "Étape 3/5 — configuration du pare-feu..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp  comment "SSH"
ufw allow 80/tcp  comment "HTTP (Traefik)"
ufw allow 443/tcp comment "HTTPS (Traefik)"
ufw allow 3000/tcp comment "CRI web (interne)" || true
# Port UI Dokploy (à restreindre ensuite par IP si possible)
ufw allow 3001/tcp comment "Dokploy UI" || true
ufw --force enable
ok "UFW activé (22, 80, 443, 3001)."

# ─── 4. Installation Dokploy ───────────────────────────────────────────
if ! command -v dokploy >/dev/null 2>&1; then
  log "Étape 4/5 — installation de Dokploy..."
  curl -sSL https://dokploy.com/install.sh | sh
  ok "Dokploy installé."
else
  ok "Dokploy déjà installé."
fi

# ─── 5. Résumé + prochaines étapes ─────────────────────────────────────
VPS_IP=$(curl -s --max-time 5 ifconfig.me || echo "IP_NON_DETECTEE")
cat <<EOF

${GREEN}═══════════════════════════════════════════════════════════════${NC}
${GREEN} ✓ Installation Dokploy terminée sur le VPS Hostinger${NC}
${GREEN}═══════════════════════════════════════════════════════════════${NC}

IP publique : ${VPS_IP}

${YELLOW}PROCHAINES ÉTAPES :${NC}

1) Accède à l'interface Dokploy (créer le compte admin) :
   http://${VPS_IP}:3001

2) DNS — chez Hostinger, configure un A record :
   Type: A
   Name: @        (ou sous-domaine ex: app)
   Value: ${VPS_IP}
   TTL : 14400

3) Sur Dokploy UI, crée un nouveau projet :
   - Source  : Docker Compose (upload du docker-compose.yml)
   - OU      : Docker Image (push manuel via script deploy-vps.sh)
   - Domain  : ton-domaine.com (HTTPS auto via Traefik + Let's Encrypt)

4) Variables d'environnement Firebase : colle le contenu de
   apps/web/.env.production dans l'onglet "Environment" du service.

5) Depuis ton Mac, pousse l'image :
   VPS_HOST=root@${VPS_IP} npm run docker:push:vps

${BLUE}Commandes utiles :${NC}
  dokploy              # CLI Dokploy
  docker ps            # containers actifs
  docker logs cri-web  # logs du container
  ufw status           # statut pare-feu

EOF
ok "Setup Dokploy complet. Va sur http://${VPS_IP}:3001 pour finaliser."
