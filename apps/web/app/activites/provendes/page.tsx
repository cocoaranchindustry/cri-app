"use client";

import {
  Wheat,
  Award,
  Beaker,
  TrendingDown,
  Sparkles,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
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
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          badge="Pôle 2 · Provenderie"
          title="La provende inventée à partir des cabosses de cacao"
          subtitle="Brevet OAPI n°15012 — formulation CRI-PROVEND CACAO. -15 % vs marché, qualité nutritionnelle supérieure."
          image="https://images.unsplash.com/photo-1620004085588-a982825a5327?w=1920&q=80"
          imageAlt="Sacs de provende animale dans un entrepôt"
          primaryCta={{ href: "/brevet", label: "Voir le brevet OAPI" }}
          secondaryCta={{ href: "/contact", label: "Devis provende" }}
          viewportHeight
        />

        <section className="py-20 bg-cri-parchment">
          <div className="container-cri">
            <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
              <KpiCounter value={15} suffix=" %" label="Moins cher" description="vs marché local" icon={<TrendingDown className="h-5 w-5" />} trend="down" />
              <KpiCounter value={250} suffix=" kt" label="Capacité / an" description="Usine de Njombé" icon={<Wheat className="h-5 w-5" />} trend="up" />
              <KpiCounter value={2022} label="Brevet OAPI" description="Protection 20 ans" icon={<Award className="h-5 w-5" />} trend="stable" />
              <KpiCounter value={30} suffix=" %" label="Marge éleveur" description="Sur le coût final" icon={<Sparkles className="h-5 w-5" />} trend="up" />
            </StaggerGroup>
          </div>
        </section>

        <SectionDivider variant="triangle" fillClassName="fill-cri-cream" height={64} />

        <section className="py-20 md:py-24 bg-cri-cream">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
                Innovation
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-cri-forest">
                Pourquoi nos provendes sont uniques
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid md:grid-cols-3 gap-5" staggerDelay={0.12}>
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
                    <div className="w-14 h-14 rounded-xl bg-cri-gold/15 text-cri-gold-dark flex items-center justify-center mb-5" aria-hidden="true">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-cri-forest mb-3">{b.title}</h3>
                    <p className="text-cri-humus leading-relaxed">{b.desc}</p>
                  </GlassCard>
                );
              })}
            </StaggerGroup>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-cri-forest text-cri-text-on-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] bg-cri-pattern-feve pointer-events-none" aria-hidden="true" />
          <div className="container-cri relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <RevealOnScroll variant="slide-right">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-gold mb-3">
                  Gamme
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                  Deux formulations pour deux marchés
                </h2>
                <p className="text-cri-text-on-dark/85 leading-relaxed mb-6">
                  CRI-PROVEND CACAO est déclinée en deux formulations
                  scientifiquement équilibrées, validées par notre laboratoire
                  partenaire à Douala.
                </p>
              </RevealOnScroll>
              <StaggerGroup className="space-y-4" staggerDelay={0.15}>
                {[
                  { name: "CRI-PROVEND CACAO Poulets", target: "Poulets de chair", cycle: "Cycle 0-45 jours" },
                  { name: "CRI-PROVEND CACAO Porcs", target: "Porcs d'engraissement", cycle: "Cycle 0-180 jours" },
                ].map((p) => (
                  <div key={p.name} className="p-6 rounded-2xl bg-cri-forest-light/30 backdrop-blur-md border-2 border-cri-gold/20">
                    <h3 className="font-serif text-xl font-bold text-cri-gold mb-2">{p.name}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-cri-text-on-dark/60 text-xs uppercase tracking-wider">Cible</p>
                        <p className="text-cri-text-on-dark">{p.target}</p>
                      </div>
                      <div>
                        <p className="text-cri-text-on-dark/60 text-xs uppercase tracking-wider">Cycle</p>
                        <p className="text-cri-text-on-dark">{p.cycle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </section>

        <section className="py-20 bg-cri-cream">
          <div className="container-cri text-center max-w-2xl">
            <RevealOnScroll variant="zoom-in">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-cri-forest mb-4">
                Commandez nos provendes
              </h2>
              <p className="text-lg text-cri-ink-muted mb-8">
                Livraison Bassin du Mungo et départements limitrophes. Commande
                minimum : 1 tonne.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-xl bg-cri-cacao text-cri-text-on-dark font-semibold hover:bg-cri-forest transition-colors focus:outline-none focus:ring-2 focus:ring-cri-gold focus:ring-offset-2"
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
