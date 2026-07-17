"use client";

import { Drumstick, TrendingUp, Recycle, CheckCircle2, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { GlassCard } from "@/components/ui/GlassCard";
import { KpiCounter } from "@/components/ui/KpiCounter";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";

/**
 * Page /activites/elevage — Pôle 3 : Ferme intégrée
 */

export default function ElevagePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          badge="Pôle 3 · Ferme intégrée"
          title="Une ferme pilote qui boucle la circularité"
          subtitle="15 000 poulets/an et porcs d'engraissement. Alimentés par nos provendes. Cycle 45 jours optimisé. Biofertilisants issus des fientes."
          image="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1920&q=80"
          imageAlt="Poulets de chair en élevage intégré"
          primaryCta={{ href: "/contact", label: "Visiter la ferme" }}
          secondaryCta={{ href: "/produits", label: "Nos produits" }}
          viewportHeight
        />

        <section className="bg-cri-parchment py-20">
          <div className="container-cri">
            <StaggerGroup className="grid grid-cols-2 gap-5 lg:grid-cols-4" staggerDelay={0.1}>
              <KpiCounter
                value={15000}
                label="Poulets / an"
                description="Cycle 45 jours"
                icon={<Drumstick className="h-5 w-5" />}
                trend="up"
              />
              <KpiCounter
                value={200}
                label="Truies / an"
                description="Porcs engraissement"
                icon={<TrendingUp className="h-5 w-5" />}
                trend="up"
              />
              <KpiCounter
                value={120}
                suffix=" t"
                label="Biofertilisant"
                description="Fientes valorisées"
                icon={<Recycle className="h-5 w-5" />}
                trend="up"
              />
              <KpiCounter
                value={45}
                suffix=" j"
                label="Cycle poulet"
                description="Croissance optimisée"
                icon={<Calendar className="h-5 w-5" />}
                trend="stable"
              />
            </StaggerGroup>
          </div>
        </section>

        <SectionDivider variant="curve" fillClassName="fill-cri-cream" height={80} />

        <section className="bg-cri-cream py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                Modèle intégré
              </p>
              <h2 className="text-cri-forest font-serif text-3xl font-bold md:text-5xl">
                3 productions, 1 écosystème
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid gap-5 md:grid-cols-3" staggerDelay={0.12}>
              {[
                {
                  icon: Drumstick,
                  title: "Poulets de chair",
                  desc: "15 000/an, souche Cobb 500, aliment CRI-PROVEND CACAO Poulets.",
                },
                {
                  icon: TrendingUp,
                  title: "Porcs d'engraissement",
                  desc: "200 truies, souche Large White, aliment CRI-PROVEND CACAO Porcs.",
                },
                {
                  icon: Recycle,
                  title: "Biofertilisants",
                  desc: "120 t/an de fientes compostées, vendues aux producteurs cacaoyers.",
                },
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <GlassCard key={b.title} variant="default" hover className="h-full p-7">
                    <div
                      className="bg-cri-canopy/10 text-cri-canopy mb-5 flex h-14 w-14 items-center justify-center rounded-xl"
                      aria-hidden="true"
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-cri-forest mb-3 font-serif text-xl font-bold">{b.title}</h3>
                    <p className="text-cri-humus leading-relaxed">{b.desc}</p>
                  </GlassCard>
                );
              })}
            </StaggerGroup>
          </div>
        </section>

        <section className="bg-cri-forest text-cri-text-on-dark relative overflow-hidden py-20 md:py-24">
          <div
            className="bg-cri-pattern-feve pointer-events-none absolute inset-0 opacity-[0.04]"
            aria-hidden="true"
          />
          <div className="container-cri relative">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-gold mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                Bénéfices
              </p>
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                Un modèle duplicable dans 6 pays
              </h2>
            </RevealOnScroll>

            <StaggerGroup
              className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2"
              staggerDelay={0.1}
            >
              {[
                "Coût d'alimentation réduit de 30 %",
                "Traçabilité RFID animal par animal",
                "Biofertilisant 100 % local",
                "Insertion de 30 jeunes éleveurs / an",
                "Modulable : 5 000 à 50 000 poulets/an",
                "Rentabilité dès la 2e année",
              ].map((b) => (
                <div
                  key={b}
                  className="bg-cri-forest-light/30 border-cri-gold/20 flex items-start gap-3 rounded-xl border p-4 backdrop-blur-md"
                >
                  <CheckCircle2
                    className="text-cri-gold mt-0.5 h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-cri-text-on-dark/90">{b}</span>
                </div>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section className="bg-cri-cream py-20">
          <div className="container-cri max-w-2xl text-center">
            <RevealOnScroll variant="zoom-in">
              <h2 className="text-cri-forest mb-4 font-serif text-3xl font-bold md:text-4xl">
                Visitez notre ferme
              </h2>
              <p className="text-cri-ink-muted mb-8 text-lg">
                Visites guidées sur rendez-vous, du lundi au samedi. Démonstration du modèle et
                dégustations à la ferme.
              </p>
              <Link
                href="/contact"
                className="bg-cri-cacao text-cri-text-on-dark hover:bg-cri-forest focus:ring-cri-gold inline-flex h-14 items-center gap-2 rounded-xl px-8 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Prendre rendez-vous
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
