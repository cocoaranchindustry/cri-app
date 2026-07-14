import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Lock, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { SectionImpact } from "@/components/ui/SectionImpact";
import { KpiCard } from "@/components/ui/KpiCard";
import { DataTable } from "@/components/ui/DataTable";
import { ChartGrowth } from "@/components/ui/Illustrations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace investisseurs — Data room sécurisée",
  description:
    "Accédez à la data room investisseurs de Cocoa Ranch & Industry : 3,2 Md FCFA recherchés, ROI 18-22 %, modèle bankable, conformité EUDR.",
  keywords: [
    "investir cacao Cameroun",
    "data room cacao",
    "agropole Afrique",
    "ROI cacao",
    "financement projet",
  ],
  openGraph: {
    title: "Espace investisseurs — Cocoa Ranch & Industry",
    description: "3,2 Md FCFA recherchés, ROI 18-22 %, modèle bankable, conformité EUDR.",
    type: "website",
  },
};

/**
 * Page /investisseurs — Data room investisseurs
 * Brandbook CRI v5 : dominante verte, or cacao, parchemin.
 *
 * Sections :
 * 1. Hero
 * 2. KPIs financiers
 * 3. Tableau ROI / payback
 * 4. Garanties
 * 5. Process (KYC + accès)
 * 6. CTA
 */

interface FinancialRow extends Record<string, string> {
  horizon: string;
  ca: string;
  ebitda: string;
  roi: string;
  payback: string;
}

const FINANCIAL_PROJECTIONS: FinancialRow[] = [
  {
    horizon: "2026",
    ca: "0,4 Md FCFA",
    ebitda: "0,05 Md FCFA",
    roi: "—",
    payback: "— (construction)",
  },
  {
    horizon: "2027",
    ca: "0,9 Md FCFA",
    ebitda: "0,18 Md FCFA",
    roi: "8 %",
    payback: "Phase de montée",
  },
  { horizon: "2028", ca: "1,7 Md FCFA", ebitda: "0,42 Md FCFA", roi: "18 %", payback: "6,5 ans" },
  { horizon: "2029", ca: "2,4 Md FCFA", ebitda: "0,65 Md FCFA", roi: "22 %", payback: "5,2 ans" },
  { horizon: "2030", ca: "3,2 Md FCFA", ebitda: "0,92 Md FCFA", roi: "25 %", payback: "4,5 ans" },
];

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: "Conformité EUDR",
    text: "Traçabilité totale, prêt pour les exigences du marché européen depuis 2025.",
  },
  {
    icon: Award,
    title: "Certifications internationales",
    text: "Rainforest Alliance, Fair Trade, ISO 22000, HACCP. Audits tiers annuels.",
  },
  {
    icon: Lock,
    title: "Gouvernance rigoureuse",
    text: "Comité d'investissement indépendant, reporting trimestriel, audit annuel Big 4.",
  },
  {
    icon: Users,
    title: "Équipe expérimentée",
    text: "Direction opérationnelle cumulant 80+ ans d'expérience dans l'agro-industrie africaine.",
  },
];

const PROCESS_STEPS = [
  {
    num: "1",
    title: "Demande d'accès",
    text: "Remplissez le formulaire ci-dessous. Sous 48 h, validation de votre statut investisseur.",
  },
  {
    num: "2",
    title: "Signature du NDA",
    text: "Signature électronique d'un accord de confidentialité. Activation de votre compte data room.",
  },
  {
    num: "3",
    title: "Accès data room",
    text: "Documentation complète : business plan, audit juridique, audit technique, audit financier.",
  },
  {
    num: "4",
    title: "Due diligence",
    text: "Échange direct avec l'équipe, visite terrain, structuration de l'investissement.",
  },
];

export default function InvestisseursPage() {
  return (
    <>
      <Navbar />

      <main id="main">
        {/* ─────── HERO ─────── */}
        <PageHero
          badge="Espace investisseurs"
          title="Investissez dans le cacao africain durable"
          subtitle={
            <>
              <strong>3,2 Md FCFA</strong> recherchés sur 2026-2030 pour un projet mature,
              différencié et bankable. <strong>ROI cible 18-22 %</strong>, payback 4,5 ans à pleine
              capacité.
            </>
          }
        />

        {/* ─────── KPIs FINANCIERS ─────── */}
        <SectionImpact
          title="Projections financières 2026-2030"
          subtitle="Modèle financier audité par un cabinet Big 4 (audit Q1 2026)"
          withPattern
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            <KpiCard
              value={3.2}
              label="Financement recherché"
              prefix=""
              suffix=" Md FCFA"
              trend="up"
              description="Sur 5 ans (2026-2030)"
            />
            <KpiCard
              value={22}
              label="ROI cible"
              suffix=" %"
              trend="up"
              description="À pleine capacité (2030)"
            />
            <KpiCard
              value={4.5}
              label="Payback"
              suffix=" ans"
              trend="down"
              description="Délai de récupération"
            />
            <KpiCard
              value={1000}
              label="Emplois créés"
              suffix="+"
              trend="up"
              description="Directs et indirects (cible 2028)"
            />
          </div>
        </SectionImpact>

        {/* ─────── BANDE IMMERSIVE : COURBE DE CROISSANCE ─────── */}
        <section className="bg-cri-forest relative">
          <ChartGrowth className="w-full opacity-90" />
          <div className="from-cri-forest-dark/85 via-cri-forest/40 pointer-events-none absolute inset-0 bg-gradient-to-r to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 max-w-2xl md:bottom-12 md:left-12">
            <span className="bg-cri-gold text-cri-humus text-label rounded-cri mb-3 inline-block px-3 py-1 font-bold uppercase tracking-wider">
              Modèle bankable
            </span>
            <p className="font-serif text-2xl leading-snug text-white md:text-3xl">
              ROI 18-22 %, payback 4,5 ans, scoring A- : un dossier structuré et audité.
            </p>
          </div>
        </section>

        {/* ─────── TABLEAU PROJECTIONS ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                Modèle financier
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl">Projections sur 5 ans</h2>
              <p className="text-cri-humus mt-4 text-lg">
                Chiffre d&apos;affaires, EBITDA, ROI et payback par horizon. Hypothèses détaillées
                disponibles en data room.
              </p>
            </div>
            <DataTable
              variant="bordered"
              caption="Projections consolidées · scénario médian · 2026-2030"
              columns={[
                { key: "horizon", label: "Horizon" },
                { key: "ca", label: "Chiffre d'affaires" },
                { key: "ebitda", label: "EBITDA" },
                { key: "roi", label: "ROI estimé" },
                { key: "payback", label: "Payback" },
              ]}
              rows={FINANCIAL_PROJECTIONS}
            />
          </div>
        </section>

        {/* ─────── GARANTIES ─────── */}
        <section className="section bg-cri-cream">
          <div className="container-cri">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                Sécurisation
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl">Pourquoi investir dans CRI</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {GUARANTEES.map((g) => (
                <article key={g.title} className="card text-center">
                  <div className="bg-cri-forest mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-white">
                    <g.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg">{g.title}</h3>
                  <p className="text-cri-humus mt-2 text-sm">{g.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── PROCESS ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                Process investisseur
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl">4 étapes pour accéder à la data room</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {PROCESS_STEPS.map((s) => (
                <article key={s.num} className="card">
                  <div className="bg-cri-cacao mb-4 flex h-12 w-12 items-center justify-center rounded-full font-serif text-xl font-bold text-white">
                    {s.num}
                  </div>
                  <h3 className="text-lg">{s.title}</h3>
                  <p className="text-cri-humus mt-2 text-sm">{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── FORMULAIRE KYC ─────── */}
        <section id="kyc-form" className="section bg-cri-forest text-white">
          <div className="container-cri">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <span className="text-label text-cri-gold font-bold uppercase tracking-wider">
                  Demande d&apos;accès
                </span>
                <h2 className="mt-3 text-3xl text-white md:text-4xl">Accès investisseur</h2>
                <p className="text-cri-parchment mt-4 text-lg">
                  Remplissez ce formulaire. Notre équipe vous recontacte sous 48 h ouvrées pour
                  valider votre statut et activer votre accès à la data room.
                </p>
                <ul className="text-cri-parchment mt-6 space-y-2 text-sm">
                  <li>✓ Réponse sous 48 h ouvrées</li>
                  <li>✓ Confidentialité garantie (NDA obligatoire)</li>
                  <li>✓ Données chiffrées (AES-256, HDS)</li>
                  <li>✓ Conforme RGPD et directives ANTIC</li>
                </ul>
              </div>
              <form
                className="text-cri-humus rounded-cri space-y-4 bg-white p-8"
                action="/api/lead"
                method="POST"
              >
                <h3 className="text-cri-forest text-xl font-bold">Formulaire investisseur</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="inv-firstname" className="mb-1 block text-sm font-bold">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="inv-firstname"
                      name="firstname"
                      required
                      className="border-cri-border rounded-cri w-full border px-3 py-2"
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="inv-lastname" className="mb-1 block text-sm font-bold">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="inv-lastname"
                      name="lastname"
                      required
                      className="border-cri-border rounded-cri w-full border px-3 py-2"
                      autoComplete="family-name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="inv-email" className="mb-1 block text-sm font-bold">
                    Email professionnel *
                  </label>
                  <input
                    type="email"
                    id="inv-email"
                    name="email"
                    required
                    className="border-cri-border rounded-cri w-full border px-3 py-2"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label htmlFor="inv-org" className="mb-1 block text-sm font-bold">
                    Organisation / Fonds *
                  </label>
                  <input
                    type="text"
                    id="inv-org"
                    name="organization"
                    required
                    className="border-cri-border rounded-cri w-full border px-3 py-2"
                    autoComplete="organization"
                  />
                </div>
                <div>
                  <label htmlFor="inv-type" className="mb-1 block text-sm font-bold">
                    Type d&apos;investisseur *
                  </label>
                  <select
                    id="inv-type"
                    name="type"
                    required
                    className="border-cri-border rounded-cri w-full border px-3 py-2"
                  >
                    <option value="">Sélectionnez...</option>
                    <option>Fonds d&apos;impact</option>
                    <option>Fonds de capital-investissement</option>
                    <option>Banque / SFI</option>
                    <option>Family office</option>
                    <option>Coopérative / SICA</option>
                    <option>Industriel agroalimentaire</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="inv-amount" className="mb-1 block text-sm font-bold">
                    Ticket envisagé (FCFA)
                  </label>
                  <select
                    id="inv-amount"
                    name="amount"
                    className="border-cri-border rounded-cri w-full border px-3 py-2"
                  >
                    <option value="">Sélectionnez...</option>
                    <option>&lt; 100 M FCFA</option>
                    <option>100-500 M FCFA</option>
                    <option>500 M - 1 Md FCFA</option>
                    <option>1-2 Md FCFA</option>
                    <option>&gt; 2 Md FCFA</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="inv-message" className="mb-1 block text-sm font-bold">
                    Message (optionnel)
                  </label>
                  <textarea
                    id="inv-message"
                    name="message"
                    rows={3}
                    className="border-cri-border rounded-cri w-full border px-3 py-2"
                  />
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="inv-consent"
                    name="consent"
                    required
                    className="mt-1"
                  />
                  <label htmlFor="inv-consent" className="text-cri-humus text-xs">
                    J&apos;accepte que mes données soient traitées conformément à la{" "}
                    <Link href="/privacy" className="text-cri-cacao underline">
                      politique de confidentialité
                    </Link>{" "}
                    (RGPD, ANTIC). *
                  </label>
                </div>
                <button type="submit" className="btn-gold w-full">
                  Demander l&apos;accès
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
