"use client";

import * as React from "react";
import Link from "next/link";
import {
  Leaf,
  Wheat,
  Drumstick,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { CircularEconomy } from "@/components/ui/CircularEconomy";

/**
 * Page /activites — Hub des 3 pôles
 * Navigation : cacao / provendes / elevage
 */

const POLES = [
  {
    href: "/activites/cacao",
    icon: Leaf,
    label: "Pôle 1",
    title: "Cacao Premium",
    description:
      "Collecte, fermentation et séchage de fèves premium auprès de 1 200 producteurs encadrés. Traçabilité CacaoTrace, certification EUDR.",
    accent: "cacao",
    image:
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1200&q=80",
  },
  {
    href: "/activites/provendes",
    icon: Wheat,
    label: "Pôle 2",
    title: "Provenderie brevetée",
    description:
      "Valorisation des cabosses de cacao en aliments pour bétail « CRI-PROVEND CACAO ». Brevet OAPI, -15 % vs marché.",
    accent: "gold",
    image:
      "https://images.unsplash.com/photo-1620004085588-a982825a5327?w=1200&q=80",
  },
  {
    href: "/activites/elevage",
    icon: Drumstick,
    label: "Pôle 3",
    title: "Ferme intégrée",
    description:
      "15 000 poulets/an et porcs d'engraissement. Cycle 45 jours, alimentés par la provenderie interne. Biofertilisants issus des fientes.",
    accent: "canopy",
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1200&q=80",
  },
] as const;

const accentMap = {
  cacao: "bg-cri-cacao text-cri-text-on-dark",
  gold: "bg-cri-gold text-cri-forest",
  canopy: "bg-cri-canopy text-cri-text-on-dark",
} as const;

export default function ActivitiesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          image="https://images.unsplash.com/photo-1611174243743-303122be5937?w=1920&q=80"
          imageAlt="Cabosses de cacao mûres sur un cacaoyer"
          badge="Nos activités"
          title="Trois pôles, une circularité"
          subtitle="Cacao premium, provenderie brevetée et ferme intégrée : un modèle économique conçu pour valoriser 100 % des sous-produits."
          viewportHeight
        />

        {/* HUB : 3 PÔLES */}
        <section className="py-20 md:py-24 bg-cri-parchment">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
                Notre modèle intégré
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-cri-forest">
                Découvrez nos 3 pôles
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid lg:grid-cols-3 gap-6" staggerDelay={0.15}>
              {POLES.map((pole) => {
                const Icon = pole.icon;
                return (
                  <Link
                    key={pole.href}
                    href={pole.href}
                    className="group block h-full"
                    aria-label={`Découvrir ${pole.title}`}
                  >
                    <article className="relative h-full rounded-2xl overflow-hidden bg-cri-cream border-2 border-cri-moss/20 hover:border-cri-gold/50 hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
                      {/* Image */}
                      <div className="aspect-[16/9] overflow-hidden bg-cri-moss/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={pole.image}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      {/* Contenu */}
                      <div className="p-7">
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${accentMap[pole.accent]}`}
                            aria-hidden="true"
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cri-cacao">
                            {pole.label}
                          </span>
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-cri-forest mb-3">
                          {pole.title}
                        </h3>
                        <p className="text-sm text-cri-ink-muted leading-relaxed mb-5">
                          {pole.description}
                        </p>
                        <span className="inline-flex items-center gap-2 text-cri-cacao font-semibold text-sm group-hover:gap-3 transition-all">
                          Découvrir
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </StaggerGroup>
          </div>
        </section>

        <SectionDivider variant="leaf" fillClassName="fill-cri-cream" height={80} />

        {/* ÉCONOMIE CIRCULAIRE */}
        <section className="py-20 md:py-24 bg-cri-cream">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
                Économie circulaire
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-cri-forest">
                100 % de la fève est valorisée
              </h2>
              <p className="mt-4 text-cri-ink-muted leading-relaxed">
                Notre modèle en boucle fermée transforme chaque sous-produit en ressource.
              </p>
            </RevealOnScroll>
            <CircularEconomy />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
