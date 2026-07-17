"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Leaf, Drumstick, Wheat, Sprout, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";

/**
 * ProductCard — Card produit avec hover gradient
 *
 * Utilisé sur la page Produits et l'accueil pour mettre en valeur :
 * - Cacao premium (fèves fermentées)
 * - Provendes CRI-PROVEND CACAO
 * - Poulets de chair
 * - Biofertilisants
 */

export type ProductCategory = "cacao" | "provende" | "elevage" | "biofertilisant";

export interface ProductCardProps {
  category: ProductCategory;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  certifications?: string[];
  icon?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

const categoryMeta: Record<
  ProductCategory,
  {
    icon: React.ComponentType<{ className?: string }>;
    accentBg: string;
    accentText: string;
    accentBorder: string;
    label: string;
  }
> = {
  cacao: {
    icon: Leaf,
    accentBg: "bg-cri-cacao/10",
    accentText: "text-cri-cacao",
    accentBorder: "border-cri-cacao/30",
    label: "Cacao premium",
  },
  provende: {
    icon: Wheat,
    accentBg: "bg-cri-gold/15",
    accentText: "text-cri-gold-dark",
    accentBorder: "border-cri-gold/40",
    label: "Provende brevetée",
  },
  elevage: {
    icon: Drumstick,
    accentBg: "bg-cri-canopy/10",
    accentText: "text-cri-canopy",
    accentBorder: "border-cri-canopy/30",
    label: "Élevage intégré",
  },
  biofertilisant: {
    icon: Sprout,
    accentBg: "bg-cri-forest/10",
    accentText: "text-cri-forest",
    accentBorder: "border-cri-forest/30",
    label: "Biofertilisant",
  },
};

export const ProductCard: React.FC<ProductCardProps> = ({
  category,
  title,
  subtitle,
  description,
  highlights,
  certifications,
  icon,
  ctaLabel,
  ctaHref,
  className,
}) => {
  const meta = categoryMeta[category];
  const Icon = icon ? null : meta.icon;
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn("group h-full", className)}
    >
      <GlassCard
        variant="default"
        hover
        className="relative h-full p-7 flex flex-col overflow-hidden"
      >
        {/* Gradient hover overlay */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
            "bg-gradient-to-br from-transparent via-transparent to-cri-gold/5"
          )}
          aria-hidden="true"
        />

        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center border-2 flex-shrink-0",
              meta.accentBg,
              meta.accentText,
              meta.accentBorder
            )}
            aria-hidden="true"
          >
            {icon ?? (Icon ? <Icon className="h-7 w-7" /> : null)}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                "text-[10px] font-bold uppercase tracking-widest mb-1",
                meta.accentText
              )}
            >
              {meta.label}
            </p>
            <h3 className="font-serif text-2xl font-bold text-cri-forest leading-tight">
              {title}
            </h3>
            <p className="text-sm text-cri-ink-muted mt-1">{subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-cri-humus leading-relaxed mb-5">{description}</p>

        {/* Highlights */}
        <ul className="space-y-2 mb-5 flex-1">
          {highlights.map((h, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-cri-humus"
            >
              <span
                className={cn(
                  "mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0",
                  meta.accentText.replace("text-", "bg-")
                )}
                aria-hidden="true"
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-cri-moss/10 text-cri-canopy border border-cri-moss/20"
              >
                {cert}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        {ctaLabel && ctaHref && (
          <a
            href={ctaHref}
            className={cn(
              "inline-flex items-center gap-2 mt-auto pt-4 border-t border-cri-moss/20",
              "text-sm font-semibold transition-colors",
              meta.accentText,
              "hover:gap-3"
            )}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </GlassCard>
    </motion.div>
  );
};

export default ProductCard;
