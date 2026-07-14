import Link from "next/link";
import { FileText, Globe, Award, TrendingUp, Lightbulb, Beaker, Building2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { LabFlask } from "@/components/ui/Illustrations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brevet OAPI — CRI-PROVEND CACAO",
  description:
    "Notre formulation brevetée à l'OAPI : CRI-PROVEND CACAO. Valorisation des cabosses de cacao en aliments pour bétail (poulets de chair, porcs d'engraissement).",
  keywords: [
    "brevet OAPI",
    "CRI-PROVEND CACAO",
    "provendes animales",
    "valorisation cabosses",
    "économie circulaire brevet",
  ],
  openGraph: {
    title: "Brevet OAPI — CRI-PROVEND CACAO",
    description:
      "La formulation brevetée qui transforme les cabosses de cacao en provendes animales premium.",
    type: "website",
  },
};

/**
 * Page /brevet — Présentation du brevet OAPI
 * Brandbook CRI v5 : dominante verte, or cacao, parchemin.
 *
 * Sections :
 * 1. Hero
 * 2. Présentation du brevet
 * 3. Avantages techniques
 * 4. Marchés cibles
 * 5. CTA
 */

const TECH_BENEFITS = [
  {
    icon: Lightbulb,
    title: "Innovation",
    text: "Première formulation au monde valorisant les cabosses de cacao en provendes animales à échelle industrielle.",
  },
  {
    icon: Beaker,
    title: "R&D",
    text: "3 ans de recherche avec l'IRAD et l'Université de Douala. 12 essais terrain documentés.",
  },
  {
    icon: TrendingUp,
    title: "Performance",
    text: "Indice de conversion identique aux provendes soja (-5 %), pour un coût matière première inférieur de 15 %.",
  },
  {
    icon: Globe,
    title: "Marché",
    text: "Marché adressable : 250 000 t/an de provendes en Afrique centrale. Premium accessible aux éleveurs locaux.",
  },
];

const IP_DETAILS = [
  { label: "Type", value: "Brevet d'invention" },
  { label: "Office", value: "OAPI (Organisation Africaine de la Propriété Intellectuelle)" },
  { label: "Numéro", value: "OAPI / 12023 / 00456" },
  { label: "Date de dépôt", value: "14 mars 2022" },
  { label: "Date de délivrance", value: "12 janvier 2024" },
  { label: "Durée", value: "20 ans (échéance 2042)" },
  { label: "Titulaire", value: "AGRO-PME Fondation" },
  { label: "Co-titulaires", value: "IRAD, Université de Douala" },
];

export default function BrevetPage() {
  return (
    <>
      <Navbar />

      <main id="main">
        {/* ─────── HERO ─────── */}
        <PageHero
          badge="Propriété intellectuelle"
          title="CRI-PROVEND CACAO"
          subtitle={
            <>
              Notre formulation <strong>brevetée OAPI</strong> qui transforme les cabosses de cacao
              en aliments pour bétail haute performance. Une innovation 100 % africaine au service
              de l&apos;économie circulaire.
            </>
          }
          image="/brand/logo-variants.png"
          imageAlt="Variantes du logo COCOA RANCH — innovation de marque"
        />

        {/* ─────── BANDE IMMERSIVE : LABORATOIRE ─────── */}
        <section className="bg-cri-forest relative h-64 overflow-hidden md:h-96">
          <LabFlask className="h-full w-full object-cover" />
          <div className="from-cri-forest-dark/80 pointer-events-none absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 max-w-2xl md:bottom-12 md:left-12">
            <span className="bg-cri-gold text-cri-humus text-label rounded-cri mb-3 inline-block px-3 py-1 font-bold uppercase tracking-wider">
              R&D · IRAD · Université de Douala
            </span>
            <p className="font-serif text-2xl leading-snug text-white md:text-3xl">
              3 ans de recherche pour formuler la première provende au monde à base de cabosses de
              cacao.
            </p>
          </div>
        </section>

        {/* ─────── INFOS BREVET ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="grid items-start gap-12 md:grid-cols-2">
              <div>
                <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                  Le brevet
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl">Une innovation protégée</h2>
                <p className="text-cri-humus mt-4 text-lg">
                  En mars 2022, AGRO-PME Fondation a déposé auprès de l&apos;OAPI un brevet
                  d&apos;invention couvrant la formulation, le procédé de fabrication et les usages
                  de la provende <strong>CRI-PROVEND CACAO</strong>.
                </p>
                <p className="text-cri-humus mt-4">
                  Ce brevet protège l&apos;ensemble de la chaîne de valeur : sourcing des cabosses,
                  broyage, fermentation contrôlée, formulation, conditionnement et utilisation en
                  élevage.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/publications"
                    className="btn bg-cri-forest hover:bg-cri-canopy text-white"
                  >
                    <FileText className="mr-2 h-5 w-5" aria-hidden="true" />
                    Étude technique (PDF)
                  </Link>
                  <Link href="/contact" className="btn-gold">
                    <Building2 className="mr-2 h-5 w-5" aria-hidden="true" />
                    Demander une licence
                  </Link>
                </div>
              </div>
              <div className="card">
                <h3 className="flex items-center gap-2 text-xl">
                  <Award className="text-cri-gold h-6 w-6" aria-hidden="true" />
                  Informations juridiques
                </h3>
                <dl className="mt-6 space-y-3">
                  {IP_DETAILS.map((d) => (
                    <div
                      key={d.label}
                      className="border-cri-border flex flex-col border-b pb-3 last:border-0 last:pb-0 sm:flex-row sm:gap-4"
                    >
                      <dt className="text-cri-cacao text-sm font-bold uppercase tracking-wider sm:w-1/3">
                        {d.label}
                      </dt>
                      <dd className="text-cri-humus text-sm sm:w-2/3">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ─────── AVANTAGES TECHNIQUES ─────── */}
        <section className="section bg-cri-cream">
          <div className="container-cri">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                Avantages
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl">Une innovation à fort impact</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {TECH_BENEFITS.map((b) => (
                <article key={b.title} className="card text-center">
                  <div className="bg-cri-cacao mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-white">
                    <b.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg">{b.title}</h3>
                  <p className="text-cri-humus mt-2 text-sm">{b.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── POSITIONNEMENT MARCHÉ ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="card bg-cri-gradient p-12 text-center text-white">
              <h2 className="text-3xl text-white md:text-4xl">Un marché à 250 000 tonnes</h2>
              <p className="text-cri-parchment mx-auto mt-4 max-w-2xl text-lg">
                En Afrique centrale, la demande en provendes animales progresse de 8 %/an. Notre
                formulation brevetée permet de capter ce marché avec un produit local, circulaire et
                économiquement accessible aux éleveurs.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
                {[
                  { v: "250 kt", l: "Marché adressable/an" },
                  { v: "+8 %", l: "Croissance annuelle" },
                  { v: "-15 %", l: "Coût vs concurrence" },
                  { v: "100 %", l: "Matière locale" },
                ].map((k) => (
                  <div key={k.l}>
                    <p className="text-cri-gold font-serif text-4xl font-bold">{k.v}</p>
                    <p className="text-cri-parchment mt-1 text-sm">{k.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────── CTA ─────── */}
        <SectionCTA
          title="Licensing et partenariats industriels"
          description="Vous êtes un fabricant de provendes, un groupe coopératif ou un investisseur industriel ? Discutons d'un accord de licence ou d'un partenariat de production."
          primaryCta={{ href: "/contact", label: "Discuter d'un partenariat" }}
          secondaryCta={{ href: "/publications", label: "Lire les publications scientifiques" }}
          variant="forest"
        />
      </main>

      <Footer />
    </>
  );
}
