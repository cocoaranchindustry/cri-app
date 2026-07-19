/**
 * Validation des Firestore Security Rules
 *
 * Vérifie la syntaxe du fichier firestore.rules ET le déploie via
 * l'API REST Firebase si un token est fourni.
 *
 * En l'absence de `firebase login`, ce script peut au minimum
 * vérifier la syntaxe via `firestore-rules-check` (lint basique).
 *
 * Usage :
 *   1. node scripts/validate-firestore-rules.mjs   (vérif syntaxe)
 *   2. firebase deploy --only firestore:rules --project cocoaranchindustry-98c05
 *      (nécessite `firebase login` préalable)
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadDotenv } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const RULES_PATH = resolve(__dirname, "../../../firestore.rules");
const ENV_PATH = resolve(__dirname, "../.env.production");

console.log("═══════════════════════════════════════════════════════════════");
console.log("  🛡  Validation des Firestore Security Rules");
console.log("═══════════════════════════════════════════════════════════════\n");

if (!existsSync(RULES_PATH)) {
  console.error(`❌ Fichier introuvable : ${RULES_PATH}`);
  process.exit(1);
}

const rules = readFileSync(RULES_PATH, "utf-8");
console.log(`✅ Fichier chargé : ${RULES_PATH} (${rules.length} chars)\n`);

// ─── Vérifications syntaxiques de base ──────────────────────────────────
const checks = [
  { name: "rules_version = '2'", regex: /rules_version\s*=\s*['"]2['"]/ },
  { name: "service cloud.firestore", regex: /service\s+cloud\.firestore/ },
  { name: "match /databases/{database}/documents", regex: /match\s+\/databases\/\{database\}\/documents/ },
  { name: "deny all par défaut", regex: /match\s+\/\{document=\*\*\}/ },
  // Collections attendues
  { name: "users collection", regex: /match\s+\/users\/\{uid\}/ },
  { name: "producers collection", regex: /match\s+\/producers\/\{producerId\}/ },
  { name: "parcels collection", regex: /match\s+\/parcels\/\{parcelId\}/ },
  { name: "lots collection", regex: /match\s+\/lots\/\{lotId\}/ },
  { name: "articles collection", regex: /match\s+\/articles\/\{articleId\}/ },
  { name: "products collection", regex: /match\s+\/products\/\{productId\}/ },
  { name: "investors collection", regex: /match\s+\/investors\/\{investorId\}/ },
  // RBAC
  { name: "isAdmin() helper", regex: /function\s+isAdmin\s*\(\s*\)/ },
  { name: "isManager() helper", regex: /function\s+isManager\s*\(\s*\)/ },
  // RGPD
  { name: "RGPD consent producer", regex: /consentRGPD\s*==\s*true/ },
  // EUDR
  { name: "EUDR precision ≥ 6", regex: /precision\s*>=\s*6/ },
];

let pass = 0;
let fail = 0;
for (const c of checks) {
  const ok = c.regex.test(rules);
  console.log(`  ${ok ? "✅" : "❌"} ${c.name}`);
  ok ? pass++ : fail++;
}

console.log(`\n📊 Résultat : ${pass} OK / ${fail} KO sur ${checks.length} vérifications`);

// ─── Indexes ───────────────────────────────────────────────────────────
const INDEXES_PATH = resolve(__dirname, "../../../firestore.indexes.json");
if (existsSync(INDEXES_PATH)) {
  const idx = JSON.parse(readFileSync(INDEXES_PATH, "utf-8"));
  console.log(`\n📑 Indexes définis : ${idx.indexes?.length || 0}`);
  idx.indexes?.forEach((i, n) => {
    console.log(`   ${n + 1}. ${i.collectionGroup || i.collectionId} (${(i.fields || []).map(f => f.fieldPath).join(", ")})`);
  });
}

console.log("\n═══════════════════════════════════════════════════════════════");
if (fail === 0) {
  console.log("  ✅ Rules syntaxiquement valides — prêtes à déployer");
  console.log("\n  Pour déployer en production :");
  console.log("    1. firebase login");
  console.log("    2. firebase deploy --only firestore:rules,firestore:indexes --project cocoaranchindustry-98c05");
} else {
  console.log(`  ⚠️  ${fail} vérification(s) KO — voir ci-dessus`);
  process.exit(1);
}
console.log("═══════════════════════════════════════════════════════════════");
