"use client";

import {
  FileText,
  Download,
  Calendar,
  Award,
  Beaker,
  TrendingUp,
  Newspaper,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { StaggerGroup } from "@/components/ui/RevealOnScroll";

/**
 * Page /publications — Rapports téléchargeables
 */

const PUBLICATIONS = [
  {
    icon: TrendingUp,
    type: "Business plan",
    title: "Business Plan 2026-2030 (résumé exécutif)",
    description: "Plan d&apos;affaires synthétique : modèle économique, projections financières, roadmap.",
    size: "2.4 Mo",
    date: "Mars 2026",
    color: "cacao",
  },
  {
    icon: Beaker,
    type: "Étude technique",
    title: "Étude d'ingénierie détaillée — Usine de séchage",
    description: "Étude d'ingénierie complète : process, équipements, génie civil, raccordements.",
    size: "8.7 Mo",
    date: "Octobre 2025",
    color: "canopy",
  },
  {
    icon: Award,
    type: "Brevet",
    title: "Brevet OAPI n°15012 — CRI-PROVEND CACAO",
    description: "Description complète du brevet : revendications, exemples, résultats.",
    size: "1.2 Mo",
    date: "Mars 2022",
    color: "gold",
  },
  {
    icon: FileText,
    type: "Rapport",
    title: "Rapport d'impact ESG 2024",
    description: "Bilan environnemental, social et de gouvernance. Indicateurs GRI.",
    size: "3.1 Mo",
    date: "Février 2025",
    color: "canopy",
  },
  {
    icon: TrendingUp,
    type: "Rapport financier",
    title: "Bilans financiers audités 2022-2024",
    description: "États financiers certifiés par KPMG Cameroun sur 3 exercices.",
    size: "1.8 Mo",
    date: "Avril 2025",
    color: "cacao",
  },
  {
    icon: Newspaper,
    type: "Étude de marché",
    title: "Étude de marché — Cacao camerounais 2025-2030",
    description: "Analyse de marché approfondie : demande, prix, certifications, EUDR.",
    size: "4.5 Mo",
    date: "Janvier 2025",
    color: "gold",
  },
];

const colorMap = {
  cacao: "bg-cri-cacao/10 text-cri-cacao",
  canopy: "bg-cri-canopy/10 text-cri-canopy",
  gold: "bg-cri-gold/15 text-cri-gold-dark",
} as const;

export default function PublicationsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          image="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1920&q=80"
          imageAlt="Bibliothèque de publications et rapports empilés"
          badge="Publications"
          title="Bibliothèque de documents"
          subtitle="Business plan, études techniques, brevets, rapports d'impact et études de marché. Téléchargement libre."
          viewportHeight
        />

        <section className="py-20 md:py-24 bg-cri-parchment">
          <div className="container-cri">
            <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.1}>
              {PUBLICATIONS.map((doc) => {
                const Icon = doc.icon;
                return (
                  <article
                    key={doc.title}
                    className="h-full p-6 rounded-2xl bg-cri-cream border-2 border-cri-moss/20 hover:border-cri-cacao/40 hover:shadow-soft transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[doc.color as keyof typeof colorMap]}`}
                        aria-hidden="true"
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cri-cacao">
                        {doc.type}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-cri-forest leading-tight mb-3">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-cri-ink-muted leading-relaxed mb-5">
                      {doc.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-cri-ink-muted mb-4 pb-4 border-t border-cri-moss/20 pt-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" aria-hidden="true" />
                        {doc.date}
                      </span>
                      <span className="font-mono">{doc.size}</span>
                    </div>
                    <button
                      type="button"
                      className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-lg bg-cri-cacao text-cri-text-on-dark text-sm font-semibold hover:bg-cri-forest transition-colors focus:outline-none focus:ring-2 focus:ring-cri-gold"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      Télécharger
                    </button>
                  </article>
                );
              })}
            </StaggerGroup>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
