#!/usr/bin/env node
/**
 * prepare-images.js
 *
 * Script de préparation des images pour le site Cocoa Ranch & Industry.
 * - Convertit HEIC/PNG/TIFF → JPEG optimisé
 * - Redimensionne aux dimensions cibles
 * - Compresse intelligemment (mozjpeg-like)
 * - Génère les blur placeholders (LQIP 16x16)
 * - Renomme selon la convention kebab-case
 *
 * Usage :
 *   node scripts/prepare-images.js [dossier_source] [dossier_cible]
 *
 * Exemples :
 *   node scripts/prepare-images.js ./photos-brutes ./public/images
 *   node scripts/prepare-images.js ./photos-brutes/terrain ./public/images/terrain
 *
 * Prérequis :
 *   npm install sharp --save-dev
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// ─── Presets de redimensionnement ─────────────────────────────────────
const PRESETS = {
  hero: { width: 2400, height: 1350, quality: 82, fit: "cover" },
  section: { width: 1600, height: 1067, quality: 80, fit: "cover" },
  card: { width: 1200, height: 800, quality: 80, fit: "cover" },
  portrait: { width: 800, height: 800, quality: 82, fit: "cover" },
  wide: { width: 1920, height: 1080, quality: 80, fit: "cover" },
  og: { width: 1200, height: 630, quality: 88, fit: "cover" },
  thumbnail: { width: 400, height: 267, quality: 75, fit: "cover" },
  placeholder: { width: 16, height: 16, quality: 60, fit: "cover" },
};

// ─── Détection automatique du preset selon le dossier de destination ───
function detectPreset(targetDir) {
  if (targetDir.includes("hero")) return "hero";
  if (targetDir.includes("og")) return "og";
  if (targetDir.includes("team")) return "portrait";
  if (targetDir.includes("produit")) return "card";
  if (targetDir.includes("placeholders")) return "placeholder";
  if (targetDir.includes("partenaires")) return null; // pas de preset, on garde tel quel
  return "section"; // défaut
}

// ─── Slugify : convertit un nom de fichier en kebab-case ASCII ─────────
function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // retire les accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

// ─── Traite une image : redimensionne, compresse, génère LQIP ────────
async function processImage(inputPath, outputPath, presetName) {
  const preset = PRESETS[presetName];
  if (!preset) {
    // Pour les SVG / partenaires : on copie tel quel
    fs.copyFileSync(inputPath, outputPath);
    return { copied: true };
  }

  const { width, height, quality, fit } = preset;
  const basename = path.basename(outputPath, ".jpg");
  const dir = path.dirname(outputPath);
  const placeholderPath = path.join(dir, `${basename}.placeholder.jpg`);

  // Image principale
  await sharp(inputPath)
    .rotate() // respecte l'orientation EXIF
    .resize(width, height, {
      fit,
      position: "centre",
      withoutEnlargement: true, // ne pas agrandir une petite image
    })
    .jpeg({
      quality,
      mozjpeg: true,
      progressive: true,
      chromaSubsampling: "4:2:0",
    })
    .toFile(outputPath);

  // Placeholder LQIP (16x16)
  await sharp(inputPath)
    .rotate()
    .resize(16, 16, { fit: "cover" })
    .blur(2)
    .jpeg({ quality: 50 })
    .toFile(placeholderPath);

  // Retourne le data URI du LQIP (base64) pour blurDataURL
  const lqipBuffer = await sharp(inputPath)
    .rotate()
    .resize(16, 16, { fit: "cover" })
    .blur(2)
    .jpeg({ quality: 50 })
    .toBuffer();
  const lqipDataUri = `data:image/jpeg;base64,${lqipBuffer.toString("base64")}`;

  return { lqipDataUri };
}

// ─── Point d'entrée ───────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("Usage : node prepare-images.js <source> <destination>");
    console.error("Exemple : node prepare-images.js ./brut ./public/images/terrain");
    process.exit(1);
  }

  const [srcDir, dstDir] = args;
  const presetName = detectPreset(dstDir);

  if (!fs.existsSync(srcDir)) {
    console.error(`❌ Dossier source introuvable : ${srcDir}`);
    process.exit(1);
  }

  if (!fs.existsSync(dstDir)) {
    fs.mkdirSync(dstDir, { recursive: true });
  }

  const extensions = [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif", ".tiff", ".tif"];
  const files = fs
    .readdirSync(srcDir)
    .filter((f) => extensions.includes(path.extname(f).toLowerCase()));

  if (files.length === 0) {
    console.warn(`⚠️  Aucune image trouvée dans ${srcDir}`);
    process.exit(0);
  }

  console.log(`\n📸 Préparation de ${files.length} image(s)`);
  console.log(`   Source      : ${srcDir}`);
  console.log(`   Destination : ${dstDir}`);
  console.log(`   Preset      : ${presetName || "copie (SVG/logos)"}\n`);

  const lqipMap = {};

  for (const file of files) {
    const inputPath = path.join(srcDir, file);
    const slug = slugify(path.basename(file, path.extname(file)));
    const outputPath = path.join(dstDir, `${slug}.jpg`);

    const stats = fs.statSync(inputPath);
    const inputSize = (stats.size / 1024).toFixed(1);

    process.stdout.write(`   ${file} (${inputSize} KB) → ${slug}.jpg ... `);

    try {
      const result = await processImage(inputPath, outputPath, presetName);
      if (result.copied) {
        console.log("copié");
      } else {
        const outStats = fs.statSync(outputPath);
        const outSize = (outStats.size / 1024).toFixed(1);
        const ratio = (((inputSize - outSize) / inputSize) * 100).toFixed(0);
        console.log(`${outSize} KB (-${ratio}%) + LQIP`);
        if (result.lqipDataUri) {
          lqipMap[slug] = result.lqipDataUri;
        }
      }
    } catch (err) {
      console.log(`❌ Erreur : ${err.message}`);
    }
  }

  // Sauvegarde le mapping LQIP dans un fichier JSON (pour blurDataURL)
  if (Object.keys(lqipMap).length > 0) {
    const lqipFile = path.join(dstDir, "_lqip.json");
    fs.writeFileSync(lqipFile, JSON.stringify(lqipMap, null, 2));
    console.log(`\n✨ Mapping LQIP sauvegardé : ${lqipFile}`);
    console.log(`   → Importer dans les composants : import lqip from "@/../public/images/.../_lqip.json"`);
  }

  console.log(`\n✅ Terminé !\n`);
}

main().catch((err) => {
  console.error("❌ Erreur fatale :", err);
  process.exit(1);
});
