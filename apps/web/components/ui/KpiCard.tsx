"use client";

import * as React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * KpiCard — Brandbook CRI v5
 *
 * Composant phare pour afficher les indicateurs clés.
 *
 * Brandbook :
 * - Chiffre en font-serif, text-5xl, text-cri-gold (Or lumière)
 * - Label en uppercase, text-label, text-cri-humus
 * - Suffix en text-2xl, text-cri-cacao
 * - Tendance avec icône (vert / brun / gris)
 *
 * Variantes :
 * - default : parchemin
 * - gold : fond or pâle
 * - forest : fond vert pâle (engagement RSE)
 */

export type KpiVariant = "default" | "gold" | "forest";

const variantClasses: Record<KpiVariant, string> = {
  default: "bg-cri-parchment border-cri-cacao/30",
  gold: "bg-cri-gold/10 border-cri-gold",
  forest: "bg-cri-forest/5 border-cri-canopy",
};

const valueColor: Record<KpiVariant, string> = {
  default: "text-cri-gold",
  gold: "text-cri-cacao-dark",
  forest: "text-cri-forest",
};

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number | string;
  label: string;
  suffix?: string;
  prefix?: string;
  trend?: "up" | "down" | "flat";
  variant?: KpiVariant;
  description?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  value,
  label,
  suffix,
  prefix,
  trend,
  variant = "default",
  description,
  className,
  ...props
}) => {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-cri-canopy"
      : trend === "down"
      ? "text-cri-error"
      : "text-cri-ink-muted";

  const trendLabel =
    trend === "up" ? "En hausse" : trend === "down" ? "En baisse" : "Stable";

  return (
    <div
      className={cn(
        "rounded-cri border-2 p-6 text-center transition-all duration-300",
        "hover:shadow-cri-md",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <div className={cn("font-serif text-5xl md:text-6xl font-bold leading-none", valueColor[variant])}>
        {prefix && <span className="text-3xl align-top mr-1">{prefix}</span>}
        {value}
        {suffix && (
          <span className="text-2xl text-cri-cacao ml-1 align-baseline">
            {suffix}
          </span>
        )}
      </div>
      <div className="mt-3 text-label uppercase font-bold text-cri-humus tracking-wider">
        {label}
      </div>
      {description && (
        <p className="mt-2 text-sm text-cri-ink-muted">{description}</p>
      )}
      {trend && (
        <div className={cn("mt-3 inline-flex items-center text-xs font-bold", trendColor)}>
          <TrendIcon className="h-4 w-4 mr-1" aria-hidden="true" />
          {trendLabel}
        </div>
      )}
    </div>
  );
};
