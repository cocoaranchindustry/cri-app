"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * RevealOnScroll — Animation au scroll (Brandbook CRI v6)
 *
 * Composant qui anime ses enfants quand ils entrent dans le viewport.
 * - Respecte prefers-reduced-motion (a11y)
 * - Variantes prédéfinies : fade, slide-up, slide-left, slide-right, zoom, stagger
 * - Déclenchement : once par défaut (économie perf)
 *
 * Usage :
 *   <RevealOnScroll variant="slide-up" delay={0.2}>
 *     <h2>Titre</h2>
 *   </RevealOnScroll>
 *
 *   <StaggerGroup>
 *     <RevealOnScroll variant="slide-up" />
 *     <RevealOnScroll variant="slide-up" />
 *     <RevealOnScroll variant="slide-up" />
 *   </StaggerGroup>
 */

export type RevealVariant =
  "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-in" | "flip";

const variantMap: Record<RevealVariant, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-down": {
    hidden: { opacity: 0, y: -32 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1 },
  },
  flip: {
    hidden: { opacity: 0, rotateX: -60 },
    visible: { opacity: 1, rotateX: 0 },
  },
};

export interface RevealOnScrollProps extends Omit<
  HTMLMotionProps<"div">,
  "variants" | "initial" | "animate" | "whileInView"
> {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number; // 0..1, % de l'élément visible avant déclenchement
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  variant = "slide-up",
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
  className,
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();
  const variants = variantMap[variant];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // easing "expo-out" — Brandbook
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerGroup — Animation séquentielle d'enfants
 *
 * Anime chaque enfant direct avec un délai incrémental (stagger).
 * Doit contenir des <RevealOnScroll variant="slide-up" /> (ou tout motion.div
 * utilisant le variant "visible" du parent).
 */
export interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number; // délai entre chaque enfant
  initialDelay?: number;
  once?: boolean;
  amount?: number;
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const StaggerGroup: React.FC<StaggerGroupProps> = ({
  children,
  className,
  staggerDelay = 0.12,
  initialDelay = 0.1,
  once = true,
  amount = 0.2,
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} variants={staggerItem}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

/**
 * FloatingOrb — Orbe dorée flottante (décoratif)
 *
 * Crée un effet "premium" avec une orbe qui flotte en continu.
 * Utilisé en arrière-plan des sections hero / CTA.
 */
export interface FloatingOrbProps {
  className?: string;
  size?: string; // ex: "w-96 h-96"
  color?: "gold" | "cacao" | "canopy";
  delay?: number;
  duration?: number;
  intensity?: "subtle" | "normal" | "strong";
}

const colorMap = {
  gold: "bg-cri-gold",
  cacao: "bg-cri-cacao",
  canopy: "bg-cri-canopy",
} as const;

const intensityMap = {
  subtle: 6,
  normal: 12,
  strong: 20,
} as const;

export const FloatingOrb: React.FC<FloatingOrbProps> = ({
  className,
  size = "w-96 h-96",
  color = "gold",
  delay = 0,
  duration = 6,
  intensity = "normal",
}) => {
  const prefersReducedMotion = useReducedMotion();
  const distance = intensityMap[intensity];

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "pointer-events-none rounded-full blur-3xl",
          size,
          colorMap[color],
          "opacity-10",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.div
      className={cn(
        "pointer-events-none rounded-full blur-3xl",
        size,
        colorMap[color],
        "opacity-15"
      )}
      aria-hidden="true"
      animate={{
        y: [0, -distance, 0],
        x: [0, distance / 2, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};
