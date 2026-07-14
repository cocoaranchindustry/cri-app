"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FloatingOrb } from "./RevealOnScroll";

/**
 * PageHero — En-tête de page brandbook-compliant avec animations
 *
 * Variantes :
 * - default : fond parchemin, typo cacao
 * - dark : fond vert profond, typo blanche
 * - gradient : dégradé brandbook
 * - image : image plein écran avec overlay gradient + grain
 *
 * Animations d'entrée (framer-motion) :
 * - Badge : slide-down
 * - Titre : slide-up
 * - Sous-titre : fade-in
 * - CTAs : slide-up avec stagger
 * - Respecte prefers-reduced-motion
 */

export type PageHeroVariant = "default" | "dark" | "gradient" | "image";

const variantClasses: Record<PageHeroVariant, string> = {
  default: "bg-cri-parchment",
  dark: "bg-cri-forest text-white",
  gradient: "bg-cri-gradient text-white",
  image: "bg-cri-forest text-white",
};

export interface PageHeroProps {
  badge?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  variant?: PageHeroVariant;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  children?: React.ReactNode;
  withPattern?: boolean;
  className?: string;
  align?: "left" | "center";
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const PageHero: React.FC<PageHeroProps> = ({
  badge,
  title,
  subtitle,
  description,
  image,
  imageAlt,
  variant = "default",
  primaryCta,
  secondaryCta,
  children,
  withPattern = false,
  className,
  align = "left",
}) => {
  const showImage = variant === "image" && image;
  const isDarkSurface = showImage || variant !== "default";
  const prefersReducedMotion = useReducedMotion();

  const animProps = prefersReducedMotion
    ? {}
    : {
        initial: "hidden",
        animate: "visible",
        variants: containerVariants,
      };

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        showImage ? "text-white" : variantClasses[variant],
        "py-24 md:py-32 lg:py-40",
        className
      )}
    >
      {showImage && (
        <>
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            role="img"
            aria-label={imageAlt}
            initial={prefersReducedMotion ? { scale: 1 } : { scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {/* Double gradient : vert brandbook + ombre portée sur le texte */}
          <div className="from-cri-forest-dark/95 via-cri-forest/85 to-cri-canopy/70 absolute inset-0 bg-gradient-to-br" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </>
      )}

      {withPattern && !showImage && (
        <div
          className="bg-cri-pattern-feve pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden="true"
        />
      )}

      {/* Orbes lumineuses décoratives (variante image/dark) avec flottement */}
      {(showImage || variant === "dark" || variant === "gradient") && (
        <>
          <FloatingOrb
            size="w-[28rem] h-[28rem]"
            color="gold"
            className="absolute -right-32 -top-32"
            delay={0}
            duration={8}
          />
          <FloatingOrb
            size="w-96 h-96"
            color="cacao"
            className="absolute -bottom-32 -left-32 opacity-30"
            delay={2}
            duration={10}
            intensity="subtle"
          />
        </>
      )}

      <motion.div
        {...animProps}
        className={cn("container-cri relative", align === "center" && "text-center")}
      >
        {badge && (
          <motion.span
            variants={itemVariants}
            className={cn(
              "text-label mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-bold uppercase tracking-wider backdrop-blur-sm",
              isDarkSurface
                ? "text-cri-gold-light border-cri-gold/30 border bg-white/10"
                : "bg-cri-gold/15 text-cri-cacao border-cri-gold/40 border"
            )}
          >
            <motion.span
              className="bg-cri-gold h-1.5 w-1.5 rounded-full"
              aria-hidden="true"
              animate={prefersReducedMotion ? {} : { opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {badge}
          </motion.span>
        )}

        <motion.h1
          variants={itemVariants}
          className={cn(
            "font-serif font-bold leading-[1.05] tracking-tight",
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
            "max-w-5xl",
            isDarkSurface ? "text-white" : "text-cri-forest",
            align === "center" && "mx-auto"
          )}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            variants={itemVariants}
            className={cn(
              "mt-6 max-w-3xl text-lg leading-relaxed md:text-xl lg:text-2xl",
              isDarkSurface ? "text-cri-parchment/90" : "text-cri-humus",
              align === "center" && "mx-auto"
            )}
          >
            {subtitle}
          </motion.p>
        )}

        {description && (
          <motion.p
            variants={itemVariants}
            className={cn(
              "mt-4 max-w-2xl text-base leading-relaxed",
              isDarkSurface ? "text-cri-parchment/70" : "text-cri-ink-muted",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </motion.p>
        )}

        {(primaryCta || secondaryCta) && (
          <motion.div
            variants={itemVariants}
            className={cn("mt-10 flex flex-wrap gap-4", align === "center" && "justify-center")}
          >
            {primaryCta && (
              <Link href={primaryCta.href} className="btn-gold group px-7 py-3.5 text-base">
                {primaryCta.label}
                <ArrowRight
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className={cn(
                  "btn border-2 px-7 py-3.5 text-base",
                  isDarkSurface
                    ? "hover:text-cri-forest border-white/40 text-white hover:bg-white"
                    : "border-cri-forest text-cri-forest hover:bg-cri-forest hover:text-white"
                )}
              >
                {secondaryCta.label}
              </Link>
            )}
          </motion.div>
        )}

        {children && (
          <motion.div variants={itemVariants} className="mt-10">
            {children}
          </motion.div>
        )}
      </motion.div>

      {/* Vignette bas pour transition douce vers la suite */}
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 right-0 h-24",
          isDarkSurface
            ? "to-cri-forest-dark/50 bg-gradient-to-b from-transparent"
            : "to-cri-parchment bg-gradient-to-b from-transparent"
        )}
        aria-hidden="true"
      />
    </section>
  );
};
