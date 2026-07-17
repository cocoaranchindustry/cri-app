"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, type LucideIcon, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * HeroSection — Section héro immersif (Brandbook CRI v6)
 *
 * Variantes :
 * - "image" : image plein écran + overlay gradient + parallaxe
 * - "gradient" : gradient forest + orbes flottantes
 * - "split" : image 50/50 avec contenu à gauche
 * - "full" : hero immersif avec image de fond + glassmorphism
 *
 * Améliorations récentes :
 * - Pattern cabosse SVG animé en arrière-plan
 * - Trust indicators (badges certifications) en bas
 * - Carte flottante glassmorphism en preview
 * - Stats inline (preuve sociale immédiate)
 * - Animations d'entrée staggered plus marquées
 * - "Scroll cue" amélioré avec libellé textuel
 * - Respecte prefers-reduced-motion
 */
export interface FloatingOrbConfig {
  color?: "gold" | "cacao" | "canopy";
  size?: string;
  position?: string;
  delay?: number;
  duration?: number;
}

export interface TrustBadge {
  label: string;
  icon?: React.ReactNode;
}

export interface HeroStat {
  value: string;
  label: string;
  suffix?: string;
}

export interface HeroSectionProps {
  badge?: string | { icon?: React.ReactNode; label: string };
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  tagline?: string;
  primaryCta?: { href: string; label: string; icon?: React.ReactNode };
  secondaryCta?: { href: string; label: string; icon?: React.ReactNode };
  variant?: "image" | "gradient" | "split" | "full";
  image?: string;
  imageAlt?: string;
  icon?: LucideIcon;
  align?: "left" | "center";
  height?: "default" | "full" | "compact" | "hero";
  className?: string;
  floatingOrbs?: FloatingOrbConfig[];
  /** Stats inline (3-4 max) pour preuve sociale immédiate */
  stats?: HeroStat[];
  /** Badges de certifications visibles en bas du hero (EUDR, OAPI, ISO...) */
  trustBadges?: TrustBadge[];
  /** URL vidéo optionnelle (icône play remplacera l'un des CTA) */
  videoUrl?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge,
  title,
  subtitle,
  tagline,
  primaryCta,
  secondaryCta,
  variant = "image",
  image,
  imageAlt,
  icon: Icon,
  align = "left",
  height = "default",
  className,
  floatingOrbs = [],
  stats = [],
  trustBadges = [],
  videoUrl,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, prefersReducedMotion ? 1 : 0]);
  const patternY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 60]);

  const heightClass = {
    default: "min-h-[60vh] md:min-h-[70vh]",
    full: "min-h-[100vh]",
    hero: "min-h-[90vh] md:min-h-screen",
    compact: "min-h-[50vh] md:min-h-[60vh]",
  }[height];

  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  const badgeLabel = typeof badge === "string" ? badge : badge?.label;
  const badgeIcon =
    typeof badge === "object" && badge?.icon
      ? badge.icon
      : Icon
      ? <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      : null;

  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        heightClass,
        "flex items-center",
        className
      )}
      aria-label="Section héro"
    >
      {/* Background layer */}
      {variant === "image" && image && (
        <>
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y }}
            aria-hidden="true"
          >
            <Image
              src={image}
              alt={imageAlt ?? ""}
              fill
              priority
              sizes="100vw"
              quality={80}
              className="h-full w-full object-cover"
            />
          </motion.div>
          {/* Overlay gradient — multi-layer pour profondeur */}
          <div
            className="absolute inset-0 z-10 bg-gradient-to-br from-cri-forest-dark/95 via-cri-forest/75 to-cri-forest-dark/90"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 z-10 bg-gradient-to-t from-cri-forest-dark/80 via-transparent to-cri-forest-dark/40"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(212,160,36,0.18),transparent_55%)]"
            aria-hidden="true"
          />
        </>
      )}

      {variant === "gradient" && (
        <>
          <div
            className="absolute inset-0 z-0 bg-gradient-to-br from-cri-forest via-cri-forest to-cri-canopy"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,160,36,0.20),transparent_50%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 z-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(156,74,26,0.10) 0%, transparent 50%)",
            }}
            aria-hidden="true"
          />
        </>
      )}

      {variant === "full" && (
        <>
          {/* Base gradient vert profond */}
          <div
            className="absolute inset-0 z-0 bg-gradient-to-br from-cri-forest-dark via-cri-forest to-cri-canopy"
            aria-hidden="true"
          />
          {/* Lueur or subtile en haut à droite */}
          <div
            className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_75%_15%,rgba(212,160,36,0.25),transparent_45%)]"
            aria-hidden="true"
          />
          {/* Lueur cacao subtile en bas à gauche */}
          <div
            className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_15%_85%,rgba(156,74,26,0.18),transparent_50%)]"
            aria-hidden="true"
          />
        </>
      )}

      {/* Pattern cabosse SVG animé (subtil, parallaxe inverse) */}
      <motion.div
        className="absolute inset-0 z-10 opacity-[0.06] pointer-events-none"
        style={{ y: patternY }}
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="hero-cocoa-pattern"
              x="0"
              y="0"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              {/* Cabosse stylisée (forme ovale + rainures) */}
              <g fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cri-gold">
                <ellipse cx="30" cy="30" rx="14" ry="20" />
                <line x1="22" y1="22" x2="38" y2="22" />
                <line x1="20" y1="30" x2="40" y2="30" />
                <line x1="22" y1="38" x2="38" y2="38" />
                {/* Fève */}
                <ellipse cx="90" cy="85" rx="10" ry="14" />
                <line x1="82" y1="85" x2="98" y2="85" />
                {/* Petite cabosse en miroir */}
                <ellipse cx="90" cy="30" rx="10" ry="14" />
                <line x1="84" y1="25" x2="96" y2="25" />
                <line x1="82" y1="30" x2="98" y2="30" />
                <line x1="84" y1="35" x2="96" y2="35" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-cocoa-pattern)" />
        </svg>
      </motion.div>

      {/* Floating orbs (optionnel) */}
      {floatingOrbs.length > 0 && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
          {floatingOrbs.map((orb, i) => {
            const colorClass =
              orb.color === "cacao"
                ? "bg-cri-cacao"
                : orb.color === "canopy"
                ? "bg-cri-canopy"
                : "bg-cri-gold";
            return (
              <motion.div
                key={i}
                className={cn(
                  "absolute rounded-full blur-3xl opacity-25",
                  orb.size ?? "w-96 h-96",
                  orb.position ?? "top-1/4 -left-20",
                  colorClass
                )}
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: [0, -30, 0],
                        x: [0, 15, 0],
                        scale: [1, 1.05, 1],
                      }
                }
                transition={{
                  duration: orb.duration ?? 8,
                  delay: orb.delay ?? 0,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>
      )}

      {/* Content */}
      <motion.div
        className={cn(
          "container-cri relative z-20 flex flex-col",
          alignClass
        )}
        style={{ opacity }}
      >
        <div className="max-w-4xl">
          {tagline && (
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-cri-gold mb-4"
            >
              {tagline}
            </motion.p>
          )}
          {badgeLabel && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 inline-flex"
            >
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-1.5",
                  "bg-cri-gold/15 text-cri-gold border-cri-gold/30 backdrop-blur-sm",
                  "text-xs font-semibold uppercase tracking-wider",
                  "shadow-[0_0_24px_rgba(212,160,36,0.15)]"
                )}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cri-gold opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cri-gold" />
                </span>
                {badgeIcon}
                {badgeLabel}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "font-serif font-bold leading-[1.05] tracking-tight",
              "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
              variant === "gradient" ? "text-cri-forest" : "text-cri-text-on-dark"
            )}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "mt-6 max-w-2xl text-lg md:text-xl leading-relaxed",
                variant === "gradient"
                  ? "text-cri-humus"
                  : "text-cri-text-on-dark/90"
              )}
            >
              {subtitle}
            </motion.div>
          )}

          {(primaryCta || secondaryCta || videoUrl) && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "mt-10 flex flex-col sm:flex-row gap-4 items-center",
                align === "center" && "justify-center"
              )}
            >
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className={cn(
                    "group relative inline-flex items-center justify-center gap-2",
                    "h-12 px-6 rounded-full font-semibold text-base",
                    "bg-cri-gold text-cri-forest",
                    "hover:bg-cri-gold-light hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(212,160,36,0.35)]",
                    "transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cri-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cri-forest-dark",
                    "min-h-[48px]",
                    "before:absolute before:inset-0 before:rounded-full before:bg-cri-gold-light/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity"
                  )}
                >
                  {primaryCta.label}
                  {primaryCta.icon ? (
                    <span className="transition-transform group-hover:translate-x-1">
                      {primaryCta.icon}
                    </span>
                  ) : (
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className={cn(
                    "group inline-flex items-center justify-center gap-2",
                    "h-12 px-6 rounded-full font-semibold text-base",
                    variant === "gradient"
                      ? "border-2 border-cri-forest text-cri-forest hover:bg-cri-forest hover:text-cri-text-on-dark"
                      : "border-2 border-cri-text-on-dark/40 bg-cri-text-on-dark/10 backdrop-blur-md text-cri-text-on-dark hover:bg-cri-text-on-dark/20 hover:border-cri-text-on-dark/70",
                    "transition-all duration-300 hover:scale-[1.02]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cri-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cri-forest-dark",
                    "min-h-[48px]"
                  )}
                >
                  {secondaryCta.icon && (
                    <span className="transition-transform group-hover:scale-110">
                      {secondaryCta.icon}
                    </span>
                  )}
                  {secondaryCta.label}
                </Link>
              )}
              {videoUrl && (
                <Link
                  href={videoUrl}
                  className={cn(
                    "group inline-flex items-center justify-center gap-3",
                    "h-12 px-4 rounded-full font-medium text-base",
                    "text-cri-text-on-dark hover:text-cri-gold",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cri-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cri-forest-dark",
                    "min-h-[48px]"
                  )}
                  aria-label="Lire la vidéo de présentation"
                >
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-cri-text-on-dark/15 backdrop-blur-md border border-cri-text-on-dark/30 group-hover:bg-cri-gold/20 group-hover:border-cri-gold/60 transition-colors">
                    <Play className="h-4 w-4 ml-0.5" aria-hidden="true" />
                  </span>
                  <span className="text-sm">Voir la vidéo</span>
                </Link>
              )}
            </motion.div>
          )}

          {/* Stats inline (preuve sociale immédiate) */}
          {stats.length > 0 && (
            <motion.dl
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "mt-12 flex flex-wrap gap-x-10 gap-y-6",
                align === "center" && "justify-center"
              )}
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col"
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cri-gold/80 mb-1 order-2">
                    {stat.label}
                  </dt>
                  <dd className="font-serif text-3xl md:text-4xl font-bold text-cri-text-on-dark leading-none order-1">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-cri-gold">{stat.suffix}</span>
                    )}
                  </dd>
                </div>
              ))}
            </motion.dl>
          )}
        </div>
      </motion.div>

      {/* Trust badges (certifications) en bas du hero */}
      {trustBadges.length > 0 && (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 z-20 border-t border-cri-text-on-dark/10 bg-cri-forest-dark/40 backdrop-blur-md"
        >
          <div className="container-cri py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-10">
              {trustBadges.map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-cri-text-on-dark/70"
                >
                  {badge.icon && (
                    <span className="text-cri-gold [&>svg]:h-3.5 [&>svg]:w-3.5" aria-hidden="true">
                      {badge.icon}
                    </span>
                  )}
                  <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em]">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Scroll indicator (only for full/hero height) */}
      {(height === "full" || height === "hero") && !trustBadges.length && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          aria-hidden="true"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cri-text-on-dark/60">
            Défiler pour explorer
          </span>
          <div className="h-10 w-6 rounded-full border-2 border-cri-text-on-dark/40 flex items-start justify-center p-1.5">
            <motion.div
              className="h-2 w-1 rounded-full bg-cri-text-on-dark/70"
              animate={
                prefersReducedMotion
                  ? {}
                  : { y: [0, 12, 0] }
              }
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
