"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * SectionDivider — Séparateur de section organique
 *
 * Plusieurs variantes :
 * - "wave" : vague SVG (par défaut)
 * - "curve" : courbe douce
 * - "triangle" : triangle brandbook (motif CRI)
 * - "leaf" : feuille stylisée cacao
 */
export type DividerVariant = "wave" | "curve" | "triangle" | "leaf";
export type DividerFlip = "none" | "flip-y" | "flip-x";

export interface SectionDividerProps {
  variant?: DividerVariant;
  flip?: DividerFlip;
  fillClassName?: string;
  className?: string;
  height?: number;
}

const WAVE_PATH =
  "M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,120L0,120Z";

const CURVE_PATH = "M0,32 C240,96 480,96 720,48 C960,0 1200,0 1440,32 L1440,120 L0,120 Z";

const TRIANGLE_PATH = "M0,0 L720,120 L1440,0 L1440,120 L0,120 Z";

const LEAF_PATH = "M0,64 C320,0 1120,0 1440,64 C1120,128 320,128 0,64 Z";

const PATHS: Record<DividerVariant, string> = {
  wave: WAVE_PATH,
  curve: CURVE_PATH,
  triangle: TRIANGLE_PATH,
  leaf: LEAF_PATH,
};

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = "wave",
  flip = "none",
  fillClassName = "fill-cri-parchment",
  className,
  height = 80,
}) => {
  const path = PATHS[variant];
  const transform =
    flip === "flip-y"
      ? "scale(1,-1) translate(0,-120)"
      : flip === "flip-x"
        ? "scale(-1,1) translate(-1440,0)"
        : undefined;

  return (
    <div
      className={cn("relative w-full overflow-hidden leading-none", className)}
      style={{ height }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        style={transform ? { transform } : undefined}
      >
        <path d={path} className={fillClassName} />
      </svg>
    </div>
  );
};

export default SectionDivider;
