"use client";

import * as React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountUpNumber } from "./CountUpNumber";

/**
 * KpiCard — Brandbook CRI v6 (avec CountUp animé)
 *
 * Composant phare pour afficher les indicateurs clés.
 *
 * Brandbook :
 * - Chiffre en font-serif, text-5xl/6xl, text-cri-gold (Or lumière)
 * - Compteur animé de 0 → value au scroll (CountUp)
 * - Label en uppercase, text-label, text-cri-humus
 * - Suffix en text-2xl, text-cri-cacao
 * - Tendance avec icône (vert / brun / gris)
 *
 * Variantes :
 * - default : parchemin, bordure cacao
 * - gold : fond or pâle, bordure or (mise en valeur)
 * - forest : fond vert pâle, bordure canopée
 * - dark : fond vert profond, typo blanche (pour sections hero)
 *
 * Design :
 * - Petit orbe dorée en haut à gauche pour signature visuelle
 * - Liseré vertical en accent à gauche
 * - Animation hover avec élévation subtile
 */

export type KpiVariant = "default" | "gold" | "forest" | "dark";

const variantClasses: Record<KpiVariant, string> = {
  default: "bg-white border-cri-cacao/25",
  gold: "bg-gradient-to-br from-cri-gold/15 to-cri-gold/5 border-cri-gold/40",
  forest: "bg-gradient-to-br from-cri-canopy/10 to-cri-forest/5 border-cri-canopy/30",
  dark: "bg-white/5 backdrop-blur-sm border-cri-gold/30 text-white",
};

const valueColor: Record<KpiVariant, string> = {
  default: "text-cri-gold",
  gold: "text-cri-cacao-dark",
  forest: "text-cri-forest",
  dark: "text-cri-gold",
};

const labelColor: Record<KpiVariant, string> = {
  default: "text-cri-humus",
  gold: "text-cri-cacao-dark",
  forest: "text-cri-forest",
  dark: "text-cri-gold-light",
};

const accentBar: Record<KpiVariant, string> = {
  default: "from-cri-gold to-cri-cacao",
  gold: "from-cri-cacao to-cri-cacao-dark",
  forest: "from-cri-canopy to-cri-forest",
  dark: "from-cri-gold to-cri-cacao",
};

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number | string;
  label: string;
  suffix?: string;
  prefix?: string;
  trend?: "up" | "down" | "flat";
  variant?: KpiVariant;
  description?: string;
  source?: string;
  /** Durée de l'animation CountUp en secondes (défaut: 2) */
  duration?: number;
  /** Décimales pour CountUp (si value est number) */
  decimals?: number;
  /** Désactive l'animation (utile pour SSR/preview) */
  disableAnimation?: boolean;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  value,
  label,
  suffix,
  prefix,
  trend,
  variant = "default",
  description,
  source,
  duration = 2.2,
  decimals,
  disableAnimation = false,
  className,
  ...props
}) => {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up" ? "text-cri-canopy" : trend === "down" ? "text-cri-error" : "text-cri-ink-muted";

  const trendLabel = trend === "up" ? "En hausse" : trend === "down" ? "En baisse" : "Stable";

  // Auto-détection des décimales si value est un number
  const computedDecimals =
    decimals ??
    (typeof value === "number" ? Math.min(2, (value.toString().split(".")[1] || "").length) : 0);

  return (
    <div
      className={cn(
        "rounded-cri group relative border-2 p-6 text-left transition-all duration-300 md:p-7",
        "hover:shadow-cri-lg overflow-hidden hover:-translate-y-1",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {/* Liseré vertical d'accent à gauche */}
      <div
        className={cn("absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b", accentBar[variant])}
        aria-hidden="true"
      />

      {/* Orbe décorative en haut à droite */}
      <div
        className="bg-cri-gold/10 group-hover:bg-cri-gold/20 absolute -right-12 -top-12 h-32 w-32 rounded-full blur-2xl transition-colors"
        aria-hidden="true"
      />

      <div className="relative">
        <div
          className={cn(
            "font-serif font-bold leading-none tracking-tight",
            "text-5xl md:text-6xl",
            valueColor[variant]
          )}
        >
          {prefix && (
            <span className="mr-1 align-top text-2xl opacity-80 md:text-3xl">{prefix}</span>
          )}
          {typeof value === "number" && !disableAnimation ? (
            <CountUpNumber value={value} duration={duration} decimals={computedDecimals} />
          ) : (
            value
          )}
          {suffix && (
            <span
              className={cn(
                "ml-1.5 align-baseline font-sans text-xl font-semibold md:text-2xl",
                variant === "dark" ? "text-cri-gold-light" : "text-cri-cacao"
              )}
            >
              {suffix}
            </span>
          )}
        </div>

        <div
          className={cn("text-label mt-3 font-bold uppercase tracking-wider", labelColor[variant])}
        >
          {label}
        </div>

        {description && (
          <p
            className={cn(
              "mt-2 text-sm leading-relaxed",
              variant === "dark" ? "text-cri-parchment/80" : "text-cri-ink-muted"
            )}
          >
            {description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between gap-3">
          {trend && (
            <div className={cn("inline-flex items-center text-xs font-bold", trendColor)}>
              <TrendIcon className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
              {trendLabel}
            </div>
          )}
          {source && (
            <span
              className={cn(
                "text-xs italic",
                variant === "dark" ? "text-cri-parchment/60" : "text-cri-ink-muted"
              )}
            >
              {source}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
