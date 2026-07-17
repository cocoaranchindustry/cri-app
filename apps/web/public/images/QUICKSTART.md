# 🚀 Démarrage rapide — Bibliothèque d'images CRI

## TL;DR

```bash
# 1. Installer Sharp (une seule fois)
cd apps/web
npm install --save-dev sharp

# 2. Déposer tes photos brutes
#    ex : photos-brutes/terrain/IMG_20260115_parcelle.jpg

# 3. Préparer les images (redimensionne + compresse + LQIP)
node public/scripts/prepare-images.js ./photos-brutes/terrain ./public/images/terrain

# 4. Utiliser dans le code
```

## Exemple complet

### Étape 1 : préparer une photo

```bash
# Source : une photo prise par drone du ranch
# Source : ./photos-brutes/terrain/DJI_001_vue_aerienne.jpg
# Destination : ./public/images/terrain/

cd apps/web
node public/scripts/prepare-images.js ./photos-brutes/terrain ./public/images/terrain
```

**Sortie :**
```
📸 Préparation de 1 image(s)
   Source      : ./photos-brutes/terrain
   Destination : ./public/images/terrain
   Preset      : section

   DJI_001_vue_aerienne.jpg (4500 KB) → dji-001-vue-aerienne.jpg ... 187 KB (-96%) + LQIP

✨ Mapping LQIP sauvegardé : ./public/images/terrain/_lqip.json
```

**Fichiers générés :**
```
public/images/terrain/
├── dji-001-vue-aerienne.jpg              ← Image principale (1600x1067, 187 KB)
├── dji-001-vue-aerienne.placeholder.jpg   ← LQIP pour blur (16x16)
└── _lqip.json                            ← Mapping des blurDataURL
```

### Étape 2 : utiliser dans une page

```tsx
"use client";
import { CrioImage } from "@/components/ui/CrioImage";
// Le _lqip.json est généré à la racine du dossier de destination
import lqip from "@/../public/images/terrain/_lqip.json";

export default function Page() {
  return (
    <CrioImage
      src="/images/terrain/dji-001-vue-aerienne.jpg"
      alt="Vue aérienne du ranch Cocoa Ranch à Njombé"
      size="section"
      aspect="3/2"
      blurDataURL={lqip["dji-001-vue-aerienne"]}
      className="rounded-2xl"
    />
  );
}
```

### Étape 3 : variantes d'usage

#### Hero avec priorité
```tsx
<CrioImage
  src="/images/hero/hero-home.jpg"
  alt="Vue aérienne du ranch Cocoa Ranch"
  size="hero"
  aspect="16/9"
  priority  // ← Désactive le lazy loading
  fill       // ← Remplit le conteneur parent
/>
```

#### Card produit
```tsx
<CrioImage
  src="/images/produits/feve-premium.jpg"
  alt="Sac de fèves de cacao premium 25 kg"
  size="card"
  aspect="3/2"
  blurDataURL={lqip["feve-premium"]}
/>
```

#### Portrait équipe
```tsx
<CrioImage
  src="/images/team/emmanuel-takou.jpg"
  alt="Emmanuel TAKOU, Directeur Général"
  size="portrait"
  aspect="1/1"
  className="rounded-full"
/>
```

## 📋 Presets disponibles

| Preset | Dimensions | Usage | Dossier de destination |
|---|---|---|---|
| `hero` | 2400×1350 | Hero pages | `images/hero/` |
| `section` | 1600×1067 | Sections | `images/terrain/`, `images/impact/` |
| `card` | 1200×800 | Cards | `images/produits/`, `images/activites/` |
| `portrait` | 800×800 | Équipe | `images/team/` |
| `wide` | 1920×1080 | Banner | `images/hero/` |
| `og` | 1200×630 | Open Graph | `images/og/` |
| `thumbnail` | 400×267 | Miniatures | `images/placeholders/` |

> Le preset est **détecté automatiquement** par le script selon le dossier de destination.

## 🎨 Formats acceptés en entrée

Le script convertit automatiquement :
- ✅ JPEG / JPG
- ✅ PNG (avec transparence → aplatissement sur blanc)
- ✅ WebP
- ✅ **HEIC / HEIF** (iPhone)
- ✅ TIFF / TIF

## 🖼️ Logos partenaires (SVG)

Les logos des partenaires ne sont **pas redimensionnés** par le script :
- Déposer directement le SVG dans `public/images/partenaires/`
- Convention : `partenaire-[nom].svg` (ex: `partenaire-oapi.svg`)
- Optimiser avec [SVGO](https://jakearchibald.github.io/svgomg/) avant dépôt

## ⚡ Performance

Le composant `<CrioImage>` délègue à `next/image` qui :
- Convertit en **WebP/AVIF** à la volée (selon support navigateur)
- Génère un **srcset responsive** (640w, 750w, 1080w, 1200w, 1920w, 2048w, 3840w)
- Sert uniquement la **taille nécessaire** selon le viewport
- **Lazy load** automatique (sauf `priority`)
- **CLS = 0** (dimensions explicites + aspect-ratio CSS)
- **Blur placeholder** pendant le chargement (LQIP)

**Gains Lighthouse attendus :**
- Performance : +15-25 points
- LCP : -1-3s
- CLS : 0 (vs 0.1-0.3 sans)
- Bande passante : -60% (WebP vs JPEG)

## ❓ FAQ

**Q : Pourquoi pas WebP en natif ?**
R : On garde le master en JPEG pour archivage. `next/image` sert du WebP/AVIF au navigateur.

**Q : Combien pèse un LQIP ?**
R : ~200-500 octets par image (base64 JPEG 16x16 flou).

**Q : Puis-je utiliser le script en mode watch ?**
R : Pas encore. Relance manuellement après chaque modification.

**Q : Le script supporte-t-il l'EXIF (rotation) ?**
R : Oui, `.rotate()` lit l'orientation EXIF et l'applique avant redimensionnement.

**Q : Que se passe-t-il si mon image est plus petite que le preset ?**
R : `withoutEnlargement: true` empêche l'agrandissement. L'image garde sa taille d'origine.

**Q : Puis-je traiter plusieurs dossiers en lot ?**
R : Oui, mais lance le script une fois par dossier (le preset est auto-détecté par dossier).

**Q : Les SVG partenaires sont-ils concernés par le script ?**
R : Non, le script copie les SVG tels quels (sans redimension).

## 🔗 Liens utiles

- 📖 [Documentation complète](./README.md)
- 🔧 [Script de préparation](./public/scripts/prepare-images.js)
- 🧩 [Composant CrioImage](../../components/ui/CrioImage.tsx)
- 🌐 [next/image](https://nextjs.org/docs/pages/api-reference/components/image)
- 🖼️ [Sharp](https://sharp.pixelplumbing.com/)
