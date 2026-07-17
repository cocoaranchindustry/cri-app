# 📸 Bibliothèque d'images — Cocoa Ranch & Industry

> Conventions, nomenclature et procédures pour la gestion des images du site.

## 📁 Structure des dossiers

```
public/images/
├── hero/             # Images du hero (1920x1080+)
├── team/             # Photos équipe (800x800)
├── terrain/          # Photos Bassin du Mungo (1600x1067)
├── produits/         # Photos produits (1200x800)
├── activites/
│   ├── cacao/        # Pôle 1 — Cacao Premium
│   ├── provendes/    # Pôle 2 — Provenderie
│   └── elevage/      # Pôle 3 — Ferme intégrée
├── impact/           # Photos impact RSE
├── partenaires/      # Logos partenaires (SVG)
├── og/               # Open Graph (1200x630)
└── placeholders/     # LQIP blur (16x16, générés auto)
```

## 🎨 Spécifications techniques

| Type            | Format | Dimensions       | Poids max | Qualité JPEG |
| --------------- | ------ | ---------------- | --------- | ------------ |
| Hero            | JPEG   | 2400×1350 (16:9) | 350 KB    | 82%          |
| Section         | JPEG   | 1600×1067 (3:2)  | 250 KB    | 80%          |
| Card            | JPEG   | 1200×800 (3:2)   | 180 KB    | 80%          |
| Portrait        | JPEG   | 800×800 (1:1)    | 120 KB    | 82%          |
| Wide            | JPEG   | 1920×1080 (16:9) | 280 KB    | 80%          |
| OG              | PNG    | 1200×630         | 200 KB    | —            |
| Logo partenaire | SVG    | vectoriel        | 5 KB      | —            |
| Favicon/Icon    | PNG    | 32×32 / 180×180  | —         | lossless     |

## 📐 Conventions de nommage

### Règles

- ✅ **kebab-case** uniquement (pas de CamelCase, pas d'espaces)
- ✅ **ASCII** uniquement (pas d'accents : `cacao` et non `cacaô`)
- ✅ **Préfixe section** : `hero-`, `team-`, `terrain-`, `produit-`, `activite-`
- ✅ **Numéro** pour les séries : `activite-cacao-1.jpg`, `activite-cacao-2.jpg`
- ✅ **Descriptif** : `lieu-action-sujet.jpg`

### Exemples valides

```
hero-home.jpg
team-emmanuel-takou.jpg
terrain-vue-drone.jpg
activite-provendes-3.jpg
partenaire-oapi.svg
og-investisseurs.png
```

### Exemples invalides

```
❌ IMG_20260115_143022.jpg          ← pas descriptif
❌ Cacao Premium (3).jpg           ← espaces, accents
❌ teamPhoto.JPG                    ← CamelCase
❌ Équipe & Terrain.png            ← accents
```

## 🛠️ Workflow de préparation

### 1. Déposer les photos brutes

Place tes photos brutes (JPEG, PNG, HEIC depuis iPhone) dans un dossier temporaire :

```
./photos-brutes/
├── terrain/
│   ├── IMG_20260115_parcelle.jpg
│   ├── IMG_20260115_usine.jpg
│   └── IMG_20260115_drone.jpg
└── equipe/
    ├── emmanuel-portrait.jpg
    └── equipe-groupe.jpg
```

### 2. Installer Sharp (une seule fois)

```bash
cd apps/web
npm install --save-dev sharp
```

### 3. Lancer le script de préparation

```bash
# Pour le terrain
node public/scripts/prepare-images.js ./photos-brutes/terrain ./public/images/terrain

# Pour l'équipe
node public/scripts/prepare-images.js ./photos-brutes/equipe ./public/images/team

# Détection auto du preset selon le dossier destination
# terrain → preset "section" (1600x1067)
# team    → preset "portrait" (800x800)
# hero    → preset "hero" (2400x1350)
```

### 4. Ce que fait le script

- ✅ Convertit HEIC/PNG → JPEG
- ✅ Respecte l'orientation EXIF (rotation auto)
- ✅ Redimensionne au preset du dossier
- ✅ Compresse en MozJPEG (qualité 80-82)
- ✅ Génère le **placeholder LQIP** (16×16 flou)
- ✅ Renomme en kebab-case ASCII
- ✅ Écrit `_lqip.json` pour les `blurDataURL`

### 5. Utiliser dans le code

```tsx
import { CrioImage } from "@/components/ui/CrioImage";
import lqip from "@/../public/images/terrain/_lqip.json";

<CrioImage
  src="/images/terrain/parcelle-cacao.jpg"
  alt="Producteurs sur la parcelle de cacao"
  size="section"
  aspect="3/2"
  blurDataURL={lqip["parcelle-cacao"]}
  className="rounded-cri"
/>;
```

## 🎯 Tailles prédéfinies (composant `<CrioImage>`)

| Preset      | Dimensions | Usage                       |
| ----------- | ---------- | --------------------------- |
| `hero`      | 2400×1350  | Hero pages (1 par page max) |
| `section`   | 1600×1067  | Sections principales        |
| `card`      | 1200×800   | Cards produits, piliers     |
| `portrait`  | 800×800    | Photos équipe (carré)       |
| `wide`      | 1920×1080  | Sections larges (banner)    |
| `og`        | 1200×630   | Open Graph (FB, LinkedIn)   |
| `thumbnail` | 400×267    | Miniatures                  |

## ⚡ Performance

- **Format servi** : WebP/AVIF automatique via `next/image`
- **Master** : JPEG conservé en archive (qualité 80-82)
- **Responsive** : `srcset` automatique (640w, 750w, 1080w, 1200w, 1920w, 2048w, 3840w)
- **Lazy loading** : activé par défaut (sauf `priority` sur le hero)
- **CLS = 0** : dimensions explicites + aspect-ratio CSS
- **LQIP** : placeholder flou 16×16 pendant le chargement

## 🖼️ Logos partenaires (SVG)

Les logos des partenaires (AGRO-PME, OAPI, MINADER, etc.) doivent être :

- ✅ **SVG vectoriel** (pas de PNG)
- ✅ **Fond transparent**
- ✅ **Optimisé** (SVGO, <5 KB)
- ✅ **Couleurs officielles** du partenaire
- ❌ Pas de marques blanches sur fond sombre (prévoir 2 versions si besoin)

## 📊 Liste des images attendues

### Hero & pages

- [ ] `hero/hero-home.jpg` (vue aérienne ranch)
- [ ] `hero/hero-projet.jpg` (équipe fondatrice)
- [ ] `hero/hero-impact.jpg` (producteurs locaux)
- [ ] `hero/hero-produits.jpg` (fèves premium)
- [ ] `hero/hero-brevet.jpg` (brevet OAPI + cabosses)
- [ ] `hero/hero-activites.jpg` (3 pôles en photo)

### Activités

- [ ] `activites/cacao/1-4.jpg` (5 photos : parcelle, cueillette, fermentation, séchage, producteur)
- [ ] `activites/provendes/1-4.jpg` (4 photos : usine, broyeur, granulés, brevet)
- [ ] `activites/elevage/1-4.jpg` (4 photos : poulets, porcs, compost, drone)

### Produits (studio)

- [ ] `produits/feve-premium.jpg`
- [ ] `produits/provende-poulet.jpg`
- [ ] `produits/provende-porc.jpg`
- [ ] `produits/biofertilisant.jpg`
- [ ] `produits/viande-poulet.jpg`
- [ ] `produits/viande-porc.jpg`

### Équipe

- [ ] `team/emmanuel-takou.jpg`
- [ ] `team/marie-nguema.jpg`
- [ ] `team/paul-atangana.jpg`
- [ ] `team/sylvie-kamga.jpg`
- [ ] `team/groupe.jpg`

### Terrain

- [ ] `terrain/village-njombe.jpg`
- [ ] `terrain/parcelle-cacao.jpg`
- [ ] `terrain/cooperative-femmes.jpg`
- [ ] `terrain/formation-cimar.jpg`
- [ ] `terrain/usine-exterieur.jpg`
- [ ] `terrain/vue-drone.jpg`

### Impact

- [ ] `impact/plantation-jeune.jpg`
- [ ] `impact/compostage.jpg`
- [ ] `impact/femmes-leaders.jpg`
- [ ] `impact/eudr-tracabilite.jpg`

### Partenaires (SVG)

- [ ] `partenaires/agro-pme.svg`
- [ ] `partenaires/oapi.svg`
- [ ] `partenaires/minader.svg`
- [ ] `partenaires/cimar.svg`
- [ ] `partenaires/eudr.svg`
- [ ] `partenaires/cacaotrace.svg`
- [ ] `partenaires/rainforest.svg`
- [ ] `partenaires/iso22000.svg`
- [ ] `partenaires/irad.svg`

### Open Graph

- [ ] `og/default.png` (1200×630)
- [ ] `og/projet.png` (1200×630)
- [ ] `og/investisseurs.png` (1200×630)
- [ ] `og/produits.png` (1200×630)
- [ ] `og/contact.png` (1200×630)

## ✅ Checklist avant commit

Pour chaque image ajoutée :

- [ ] Nom en kebab-case ASCII
- [ ] Placée dans le bon sous-dossier
- [ ] Dimensions respectées (cf. tableau)
- [ ] Poids < limite (cf. tableau)
- [ ] LQIP généré (`_lqip.json` mis à jour)
- [ ] Utilisée via `<CrioImage>` (jamais `<img>` brut)
- [ ] `alt` textuel descriptif (a11y)
- [ ] `priority` seulement si hero principal
- [ ] Test Lighthouse > 90 Performance

## 🔗 Liens utiles

- [next/image documentation](https://nextjs.org/docs/pages/api-reference/components/image)
- [Sharp documentation](https://sharp.pixelplumbing.com/)
- [TinyPNG (compression alternative)](https://tinypng.com/)
- [Squoosh (outil en ligne)](https://squoosh.app/)
- [Unsplash (banque libre)](https://unsplash.com/s/photos/cocoa-farm)
- [Pexels (banque libre)](https://pexels.com/search/cameroon/)
