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
import Link from "next/link";
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
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80"
          imageAlt="Forêt tropicale dense — engagement zéro déforestation"
          badge="Impact RSE"
          title="Zéro déforestation, zéro déchet, zéro CO₂"
          subtitle="Notre engagement RSE est adossé au programme CIMAR-Technopôle : promotion de l'agroécologie, formation-insertion des jeunes et des femmes, diffusion des bio-intrants."
          viewportHeight
        />

        <section className="py-20 bg-cri-parchment">
          <div className="container-cri">
            <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
              <KpiCounter value={1200} label="Producteurs" description="Encadrés et formés" icon={<Users className="h-5 w-5" />} trend="up" />
              <KpiCounter value={0} label="Déforestation" description="0 ha perdu (vérifié satellite)" icon={<TreePine className="h-5 w-5" />} trend="stable" />
              <KpiCounter value={100} suffix=" %" label="Valorisation" description="Tous les sous-produits" icon={<Recycle className="h-5 w-5" />} trend="up" />
              <KpiCounter value={5000} label="Familles" description="Impact social direct" icon={<Heart className="h-5 w-5" />} trend="up" />
            </StaggerGroup>
          </div>
        </section>

        <SectionDivider variant="wave" fillClassName="fill-cri-cream" height={80} />

        <section className="py-20 md:py-24 bg-cri-cream">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
                Piliers RSE
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-cri-forest">
                3 engagements mesurables
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid lg:grid-cols-3 gap-6" staggerDelay={0.12}>
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
        <section className="py-20 md:py-24 bg-cri-parchment">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
                Certifications
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-cri-forest">
                Nos certifications
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={0.08}>
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
                  className="aspect-square flex flex-col items-center justify-center p-4 rounded-2xl bg-cri-cream border-2 border-cri-moss/20 hover:border-cri-gold/50 transition-colors"
                >
                  <Award className="h-10 w-10 text-cri-cacao mb-2" aria-hidden="true" />
                  <p className="font-serif font-bold text-cri-forest text-center text-sm">
                    {cert}
                  </p>
                </div>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* RAPPORTS TÉLÉCHARGEABLES */}
        <section className="py-20 md:py-24 bg-cri-forest text-cri-text-on-dark">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-gold mb-2">
                Documentation
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">
                Rapports d&apos;impact
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto" staggerDelay={0.1}>
              {[
                { title: "Rapport d'impact 2024", size: "2.4 Mo", date: "Mars 2025" },
                { title: "Rapport ESG 2024", size: "1.8 Mo", date: "Février 2025" },
                { title: "Bilan carbone 2024", size: "1.2 Mo", date: "Janvier 2025" },
              ].map((doc) => (
                <div
                  key={doc.title}
                  className="p-6 rounded-2xl bg-cri-forest-light/30 backdrop-blur-md border-2 border-cri-gold/20 hover:border-cri-gold/50 transition-all"
                >
                  <Calendar className="h-6 w-6 text-cri-gold mb-3" aria-hidden="true" />
                  <h3 className="font-serif text-lg font-bold mb-2">{doc.title}</h3>
                  <p className="text-xs text-cri-text-on-dark/60 mb-4">
                    PDF · {doc.size} · {doc.date}
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-cri-gold font-semibold text-sm hover:gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-cri-gold rounded-md px-2 py-1"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Télécharger
                  </button>
                </div>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section className="py-20 bg-cri-cream">
          <div className="container-cri text-center max-w-2xl">
            <RevealOnScroll variant="zoom-in">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-cri-forest mb-4">
                Rejoignez notre démarche
              </h2>
              <p className="text-lg text-cri-ink-muted mb-8">
                Producteurs, ONG, chercheurs : nous accueillons tous les acteurs
                engagés pour la cacaoculture durable.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-xl bg-cri-cacao text-cri-text-on-dark font-semibold hover:bg-cri-forest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cri-gold focus-visible:ring-offset-2"
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
    <div className="w-14 h-14 rounded-xl bg-cri-canopy/10 text-cri-canopy flex items-center justify-center mb-5" aria-hidden="true">
      {icon}
    </div>
    <h3 className="font-serif text-2xl font-bold text-cri-forest mb-4">{title}</h3>
    <ul className="space-y-2">
      {points.map((p) => (
        <li key={p} className="flex items-start gap-2 text-sm text-cri-humus">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cri-cacao flex-shrink-0" aria-hidden="true" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  </GlassCard>
);
