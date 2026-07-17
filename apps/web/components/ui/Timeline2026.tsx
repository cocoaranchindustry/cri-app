"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Timeline2026 — Timeline horizontale de la montée en puissance 2026-2030
 *
 * Affiche 5 jalons clés avec projections de production :
 * - 2026 : Lancement (242 t fèves, 1 595 t provendes poulet)
 * - 2027 : Certification EUDR (380 t, 3 200 t)
 * - 2028 : Capacité cible (450 t, 5 500 t)
 * - 2029 : Expansion (500 t, 6 500 t)
 * - 2030 : Vision long terme (547 t, 7 407 t)
 */
const MILESTONES = [
  {
    year: 2026,
    title: "Lancement",
    description: "Démarrage opérationnel du ranch et de l'usine de séchage",
    metrics: [
      { label: "Fèves", value: "242 t" },
      { label: "Provendes", value: "1 595 t" },
    ],
    color: "cacao",
    status: "current",
  },
  {
    year: 2027,
    title: "Certification",
    description: "Obtention des certifications EUDR, Rainforest Alliance",
    metrics: [
      { label: "Fèves", value: "380 t" },
      { label: "Provendes", value: "3 200 t" },
    ],
    color: "canopy",
    status: "upcoming",
  },
  {
    year: 2028,
    title: "Capacité cible",
    description: "Atteinte de la capacité nominale et démarrage export",
    metrics: [
      { label: "Fèves", value: "450 t" },
      { label: "Provendes", value: "5 500 t" },
    ],
    color: "canopy",
    status: "upcoming",
  },
  {
    year: 2029,
    title: "Expansion",
    description: "Extension du bassin de production à 10 villages",
    metrics: [
      { label: "Fèves", value: "500 t" },
      { label: "Provendes", value: "6 500 t" },
    ],
    color: "canopy",
    status: "upcoming",
  },
  {
    year: 2030,
    title: "Vision long terme",
    description: "Leader régional du cacao premium tracé",
    metrics: [
      { label: "Fèves", value: "547 t" },
      { label: "Provendes", value: "7 407 t" },
    ],
    color: "gold",
    status: "future",
  },
];

const colorClasses = {
  cacao: "bg-cri-cacao border-cri-cacao",
  canopy: "bg-cri-canopy border-cri-canopy",
  gold: "bg-cri-gold border-cri-gold",
};

export const Timeline2026: React.FC<{ className?: string }> = ({ className }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Mobile: vertical timeline / Desktop: horizontal */}
      <div className="relative">
        {/* Connection line - horizontal on desktop, vertical on mobile */}
        <div
          className="from-cri-cacao via-cri-canopy to-cri-gold absolute bottom-0 left-4 top-0 w-0.5 bg-gradient-to-b md:hidden"
          aria-hidden="true"
        />
        <div
          className="from-cri-cacao via-cri-canopy to-cri-gold absolute left-0 right-0 top-6 hidden h-0.5 bg-gradient-to-r md:block"
          aria-hidden="true"
        />

        <ol className="relative space-y-8 md:grid md:grid-cols-5 md:gap-4 md:space-y-0">
          {MILESTONES.map((m, i) => {
            const dotColor = colorClasses[m.color as keyof typeof colorClasses];
            return (
              <motion.li
                key={m.year}
                className="relative pl-12 md:pl-0 md:pt-12"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Dot marker */}
                <div
                  className={cn(
                    "absolute left-0 top-0 md:left-1/2 md:top-2 md:-translate-x-1/2",
                    "h-8 w-8 rounded-full border-4 md:h-12 md:w-12",
                    dotColor,
                    "flex items-center justify-center",
                    "shadow-md",
                    m.status === "current" && "ring-cri-gold/30 ring-4"
                  )}
                  aria-hidden="true"
                >
                  <span className="text-cri-text-on-dark text-xs font-bold md:text-sm">
                    {m.year.toString().slice(-2)}
                  </span>
                </div>

                {/* Card */}
                <div
                  className={cn(
                    "rounded-xl p-5 transition-all duration-200",
                    "bg-cri-parchment border-cri-moss/30 shadow-soft border",
                    "hover:-translate-y-1 hover:shadow-md",
                    m.status === "current" && "ring-cri-gold/50 ring-2"
                  )}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-cri-forest font-serif text-2xl font-bold">{m.year}</span>
                    {m.status === "current" && (
                      <span className="bg-cri-gold/20 text-cri-gold-dark rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        En cours
                      </span>
                    )}
                  </div>
                  <h3 className="text-cri-canopy mb-2 font-serif text-lg font-semibold">
                    {m.title}
                  </h3>
                  <p className="text-cri-humus/80 mb-3 text-sm leading-relaxed">{m.description}</p>
                  <dl className="border-cri-moss/20 space-y-1 border-t pt-3">
                    {m.metrics.map((metric) => (
                      <div key={metric.label} className="flex items-center justify-between text-sm">
                        <dt className="text-cri-ink-muted">{metric.label}</dt>
                        <dd className="text-cri-cacao font-mono font-semibold">{metric.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Timeline2026;
