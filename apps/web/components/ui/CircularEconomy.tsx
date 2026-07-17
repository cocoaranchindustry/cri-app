"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Sprout, Factory, Recycle, TreePine, Beef, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";

/**
 * CircularEconomy — Infographie interactive du cycle d'économie circulaire
 *
 * Affiche un anneau central avec 6 étapes du cycle :
 * 1. Cacaoyer (plantation)
 * 2. Fèves (collecte)
 * 3. Séchage (transformation)
 * 4. Cabosses (résidu)
 * 5. Provendes (valorisation)
 * 6. Élevage (impact)
 * 7. Biomasse (retour)
 * 8. Plantation (boucle)
 *
 * Animation GSAP/Framer Motion : rotation lente du ring, pulse sur étape active
 */
const STEPS = [
  {
    id: "plantation",
    label: "Cacaoyer",
    description: "Plantation agroforestière 200 ha",
    icon: TreePine,
    color: "canopy",
  },
  {
    id: "feves",
    label: "Fèves premium",
    description: "Collecte 1 200 producteurs",
    icon: Sprout,
    color: "cacao",
  },
  {
    id: "sechage",
    label: "Séchage & tri",
    description: "Fermentation 7j, séchage premium",
    icon: Factory,
    color: "cacao",
  },
  {
    id: "cabosses",
    label: "Cabosses",
    description: "100 % valorisées (zéro perte)",
    icon: Recycle,
    color: "gold",
  },
  {
    id: "provendes",
    label: "Provendes",
    description: "Brevet OAPI — 250 000 t/an",
    icon: Factory,
    color: "gold",
  },
  {
    id: "elevage",
    label: "Élevage",
    description: "15 000 poulets/an + porcs",
    icon: Beef,
    color: "canopy",
  },
  {
    id: "biomasse",
    label: "Biomasse",
    description: "Biofertilisants + compost",
    icon: Recycle,
    color: "canopy",
  },
  {
    id: "retour",
    label: "Retour plantation",
    description: "Boucle fermée, 0 déchet",
    icon: ArrowRight,
    color: "gold",
  },
];

export const CircularEconomy: React.FC<{ className?: string }> = ({ className }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Visuel SVG circulaire */}
        <div className="relative aspect-square max-w-md mx-auto w-full">
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full"
            aria-hidden="true"
            role="presentation"
          >
            {/* Cercle central */}
            <defs>
              <radialGradient id="centerGlow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#D4A024" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#2D6B3E" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2D6B3E" />
                <stop offset="50%" stopColor="#D4A024" />
                <stop offset="100%" stopColor="#9C4A1A" />
              </linearGradient>
            </defs>

            {/* Glow center */}
            <circle cx="200" cy="200" r="80" fill="url(#centerGlow)" />

            {/* Outer ring (animated rotation) */}
            <motion.g
              style={{ transformOrigin: "200px 200px" }}
              animate={!prefersReducedMotion ? { rotate: 360 } : {}}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <circle
                cx="200"
                cy="200"
                r="160"
                fill="none"
                stroke="url(#ring)"
                strokeWidth="2"
                strokeDasharray="4 8"
                opacity="0.6"
              />
            </motion.g>

            {/* Inner solid ring */}
            <circle
              cx="200"
              cy="200"
              r="120"
              fill="none"
              stroke="#2D6B3E"
              strokeWidth="1"
              opacity="0.4"
            />

            {/* 8 step nodes */}
            {STEPS.map((step, i) => {
              const angle = (i / STEPS.length) * 2 * Math.PI - Math.PI / 2;
              const cx = 200 + 160 * Math.cos(angle);
              const cy = 200 + 160 * Math.sin(angle);
              const colorMap = {
                canopy: "#2D6B3E",
                cacao: "#9C4A1A",
                gold: "#D4A024",
              };
              return (
                <motion.g
                  key={step.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: "backOut" }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r="20"
                    fill={colorMap[step.color as keyof typeof colorMap]}
                    stroke="#F5EFE0"
                    strokeWidth="3"
                  />
                </motion.g>
              );
            })}

            {/* Central text */}
            <text
              x="200"
              y="195"
              textAnchor="middle"
              fill="#1F4A2E"
              fontSize="14"
              fontWeight="700"
              fontFamily="Georgia, serif"
            >
              ÉCONOMIE
            </text>
            <text
              x="200"
              y="215"
              textAnchor="middle"
              fill="#9C4A1A"
              fontSize="14"
              fontWeight="700"
              fontFamily="Georgia, serif"
            >
              CIRCULAIRE
            </text>
            <text
              x="200"
              y="235"
              textAnchor="middle"
              fill="#3D3320"
              fontSize="10"
              fontWeight="500"
            >
              100 % valorisé
            </text>
          </svg>
        </div>

        {/* Liste des étapes */}
        <div className="space-y-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const colorClass = {
              canopy: "bg-cri-canopy/10 text-cri-canopy border-cri-canopy/20",
              cacao: "bg-cri-cacao/10 text-cri-cacao border-cri-cacao/20",
              gold: "bg-cri-gold/15 text-cri-gold-dark border-cri-gold/30",
            }[step.color as "canopy" | "cacao" | "gold"];

            return (
              <motion.div
                key={step.id}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: "easeOut" }}
              >
                <GlassCard
                  variant="default"
                  hover
                  className="flex items-center gap-4 p-4"
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 flex-shrink-0",
                      colorClass
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-cri-ink-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-serif font-semibold text-cri-forest">
                        {step.label}
                      </h3>
                    </div>
                    <p className="text-sm text-cri-humus/80 mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CircularEconomy;
