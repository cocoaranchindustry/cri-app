"use client";

import {
  Award,
  Calendar,
  Globe2,
  Beaker,
  Shield,
  ArrowRight,
  CheckCircle2,
  Download,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { GlassCard } from "@/components/ui/GlassCard";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";

/**
 * Page /brevet — Détail du brevet OAPI
 */

export default function BrevetPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          badge="Propriété intellectuelle"
          title="Brevet OAPI — CRI-PROVEND CACAO"
          subtitle="Protection internationale d'une innovation agro-industrielle majeure : la transformation des cabosses de cacao en provendes animales."
          image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
          imageAlt="Document de brevet OAPI"
          primaryCta={{ href: "/contact", label: "Demander une licence" }}
          secondaryCta={{ href: "/publications", label: "Publications scientifiques" }}
          viewportHeight
        />

        <section className="bg-cri-parchment py-20">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                Référence
              </p>
              <h2 className="text-cri-forest font-serif text-3xl font-bold md:text-5xl">
                Brevet n° OAPI 15012
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
              {[
                { icon: Award, label: "Office", value: "OAPI" },
                { icon: Calendar, label: "Date de dépôt", value: "15 mars 2022" },
                { icon: Globe2, label: "Zone", value: "17 pays africains" },
                { icon: Shield, label: "Durée", value: "20 ans (2042)" },
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <GlassCard key={b.label} variant="default" className="p-6 text-center">
                    <div
                      className="bg-cri-cacao/10 text-cri-cacao mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full"
                      aria-hidden="true"
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="text-cri-ink-muted mb-1 text-[10px] font-bold uppercase tracking-wider">
                      {b.label}
                    </p>
                    <p className="text-cri-forest font-serif text-lg font-bold">{b.value}</p>
                  </GlassCard>
                );
              })}
            </StaggerGroup>
          </div>
        </section>

        <SectionDivider variant="wave" fillClassName="fill-cri-cream" height={80} />

        <section className="bg-cri-cream py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                Innovation
              </p>
              <h2 className="text-cri-forest font-serif text-3xl font-bold md:text-4xl">
                Description technique
              </h2>
            </RevealOnScroll>

            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
              <GlassCard variant="default" className="p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="bg-cri-cacao/10 text-cri-cacao flex h-12 w-12 items-center justify-center rounded-xl"
                    aria-hidden="true"
                  >
                    <Beaker className="h-6 w-6" />
                  </div>
                  <h3 className="text-cri-forest font-serif text-2xl font-bold">Revendication 1</h3>
                </div>
                <p className="text-cri-humus mb-4 leading-relaxed">
                  Procédé de fabrication d&apos;aliment pour animaux d&apos;élevage, caractérisé en
                  ce qu&apos;il comprend les étapes suivantes :
                </p>
                <ul className="space-y-2">
                  {[
                    "Broyage fin des cabosses de cacao (≤ 2 mm)",
                    "Séchage solaire ou thermique (humidité ≤ 10 %)",
                    "Mélange avec sources protéiques locales (tourteau de soja, palme)",
                    "Granulation à froid (≤ 70 °C)",
                    "Conditionnement hermétique",
                  ].map((s) => (
                    <li key={s} className="text-cri-humus flex items-start gap-2 text-sm">
                      <CheckCircle2
                        className="text-cri-canopy mt-0.5 h-4 w-4 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard variant="default" className="p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="bg-cri-canopy/10 text-cri-canopy flex h-12 w-12 items-center justify-center rounded-xl"
                    aria-hidden="true"
                  >
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-cri-forest font-serif text-2xl font-bold">Résultats</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Énergie métabolisable : 3 100 kcal/kg",
                    "Protéines brutes : 21 % (poulets), 16 % (porcs)",
                    "Coût de production : -15 % vs provende classique",
                    "Indice de conversion : -8 % chez le poulet",
                    "Valorisation de 100 % des cabosses",
                  ].map((s) => (
                    <li key={s} className="text-cri-humus flex items-start gap-2 text-sm">
                      <CheckCircle2
                        className="text-cri-cacao mt-0.5 h-4 w-4 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          </div>
        </section>

        <section className="bg-cri-forest text-cri-text-on-dark py-20 md:py-24">
          <div className="container-cri max-w-2xl text-center">
            <RevealOnScroll variant="zoom-in">
              <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
                Licence ou transfert
              </h2>
              <p className="text-cri-text-on-dark/85 mb-8 text-lg">
                Nous proposons des licences de fabrication sous royalties, ou un transfert de
                technologie clés en main (formation, formulation, mise en service de l&apos;unité).
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="bg-cri-gold text-cri-humus hover:bg-cri-gold-light focus-visible:ring-cri-gold focus-visible:ring-offset-cri-forest inline-flex h-14 items-center justify-center gap-2 rounded-xl px-8 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                >
                  Demander une licence
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  className="border-cri-text-on-dark/40 text-cri-text-on-dark hover:bg-cri-text-on-dark/10 focus-visible:ring-cri-gold focus-visible:ring-offset-cri-forest inline-flex h-14 items-center justify-center gap-2 rounded-xl border-2 px-8 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Brochure technique (PDF)
                </button>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
