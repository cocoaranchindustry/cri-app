"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * KpiCounter — Compteur KPI animé (Brandbook CRI v6)
 *
 * Caractéristiques :
 * - Animation count-up au scroll (IntersectionObserver)
 * - Couleurs or (#D4A024) ou cacao (#9C4A1A) au choix
 * - Variant "glass" : glassmorphism pour fond image
 * - Formatage nombre français (espace fine pour milliers)
 * - Respecte prefers-reduced-motion (valeur finale instantanée)
 */
export interface KpiCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  description?: string;
  trend?: "up" | "down" | "stable";
  variant?: "default" | "glass" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  duration?: number;
  icon?: React.ReactNode;
}

const variantClasses = {
  default: {
    container: "bg-cri-parchment border border-cri-moss/30 shadow-soft",
    value: "text-cri-gold",
    label: "text-cri-canopy",
    description: "text-cri-ink-muted",
  },
  glass: {
    container: "bg-cri-parchment/30 backdrop-blur-md border border-cri-cacao/20",
    value: "text-cri-gold-light",
    label: "text-cri-text-on-dark",
    description: "text-cri-text-on-dark/80",
  },
  dark: {
    container: "bg-cri-forest border border-cri-canopy/40",
    value: "text-cri-gold",
    label: "text-cri-text-on-dark",
    description: "text-cri-text-on-dark/80",
  },
};

const sizeClasses = {
  sm: { value: "text-3xl md:text-4xl", label: "text-xs", description: "text-xs" },
  md: { value: "text-4xl md:text-5xl", label: "text-sm", description: "text-sm" },
  lg: { value: "text-5xl md:text-6xl", label: "text-base", description: "text-sm" },
};

export const KpiCounter: React.FC<KpiCounterProps> = ({
  value,
  suffix,
  prefix,
  decimals = 0,
  label,
  description,
  trend,
  variant = "default",
  size = "md",
  className,
  duration = 2,
  icon,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }
    let start: number | null = null;
    const startValue = 0;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(startValue + (value - startValue) * eased);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, value, duration, prefersReducedMotion]);

  const formatted = displayValue.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const trendIcons = {
    up: <TrendingUp className="ml-1 inline h-4 w-4" aria-label="Tendance à la hausse" />,
    down: <TrendingDown className="ml-1 inline h-4 w-4" aria-label="Tendance à la baisse" />,
    stable: <Minus className="ml-1 inline h-4 w-4" aria-label="Stable" />,
  };

  const variantClass = variantClasses[variant];
  const sizeClass = sizeClasses[size];

  return (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-xl p-6 transition-all duration-300",
        variantClass.container,
        className
      )}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="flex-1">
          <div
            className={cn(
              "font-serif font-bold tabular-nums leading-none tracking-tight",
              sizeClass.value,
              variantClass.value
            )}
          >
            {prefix}
            {formatted}
            {suffix && <span className="ml-0.5">{suffix}</span>}
          </div>
        </div>
        {icon && <div className="text-cri-cacao/80 mt-1">{icon}</div>}
      </div>

      <div
        className={cn(
          "mt-3 font-semibold uppercase tracking-wider",
          sizeClass.label,
          variantClass.label
        )}
      >
        {label}
        {trend && <span className="text-cri-cacao ml-1.5 inline-flex">{trendIcons[trend]}</span>}
      </div>

      {description && (
        <p className={cn("mt-2 leading-snug", sizeClass.description, variantClass.description)}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default KpiCounter;
