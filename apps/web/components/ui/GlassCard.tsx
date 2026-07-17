"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

/**
 * GlassCard — Card avec effet glassmorphism (Brandbook CRI v6)
 *
 * Variantes :
 * - "light" : sur fond foncé, glassmorphism parchment semi-transparent
 * - "dark" : sur fond clair, glassmorphism forest
 * - "default" : card standard parchment
 * - "forest" : card premium sur fond vert
 */
export interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: "light" | "dark" | "default" | "forest";
  hover?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

const variantClasses = {
  light: "bg-cri-parchment/30 backdrop-blur-md border border-cri-cacao/20 text-cri-text-on-dark",
  dark: "bg-cri-forest/40 backdrop-blur-md border border-cri-gold/20 text-cri-text-on-dark",
  default: "bg-cri-parchment border border-cri-moss/30 shadow-soft",
  forest: "bg-cri-forest border border-cri-canopy/40 text-cri-text-on-dark",
};

export const GlassCard: React.FC<GlassCardProps> = ({
  variant = "default",
  hover = false,
  glow = false,
  className,
  children,
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();
  const MotionDiv = motion.div;

  return (
    <MotionDiv
      whileHover={hover && !prefersReducedMotion ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "rounded-xl p-6",
        variantClasses[variant],
        hover && "transition-shadow duration-200 hover:shadow-md",
        glow && "shadow-gold",
        className
      )}
      {...props}
    >
      {children}
    </MotionDiv>
  );
};

export default GlassCard;
