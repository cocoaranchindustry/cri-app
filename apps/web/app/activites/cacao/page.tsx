import { Sprout, MapPin, Award, ShieldCheck, Beaker, Truck, QrCode } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionImpact } from "@/components/ui/SectionImpact";
import { KpiCard } from "@/components/ui/KpiCard";
import { DataTable } from "@/components/ui/DataTable";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { HeroCabosse, PlantationSun } from "@/components/ui/Illustrations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cacao Premium — Du planteur au chocolatier",
  description:
    "Cacao premium tracé du Cameroun : 18 000 t/an, 5 000 producteurs, conformité EUDR, certifications Rainforest Alliance et Fair Trade. Qualité zéro défaut garantie.",
  keywords: [
    "cacao premium Cameroun",
    "cacao tracé",
    "fermentation cacao",
    "EUDR cacao",
    "Bassin du Mungo",
    "CacaoTrace",
  ],
  openGraph: {
    title: "Cacao Premium — Cocoa Ranch & Industry",
    description:
      "Du planteur camerounais au chocolatier européen, en passant par une fermentation et un séchage maîtrisés.",
    type: "website",
  },
};

/**
 * Page /activites/cacao — Pilier 1
 * Brandbook CRI v5 : dominante verte, or cacao, parchemin.
 *
 * Sections :
 * 1. Hero
 * 2. KPIs
 * 3. Processus (de la parcelle au conteneur)
 * 4. Conformité EUDR + CacaoTrace
 * 5. Tableau des variétés
 * 6. CTA
 */

interface VarietyRow extends Record<string, string> {
  variete: string;
  origine: string;
  profil: string;
  acidite: string;
  prix: string;
}

const VARIETIES: VarietyRow[] = [
  {
    variete: "Forastero Premium",
    origine: "Cameroun · Bassin du Mungo",
    profil: "Cacao corsé, notes de cacao pur, faible amertume",
    acidite: "Faible (pH 4,8-5,0)",
    prix: "3,2-3,8 €/kg FOB",
  },
  {
    variete: "Trinitario Fin",
    origine: "Cameroun · Bassin du Mungo",
    profil: "Notes fruitées, équilibrées, longueur en bouche",
    acidite: "Moyenne (pH 4,5-4,8)",
    prix: "4,0-4,8 €/kg FOB",
  },
  {
    variete: "Criollo Local",
    origine: "Cameroun · Sélection parcelle",
    profil: "Notes florales, douces, faible astringence",
    acidite: "Douce (pH 5,0-5,2)",
    prix: "5,5-6,5 €/kg FOB",
  },
];

const PROCESS_STEPS = [
  {
    icon: MapPin,
    title: "1. Collecte en parcelle",
    text: "Cabosses récoltées à maturité optimale (145-160 jours post-floraison), sur les 6 villages de la coopérative.",
  },
  {
    icon: Sprout,
    title: "2. Fermentation contrôlée",
    text: "Caisses de fermentation bois 5-7 jours. Courbes de température et pH pilotées par capteurs IoT.",
  },
  {
    icon: Beaker,
    title: "3. Séchage solaire",
    text: "Séchoirs solaire-tunnel, 7-10 jours. Humidité résiduelle 6,5 % maximum. Remuage régulier.",
  },
  {
    icon: ShieldCheck,
    title: "4. Contrôle qualité",
    text: "Test de coupe, comptage des défauts, analyse humidité. Cahier des charges client respecté à 100 %.",
  },
  {
    icon: QrCode,
    title: "5. Traçabilité CacaoTrace",
    text: "QR code unique par lot, lié au producteur, à la parcelle, à la date de récolte, aux analyses laboratoire.",
  },
  {
    icon: Truck,
    title: "6. Conditionnement et export",
    text: "Sacs de jute 60-65 kg, big-bags 1 t pour les clients industriels. Livraison FOB Douala.",
  },
];

export default function CacaoPage() {
  return (
    <>
      <Navbar />

      <main id="main">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Activités", href: "/activites" },
            { label: "Cacao Premium" },
          ]}
        />

        {/* ─────── HERO ─────── */}
        <PageHero
          badge="Pilier 1 · Cacao Premium"
          title="Du planteur camerounais au chocolatier européen"
          subtitle={
            <>
              Notre filière cacao premium mise sur la <strong>qualité organoleptique</strong>, la{" "}
              <strong>traçabilité totale</strong> et une <strong>rémunération équitable</strong> des
              5 000 producteurs de la coopérative.
            </>
          }
          image="/brand/affiche-reference.png"
          imageAlt="Cabosses de cacao à maturation — visuel officiel COCOA RANCH"
        />

        {/* ─────── BANDE IMMERSIVE : CABOSSE OUVERTE ─────── */}
        <section className="relative h-64 overflow-hidden md:h-96">
          <HeroCabosse className="h-full w-full object-cover" />
          <div className="from-cri-forest-dark/80 pointer-events-none absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 max-w-2xl md:bottom-12 md:left-12">
            <span className="bg-cri-gold text-cri-humus text-label rounded-cri mb-3 inline-block px-3 py-1 font-bold uppercase tracking-wider">
              Le geste ancestral
            </span>
            <p className="font-serif text-2xl leading-snug text-white md:text-3xl">
              L&apos;ouverture de la cabosse à la machette, l&apos;extraction des fèves, la
              fermentation en boîtes de bananier.
            </p>
          </div>
        </section>

        {/* ─────── KPIs ─────── */}
        <SectionImpact
          title="Cacao Premium en chiffres (objectif 2028)"
          subtitle="Les indicateurs clés de notre filière cacao"
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            <KpiCard
              value={18000}
              label="Capacité de production"
              suffix=" t/an"
              trend="up"
              description="Fèves premium fermentées et séchées"
            />
            <KpiCard
              value={5000}
              label="Producteurs"
              suffix="+"
              trend="up"
              description="Coopérative dans 6 villages du Mungo"
            />
            <KpiCard
              value={50}
              label="Rémunération producteur"
              suffix=" %+"
              trend="up"
              description="Du prix FOB, soit > 2× le prix bord-champ"
            />
            <KpiCard
              value={100}
              label="Traçabilité"
              suffix=" %"
              trend="up"
              description="Parcelle → conteneur (géoloc ≥ 6 déc.)"
            />
          </div>
        </SectionImpact>

        {/* ─────── PROCESSUS ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                Savoir-faire
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl">Six étapes de la parcelle au conteneur</h2>
              <p className="text-cri-humus mt-4 text-lg">
                Un processus artisanal maîtrisé et outillé, pour livrer un cacao d&apos;exception,
                homogène et tracé.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {PROCESS_STEPS.map((step) => (
                <article key={step.title} className="card">
                  <div className="bg-cri-cacao mb-4 flex h-12 w-12 items-center justify-center rounded-full text-white">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg">{step.title}</h3>
                  <p className="text-cri-humus mt-2 text-sm">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── TABLEAU DES VARIÉTÉS ─────── */}
        <section className="section bg-cri-cream">
          <div className="container-cri">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                Catalogue
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl">Nos variétés de cacao</h2>
            </div>
            <DataTable
              variant="bordered"
              caption="Indications tarifaires 2026 (FOB Douala, contrats ≥ 10 t)"
              columns={[
                { key: "variete", label: "Variété" },
                { key: "origine", label: "Origine" },
                { key: "profil", label: "Profil aromatique" },
                { key: "acidite", label: "Acidité" },
                { key: "prix", label: "Prix indicatif" },
              ]}
              rows={VARIETIES}
            />
          </div>
        </section>

        {/* ─────── CACAOTRACE & EUDR ─────── */}
        <section className="section-parchment relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
            <PlantationSun className="h-full w-full" />
          </div>
          <div className="container-cri relative">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                  Traçabilité
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl">CacaoTrace, prêt pour EUDR</h2>
                <p className="text-cri-humus mt-4 text-lg">
                  Notre plateforme <strong>CacaoTrace</strong> collecte les données terrain via une
                  application mobile dédiée, vérifie la conformité par imagerie satellite, et génère
                  automatiquement les déclarations de diligence raisonnée imposées par le règlement
                  EUDR 2023/1115.
                </p>
                <ul className="text-cri-humus mt-6 space-y-3">
                  {[
                    "Géolocalisation parcellaire ≥ 6 décimales WGS84",
                    "Polygons et surfaces par satellite Sentinel-2",
                    "Vérification de non-déforestation 2020-2025",
                    "Signature électronique des déclarations DDS",
                    "API REST pour intégration ERP client",
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="text-cri-gold mr-2 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card bg-cri-gradient p-12 text-white">
                <Award className="text-cri-gold h-12 w-12" aria-hidden="true" />
                <h3 className="mt-4 text-2xl text-white">Certifications & labels</h3>
                <ul className="text-cri-parchment mt-6 space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="text-cri-gold text-xl">★</span>
                    <span>Rainforest Alliance (2024)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-cri-gold text-xl">★</span>
                    <span>Fair Trade (2024)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-cri-gold text-xl">★</span>
                    <span>EUDR Ready (2025)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-cri-gold text-xl">★</span>
                    <span>ISO 22000 (2025)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-cri-gold text-xl">★</span>
                    <span>HACCP (2024)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─────── CTA ─────── */}
        <SectionCTA
          title="Devenez client de notre cacao premium"
          description="Nous fournissons les chocolatiers artisanaux, les marques bean-to-bar et les industriels agroalimentaires en Europe et en Amérique du Nord."
          primaryCta={{ href: "/contact", label: "Demander un devis" }}
          secondaryCta={{ href: "/produits", label: "Voir nos produits" }}
          variant="gold"
        />
      </main>

      <Footer />
    </>
  );
}
