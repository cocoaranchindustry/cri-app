"use client";

import {
  Drumstick,
  TrendingUp,
  Recycle,
  CheckCircle2,
  ArrowRight,
  Calendar,
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

        <section className="py-20 bg-cri-parchment">
          <div className="container-cri">
            <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
              <KpiCounter value={15000} label="Poulets / an" description="Cycle 45 jours" icon={<Drumstick className="h-5 w-5" />} trend="up" />
              <KpiCounter value={200} label="Truies / an" description="Porcs engraissement" icon={<TrendingUp className="h-5 w-5" />} trend="up" />
              <KpiCounter value={120} suffix=" t" label="Biofertilisant" description="Fientes valorisées" icon={<Recycle className="h-5 w-5" />} trend="up" />
              <KpiCounter value={45} suffix=" j" label="Cycle poulet" description="Croissance optimisée" icon={<Calendar className="h-5 w-5" />} trend="stable" />
            </StaggerGroup>
          </div>
        </section>

        <SectionDivider variant="curve" fillClassName="fill-cri-cream" height={80} />

        <section className="py-20 md:py-24 bg-cri-cream">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
                Modèle intégré
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-cri-forest">
                3 productions, 1 écosystème
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid md:grid-cols-3 gap-5" staggerDelay={0.12}>
              {[
                { icon: Drumstick, title: "Poulets de chair", desc: "15 000/an, souche Cobb 500, aliment CRI-PROVEND CACAO Poulets." },
                { icon: TrendingUp, title: "Porcs d'engraissement", desc: "200 truies, souche Large White, aliment CRI-PROVEND CACAO Porcs." },
                { icon: Recycle, title: "Biofertilisants", desc: "120 t/an de fientes compostées, vendues aux producteurs cacaoyers." },
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <GlassCard key={b.title} variant="default" hover className="h-full p-7">
                    <div className="w-14 h-14 rounded-xl bg-cri-canopy/10 text-cri-canopy flex items-center justify-center mb-5" aria-hidden="true">
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
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-gold mb-2">
                Bénéfices
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">
                Un modèle duplicable dans 6 pays
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto" staggerDelay={0.1}>
              {[
                "Coût d'alimentation réduit de 30 %",
                "Traçabilité RFID animal par animal",
                "Biofertilisant 100 % local",
                "Insertion de 30 jeunes éleveurs / an",
                "Modulable : 5 000 à 50 000 poulets/an",
                "Rentabilité dès la 2e année",
              ].map((b) => (
                <div key={b} className="flex items-start gap-3 p-4 rounded-xl bg-cri-forest-light/30 backdrop-blur-md border border-cri-gold/20">
                  <CheckCircle2 className="h-5 w-5 text-cri-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-cri-text-on-dark/90">{b}</span>
                </div>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section className="py-20 bg-cri-cream">
          <div className="container-cri text-center max-w-2xl">
            <RevealOnScroll variant="zoom-in">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-cri-forest mb-4">
                Visitez notre ferme
              </h2>
              <p className="text-lg text-cri-ink-muted mb-8">
                Visites guidées sur rendez-vous, du lundi au samedi. Démonstration
                du modèle et dégustations à la ferme.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-xl bg-cri-cacao text-cri-text-on-dark font-semibold hover:bg-cri-forest transition-colors focus:outline-none focus:ring-2 focus:ring-cri-gold focus:ring-offset-2"
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
