"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * SectionImpact — Section dédiée aux KPIs (Brandbook CRI v5)
 *
 * Variantes :
 * - default : fond parchemin
 * - forest : fond vert profond
 * - dark : fond humus (corps texte)
 */

export type SectionVariant = "default" | "forest" | "dark";

const variantClasses: Record<SectionVariant, string> = {
  default: "bg-cri-parchment",
  forest: "bg-cri-forest text-white",
  dark: "bg-cri-humus text-cri-parchment",
};

export interface SectionImpactProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SectionVariant;
  title?: string;
  subtitle?: string;
  withPattern?: boolean;
}

export const SectionImpact: React.FC<SectionImpactProps> = ({
  variant = "default",
  title,
  subtitle,
  withPattern = false,
  className,
  children,
  ...props
}) => {
  return (
    <section
      className={cn("py-16 px-4 md:px-8 relative overflow-hidden", variantClasses[variant], className)}
      {...props}
    >
      {withPattern && (
        <div
          className="absolute inset-0 opacity-10 bg-feve-pattern pointer-events-none"
          aria-hidden="true"
        />
      )}
      <div className="container-cri relative">
        {(title || subtitle) && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            {subtitle && (
              <span
                className={cn(
                  "text-label uppercase font-bold tracking-wider",
                  variant === "default" ? "text-cri-cacao" : "text-cri-gold"
                )}
              >
                {subtitle}
              </span>
            )}
            {title && (
              <h2
                className={cn(
                  "mt-3 text-3xl md:text-4xl",
                  variant === "default" ? "text-cri-forest" : "text-white"
                )}
              >
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
