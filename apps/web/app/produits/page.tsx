import Link from "next/link";
import {
  ArrowRight,
  Sprout,
  Factory,
  Wheat,
  ShoppingBag,
  Award,
  FileText,
  Download,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { HeroCabosse, FactoryBelt, SproutLeaf } from "@/components/ui/Illustrations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos produits — Cacao, provendes, biofertilisants",
  description:
    "Catalogue produits Cocoa Ranch & Industry : fèves de cacao premium, provendes animales CRI-PROVEND, biofertilisants compostés. Disponibles FOB Douala ou sur le marché local.",
  keywords: [
    "cacao FOB Douala",
    "provendes Cameroun",
    "biofertilisants",
    "catalogue produits cacao",
  ],
  openGraph: {
    title: "Nos produits — Cocoa Ranch & Industry",
    description:
      "Cacao premium, provendes brevetées OAPI, biofertilisants circulaires : notre catalogue complet.",
    type: "website",
  },
};

/**
 * Page /produits — Catalogue produits
 * Brandbook CRI v5 : dominante verte, or cacao, parchemin.
 *
 * Sections :
 * 1. Hero
 * 2. Catalogue par catégorie
 * 3. CTA
 */

const CATEGORIES = [
  {
    title: "Cacao Premium",
    icon: Sprout,
    color: "cri-forest",
    description: "Fèves fermentées et séchées, prêtes à l'export ou à la torréfaction artisanale.",
    products: [
      {
        name: "Fèves Forastero Premium",
        ref: "CRI-CF-001",
        spec: "Fermentation 5-7 j, séchage 7-10 j, humidité < 6,5 %",
        packaging: "Sacs jute 60-65 kg / big-bags 1 t",
        moq: "10 tonnes",
      },
      {
        name: "Fèves Trinitario Fin",
        ref: "CRI-CT-002",
        spec: "Sélection parcellaire, fermentation lente 7 j",
        packaging: "Sacs jute 60-65 kg / big-bags 1 t",
        moq: "5 tonnes",
      },
      {
        name: "Fèves Criollo Local",
        ref: "CRI-CC-003",
        spec: "Sélection premium, micro-lots",
        packaging: "Sacs jute 30 kg / caisses bois 25 kg",
        moq: "1 tonne",
      },
      {
        name: "Cacao torréfié (bean-to-bar)",
        ref: "CRI-CTR-004",
        spec: "Torréfaction profil doux, prêt broyage",
        packaging: "Sacs alu 25 kg sous vide",
        moq: "500 kg",
      },
    ],
  },
  {
    title: "Provendes animales",
    icon: Factory,
    color: "cri-cacao",
    description: "Provendes brevetées OAPI à base de cabosses de cacao, pour élevages intensifs.",
    products: [
      {
        name: "CRI-PROVEND CACAO Poulet démarrage",
        ref: "CRI-PP-D",
        spec: "Protéines 22 %, énergie 2 900 kcal/kg, anticoccidiens naturels",
        packaging: "Sac 50 kg / big-bag 1 t",
        moq: "1 tonne",
      },
      {
        name: "CRI-PROVEND CACAO Poulet croissance/finition",
        ref: "CRI-PP-CF",
        spec: "Protéines 20 %, énergie 3 000 kcal/kg",
        packaging: "Sac 50 kg / big-bag 1 t",
        moq: "1 tonne",
      },
      {
        name: "CRI-PROVEND CACAO Porc engraissement",
        ref: "CRI-POR-EN",
        spec: "Protéines 17 %, énergie 3 100 kcal/kg",
        packaging: "Sac 50 kg / big-bag 1 t",
        moq: "1 tonne",
      },
      {
        name: "CRI-PROVEND CACAO Bio+",
        ref: "CRI-PB-BIO",
        spec: "100 % bio, sans OGM, certification en cours",
        packaging: "Sac 25 kg / big-bag 1 t",
        moq: "500 kg",
      },
    ],
  },
  {
    title: "Biofertilisants",
    icon: Wheat,
    color: "cri-canopy",
    description: "Compost et lombricompost à partir des fientes de la ferme intégrée.",
    products: [
      {
        name: "Compost CRI (vrac)",
        ref: "CRI-BF-COM",
        spec: "Compost mûr 6 mois, NPK 2-1-2, MO 35 %",
        packaging: "Vrac (camion 5-10 t)",
        moq: "5 tonnes",
      },
      {
        name: "Lombricompost CRI (sac)",
        ref: "CRI-BF-LOM",
        spec: "Lombricompost premium, NPK 3-2-3, MO 50 %",
        packaging: "Sac 25 kg / big-bag 500 kg",
        moq: "500 kg",
      },
    ],
  },
];

export default function ProduitsPage() {
  return (
    <>
      <Navbar />

      <main id="main">
        {/* ─────── HERO ─────── */}
        <PageHero
          badge="Catalogue produits"
          title="Trois familles, une circularité"
          subtitle={
            <>
              Cacao premium, provendes brevetées OAPI, biofertilisants compostés : tous nos produits
              partagent la même exigence de qualité, traçabilité et circularité.
            </>
          }
        />

        {/* ─────── BANDE IMMERSIVE : 3 PRODUITS EN IMAGES ─────── */}
        <section className="grid h-48 grid-cols-1 md:h-64 md:grid-cols-3">
          <div className="relative overflow-hidden">
            <HeroCabosse className="absolute inset-0 h-full w-full object-cover" />
            <div className="from-cri-forest-dark/80 absolute inset-0 bg-gradient-to-t to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-cri-gold text-label font-bold uppercase tracking-wider">Cacao</p>
              <p className="font-serif text-lg text-white">Fèves premium</p>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <FactoryBelt className="absolute inset-0 h-full w-full object-cover" />
            <div className="from-cri-forest-dark/80 absolute inset-0 bg-gradient-to-t to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-cri-gold text-label font-bold uppercase tracking-wider">
                Provendes
              </p>
              <p className="font-serif text-lg text-white">CRI-PROVEND CACAO</p>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <SproutLeaf className="absolute inset-0 h-full w-full object-cover" />
            <div className="from-cri-forest-dark/80 absolute inset-0 bg-gradient-to-t to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-cri-gold text-label font-bold uppercase tracking-wider">
                Biofertilisants
              </p>
              <p className="font-serif text-lg text-white">Compost & lombricompost</p>
            </div>
          </div>
        </section>

        {/* ─────── CATALOGUE ─────── */}
        {CATEGORIES.map((cat) => (
          <section key={cat.title} className="section-parchment border-cri-cacao/20 border-t">
            <div className="container-cri">
              <div className="grid items-start gap-8 md:grid-cols-4">
                <div className="md:sticky md:top-24">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full bg-${cat.color} mb-4 text-white`}
                  >
                    <cat.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl">{cat.title}</h2>
                  <p className="text-cri-humus mt-3 text-sm">{cat.description}</p>
                  <Link
                    href="/contact"
                    className="text-cri-cacao hover:text-cri-gold mt-6 inline-flex items-center text-sm font-bold"
                  >
                    Demander le catalogue PDF
                    <Download className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <div className="grid gap-4 md:col-span-3">
                  {cat.products.map((p) => (
                    <article key={p.ref} className="card hover:shadow-cri-md transition-shadow">
                      <div className="grid items-center gap-4 md:grid-cols-3">
                        <div className="md:col-span-2">
                          <span className="text-cri-cacao text-xs font-bold uppercase tracking-wider">
                            Réf. {p.ref}
                          </span>
                          <h3 className="mt-1 text-lg">{p.name}</h3>
                          <p className="text-cri-humus mt-2 text-sm">{p.spec}</p>
                        </div>
                        <div className="text-sm">
                          <p className="text-cri-cacao font-bold">{p.packaging}</p>
                          <p className="text-cri-humus mt-1">
                            <strong>MOQ :</strong> {p.moq}
                          </p>
                          <Link
                            href="/contact"
                            className="text-cri-cacao hover:text-cri-gold mt-3 inline-flex items-center text-sm font-bold"
                          >
                            Demander un devis
                            <ArrowRight className="ml-1 h-3 w-3" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* ─────── ENGAGEMENTS ─────── */}
        <section className="section bg-cri-cream">
          <div className="container-cri text-center">
            <Award className="text-cri-gold mx-auto h-16 w-16" aria-hidden="true" />
            <h2 className="mt-6 text-3xl md:text-4xl">Qualité, traçabilité, certification</h2>
            <p className="text-cri-humus mx-auto mt-4 max-w-2xl">
              Tous nos produits sont fabriqués selon les normes internationales (ISO 22000, HACCP)
              et accompagnés d&apos;un certificat d&apos;analyse par lot.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/publications"
                className="btn bg-cri-forest hover:bg-cri-canopy text-white"
              >
                <FileText className="mr-2 h-5 w-5" aria-hidden="true" />
                Voir nos publications
              </Link>
              <Link href="/contact" className="btn-gold">
                <ShoppingBag className="mr-2 h-5 w-5" aria-hidden="true" />
                Demander un devis
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
