import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * PillarCard — Carte de pilier d'activité (Brandbook CRI v5)
 *
 * Variantes :
 * - cacao (vert profond) — Pilier 1 : Cacao
 * - provende (cacao) — Pilier 2 : Provenderie
 * - ferme (canopée) — Pilier 3 : Ferme intégrée
 *
 * Design :
 * - Photo illustrative Unsplash en arrière-plan (optionnel)
 * - Badge numéro en haut à droite
 * - Icône d'activité en haut à gauche dans un cercle blanc
 * - Titre + description + liste de bullets
 * - Lien CTA en pied de carte
 * - Hover : élévation + zoom léger de l'image
 */

export type PillarTone = "cacao" | "provende" | "ferme" | "forest" | "canopy";

const toneClasses: Record<PillarTone, { bg: string; text: string; accent: string }> = {
  cacao: { bg: "bg-cri-forest", text: "text-white", accent: "text-cri-gold" },
  provende: { bg: "bg-cri-cacao", text: "text-white", accent: "text-cri-gold" },
  ferme: { bg: "bg-cri-canopy", text: "text-white", accent: "text-cri-gold" },
  forest: { bg: "bg-cri-forest", text: "text-white", accent: "text-cri-gold" },
  canopy: { bg: "bg-cri-canopy", text: "text-white", accent: "text-cri-gold" },
};

export interface PillarCardProps {
  index: number; // 1, 2, 3
  title: string;
  description: string;
  icon: React.ReactNode;
  bullets: string[];
  cta: { href: string; label: string };
  image?: string;
  imageAlt?: string;
  tone?: PillarTone;
  badge?: string;
}

export const PillarCard: React.FC<PillarCardProps> = ({
  index,
  title,
  description,
  icon,
  bullets,
  cta,
  image,
  imageAlt,
  tone = "cacao",
  badge,
}) => {
  const colors = toneClasses[tone];

  return (
    <article
      className={cn(
        "rounded-cri shadow-cri group relative overflow-hidden transition-all duration-500",
        "hover:shadow-cri-lg hover:-translate-y-2"
      )}
    >
      {/* Image de fond */}
      {image ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${image})` }}
            role="img"
            aria-label={imageAlt}
          />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              tone === "cacao" && "from-cri-forest-dark/95 via-cri-forest/85 to-cri-canopy/70",
              tone === "provende" && "from-cri-humus/95 via-cri-cacao-dark/85 to-cri-cacao/65",
              tone === "ferme" && "from-cri-forest/95 via-cri-canopy/85 to-cri-canopy-light/60"
            )}
          />
        </>
      ) : (
        <div className={cn("absolute inset-0", colors.bg)} />
      )}

      {/* Pattern décoratif subtil */}
      <div
        className="bg-cri-pattern-feve pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
      />

      {/* Contenu */}
      <div className="relative flex min-h-[480px] flex-col p-7 text-white md:p-8">
        {/* Header : icône + numéro */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-sm">
            {icon}
          </div>
          <div className="flex flex-col items-end">
            {badge && (
              <span className="bg-cri-gold/90 text-cri-humus mb-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider">
                {badge}
              </span>
            )}
            <span
              className="text-cri-gold/40 font-serif text-5xl font-bold leading-none"
              aria-hidden="true"
            >
              0{index}
            </span>
          </div>
        </div>

        {/* Titre + description */}
        <h3 className="font-serif text-2xl font-bold leading-tight text-white md:text-3xl">
          {title}
        </h3>
        <p className="text-cri-parchment/90 mt-3 text-base leading-relaxed">{description}</p>

        {/* Bullets */}
        <ul className="text-cri-parchment/85 mt-5 flex-1 space-y-2 text-sm">
          {bullets.map((b) => (
            <li key={b} className="flex items-start">
              <span className="text-cri-gold mr-2 mt-0.5">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={cta.href}
          className="text-cri-gold hover:text-cri-gold-light group/cta mt-6 inline-flex items-center font-bold"
        >
          {cta.label}
          <ArrowRight
            className="ml-2 h-4 w-4 transition-transform group-hover/cta:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
};
