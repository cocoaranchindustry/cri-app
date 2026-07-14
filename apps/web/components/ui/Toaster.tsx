"use client";

import * as React from "react";
import { Toaster as SonnerToaster } from "sonner";

/**
 * Toaster — Notifications brandbook CRI v6
 *
 * Wrapper Sonner avec les couleurs brandbook :
 * - success : canopée (vert)
 * - error : cacao-dark
 * - warning : or
 * - info : forest
 *
 * Usage :
 *   import { toast } from "sonner";
 *   toast.success("Demande envoyée");
 *   toast.error("Une erreur est survenue");
 */

export const Toaster: React.FC = () => {
  return (
    <SonnerToaster
      position="top-right"
      richColors
      closeButton
      duration={5000}
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-cri-parchment text-cri-humus border-2 border-cri-cacao/30 shadow-cri-lg",
          title: "font-serif font-bold text-cri-forest",
          description: "text-cri-humus text-sm",
          actionButton: "bg-cri-forest text-white hover:bg-cri-canopy",
          cancelButton: "bg-cri-cream text-cri-humus hover:bg-cri-cacao/10",
          error: "!bg-cri-cacao-dark !text-cri-parchment !border-cri-cacao",
          success: "!bg-cri-canopy !text-white !border-cri-forest",
          warning: "!bg-cri-gold !text-cri-humus !border-cri-gold-dark",
          info: "!bg-cri-forest !text-cri-parchment !border-cri-forest-dark",
        },
      }}
    />
  );
};
