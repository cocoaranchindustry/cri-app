"use client";

import * as React from "react";
import Link from "next/link";
import {
  Leaf,
  MapPin,
  Calendar,
  Award,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  QrCode,
  Sun,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { GlassCard } from "@/components/ui/GlassCard";
import { KpiCounter } from "@/components/ui/KpiCounter";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";

/**
 * Page /activites/cacao — Pôle 1 : Cacao Premium
 */

export default function CacaoPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          badge="Pôle 1 · Cacao Premium"
          title="Du terroir au conteneur, traçable et zéro défaut"
          subtitle="Collecte, fermentation 7 jours, séchage premium. Traçabilité CacaoTrace avec QR code pour chaque lot exporté."
          image="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1920&q=80"
          imageAlt="Cabosses de cacao mûres sur cacaoyer au Cameroun"
          primaryCta={{ href: "/contact", label: "Demander un devis" }}
          secondaryCta={{ href: "/produits", label: "Voir les produits" }}
          viewportHeight
        />

        {/* KPIs */}
        <section className="py-20 bg-cri-parchment">
          <div className="container-cri">
            <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
              <KpiCounter
                value={1200}
                label="Producteurs"
                description="6 villages encadrés"
                icon={<Leaf className="h-5 w-5" />}
                trend="up"
              />
              <KpiCounter
                value={200}
                label="Hectares"
                description="Cacaoyers agroforestiers"
                icon={<Sun className="h-5 w-5" />}
                trend="up"
              />
              <KpiCounter
                value={450}
                suffix=" t"
                label="Capacité / an"
                description="Fèves premium séchées"
                icon={<TrendingUp className="h-5 w-5" />}
                trend="up"
              />
              <KpiCounter
                value={50}
                suffix=" %"
                label="Au producteur"
                description="Du prix FOB (vs 40 % marché)"
                icon={<Award className="h-5 w-5" />}
                trend="up"
              />
            </StaggerGroup>
          </div>
        </section>

        <SectionDivider variant="wave" fillClassName="fill-cri-cream" height={80} />

        {/* PROCESS DE PRODUCTION */}
        <section className="py-20 md:py-24 bg-cri-cream">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
                Savoir-faire
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-cri-forest">
                Notre process de production
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
              {[
                {
                  step: "01",
                  icon: Leaf,
                  title: "Récolte sélective",
                  desc: "Cabosses matures uniquement, récolte à la main par les producteurs formés.",
                },
                {
                  step: "02",
                  icon: Sun,
                  title: "Fermentation 7 jours",
                  desc: "Bacs de fermentation en cascade, contrôle de température quotidien.",
                },
                {
                  step: "03",
                  icon: Calendar,
                  title: "Séchage solaire premium",
                  desc: "Séchage lent 8-10 jours, taux d'humidité final 6,5 %.",
                },
                {
                  step: "04",
                  icon: QrCode,
                  title: "Traçabilité QR Code",
                  desc: "Chaque sac étiqueté — parcelle, producteur, date, certifications.",
                },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <GlassCard key={s.step} variant="default" hover className="h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-4xl font-bold text-cri-cacao/30">
                        {s.step}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-cri-cacao/10 text-cri-cacao flex items-center justify-center" aria-hidden="true">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-cri-forest mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-cri-ink-muted leading-relaxed">{s.desc}</p>
                  </GlassCard>
                );
              })}
            </StaggerGroup>
          </div>
        </section>

        {/* TRAÇABILITÉ */}
        <section className="py-20 md:py-24 bg-cri-forest text-cri-text-on-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] bg-cri-pattern-feve pointer-events-none" aria-hidden="true" />
          <div className="container-cri relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <RevealOnScroll variant="slide-right">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-gold mb-3">
                  CacaoTrace · EUDR
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                  Traçabilité totale, de la parcelle au conteneur
                </h2>
                <p className="text-cri-text-on-dark/85 leading-relaxed mb-6">
                  Chaque lot de fèves CRI est tracé individuellement : coordonnées GPS
                  de la parcelle (≥ 6 décimales), identité du producteur, dates de
                  récolte, fermentation et séchage, analyses physico-chimiques.
                </p>
                <ul className="space-y-3">
                  {[
                    "Géolocalisation ≥ 6 décimales (norme EUDR)",
                    "Identité producteur + photo parcelle",
                    "Analyses pesticides & métaux lourds",
                    "QR Code consommateur final",
                    "Conformité Rainforest Alliance",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cri-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-cri-text-on-dark/90">{b}</span>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>

              <RevealOnScroll variant="zoom-in" className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-cri-canopy to-cri-forest p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-cri-gold mb-6">
                      <QrCode className="h-16 w-16 text-cri-forest" aria-hidden="true" />
                    </div>
                    <p className="font-mono text-cri-text-on-dark/80 text-sm">
                      Scannez · Vérifiez · Traçabilité garantie
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* ZONES DE PRODUCTION */}
        <section className="py-20 md:py-24 bg-cri-parchment">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
                Origine
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-cri-forest">
                Nos zones de production
              </h2>
              <p className="mt-4 text-cri-ink-muted leading-relaxed">
                6 villages du Bassin du Mungo, dans le département du Moungo
                (Région du Littoral, Cameroun).
              </p>
            </RevealOnScroll>

            <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
              {[
                "Njombé",
                "Penja",
                "Tombel",
                "Ekombité",
                "Loumgou",
                "Baboutcha",
              ].map((village) => (
                <div
                  key={village}
                  className="flex items-center gap-3 p-5 rounded-xl bg-cri-cream border border-cri-moss/20 hover:border-cri-cacao/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-cri-cacao text-cri-text-on-dark flex items-center justify-center" aria-hidden="true">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-cri-forest">{village}</p>
                    <p className="text-xs text-cri-ink-muted">Bassin du Mungo</p>
                  </div>
                </div>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-cri-cream">
          <div className="container-cri text-center max-w-2xl">
            <RevealOnScroll variant="zoom-in">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-cri-forest mb-4">
                Intéressé par notre cacao ?
              </h2>
              <p className="text-lg text-cri-ink-muted mb-8">
                Contactez notre équipe commerciale pour un devis, des échantillons
                ou une visite du ranch.
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
