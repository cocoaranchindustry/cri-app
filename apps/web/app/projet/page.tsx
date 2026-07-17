"use client";

import * as React from "react";
import Link from "next/link";
import {
  Target,
  Eye,
  Heart,
  Sprout,
  Recycle,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { GlassCard } from "@/components/ui/GlassCard";
import { KpiCounter } from "@/components/ui/KpiCounter";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";

/**
 * Page /projet — Vision, mission, équipe, histoire
 *
 * Sections :
 * 1. Hero (PageHero dark)
 * 2. Vision / Mission / Valeurs (3 cards glass)
 * 3. Notre histoire (timeline 2010 → 2026)
 * 4. KPIs clés
 * 5. Équipe fondatrice (placeholder)
 * 6. CTA Investisseurs
 */

export default function ProjectPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          image="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1920&q=80"
          imageAlt="Rangées de cacaoyers dans une plantation agroforestière au Cameroun"
          badge="Le projet"
          title={<>L&apos;agropole circulaire<br />du cacao camerounais</>}
          subtitle="Un projet mûrement réfléchi, ancré dans le terroir du Bassin du Mungo, conçu pour transformer l'économie cacaoyère camerounaise en profondeur."
          primaryCta={{ href: "/contact", label: "Nous contacter" }}
          secondaryCta={{ href: "/investisseurs", label: "Espace investisseurs" }}
          viewportHeight
        />

        {/* VISION / MISSION / VALEURS */}
        <section className="py-20 md:py-24 bg-cri-parchment">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
                Notre ADN
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-cri-forest">
                Vision, mission, valeurs
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid md:grid-cols-3 gap-6" staggerDelay={0.12}>
              <PillarCard
                icon={<Eye className="h-7 w-7" />}
                title="Notre vision"
                description="Faire du Cameroun le leader africain du cacao premium zéro déforestation, traçable de la parcelle au conteneur, dans une logique d'économie circulaire exemplaire."
                color="cacao"
              />
              <PillarCard
                icon={<Target className="h-7 w-7" />}
                title="Notre mission"
                description="Construire un agropole intégrée — cacao premium, provenderie brevetée, ferme pilote — au service de 1 200 producteurs et 5 000 familles du Bassin du Mungo."
                color="canopy"
              />
              <PillarCard
                icon={<Heart className="h-7 w-7" />}
                title="Nos valeurs"
                description="Excellence, équité, durabilité. 100 % des sous-produits valorisés. Rémunération producteur > 50 % du prix FOB. Conformité EUDR et OAPI."
                color="gold"
              />
            </StaggerGroup>
          </div>
        </section>

        <SectionDivider variant="wave" fillClassName="fill-cri-cream" height={80} />

        {/* HISTOIRE / TIMELINE */}
        <section className="py-20 md:py-24 bg-cri-cream">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
                Notre histoire
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-cri-forest">
                15 ans d&apos;engagement
              </h2>
              <p className="mt-4 text-cri-ink-muted">
                D&apos;AGRO-PME Fondation à l&apos;agropole Cocoa Ranch &amp; Industry
              </p>
            </RevealOnScroll>

            <div className="relative max-w-3xl mx-auto">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-cri-cacao/30 md:-translate-x-1/2" aria-hidden="true" />

              <ul className="space-y-8 md:space-y-12">
                {[
                  { year: "2010", title: "Création d'AGRO-PME Fondation", desc: "Programme d'appui à l'entrepreneuriat agro-pastoral dans le Moungo." },
                  { year: "2014", title: "Première certification cacao", desc: "1 200 producteurs encadrés sur 6 villages." },
                  { year: "2018", title: "Programme CIMAR-Technopôle", desc: "Lancement de la formation-insertion jeunes et femmes." },
                  { year: "2022", title: "Brevet OAPI CRI-PROVEND CACAO", desc: "Protection de la formulation des provendes à base de cabosses." },
                  { year: "2024", title: "Études d'ingénierie détaillées", desc: "Dimensionnement du ranch et de l'usine de séchage." },
                  { year: "2026", title: "Lancement opérationnel", desc: "Démarrage du ranch et mise en service de l'usine." },
                ].map((item, i) => (
                  <RevealOnScroll
                    key={item.year}
                    variant={i % 2 === 0 ? "slide-left" : "slide-right"}
                  >
                    <li className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 items-center">
                      <div className="absolute left-0 md:left-1/2 top-1 md:-translate-x-1/2 w-8 h-8 rounded-full bg-cri-cacao border-4 border-cri-cream flex items-center justify-center" aria-hidden="true">
                        <Sprout className="h-3.5 w-3.5 text-cri-text-on-dark" />
                      </div>
                      <div className={i % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"}>
                        <p className="text-cri-cacao font-serif font-bold text-2xl">{item.year}</p>
                        <h3 className="font-serif text-lg font-bold text-cri-forest mt-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-cri-ink-muted mt-1">{item.desc}</p>
                      </div>
                    </li>
                  </RevealOnScroll>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <SectionDivider variant="triangle" fillClassName="fill-cri-parchment" height={64} />

        {/* KPIs */}
        <section className="py-20 md:py-24 bg-cri-parchment">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
                En chiffres
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-cri-forest">
                Le projet en chiffres
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
              <KpiCounter
                value={1200}
                label="Producteurs"
                description="6 villages du Bassin du Mungo"
                icon={<Users className="h-5 w-5" />}
                trend="up"
              />
              <KpiCounter
                value={200}
                label="Hectares"
                description="Ranch agroforestier"
                icon={<Sprout className="h-5 w-5" />}
                trend="up"
              />
              <KpiCounter
                value={18000}
                suffix=" t"
                label="Provendes / an"
                description="Brevet OAPI"
                icon={<Recycle className="h-5 w-5" />}
                trend="up"
              />
              <KpiCounter
                value={15}
                suffix=" ans"
                label="D'expérience"
                description="AGRO-PME Fondation"
                icon={<Award className="h-5 w-5" />}
                trend="stable"
              />
            </StaggerGroup>
          </div>
        </section>

        {/* ÉQUIPE FONDATRICE */}
        <section className="py-20 md:py-24 bg-cri-forest text-cri-text-on-dark">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-gold mb-2">
                Équipe
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold">
                Notre équipe fondatrice
              </h2>
              <p className="mt-4 text-cri-text-on-dark/80">
                Des compétences complémentaires au service du projet
              </p>
            </RevealOnScroll>

            <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
              {[
                { initials: "ET", name: "Emmanuel TAKOU", role: "Directeur Général", bio: "20 ans d'agro-industrie, ex-Cargill Cameroun." },
                { initials: "MN", name: "Marie NGUEMA", role: "Directrice Technique", bio: "Ingénieur agronome, spécialiste cacao." },
                { initials: "PA", name: "Paul ATANGANA", role: "Directeur Financier", bio: "Expert KYC et data room investisseur." },
                { initials: "SK", name: "Sylvie KAMGA", role: "Resp. Impact RSE", bio: "Coordination producteurs, formation-insertion." },
              ].map((p) => (
                <div
                  key={p.name}
                  className="p-6 rounded-2xl bg-cri-forest-light/30 backdrop-blur-md border-2 border-cri-gold/20"
                >
                  <div className="w-16 h-16 rounded-full bg-cri-gold text-cri-forest font-serif font-bold text-2xl flex items-center justify-center mb-4">
                    {p.initials}
                  </div>
                  <h3 className="font-serif text-lg font-bold">{p.name}</h3>
                  <p className="text-xs text-cri-gold font-semibold uppercase tracking-wider mt-1">
                    {p.role}
                  </p>
                  <p className="text-sm text-cri-text-on-dark/80 mt-2 leading-relaxed">
                    {p.bio}
                  </p>
                </div>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-24 bg-cri-cream">
          <div className="container-cri text-center max-w-3xl">
            <RevealOnScroll variant="zoom-in">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-cri-forest mb-6">
                Rejoignez l&apos;aventure
              </h2>
              <p className="text-lg text-cri-ink-muted mb-8">
                Investisseurs, partenaires techniques, institutionnels : nous cherchons des alliés
                engagés pour faire grandir ce projet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/investisseurs"
                  className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-cri-cacao text-cri-text-on-dark font-semibold hover:bg-cri-forest transition-colors focus:outline-none focus:ring-2 focus:ring-cri-gold focus:ring-offset-2"
                >
                  Devenir investisseur
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl border-2 border-cri-forest text-cri-forest font-semibold hover:bg-cri-forest hover:text-cri-text-on-dark transition-colors focus:outline-none focus:ring-2 focus:ring-cri-gold"
                >
                  Nous contacter
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

/* Sub-component local pour vision/mission/valeurs */
const PillarCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "cacao" | "canopy" | "gold";
}> = ({ icon, title, description, color }) => {
  const colorMap = {
    cacao: { bg: "bg-cri-cacao/10", text: "text-cri-cacao", border: "border-cri-cacao/20" },
    canopy: { bg: "bg-cri-canopy/10", text: "text-cri-canopy", border: "border-cri-canopy/20" },
    gold: { bg: "bg-cri-gold/15", text: "text-cri-gold-dark", border: "border-cri-gold/30" },
  };
  const c = colorMap[color];
  return (
    <GlassCard variant="default" hover className="h-full p-7">
      <div
        className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center mb-5 ${c.bg} ${c.text} ${c.border}`}
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3 className="font-serif text-2xl font-bold text-cri-forest mb-3">{title}</h3>
      <p className="text-cri-humus leading-relaxed">{description}</p>
    </GlassCard>
  );
};
