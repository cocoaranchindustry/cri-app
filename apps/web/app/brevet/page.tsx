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

        <section className="py-20 bg-cri-parchment">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
                Référence
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-cri-forest">
                Brevet n° OAPI 15012
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
              {[
                { icon: Award, label: "Office", value: "OAPI" },
                { icon: Calendar, label: "Date de dépôt", value: "15 mars 2022" },
                { icon: Globe2, label: "Zone", value: "17 pays africains" },
                { icon: Shield, label: "Durée", value: "20 ans (2042)" },
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <GlassCard key={b.label} variant="default" className="text-center p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cri-cacao/10 text-cri-cacao mb-3" aria-hidden="true">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-cri-ink-muted mb-1">
                      {b.label}
                    </p>
                    <p className="font-serif text-lg font-bold text-cri-forest">{b.value}</p>
                  </GlassCard>
                );
              })}
            </StaggerGroup>
          </div>
        </section>

        <SectionDivider variant="wave" fillClassName="fill-cri-cream" height={80} />

        <section className="py-20 md:py-24 bg-cri-cream">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
                Innovation
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-cri-forest">
                Description technique
              </h2>
            </RevealOnScroll>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <GlassCard variant="default" className="p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-cri-cacao/10 text-cri-cacao flex items-center justify-center" aria-hidden="true">
                    <Beaker className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-cri-forest">Revendication 1</h3>
                </div>
                <p className="text-cri-humus leading-relaxed mb-4">
                  Procédé de fabrication d&apos;aliment pour animaux d&apos;élevage,
                  caractérisé en ce qu&apos;il comprend les étapes suivantes :
                </p>
                <ul className="space-y-2">
                  {[
                    "Broyage fin des cabosses de cacao (≤ 2 mm)",
                    "Séchage solaire ou thermique (humidité ≤ 10 %)",
                    "Mélange avec sources protéiques locales (tourteau de soja, palme)",
                    "Granulation à froid (≤ 70 °C)",
                    "Conditionnement hermétique",
                  ].map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-cri-humus">
                      <CheckCircle2 className="h-4 w-4 text-cri-canopy flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard variant="default" className="p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-cri-canopy/10 text-cri-canopy flex items-center justify-center" aria-hidden="true">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-cri-forest">Résultats</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Énergie métabolisable : 3 100 kcal/kg",
                    "Protéines brutes : 21 % (poulets), 16 % (porcs)",
                    "Coût de production : -15 % vs provende classique",
                    "Indice de conversion : -8 % chez le poulet",
                    "Valorisation de 100 % des cabosses",
                  ].map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-cri-humus">
                      <CheckCircle2 className="h-4 w-4 text-cri-cacao flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-cri-forest text-cri-text-on-dark">
          <div className="container-cri text-center max-w-2xl">
            <RevealOnScroll variant="zoom-in">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Licence ou transfert
              </h2>
              <p className="text-lg text-cri-text-on-dark/85 mb-8">
                Nous proposons des licences de fabrication sous royalties, ou
                un transfert de technologie clés en main (formation, formulation,
                mise en service de l&apos;unité).
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-cri-gold text-cri-humus font-semibold hover:bg-cri-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cri-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cri-forest"
                >
                  Demander une licence
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl border-2 border-cri-text-on-dark/40 text-cri-text-on-dark font-semibold hover:bg-cri-text-on-dark/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cri-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cri-forest"
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
