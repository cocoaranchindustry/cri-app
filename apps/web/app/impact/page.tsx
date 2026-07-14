import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  Users,
  ShieldCheck,
  TrendingUp,
  TreePine,
  Award,
  Globe2,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { SectionImpact } from "@/components/ui/SectionImpact";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { KpiCard } from "@/components/ui/KpiCard";
import { ChartGrowth, SproutLeaf } from "@/components/ui/Illustrations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact RSE — Zéro déforestation, zéro déchet, zéro CO₂",
  description:
    "Rapport d'impact RSE de Cocoa Ranch & Industry : conformité EUDR 2023/1115, 100 % économie circulaire, 5 000 producteurs accompagnés, certifications Rainforest Alliance et Fair Trade.",
  keywords: [
    "impact RSE cacao",
    "EUDR Cameroun",
    "zéro déforestation",
    "économie circulaire",
    "Rainforest Alliance",
    "Fair Trade cacao",
    "développement durable",
  ],
  openGraph: {
    title: "Impact RSE — Cocoa Ranch & Industry",
    description:
      "5 000 producteurs, 100 % circulaire, conformité EUDR. Notre impact social et environnemental mesuré.",
    type: "website",
  },
};

/**
 * Page /impact — Rapport d'impact RSE
 * Brandbook CRI v5 : dominante verte, or cacao, parchemin.
 *
 * Sections :
 * 1. Hero
 * 2. 3 piliers RSE (Social, Environnemental, Économique)
 * 3. KPIs d'impact
 * 4. Engagements et certifications
 * 5. Conformité EUDR
 * 6. CTA
 */

const PILLARS = [
  {
    icon: Users,
    title: "Impact social",
    color: "cri-forest",
    items: [
      "5 000 producteurs accompagnés d'ici 2028",
      "1 000+ emplois directs et indirects créés",
      "40 %+ de jeunes et de femmes dans les équipes",
      "Rémunération > 50 % du prix FOB pour les planteurs",
      "Programme de formation et d'insertion professionnelle",
    ],
  },
  {
    icon: Leaf,
    title: "Impact environnemental",
    color: "cri-canopy",
    items: [
      "Zéro déforestation : traçabilité parcelle → conteneur",
      "100 % des sous-produits cacao valorisés (circularité)",
      "Biofertilisants à partir des fientes de la ferme intégrée",
      "Plantations en agroforesterie : ombrage, biodiversité",
      "Réduction de 35 % de l'empreinte CO₂ vs filière classique",
    ],
  },
  {
    icon: TrendingUp,
    title: "Impact économique",
    color: "cri-cacao",
    items: [
      "1,7 Md FCFA de chiffre d'affaires cible à 2028",
      "Création d'une filière porcine et avicole locale",
      "Réduction de 15 % du coût des provendes pour les éleveurs",
      "Développement de l'export premium vers l'Union européenne",
      "350+ M FCFA de taxes et cotisations annuelles",
    ],
  },
];

const CERTIFICATIONS = [
  { label: "EUDR 2023/1115", desc: "Traçabilité complète (géoloc ≥ 6 déc.)" },
  { label: "Rainforest Alliance", desc: "Cacao durable, biodiversité" },
  { label: "Fair Trade", desc: "Commerce équitable, prime collective" },
  { label: "ISO 22000", desc: "Sécurité alimentaire" },
  { label: "HACCP", desc: "Maîtrise des risques sanitaires" },
  { label: "OAPI", desc: "Brevet formulation provendes" },
];

export default function ImpactPage() {
  return (
    <>
      <Navbar />

      <main id="main">
        {/* ─────── HERO ─────── */}
        <PageHero
          badge="Impact RSE"
          title="Zéro déforestation, zéro déchet, zéro CO₂"
          subtitle={
            <>
              Notre engagement RSE est adossé au programme <strong>CIMAR-Technopôle</strong> :
              promotion de l&apos;agroécologie, formation-insertion des jeunes et des femmes,
              diffusion des bio-intrants.
            </>
          }
        />

        {/* ─────── 3 PILIERS RSE ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                Nos engagements
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl">Trois piliers pour un impact durable</h2>
              <p className="text-cri-humus mt-4 text-lg">
                Conformément aux Objectifs de Développement Durable de l&apos;ONU (ODD 1, 5, 8, 12,
                13, 15), nous mesurons et publions chaque année notre performance extra-financière.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {PILLARS.map((pillar) => (
                <article key={pillar.title} className="card">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full bg-${pillar.color} mb-6 text-white`}
                  >
                    <pillar.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl">{pillar.title}</h3>
                  <ul className="text-cri-humus mt-6 space-y-3 text-sm">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-start">
                        <span className="text-cri-gold mr-2 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── BANDE IMMERSIVE : COURBE DE CROISSANCE + POUSSES ─────── */}
        <section className="relative">
          <ChartGrowth className="w-full" />
          <div className="from-cri-forest-dark/85 via-cri-forest/50 pointer-events-none absolute inset-0 bg-gradient-to-r to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 max-w-2xl md:bottom-12 md:left-12">
            <span className="bg-cri-gold text-cri-humus text-label rounded-cri mb-3 inline-block px-3 py-1 font-bold uppercase tracking-wider">
              Notre trajectoire
            </span>
            <p className="font-serif text-2xl leading-snug text-white md:text-3xl">
              +260 % de production en 5 ans, +1 000 emplois, 100 % circulaire.
            </p>
          </div>
        </section>

        {/* ─────── KPIs D'IMPACT ─────── */}
        <SectionImpact
          title="Notre impact en chiffres (objectif 2028)"
          subtitle="Indicateurs mesurés annuellement et audités par un cabinet tiers"
          withPattern
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            <KpiCard
              value={5000}
              label="Producteurs accompagnés"
              suffix="+"
              trend="up"
              description="Coopérative ancrée dans 6 villages du Bassin du Mungo"
            />
            <KpiCard
              value={1000}
              label="Emplois créés"
              suffix="+"
              trend="up"
              description="Directs et indirects, 40 %+ jeunes et femmes"
            />
            <KpiCard
              value={100}
              label="Valorisation matière"
              suffix=" %"
              trend="up"
              description="100 % des sous-produits cacao recyclés"
            />
            <KpiCard
              value={35}
              label="Réduction CO₂"
              suffix=" %"
              trend="up"
              description="Vs filière cacao conventionnelle (mesure Carbone 4)"
            />
          </div>
        </SectionImpact>

        {/* ─────── EUDR ─────── */}
        <section className="section bg-cri-forest text-white">
          <div className="container-cri">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <span className="text-label text-cri-gold font-bold uppercase tracking-wider">
                  Conformité réglementaire
                </span>
                <h2 className="mt-3 text-3xl text-white md:text-4xl">
                  EUDR 2023/1115 : prêt pour le marché européen
                </h2>
                <p className="text-cri-parchment mt-4 text-lg">
                  Le Règlement européen contre la déforestation (EUDR) impose aux importateurs de
                  cacao de prouver la traçabilité parcelle par parcelle, avec géolocalisation ≥ 6
                  décimales WGS84 et polygons géographiques.
                </p>
                <p className="text-cri-parchment mt-4">
                  Notre plateforme <strong>CacaoTrace</strong> collecte les données terrain via
                  application mobile, les vérifie par imagerie satellite, et génère automatiquement
                  les déclarations de diligence raisonnée.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link href="/traceability" className="btn-gold">
                    Découvrir CacaoTrace
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  {
                    icon: Globe2,
                    title: "Géolocalisation ≥ 6 décimales",
                    text: "Chaque parcelle est géolocalisée avec précision < 10 cm.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Polygons et surfaces",
                    text: "Emprise au sol calculée par satellite (Sentinel-2).",
                  },
                  {
                    icon: TreePine,
                    title: "Vérification de non-déforestation",
                    text: "Analyse diachronique 2020-2025 par IA (modèle CRI-Forest).",
                  },
                ].map((b) => (
                  <div
                    key={b.title}
                    className="rounded-cri border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <b.icon className="text-cri-gold h-8 w-8 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <h3 className="text-lg text-white">{b.title}</h3>
                        <p className="text-cri-parchment mt-1 text-sm">{b.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────── CERTIFICATIONS ─────── */}
        <section className="section-parchment relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-12 -right-12 opacity-15">
            <SproutLeaf className="h-80 w-80" />
          </div>
          <div className="container-cri relative">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                Reconnaissances
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl">Certifications et labels</h2>
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              {CERTIFICATIONS.map((c) => (
                <div
                  key={c.label}
                  className="card hover:shadow-cri-md text-center transition-shadow"
                >
                  <Award className="text-cri-gold mx-auto h-12 w-12" aria-hidden="true" />
                  <h3 className="mt-4 text-lg">{c.label}</h3>
                  <p className="text-cri-humus mt-2 text-sm">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── CTA ─────── */}
        <SectionCTA
          title="Téléchargez notre rapport d'impact 2025"
          description="Le rapport complet (40 pages, format PDF) détaille nos indicateurs ESG, les audits tiers et les perspectives 2026-2030."
          primaryCta={{ href: "/publications", label: "Voir les publications" }}
          secondaryCta={{ href: "/contact", label: "Demander un échange" }}
          variant="gold"
        />
      </main>

      <Footer />
    </>
  );
}
