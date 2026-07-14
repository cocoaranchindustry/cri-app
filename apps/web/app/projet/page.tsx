import Link from "next/link";
import {
  ArrowRight,
  Sprout,
  Factory,
  Target,
  Eye,
  Heart,
  Users,
  MapPin,
  Building2,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Timeline } from "@/components/ui/Timeline";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { HandsSoil, CocoaPods } from "@/components/ui/Illustrations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le projet — Notre mission, vision et modèle",
  description:
    "Découvrez la mission, la vision et le modèle d'agropole circulaire de Cocoa Ranch & Industry. 5 000 producteurs accompagnés, économie circulaire brevetée OAPI, conformité EUDR 2023/1115.",
  keywords: [
    "mission AGRO-PME",
    "agropole Cameroun",
    "économie circulaire cacao",
    "modèle coopératif",
    "brevets OAPI",
  ],
  openGraph: {
    title: "Le projet CRI — Notre mission et notre vision",
    description:
      "Mission, vision, modèle économique : l'agropole circulaire qui transforme le cacao camerounais.",
    type: "website",
  },
};

/**
 * Page /projet — Présentation détaillée du programme
 * Brandbook CRI v5 : dominante verte, or cacao, parchemin.
 *
 * Sections :
 * 1. Hero
 * 2. Mission, Vision, Valeurs (3 cards)
 * 3. AGRO-PME Fondation (porteur)
 * 4. Modèle d'agropole (Timeline de maturation)
 * 5. Chiffres clés (rappel)
 * 6. CTA investisseurs
 */

const TIMELINE_ITEMS = [
  {
    date: "2018",
    title: "Genèse du projet",
    description:
      "Étude de faisabilité dans 6 villages du Bassin du Mungo. Identification du potentiel d'économie circulaire sur la filière cacao.",
  },
  {
    date: "2020",
    title: "Constitution de la coopérative",
    description:
      "Création de la coopérative CRI regroupant 1 200 producteurs locaux et signature des premières chartes qualité.",
  },
  {
    date: "2022",
    title: "Dépôt du brevet OAPI",
    description:
      "Enregistrement de la formulation CRI-PROVEND CACAO à l'Organisation Africaine de la Propriété Intellectuelle.",
  },
  {
    date: "2024",
    title: "Mise en service de l'usine",
    description:
      "Inauguration de l'unité de fermentation, séchage et torréfaction. Capacité initiale : 400 t/an.",
  },
  {
    date: "2026",
    title: "Lancement du Ranch",
    description:
      "Démarrage du ranch moderne de 200 ha en agroforesterie. Premières parcelles certifiées EUDR.",
  },
  {
    date: "2028",
    title: "Objectif 18 000 t/an",
    description:
      "Montée en puissance : 5 000 producteurs, 200 ha, 18 kt/an, 1,7 Md FCFA de CA, 1 000 emplois directs.",
    milestone: true,
  },
];

const VALUES = [
  {
    icon: Target,
    title: "Mission",
    text: "Transformer la cacaoculture camerounaise en agro-industrie circulaire, traçable et inclusive, au service de 5 000 producteurs et de leurs communautés.",
  },
  {
    icon: Eye,
    title: "Vision",
    text: "Faire du Bassin du Mungo un modèle africain d'agropole durable, répliqué à l'échelle du continent pour la souveraineté alimentaire et l'export premium.",
  },
  {
    icon: Heart,
    title: "Valeurs",
    text: "Transparence, équité (rémunération > 50 % du prix FOB), excellence opérationnelle, impact social mesuré, respect de l'environnement.",
  },
];

const PARTNERS = [
  { icon: Building2, label: "Porteur", name: "AGRO-PME Fondation" },
  { icon: Users, label: "Coopérative", name: "5 000 producteurs" },
  { icon: MapPin, label: "Territoire", name: "6 villages · Bassin du Mungo" },
  { icon: GraduationCap, label: "Recherche", name: "IRAD · Université de Douala" },
  { icon: Briefcase, label: "Bailleur principal", name: "SNI · Banque Mondiale · AFD" },
];

export default function ProjetPage() {
  return (
    <>
      <Navbar />

      <main id="main">
        {/* ─────── HERO ─────── */}
        <PageHero
          badge="Le projet"
          title="Une agropole circulaire au cœur du Cameroun"
          subtitle={
            <>
              Cocoa Ranch &amp; Industry est un programme d&apos;<strong>agropole durable</strong>{" "}
              porté par <strong>AGRO-PME Fondation</strong> et pensé pour réconcilier performance
              économique, inclusion sociale et respect de l&apos;environnement.
            </>
          }
        />

        {/* ─────── BANDE IMMERSIVE PLANTEUR ─────── */}
        <section className="relative h-64 overflow-hidden md:h-80">
          <HandsSoil className="h-full w-full object-cover" />
          <div className="from-cri-forest-dark/85 via-cri-forest/60 pointer-events-none absolute inset-0 bg-gradient-to-r to-transparent" />
          <div className="container-cri absolute inset-0 flex items-center">
            <div className="max-w-2xl">
              <p className="font-serif text-3xl leading-snug text-white md:text-4xl">
                « De la main du planteur à l&apos;usine : un cacao tracé, équitable, circulaire. »
              </p>
              <p className="text-cri-gold text-label mt-4 font-bold uppercase tracking-wider">
                L&apos;esprit COCOA RANCH
              </p>
            </div>
          </div>
        </section>

        {/* ─────── MISSION / VISION / VALEURS ─────── */}
        <section className="section-parchment relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
            <CocoaPods className="h-full w-full" />
          </div>
          <div className="container-cri relative">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                Pourquoi ce projet
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl">Mission, vision, valeurs</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {VALUES.map((v) => (
                <article key={v.title} className="card">
                  <div className="bg-cri-forest mb-6 flex h-14 w-14 items-center justify-center rounded-full text-white">
                    <v.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl">{v.title}</h3>
                  <p className="text-cri-humus mt-3">{v.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── AGRO-PME FONDATION ─────── */}
        <section className="section bg-cri-forest text-white">
          <div className="container-cri">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <span className="text-label text-cri-gold font-bold uppercase tracking-wider">
                  Le porteur
                </span>
                <h2 className="mt-3 text-3xl text-white md:text-4xl">AGRO-PME Fondation</h2>
                <p className="text-cri-parchment mt-4 text-lg">
                  Association camerounaise créée en 2010, AGRO-PME Fondation accompagne le
                  développement de l&apos;agro-industrie durable et favorise l&apos;inclusion
                  économique des jeunes et des femmes en zone rurale.
                </p>
                <p className="text-cri-parchment mt-4">
                  Le programme CRI est sa vitrine opérationnelle : prouver qu&apos;un modèle
                  d&apos;agropole circulaire, traçable et rentable peut être déployé à grande
                  échelle en Afrique centrale.
                </p>
                <Link href="/contact" className="btn-gold mt-6 inline-flex items-center">
                  Contacter la fondation
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {PARTNERS.map((p) => (
                  <div
                    key={p.label}
                    className="rounded-cri border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
                  >
                    <p.icon className="text-cri-gold mb-3 h-8 w-8" aria-hidden="true" />
                    <p className="text-cri-gold text-xs font-bold uppercase tracking-wider">
                      {p.label}
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">{p.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────── TIMELINE ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                Feuille de route
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl">De la genèse à l&apos;objectif 2028</h2>
              <p className="text-cri-humus mt-4 text-lg">
                6 étapes clés pour passer d&apos;une idée de coopératives villageoises à une
                agropole de rang mondial.
              </p>
            </div>
            <Timeline items={TIMELINE_ITEMS} />
          </div>
        </section>

        {/* ─────── MODÈLE ÉCONOMIQUE ─────── */}
        <section className="section bg-cri-cream">
          <div className="container-cri">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                  Le modèle
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl">Trois piliers, une circularité</h2>
                <p className="text-cri-humus mt-4 text-lg">
                  Notre modèle repose sur la valorisation systématique de
                  <strong> 100 % des sous-produits </strong>
                  de la filière cacao, grâce à un portefeuille de technologies protégées par brevets
                  OAPI.
                </p>
                <ul className="text-cri-humus mt-6 space-y-3">
                  <li className="flex items-start gap-3">
                    <Sprout
                      className="text-cri-cacao mt-1 h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Cacao premium :</strong> 18 000 t/an de fèves tracées et certifiées
                      (Rainforest Alliance, Fair Trade, EUDR).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Factory
                      className="text-cri-cacao mt-1 h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Provenderie :</strong> cabosses et biomasse transformées en aliments
                      pour bétail (formulation brevetée OAPI).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Heart
                      className="text-cri-cacao mt-1 h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Ferme intégrée :</strong> démonstration économique reproductible (15
                      000 poulets/an, porcs, biofertilisants).
                    </span>
                  </li>
                </ul>
              </div>
              <div className="card bg-cri-gradient p-12 text-white">
                <h3 className="text-2xl text-white">Un impact territorial</h3>
                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-cri-gold font-serif text-5xl font-bold">5 000</p>
                    <p className="text-cri-parchment mt-1">producteurs accompagnés</p>
                  </div>
                  <div>
                    <p className="text-cri-gold font-serif text-5xl font-bold">1 000+</p>
                    <p className="text-cri-parchment mt-1">emplois directs et indirects créés</p>
                  </div>
                  <div>
                    <p className="text-cri-gold font-serif text-5xl font-bold">40 %+</p>
                    <p className="text-cri-parchment mt-1">
                      de jeunes et de femmes dans les recrutements
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────── CTA ─────── */}
        <SectionCTA
          title="Soutenez l'agropole circulaire africaine"
          description="Devenez partenaire, investisseur ou mécène du programme CRI. Une opportunité unique de concilier rendement financier et impact social."
          primaryCta={{ href: "/investisseurs", label: "Devenir investisseur" }}
          secondaryCta={{ href: "/contact", label: "Nous contacter" }}
          variant="forest"
        />
      </main>

      <Footer />
    </>
  );
}
