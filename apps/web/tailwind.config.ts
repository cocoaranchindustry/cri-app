import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

/**
 * Configuration Tailwind — Brandbook CRI v6 (Mise à jour juillet 2026)
 *
 * Source : affiches officielles COCOA RANCH & INDUSTRY (Bassin du Mungo)
 *
 * Palette officielle (vraie charte) :
 * - Forêt profonde : #1F4A2E (primaire — fond vert)
 * - Canopée        : #2D6B3E (secondaire — vert canopée)
 * - Cacao brûlé    : #9C4A1A (orange-brûlé signature — accents premium, replaces l'ancien #9C7A3A olive)
 * - Or lumière     : #D4A024 (or vif pour "N°1" et CTA gold)
 * - Crème          : #F5EFE0 (fond clair / texte sur fond vert)
 * - Crème claire   : #E5DCC8 (fonds de section alternatifs)
 * - Humus          : #3D3320 (corps de texte brun foncé)
 * - Ink muted      : #8B7860 (notes, sources)
 *
 * Règles strictes :
 * - AUCUNE couleur rouge ni bleue. Dominante verte 55-65 %.
 * - Cacao brûlé (orange) et or vif sont les 2 seules couleurs chaudes.
 * - Crème claire est utilisée pour les fonds de section (jamais blanc pur en grande surface).
 */

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./features/**/*.{ts,tsx,js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* ─── Brandbook CRI v6 — Charte officielle ─── */
        /* Verts (dominants 55-65%) */
        "cri-forest": "#1F4A2E", // vert forêt principal — fonds
        "cri-forest-dark": "#14322B", // vert très sombre — overlays
        "cri-canopy": "#2D6B3E", // vert canopée — CTA, hover
        "cri-canopy-light": "#3D8B52", // vert clair — accents
        "cri-moss": "#4A7C59", // mousse — séparateurs

        /* Cacao brûlé (signature, accent premium) */
        "cri-cacao": "#9C4A1A", // cacao grillé/brûlé — signature (changement majeur v5→v6)
        "cri-cacao-light": "#B5651F", // cacao clair
        "cri-cacao-dark": "#7A3812", // cacao très sombre

        /* Or vif (chiffres clés, CTA gold) */
        "cri-gold": "#D4A024", // or vif — KPI, "N°1"
        "cri-gold-light": "#E5B946", // or clair
        "cri-gold-dark": "#A87E15", // or sombre

        /* Crème (fonds clairs) */
        "cri-parchment": "#F5EFE0", // crème — fond principal
        "cri-cream": "#E5DCC8", // crème claire — fonds alternatifs
        "cri-cream-light": "#FAF6EB", // crème très claire

        /* Texte */
        "cri-humus": "#3D3320", // brun foncé — corps de texte
        "cri-ink-muted": "#8B7860", // beige grisé — notes
        "cri-text-on-dark": "#F5EFE0", // texte sur fond vert

        /* Neutres */
        "cri-bg": "#FAF6EB",
        "cri-surface": "#FFFFFF",
        "cri-border": "#E5DCC8",
        "cri-success": "#2E7D32", // vert sombre uniquement
        "cri-warning": "#B8860B", // ocre (pas d'orange vif)
        "cri-error": "#7A3812", // brun-cacao sourd (pas rouge vif)
      },

      fontFamily: {
        /* Brandbook : typographie serif distinctive pour "COCOA RANCH" */
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        display: ["Georgia", "Playfair Display", "serif"], // pour titres d'impact
        sans: ["Calibri", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["Consolas", "Monaco", "Courier New", "monospace"],
      },

      fontSize: {
        h1: ["2.4rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h2: ["1.8rem", { lineHeight: "1.3" }],
        h3: ["1.3rem", { lineHeight: "1.4" }],
        kpi: ["3rem", { lineHeight: "1.1" }],
        kpiLg: ["4rem", { lineHeight: "1.0" }],
        label: ["0.8rem", { letterSpacing: "0.05em", lineHeight: "1.4" }],
        caption: ["0.75rem", { lineHeight: "1.4" }],
      },

      backgroundImage: {
        "cri-gradient": "linear-gradient(135deg, #1F4A2E 0%, #2D6B3E 100%)",
        "cri-gradient-cacao": "linear-gradient(135deg, #9C4A1A 0%, #7A3812 100%)",
        "cri-gradient-gold": "linear-gradient(135deg, #D4A024 0%, #A87E15 100%)",
        "cri-gradient-hero": "linear-gradient(135deg, #14322B 0%, #1F4A2E 50%, #2D6B3E 100%)",
        "cri-pattern-feve":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><circle cx='30' cy='30' r='20' fill='none' stroke='%239C4A1A' stroke-width='0.5' opacity='0.15'/><circle cx='30' cy='30' r='10' fill='none' stroke='%23D4A024' stroke-width='0.5' opacity='0.15'/></svg>\")",
      },

      boxShadow: {
        cri: "0 2px 6px rgba(31, 74, 46, 0.10)",
        "cri-md": "0 4px 12px rgba(31, 74, 46, 0.15)",
        "cri-lg": "0 12px 32px rgba(31, 74, 46, 0.20)",
        "cri-cacao": "0 4px 12px rgba(156, 74, 26, 0.30)",
        "cri-gold": "0 4px 12px rgba(212, 160, 36, 0.30)",
      },

      borderRadius: {
        cri: "0.5rem",
      },

      spacing: {
        section: "6rem",
      },

      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "count-up": "countUp 1.5s ease-out",
        "float-slow": "float 6s ease-in-out infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [forms, typography, animate],
};

export default config;
