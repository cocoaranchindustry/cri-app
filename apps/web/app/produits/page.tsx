"use client";

import { Drumstick, ArrowRight, Award, Package } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { ProductCard } from "@/components/ui/ProductCard";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";

/**
 * Page /produits — Fiches produits, certifications, commandes
 */

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          image="https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=1920&q=80"
          imageAlt="Fèves de cacao premium triées à la main"
          badge="Produits & services"
          title="Du cacao premium aux provendes brevetées"
          subtitle="Notre gamme complète, traçable et certifiée. Commandes directes producteur ou revendeur."
          viewportHeight
        />

        <section className="bg-cri-parchment py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                Notre gamme
              </p>
              <h2 className="text-cri-forest font-serif text-3xl font-bold md:text-5xl">
                4 produits, 1 modèle circulaire
              </h2>
            </RevealOnScroll>

            <div className="grid gap-6 md:grid-cols-2">
              <ProductCard
                category="cacao"
                title="Fèves Cacao Premium"
                subtitle="Fermentation 7 j · Séchage solaire"
                description="Fèves de cacao camerounais fermentées 7 jours en cascade, séchées au soleil sur claies premium."
                highlights={[
                  "Taux de fermentation ≥ 80 %",
                  "Humidité finale 6,5 %",
                  "Grade A1 (zéro défaut)",
                  "Traçabilité QR Code par lot",
                ]}
                certifications={["EUDR", "OAPI", "CacaoTrace"]}
                ctaLabel="Demander un devis"
                ctaHref="/contact"
              />
              <ProductCard
                category="provende"
                title="CRI-PROVEND CACAO Poulets"
                subtitle="Brevet OAPI n°15012"
                description="Aliment complet pour poulets de chair, formulé à base de cabosses de cacao. -15 % vs marché."
                highlights={[
                  "Énergie métabolisable 3 100 kcal/kg",
                  "Protéines brutes 21 %",
                  "Cycle 0-45 jours optimisé",
                  "Gain moyen quotidien +12 %",
                ]}
                certifications={["OAPI", "ISO 22000"]}
                ctaLabel="Commander"
                ctaHref="/contact"
              />
              <ProductCard
                category="provende"
                title="CRI-PROVEND CACAO Porcs"
                subtitle="Brevet OAPI n°15013"
                description="Aliment complet pour porcs d'engraissement. Validation zootechnique en ferme pilote."
                highlights={[
                  "Énergie métabolisable 3 250 kcal/kg",
                  "Protéines brutes 16 %",
                  "Cycle 0-180 jours",
                  "Indice de conversion 2,6",
                ]}
                certifications={["OAPI", "ISO 22000"]}
                ctaLabel="Commander"
                ctaHref="/contact"
              />
              <ProductCard
                category="biofertilisant"
                title="Biofertilisant CRI-OR"
                subtitle="Compost de fientes"
                description="Biofertilisant 100 % naturel, issu du compostage des fientes de la ferme intégrée."
                highlights={[
                  "NPK 3-2-2 + oligo-éléments",
                  "Certification bio UE",
                  "Sac de 25 ou 50 kg",
                  "Livraison Bassin du Mungo",
                ]}
                certifications={["Bio UE", "ISO 22000"]}
                ctaLabel="Commander"
                ctaHref="/contact"
              />
            </div>
          </div>
        </section>

        <SectionDivider variant="leaf" fillClassName="fill-cri-cream" height={80} />

        <section className="bg-cri-cream py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                Élevage
              </p>
              <h2 className="text-cri-forest font-serif text-3xl font-bold md:text-4xl">
                Viandes de la ferme intégrée
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
              {[
                {
                  icon: Drumstick,
                  name: "Poulets de chair",
                  desc: "1,8-2,2 kg à 45 jours. Alimentés CRI-PROVEND CACAO.",
                },
                {
                  icon: Package,
                  name: "Cuisses & filets",
                  desc: "Découpe à la demande, sous vide, livraison 48h.",
                },
                {
                  icon: Award,
                  name: "Porc frais",
                  desc: "Carcasse entière ou découpe. Race Large White locale.",
                },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.name}
                    className="bg-cri-parchment border-cri-moss/20 hover:border-cri-cacao/40 rounded-2xl border-2 p-6 transition-colors"
                  >
                    <div
                      className="bg-cri-canopy/10 text-cri-canopy mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                      aria-hidden="true"
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-cri-forest mb-2 font-serif text-xl font-bold">{p.name}</h3>
                    <p className="text-cri-ink-muted text-sm leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </StaggerGroup>
          </div>
        </section>

        <section className="bg-cri-forest text-cri-text-on-dark py-20">
          <div className="container-cri max-w-2xl text-center">
            <RevealOnScroll variant="zoom-in">
              <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
                Commander nos produits
              </h2>
              <p className="text-cri-text-on-dark/85 mb-8 text-lg">
                Devis personnalisé sous 24h. Livraison Bassin du Mungo et départements limitrophes.
                Export international sur demande.
              </p>
              <Link
                href="/contact"
                className="bg-cri-gold text-cri-humus hover:bg-cri-gold-light focus:ring-cri-gold focus:ring-offset-cri-forest inline-flex h-14 items-center gap-2 rounded-xl px-8 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
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
