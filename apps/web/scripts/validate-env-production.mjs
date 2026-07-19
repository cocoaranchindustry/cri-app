/**
 * Validation du fichier .env.production
 *
 * Vérifie avant déploiement que :
 * 1. Aucun placeholder `<REMPLIR_*>` ne subsiste
 * 2. Les formats attendus sont respectés (PEM, base64, hex, URLs https)
 * 3. Les longueurs sont conformes
 * 4. Les paires project_id / auth_domain / storage_bucket sont cohérentes
 * 5. La clé privée Firebase Admin est au format PEM valide
 *
 * Usage :
 *   node apps/web/scripts/validate-env-production.mjs
 *   npm run validate:env  (à ajouter au package.json)
 *
 * Exit codes :
 *   0 = tout est OK
 *   1 = au moins une erreur bloquante
 *   2 = uniquement des warnings
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadDotenv } from "dotenv";
import crypto from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ENV_PATH = resolve(__dirname, "../.env.production");

// ─── Couleurs terminal ────────────────────────────────────────────────
const c = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
};
const ok = (s) => `${c.green}✓${c.reset} ${s}`;
const ko = (s) => `${c.red}✗${c.reset} ${s}`;
const warn = (s) => `${c.yellow}⚠${c.reset}  ${s}`;
const info = (s) => `${c.blue}ℹ${c.reset}  ${s}`;
const head = (s) => `${c.bold}${c.blue}${s}${c.reset}`;

// ─── Chargement ───────────────────────────────────────────────────────
console.log("═══════════════════════════════════════════════════════════");
console.log(head("  🔐 Validation .env.production — Cocoa Ranch & Industry"));
console.log("═══════════════════════════════════════════════════════════\n");

if (!existsSync(ENV_PATH)) {
  console.error(ko(`.env.production introuvable à : ${ENV_PATH}`));
  console.error(info("Créer le fichier à partir de .env.example et relancer."));
  process.exit(1);
}

loadDotenv({ path: ENV_PATH });
console.log(ok(`.env.production chargé depuis : ${ENV_PATH}\n`));

// ─── Compteurs ────────────────────────────────────────────────────────
const errors = [];
const warnings = [];

// ─── Helpers ──────────────────────────────────────────────────────────
function isHttpsUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "https:";
  } catch {
    return false;
  }
}

function isHex(value, expectedLength) {
  return /^[0-9a-f]+$/i.test(value) && value.length === expectedLength;
}

function isBase64(value, expectedLength) {
  return /^[A-Za-z0-9+/]+=*$/.test(value) && value.length === expectedLength;
}

function isPEMPrivateKey(value) {
  // Accepte les \n littéraux (env var) ET les vrais retours à la ligne
  const normalized = value.replace(/\\n/g, "\n");
  return (
    normalized.includes("-----BEGIN PRIVATE KEY-----") &&
    normalized.includes("-----END PRIVATE KEY-----") &&
    normalized.length > 100
  );
}

function mask(value, type = "secret") {
  if (!value) return "(vide)";
  if (type === "email") return value;
  if (type === "url") return value;
  if (type === "gauge") return value; // measurement ID
  if (value.length < 12) return value;
  return `${value.slice(0, 6)}…${value.slice(-4)} (${value.length} chars)`;
}

function checkRequired(name, opts = {}) {
  const value = process.env[name];
  if (!value || value.length === 0) {
    errors.push(`${name} : MANQUANT`);
    return null;
  }
  if (value.match(/^<REMPLIR.*>$/)) {
    errors.push(`${name} : placeholder non remplacé ("${value}")`);
    return null;
  }
  if (value.startsWith("REMPLACER") || value.startsWith("__REMPL")) {
    errors.push(`${name} : placeholder template non remplacé`);
    return null;
  }
  return value;
}

function checkFormat(name, value, validator, format) {
  if (!validator(value)) {
    errors.push(`${name} : format invalide (attendu : ${format})`);
    return false;
  }
  return true;
}

// ─── 1. Variables App de base ─────────────────────────────────────────
console.log(head("📋 [1/7] Variables d'application"));
const appUrl = checkRequired("NEXT_PUBLIC_APP_URL");
if (appUrl) {
  if (isHttpsUrl(appUrl)) {
    console.log(ok(`NEXT_PUBLIC_APP_URL                    = ${mask(appUrl, "url")}`));
  } else {
    errors.push("NEXT_PUBLIC_APP_URL : doit être en https://");
    console.log(ko(`NEXT_PUBLIC_APP_URL                    = ${appUrl} (pas en https://)`));
  }
} else {
  console.log(ko("NEXT_PUBLIC_APP_URL                    = MANQUANT"));
}

const appEnv = process.env.NEXT_PUBLIC_APP_ENV;
if (appEnv === "production") {
  console.log(ok(`NEXT_PUBLIC_APP_ENV                    = ${appEnv}`));
} else {
  warnings.push(`NEXT_PUBLIC_APP_ENV = "${appEnv}" (attendu: production)`);
  console.log(warn(`NEXT_PUBLIC_APP_ENV                    = ${appEnv} (attendu: production)`));
}

const nodeEnv = process.env.NODE_ENV;
if (nodeEnv === "production") {
  console.log(ok(`NODE_ENV                               = ${nodeEnv}`));
} else {
  errors.push(`NODE_ENV = "${nodeEnv}" (attendu: production)`);
  console.log(ko(`NODE_ENV                               = ${nodeEnv}`));
}

console.log();

// ─── 2. Firebase client (NEXT_PUBLIC_FIREBASE_*) ──────────────────────
console.log(head("🔥 [2/7] Firebase Client SDK"));
const firebaseClient = {
  NEXT_PUBLIC_FIREBASE_API_KEY: { mask: "secret" },
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: { mask: "url" },
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: { mask: "secret" },
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: { mask: "url" },
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: { mask: "secret" },
  NEXT_PUBLIC_FIREBASE_APP_ID: { mask: "secret" },
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: { mask: "gauge", optional: true },
};

const firebaseValues = {};
for (const [key, opts] of Object.entries(firebaseClient)) {
  const value = checkRequired(key);
  if (value) {
    console.log(ok(`${key.padEnd(44)} = ${mask(value, opts.mask)}`));
    firebaseValues[key] = value;
  } else if (opts.optional) {
    console.log(warn(`${key.padEnd(44)} = (non défini — Analytics désactivé)`));
  } else {
    console.log(ko(`${key.padEnd(44)} = MANQUANT`));
  }
}

// Cohérence project_id ↔ auth_domain ↔ storage_bucket
if (
  firebaseValues.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
  firebaseValues.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
) {
  const projectId = firebaseValues.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const authDomain = firebaseValues.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const storageBucket = firebaseValues.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

  if (!authDomain.startsWith(projectId)) {
    errors.push(`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN doit commencer par ${projectId}`);
    console.log(ko(`   ⚠ Incohérence : auth_domain devrait commencer par ${projectId}`));
  }
  if (storageBucket && !storageBucket.startsWith(projectId)) {
    errors.push(`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET doit commencer par ${projectId}`);
    console.log(ko(`   ⚠ Incohérence : storage_bucket devrait commencer par ${projectId}`));
  }
}
console.log();

// ─── 3. Firebase Admin SDK (côté serveur) ─────────────────────────────
console.log(head("🔑 [3/7] Firebase Admin SDK (server-side)"));
const adminProject = checkRequired("FIREBASE_PROJECT_ID");
if (adminProject) {
  if (
    firebaseValues.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    adminProject !== firebaseValues.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  ) {
    errors.push(
      `FIREBASE_PROJECT_ID (${adminProject}) ≠ NEXT_PUBLIC_FIREBASE_PROJECT_ID (${firebaseValues.NEXT_PUBLIC_FIREBASE_PROJECT_ID})`
    );
    console.log(ko(`FIREBASE_PROJECT_ID                     ≠ NEXT_PUBLIC_FIREBASE_PROJECT_ID`));
  } else {
    console.log(ok(`FIREBASE_PROJECT_ID                     = ${mask(adminProject, "secret")}`));
  }
} else {
  console.log(ko(`FIREBASE_PROJECT_ID                     = MANQUANT`));
}

const clientEmail = checkRequired("FIREBASE_CLIENT_EMAIL");
if (clientEmail) {
  if (clientEmail.includes("@") && clientEmail.includes(".iam.gserviceaccount.com")) {
    console.log(ok(`FIREBASE_CLIENT_EMAIL                   = ${mask(clientEmail, "email")}`));
  } else {
    errors.push("FIREBASE_CLIENT_EMAIL : format invalide (attendu: ...iam.gserviceaccount.com)");
    console.log(ko(`FIREBASE_CLIENT_EMAIL                   = format invalide`));
  }
} else {
  console.log(ko(`FIREBASE_CLIENT_EMAIL                   = MANQUANT`));
}

const privateKey = checkRequired("FIREBASE_PRIVATE_KEY");
if (privateKey) {
  if (isPEMPrivateKey(privateKey)) {
    // Vérifier que la clé peut être parsée par Node crypto
    try {
      const normalized = privateKey.replace(/\\n/g, "\n");
      const keyObj = crypto.createPrivateKey(normalized);
      console.log(
        ok(
          `FIREBASE_PRIVATE_KEY                   = ${mask(privateKey, "secret")} (PEM valide, ${keyObj.asymmetricKeySize} bits)`
        )
      );
    } catch (e) {
      errors.push(`FIREBASE_PRIVATE_KEY : PEM invalide (${e.message})`);
      console.log(ko(`FIREBASE_PRIVATE_KEY                   = PEM invalide (${e.message})`));
    }
  } else {
    errors.push(
      "FIREBASE_PRIVATE_KEY : ne contient pas -----BEGIN PRIVATE KEY----- / -----END PRIVATE KEY-----"
    );
    console.log(ko(`FIREBASE_PRIVATE_KEY                   = format PEM invalide`));
  }
} else {
  console.log(ko(`FIREBASE_PRIVATE_KEY                   = MANQUANT`));
}
console.log();

// ─── 4. Secrets cryptographiques ──────────────────────────────────────
console.log(head("🔐 [4/7] Secrets cryptographiques"));

const sessionSecret = checkRequired("SESSION_COOKIE_SECRET");
if (sessionSecret) {
  if (isHex(sessionSecret, 64)) {
    console.log(ok(`SESSION_COOKIE_SECRET                  = ${mask(sessionSecret, "secret")} (64 hex, 32 octets)`));
  } else {
    errors.push(`SESSION_COOKIE_SECRET : attendu 64 caractères hex, reçu ${sessionSecret.length}`);
    console.log(
      ko(`SESSION_COOKIE_SECRET                  = ${mask(sessionSecret, "secret")} (mauvais format)`)
    );
  }
} else {
  console.log(ko(`SESSION_COOKIE_SECRET                  = MANQUANT`));
}

const encryptionKey = checkRequired("ENCRYPTION_KEY");
if (encryptionKey) {
  if (isBase64(encryptionKey, 44)) {
    console.log(ok(`ENCRYPTION_KEY                         = ${mask(encryptionKey, "secret")} (44 base64, 32 octets)`));
  } else {
    errors.push(`ENCRYPTION_KEY : attendu 44 caractères base64, reçu ${encryptionKey.length}`);
    console.log(ko(`ENCRYPTION_KEY                         = ${mask(encryptionKey, "secret")} (mauvais format)`));
  }
} else {
  console.log(ko(`ENCRYPTION_KEY                         = MANQUANT`));
}
console.log();

// ─── 5. Services tiers ────────────────────────────────────────────────
console.log(head("🌐 [5/7] Services tiers (optionnels)"));
const optionalServices = [
  { name: "BREVO_API_KEY", mask: "secret", warnIfMissing: "Newsletter Brevo désactivée" },
  { name: "NEXT_PUBLIC_PLAUSIBLE_DOMAIN", mask: "url", warnIfMissing: "Plausible Analytics désactivé" },
  { name: "NEXT_PUBLIC_SENTRY_DSN", mask: "url", warnIfMissing: "Sentry désactivé" },
  { name: "SENTRY_AUTH_TOKEN", mask: "secret", warnIfMissing: "Sentry source maps désactivées" },
  { name: "NEXT_PUBLIC_RECAPTCHA_SITE_KEY", mask: "secret", warnIfMissing: "App Check désactivé" },
  { name: "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY", mask: "secret", warnIfMissing: "Google Maps désactivé" },
];

for (const svc of optionalServices) {
  const value = process.env[svc.name];
  if (value && value.length > 0 && !value.match(/^<.*>$/)) {
    console.log(ok(`${svc.name.padEnd(36)} = ${mask(value, svc.mask)}`));
  } else {
    warnings.push(`${svc.name} manquant — ${svc.warnIfMissing}`);
    console.log(warn(`${svc.name.padEnd(36)} = (non défini — ${svc.warnIfMissing})`));
  }
}
console.log();

// ─── 6. Feature flags ─────────────────────────────────────────────────
console.log(head("🚦 [6/7] Feature flags"));
const flags = ["NEXT_PUBLIC_ENABLE_TERRAIN", "NEXT_PUBLIC_ENABLE_INVESTORS", "NEXT_PUBLIC_ENABLE_FIELD_OFFLINE"];
for (const flag of flags) {
  const v = process.env[flag];
  const display = v === "true" ? "✅ ON" : v === "false" ? "⊘ off" : `(non défini → ${v ?? "false"})`;
  console.log(`   ${flag.padEnd(36)} = ${display}`);
}
console.log();

// ─── 7. Sécurité runtime ─────────────────────────────────────────────
console.log(head("🛡  [7/7] Vérifications de sécurité runtime"));

if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.startsWith("AIzaSy") === false && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  warnings.push("NEXT_PUBLIC_FIREBASE_API_KEY ne commence pas par 'AIzaSy' (à vérifier)");
  console.log(warn("NEXT_PUBLIC_FIREBASE_API_KEY ne commence pas par 'AIzaSy'"));
} else if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.log(ok("NEXT_PUBLIC_FIREBASE_API_KEY commence par 'AIzaSy' (format Google attendu)"));
}

if (process.env.PORT && process.env.PORT !== "3000") {
  warnings.push(`PORT = ${process.env.PORT} (Dockerfile attend 3000)`);
  console.log(warn(`PORT = ${process.env.PORT} (Dockerfile attend 3000)`));
}

if (process.env.HOSTNAME && process.env.HOSTNAME !== "0.0.0.0") {
  warnings.push(`HOSTNAME = ${process.env.HOSTNAME} (Dockerfile attend 0.0.0.0)`);
  console.log(warn(`HOSTNAME = ${process.env.HOSTNAME} (Dockerfile attend 0.0.0.0)`));
}

console.log();

// ─── Verdict ──────────────────────────────────────────────────────────
console.log("═══════════════════════════════════════════════════════════");
if (errors.length === 0 && warnings.length === 0) {
  console.log(c.green + c.bold + "  ✅ .env.production est PRÊT POUR LE DÉPLOIEMENT" + c.reset);
  console.log("═══════════════════════════════════════════════════════════\n");
  console.log(info("Rappel : n'oubliez pas d'ajouter le domaine dans Firebase Auth"));
  console.log(info("         → Authentication → Settings → Authorized domains\n"));
  process.exit(0);
}

if (errors.length === 0) {
  console.log(c.yellow + c.bold + `  ⚠ ${warnings.length} warning(s) — déploiement possible mais non optimal` + c.reset);
  console.log("═══════════════════════════════════════════════════════════\n");
  warnings.forEach((w) => console.log(warn(w)));
  process.exit(2);
}

console.log(c.red + c.bold + `  ❌ ${errors.length} erreur(s) bloquante(s) — NE PAS DÉPLOYER` + c.reset);
console.log("═══════════════════════════════════════════════════════════\n");
console.log(c.red + "Erreurs :" + c.reset);
errors.forEach((e) => console.log(`  ${c.red}•${c.reset} ${e}`));

if (warnings.length > 0) {
  console.log(c.yellow + "\nWarnings :" + c.reset);
  warnings.forEach((w) => console.log(`  ${c.yellow}•${c.reset} ${w}`));
}

console.log();
process.exit(1);
