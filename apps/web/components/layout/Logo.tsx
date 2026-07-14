import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Logo COCOA RANCH & INDUSTRY — Brandbook CRI v6 (officiel)
 *
 * Le logo officiel (sur affiches) est composé de :
 *  1. Un emblème cabosse cacao stylisé (or vif sur fond cacao brûlé)
 *  2. Le wordmark "COCOA RANCH" en serif Georgia blanc/crème
 *  3. Le sous-titre "& INDUSTRY" en small caps
 *  4. La mention "AGRO-PME FONDATION · DEPUIS 2010"
 *
 * Cette version est une **reconstitution SVG fidèle** au logo des affiches
 * officielles. Elle sert de fallback si l'image du logo officiel
 * (`/brand/logo-variants.png`) n'est pas chargée.
 *
 * Variantes :
 *  - default : fond cacao brûlé, texte crème, accent or
 *  - light   : fond crème/parchemin, texte forest, accent cacao
 *  - dark    : fond forest, texte crème, accent or
 *  - mono    : sans fond (couleur unique transmise via currentColor)
 */

export type LogoVariant = "default" | "light" | "dark" | "mono";

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: LogoVariant;
  showTagline?: boolean;
  withImage?: boolean; // Si true, essaie de charger /brand/logo-variants.png
}

const sizeMap = {
  sm: { emblem: 36, text: "text-base", sub: "text-[0.55rem]", tagline: "text-[0.55rem]" },
  md: { emblem: 48, text: "text-xl", sub: "text-[0.65rem]", tagline: "text-[0.65rem]" },
  lg: { emblem: 64, text: "text-2xl", sub: "text-xs", tagline: "text-[0.7rem]" },
  xl: { emblem: 88, text: "text-4xl", sub: "text-sm", tagline: "text-[0.8rem]" },
} as const;

const variantContainer: Record<LogoVariant, string> = {
  default: "bg-cri-cacao text-cri-parchment",
  light: "bg-cri-parchment text-cri-forest border border-cri-cream",
  dark: "bg-cri-forest text-cri-parchment",
  mono: "bg-transparent text-current",
};

const variantSub: Record<LogoVariant, string> = {
  default: "text-cri-parchment/80",
  light: "text-cri-cacao",
  dark: "text-cri-parchment/75",
  mono: "opacity-70",
};

const variantTagline: Record<LogoVariant, string> = {
  default: "text-cri-gold",
  light: "text-cri-cacao",
  dark: "text-cri-gold",
  mono: "text-current opacity-60",
};

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  variant = "default",
  showTagline = true,
  withImage = false,
  className,
  ...props
}) => {
  const s = sizeMap[size];
  const [imgError, setImgError] = React.useState(false);
  const useImage = withImage && !imgError;

  if (useImage) {
    return (
      <div className={cn("inline-flex items-center", className)} {...props}>
        <img
          src="/brand/logo-variants.png"
          alt="COCOA RANCH & INDUSTRY — AGRO-PME FONDATION"
          className={cn(
            "h-auto object-contain",
            size === "sm" && "h-10",
            size === "md" && "h-14",
            size === "lg" && "h-20",
            size === "xl" && "h-28"
          )}
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-cri inline-flex items-center gap-3 px-3 py-2",
        variantContainer[variant],
        className
      )}
      role="img"
      aria-label="COCOA RANCH & INDUSTRY — AGRO-PME FONDATION"
      {...props}
    >
      {/* Emblème cabosse cacao stylisé */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={s.emblem}
        height={s.emblem}
        className="shrink-0"
        aria-hidden="true"
      >
        {/* Fond circulaire or vif */}
        <circle cx="50" cy="50" r="48" fill="#D4A024" />
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="#7A3812"
          strokeWidth="1.5"
          opacity="0.4"
        />

        {/* Cabosse cacao (forme ovale côtelée) */}
        <g transform="translate(50 50)">
          {/* Corps cabosse */}
          <ellipse cx="0" cy="6" rx="22" ry="28" fill="#7A3812" />
          {/* Côtes verticales (rainures cabosse) */}
          <path
            d="M -18 -16 Q -16 6 -18 28"
            fill="none"
            stroke="#5A2A0E"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M -8 -22 Q -6 6 -8 32"
            fill="none"
            stroke="#5A2A0E"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 0 -24 Q 0 6 0 32"
            fill="none"
            stroke="#5A2A0E"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 8 -22 Q 6 6 8 32"
            fill="none"
            stroke="#5A2A0E"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 18 -16 Q 16 6 18 28"
            fill="none"
            stroke="#5A2A0E"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Reflet or vif */}
          <ellipse cx="-8" cy="-8" rx="6" ry="10" fill="#D4A024" opacity="0.4" />

          {/* Pédoncule + feuilles en haut */}
          <path d="M 0 -22 L 0 -30" stroke="#1F4A2E" strokeWidth="3" strokeLinecap="round" />
          <path d="M 0 -30 Q -10 -34 -14 -28 Q -8 -26 0 -30 Z" fill="#1F4A2E" />
          <path d="M 0 -30 Q 10 -34 14 -28 Q 8 -26 0 -30 Z" fill="#2D6B3E" />
        </g>
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span className={cn("font-serif font-black leading-none tracking-tight", s.text)}>
          COCOA <span className="italic">RANCH</span>
        </span>
        <span
          className={cn(
            "mt-1 font-sans font-bold uppercase tracking-[0.18em]",
            s.sub,
            variantSub[variant]
          )}
        >
          & Industry
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1.5 font-sans font-semibold uppercase tracking-[0.15em]",
              s.tagline,
              variantTagline[variant]
            )}
          >
            Agro-PME Fondation · Depuis 2010
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * LogoMark — Juste l'emblème cabosse, sans le wordmark.
 * Utile pour favicon, loader, watermarks, etc.
 */
export const LogoMark: React.FC<{ size?: number; className?: string }> = ({
  size = 48,
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width={size}
    height={size}
    className={cn("inline-block", className)}
    role="img"
    aria-label="Emblème COCOA RANCH"
  >
    <circle cx="50" cy="50" r="48" fill="#D4A024" />
    <g transform="translate(50 50)">
      <ellipse cx="0" cy="6" rx="22" ry="28" fill="#7A3812" />
      <path
        d="M -18 -16 Q -16 6 -18 28"
        fill="none"
        stroke="#5A2A0E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M -8 -22 Q -6 6 -8 32"
        fill="none"
        stroke="#5A2A0E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 0 -24 Q 0 6 0 32"
        fill="none"
        stroke="#5A2A0E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 8 -22 Q 6 6 8 32"
        fill="none"
        stroke="#5A2A0E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 18 -16 Q 16 6 18 28"
        fill="none"
        stroke="#5A2A0E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse cx="-8" cy="-8" rx="6" ry="10" fill="#D4A024" opacity="0.4" />
      <path d="M 0 -22 L 0 -30" stroke="#1F4A2E" strokeWidth="3" strokeLinecap="round" />
      <path d="M 0 -30 Q -10 -34 -14 -28 Q -8 -26 0 -30 Z" fill="#1F4A2E" />
      <path d="M 0 -30 Q 10 -34 14 -28 Q 8 -26 0 -30 Z" fill="#2D6B3E" />
    </g>
  </svg>
);
