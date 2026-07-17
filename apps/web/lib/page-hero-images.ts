/**
 * Mapping centralisé des images de hero pour chaque page.
 *
 * Chaque route `/<slug>` est associée à une image d'arrière-plan
 * affichée en superposition du titre (variant `image` du PageHero).
 *
 * Format : 1200×630 minimum, optimisée WebP/AVIF via Next/Image
 *           ou background-image côté CSS.
 *
 * Brandbook : les images doivent être :
 * - Chaude, contrastée (textes blancs superposés)
 * - Thématique (cacao / élevage / équipe / ferme / etc.)
 * - Source libre ou créditée (Unsplash ici, libre de droits)
 */

export interface PageHeroImage {
  /** URL publique de l'image (Unsplash par défaut, /public/images possible) */
  url: string;
  /** Texte alternatif pour l'accessibilité */
  alt: string;
}

export const PAGE_HERO_IMAGES: Record<string, PageHeroImage> = {
  // Pages principales
  projet: {
    url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1600&q=85",
    alt: "Rangées de cacaoyers dans une plantation agroforestière au Cameroun",
  },
  activites: {
    url: "https://images.unsplash.com/photo-1611174243743-303122be5937?w=1600&q=85",
    alt: "Cabosses de cacao mûres sur un cacaoyer",
  },
  impact: {
    url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=85",
    alt: "Forêt tropicale dense — engagement zéro déforestation",
  },
  investisseurs: {
    url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=85",
    alt: "Salle de réunion d'investisseurs, projecteur et tableaux financiers",
  },
  produits: {
    url: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=1600&q=85",
    alt: "Fèves de cacao premium triées à la main",
  },
  contact: {
    url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=85",
    alt: "Poignée de main entre partenaires professionnels",
  },
  brevet: {
    url: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1600&q=85",
    alt: "Sceau officiel et document de brevet OAPI",
  },
  actualites: {
    url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=85",
    alt: "Journaux et revue de presse",
  },
  publications: {
    url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1600&q=85",
    alt: "Bibliothèque de publications et rapports empilés",
  },
  mentions: {
    url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=85",
    alt: "Balance de justice et documents légaux",
  },
  privacy: {
    url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=85",
    alt: "Cadenas de sécurité numérique sur fond bleu",
  },
  cookies: {
    url: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1600&q=85",
    alt: "Plaque de biscuits au chocolat — métaphore des cookies web",
  },
  // Sous-pages activités
  "activites/cacao": {
    url: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1600&q=85",
    alt: "Cabosse de cacao ouverte révélant les fèves fraîches",
  },
  "activites/provendes": {
    url: "https://images.unsplash.com/photo-1620004085588-a982825a5327?w=1600&q=85",
    alt: "Sacs de provendes animales dans une usine",
  },
  "activites/elevage": {
    url: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1600&q=85",
    alt: "Poulets de chair en élevage intégré",
  },
};

/**
 * Récupère l'image de hero d'une route.
 * Fallback : image générique "agropole cacao Cameroun".
 */
export function getPageHeroImage(slug: string): PageHeroImage {
  return (
    PAGE_HERO_IMAGES[slug] ?? {
      url: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1600&q=85",
      alt: "Cacao camerounais — Cocoa Ranch & Industry",
    }
  );
}
