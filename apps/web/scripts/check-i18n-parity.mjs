/**
 * Vérification de parité structurelle entre les JSON FR et EN.
 *
 * S'assure que les deux fichiers `apps/web/i18n/fr.json` et
 * `apps/web/i18n/en.json` exposent exactement le même arbre de clés
 * (mêmes sections, mêmes sous-sections, mêmes types). C'est crucial
 * pour éviter qu'un `useTranslations("nav.investors")` plante en EN
 * parce qu'on aurait oublié la clé, ou qu'un fallback FR s'affiche
 * en production.
 *
 * Usage :
 *   node apps/web/scripts/check-i18n-parity.mjs
 *   npm run i18n:check
 *
 * Exit codes :
 *   0 = parité OK
 *   1 = au moins un écart structurel
 *   2 = JSON invalide (parse error)
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const I18N_DIR = resolve(__dirname, "../i18n");
const FR_PATH = resolve(I18N_DIR, "fr.json");
const EN_PATH = resolve(I18N_DIR, "en.json");

// ─── Couleurs ────────────────────────────────────────────────────────
const c = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  bold: "\x1b[1m",
};
const ok = (s) => `${c.green}✓${c.reset} ${s}`;
const ko = (s) => `${c.red}✗${c.reset} ${s}`;
const info = (s) => `${c.blue}ℹ${c.reset}  ${s}`;

// ─── Chargement ──────────────────────────────────────────────────────
function load(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    console.error(ko(`Impossible de parser ${path}`));
    console.error(e.message);
    process.exit(2);
  }
}

const fr = load(FR_PATH);
const en = load(EN_PATH);

console.log("═══════════════════════════════════════════════════════════");
console.log(`${c.bold}${c.blue}  🌐 Parité i18n FR/EN — Cocoa Ranch & Industry${c.reset}`);
console.log("═══════════════════════════════════════════════════════════\n");
console.log(ok(`fr.json chargé (${FR_PATH})`));
console.log(ok(`en.json chargé (${EN_PATH})\n`));

// ─── Helpers ─────────────────────────────────────────────────────────
function flatten(obj, prefix = "") {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(out, flatten(value, path));
    } else {
      out[path] = Array.isArray(value) ? "array" : typeof value;
    }
  }
  return out;
}

function diffKeys(a, b) {
  const keysA = new Set(Object.keys(a));
  const keysB = new Set(Object.keys(b));
  return {
    onlyA: [...keysA].filter((k) => !keysB.has(k)),
    onlyB: [...keysB].filter((k) => !keysA.has(k)),
    typeMismatch: Object.keys(a).filter((k) => keysB.has(k) && a[k] !== b[k]),
  };
}

const flatFr = flatten(fr);
const flatEn = flatten(en);

// ─── 1. Statistiques globales ────────────────────────────────────────
console.log(`${c.bold}📊 [1/3] Statistiques${c.reset}`);
console.log(`   Sections de premier niveau (FR) : ${Object.keys(fr).join(", ")}`);
console.log(`   Sections de premier niveau (EN) : ${Object.keys(en).join(", ")}`);
console.log(`   Total clés feuilles FR : ${Object.keys(flatFr).length}`);
console.log(`   Total clés feuilles EN : ${Object.keys(flatEn).length}\n`);

const sectionDiff = diffKeys(
  Object.fromEntries(Object.keys(fr).map((k) => [k, "object"])),
  Object.fromEntries(Object.keys(en).map((k) => [k, "object"]))
);

if (sectionDiff.onlyA.length || sectionDiff.onlyB.length) {
  if (sectionDiff.onlyA.length) {
    console.log(ko(`Sections uniquement en FR : ${sectionDiff.onlyA.join(", ")}`));
  }
  if (sectionDiff.onlyB.length) {
    console.log(ko(`Sections uniquement en EN : ${sectionDiff.onlyB.join(", ")}`));
  }
} else {
  console.log(ok("Sections de premier niveau identiques\n"));
}

// ─── 2. Clés feuilles ────────────────────────────────────────────────
console.log(`${c.bold}🔍 [2/3] Clés feuilles${c.reset}`);
const diff = diffKeys(flatFr, flatEn);

if (diff.onlyA.length === 0 && diff.onlyB.length === 0 && diff.typeMismatch.length === 0) {
  console.log(ok("Parité parfaite : toutes les clés existent des deux côtés avec le même type.\n"));
} else {
  if (diff.onlyA.length) {
    console.log(ko(`Clés uniquement en FR (${diff.onlyA.length}) :`));
    diff.onlyA.forEach((k) => console.log(`   ${c.red}•${c.reset} ${k}`));
  }
  if (diff.onlyB.length) {
    console.log(ko(`Clés uniquement en EN (${diff.onlyB.length}) :`));
    diff.onlyB.forEach((k) => console.log(`   ${c.red}•${c.reset} ${k}`));
  }
  if (diff.typeMismatch.length) {
    console.log(ko(`Clés avec type différent (${diff.typeMismatch.length}) :`));
    diff.typeMismatch.forEach((k) => {
      console.log(
        `   ${c.yellow}•${c.reset} ${k} : FR=${flatFr[k]}, EN=${flatEn[k]}`
      );
    });
  }
  console.log();
}

// ─── 3. Détection des chaînes identiques suspectes ───────────────────
console.log(`${c.bold}🪞 [3/3] Détection des chaînes identiques (potentiellement non traduites)${c.reset}`);
let identicalCount = 0;
for (const key of Object.keys(flatFr)) {
  const frVal = fr;
  const enVal = en;
  // Re-navigation pour récupérer la vraie valeur string
  const frString = key
    .split(".")
    .reduce((o, k) => o?.[k], fr);
  const enString = key
    .split(".")
    .reduce((o, k) => o?.[k], en);
  if (
    typeof frString === "string" &&
    typeof enString === "string" &&
    frString === enString &&
    frString.length > 4 &&
    !/^[\d\s.,%/+\-]+$/.test(frString) // ignore les nombres et symboles
  ) {
    console.log(`   ${c.yellow}•${c.reset} ${key.padEnd(40)} = "${frString}"`);
    identicalCount++;
  }
}

if (identicalCount === 0) {
  console.log(ok("Aucune chaîne identique suspecte détectée.\n"));
} else {
  console.log(
    `\n   ${c.yellow}⚠${c.reset}  ${identicalCount} chaîne(s) identique(s) — à vérifier manuellement (noms propres, acronymes, etc.)\n`
  );
}

// ─── Verdict ─────────────────────────────────────────────────────────
console.log("═══════════════════════════════════════════════════════════");
if (diff.onlyA.length === 0 && diff.onlyB.length === 0 && diff.typeMismatch.length === 0) {
  console.log(`${c.green}${c.bold}  ✅ Parité FR/EN OK — toutes les clés sont alignées${c.reset}`);
  console.log("═══════════════════════════════════════════════════════════\n");
  process.exit(0);
}

console.log(`${c.red}${c.bold}  ❌ Parité FR/EN cassée — corrigez les écarts ci-dessus${c.reset}`);
console.log("═══════════════════════════════════════════════════════════\n");
process.exit(1);
