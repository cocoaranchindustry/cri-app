import { TreePine, Users, Leaf, Sprout, Beaker, Award, Heart, Briefcase } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionImpact } from "@/components/ui/SectionImpact";
import { KpiCard } from "@/components/ui/KpiCard";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { CattlePasture } from "@/components/ui/Illustrations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ferme intégrée — Démonstration économique reproductible",
  description:
    "Ferme de démonstration économique : 15 000 poulets/an, porcs d'engraissement, biofertilisants. Modèle d'insertion pour les jeunes et les femmes du Bassin du Mungo.",
  keywords: [
    "ferme intégrée Cameroun",
    "élevage poulets",
    "porcs engraissement",
    "biofertilisants",
    "insertion jeunes femmes",
    "démonstration économique",
  ],
  openGraph: {
    title: "Ferme intégrée — Cocoa Ranch & Industry",
    description:
      "Démonstration économique d'élevage circulaire : 15 000 poulets/an, porcs, biofertilisants, insertion.",
    type: "website",
  },
};

/**
 * Page /activites/elevage — Pilier 3
 * Brandbook CRI v5 : dominante verte, or cacao, parchemin.
 *
 * Sections :
 * 1. Hero
 * 2. KPIs
 * 3. Composantes de la ferme
 * 4. Modèle d'insertion
 * 5. CTA
 */

const COMPONENTS = [
  {
    icon: Sprout,
    title: "Atelier avicole",
    details: [
      "15 000 poulets de chair / an",
      "3 bâtiments d'élevage de 500 m²",
      "Cycle de 45 jours, 6 lots / an",
      "Alimentation CRI-PROVEND CACAO",
    ],
  },
  {
    icon: TreePine,
    title: "Atelier porcin",
    details: [
      "100 porcs d'engraissement en simultané",
      "3 bandes en rotation, 250 porcs / an",
      "Porcherie moderne sur caillebotis",
      "Valorisation des sous-produits laitiers",
    ],
  },
  {
    icon: Leaf,
    title: "Unité biofertilisants",
    details: [
      "Compostage des fientes de volaille",
      "Production 200 t/an de biofertilisants",
      "Lombricompost à partir des lisiers porcins",
      "Vente aux planteurs de la coopérative",
    ],
  },
  {
    icon: Beaker,
    title: "Parcelle de démonstration",
    details: [
      "5 ha de cacaoyers en agroforesterie",
      "Démonstration des bonnes pratiques",
      "Champ école pour les nouveaux producteurs",
      "Tests variétaux en collaboration avec l'IRAD",
    ],
  },
];

const INSERTION_PROGRAM = [
  {
    icon: Users,
    title: "Insertion des jeunes",
    text: "Programme de formation-insertion de 200 jeunes ruraux sur 3 ans, dans les métiers de l'élevage et de l'agro-industrie.",
  },
  {
    icon: Heart,
    title: "Place des femmes",
    text: "Objectif 40 %+ de femmes dans les recrutements et à des postes d'encadrement. Programme spécifique d'élevage avicole villageois.",
  },
  {
    icon: Briefcase,
    title: "Emplois durables",
    text: "1 000+ emplois directs et indirects créés d'ici 2028 dans la ferme, la provenderie et les services associés.",
  },
  {
    icon: Award,
    title: "Formation certifiante",
    text: "Partenariat avec le MINEFOP (Cameroun) et l'APME pour des CQP (Certificats de Qualification Professionnelle).",
  },
];

export default function ElevagePage() {
  return (
    <>
      <Navbar />

      <main id="main">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Activités", href: "/activites" },
            { label: "Ferme intégrée" },
          ]}
        />

        {/* ─────── HERO ─────── */}
        <PageHero
          badge="Pilier 3 · Ferme intégrée"
          title="Démonstration économique circulaire"
          subtitle={
            <>
              Notre ferme de 5 ha à <strong>Njombé-Penja</strong> prouve qu&apos;un modèle
              d&apos;élevage intensif peut être <strong>rentable, durable et inclusif</strong>, en
              valorisant les provendes brevetées et les biofertilisants locaux.
            </>
          }
          image="/brand/rs-reference.png"
          imageAlt="Ferme intégrée Njombé-Penja"
        />

        {/* ─────── BANDE IMMERSIVE : PÂTURAGE BOVIN ─────── */}
        <section className="relative h-64 overflow-hidden md:h-96">
          <CattlePasture className="h-full w-full object-cover" />
          <div className="from-cri-forest-dark/85 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 max-w-2xl md:bottom-12 md:left-12">
            <span className="bg-cri-gold text-cri-humus text-label rounded-cri mb-3 inline-block px-3 py-1 font-bold uppercase tracking-wider">
              Élevage extensif intégré
            </span>
            <p className="font-serif text-2xl leading-snug text-white md:text-3xl">
              Bovins, volailles, porcs, biofertilisants : la circularité au cœur de la ferme.
            </p>
          </div>
        </section>

        {/* ─────── KPIs ─────── */}
        <SectionImpact
          title="Ferme intégrée en chiffres (objectif 2028)"
          subtitle="Capacités de production et impact social"
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            <KpiCard
              value={15000}
              label="Poulets de chair"
              suffix=" /an"
              trend="up"
              description="3 bâtiments, 6 lots par an"
            />
            <KpiCard
              value={250}
              label="Porcs engraissement"
              suffix=" /an"
              trend="up"
              description="3 bandes en rotation"
            />
            <KpiCard
              value={200}
              label="Biofertilisants"
              suffix=" t/an"
              trend="up"
              description="Compost + lombricompost"
            />
            <KpiCard
              value={40}
              label="Femmes & jeunes"
              suffix=" %+"
              trend="up"
              description="De nos recrutements"
            />
          </div>
        </SectionImpact>

        {/* ─────── COMPOSANTES ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                Composantes
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl">Quatre unités intégrées</h2>
              <p className="text-cri-humus mt-4 text-lg">
                La ferme repose sur quatre unités qui se nourrissent les unes les autres : élevage,
                fertilisation, démonstration.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {COMPONENTS.map((c) => (
                <article key={c.title} className="card">
                  <div className="bg-cri-canopy mb-4 flex h-12 w-12 items-center justify-center rounded-full text-white">
                    <c.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl">{c.title}</h3>
                  <ul className="text-cri-humus mt-4 space-y-2 text-sm">
                    {c.details.map((d) => (
                      <li key={d} className="flex items-start">
                        <span className="text-cri-gold mr-2 mt-0.5">✓</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── INSERTION ─────── */}
        <section className="section bg-cri-forest text-white">
          <div className="container-cri">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-label text-cri-gold font-bold uppercase tracking-wider">
                Impact social
              </span>
              <h2 className="mt-3 text-3xl text-white md:text-4xl">Une ferme inclusive</h2>
              <p className="text-cri-parchment mt-4 text-lg">
                Notre ferme est avant tout un projet social : 40 %+ de femmes et de jeunes dans les
                équipes, formation certifiante, modèle reproductible dans d&apos;autres villages.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {INSERTION_PROGRAM.map((p) => (
                <div
                  key={p.title}
                  className="rounded-cri border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <p.icon className="text-cri-gold h-10 w-10 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h3 className="text-lg text-white">{p.title}</h3>
                      <p className="text-cri-parchment mt-2 text-sm">{p.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── CTA ─────── */}
        <SectionCTA
          title="Visitez la ferme intégrée"
          description="Nous accueillons les visites techniques (institutionnels, chercheurs, étudiants) sur rendez-vous. Voyez notre modèle en action."
          primaryCta={{ href: "/contact", label: "Réserver une visite" }}
          secondaryCta={{ href: "/impact", label: "Voir notre impact social" }}
          variant="gold"
        />
      </main>

      <Footer />
    </>
  );
}
