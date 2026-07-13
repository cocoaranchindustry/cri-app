import type { Config } from "tailwindcss";

/**
 * Configuration Tailwind — Brandbook CRI v5
 *
 * Palette officielle :
 * - Forêt profonde : #1F4A2E (primaire)
 * - Canopée        : #2D6B3E (secondaire)
 * - Or cacao       : #9C7A3A (accent premium)
 * - Or lumière     : #C8A84B (KPI, CTA secondaires)
 * - Parchemin      : #F5F0E8 (fond principal)
 * - Humus          : #3D3320 (corps de texte)
 * - Ink muted      : #9C8A6A (notes)
 *
 * Règle Brandbook : AUCUNE couleur rouge ni bleue. Dominante verte 60-70 %.
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
        /* ─── Brandbook CRI v5 ─── */
        "cri-forest": "#1F4A2E",
        "cri-canopy": "#2D6B3E",
        "cri-cacao": "#9C7A3A",
        "cri-gold": "#C8A84B",
        "cri-parchment": "#F5F0E8",
        "cri-humus": "#3D3320",
        "cri-ink-muted": "#9C8A6A",

        /* Tons de vert dérivés (dégradés/hover) */
        "cri-forest-dark": "#14322B",
        "cri-forest-light": "#2D6B3E",
        "cri-canopy-light": "#3D8B52",
        "cri-canopy-dark": "#1F4A2E",

        /* Tons d'or/cacao dérivés */
        "cri-cacao-light": "#B5915A",
        "cri-cacao-dark": "#7A5F2D",
        "cri-gold-light": "#D8BC65",
        "cri-gold-dark": "#A88A30",

        /* Neutres harmonisés (jamais rouge ni bleu) */
        "cri-bg": "#f6f7f9",
        "cri-surface": "#FFFFFF",
        "cri-border": "#E3E6EB",
        "cri-success": "#2E7D32", /* vert sombre uniquement */
        "cri-warning": "#B8860B", /* ocre (pas d'orange vif) */
        "cri-error": "#8B3A2E",   /* brun-rouge sourd (pas rouge vif) */
      },

      fontFamily: {
        /* Brandbook : Georgia (serif) + Calibri (sans) */
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
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
        "cri-gradient":
          "linear-gradient(135deg, #1F4A2E 0%, #2D6B3E 100%)",
        "cri-gradient-gold":
          "linear-gradient(135deg, #9C7A3A 0%, #C8A84B 100%)",
        "cri-pattern-feve":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><circle cx='30' cy='30' r='20' fill='none' stroke='%239C7A3A' stroke-width='0.5' opacity='0.15'/><circle cx='30' cy='30' r='10' fill='none' stroke='%23C8A84B' stroke-width='0.5' opacity='0.15'/></svg>\")",
      },

      boxShadow: {
        cri: "0 2px 6px rgba(20, 50, 59, 0.08)",
        "cri-md": "0 4px 12px rgba(20, 50, 59, 0.12)",
        "cri-lg": "0 8px 24px rgba(20, 50, 59, 0.16)",
        "cri-gold": "0 4px 12px rgba(200, 168, 75, 0.25)",
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
      },
    },
  },
  plugins: [],
};

export default config;
