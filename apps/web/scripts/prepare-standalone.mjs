// Copy and patch the standalone build to make it runnable
// Usage: node scripts/prepare-standalone.mjs
import { cpSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");
const STANDALONE = resolve(ROOT, ".next/standalone");
const NEXT_DIR = resolve(ROOT, ".next");
const STATIC_SRC = resolve(NEXT_DIR, "static");
const PUBLIC_SRC = resolve(ROOT, "public");

if (!existsSync(STANDALONE)) {
  console.error("❌ Pas de build standalone. Lancer d'abord : npm run build");
  process.exit(1);
}

console.log("📦 Patch du build standalone…");

// 1. Copy static/
const STATIC_DST = resolve(STANDALONE, ".next/static");
if (existsSync(STATIC_SRC)) {
  cpSync(STATIC_SRC, STATIC_DST, { recursive: true });
  console.log("   ✅ .next/static copié");
}

// 2. Copy public/
const PUBLIC_DST = resolve(STANDALONE, "public");
if (existsSync(PUBLIC_SRC)) {
  cpSync(PUBLIC_SRC, PUBLIC_DST, { recursive: true });
  console.log("   ✅ public/ copié");
}

// 3. The standalone entry is at apps/web/.next/standalone/apps/web/server.js
const ENTRY = resolve(STANDALONE, "apps/web/server.js");
if (existsSync(ENTRY)) {
  console.log("   ✅ Entry point :", ENTRY);
  console.log("\n🚀 Pour lancer le serveur de prod :");
  console.log(`   cd ${resolve(STANDALONE, "apps/web")} && node server.js`);
} else {
  // Search for server.js
  const searchDir = resolve(STANDALONE, "apps");
  function find(dir, name, depth = 0) {
    if (depth > 3) return null;
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) {
        const r = find(p, name, depth + 1);
        if (r) return r;
      } else if (f === name) return p;
    }
    return null;
  }
  const found = find(STANDALONE, "server.js");
  if (found) {
    console.log("   ✅ Entry point trouvé :", found);
    console.log(`\n🚀 cd ${dirname(found)} && PORT=3000 HOSTNAME=0.0.0.0 node server.js`);
  } else {
    console.error("   ❌ server.js introuvable dans le bundle standalone");
    process.exit(1);
  }
}
