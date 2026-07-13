"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Card — Brandbook CRI v5
 *
 * Variantes :
 * - default : bg blanc, shadow légère
 * - bordered : bordure cacao
 * - gold : bordure or
 * - dark : fond vert profond, texte parchemin
 *
 * Sous-composants : CardHeader, CardTitle, CardDescription, CardContent, CardFooter
 */

type CardVariant = "default" | "bordered" | "gold" | "dark";

const variantClasses: Record<CardVariant, string> = {
  default: "bg-white shadow-cri",
  bordered: "bg-white border-2 border-cri-cacao",
  gold: "bg-white border-2 border-cri-gold shadow-cri-gold",
  dark: "bg-cri-forest text-white border border-white/15",
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", hoverable = true, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-cri p-6 transition-all duration-300",
          variantClasses[variant],
          hoverable && "hover:shadow-cri-lg hover:-translate-y-1",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl text-cri-forest", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-cri-humus mt-2", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-cri-humus", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mt-6 pt-4 border-t border-cri-border flex items-center gap-4", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";
