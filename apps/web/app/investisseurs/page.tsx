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
import Link from "next/link";
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
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          image="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&q=80"
          imageAlt="Salle de réunion d'investisseurs, projecteur et tableaux financiers"
          badge="Espace investisseurs"
          title="Investissez dans le cacao africain durable"
          subtitle="3,2 Md FCFA recherchés sur 2026-2030. Projet mature, bankable, différencié. ROI projeté 18-22 %."
          primaryCta={{ href: "#login", label: "Accéder à la data room" }}
          secondaryCta={{ href: "/contact", label: "Contacter l'équipe" }}
          viewportHeight
        />

        {/* KPIs FINANCIERS */}
        <section className="py-20 bg-cri-parchment">
          <div className="container-cri">
            <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
              <KpiCounter value={3.2} suffix=" Md" decimals={1} label="Financement" description="FCFA recherchés 2026-2030" icon={<Coins className="h-5 w-5" />} trend="up" />
              <KpiCounter value={20} suffix=" %" label="ROI projeté" description="Sur 5 ans, post-money" icon={<TrendingUp className="h-5 w-5" />} trend="up" />
              <KpiCounter value={1.7} suffix=" Md" decimals={1} label="CA cible" description="À l'horizon 2030" icon={<BarChart3 className="h-5 w-5" />} trend="up" />
              <KpiCounter value={36} suffix=" mois" label="Breakeven" description="Point d'équilibre" icon={<Calendar className="h-5 w-5" />} trend="stable" />
            </StaggerGroup>
          </div>
        </section>

        <SectionDivider variant="triangle" fillClassName="fill-cri-cream" height={64} />

        {/* MODÈLE ÉCONOMIQUE */}
        <section className="py-20 md:py-24 bg-cri-cream">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
                Modèle économique
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-cri-forest">
                3 sources de revenus complémentaires
              </h2>
            </RevealOnScroll>

            <StaggerGroup className="grid md:grid-cols-3 gap-5" staggerDelay={0.12}>
              {[
                { source: "Cacao premium", share: "55 %", desc: "450 t/an à 3 500 €/t FOB (vs 2 800 € marché)" },
                { source: "Provendes", share: "30 %", desc: "5 500 t/an à 380 €/t (vs 450 € marché)" },
                { source: "Élevage", share: "15 %", desc: "15 000 poulets/an + porcs engraissement" },
              ].map((b) => (
                <GlassCard key={b.source} variant="default" hover className="h-full p-7">
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="font-serif text-xl font-bold text-cri-forest">{b.source}</h3>
                    <span className="font-mono text-3xl font-bold text-cri-cacao">{b.share}</span>
                  </div>
                  <p className="text-sm text-cri-ink-muted leading-relaxed">{b.desc}</p>
                </GlassCard>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* DATA ROOM + LOGIN */}
        <section id="login" className="py-20 md:py-24 bg-cri-parchment">
          <div className="container-cri">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <RevealOnScroll variant="slide-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-3">
                  Data room sécurisée
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-cri-forest mb-6">
                  Accédez à la documentation complète
                </h2>
                <p className="text-cri-ink-muted leading-relaxed mb-6">
                  Business plan, études de faisabilité, contrats cadres, bilans
                  financiers audités, dossiers KYC/AML, et reporting mensuel.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Business plan détaillé (47 p.)",
                    "Études d'ingénierie (120 p.)",
                    "Bilans financiers audités 2022-2024",
                    "KYC/AML conformes COBAC",
                    "Reporting mensuel automatique",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cri-canopy flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-cri-humus">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-cri-cacao text-cri-text-on-dark font-semibold text-sm hover:bg-cri-forest transition-colors focus:outline-none focus:ring-2 focus:ring-cri-gold"
                  >
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    Télecharger l&apos;executive summary
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 h-11 px-5 rounded-lg border-2 border-cri-cacao text-cri-cacao font-semibold text-sm hover:bg-cri-cacao hover:text-cri-text-on-dark transition-colors focus:outline-none focus:ring-2 focus:ring-cri-gold"
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
        <section className="py-16 bg-cri-forest text-cri-text-on-dark">
          <div className="container-cri">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                { icon: <Shield className="h-8 w-8" />, title: "RGPD + COBAC", text: "Conformité KYC/AML" },
                { icon: <Lock className="h-8 w-8" />, title: "2FA TOTP", text: "Authentification forte" },
                { icon: <FileText className="h-8 w-8" />, title: "Logs d'audit", text: "Traçabilité complète" },
              ].map((b) => (
                <div key={b.title}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cri-gold/15 text-cri-gold mb-3" aria-hidden="true">
                    {b.icon}
                  </div>
                  <h3 className="font-serif text-lg font-bold mb-1">{b.title}</h3>
                  <p className="text-sm text-cri-text-on-dark/70">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-cri-cream">
          <div className="container-cri text-center max-w-2xl">
            <RevealOnScroll variant="zoom-in">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-cri-forest mb-4">
                Prêt à investir ?
              </h2>
              <p className="text-lg text-cri-ink-muted mb-8">
                Demandez un accès KYC à notre data room. Processus 100 % digital,
                validation sous 48h.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-14 px-8 rounded-xl bg-cri-cacao text-cri-text-on-dark font-semibold hover:bg-cri-forest transition-colors focus:outline-none focus:ring-2 focus:ring-cri-gold focus:ring-offset-2"
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
