import Link from "next/link";
import { ArrowRight, Calendar, Tag, ChevronRight, Rss } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { PlantationSun } from "@/components/ui/Illustrations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Actualités — News Cocoa Ranch & Industry",
  description:
    "Toute l'actualité du programme Cocoa Ranch & Industry : annonces, événements, partenariats, distinctions, publications.",
  keywords: ["actualités cacao Cameroun", "news CRI", "événements", "annonces"],
  openGraph: {
    title: "Actualités — Cocoa Ranch & Industry",
    description:
      "Annonces, événements, partenariats, distinctions : toute l'actualité du programme CRI.",
    type: "website",
  },
};

/**
 * Page /actualites — News & blog
 * Brandbook CRI v5 : dominante verte, or cacao, parchemin.
 *
 * Sections :
 * 1. Hero
 * 2. Liste des articles
 * 3. Newsletter
 * 4. CTA
 */

interface Article {
  title: string;
  desc: string;
  date: string;
  category: string;
  href: string;
  featured?: boolean;
}

const ARTICLES: Article[] = [
  {
    title: "CRI lève 850 M FCFA pour la phase 2 du ranch moderne",
    desc: "Le programme boucle un financement stratégique avec la SNI et un fonds d'impact européen pour la mise en service de 100 ha supplémentaires.",
    date: "12 juillet 2026",
    category: "Annonce",
    href: "/publications",
    featured: true,
  },
  {
    title: "Nouveau partenariat avec l'Université de Douala",
    desc: "Convention de recherche signée sur 3 ans : caractérisation variétale, santé des sols, économie circulaire.",
    date: "28 juin 2026",
    category: "Partenariat",
    href: "/publications",
  },
  {
    title: "Certification Rainforest Alliance obtenue pour 2 000 t",
    desc: "Première cargaison certifiée livrée à notre partenaire chocolatier belge, Cacao-Trace Verified.",
    date: "15 juin 2026",
    category: "Certification",
    href: "/impact",
  },
  {
    title: "Salon EUDR Brussels 2026 : CRI speaker",
    desc: "Notre Directrice RSE intervient à la table ronde 'Cacao africain et traçabilité numérique'.",
    date: "5 juin 2026",
    category: "Événement",
    href: "/publications",
  },
  {
    title: "Recrutement : 50 postes ouverts sur la ferme intégrée",
    desc: "Avicole, porcin, maintenance, qualité : nous recrutons 50 personnes en CDI d'ici septembre 2026.",
    date: "1er juin 2026",
    category: "Recrutement",
    href: "/contact",
  },
  {
    title: "Le brevet OAPI CRI-PROVEND CACAO confirmé en appel",
    desc: "La décision de l'OAPI rejette l'opposition et confirme la portée du brevet sur les 17 pays membres.",
    date: "20 mai 2026",
    category: "Propriété intellectuelle",
    href: "/brevet",
  },
  {
    title: "Salon SARA 2025 (Abidjan) : stand CRI primé",
    desc: "Notre stand a reçu le Prix de l'innovation agro-industrielle lors du Salon africain de l'agriculture.",
    date: "10 décembre 2025",
    category: "Distinction",
    href: "/publications",
  },
  {
    title: "Plantation de 10 000 arbres d'ombrage sur le ranch",
    desc: "Programme d'agroforesterie en partenariat avec le programme national UN-REDD.",
    date: "15 novembre 2025",
    category: "Environnement",
    href: "/impact",
  },
];

const CATEGORIES = [
  "Toutes",
  "Annonce",
  "Partenariat",
  "Certification",
  "Événement",
  "Recrutement",
];

export default function ActualitesPage() {
  const featured = ARTICLES.find((a) => a.featured);
  const others = ARTICLES.filter((a) => !a.featured);

  return (
    <>
      <Navbar />

      <main id="main">
        {/* ─────── HERO ─────── */}
        <PageHero
          badge="Actualités"
          title="L'actualité du programme CRI"
          subtitle={
            <>
              Annonces, événements, partenariats, distinctions : suivez pas à pas l&apos;avancement
              du projet et l&apos;impact sur le terrain.
            </>
          }
        />

        {/* ─────── BANDE IMMERSIVE : PLANTATION AU SOLEIL ─────── */}
        <section className="relative h-48 md:h-64">
          <PlantationSun className="absolute inset-0 h-full w-full object-cover" />
          <div className="from-cri-forest-dark/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 max-w-2xl md:bottom-10 md:left-12">
            <span className="bg-cri-gold text-cri-humus text-label rounded-cri mb-2 inline-block px-3 py-1 font-bold uppercase tracking-wider">
              Sur le terrain
            </span>
            <p className="font-serif text-xl leading-snug text-white md:text-2xl">
              La vie du programme, jour après jour, dans le Bassin du Mungo.
            </p>
          </div>
        </section>

        {/* ─────── ARTICLE À LA UNE ─────── */}
        {featured && (
          <section className="section-parchment">
            <div className="container-cri">
              <article className="card overflow-hidden">
                <div className="grid items-center gap-8 md:grid-cols-2">
                  <div>
                    <span className="bg-cri-gold/20 text-cri-cacao mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      À la une
                    </span>
                    <span className="text-cri-ink-muted ml-2 text-xs">{featured.date}</span>
                    <h2 className="mt-3 text-3xl md:text-4xl">{featured.title}</h2>
                    <p className="text-cri-humus mt-4 text-lg">{featured.desc}</p>
                    <Link
                      href={featured.href}
                      className="text-cri-cacao hover:text-cri-gold mt-6 inline-flex items-center font-bold"
                    >
                      Lire l&apos;article
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="card bg-cri-gradient p-12 text-center text-white">
                    <span className="text-cri-gold font-serif text-6xl font-bold">2026</span>
                    <p className="text-cri-parchment mt-3 text-sm font-bold uppercase tracking-wider">
                      Année de montée en puissance
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </section>
        )}

        {/* ─────── FILTRES ─────── */}
        <section className="bg-cri-parchment border-cri-cacao/20 border-y">
          <div className="container-cri flex flex-wrap items-center justify-between gap-4 py-6">
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
            <Link
              href="/rss.xml"
              className="text-cri-cacao hover:text-cri-gold inline-flex items-center text-sm font-bold"
            >
              <Rss className="mr-2 h-4 w-4" aria-hidden="true" />
              Flux RSS
            </Link>
          </div>
        </section>

        {/* ─────── LISTE ARTICLES ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="grid gap-6 md:grid-cols-2">
              {others.map((a) => (
                <article key={a.title} className="card hover:shadow-cri-md transition-shadow">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-cri-gold/20 text-cri-cacao inline-flex items-center rounded-full px-2 py-0.5 font-bold uppercase tracking-wider">
                      <Tag className="mr-1 h-3 w-3" aria-hidden="true" />
                      {a.category}
                    </span>
                    <span className="text-cri-ink-muted inline-flex items-center">
                      <Calendar className="mr-1 h-3 w-3" aria-hidden="true" />
                      {a.date}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl">{a.title}</h3>
                  <p className="text-cri-humus mt-2">{a.desc}</p>
                  <Link
                    href={a.href}
                    className="text-cri-cacao hover:text-cri-gold mt-4 inline-flex items-center text-sm font-bold"
                  >
                    Lire la suite
                    <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── NEWSLETTER ─────── */}
        <section className="section bg-cri-forest text-white">
          <div className="container-cri mx-auto max-w-2xl text-center">
            <h2 className="text-3xl text-white md:text-4xl">Restez informé</h2>
            <p className="text-cri-parchment mt-4 text-lg">
              Recevez nos actualités une fois par mois. Pas de spam, désabonnement en un clic.
              Conforme RGPD.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              action="/api/newsletter"
              method="POST"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Adresse email
              </label>
              <input
                type="email"
                id="newsletter-email"
                name="email"
                required
                placeholder="votre.email@exemple.com"
                className="rounded-cri text-cri-humus flex-1 px-4 py-3"
                autoComplete="email"
              />
              <button type="submit" className="btn-gold whitespace-nowrap">
                S&apos;abonner
              </button>
            </form>
            <p className="text-cri-parchment/70 mt-4 text-xs">
              Vos données sont traitées conformément à notre{" "}
              <Link href="/privacy" className="text-cri-gold hover:underline">
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
