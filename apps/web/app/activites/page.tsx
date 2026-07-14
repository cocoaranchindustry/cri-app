import Link from "next/link";
import { ArrowRight, Sprout, Factory, TreePine, Leaf } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { HeroCabosse, FactoryBelt, CattlePasture } from "@/components/ui/Illustrations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos activités — Cacao, provendes, ferme intégrée",
  description:
    "Découvrez les 3 activités de Cocoa Ranch & Industry : Cacao premium tracé, Provenderie brevetée OAPI, Ferme intégrée de démonstration économique.",
  keywords: ["cacao Cameroun", "provendes animales", "ferme intégrée", "CRI activités"],
  openGraph: {
    title: "Nos activités — Cocoa Ranch & Industry",
    description:
      "Trois activités complémentaires pour une économie circulaire : cacao, provendes, ferme intégrée.",
    type: "website",
  },
};

/**
 * Page /activites — Sommaire des activités
 * Brandbook CRI v5 : dominante verte, or cacao, parchemin.
 *
 * Sections :
 * 1. Hero
 * 2. 3 grandes activités
 * 3. CTA
 */

const ACTIVITIES = [
  {
    href: "/activites/cacao",
    icon: Sprout,
    title: "Cacao Premium",
    badge: "Pilier 1",
    color: "cri-forest",
    description:
      "Collecte, fermentation et séchage de fèves premium auprès de 5 000 producteurs. Traçabilité blockchain + QR Code, conformité EUDR, certifications Rainforest Alliance et Fair Trade.",
    bullets: [
      "18 000 t/an de capacité cible (2028)",
      "Géolocalisation parcelle ≥ 6 déc. WGS84",
      "Rémunération > 50 % du prix FOB",
    ],
  },
  {
    href: "/activites/provendes",
    icon: Factory,
    title: "Provenderie",
    badge: "Pilier 2",
    color: "cri-cacao",
    description:
      "Valorisation des cabosses de cacao en aliments pour bétail haut de gamme : formulation CRI-PROVEND CACAO, brevet OAPI 12023/00456. Provendes poulet de chair et porc d'engraissement.",
    bullets: [
      "Brevet OAPI 20 ans (échéance 2042)",
      "-15 % vs provendes soja importées",
      "250 000 t/an de marché adressable",
    ],
  },
  {
    href: "/activites/elevage",
    icon: TreePine,
    title: "Ferme intégrée",
    badge: "Pilier 3",
    color: "cri-canopy",
    description:
      "Ferme de démonstration économique reproductible : 15 000 poulets/an, porcs d'engraissement, biofertilisants. Modèle d'insertion pour les jeunes et les femmes.",
    bullets: [
      "15 000 poulets de chair / an",
      "Insertion 40 %+ jeunes et femmes",
      "Biofertilisants à partir des fientes",
    ],
  },
];

export default function ActivitesPage() {
  return (
    <>
      <Navbar />

      <main id="main">
        <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Activités" }]} />

        {/* ─────── HERO ─────── */}
        <PageHero
          badge="Nos activités"
          title="Trois piliers, une circularité"
          subtitle={
            <>
              De la cacaoculture à l&apos;élevage, en passant par la transformation des
              sous-produits, nous déployons un modèle intégré qui maximise la valeur créée
              localement.
            </>
          }
        />

        {/* ─────── BANDE IMMERSIVE : 3 PILIERS EN IMAGES ─────── */}
        <section className="grid h-48 grid-cols-1 md:h-64 md:grid-cols-3">
          <div className="relative overflow-hidden">
            <HeroCabosse className="absolute inset-0 h-full w-full object-cover" />
            <div className="from-cri-forest-dark/80 absolute inset-0 bg-gradient-to-t to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-cri-gold text-label font-bold uppercase tracking-wider">
                Pilier 1
              </p>
              <p className="font-serif text-lg text-white">Cacao Premium</p>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <FactoryBelt className="absolute inset-0 h-full w-full object-cover" />
            <div className="from-cri-forest-dark/80 absolute inset-0 bg-gradient-to-t to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-cri-gold text-label font-bold uppercase tracking-wider">
                Pilier 2
              </p>
              <p className="font-serif text-lg text-white">Provenderie</p>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <CattlePasture className="absolute inset-0 h-full w-full object-cover" />
            <div className="from-cri-forest-dark/80 absolute inset-0 bg-gradient-to-t to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-cri-gold text-label font-bold uppercase tracking-wider">
                Pilier 3
              </p>
              <p className="font-serif text-lg text-white">Ferme intégrée</p>
            </div>
          </div>
        </section>

        {/* ─────── 3 ACTIVITÉS ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="space-y-12">
              {ACTIVITIES.map((activity) => (
                <article key={activity.href} className="card overflow-hidden">
                  <div className="grid items-center gap-8 md:grid-cols-3">
                    <div
                      className={`rounded-cri flex h-32 w-32 items-center justify-center bg-${activity.color} mx-auto text-white md:mx-0`}
                    >
                      <activity.icon className="h-16 w-16" aria-hidden="true" />
                    </div>
                    <div className="md:col-span-2">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider bg-${activity.color}/10 text-${activity.color} mb-3`}
                      >
                        {activity.badge}
                      </span>
                      <h2 className="text-3xl">{activity.title}</h2>
                      <p className="text-cri-humus mt-3 text-lg">{activity.description}</p>
                      <ul className="text-cri-humus mt-4 space-y-2 text-sm">
                        {activity.bullets.map((b) => (
                          <li key={b} className="flex items-start">
                            <span className="text-cri-gold mr-2 mt-0.5">✓</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={activity.href}
                        className="text-cri-cacao hover:text-cri-gold mt-6 inline-flex items-center font-bold"
                      >
                        Découvrir l&apos;activité
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── MODÈLE INTÉGRÉ ─────── */}
        <section className="section bg-cri-forest text-white">
          <div className="container-cri text-center">
            <Leaf className="text-cri-gold mx-auto h-16 w-16" aria-hidden="true" />
            <h2 className="mt-6 text-3xl text-white md:text-4xl">
              Un modèle intégré et circulaire
            </h2>
            <p className="text-cri-parchment mx-auto mt-4 max-w-3xl text-lg">
              Nos trois activités ne sont pas indépendantes : elles forment une chaîne vertueuse où
              les sous-produits de l&apos;une deviennent les intrants de l&apos;autre.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="rounded-cri border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <Sprout className="text-cri-gold mx-auto h-10 w-10" aria-hidden="true" />
                <h3 className="mt-3 text-lg text-white">Cacao</h3>
                <p className="text-cri-parchment mt-2 text-sm">
                  Fèves premium + cabosses (sous-produit)
                </p>
              </div>
              <div className="rounded-cri border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <Factory className="text-cri-gold mx-auto h-10 w-10" aria-hidden="true" />
                <h3 className="mt-3 text-lg text-white">Provenderie</h3>
                <p className="text-cri-parchment mt-2 text-sm">
                  Cabosses → provendes (valorisation)
                </p>
              </div>
              <div className="rounded-cri border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <TreePine className="text-cri-gold mx-auto h-10 w-10" aria-hidden="true" />
                <h3 className="mt-3 text-lg text-white">Ferme intégrée</h3>
                <p className="text-cri-parchment mt-2 text-sm">
                  Provendes → viande + biofertilisants
                </p>
              </div>
            </div>
            <p className="text-cri-parchment mt-12 text-sm">
              <strong>Résultat :</strong> 0 % de perte, 100 % de valeur créée localement.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
