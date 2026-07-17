"use client";

import {
  Drumstick,
  ArrowRight,
  Award,
  Package,
} from "lucide-react";
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

        <section className="py-20 md:py-24 bg-cri-parchment">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
                Notre gamme
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-cri-forest">
                4 produits, 1 modèle circulaire
              </h2>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-6">
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

        <section className="py-20 md:py-24 bg-cri-cream">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
                Élevage
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-cri-forest">
                Viandes de la ferme intégrée
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.1}>
              {[
                { icon: Drumstick, name: "Poulets de chair", desc: "1,8-2,2 kg à 45 jours. Alimentés CRI-PROVEND CACAO." },
                { icon: Package, name: "Cuisses & filets", desc: "Découpe à la demande, sous vide, livraison 48h." },
                { icon: Award, name: "Porc frais", desc: "Carcasse entière ou découpe. Race Large White locale." },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.name}
                    className="p-6 rounded-2xl bg-cri-parchment border-2 border-cri-moss/20 hover:border-cri-cacao/40 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cri-canopy/10 text-cri-canopy flex items-center justify-center mb-4" aria-hidden="true">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-cri-forest mb-2">{p.name}</h3>
                    <p className="text-sm text-cri-ink-muted leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </StaggerGroup>
          </div>
        </section>

        <section className="py-20 bg-cri-forest text-cri-text-on-dark">
          <div className="container-cri text-center max-w-2xl">
            <RevealOnScroll variant="zoom-in">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Commander nos produits
              </h2>
              <p className="text-lg text-cri-text-on-dark/85 mb-8">
                Devis personnalisé sous 24h. Livraison Bassin du Mungo et
                départements limitrophes. Export international sur demande.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-xl bg-cri-gold text-cri-humus font-semibold hover:bg-cri-gold-light transition-colors focus:outline-none focus:ring-2 focus:ring-cri-gold focus:ring-offset-2 focus:ring-offset-cri-forest"
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
