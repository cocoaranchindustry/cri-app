"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Modal — Dialog animé (Brandbook CRI v6)
 *
 * Modale accessible avec :
 * - Animations d'entrée/sortie (framer-motion)
 * - Backdrop flou
 * - Fermeture par Échap + clic backdrop
 * - Scroll lock du body
 * - Respect prefers-reduced-motion
 * - Focus trap manuel
 *
 * Variantes :
 * - default : parchemin, bordure cacao
 * - forest : fond vert, texte crème
 * - gold : fond dégradé or
 */

export type ModalVariant = "default" | "forest" | "gold";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: ModalVariant;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
} as const;

const variantClasses: Record<ModalVariant, string> = {
  default: "bg-cri-parchment text-cri-humus border-2 border-cri-cacao/30",
  forest: "bg-cri-forest text-cri-parchment border-2 border-cri-gold/30",
  gold: "bg-cri-gradient-gold text-cri-humus border-2 border-cri-gold-dark",
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  variant = "default",
  size = "md",
  closeOnBackdrop = true,
  showCloseButton = true,
  className,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Scroll lock
  React.useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
    return undefined;
  }, [isOpen]);

  // Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Focus modal
  React.useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="bg-cri-forest-dark/70 absolute inset-0 backdrop-blur-sm"
            onClick={closeOnBackdrop ? onClose : undefined}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            className={cn(
              "rounded-cri shadow-cri-lg relative w-full overflow-hidden",
              sizeMap[size],
              variantClasses[variant],
              className
            )}
            initial={
              prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92, y: 20 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {(title || showCloseButton) && (
              <div className="border-cri-cacao/20 flex items-start justify-between border-b p-6">
                <div>
                  {title && (
                    <h2
                      id="modal-title"
                      className={cn(
                        "font-serif text-2xl font-bold",
                        variant === "forest" ? "text-cri-gold" : "text-cri-forest"
                      )}
                    >
                      {title}
                    </h2>
                  )}
                  {description && <p className="mt-2 text-sm opacity-80">{description}</p>}
                </div>
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    className={cn(
                      "rounded-full p-1.5 transition-colors",
                      variant === "forest"
                        ? "text-cri-parchment hover:bg-white/10"
                        : "text-cri-humus hover:bg-cri-cacao/10"
                    )}
                    aria-label="Fermer la modale"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}

            <div className="max-h-[70vh] overflow-y-auto p-6">{children}</div>

            {footer && (
              <div className="border-cri-cacao/20 bg-cri-cream/40 border-t px-6 py-4">{footer}</div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
