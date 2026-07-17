"use client";

import * as React from "react";
import Link from "next/link";
import { Leaf, Wheat, Drumstick, ArrowRight } from "lucide-react";
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
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1200&q=80",
  },
  {
    href: "/activites/provendes",
    icon: Wheat,
    label: "Pôle 2",
    title: "Provenderie brevetée",
    description:
      "Valorisation des cabosses de cacao en aliments pour bétail « CRI-PROVEND CACAO ». Brevet OAPI, -15 % vs marché.",
    accent: "gold",
    image: "https://images.unsplash.com/photo-1620004085588-a982825a5327?w=1200&q=80",
  },
  {
    href: "/activites/elevage",
    icon: Drumstick,
    label: "Pôle 3",
    title: "Ferme intégrée",
    description:
      "15 000 poulets/an et porcs d'engraissement. Cycle 45 jours, alimentés par la provenderie interne. Biofertilisants issus des fientes.",
    accent: "canopy",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1200&q=80",
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
        <section className="bg-cri-parchment py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                Notre modèle intégré
              </p>
              <h2 className="text-cri-forest font-serif text-3xl font-bold md:text-5xl">
                Découvrez nos 3 pôles
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid gap-6 lg:grid-cols-3" staggerDelay={0.15}>
              {POLES.map((pole) => {
                const Icon = pole.icon;
                return (
                  <Link
                    key={pole.href}
                    href={pole.href}
                    className="group block h-full"
                    aria-label={`Découvrir ${pole.title}`}
                  >
                    <article className="bg-cri-cream border-cri-moss/20 hover:border-cri-gold/50 hover:shadow-soft relative h-full overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1">
                      {/* Image */}
                      <div className="bg-cri-moss/10 aspect-[16/9] overflow-hidden">
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
                        <div className="mb-4 flex items-center gap-3">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${accentMap[pole.accent]}`}
                            aria-hidden="true"
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <span className="text-cri-cacao text-[10px] font-bold uppercase tracking-[0.2em]">
                            {pole.label}
                          </span>
                        </div>
                        <h3 className="text-cri-forest mb-3 font-serif text-2xl font-bold">
                          {pole.title}
                        </h3>
                        <p className="text-cri-ink-muted mb-5 text-sm leading-relaxed">
                          {pole.description}
                        </p>
                        <span className="text-cri-cacao inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3">
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
        <section className="bg-cri-cream py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                Économie circulaire
              </p>
              <h2 className="text-cri-forest font-serif text-3xl font-bold md:text-5xl">
                100 % de la fève est valorisée
              </h2>
              <p className="text-cri-ink-muted mt-4 leading-relaxed">
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
