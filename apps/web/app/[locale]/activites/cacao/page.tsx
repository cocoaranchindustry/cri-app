"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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
  const t = useTranslations("pages.cacao");
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
          image="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1920&q=80"
          imageAlt="Cabosses de cacao mûres sur cacaoyer au Cameroun"
          primaryCta={{ href: "/contact", label: "Demander un devis" }}
          secondaryCta={{ href: "/produits", label: "Voir les produits" }}
          viewportHeight
        />

        {/* KPIs */}
        <section className="bg-cri-parchment py-20">
          <div className="container-cri">
            <StaggerGroup className="grid grid-cols-2 gap-5 lg:grid-cols-4" staggerDelay={0.1}>
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
        <section className="bg-cri-cream py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                Savoir-faire
              </p>
              <h2 className="text-cri-forest font-serif text-3xl font-bold md:text-5xl">
                Notre process de production
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
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
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-cri-cacao/30 font-serif text-4xl font-bold">
                        {s.step}
                      </span>
                      <div
                        className="bg-cri-cacao/10 text-cri-cacao flex h-10 w-10 items-center justify-center rounded-full"
                        aria-hidden="true"
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="text-cri-forest mb-2 font-serif text-lg font-bold">{s.title}</h3>
                    <p className="text-cri-ink-muted text-sm leading-relaxed">{s.desc}</p>
                  </GlassCard>
                );
              })}
            </StaggerGroup>
          </div>
        </section>

        {/* TRAÇABILITÉ */}
        <section className="bg-cri-forest text-cri-text-on-dark relative overflow-hidden py-20 md:py-24">
          <div
            className="bg-cri-pattern-feve pointer-events-none absolute inset-0 opacity-[0.04]"
            aria-hidden="true"
          />
          <div className="container-cri relative">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <RevealOnScroll variant="slide-right">
                <p className="text-cri-gold mb-3 text-[10px] font-bold uppercase tracking-[0.3em]">
                  CacaoTrace · EUDR
                </p>
                <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">
                  Traçabilité totale, de la parcelle au conteneur
                </h2>
                <p className="text-cri-text-on-dark/85 mb-6 leading-relaxed">
                  Chaque lot de fèves CRI est tracé individuellement : coordonnées GPS de la
                  parcelle (≥ 6 décimales), identité du producteur, dates de récolte, fermentation
                  et séchage, analyses physico-chimiques.
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
                      <CheckCircle2
                        className="text-cri-gold mt-0.5 h-5 w-5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-cri-text-on-dark/90">{b}</span>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>

              <RevealOnScroll variant="zoom-in" className="relative">
                <div className="from-cri-canopy to-cri-forest flex aspect-square items-center justify-center rounded-3xl bg-gradient-to-br p-12">
                  <div className="text-center">
                    <div className="bg-cri-gold mb-6 inline-flex h-32 w-32 items-center justify-center rounded-3xl">
                      <QrCode className="text-cri-forest h-16 w-16" aria-hidden="true" />
                    </div>
                    <p className="text-cri-text-on-dark/80 font-mono text-sm">
                      Scannez · Vérifiez · Traçabilité garantie
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* ZONES DE PRODUCTION */}
        <section className="bg-cri-parchment py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                Origine
              </p>
              <h2 className="text-cri-forest font-serif text-3xl font-bold md:text-5xl">
                Nos zones de production
              </h2>
              <p className="text-cri-ink-muted mt-4 leading-relaxed">
                6 villages du Bassin du Mungo, dans le département du Moungo (Région du Littoral,
                Cameroun).
              </p>
            </RevealOnScroll>

            <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
              {["Njombé", "Penja", "Tombel", "Ekombité", "Loumgou", "Baboutcha"].map((village) => (
                <div
                  key={village}
                  className="bg-cri-cream border-cri-moss/20 hover:border-cri-cacao/40 flex items-center gap-3 rounded-xl border p-5 transition-colors"
                >
                  <div
                    className="bg-cri-cacao text-cri-text-on-dark flex h-10 w-10 items-center justify-center rounded-full"
                    aria-hidden="true"
                  >
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-cri-forest font-serif font-bold">{village}</p>
                    <p className="text-cri-ink-muted text-xs">Bassin du Mungo</p>
                  </div>
                </div>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-cri-cream py-20">
          <div className="container-cri max-w-2xl text-center">
            <RevealOnScroll variant="zoom-in">
              <h2 className="text-cri-forest mb-4 font-serif text-3xl font-bold md:text-4xl">
                Intéressé par notre cacao ?
              </h2>
              <p className="text-cri-ink-muted mb-8 text-lg">
                Contactez notre équipe commerciale pour un devis, des échantillons ou une visite du
                ranch.
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
