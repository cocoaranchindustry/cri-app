import Link from "next/link";
import { ArrowRight, FileText, Download, Calendar, Tag } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { ChartGrowth } from "@/components/ui/Illustrations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications — Rapports, études, fiches techniques",
  description:
    "Téléchargements gratuits : rapport d'impact 2025, études techniques, fiches produits, brevets, présentations investisseurs.",
  keywords: [
    "rapport impact cacao",
    "études techniques cacao",
    "fiches produits",
    "data room investisseur",
  ],
  openGraph: {
    title: "Publications — Cocoa Ranch & Industry",
    description:
      "Rapports, études, fiches produits : toute la documentation officielle du programme CRI.",
    type: "website",
  },
};

/**
 * Page /publications — Centre de documentation
 * Brandbook CRI v5 : dominante verte, or cacao, parchemin.
 *
 * Sections :
 * 1. Hero
 * 2. Publications par catégorie
 * 3. CTA
 */

interface Publication {
  title: string;
  desc: string;
  category: string;
  date: string;
  format: string;
  size: string;
  href: string;
}

const PUBLICATIONS: Publication[] = [
  {
    title: "Rapport d'impact 2025",
    desc: "Bilan complet de notre performance ESG (40 pages, audits tiers).",
    category: "Rapport",
    date: "Mars 2026",
    format: "PDF",
    size: "4,2 Mo",
    href: "/contact",
  },
  {
    title: "Étude technique CRI-PROVEND CACAO",
    desc: "Validation zootechnique sur poulets de chair et porcs (publication revue à comité de lecture).",
    category: "Étude",
    date: "Janvier 2026",
    format: "PDF",
    size: "1,8 Mo",
    href: "/contact",
  },
  {
    title: "Plaquette institutionnelle 2026",
    desc: "Présentation synthétique du programme, 12 pages, FR/EN.",
    category: "Plaquette",
    date: "Février 2026",
    format: "PDF",
    size: "2,1 Mo",
    href: "/contact",
  },
  {
    title: "Business plan investisseur 2026-2030",
    desc: "Modèle financier détaillé, projections 5 ans, hypothèses, plan de remboursement.",
    category: "Business plan",
    date: "Février 2026",
    format: "PDF",
    size: "3,5 Mo",
    href: "/investisseurs",
  },
  {
    title: "Fiche technique — Cacao Forastero Premium",
    desc: "Spécifications produit, profil aromatique, certifications.",
    category: "Fiche produit",
    date: "Janvier 2026",
    format: "PDF",
    size: "650 ko",
    href: "/contact",
  },
  {
    title: "Fiche technique — CRI-PROVEND CACAO Poulet",
    desc: "Composition, valeurs nutritionnelles, mode d'emploi.",
    category: "Fiche produit",
    date: "Janvier 2026",
    format: "PDF",
    size: "480 ko",
    href: "/contact",
  },
  {
    title: "Dossier de presse 2026",
    desc: "Communiqué de presse, biographies, photos libre de droits.",
    category: "Presse",
    date: "Mars 2026",
    format: "ZIP",
    size: "12 Mo",
    href: "/contact",
  },
  {
    title: "Présentation investisseurs (data room teaser)",
    desc: "Version synthétique 15 slides, projection investisseur.",
    category: "Présentation",
    date: "Mars 2026",
    format: "PDF",
    size: "5,8 Mo",
    href: "/investisseurs",
  },
];

const CATEGORIES = [
  "Toutes",
  "Rapport",
  "Étude",
  "Plaquette",
  "Business plan",
  "Fiche produit",
  "Présentation",
  "Presse",
];

export default function PublicationsPage() {
  return (
    <>
      <Navbar />

      <main id="main">
        {/* ─────── HERO ─────── */}
        <PageHero
          badge="Centre de documentation"
          title="Publications officielles"
          subtitle={
            <>
              Rapports d&apos;impact, études techniques, fiches produits, business plan : accédez à
              toute la documentation officielle du programme CRI.
            </>
          }
        />

        {/* ─────── BANDE IMMERSIVE : COURBE TRAJECTOIRE ─────── */}
        <section className="relative h-48 md:h-64">
          <ChartGrowth className="absolute inset-0 h-full w-full object-cover" />
          <div className="from-cri-forest-dark/85 via-cri-forest/50 absolute inset-0 bg-gradient-to-r to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 max-w-2xl md:bottom-10 md:left-12">
            <span className="bg-cri-gold text-cri-humus text-label rounded-cri mb-2 inline-block px-3 py-1 font-bold uppercase tracking-wider">
              Trajectoire 2026-2030
            </span>
            <p className="font-serif text-xl leading-snug text-white md:text-2xl">
              Rapports d&apos;impact, audits tiers, business plan : toute la documentation de
              référence.
            </p>
          </div>
        </section>

        {/* ─────── FILTRES (UI) ─────── */}
        <section className="bg-cri-parchment border-cri-cacao/20 border-y">
          <div className="container-cri py-6">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat, idx) => (
                <button
                  key={cat}
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    idx === 0
                      ? "bg-cri-forest text-white"
                      : "text-cri-cacao border-cri-cacao/30 hover:bg-cri-cacao border bg-white hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── LISTE PUBLICATIONS ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="grid gap-4">
              {PUBLICATIONS.map((pub) => (
                <article key={pub.title} className="card hover:shadow-cri-md transition-shadow">
                  <div className="grid items-center gap-4 md:grid-cols-12">
                    <div className="flex justify-center md:col-span-1">
                      <FileText className="text-cri-cacao h-10 w-10" aria-hidden="true" />
                    </div>
                    <div className="md:col-span-7">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="bg-cri-gold/20 text-cri-cacao inline-flex items-center rounded-full px-2 py-0.5 font-bold uppercase tracking-wider">
                          <Tag className="mr-1 h-3 w-3" aria-hidden="true" />
                          {pub.category}
                        </span>
                        <span className="text-cri-ink-muted inline-flex items-center">
                          <Calendar className="mr-1 h-3 w-3" aria-hidden="true" />
                          {pub.date}
                        </span>
                        <span className="text-cri-ink-muted">
                          {pub.format} · {pub.size}
                        </span>
                      </div>
                      <h3 className="mt-2 text-lg">{pub.title}</h3>
                      <p className="text-cri-humus mt-1 text-sm">{pub.desc}</p>
                    </div>
                    <div className="flex gap-2 md:col-span-4 md:justify-end">
                      <Link
                        href={pub.href}
                        className="btn bg-cri-forest hover:bg-cri-canopy text-sm text-white"
                      >
                        <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                        Télécharger
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── DATA ROOM ─────── */}
        <section className="section bg-cri-forest text-white">
          <div className="container-cri text-center">
            <h2 className="text-3xl text-white md:text-4xl">Data room investisseurs</h2>
            <p className="text-cri-parchment mx-auto mt-4 max-w-2xl text-lg">
              Vous êtes investisseur, fonds d&apos;impact ou bailleur ? Accédez à notre data room
              sécurisée (audit, juridique, technique, financier).
            </p>
            <Link href="/investisseurs" className="btn-gold mt-8 inline-flex items-center">
              Demander l&apos;accès investisseur
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
