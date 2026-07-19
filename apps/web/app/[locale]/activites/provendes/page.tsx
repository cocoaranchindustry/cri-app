"use client";

import { Wheat, Award, Beaker, TrendingDown, Sparkles, ArrowRight, Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { GlassCard } from "@/components/ui/GlassCard";
import { KpiCounter } from "@/components/ui/KpiCounter";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";

/**
 * Page /activites/provendes — Pôle 2 : Provenderie brevetée
 */

export default function ProvendesPage() {
  const t = useTranslations("pages.provendes");
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
          image="https://images.unsplash.com/photo-1620004085588-a982825a5327?w=1920&q=80"
          imageAlt="Sacs de provende animale dans un entrepôt"
          primaryCta={{ href: "/brevet", label: "Voir le brevet OAPI" }}
          secondaryCta={{ href: "/contact", label: "Devis provende" }}
          viewportHeight
        />

        <section className="bg-cri-parchment py-20">
          <div className="container-cri">
            <StaggerGroup className="grid grid-cols-2 gap-5 lg:grid-cols-4" staggerDelay={0.1}>
              <KpiCounter
                value={15}
                suffix=" %"
                label="Moins cher"
                description="vs marché local"
                icon={<TrendingDown className="h-5 w-5" />}
                trend="down"
              />
              <KpiCounter
                value={250}
                suffix=" kt"
                label="Capacité / an"
                description="Usine de Njombé"
                icon={<Wheat className="h-5 w-5" />}
                trend="up"
              />
              <KpiCounter
                value={2022}
                label="Brevet OAPI"
                description="Protection 20 ans"
                icon={<Award className="h-5 w-5" />}
                trend="stable"
              />
              <KpiCounter
                value={30}
                suffix=" %"
                label="Marge éleveur"
                description="Sur le coût final"
                icon={<Sparkles className="h-5 w-5" />}
                trend="up"
              />
            </StaggerGroup>
          </div>
        </section>

        <SectionDivider variant="triangle" fillClassName="fill-cri-cream" height={64} />

        <section className="bg-cri-cream py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                Innovation
              </p>
              <h2 className="text-cri-forest font-serif text-3xl font-bold md:text-5xl">
                Pourquoi nos provendes sont uniques
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid gap-5 md:grid-cols-3" staggerDelay={0.12}>
              {[
                {
                  icon: Beaker,
                  title: "Formulation brevetée",
                  desc: "Broyage fin des cabosses + mix protéique local (soja, tourteau de palme). Apport énergétique et protéique validé en laboratoire.",
                },
                {
                  icon: TrendingDown,
                  title: "-15 % vs marché",
                  desc: "Coût matière première inférieur grâce à la valorisation d'un déchet (cabosses). Prix de vente jusqu'à 30 % inférieur pour l'éleveur final.",
                },
                {
                  icon: Lightbulb,
                  title: "Économie circulaire",
                  desc: "Transformation d'un résidu agricole en intrant à forte valeur. Impact environnemental positif : zéro cabosse brûlée.",
                },
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <GlassCard key={b.title} variant="default" hover className="h-full p-7">
                    <div
                      className="bg-cri-gold/15 text-cri-gold-dark mb-5 flex h-14 w-14 items-center justify-center rounded-xl"
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
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <RevealOnScroll variant="slide-right">
                <p className="text-cri-gold mb-3 text-[10px] font-bold uppercase tracking-[0.3em]">
                  Gamme
                </p>
                <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">
                  Deux formulations pour deux marchés
                </h2>
                <p className="text-cri-text-on-dark/85 mb-6 leading-relaxed">
                  CRI-PROVEND CACAO est déclinée en deux formulations scientifiquement équilibrées,
                  validées par notre laboratoire partenaire à Douala.
                </p>
              </RevealOnScroll>
              <StaggerGroup className="space-y-4" staggerDelay={0.15}>
                {[
                  {
                    name: "CRI-PROVEND CACAO Poulets",
                    target: "Poulets de chair",
                    cycle: "Cycle 0-45 jours",
                  },
                  {
                    name: "CRI-PROVEND CACAO Porcs",
                    target: "Porcs d'engraissement",
                    cycle: "Cycle 0-180 jours",
                  },
                ].map((p) => (
                  <div
                    key={p.name}
                    className="bg-cri-forest-light/30 border-cri-gold/20 rounded-2xl border-2 p-6 backdrop-blur-md"
                  >
                    <h3 className="text-cri-gold mb-2 font-serif text-xl font-bold">{p.name}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-cri-text-on-dark/60 text-xs uppercase tracking-wider">
                          Cible
                        </p>
                        <p className="text-cri-text-on-dark">{p.target}</p>
                      </div>
                      <div>
                        <p className="text-cri-text-on-dark/60 text-xs uppercase tracking-wider">
                          Cycle
                        </p>
                        <p className="text-cri-text-on-dark">{p.cycle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </section>

        <section className="bg-cri-cream py-20">
          <div className="container-cri max-w-2xl text-center">
            <RevealOnScroll variant="zoom-in">
              <h2 className="text-cri-forest mb-4 font-serif text-3xl font-bold md:text-4xl">
                Commandez nos provendes
              </h2>
              <p className="text-cri-ink-muted mb-8 text-lg">
                Livraison Bassin du Mungo et départements limitrophes. Commande minimum : 1 tonne.
              </p>
              <Link
                href="/contact"
                className="bg-cri-cacao text-cri-text-on-dark hover:bg-cri-forest focus:ring-cri-gold inline-flex h-14 items-center gap-2 rounded-xl px-8 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Demander un devis
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
