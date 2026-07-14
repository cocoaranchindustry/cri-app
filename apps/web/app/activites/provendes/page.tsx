import { Factory, Award, TrendingUp, Beaker, Globe, Wheat, Leaf } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionImpact } from "@/components/ui/SectionImpact";
import { KpiCard } from "@/components/ui/KpiCard";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { FactoryBelt } from "@/components/ui/Illustrations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provendes animales — CRI-PROVEND CACAO",
  description:
    "Provendes animales brevetées OAPI : valorisation des cabosses de cacao en aliments pour poulets de chair et porcs d'engraissement. -15 % vs marché.",
  keywords: [
    "provendes Cameroun",
    "CRI-PROVEND CACAO",
    "aliment poulet",
    "aliment porc",
    "brevet OAPI",
    "économie circulaire",
  ],
  openGraph: {
    title: "Provendes animales — Cocoa Ranch & Industry",
    description:
      "La formulation brevetée OAPI qui transforme les cabosses de cacao en provendes animales premium.",
    type: "website",
  },
};

/**
 * Page /activites/provendes — Pilier 2
 * Brandbook CRI v5 : dominante verte, or cacao, parchemin.
 *
 * Sections :
 * 1. Hero
 * 2. KPIs
 * 3. Gamme de produits
 * 4. Avantages techniques
 * 5. CTA
 */

const PRODUCT_RANGE = [
  {
    name: "CRI-PROVEND CACAO Poulet",
    target: "Poulets de chair (démarrage, croissance, finition)",
    protein: "20-22 %",
    energy: "2 900 kcal/kg",
    packaging: "Sac 50 kg, big-bag 1 t",
    price: "180-220 FCFA/kg",
  },
  {
    name: "CRI-PROVEND CACAO Porc",
    target: "Porcs d'engraissement (croissance, finition)",
    protein: "16-18 %",
    energy: "3 100 kcal/kg",
    packaging: "Sac 50 kg, big-bag 1 t",
    price: "160-200 FCFA/kg",
  },
  {
    name: "CRI-PROVEND CACAO Bio+",
    target: "Élevages bio, label Agriculture Biologique",
    protein: "18-20 %",
    energy: "2 950 kcal/kg",
    packaging: "Sac 25 kg, big-bag 1 t",
    price: "240-280 FCFA/kg",
  },
];

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Performance zootechnique",
    text: "Indice de consommation (IC) identique ou inférieur aux provendes soja, sur poulets de chair et porcs à l'engraissement.",
  },
  {
    icon: Beaker,
    title: "Recherche & développement",
    text: "3 ans de R&D avec l'IRAD et l'Université de Douala. 12 essais terrain documentés, publication en revue à comité de lecture.",
  },
  {
    icon: Leaf,
    title: "Économie circulaire",
    text: "Valorisation de 100 % des cabosses de cacao, qui seraient sinon brûlées ou abandonnées. Réduction de l'empreinte carbone.",
  },
  {
    icon: Globe,
    title: "Souveraineté alimentaire",
    text: "Matière première 100 % camerounaise. Réduction de la dépendance aux importations de soja OGM.",
  },
  {
    icon: Award,
    title: "Brevet OAPI 20 ans",
    text: "Protection intellectuelle à l'échelle des 17 pays membres de l'OAPI. Avantage concurrentiel durable.",
  },
  {
    icon: Wheat,
    title: "Coût maîtrisé",
    text: "-15 % vs provendes conventionnelles à base de soja importé. -20 à -30 % pour l'éleveur final.",
  },
];

export default function ProvendesPage() {
  return (
    <>
      <Navbar />

      <main id="main">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Activités", href: "/activites" },
            { label: "Provendes" },
          ]}
        />

        {/* ─────── HERO ─────── */}
        <PageHero
          badge="Pilier 2 · Provenderie"
          title="CRI-PROVEND CACAO"
          subtitle={
            <>
              La première provende animale au monde valorisant les cabosses de cacao.{" "}
              <strong>Brevet OAPI</strong>, performance identique aux provendes soja,{" "}
              <strong>-15 % pour l&apos;éleveur</strong>.
            </>
          }
          image="/brand/rs-reference.png"
          imageAlt="Usine de provenderie COCOA RANCH"
        />

        {/* ─────── BANDE IMMERSIVE : USINE + BANDE TRANSPORTEUSE ─────── */}
        <section className="relative h-64 overflow-hidden md:h-96">
          <FactoryBelt className="h-full w-full object-cover" />
          <div className="from-cri-forest-dark/85 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 max-w-2xl md:bottom-12 md:left-12">
            <span className="bg-cri-gold text-cri-humus text-label rounded-cri mb-3 inline-block px-3 py-1 font-bold uppercase tracking-wider">
              Du champ à l&apos;usine
            </span>
            <p className="font-serif text-2xl leading-snug text-white md:text-3xl">
              25 000 t/an de provendes fabriquées à partir de cabosses revalorisées.
            </p>
          </div>
        </section>

        {/* ─────── KPIs ─────── */}
        <SectionImpact
          title="Provenderie en chiffres (objectif 2028)"
          subtitle="Capacité de production et impact économique"
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            <KpiCard
              value={25000}
              label="Capacité provenderie"
              suffix=" t/an"
              trend="up"
              description="Provendes poulet + porc + bio"
            />
            <KpiCard
              value={15}
              label="Économies éleveur"
              suffix=" %"
              trend="up"
              description="Vs provendes conventionnelles soja"
            />
            <KpiCard
              value={20}
              label="Durée du brevet"
              suffix=" ans"
              trend="up"
              description="Protection OAPI (échéance 2042)"
            />
            <KpiCard
              value={250000}
              label="Marché adressable"
              suffix=" t/an"
              trend="up"
              description="Afrique centrale (Cameroun, Gabon, Congo)"
            />
          </div>
        </SectionImpact>

        {/* ─────── GAMME PRODUITS ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                Gamme
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl">
                Trois formulations pour tous les élevages
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {PRODUCT_RANGE.map((p) => (
                <article key={p.name} className="card">
                  <Factory className="text-cri-cacao mb-4 h-10 w-10" aria-hidden="true" />
                  <h3 className="text-xl">{p.name}</h3>
                  <p className="text-cri-cacao mt-2 text-sm font-bold">{p.target}</p>
                  <dl className="mt-6 space-y-3 text-sm">
                    <div className="border-cri-border flex justify-between border-b pb-2">
                      <dt className="text-cri-humus">Protéines brutes</dt>
                      <dd className="text-cri-forest font-bold">{p.protein}</dd>
                    </div>
                    <div className="border-cri-border flex justify-between border-b pb-2">
                      <dt className="text-cri-humus">Énergie métabolisable</dt>
                      <dd className="text-cri-forest font-bold">{p.energy}</dd>
                    </div>
                    <div className="border-cri-border flex justify-between border-b pb-2">
                      <dt className="text-cri-humus">Conditionnement</dt>
                      <dd className="text-cri-forest font-bold">{p.packaging}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-cri-humus">Prix indicatif</dt>
                      <dd className="text-cri-gold font-bold">{p.price}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── AVANTAGES ─────── */}
        <section className="section bg-cri-cream">
          <div className="container-cri">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                Pourquoi CRI-PROVEND
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl">Six raisons de nous choisir</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {BENEFITS.map((b) => (
                <article key={b.title} className="card">
                  <div className="bg-cri-cacao mb-4 flex h-12 w-12 items-center justify-center rounded-full text-white">
                    <b.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg">{b.title}</h3>
                  <p className="text-cri-humus mt-2 text-sm">{b.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── CTA ─────── */}
        <SectionCTA
          title="Distribuez nos provendes ou achetez en gros"
          description="Vous êtes éleveur, coopérative, fabricant ou distributeur ? Bénéficiez de conditions préférentielles sur nos 3 formulations."
          primaryCta={{ href: "/contact", label: "Demander un devis" }}
          secondaryCta={{ href: "/brevet", label: "En savoir plus sur le brevet" }}
          variant="forest"
        />
      </main>

      <Footer />
    </>
  );
}
