# syntax=docker/dockerfile:1.7
# ============================================================================
# Cocoa Ranch & Industry — Dockerfile (Next.js 14 web app)
# Multi-stage build optimisé pour Dokploy (VPS Hostinger).
#
# Résultat visé :
#   - Image finale ~180 MB (alpine + standalone Next.js)
#   - User non-root (nextjs:1001)
#   - Build reproductible, layer cache-friendly
#
# Build :  docker build -t cri-web:latest .
# Run   :  docker run --rm -p 3000:3000 --env-file apps/web/.env.production cri-web:latest
# ============================================================================

# ─── Stage 1 : deps (cache npm) ──────────────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copie des manifestes pour profiter du cache Docker.
# Le wildcard *.json protège contre un éventuel yarn.lock parasite.
COPY package.json package-lock.json* ./
COPY apps/web/package.json ./apps/web/package.json
COPY functions/package.json ./functions/package.json

# Install complet (dev inclus) nécessaire pour builder les workspaces
# (firebase-admin, etc. doivent être résolus pour le bundle Next.js).
RUN npm ci --include=dev --workspaces --include-workspace-root \
    --no-audit --no-fund \
 && npm cache clean --force

# ─── Stage 2 : builder (Next.js production build) ───────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV CI=true

# On réutilise node_modules du stage deps (gain ~30 s de cache).
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js (apps/web). STANDALONE_OUTPUT activé dans next.config.js.
RUN npm run build --workspace=apps/web

# ─── Stage 3 : runner (image finale légère) ──────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# User non-root (bonne pratique sécurité + compat Dokploy).
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copie minimale : standalone + static + public.
# Le build standalone inclut déjà les node_modules nécessaires.
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public              ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone   ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static        ./apps/web/.next/static

# Le binaire serveur généré par le mode standalone
# (chemin relatif à la racine de l'image).
# Next.js produit apps/web/server.js dans le bundle standalone.
RUN ls -la apps/web/server.js || (echo "ERREUR: server.js absent du build standalone" && exit 1)

USER nextjs
EXPOSE 3000

# Healthcheck basique (wget présent dans alpine par défaut).
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "apps/web/server.js"]
