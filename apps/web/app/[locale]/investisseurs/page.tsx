"use client";

import {
  TrendingUp,
  Shield,
  BarChart3,
  Lock,
  FileText,
  Mail,
  ArrowRight,
  CheckCircle2,
  Coins,
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
import { InvestorLoginForm } from "@/components/ui/InvestorLoginForm";

/**
 * Page /investisseurs — Modèle économique, documents, login
 */

export default function InvestorsPage() {
  const t = useTranslations("pages.investisseurs");
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          image="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&q=80"
          imageAlt="Salle de réunion d'investisseurs, projecteur et tableaux financiers"
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
          primaryCta={{ href: "#login", label: "Accéder à la data room" }}
          secondaryCta={{ href: "/contact", label: "Contacter l'équipe" }}
          viewportHeight
        />

        {/* KPIs FINANCIERS */}
        <section className="bg-cri-parchment py-20">
          <div className="container-cri">
            <StaggerGroup className="grid grid-cols-2 gap-5 lg:grid-cols-4" staggerDelay={0.1}>
              <KpiCounter
                value={3.2}
                suffix=" Md"
                decimals={1}
                label="Financement"
                description="FCFA recherchés 2026-2030"
                icon={<Coins className="h-5 w-5" />}
                trend="up"
              />
              <KpiCounter
                value={20}
                suffix=" %"
                label="ROI projeté"
                description="Sur 5 ans, post-money"
                icon={<TrendingUp className="h-5 w-5" />}
                trend="up"
              />
              <KpiCounter
                value={1.7}
                suffix=" Md"
                decimals={1}
                label="CA cible"
                description="À l'horizon 2030"
                icon={<BarChart3 className="h-5 w-5" />}
                trend="up"
              />
              <KpiCounter
                value={36}
                suffix=" mois"
                label="Breakeven"
                description="Point d'équilibre"
                icon={<Calendar className="h-5 w-5" />}
                trend="stable"
              />
            </StaggerGroup>
          </div>
        </section>

        <SectionDivider variant="triangle" fillClassName="fill-cri-cream" height={64} />

        {/* MODÈLE ÉCONOMIQUE */}
        <section className="bg-cri-cream py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                Modèle économique
              </p>
              <h2 className="text-cri-forest font-serif text-3xl font-bold md:text-5xl">
                3 sources de revenus complémentaires
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid gap-5 md:grid-cols-3" staggerDelay={0.12}>
              {[
                {
                  source: "Cacao premium",
                  share: "55 %",
                  desc: "450 t/an à 3 500 €/t FOB (vs 2 800 € marché)",
                },
                {
                  source: "Provendes",
                  share: "30 %",
                  desc: "5 500 t/an à 380 €/t (vs 450 € marché)",
                },
                {
                  source: "Élevage",
                  share: "15 %",
                  desc: "15 000 poulets/an + porcs engraissement",
                },
              ].map((b) => (
                <GlassCard key={b.source} variant="default" hover className="h-full p-7">
                  <div className="mb-4 flex items-baseline justify-between">
                    <h3 className="text-cri-forest font-serif text-xl font-bold">{b.source}</h3>
                    <span className="text-cri-cacao font-mono text-3xl font-bold">{b.share}</span>
                  </div>
                  <p className="text-cri-ink-muted text-sm leading-relaxed">{b.desc}</p>
                </GlassCard>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* DATA ROOM + LOGIN */}
        <section id="login" className="bg-cri-parchment py-20 md:py-24">
          <div className="container-cri">
            <div className="grid items-start gap-12 lg:grid-cols-2">
              <RevealOnScroll variant="slide-left">
                <p className="text-cri-cacao mb-3 text-[10px] font-bold uppercase tracking-[0.3em]">
                  Data room sécurisée
                </p>
                <h2 className="text-cri-forest mb-6 font-serif text-3xl font-bold md:text-4xl">
                  Accédez à la documentation complète
                </h2>
                <p className="text-cri-ink-muted mb-6 leading-relaxed">
                  Business plan, études de faisabilité, contrats cadres, bilans financiers audités,
                  dossiers KYC/AML, et reporting mensuel.
                </p>
                <ul className="mb-8 space-y-3">
                  {[
                    "Business plan détaillé (47 p.)",
                    "Études d'ingénierie (120 p.)",
                    "Bilans financiers audités 2022-2024",
                    "KYC/AML conformes COBAC",
                    "Reporting mensuel automatique",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2
                        className="text-cri-canopy mt-0.5 h-5 w-5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-cri-humus">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="bg-cri-cacao text-cri-text-on-dark hover:bg-cri-forest focus:ring-cri-gold inline-flex h-11 items-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2"
                  >
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    Télecharger l&apos;executive summary
                  </button>
                  <button
                    type="button"
                    className="border-cri-cacao text-cri-cacao hover:bg-cri-cacao hover:text-cri-text-on-dark focus:ring-cri-gold inline-flex h-11 items-center gap-2 rounded-lg border-2 px-5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Recevoir par email
                  </button>
                </div>
              </RevealOnScroll>

              <RevealOnScroll variant="slide-right">
                <InvestorLoginForm />
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* SÉCURITÉ */}
        <section className="bg-cri-forest text-cri-text-on-dark py-16">
          <div className="container-cri">
            <div className="grid gap-6 text-center md:grid-cols-3">
              {[
                {
                  icon: <Shield className="h-8 w-8" />,
                  title: "RGPD + COBAC",
                  text: "Conformité KYC/AML",
                },
                {
                  icon: <Lock className="h-8 w-8" />,
                  title: "2FA TOTP",
                  text: "Authentification forte",
                },
                {
                  icon: <FileText className="h-8 w-8" />,
                  title: "Logs d'audit",
                  text: "Traçabilité complète",
                },
              ].map((b) => (
                <div key={b.title}>
                  <div
                    className="bg-cri-gold/15 text-cri-gold mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full"
                    aria-hidden="true"
                  >
                    {b.icon}
                  </div>
                  <h3 className="mb-1 font-serif text-lg font-bold">{b.title}</h3>
                  <p className="text-cri-text-on-dark/70 text-sm">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cri-cream py-20">
          <div className="container-cri max-w-2xl text-center">
            <RevealOnScroll variant="zoom-in">
              <h2 className="text-cri-forest mb-4 font-serif text-3xl font-bold md:text-4xl">
                Prêt à investir ?
              </h2>
              <p className="text-cri-ink-muted mb-8 text-lg">
                Demandez un accès KYC à notre data room. Processus 100 % digital, validation sous
                48h.
              </p>
              <Link
                href="/contact"
                className="bg-cri-cacao text-cri-text-on-dark hover:bg-cri-forest focus:ring-cri-gold inline-flex h-14 items-center gap-2 rounded-xl px-8 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Demander l&apos;accès KYC
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
