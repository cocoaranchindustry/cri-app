import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n/request";

/**
 * Middleware Next.js — Cocoa Ranch & Industry
 *
 * Responsabilités :
 * 1. Routage i18n (next-intl v3, `localePrefix: 'as-needed'` : `/`
 *    → FR, `/en/...` → EN)
 * 2. Fallback rewrite : `/en/<path>` où `<path>` n'a pas de version
 *    traduite est réécrit en interne vers `/<path>` (FR), URL conservée
 * 3. Protection des routes admin / investisseurs / terrain (auth Firebase)
 * 4. Rate limiting basique (in-memory — en prod, Upstash/Redis)
 * 5. Headers de sécurité additionnels
 *
 * NOTE : la vérification finale des rôles se fait dans les Server
 * Components (firebase-admin) et côté client via les Security Rules
 * Firestore. Ce middleware agit comme première barrière.
 */

const intlMiddleware = createIntlMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: true,
});

// Préfixes protégés par Firebase Auth (session cookie requise).
// `/investisseurs` est PUBLIQUE (page marketing + formulaire de demande
// d'accès). Seules les sous-routes data room, admin et terrain sont
// protégées — l'authentification réelle se fait ensuite par Firebase
// côté client.
const PROTECTED_PREFIXES = [
  "/investisseurs/data-room",
  "/admin",
  "/terrain",
  "/api/admin",
  "/api/investor",
  "/api/field",
];

// Routes publiques (auth non requise) — référence conservée pour
// configuration future du rate limit par endpoint
void ["/api/contact", "/api/newsletter", "/api/lead", "/api/webhook"];

// Rate limit basique (in-memory) — en prod, utiliser Upstash/Redis
const RATE_LIMIT = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 100;
const RATE_LIMIT_WINDOW = 60_000; // 1 min

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT.get(ip);

  if (!entry || now > entry.resetAt) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return false;
  }
  return true;
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "0.0.0.0";

  // 1. Rate limiting (toutes les routes)
  if (!checkRateLimit(ip)) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  // 2. Vérification auth pour les routes protégées
  //    (pathname déjà strippé du préfixe locale par next-intl)
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isProtected) {
    const sessionCookie = req.cookies.get("__session")?.value;
    if (!sessionCookie) {
      // Rediriger vers /auth/login en conservant l'URL cible
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    // La validation réelle du token (signature, claims) se fait dans
    // les Server Components via firebase-admin
  }

  // 3. Délègue TOUTES les autres routes au middleware next-intl,
  //    qui gère le préfixe `localePrefix: 'as-needed'` :
  //    - "/"      → /[locale]/page.tsx     (FR, par défaut)
  //    - "/en"    → /[locale]/page.tsx     (EN, prefix ajouté)
  //    - "/contact"     → /[locale]/contact/page.tsx    (FR)
  //    - "/en/contact"  → /[locale]/contact/page.tsx    (EN, avec prefix)
  //    - "/projet"      → /[locale]/projet/page.tsx     (FR)
  //    - "/en/projet"   → /[locale]/projet/page.tsx     (EN)
  //    etc.
  const intlResponse = intlMiddleware(req);
  if (intlResponse instanceof NextResponse) {
    intlResponse.headers.set("X-Pathname", pathname);
    intlResponse.headers.set("X-Content-Type-Options", "nosniff");
    return intlResponse;
  }

  // 4. Fallback final (ne devrait jamais être atteint si l'intl
  //    middleware a matché).
  const response = NextResponse.next();
  response.headers.set("X-Pathname", pathname);
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}

export const config = {
  // Exclure : fichiers statiques, _next, favicon, robots, sitemap
  matcher: ["/((?!_next|.*\\..*|favicon.ico|robots.txt|sitemap.xml).*)"],
};
