"use client";

import {
  Calendar,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

/**
 * Page /actualites — Blog, communiqués, événements
 */

const CATEGORIES = ["Tous", "Communiqués", "Études", "Événement", "Média"] as const;
type Category = (typeof CATEGORIES)[number];

const ARTICLES: {
  date: string;
  category: Exclude<Category, "Tous">;
  title: string;
  excerpt: string;
  color: "cacao" | "canopy" | "gold";
}[] = [
  {
    date: "12 juin 2026",
    category: "Communiqués",
    title: "CRI lève 1,2 Md FCFA pour son premier closing",
    excerpt: "L'agropole Cocoa Ranch & Industry boucle son premier tour de table avec un pool d'investisseurs panafricains et un fonds européen spécialisé.",
    color: "cacao",
  },
  {
    date: "4 mai 2026",
    category: "Études",
    title: "Étude : impact du brevet CRI-PROVEND CACAO sur la filière porcine camerounaise",
    excerpt: "Notre étude de terrain, menée en partenariat avec l'IRAD, démontre une réduction de 18 % du coût d'alimentation des élevages familiaux.",
    color: "canopy",
  },
  {
    date: "22 avril 2026",
    category: "Événement",
    title: "Salon SARA 2026 : CRI présente son modèle à Abidjan",
    excerpt: "Retrouvez-nous du 22 au 25 mai au Salon International de l'Agriculture et des Ressources Animales d'Abidjan, stand B-42.",
    color: "gold",
  },
  {
    date: "8 mars 2026",
    category: "Communiqués",
    title: "Première livraison pilote de 12 t de fèves CacaoTrace",
    excerpt: "Nos premiers conteneurs de fèves tracées sont en route vers Amsterdam pour un torréfacteur européen partenaire.",
    color: "cacao",
  },
  {
    date: "14 février 2026",
    category: "Média",
    title: "CRI dans le magazine Forbes Africa",
    excerpt: "Notre agropole figure dans le top 10 des « Agritech africaines à suivre en 2026 » selon Forbes Africa.",
    color: "canopy",
  },
  {
    date: "1er janvier 2026",
    category: "Études",
    title: "Lancement opérationnel du ranch et de l'usine de séchage",
    excerpt: "Après 18 mois de travaux, l'usine de séchage de Njombé entre en service. 1 200 producteurs sont encadrés dès le premier trimestre.",
    color: "gold",
  },
];

const colorMap = {
  cacao: "bg-cri-cacao/15 text-cri-cacao border-cri-cacao/30",
  canopy: "bg-cri-canopy/15 text-cri-canopy border-cri-canopy/30",
  gold: "bg-cri-gold/20 text-cri-gold-dark border-cri-gold/40",
} as const;

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Tous");

  const visibleArticles = useMemo(
    () =>
      activeCategory === "Tous"
        ? ARTICLES
        : ARTICLES.filter((a) => a.category === activeCategory),
    [activeCategory]
  );

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80"
          imageAlt="Journaux et revue de presse"
          badge="Actualités"
          title="L'actualité de Cocoa Ranch & Industry"
          subtitle="Communiqués, études, événements et couverture média. Suivez l'avancement du projet."
          viewportHeight
        />

        <section className="py-20 md:py-24 bg-cri-parchment">
          <div className="container-cri">
            {/* Filtres catégories — fonctionnels avec aria-pressed */}
            <RevealOnScroll
              variant="fade"
              className="flex flex-wrap gap-2 justify-center mb-12"
            >
              <div
                role="group"
                aria-label="Filtrer les actualités par catégorie"
                className="flex flex-wrap gap-2 justify-center"
              >
                {CATEGORIES.map((cat) => {
                  const isActive = cat === activeCategory;
                  return (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors min-h-[40px]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cri-gold focus-visible:ring-offset-2",
                        isActive
                          ? "bg-cri-cacao text-cri-text-on-dark border-cri-cacao"
                          : "bg-cri-cream border-cri-moss/20 text-cri-forest hover:border-cri-cacao/40 hover:bg-cri-cacao/5"
                      )}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </RevealOnScroll>

            {visibleArticles.length === 0 ? (
              <p
                role="status"
                className="text-center text-cri-ink-muted py-12"
              >
                Aucun article dans cette catégorie pour le moment.
              </p>
            ) : (
              <StaggerGroup
                key={activeCategory}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                staggerDelay={0.1}
              >
                {visibleArticles.map((a) => (
                  <Link
                    key={a.title}
                    href="#"
                    className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cri-gold focus-visible:ring-offset-2 rounded-2xl"
                    aria-label={`Lire : ${a.title}`}
                  >
                    <article className="h-full p-6 rounded-2xl bg-cri-cream border-2 border-cri-moss/20 hover:border-cri-cacao/40 hover:shadow-soft transition-all hover:-translate-y-1">
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${colorMap[a.color]}`}
                        >
                          {a.category}
                        </span>
                        <span className="text-xs text-cri-ink-muted flex items-center gap-1">
                          <Calendar className="h-3 w-3" aria-hidden="true" />
                          {a.date}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-cri-forest leading-tight mb-3">
                        {a.title}
                      </h3>
                      <p className="text-sm text-cri-ink-muted leading-relaxed mb-4">
                        {a.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 text-cri-cacao font-semibold text-sm">
                        Lire l&apos;article
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </article>
                  </Link>
                ))}
              </StaggerGroup>
            )}
          </div>
        </section>

        <SectionDivider variant="leaf" fillClassName="fill-cri-cream" height={80} />

        <section className="py-20 md:py-24 bg-cri-cream">
          <div className="container-cri">
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <RevealOnScroll variant="slide-left">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-cri-forest mb-4">
                  Ne manquez aucune actualité
                </h2>
                <p className="text-lg text-cri-ink-muted leading-relaxed">
                  Recevez nos communiqués et publications par email, à raison
                  d&apos;une lettre par trimestre. Désabonnement en un clic.
                </p>
              </RevealOnScroll>
              <RevealOnScroll variant="slide-right">
                <NewsletterForm />
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
