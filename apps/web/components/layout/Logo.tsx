import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Logo COCOA RANCH & INDUSTRY — Brandbook CRI v6 (officiel)
 *
 * Le logo officiel (image PNG fournie) représente :
 *  - Une cabosse cacao stylisée verte (feuilles) avec grain central cacao
 *  - Le wordmark "Cocoa Ranch" en serif signature
 *  - Le sous-titre "AGRO-PME" en dessous
 *  - Une mention "BPV FOUNDATION CAMEROUN" en pied
 *
 * L'image officielle est utilisée via next/image pour :
 *  - Optimisation WebP/AVIF automatique
 *  - Responsive srcset
 *  - Lazy loading (sauf si priority)
 *  - Layout stable (CLS = 0)
 *
 * Variantes :
 *  - default : logo PNG officiel (sur fond sombre ou clair)
 *  - light   : avec fond parchment (utile sur images claires)
 *  - dark    : avec fond forest (utile sur fonds clairs)
 *
 * Tailles disponibles :
 *  - sm  = 40px  (mobile navbar)
 *  - md  = 56px  (navbar desktop)
 *  - lg  = 80px  (footer hero)
 *  - xl  = 120px (page d'accueil hero, mentions légales)
 */

export type LogoVariant = "default" | "light" | "dark";

export interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: LogoVariant;
  showTagline?: boolean;
  className?: string;
  priority?: boolean; // Pour le hero (préchargement)
  asLink?: boolean; // Si true, wrap dans un Link vers /
}

const sizeMap = {
  sm: { height: 40, width: 88 },
  md: { height: 56, width: 123 },
  lg: { height: 80, width: 176 },
  xl: { height: 120, width: 264 },
} as const;

const variantContainer: Record<LogoVariant, string> = {
  default: "",
  light: "bg-cri-parchment p-2 rounded-cri",
  dark: "bg-cri-forest p-2 rounded-cri",
};

const variantTagline: Record<LogoVariant, string> = {
  default: "text-cri-cacao",
  light: "text-cri-forest",
  dark: "text-cri-gold",
};

/**
 * Compose le logo + tagline éventuelle dans une flex column.
 * Le tagline est affiché en dessous du logo PNG.
 */
const LogoImage: React.FC<{
  size: keyof typeof sizeMap;
  variant: LogoVariant;
  showTagline: boolean;
  priority: boolean;
}> = ({ size, variant, showTagline, priority }) => {
  const s = sizeMap[size];
  return (
    <div
      className={cn("inline-flex flex-col items-start", variantContainer[variant])}
      role="img"
      aria-label="COCOA RANCH & INDUSTRY — AGRO-PME FONDATION"
    >
      <Image
        src="/logo.png"
        alt=""
        width={s.width}
        height={s.height}
        priority={priority}
        className="h-auto w-auto"
        style={{ height: s.height, width: "auto" }}
      />
      {showTagline && (
        <span
          className={cn(
            "mt-1 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em]",
            variantTagline[variant]
          )}
        >
          Agropole · Cameroun · Depuis 2010
        </span>
      )}
    </div>
  );
};

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  variant = "default",
  showTagline = false,
  className,
  priority = false,
  asLink = false,
}) => {
  if (asLink) {
    return (
      <Link
        href="/"
        className={cn(
          "group inline-block transition-opacity hover:opacity-90",
          "focus-visible:ring-cri-gold focus-visible:rounded-cri focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          className
        )}
        aria-label="COCOA RANCH & INDUSTRY — Accueil"
      >
        <LogoImage size={size} variant={variant} showTagline={showTagline} priority={priority} />
      </Link>
    );
  }

  return (
    <div className={cn("inline-block", className)}>
      <LogoImage size={size} variant={variant} showTagline={showTagline} priority={priority} />
    </div>
  );
};

/**
 * LogoMark — Juste l'image PNG du logo officiel, sans tagline.
 * Idéal pour la Navbar, le Footer, et les zones compactes.
 * Utilise next/image pour l'optimisation automatique.
 */
export const LogoMark: React.FC<{
  size?: number;
  className?: string;
  priority?: boolean;
}> = ({ size = 48, className, priority = false }) => {
  // Le ratio du logo officiel est ~2.2:1 (largeur:hauteur)
  const width = Math.round(size * 2.2);
  return (
    <Image
      src="/logo.png"
      alt="COCOA RANCH & INDUSTRY — AGRO-PME FONDATION"
      width={width}
      height={size}
      priority={priority}
      className={cn("h-auto w-auto", className)}
      style={{ height: size, width: "auto" }}
    />
  );
};
