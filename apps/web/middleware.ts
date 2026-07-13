import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

/**
 * Middleware Next.js — Cocoa Ranch & Industry
 *
 * Responsabilités :
 * 1. Routage i18n (FR/EN) via next-intl
 * 2. Protection des routes admin / investisseurs / terrain (auth Firebase)
 * 3. Headers de sécurité additionnels
 * 4. Rate limiting basique
 *
 * NOTE : La vérification des rôles finaux se fait côté serveur dans
 * les pages (Server Components) et côté client via les Security Rules
 * Firestore (le middleware ici agit comme première barrière).
 */

const intl = createIntlMiddleware({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
});

const PROTECTED_PREFIXES = [
  "/admin",
  "/investisseurs",
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

export async function middleware(req: NextRequest) {
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
  // (token de session Firebase)
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isProtected) {
    const sessionCookie = req.cookies.get("__session")?.value;
    if (!sessionCookie) {
      // Rediriger vers login en conservant l'URL cible
      const locale = pathname.split("/")[1] || "fr";
      const url = req.nextUrl.clone();
      url.pathname = `/${locale}/auth/login`;
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    // La validation réelle du token (signature, claims) se fait dans
    // les Server Components via firebase-admin
  }

  // 3. i18n routing
  const response = intl(req);

  // 4. Headers additionnels
  response.headers.set("X-Pathname", pathname);
  response.headers.set("X-Content-Type-Options", "nosniff");

  return response;
}

export const config = {
  // Exclure : fichiers statiques, _next, favicon
  matcher: ["/((?!_next|.*\\..*|favicon.ico|robots.txt|sitemap.xml).*)"],
};
