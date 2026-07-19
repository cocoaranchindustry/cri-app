"use client";

import * as React from "react";
import { Link } from "@/i18n/navigation";
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
          className="bg-cri-parchment border-cri-moss/15 border-y py-12"
        >
          <div className="container-cri">
            <RevealOnScroll variant="fade" className="mb-8 text-center">
              <p
                id="partners-title"
                className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]"
              >
                {t("partners.subtitle")}
              </p>
              <h2 className="text-cri-forest font-serif text-2xl font-bold md:text-3xl">
                {t("partners.title")}
              </h2>
            </RevealOnScroll>

            <StaggerGroup
              className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-4"
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
                  className="bg-cri-cream/40 border-cri-moss/10 hover:border-cri-gold/40 hover:bg-cri-parchment hover:shadow-soft flex h-16 items-center justify-center rounded-lg border px-4 transition-all"
                >
                  <span className="text-cri-canopy text-center font-serif text-base font-bold leading-tight tracking-tight">
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
          className="bg-cri-cream relative overflow-hidden py-20 md:py-24"
        >
          <FloatingOrb color="canopy" size="w-96 h-96" className="absolute -right-20 -top-20" />
          <div className="container-cri relative">
            <RevealOnScroll variant="slide-up" className="mb-12 text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                {t("impact.subtitle")}
              </p>
              <h2
                id="kpis-title"
                className="text-cri-forest font-serif text-3xl font-bold md:text-4xl"
              >
                {t("impact.title")}
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid grid-cols-2 gap-5 lg:grid-cols-4" staggerDelay={0.1}>
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

        <SectionDivider variant="triangle" fillClassName="fill-cri-parchment" height={64} />

        {/* =================== 4. 3 PILIERS =================== */}
        <section aria-labelledby="poles-title" className="bg-cri-parchment relative py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-14 max-w-3xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                {t("poles.subtitle")}
              </p>
              <h2
                id="poles-title"
                className="text-cri-forest font-serif text-3xl font-bold leading-tight md:text-5xl"
              >
                {t("poles.title")}
              </h2>
              <p className="text-cri-ink-muted mt-4 leading-relaxed">{t("poles.description")}</p>
            </RevealOnScroll>

            <StaggerGroup className="grid gap-6 lg:grid-cols-3" staggerDelay={0.15}>
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

        <SectionDivider variant="wave" fillClassName="fill-cri-cream" height={80} flip="flip-y" />

        {/* =================== 5. ÉCONOMIE CIRCULAIRE =================== */}
        <section
          aria-labelledby="circular-title"
          className="bg-cri-cream relative overflow-hidden py-20 md:py-28"
        >
          <FloatingOrb
            color="gold"
            size="w-[500px] h-[500px]"
            className="absolute -left-40 top-1/2 -translate-y-1/2"
          />
          <div className="container-cri relative">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-14 max-w-2xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                {t("circular.subtitle")}
              </p>
              <h2
                id="circular-title"
                className="text-cri-forest font-serif text-3xl font-bold leading-tight md:text-5xl"
              >
                {t("circular.title")}
              </h2>
              <p className="text-cri-ink-muted mt-4 leading-relaxed">{t("circular.description")}</p>
            </RevealOnScroll>

            <CircularEconomy />
          </div>
        </section>

        <SectionDivider variant="leaf" fillClassName="fill-cri-forest" height={80} />

        {/* =================== 6. IMPACT RSE =================== */}
        <section
          aria-labelledby="impact-title"
          className="bg-cri-forest text-cri-text-on-dark relative overflow-hidden py-20 md:py-24"
        >
          {/* Pattern décoratif */}
          <div
            className="bg-cri-pattern-feve pointer-events-none absolute inset-0 opacity-[0.04]"
            aria-hidden="true"
          />
          <div className="container-cri relative">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-14 max-w-2xl text-center">
              <p className="text-cri-gold mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                Impact RSE
              </p>
              <h2
                id="impact-title"
                className="font-serif text-3xl font-bold leading-tight md:text-5xl"
              >
                {t("impact.title")}
              </h2>
              <p className="text-cri-text-on-dark/80 mt-4 leading-relaxed">
                {t("impact.description")}
              </p>
            </RevealOnScroll>

            <StaggerGroup className="grid gap-5 md:grid-cols-3" staggerDelay={0.12}>
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

            <RevealOnScroll variant="slide-up" className="mt-10 text-center">
              <Link
                href="/impact"
                className="bg-cri-gold text-cri-humus hover:bg-cri-gold-light focus:ring-cri-gold focus:ring-offset-cri-forest inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                {t("impact.cta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </RevealOnScroll>
          </div>
        </section>

        {/* =================== 7. TÉMOIGNAGES =================== */}
        <section aria-labelledby="testimonials-title" className="bg-cri-parchment py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mb-12 text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                {t("testimonials.subtitle")}
              </p>
              <h2
                id="testimonials-title"
                className="text-cri-forest font-serif text-3xl font-bold md:text-5xl"
              >
                {t("testimonials.title")}
              </h2>
            </RevealOnScroll>

            <TestimonialSlider />
          </div>
        </section>

        <SectionDivider variant="wave" fillClassName="fill-cri-cream" height={80} />

        {/* =================== 8. TIMELINE 2026-2030 =================== */}
        <section aria-labelledby="timeline-title" className="bg-cri-cream py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                {t("timeline.subtitle")}
              </p>
              <h2
                id="timeline-title"
                className="text-cri-forest font-serif text-3xl font-bold md:text-5xl"
              >
                {t("timeline.title")}
              </h2>
            </RevealOnScroll>

            <Timeline2026 />
          </div>
        </section>

        {/* =================== 9. CARTE BASSIN DU MUNGO =================== */}
        <section aria-labelledby="map-title" className="bg-cri-parchment py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                {t("map.subtitle")}
              </p>
              <h2
                id="map-title"
                className="text-cri-forest font-serif text-3xl font-bold md:text-5xl"
              >
                {t("map.title")}
              </h2>
              <p className="text-cri-ink-muted mt-4 leading-relaxed">{t("map.description")}</p>
            </RevealOnScroll>

            <MapLeaflet height={500} />
          </div>
        </section>

        <SectionDivider variant="curve" fillClassName="fill-cri-forest" height={100} />

        {/* =================== 10. CTA INVESTISSEURS =================== */}
        <section
          aria-labelledby="investors-title"
          className="bg-cri-forest text-cri-text-on-dark relative overflow-hidden py-24 md:py-32"
        >
          {/* Gradient overlay */}
          <div
            className="from-cri-forest via-cri-forest to-cri-cacao/30 absolute inset-0 bg-gradient-to-br"
            aria-hidden="true"
          />
          <FloatingOrb
            color="gold"
            size="w-[600px] h-[600px]"
            className="absolute -right-40 -top-40"
          />
          <FloatingOrb
            color="cacao"
            size="w-96 h-96"
            className="absolute -bottom-32 -left-20"
            delay={2}
          />

          <div className="container-cri relative max-w-4xl">
            <RevealOnScroll variant="zoom-in" className="text-center">
              <div className="bg-cri-gold/15 border-cri-gold/40 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border-2">
                <BarChart3 className="text-cri-gold h-8 w-8" aria-hidden="true" />
              </div>
              <p className="text-cri-gold mb-3 text-[10px] font-bold uppercase tracking-[0.3em]">
                {t("investors.subtitle")}
              </p>
              <h2
                id="investors-title"
                className="mb-6 font-serif text-3xl font-bold leading-tight md:text-5xl lg:text-6xl"
              >
                {t("investors.title")}
              </h2>
              <p className="text-cri-text-on-dark/85 mx-auto mb-10 max-w-2xl text-lg leading-relaxed">
                {t("investors.description")}
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/investisseurs"
                  className={cn(
                    "inline-flex h-14 items-center justify-center gap-2 rounded-xl px-8",
                    "bg-cri-gold text-cri-humus text-base font-semibold",
                    "hover:bg-cri-gold-light transition-all",
                    "focus:ring-cri-gold focus:ring-offset-cri-forest focus:outline-none focus:ring-2 focus:ring-offset-2",
                    "shadow-gold"
                  )}
                >
                  {t("investors.cta")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex h-14 items-center justify-center gap-2 rounded-xl px-8",
                    "bg-cri-forest-light/30 border-cri-text-on-dark/30 border-2 backdrop-blur-md",
                    "text-cri-text-on-dark text-base font-semibold",
                    "hover:bg-cri-forest-light/50 hover:border-cri-text-on-dark/50 transition-all",
                    "focus:ring-cri-gold focus:outline-none focus:ring-2"
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
        "rounded-2xl p-7",
        "bg-cri-forest-light/30 border-cri-gold/20 border-2 backdrop-blur-md",
        "hover:border-cri-gold/50 transition-all duration-300 hover:-translate-y-1"
      )}
    >
      <div className="bg-cri-gold/15 text-cri-gold mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl">
        {icon}
      </div>
      <h3 className="mb-2 font-serif text-xl font-bold">{title}</h3>
      <p className="text-cri-text-on-dark/80 text-sm leading-relaxed">{text}</p>
    </div>
  );
};
