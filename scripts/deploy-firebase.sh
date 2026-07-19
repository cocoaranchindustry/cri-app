#!/usr/bin/env bash
# =============================================================================
# Cocoa Ranch & Industry — Déploiement Firebase (rules/indexes/functions)
# =============================================================================
# Authentification via Service Account (CI/CD friendly, pas d'OAuth).
# Stocke la clé JSON dans la variable d'env Dokploy :
#   GOOGLE_APPLICATION_CREDENTIALS_JSON
#
# Usage :
#   ./scripts/deploy-firebase.sh prod                  # rules + indexes (défaut)
#   ./scripts/deploy-firebase.sh prod rules            # uniquement rules
#   ./scripts/deploy-firebase.sh prod functions        # + Cloud Functions
#   ./scripts/deploy-firebase.sh prod all              # rules + indexes + storage + functions
#   ./scripts/deploy-firebase.sh staging               # projet staging
#   ./scripts/deploy-firebase.sh dev                   # projet dev
# =============================================================================

set -euo pipefail

# ─── Args ────────────────────────────────────────────────────────────────
ENV="${1:-prod}"
WHAT="${2:-rules-indexes}"

case "$ENV" in
  prod)    PROJECT_ID="cocoaranchindustry-98c05" ;;
  staging) PROJECT_ID="cri-app-staging" ;;
  dev)     PROJECT_ID="cri-app-dev" ;;
  *)
    echo "❌ ENV invalide : $ENV (attendu : prod | staging | dev)"
    exit 1
    ;;
esac

# ─── Couleurs ────────────────────────────────────────────────────────────
G="\033[1;32m"; Y="\033[1;33m"; R="\033[1;31m"; B="\033[1;34m"; D="\033[0m"

# ─── Authentification via SA JSON inline ──────────────────────────────────
SA_FILE=""
cleanup() { [[ -n "$SA_FILE" && -f "$SA_FILE" ]] && rm -f "$SA_FILE" 2>/dev/null || true; }
trap cleanup EXIT

if [[ -n "${GOOGLE_APPLICATION_CREDENTIALS_JSON:-}" ]]; then
  SA_FILE="/tmp/firebase-sa-$$.json"
  printf '%s' "$GOOGLE_APPLICATION_CREDENTIALS_JSON" > "$SA_FILE"
  chmod 600 "$SA_FILE"
  export GOOGLE_APPLICATION_CREDENTIALS="$SA_FILE"
  echo -e "${B}🔑 Service Account chargé depuis GOOGLE_APPLICATION_CREDENTIALS_JSON${D}"
elif [[ -n "${GOOGLE_APPLICATION_CREDENTIALS:-}" && -f "${GOOGLE_APPLICATION_CREDENTIALS}" ]]; then
  echo -e "${B}🔑 Service Account chargé depuis ${GOOGLE_APPLICATION_CREDENTIALS}${D}"
else
  echo -e "${R}❌ Aucune méthode d'authentification Firebase détectée.${D}"
  echo "   Définir GOOGLE_APPLICATION_CREDENTIALS_JSON (contenu brut)"
  echo "   ou GOOGLE_APPLICATION_CREDENTIALS (chemin fichier)."
  exit 1
fi

# ─── Header ──────────────────────────────────────────────────────────────
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo -e "  ${B}🚀 Déploiement Firebase — ${ENV} (${PROJECT_ID})${D}"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# ─── Cibles ──────────────────────────────────────────────────────────────
case "$WHAT" in
  rules)              TARGETS=("firestore:rules") ;;
  indexes)            TARGETS=("firestore:indexes") ;;
  rules-indexes|"")   TARGETS=("firestore:rules" "firestore:indexes") ;;
  functions)          TARGETS=("functions") ;;
  storage)            TARGETS=("storage") ;;
  all)                TARGETS=("firestore:rules" "firestore:indexes" "storage" "functions") ;;
  *)
    echo -e "${R}❌ WHAT invalide : ${WHAT}${D}"
    echo "   Attendu : rules | indexes | rules-indexes | functions | storage | all"
    exit 1
    ;;
esac

echo -e "${Y}📦 Cibles : ${TARGETS[*]}${D}"
echo ""

# ─── Déploiement séquentiel ──────────────────────────────────────────────
for target in "${TARGETS[@]}"; do
  echo -e "${B}─── Déploiement de ${target} ───${D}"
  if npx firebase deploy --only "$target" --project "$PROJECT_ID" --non-interactive 2>&1; then
    echo -e "${G}✅ ${target} déployé avec succès${D}"
  else
    echo -e "${R}❌ Échec du déploiement de ${target}${D}"
    exit 1
  fi
  echo ""
done

# ─── Footer ──────────────────────────────────────────────────────────────
echo "═══════════════════════════════════════════════════════════════"
echo -e "  ${G}🎉 Déploiement terminé — ${ENV} (${PROJECT_ID})${D}"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo -e "${Y}📋 Vérifications recommandées :${D}"
echo "  • Rules  : https://console.firebase.google.com/project/${PROJECT_ID}/firestore/rules"
echo "  • Indexes: https://console.firebase.google.com/project/${PROJECT_ID}/firestore/indexes"
echo "  • Auth   : https://console.firebase.google.com/project/${PROJECT_ID}/authentication/providers"
echo ""
