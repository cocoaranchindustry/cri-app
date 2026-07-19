/**
 * Next.js config — Cocoa Ranch & Industry
 *
 * SÉCURITÉ :
 * - Headers stricts (CSP, HSTS, X-Frame-Options, etc.)
 * - Bundle analyzer (optionnel via ANALYZE=true)
 * - Images : whitelist pour les médias CRI + Firebase Storage
 *
 * i18n : intégration next-intl v3 via `createNextIntlPlugin` qui
 * résout `./i18n/request.ts` automatiquement.
 */

const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(self), microphone=(), geolocation=(self), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.firebaseio.com https://*.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https: http://localhost:3000",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.cloudfunctions.net wss://*.firebaseio.com https://*.sentry.io https://*.tile.openstreetmap.org https://*.openstreetmap.org",
      "tile-src 'self' https://*.tile.openstreetmap.org data: blob:",
      "worker-src 'self' blob:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output : génère un serveur Node.js minimal (~50 MB)
  // incluant uniquement les dépendances runtime. Utilisé par le
  // Dockerfile Dokploy pour produire une image de prod légère.
  // Voir : https://nextjs.org/docs/app/api-reference/config/next-config-js/output
  output: "standalone",

  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  experimental: {
    optimizePackageImports: ["lucide-react", "recharts"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/api/(.*)",
        headers: [...securityHeaders, { key: "Cache-Control", value: "no-store, max-age=0" }],
      },
    ];
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// Ordre d'application des wrappers : next-intl d'abord (le plugin
// ajoute le wiring i18n dans le build), puis le bundle analyzer en
// couche externe.
module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
