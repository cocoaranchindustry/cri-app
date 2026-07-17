import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * CrioImage — Wrapper `next/image` avec conventions CRI
 *
 * Remplace systématiquement `<img>` et `next/image` brut dans tout le site.
 * Centralise :
 *  - Le format WebP/AVIF automatique (via next/image)
 *  - Les ratios d'aspect (aspect-ratio CSS + width/height)
 *  - Les tailles responsives (sizes) par défaut
 *  - Le blur placeholder (LQIP base64 optionnel)
 *  - Le lazy loading (sauf si `priority`)
 *  - Les classes par défaut brandbook
 *
 * Tailles prédéfinies (par largeur) :
 *  - hero      : 2400x1350 (16:9, hero pages)
 *  - section   : 1600x1067 (3:2, sections principales)
 *  - card      : 1200x800  (3:2, cards produits)
 *  - portrait  : 800x800   (1:1, équipe)
 *  - wide      : 1920x1080 (16:9, sections larges)
 *  - og        : 1200x630  (Open Graph)
 *
 * Usage :
 *   <CrioImage
 *     src="/images/hero/hero-home.jpg"
 *     alt="Vue aérienne du ranch Cocoa Ranch"
 *     size="hero"
 *     priority  // pour le hero uniquement
 *   />
 *
 *   <CrioImage
 *     src="/images/team/emmanuel-takou.jpg"
 *     alt="Emmanuel TAKOU, Directeur Général"
 *     size="portrait"
 *     aspect="square"
 *   />
 */

export type CrioImageSize =
  | "hero"
  | "section"
  | "card"
  | "portrait"
  | "wide"
  | "og"
  | "thumbnail";

export type CrioImageAspect = "16/9" | "3/2" | "1/1" | "4/3" | "auto";

export interface CrioImageProps
  extends Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "width" | "height"> {
  src: string;
  alt: string;
  size?: CrioImageSize;
  aspect?: CrioImageAspect;
  /** Désactiver le lazy loading (uniquement pour le hero principal) */
  priority?: boolean;
  /** Classes Tailwind additionnelles */
  className?: string;
  /** Remplir le conteneur (par défaut : true) */
  fill?: boolean;
  /** Largeur/height custom (override size) */
  width?: number;
  height?: number;
  /** Sizes responsive (sinon auto) */
  sizes?: string;
  /** Blur placeholder data URI (généré par le script) */
  blurDataURL?: string;
  /** Qualité Next.js (par défaut 80) */
  quality?: number;
}

const SIZE_PRESETS: Record<
  CrioImageSize,
  { width: number; height: number; sizes: string }
> = {
  hero: {
    width: 2400,
    height: 1350,
    sizes: "100vw",
  },
  section: {
    width: 1600,
    height: 1067,
    sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px",
  },
  card: {
    width: 1200,
    height: 800,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
  portrait: {
    width: 800,
    height: 800,
    sizes: "(max-width: 768px) 50vw, 320px",
  },
  wide: {
    width: 1920,
    height: 1080,
    sizes: "100vw",
  },
  og: {
    width: 1200,
    height: 630,
    sizes: "1200px",
  },
  thumbnail: {
    width: 400,
    height: 267,
    sizes: "400px",
  },
};

const ASPECT_CLASS: Record<CrioImageAspect, string> = {
  "16/9": "aspect-[16/9]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "auto": "",
};

/**
 * Composant CrioImage.
 *
 * - Si `fill` est `true` : utilise `fill` au lieu de width/height (le parent doit être `relative`)
 * - Sinon : utilise les dimensions du preset, avec `aspect-ratio` CSS pour réserver l'espace (CLS = 0)
 */
export const CrioImage: React.FC<CrioImageProps> = ({
  src,
  alt,
  size = "section",
  aspect = "auto",
  priority = false,
  className,
  fill = false,
  width,
  height,
  sizes,
  blurDataURL,
  quality = 80,
  ...props
}) => {
  const preset = SIZE_PRESETS[size];

  // Si l'image est manquante / en cours de chargement, on retourne un skeleton
  // (sécurité supplémentaire à côté du blur placeholder de next/image)
  if (!src) {
    return (
      <div
        className={cn(
          "bg-cri-moss/20 animate-pulse",
          ASPECT_CLASS[aspect],
          className
        )}
        role="img"
        aria-label={alt}
      />
    );
  }

  // Mode fill : le parent doit être relative
  if (fill) {
    return (
      <div className={cn("relative overflow-hidden", ASPECT_CLASS[aspect], className)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? preset.sizes}
          quality={quality}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          className="object-cover"
          {...props}
        />
      </div>
    );
  }

  // Mode intrinsèque : width/height explicites
  const finalWidth = width ?? preset.width;
  const finalHeight = height ?? preset.height;

  return (
    <Image
      src={src}
      alt={alt}
      width={finalWidth}
      height={finalHeight}
      priority={priority}
      sizes={sizes ?? preset.sizes}
      quality={quality}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      className={cn(
        "h-auto w-auto",
        aspect !== "auto" && ASPECT_CLASS[aspect],
        className
      )}
      {...props}
    />
  );
};

/**
 * Helper : calcule l'URL d'une image placeholder LQIP stockée.
 * Utilisé par les pages qui n'ont pas encore de blurDataURL embarqué.
 */
export const placeholderUrl = (name: string): string => {
  return `/images/placeholders/${name}.jpg`;
};

export default CrioImage;
