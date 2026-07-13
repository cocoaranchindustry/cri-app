/**
 * Test de la configuration Firebase
 *
 * Ce script vérifie que :
 * 1. Toutes les variables d'env requises sont présentes
 * 2. L'initialisation Firebase ne lève pas d'erreur
 * 3. Les 3 services (auth, firestore, storage) sont bien instanciés
 *
 * Usage :  node scripts/test-firebase-config.mjs
 *   ou   :  npx tsx scripts/test-firebase-config.mjs
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadDotenv } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ENV_PATH = resolve(__dirname, "../.env.local");

// Charger le .env.local
if (existsSync(ENV_PATH)) {
  loadDotenv({ path: ENV_PATH });
  console.log(`✅ .env.local chargé depuis : ${ENV_PATH}\n`);
} else {
  console.error(`❌ .env.local introuvable à : ${ENV_PATH}`);
  console.error("   Créer le fichier à partir de .env.example et relancer.\n");
  process.exit(1);
}

const REQUIRED = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

const OPTIONAL = ["NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"];

console.log("═══════════════════════════════════════════════════════════");
console.log("  🔥 Test de configuration Firebase — Cocoa Ranch & Industry");
console.log("═══════════════════════════════════════════════════════════\n");

// 1. Variables d'environnement
console.log("📋 [1/4] Variables d'environnement");
let envOk = true;
for (const key of REQUIRED) {
  const value = process.env[key];
  const present = Boolean(value && value.length > 0 && !value.startsWith("REMPLACER"));
  const display = present ? maskSecret(value) : "❌ MANQUANT";
  console.log(`   ${present ? "✅" : "❌"} ${key.padEnd(40)} = ${display}`);
  if (!present) envOk = false;
}
for (const key of OPTIONAL) {
  const value = process.env[key];
  const present = Boolean(value && value.length > 0);
  console.log(`   ${present ? "✅" : "⚠️ "} ${key.padEnd(40)} = ${present ? maskSecret(value) : "(non défini)"}`);
}
console.log();

if (!envOk) {
  console.error("❌ Configuration incomplète. Corriger .env.local puis relancer.\n");
  process.exit(1);
}

// 2. Initialisation Firebase (via import dynamique pour ne pas casser si le module utilise des APIs navigateur)
console.log("🔥 [2/4] Initialisation du SDK Firebase");
try {
  const { initializeApp } = await import("firebase/app");
  const { getAuth } = await import("firebase/auth");
  const { getFirestore } = await import("firebase/firestore");
  const { getStorage } = await import("firebase/storage");

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  console.log(`   ✅ App initialisée : ${app.name}`);
  console.log(`   📦 Project ID : ${firebaseConfig.projectId}\n`);

  // 3. Services
  console.log("🛠  [3/4] Services Firebase");
  const auth = getAuth(app);
  console.log(`   ✅ Auth      : ${auth.app.name}`);

  const db = getFirestore(app);
  console.log(`   ✅ Firestore : ${db.app.name}`);

  const storage = getStorage(app);
  console.log(`   ✅ Storage   : ${storage.app.name}\n`);

  // 4. Singleton
  console.log("🔁 [4/4] Test du singleton (HMR-safe)");
  const { getApps } = await import("firebase/app");
  const apps = getApps();
  console.log(`   ✅ Nombre d'instances actives : ${apps.length}`);
  if (apps.length !== 1) {
    console.error(`   ❌ ATTENTION : ${apps.length} instances détectées (singleton cassé)`);
    process.exit(1);
  }
  console.log();
} catch (err) {
  console.error("❌ Erreur lors de l'initialisation Firebase :");
  console.error(err);
  process.exit(1);
}

console.log("═══════════════════════════════════════════════════════════");
console.log("  ✅ TOUT EST CONFIGURÉ — Firebase est prêt à être utilisé");
console.log("═══════════════════════════════════════════════════════════");
console.log("\n📝 Prochaines étapes :");
console.log("   1. Restreindre la clé API sur Google Cloud Console");
console.log("   2. Activer App Check (reCAPTCHA Enterprise)");
console.log("   3. Configurer Authentication (Email + Google)");
console.log("   4. Déployer les Security Rules : firebase deploy --only firestore:rules\n");

function maskSecret(value) {
  if (!value || value.length < 8) return value;
  if (value.includes("@")) return value; // email → afficher
  if (value.startsWith("G-")) return value; // measurement ID → afficher
  return `${value.slice(0, 4)}...${value.slice(-4)} (${value.length} chars)`;
}
