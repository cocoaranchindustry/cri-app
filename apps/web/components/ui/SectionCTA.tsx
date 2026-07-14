import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SectionCTA — Bloc d'appel à l'action en bas de page
 *
 * Variantes :
 * - default : fond parchemin avec carte verte
 * - gold : carte dégradé or (premium)
 * - forest : fond vert profond
 * - split : image à gauche, texte à droite
 *
 * Design :
 * - Orbes dorées décoratives
 * - Liseré vertical d'accent
 * - Boutons bien dimensionnés (taille XL)
 * - Animation hover des CTAs
 */

export type SectionCTAVariant = "default" | "gold" | "forest" | "split";

const containerClasses: Record<SectionCTAVariant, string> = {
  default: "section-parchment",
  gold: "section-parchment",
  forest: "section bg-cri-forest text-white",
  split: "section-parchment",
};

const cardClasses: Record<SectionCTAVariant, string> = {
  default: "card bg-cri-gradient text-white",
  gold: "card bg-cri-gradient-gold text-cri-humus",
  forest: "card bg-white/5 backdrop-blur-sm border border-white/20 text-white",
  split: "card overflow-hidden p-0",
};

const titleClasses: Record<SectionCTAVariant, string> = {
  default: "text-white font-serif",
  gold: "text-cri-humus font-serif",
  forest: "text-white font-serif",
  split: "text-cri-forest font-serif",
};

const subtitleClasses: Record<SectionCTAVariant, string> = {
  default: "text-cri-parchment",
  gold: "text-cri-humus/85",
  forest: "text-cri-parchment",
  split: "text-cri-humus",
};

const primaryButtonClasses: Record<SectionCTAVariant, string> = {
  default: "btn-gold",
  gold: "btn bg-cri-forest text-white hover:bg-cri-canopy",
  forest: "btn-gold",
  split: "btn bg-cri-forest text-white hover:bg-cri-canopy",
};

const secondaryButtonClasses: Record<SectionCTAVariant, string> = {
  default: "btn border-2 border-white/80 text-white hover:bg-white hover:text-cri-forest",
  gold: "btn border-2 border-cri-forest text-cri-forest hover:bg-cri-forest hover:text-white",
  forest: "btn border-2 border-white text-white hover:bg-white hover:text-cri-forest",
  split: "btn border-2 border-cri-forest text-cri-forest hover:bg-cri-forest hover:text-white",
};

export interface CTAButton {
  href: string;
  label: string;
}

export interface SectionCTAProps {
  title: string;
  description?: string;
  primaryCta?: CTAButton;
  secondaryCta?: CTAButton;
  variant?: SectionCTAVariant;
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  className?: string;
}

export const SectionCTA: React.FC<SectionCTAProps> = ({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = "default",
  image,
  imageAlt,
  eyebrow,
  className,
}) => {
  return (
    <section className={cn(containerClasses[variant], className)}>
      <div className="container-cri">
        {variant === "split" && image ? (
          <div className="card grid overflow-hidden p-0 md:grid-cols-2">
            <div
              className="min-h-[400px] bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
              role="img"
              aria-label={imageAlt}
            />
            <div className="flex flex-col justify-center p-8 md:p-12">
              {eyebrow && (
                <span className="text-label text-cri-cacao mb-3 font-bold uppercase tracking-wider">
                  {eyebrow}
                </span>
              )}
              <h2 className={cn("text-3xl md:text-4xl", titleClasses[variant])}>{title}</h2>
              {description && (
                <p className={cn("mt-4 text-lg", subtitleClasses[variant])}>{description}</p>
              )}
              {(primaryCta || secondaryCta) && (
                <div className="mt-8 flex flex-wrap gap-4">
                  {primaryCta && (
                    <Link href={primaryCta.href} className={primaryButtonClasses[variant]}>
                      {primaryCta.label}
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </Link>
                  )}
                  {secondaryCta && (
                    <Link href={secondaryCta.href} className={secondaryButtonClasses[variant]}>
                      {secondaryCta.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className={cn(
              cardClasses[variant],
              "relative overflow-hidden p-10 text-center md:p-16"
            )}
          >
            {/* Orbes dorées décoratives */}
            <div
              className="bg-cri-gold/15 pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="bg-cri-gold/15 pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full blur-3xl"
              aria-hidden="true"
            />

            <div className="relative">
              {eyebrow && (
                <span
                  className={cn(
                    "text-label mb-4 inline-block font-bold uppercase tracking-wider",
                    variant === "gold" ? "text-cri-cacao-dark" : "text-cri-gold"
                  )}
                >
                  {eyebrow}
                </span>
              )}
              <h2
                className={cn(
                  "mx-auto max-w-3xl text-3xl leading-tight md:text-4xl lg:text-5xl",
                  titleClasses[variant]
                )}
              >
                {title}
              </h2>
              {description && (
                <p
                  className={cn(
                    "mx-auto mt-5 max-w-2xl text-lg leading-relaxed",
                    subtitleClasses[variant]
                  )}
                >
                  {description}
                </p>
              )}
              {(primaryCta || secondaryCta) && (
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  {primaryCta && (
                    <Link
                      href={primaryCta.href}
                      className={cn(primaryButtonClasses[variant], "px-7 py-3.5 text-base")}
                    >
                      {primaryCta.label}
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </Link>
                  )}
                  {secondaryCta && (
                    <Link
                      href={secondaryCta.href}
                      className={cn(secondaryButtonClasses[variant], "px-7 py-3.5 text-base")}
                    >
                      {secondaryCta.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
