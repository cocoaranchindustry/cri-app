import Link from "next/link";
import {
  ArrowRight,
  Sprout,
  Factory,
  TreePine,
  Leaf,
  ShieldCheck,
  MapPin,
  Users,
  TreePine as TreePineIcon,
  TrendingUp,
  Quote,
  Award,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { KpiCard } from "@/components/ui/KpiCard";
import { SectionImpact } from "@/components/ui/SectionImpact";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { PillarCard } from "@/components/ui/PillarCard";
import { PlantationSun, CocoaPods, MapMungo } from "@/components/ui/Illustrations";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { Carousel, CarouselItem } from "@/components/ui/Carousel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cocoa Ranch & Industry — L'agropole circulaire du cacao camerounais",
  description:
    "Du cacao camerounais 100% tracé, du planteur au chocolatier. 5 000 producteurs, 200 ha de ranch moderne, 18 000 t/an. Conformité EUDR 2023/1115, certifications Rainforest Alliance et Fair Trade.",
  keywords: [
    "cacao Cameroun",
    "cacao tracé",
    "EUDR",
    "zéro déforestation",
    "investir cacao Afrique",
    "provendes animales",
    "bean-to-bar",
    "Bassin du Mungo",
  ],
  openGraph: {
    title: "Cocoa Ranch & Industry — Cacao premium tracé du Cameroun",
    description:
      "5 000 producteurs, 200 ha, 18 000 t/an. L'agropole circulaire du cacao camerounais.",
    type: "website",
    locale: "fr_FR",
    url: "https://cri.africa",
    siteName: "Cocoa Ranch & Industry",
  },
};

/**
 * Page d'accueil — Portail Public
 * Brandbook CRI v5 : dominante verte, or cacao, parchemin
 *
 * Chiffres alignés sur le brief marketing (objectif 2028) :
 * - 5 000 producteurs accompagnés
 * - 200 ha de ranch moderne (agroforesterie)
 * - 18 000 t/an de cacao premium
 * - 1,7 Md FCFA de chiffre d'affaires cible
 *
 * Structure éditoriale :
 * 1. Hero immersif (image plein écran)
 * 2. Bande de logos / partenaires (preuve sociale)
 * 3. KPIs en grille asymétrique
 * 4. 3 piliers avec photos plein cadre
 * 5. Engagement RSE (3 colonnes)
 * 6. Témoignage / citation
 * 7. Localisation + AGRO-PME
 * 8. CTA Investisseurs
 */

const PARTNERS = [
  { name: "AGRO-PME Fondation", role: "Porteur" },
  { name: "SNI Cameroun", role: "Bailleur" },
  { name: "AFD", role: "Bailleur" },
  { name: "Banque Mondiale", role: "Bailleur" },
  { name: "IRAD", role: "Recherche" },
  { name: "Université de Douala", role: "Recherche" },
];

const PILLARS = [
  {
    index: 1,
    title: "Cacao Premium tracé",
    description:
      "Collecte, fermentation et séchage de fèves premium auprès de 5 000 producteurs. Traçabilité blockchain + QR Code, conformité EUDR, certifications internationales.",
    bullets: [
      "18 000 t/an de capacité cible (2028)",
      "Rémunération producteur > 50 % du prix FOB",
      "Géolocalisation parcellaire ≥ 6 déc. WGS84",
    ],
    cta: { href: "/activites/cacao", label: "Découvrir l'activité" },
    image:
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1200&h=800&fit=crop&q=80",
    imageAlt: "Cabosses de cacao à maturation dans une plantation camerounaise",
    icon: <Sprout className="h-7 w-7" aria-hidden="true" />,
    tone: "cacao" as const,
    badge: "Pilier 1",
  },
  {
    index: 2,
    title: "Provenderie brevetée",
    description:
      "Valorisation des cabosses en aliments pour bétail haut de gamme : formulation CRI-PROVEND CACAO, brevet OAPI 20 ans. Provendes poulet de chair et porc d'engraissement.",
    bullets: [
      "Brevet OAPI 20 ans (échéance 2042)",
      "-15 % vs provendes soja importées",
      "250 000 t/an de marché adressable",
    ],
    cta: { href: "/activites/provendes", label: "Découvrir l'activité" },
    image:
      "https://images.unsplash.com/photo-1568526381923-caf3fd520382?w=1200&h=800&fit=crop&q=80",
    imageAlt: "Usine de fabrication de provendes animales",
    icon: <Factory className="h-7 w-7" aria-hidden="true" />,
    tone: "provende" as const,
    badge: "Pilier 2",
  },
  {
    index: 3,
    title: "Ferme intégrée",
    description:
      "Ferme de démonstration économique reproductible : 15 000 poulets/an, porcs d'engraissement, biofertilisants. Modèle d'insertion pour les jeunes et les femmes.",
    bullets: [
      "15 000 poulets de chair / an",
      "Insertion 40 %+ jeunes et femmes",
      "Biofertilisants à partir des fientes",
    ],
    cta: { href: "/activites/elevage", label: "Découvrir l'activité" },
    image:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=800&fit=crop&q=80",
    imageAlt: "Ferme intégrée avec bâtiments d'élevage modernes",
    icon: <TreePine className="h-7 w-7" aria-hidden="true" />,
    tone: "ferme" as const,
    badge: "Pilier 3",
  },
];

const RSE_PILLARS = [
  {
    icon: ShieldCheck,
    title: "Conformité EUDR",
    desc: "Traçabilité parcelle → conteneur, géoloc ≥ 6 décimales WGS84, vérification satellite Sentinel-2.",
    metric: "100 %",
    metricLabel: "Parcelles tracées",
  },
  {
    icon: Leaf,
    title: "100 % circulaire",
    desc: "Cabosses, biomasse, biofertilisants : tout est valorisé dans une logique d'économie circulaire.",
    metric: "0",
    metricLabel: "Déchet non valorisé",
  },
  {
    icon: Users,
    title: "Impact social",
    desc: "5 000 producteurs accompagnés, 1 000+ emplois créés, 40 %+ de jeunes et de femmes.",
    metric: "1 000+",
    metricLabel: "Emplois créés",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Grâce à la coopérative CRI, j'ai pu tripler ma production de cacao en 3 ans tout en préservant la forêt. Mes enfants iront à l'université.",
    author: "Marie NGO BIYIHA",
    role: "Productrice · Njombé-Penja · 32 ans d'expérience",
  },
  {
    quote:
      "La formation CacaoTrace et l'appui technique de CRI ont transformé ma plantation en modèle d'agroforesterie. Mon cacao est aujourd'hui acheté 60 % au-dessus du prix bord-champ.",
    author: "Pierre ESSOMBA",
    role: "Producteur · Village Ekombité · 18 ha en agroforesterie",
  },
  {
    quote:
      "Les provendes CRI-PROVEND CACAO ont réduit mes coûts d'élevage de 15 % tout en améliorant la qualité de ma chair de poulet. Un modèle à dupliquer.",
    author: "Sylvie MVONDO",
    role: "Éleveuse · Njombé · 5 000 poulets/an",
  },
  {
    quote:
      "Le programme d'insertion de CRI m'a permis de me former à la cacaoculture bio. Aujourd'hui, je gère ma propre parcelle certifiée.",
    author: "Junior KAMGA",
    role: "Jeune inséré · 24 ans · Coopérative de Tombel",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="main">
        {/* ─────── HERO IMMERSIF ─────── */}
        <PageHero
          badge="Cameroun · Bassin du Mungo · N°1 du cacao camerounais"
          title={
            <>
              L&apos;agropole circulaire
              <br />
              <span className="text-cri-gold">du cacao camerounais</span>
            </>
          }
          subtitle={
            <>
              Cacao premium <strong>zéro déforestation</strong>, provendes animales brevetées OAPI,
              traçabilité EUDR/CacaoTrace. Un modèle multi-revenus au service de{" "}
              <strong>5 000 producteurs</strong>.
            </>
          }
          variant="image"
          image="/brand/affiche-reference.png"
          imageAlt="Affiche officielle COCOA RANCH — N°1 du cacao camerounais"
          primaryCta={{ href: "/projet", label: "Découvrir le projet" }}
          secondaryCta={{ href: "/investisseurs", label: "Espace investisseurs" }}
        />

        {/* ─────── BANDE PARTENAIRES (preuve sociale) ─────── */}
        <section className="bg-cri-forest border-cri-canopy/40 border-t py-8 text-white">
          <div className="container-cri">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <p className="text-label text-cri-gold font-bold uppercase tracking-wider">
                Ils nous font confiance
              </p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {PARTNERS.map((p) => (
                  <div
                    key={p.name}
                    className="text-cri-parchment/80 transition-colors hover:text-white"
                    title={`${p.name} — ${p.role}`}
                  >
                    <p className="font-serif text-sm font-bold leading-tight">{p.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────── KPIs ASYMÉTRIQUES ─────── */}
        <SectionImpact
          title="Notre ambition à l'horizon 2028"
          subtitle="Les chiffres qui guident notre croissance"
          withPattern
        >
          <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              value={5000}
              label="Producteurs accompagnés"
              suffix="+"
              trend="up"
              description="Coopérative ancrée dans 6 villages du Bassin du Mungo"
            />
            <KpiCard
              value={200}
              label="Hectares de ranch moderne"
              suffix=" ha"
              trend="up"
              description="Modèle plantation agroforestière"
            />
            <KpiCard
              value={18}
              label="Capacité usine"
              suffix=" kt/an"
              trend="up"
              description="Fermentation, séchage, torréfaction, conditionnement"
            />
            <KpiCard
              value={1.7}
              label="Chiffre d'affaires cible"
              suffix=" Md FCFA"
              trend="up"
              description="Marché premium tracé EU"
            />
          </StaggerGroup>

          {/* Bandeau de crédibilité sous les KPIs */}
          <div className="text-cri-ink-muted mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            <div className="inline-flex items-center gap-2">
              <CheckCircle2 className="text-cri-canopy h-4 w-4" aria-hidden="true" />
              Conformité EUDR 2023/1115
            </div>
            <div className="inline-flex items-center gap-2">
              <CheckCircle2 className="text-cri-canopy h-4 w-4" aria-hidden="true" />
              Rainforest Alliance
            </div>
            <div className="inline-flex items-center gap-2">
              <CheckCircle2 className="text-cri-canopy h-4 w-4" aria-hidden="true" />
              Fair Trade
            </div>
            <div className="inline-flex items-center gap-2">
              <CheckCircle2 className="text-cri-canopy h-4 w-4" aria-hidden="true" />
              Brevet OAPI
            </div>
            <div className="inline-flex items-center gap-2">
              <CheckCircle2 className="text-cri-canopy h-4 w-4" aria-hidden="true" />
              ISO 22000
            </div>
          </div>
        </SectionImpact>

        {/* ─────── LES 3 PILIERS (refonte) ─────── */}
        <section className="section-parchment relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
            <CocoaPods className="h-full w-full" />
          </div>
          <div className="container-cri relative">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <span className="text-label text-cri-cacao inline-flex items-center gap-2 font-bold uppercase tracking-wider">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Notre modèle
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              <h2 className="text-cri-forest mt-4 font-serif text-4xl font-bold md:text-5xl">
                Trois piliers, une circularité
              </h2>
              <p className="text-cri-humus mt-5 text-lg leading-relaxed md:text-xl">
                Nous valorisons <strong>100 %</strong> des sous-produits du cacao — fèves, cabosses,
                biomasse — dans une logique d&apos;économie circulaire brevetée OAPI.
              </p>
            </div>

            <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
              {PILLARS.map((pillar) => (
                <PillarCard key={pillar.index} {...pillar} />
              ))}
            </div>

            {/* Bandeau immersif : plantation au soleil */}
            <div className="rounded-cri border-cri-cacao/20 shadow-cri-md relative mt-12 overflow-hidden border-2">
              <PlantationSun className="w-full" />
              <div className="from-cri-forest-dark/80 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 max-w-2xl md:bottom-10 md:left-10 md:right-auto">
                <span className="bg-cri-gold text-cri-humus text-label rounded-cri mb-3 inline-block px-3 py-1 font-bold uppercase tracking-wider">
                  Bassin du Mungo
                </span>
                <p className="font-serif text-2xl leading-snug text-white md:text-3xl">
                  200 hectares de cacaoyers cultivés en agroforesterie, à l&apos;ombre des arbres
                  forestiers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────── ENGAGEMENT RSE (3 colonnes redesign) ─────── */}
        <section className="section bg-cri-forest relative overflow-hidden text-white">
          {/* Orbes dorées décoratives */}
          <div
            className="bg-cri-gold/10 pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div
            className="bg-cri-gold/10 pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div
            className="bg-cri-pattern-feve pointer-events-none absolute inset-0 opacity-[0.04]"
            aria-hidden="true"
          />

          <div className="container-cri relative">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <span className="text-label text-cri-gold inline-flex items-center gap-2 font-bold uppercase tracking-wider">
                <Leaf className="h-4 w-4" aria-hidden="true" />
                Engagement RSE
              </span>
              <h2 className="mt-4 font-serif text-4xl font-bold text-white md:text-5xl">
                Zéro déforestation, <br className="hidden md:block" />
                zéro déchet, zéro CO₂
              </h2>
              <p className="text-cri-parchment mt-5 text-lg leading-relaxed">
                Notre engagement RSE est adossé au programme <strong>CIMAR-Technopôle</strong> :
                promotion de l&apos;agroécologie, formation-insertion des jeunes et des femmes,
                diffusion des bio-intrants.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {RSE_PILLARS.map((item, idx) => (
                <div
                  key={item.title}
                  className="rounded-cri hover:border-cri-gold/40 group relative border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div className="bg-cri-gold/15 border-cri-gold/30 text-cri-gold group-hover:bg-cri-gold/25 flex h-14 w-14 items-center justify-center rounded-full border transition-colors">
                      <item.icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <span
                      className="text-cri-gold/30 font-serif text-4xl font-bold leading-none"
                      aria-hidden="true"
                    >
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">{item.title}</h3>
                  <p className="text-cri-parchment/80 mt-3 leading-relaxed">{item.desc}</p>
                  <div className="mt-6 border-t border-white/10 pt-6">
                    <p className="text-cri-gold font-serif text-3xl font-bold">{item.metric}</p>
                    <p className="text-cri-parchment/60 mt-1 text-xs uppercase tracking-wider">
                      {item.metricLabel}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/impact"
                className="btn-gold inline-flex items-center px-7 py-3.5 text-base"
              >
                Lire notre rapport d&apos;impact
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─────── TÉMOIGNAGES PRODUCTEURS (carrousel) ─────── */}
        <section className="section bg-cri-cream">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-label text-cri-cacao inline-flex items-center gap-2 font-bold uppercase tracking-wider">
                <Users className="h-4 w-4" aria-hidden="true" />
                Ils témoignent
              </span>
              <h2 className="text-cri-forest mt-3 font-serif text-4xl font-bold md:text-5xl">
                La voix des producteurs
              </h2>
              <p className="text-cri-humus mt-4 text-lg">
                Producteurs, éleveuses, jeunes insérés : ils racontent l&apos;impact de CRI sur leur
                quotidien.
              </p>
            </RevealOnScroll>

            <Carousel
              options={{ loop: true, align: "start" }}
              autoplay
              autoplayDelay={7000}
              className="mx-auto max-w-4xl"
            >
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i} className="w-full px-2 md:px-4">
                  <div className="card border-cri-cacao/20 flex min-h-[280px] flex-col border-2 bg-white p-8 md:p-12">
                    <Quote
                      className="text-cri-gold mb-4 h-10 w-10 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <blockquote className="flex-1">
                      <p className="text-cri-humus font-serif text-xl italic leading-relaxed md:text-2xl">
                        «&nbsp;{t.quote}&nbsp;»
                      </p>
                    </blockquote>
                    <footer className="border-cri-cacao/20 mt-6 border-t pt-6">
                      <p className="text-cri-forest font-bold">{t.author}</p>
                      <p className="text-cri-ink-muted mt-1 text-sm">{t.role}</p>
                    </footer>
                  </div>
                </CarouselItem>
              ))}
            </Carousel>
          </div>
        </section>

        {/* ─────── TÉMOIGNAGE / CHIFFRE CLÉ ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="card bg-cri-gradient relative mx-auto max-w-5xl overflow-hidden p-10 text-center text-white md:p-16">
              <div
                className="bg-cri-gold/20 pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full blur-3xl"
                aria-hidden="true"
              />
              <div
                className="bg-cri-gold/20 pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full blur-3xl"
                aria-hidden="true"
              />
              <Quote
                className="text-cri-gold mx-auto mb-6 h-12 w-12 opacity-80"
                aria-hidden="true"
              />
              <blockquote className="relative">
                <p className="font-serif text-2xl italic leading-relaxed md:text-3xl lg:text-4xl">
                  « Le cacao africain de demain sera tracé, circulaire et équitable. Notre programme
                  prouve que la réconciliation entre performance économique, inclusion sociale et
                  préservation de l&apos;environnement est possible. »
                </p>
                <footer className="text-cri-parchment mt-8">
                  <p className="font-bold text-white">Dr. Christian MBARGA</p>
                  <p className="mt-1 text-sm">Directeur Général · AGRO-PME Fondation</p>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ─────── LOCALISATION ─────── */}
        <section className="section-parchment bg-cri-cream">
          <div className="container-cri">
            <div className="grid items-center gap-8 md:grid-cols-5 lg:gap-12">
              <div className="md:col-span-3">
                <span className="text-label text-cri-cacao inline-flex items-center gap-2 font-bold uppercase tracking-wider">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  Localisation
                </span>
                <h2 className="text-cri-forest mt-3 font-serif text-4xl font-bold md:text-5xl">
                  Cameroun, Bassin du Mungo
                </h2>
                <p className="text-cri-humus mt-5 text-lg leading-relaxed">
                  Le Bassin du Mungo, au sud-ouest du Cameroun, offre des conditions pédoclimatiques
                  idéales pour la cacaoculture premium : pluviométrie 2 000-2 500 mm/an, sols
                  volcaniques riches, savoir-faire ancestral des producteurs.
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="rounded-cri border-cri-cacao/20 flex items-start gap-4 border bg-white p-4">
                    <div className="bg-cri-cacao/10 text-cri-cacao flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-cri-cacao text-xs font-bold uppercase tracking-wider">
                        Région
                      </p>
                      <p className="text-cri-humus font-bold">Sud-Ouest, Cameroun</p>
                    </div>
                  </li>
                  <li className="rounded-cri border-cri-cacao/20 flex items-start gap-4 border bg-white p-4">
                    <div className="bg-cri-cacao/10 text-cri-cacao flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                      <TreePineIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-cri-cacao text-xs font-bold uppercase tracking-wider">
                        Bassin
                      </p>
                      <p className="text-cri-humus font-bold">6 villages cacaoyers</p>
                    </div>
                  </li>
                  <li className="rounded-cri border-cri-cacao/20 flex items-start gap-4 border bg-white p-4">
                    <div className="bg-cri-cacao/10 text-cri-cacao flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                      <TrendingUp className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-cri-cacao text-xs font-bold uppercase tracking-wider">
                        Pluviométrie
                      </p>
                      <p className="text-cri-humus font-bold">2 000 - 2 500 mm / an</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="card bg-cri-gradient relative overflow-hidden p-10 text-white md:col-span-2">
                <div
                  className="bg-cri-gold/20 pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl"
                  aria-hidden="true"
                />
                <Award className="text-cri-gold mb-4 h-12 w-12" aria-hidden="true" />
                <h3 className="font-serif text-2xl font-bold text-white">AGRO-PME Fondation</h3>
                <p className="text-cri-parchment/90 mt-3 leading-relaxed">
                  Le programme CRI est porté par AGRO-PME Fondation, association camerounaise dédiée
                  au développement de l&apos;agro-industrie durable et à l&apos;inclusion économique
                  des jeunes et des femmes.
                </p>
                <Link
                  href="/projet"
                  className="text-cri-gold hover:text-cri-gold-light group mt-6 inline-flex items-center font-bold"
                >
                  Découvrir AGRO-PME
                  <ArrowRight
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            {/* Carte stylisée Mungo en pleine largeur */}
            <div className="relative mt-12">
              <div className="bg-cri-cacao text-cri-parchment text-label rounded-cri shadow-cri absolute -top-3 left-8 z-10 px-4 py-1 font-bold uppercase tracking-wider">
                Bassin du Mungo
              </div>
              <div className="card border-cri-cacao/30 overflow-hidden border-2">
                <MapMungo className="w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* ─────── CTA INVESTISSEURS (split avec image) ─────── */}
        <SectionCTA
          variant="split"
          eyebrow="Espace investisseurs"
          title="Investissez dans le cacao africain durable"
          description="3,2 Md FCFA de financement recherché sur 2026-2030 pour un projet mature, différencié et bankable. Accédez à notre data room sécurisée."
          primaryCta={{
            href: "/investisseurs",
            label: "Demander l'accès investisseur",
          }}
          secondaryCta={{ href: "/contact", label: "Nous contacter" }}
          image="/brand/rs-reference.png"
          imageAlt="Visuel officiel COCOA RANCH — branding premium"
        />
      </main>

      <Footer />
    </>
  );
}
