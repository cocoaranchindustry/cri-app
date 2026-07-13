"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Button — Brandbook CRI v5
 *
 * Variantes :
 * - primary : bg-cri-forest (vert profond)
 * - gold : bg-cri-gold (CTA secondaire)
 * - outline : bordure verte, fond transparent
 * - ghost : pas de fond, hover parchemin
 *
 * Tailles : sm, md (default), lg
 */

type ButtonVariant = "primary" | "gold" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-cri-forest text-white hover:bg-cri-canopy hover:shadow-cri-md active:bg-cri-forest-dark",
  gold:
    "bg-cri-gold text-cri-humus hover:bg-cri-gold-light hover:shadow-cri-gold active:bg-cri-gold-dark",
  outline:
    "bg-transparent border-2 border-cri-forest text-cri-forest hover:bg-cri-forest hover:text-white",
  ghost:
    "bg-transparent text-cri-forest hover:bg-cri-parchment",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-bold transition-all duration-200 rounded-cri",
          "focus-visible:outline-2 focus-visible:outline-cri-gold focus-visible:outline-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Chargement...
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
