"use client";

import {
  ShieldCheck,
  Recycle,
  Heart,
  Users,
  TreePine,
  Award,
  ArrowRight,
  Download,
  Calendar,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { GlassCard } from "@/components/ui/GlassCard";
import { KpiCounter } from "@/components/ui/KpiCounter";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";

/**
 * Page /impact — Impact RSE, certifications, rapports
 */

export default function ImpactPage() {
  const t = useTranslations("pages.impact");
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80"
          imageAlt="Forêt tropicale dense — engagement zéro déforestation"
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
          viewportHeight
        />

        <section className="bg-cri-parchment py-20">
          <div className="container-cri">
            <StaggerGroup className="grid grid-cols-2 gap-5 lg:grid-cols-4" staggerDelay={0.1}>
              <KpiCounter
                value={1200}
                label="Producteurs"
                description="Encadrés et formés"
                icon={<Users className="h-5 w-5" />}
                trend="up"
              />
              <KpiCounter
                value={0}
                label="Déforestation"
                description="0 ha perdu (vérifié satellite)"
                icon={<TreePine className="h-5 w-5" />}
                trend="stable"
              />
              <KpiCounter
                value={100}
                suffix=" %"
                label="Valorisation"
                description="Tous les sous-produits"
                icon={<Recycle className="h-5 w-5" />}
                trend="up"
              />
              <KpiCounter
                value={5000}
                label="Familles"
                description="Impact social direct"
                icon={<Heart className="h-5 w-5" />}
                trend="up"
              />
            </StaggerGroup>
          </div>
        </section>

        <SectionDivider variant="wave" fillClassName="fill-cri-cream" height={80} />

        <section className="bg-cri-cream py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                Piliers RSE
              </p>
              <h2 className="text-cri-forest font-serif text-3xl font-bold md:text-5xl">
                3 engagements mesurables
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid gap-6 lg:grid-cols-3" staggerDelay={0.12}>
              <ImpactBlock
                icon={<ShieldCheck className="h-7 w-7" />}
                title="Conformité EUDR"
                points={[
                  "Traçabilité parcelle → conteneur",
                  "Géoloc ≥ 6 décimales",
                  "0 ha de déforestation (vérifié satellite)",
                  "Conformité CacaoTrace",
                ]}
              />
              <ImpactBlock
                icon={<Recycle className="h-7 w-7" />}
                title="100 % circulaire"
                points={[
                  "Cabosses → provendes brevetées",
                  "Fientes → biofertilisants",
                  "Biomasse → énergie",
                  "Zéro déchet en décharge",
                ]}
              />
              <ImpactBlock
                icon={<Heart className="h-7 w-7" />}
                title="Impact social"
                points={[
                  "1 200 producteurs encadrés",
                  "Insertion 30 jeunes/an",
                  "Coopérative féminine (40 %)",
                  "Programme alphabétisation",
                ]}
              />
            </StaggerGroup>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="bg-cri-parchment py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                Certifications
              </p>
              <h2 className="text-cri-forest font-serif text-3xl font-bold md:text-5xl">
                Nos certifications
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid grid-cols-2 gap-4 md:grid-cols-4" staggerDelay={0.08}>
              {[
                "EUDR",
                "OAPI",
                "Rainforest Alliance",
                "CacaoTrace",
                "ISO 22000",
                "BioSPG",
                "Commerce Équitable",
                "Carbon Neutral",
              ].map((cert) => (
                <div
                  key={cert}
                  className="bg-cri-cream border-cri-moss/20 hover:border-cri-gold/50 flex aspect-square flex-col items-center justify-center rounded-2xl border-2 p-4 transition-colors"
                >
                  <Award className="text-cri-cacao mb-2 h-10 w-10" aria-hidden="true" />
                  <p className="text-cri-forest text-center font-serif text-sm font-bold">{cert}</p>
                </div>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* RAPPORTS TÉLÉCHARGEABLES */}
        <section className="bg-cri-forest text-cri-text-on-dark py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-gold mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                Documentation
              </p>
              <h2 className="font-serif text-3xl font-bold md:text-4xl">Rapports d&apos;impact</h2>
            </RevealOnScroll>

            <StaggerGroup
              className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3"
              staggerDelay={0.1}
            >
              {[
                { title: "Rapport d'impact 2024", size: "2.4 Mo", date: "Mars 2025" },
                { title: "Rapport ESG 2024", size: "1.8 Mo", date: "Février 2025" },
                { title: "Bilan carbone 2024", size: "1.2 Mo", date: "Janvier 2025" },
              ].map((doc) => (
                <div
                  key={doc.title}
                  className="bg-cri-forest-light/30 border-cri-gold/20 hover:border-cri-gold/50 rounded-2xl border-2 p-6 backdrop-blur-md transition-all"
                >
                  <Calendar className="text-cri-gold mb-3 h-6 w-6" aria-hidden="true" />
                  <h3 className="mb-2 font-serif text-lg font-bold">{doc.title}</h3>
                  <p className="text-cri-text-on-dark/60 mb-4 text-xs">
                    PDF · {doc.size} · {doc.date}
                  </p>
                  <button
                    type="button"
                    className="text-cri-gold focus:ring-cri-gold inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-semibold transition-all hover:gap-3 focus:outline-none focus:ring-2"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Télécharger
                  </button>
                </div>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section className="bg-cri-cream py-20">
          <div className="container-cri max-w-2xl text-center">
            <RevealOnScroll variant="zoom-in">
              <h2 className="text-cri-forest mb-4 font-serif text-3xl font-bold md:text-4xl">
                Rejoignez notre démarche
              </h2>
              <p className="text-cri-ink-muted mb-8 text-lg">
                Producteurs, ONG, chercheurs : nous accueillons tous les acteurs engagés pour la
                cacaoculture durable.
              </p>
              <Link
                href="/contact"
                className="bg-cri-cacao text-cri-text-on-dark hover:bg-cri-forest focus-visible:ring-cri-gold inline-flex h-14 items-center gap-2 rounded-xl px-8 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                Devenir partenaire
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const ImpactBlock: React.FC<{ icon: React.ReactNode; title: string; points: string[] }> = ({
  icon,
  title,
  points,
}) => (
  <GlassCard variant="default" hover className="h-full p-7">
    <div
      className="bg-cri-canopy/10 text-cri-canopy mb-5 flex h-14 w-14 items-center justify-center rounded-xl"
      aria-hidden="true"
    >
      {icon}
    </div>
    <h3 className="text-cri-forest mb-4 font-serif text-2xl font-bold">{title}</h3>
    <ul className="space-y-2">
      {points.map((p) => (
        <li key={p} className="text-cri-humus flex items-start gap-2 text-sm">
          <span
            className="bg-cri-cacao mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
            aria-hidden="true"
          />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  </GlassCard>
);
