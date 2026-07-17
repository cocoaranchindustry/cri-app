"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Leaf,
  Wheat,
  Drumstick,
  Users,
  Trees,
  Coins,
  ShieldCheck,
  Recycle,
  Heart,
  Sparkles,
  BarChart3,
  Award,
  FileCheck,
  Sprout,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HeroSection } from "@/components/ui/HeroSection";
import { KpiCounter } from "@/components/ui/KpiCounter";
import { CircularEconomy } from "@/components/ui/CircularEconomy";
import { Timeline2026 } from "@/components/ui/Timeline2026";
import { TestimonialSlider } from "@/components/ui/TestimonialSlider";
import { MapLeaflet } from "@/components/ui/MapLeaflet";
import { RevealOnScroll, StaggerGroup, FloatingOrb } from "@/components/ui/RevealOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { PillarCard } from "@/components/ui/PillarCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/**
 * Page d'accueil — Cocoa Ranch & Industry
 *
 * Structure (Brandbook CRI v6) :
 * 1. Hero immersif (gradient + parallaxe)
 * 2. Bande partenaires
 * 3. KPIs animés (4 cards glassmorphism)
 * 4. 3 piliers (cacao / provende / ferme)
 * 5. Économie circulaire (SVG interactif)
 * 6. Impact RSE (3 colonnes)
 * 7. Témoignages (carousel autoplay)
 * 8. Timeline 2026-2030
 * 9. Carte Bassin du Mungo (Leaflet)
 * 10. CTA Investisseurs (gradient vert→cacao)
 * 11. SectionDivider final
 */

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
      {/* =================== 1. HERO =================== */}
      <HeroSection
        variant="full"
        height="hero"
        badge={{
          icon: <Sparkles className="h-3.5 w-3.5" />,
          label: t("hero.badge"),
        }}
        tagline={t("hero.tagline")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        primaryCta={{
          label: t("hero.ctaPrimary"),
          href: "/projet",
          icon: <ArrowRight className="h-4 w-4" />,
        }}
        secondaryCta={{
          label: t("hero.ctaSecondary"),
          href: "/investisseurs",
        }}
        align="center"
        stats={[
          { value: t("hero.stats.producers.value"), label: t("hero.stats.producers.label") },
          { value: t("hero.stats.hectares.value"), label: t("hero.stats.hectares.label") },
          {
            value: t("hero.stats.circles.value"),
            suffix: t("hero.stats.circles.suffix"),
            label: t("hero.stats.circles.label"),
          },
        ]}
        trustBadges={[
          { label: t("hero.trust.eudr"), icon: <ShieldCheck /> },
          { label: t("hero.trust.oapi"), icon: <Award /> },
          { label: t("hero.trust.cacaotrace"), icon: <FileCheck /> },
          { label: t("hero.trust.agroecology"), icon: <Sprout /> },
        ]}
        floatingOrbs={[
          { color: "gold", size: "w-96 h-96", position: "top-1/4 -left-20" },
          { color: "canopy", size: "w-80 h-80", position: "bottom-1/4 -right-20", delay: 1 },
        ]}
      />

      {/* =================== 2. PARTNERS =================== */}
      <section
        aria-labelledby="partners-title"
        className="py-12 bg-cri-parchment border-y border-cri-moss/15"
      >
        <div className="container-cri">
          <RevealOnScroll variant="fade" className="text-center mb-8">
            <p
              id="partners-title"
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2"
            >
              {t("partners.subtitle")}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-cri-forest">
              {t("partners.title")}
            </h2>
          </RevealOnScroll>

          <StaggerGroup
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center"
            staggerDelay={0.06}
          >
            {[
              "Puratos Cacao-Trace",
              "Barry Callebaut",
              "Uncommon Cacao",
              "OLAM-AGRI",
              "De Heus",
              "CADYST Group",
              "PROPARCO",
              "SANERGY",
            ].map((partner) => (
              <div
                key={partner}
                className="flex items-center justify-center h-16 px-4 rounded-lg bg-cri-cream/40 border border-cri-moss/10 transition-all hover:border-cri-gold/40 hover:bg-cri-parchment hover:shadow-soft"
              >
                <span className="font-serif font-bold text-cri-canopy text-base tracking-tight text-center leading-tight">
                  {partner}
                </span>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* =================== 3. KPIs =================== */}
      <section
        aria-labelledby="kpis-title"
        className="py-20 md:py-24 bg-cri-cream relative overflow-hidden"
      >
        <FloatingOrb
          color="canopy"
          size="w-96 h-96"
          className="absolute -top-20 -right-20"
        />
        <div className="container-cri relative">
          <RevealOnScroll variant="slide-up" className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
              {t("impact.subtitle")}
            </p>
            <h2
              id="kpis-title"
              className="font-serif text-3xl md:text-4xl font-bold text-cri-forest"
            >
              {t("impact.title")}
            </h2>
          </RevealOnScroll>

          <StaggerGroup
            className="grid grid-cols-2 lg:grid-cols-4 gap-5"
            staggerDelay={0.1}
          >
            <KpiCounter
              value={parseInt(t("kpis.producers.value"))}
              label={t("kpis.producers.label")}
              description={t("kpis.producers.description")}
              icon={<Users className="h-5 w-5" />}
              trend="up"
            />
            <KpiCounter
              value={parseInt(t("kpis.hectares.value"))}
              label={t("kpis.hectares.label")}
              description={t("kpis.hectares.description")}
              icon={<Trees className="h-5 w-5" />}
              trend="up"
            />
            <KpiCounter
              value={parseInt(t("kpis.tons.value"))}
              suffix={t("kpis.tons.suffix")}
              label={t("kpis.tons.label")}
              description={t("kpis.tons.description")}
              icon={<Wheat className="h-5 w-5" />}
              trend="up"
            />
            <KpiCounter
              value={parseFloat(t("kpis.revenue.value"))}
              decimals={1}
              suffix={t("kpis.revenue.suffix")}
              label={t("kpis.revenue.label")}
              description={t("kpis.revenue.description")}
              icon={<Coins className="h-5 w-5" />}
              trend="up"
            />
          </StaggerGroup>
        </div>
      </section>

      <SectionDivider
        variant="triangle"
        fillClassName="fill-cri-parchment"
        height={64}
      />

      {/* =================== 4. 3 PILIERS =================== */}
      <section
        aria-labelledby="poles-title"
        className="py-20 md:py-24 bg-cri-parchment relative"
      >
        <div className="container-cri">
          <RevealOnScroll variant="slide-up" className="text-center mb-14 max-w-3xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
              {t("poles.subtitle")}
            </p>
            <h2
              id="poles-title"
              className="font-serif text-3xl md:text-5xl font-bold text-cri-forest leading-tight"
            >
              {t("poles.title")}
            </h2>
            <p className="mt-4 text-cri-ink-muted leading-relaxed">
              {t("poles.description")}
            </p>
          </RevealOnScroll>

          <StaggerGroup
            className="grid lg:grid-cols-3 gap-6"
            staggerDelay={0.15}
          >
            <PillarCard
              index={1}
              badge={t("poles.cacao.label")}
              title={t("poles.cacao.title")}
              description={t("poles.cacao.description")}
              bullets={t.raw("poles.cacao.features") as string[]}
              cta={{ href: "/activites/cacao", label: t("poles.cacao.cta") }}
              icon={<Leaf className="h-6 w-6" />}
              tone="cacao"
              image="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1200&q=80"
              imageAlt="Cabosses de cacao mûres sur cacaoyer"
            />
            <PillarCard
              index={2}
              badge={t("poles.provende.label")}
              title={t("poles.provende.title")}
              description={t("poles.provende.description")}
              bullets={t.raw("poles.provende.features") as string[]}
              cta={{ href: "/activites/provendes", label: t("poles.provende.cta") }}
              icon={<Wheat className="h-6 w-6" />}
              tone="provende"
              image="https://images.unsplash.com/photo-1620004085588-a982825a5327?w=1200&q=80"
              imageAlt="Provendes animales dans une ferme"
            />
            <PillarCard
              index={3}
              badge={t("poles.elevage.label")}
              title={t("poles.elevage.title")}
              description={t("poles.elevage.description")}
              bullets={t.raw("poles.elevage.features") as string[]}
              cta={{ href: "/activites/elevage", label: t("poles.elevage.cta") }}
              icon={<Drumstick className="h-6 w-6" />}
              tone="ferme"
              image="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1200&q=80"
              imageAlt="Poulets de chair en élevage"
            />
          </StaggerGroup>
        </div>
      </section>

      <SectionDivider
        variant="wave"
        fillClassName="fill-cri-cream"
        height={80}
        flip="flip-y"
      />

      {/* =================== 5. ÉCONOMIE CIRCULAIRE =================== */}
      <section
        aria-labelledby="circular-title"
        className="py-20 md:py-28 bg-cri-cream relative overflow-hidden"
      >
        <FloatingOrb
          color="gold"
          size="w-[500px] h-[500px]"
          className="absolute top-1/2 -translate-y-1/2 -left-40"
        />
        <div className="container-cri relative">
          <RevealOnScroll variant="slide-up" className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
              {t("circular.subtitle")}
            </p>
            <h2
              id="circular-title"
              className="font-serif text-3xl md:text-5xl font-bold text-cri-forest leading-tight"
            >
              {t("circular.title")}
            </h2>
            <p className="mt-4 text-cri-ink-muted leading-relaxed">
              {t("circular.description")}
            </p>
          </RevealOnScroll>

          <CircularEconomy />
        </div>
      </section>

      <SectionDivider
        variant="leaf"
        fillClassName="fill-cri-forest"
        height={80}
      />

      {/* =================== 6. IMPACT RSE =================== */}
      <section
        aria-labelledby="impact-title"
        className="py-20 md:py-24 bg-cri-forest text-cri-text-on-dark relative overflow-hidden"
      >
        {/* Pattern décoratif */}
        <div
          className="absolute inset-0 opacity-[0.04] bg-cri-pattern-feve pointer-events-none"
          aria-hidden="true"
        />
        <div className="container-cri relative">
          <RevealOnScroll variant="slide-up" className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-gold mb-2">
              Impact RSE
            </p>
            <h2
              id="impact-title"
              className="font-serif text-3xl md:text-5xl font-bold leading-tight"
            >
              {t("impact.title")}
            </h2>
            <p className="mt-4 text-cri-text-on-dark/80 leading-relaxed">
              {t("impact.description")}
            </p>
          </RevealOnScroll>

          <StaggerGroup
            className="grid md:grid-cols-3 gap-5"
            staggerDelay={0.12}
          >
            <ImpactCard
              icon={<ShieldCheck className="h-7 w-7" />}
              title={t("impact.card1.title")}
              text={t("impact.card1.text")}
            />
            <ImpactCard
              icon={<Recycle className="h-7 w-7" />}
              title={t("impact.card2.title")}
              text={t("impact.card2.text")}
            />
            <ImpactCard
              icon={<Heart className="h-7 w-7" />}
              title={t("impact.card3.title")}
              text={t("impact.card3.text")}
            />
          </StaggerGroup>

          <RevealOnScroll variant="slide-up" className="text-center mt-10">
            <Link
              href="/impact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cri-gold text-cri-humus font-semibold text-sm hover:bg-cri-gold-light transition-colors focus:outline-none focus:ring-2 focus:ring-cri-gold focus:ring-offset-2 focus:ring-offset-cri-forest"
            >
              {t("impact.cta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* =================== 7. TÉMOIGNAGES =================== */}
      <section
        aria-labelledby="testimonials-title"
        className="py-20 md:py-24 bg-cri-parchment"
      >
        <div className="container-cri">
          <RevealOnScroll variant="slide-up" className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
              {t("testimonials.subtitle")}
            </p>
            <h2
              id="testimonials-title"
              className="font-serif text-3xl md:text-5xl font-bold text-cri-forest"
            >
              {t("testimonials.title")}
            </h2>
          </RevealOnScroll>

          <TestimonialSlider />
        </div>
      </section>

      <SectionDivider
        variant="wave"
        fillClassName="fill-cri-cream"
        height={80}
      />

      {/* =================== 8. TIMELINE 2026-2030 =================== */}
      <section
        aria-labelledby="timeline-title"
        className="py-20 md:py-24 bg-cri-cream"
      >
        <div className="container-cri">
          <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
              {t("timeline.subtitle")}
            </p>
            <h2
              id="timeline-title"
              className="font-serif text-3xl md:text-5xl font-bold text-cri-forest"
            >
              {t("timeline.title")}
            </h2>
          </RevealOnScroll>

          <Timeline2026 />
        </div>
      </section>

      {/* =================== 9. CARTE BASSIN DU MUNGO =================== */}
      <section
        aria-labelledby="map-title"
        className="py-20 md:py-24 bg-cri-parchment"
      >
        <div className="container-cri">
          <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
              {t("map.subtitle")}
            </p>
            <h2
              id="map-title"
              className="font-serif text-3xl md:text-5xl font-bold text-cri-forest"
            >
              {t("map.title")}
            </h2>
            <p className="mt-4 text-cri-ink-muted leading-relaxed">
              {t("map.description")}
            </p>
          </RevealOnScroll>

          <MapLeaflet height={500} />
        </div>
      </section>

      <SectionDivider
        variant="curve"
        fillClassName="fill-cri-forest"
        height={100}
      />

      {/* =================== 10. CTA INVESTISSEURS =================== */}
      <section
        aria-labelledby="investors-title"
        className="py-24 md:py-32 bg-cri-forest text-cri-text-on-dark relative overflow-hidden"
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-cri-forest via-cri-forest to-cri-cacao/30"
          aria-hidden="true"
        />
        <FloatingOrb
          color="gold"
          size="w-[600px] h-[600px]"
          className="absolute -top-40 -right-40"
        />
        <FloatingOrb
          color="cacao"
          size="w-96 h-96"
          className="absolute -bottom-32 -left-20"
          delay={2}
        />

        <div className="container-cri relative max-w-4xl">
          <RevealOnScroll variant="zoom-in" className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cri-gold/15 border-2 border-cri-gold/40 mb-6">
              <BarChart3 className="h-8 w-8 text-cri-gold" aria-hidden="true" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-gold mb-3">
              {t("investors.subtitle")}
            </p>
            <h2
              id="investors-title"
              className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              {t("investors.title")}
            </h2>
            <p className="text-lg text-cri-text-on-dark/85 max-w-2xl mx-auto leading-relaxed mb-10">
              {t("investors.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/investisseurs"
                className={cn(
                  "inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl",
                  "bg-cri-gold text-cri-humus font-semibold text-base",
                  "hover:bg-cri-gold-light transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-cri-gold focus:ring-offset-2 focus:ring-offset-cri-forest",
                  "shadow-gold"
                )}
              >
                {t("investors.cta")}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl",
                  "bg-cri-forest-light/30 backdrop-blur-md border-2 border-cri-text-on-dark/30",
                  "text-cri-text-on-dark font-semibold text-base",
                  "hover:bg-cri-forest-light/50 hover:border-cri-text-on-dark/50 transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-cri-gold"
                )}
              >
                {t("investors.contact")}
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}

/* ============================================================
   Sous-composant : ImpactCard (réutilisé dans la section RSE)
   ============================================================ */
const ImpactCard: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({
  icon,
  title,
  text,
}) => {
  return (
    <div
      className={cn(
        "p-7 rounded-2xl",
        "bg-cri-forest-light/30 backdrop-blur-md border-2 border-cri-gold/20",
        "transition-all duration-300 hover:border-cri-gold/50 hover:-translate-y-1"
      )}
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-cri-gold/15 text-cri-gold mb-5">
        {icon}
      </div>
      <h3 className="font-serif text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-cri-text-on-dark/80 leading-relaxed">{text}</p>
    </div>
  );
};
