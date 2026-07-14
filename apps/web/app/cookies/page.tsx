import Link from "next/link";
import { Cookie, Settings, BarChart, ShieldCheck, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestion des cookies — Conformité RGPD/ePrivacy",
  description:
    "Notre politique de gestion des cookies : types de cookies utilisés, durée de conservation, comment les gérer. Conforme RGPD (UE 2016/679) et directive ePrivacy 2002/58/CE.",
  keywords: ["cookies RGPD", "politique cookies", "consentement", "Plausible Analytics"],
  openGraph: {
    title: "Gestion des cookies — Cocoa Ranch & Industry",
    description:
      "Notre utilisation des cookies : transparence totale, respect de votre vie privée.",
    type: "website",
  },
};

/**
 * Page /cookies — Politique de gestion des cookies
 * Brandbook CRI v5 : dominante verte, or cacao, parchemin.
 *
 * Sections :
 * 1. Hero
 * 2. Engagement
 * 3. Tableau des cookies
 * 4. Gestion du consentement
 * 5. CTA
 */

interface Cookie {
  name: string;
  type: "Essentiel" | "Mesure d'audience" | "Marketing" | "Fonctionnel";
  provider: string;
  duration: string;
  purpose: string;
  required: boolean;
}

const COOKIES: Cookie[] = [
  {
    name: "__session",
    type: "Essentiel",
    provider: "Firebase Auth",
    duration: "14 jours",
    purpose: "Authentification des utilisateurs (admin, investisseurs, terrain).",
    required: true,
  },
  {
    name: "cookie-consent",
    type: "Essentiel",
    provider: "CRI",
    duration: "12 mois",
    purpose: "Mémorise vos préférences de consentement (RGPD).",
    required: true,
  },
  {
    name: "locale",
    type: "Fonctionnel",
    provider: "CRI",
    duration: "12 mois",
    purpose: "Mémorise la langue de l'interface (français/anglais).",
    required: false,
  },
  {
    name: "Plausible Analytics",
    type: "Mesure d'audience",
    provider: "Plausible Insights",
    duration: "— (pas de cookie)",
    purpose: "Mesure d'audience anonymisée, conforme RGPD sans consentement.",
    required: false,
  },
];

const TYPE_COLORS: Record<Cookie["type"], string> = {
  Essentiel: "bg-cri-gold/20 text-cri-cacao",
  "Mesure d'audience": "bg-cri-canopy/20 text-cri-canopy",
  Marketing: "bg-cri-cacao/20 text-cri-cacao",
  Fonctionnel: "bg-cri-forest/10 text-cri-forest",
};

export default function CookiesPage() {
  return (
    <>
      <Navbar />

      <main id="main">
        {/* ─────── HERO ─────── */}
        <PageHero
          badge="Vie privée"
          title="Gestion des cookies"
          subtitle={
            <>
              Conformité <strong>RGPD (UE 2016/679)</strong> et directive ePrivacy 2002/58/CE.
              Transparence totale sur les données collectées.
            </>
          }
        />

        {/* ─────── ENGAGEMENT ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="card bg-cri-cream">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <Cookie className="text-cri-cacao h-12 w-12" aria-hidden="true" />
                  <h2 className="mt-4 text-2xl">Notre engagement</h2>
                  <p className="text-cri-humus mt-3">
                    Nous limitons au strict nécessaire les cookies déposés sur votre appareil. Nous
                    n&apos;utilisons
                    <strong> aucun cookie publicitaire</strong> ni de tracking tiers à des fins
                    commerciales.
                  </p>
                  <p className="text-cri-humus mt-3">
                    Pour la mesure d&apos;audience, nous avons choisi{" "}
                    <strong>Plausible Analytics</strong>, un outil auto-hébergé qui ne dépose aucun
                    cookie et anonymise toutes les données (pas de profilage, pas de revente).
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: ShieldCheck, text: "Aucun cookie publicitaire" },
                    { icon: EyeOff, text: "Aucun tracking tiers commercial" },
                    { icon: Settings, text: "Vous gardez le contrôle" },
                    { icon: BarChart, text: "Mesure d'audience anonymisée" },
                  ].map((b) => (
                    <div key={b.text} className="rounded-cri flex items-center gap-3 bg-white p-3">
                      <b.icon className="text-cri-cacao h-6 w-6" aria-hidden="true" />
                      <span className="text-sm font-bold">{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────── TABLEAU DES COOKIES ─────── */}
        <section className="section bg-cri-cream">
          <div className="container-cri">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                Détail
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl">Cookies utilisés</h2>
            </div>
            <div className="space-y-4">
              {COOKIES.map((c) => (
                <article key={c.name} className="card hover:shadow-cri-md transition-shadow">
                  <div className="grid items-center gap-4 md:grid-cols-12">
                    <div className="md:col-span-3">
                      <code className="text-cri-forest break-all text-sm font-bold">{c.name}</code>
                      <span
                        className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${TYPE_COLORS[c.type]}`}
                      >
                        {c.type}
                      </span>
                    </div>
                    <div className="md:col-span-6">
                      <p className="text-cri-humus text-sm">{c.purpose}</p>
                      <p className="text-cri-ink-muted mt-1 text-xs">
                        <strong>Provider :</strong> {c.provider} · <strong>Durée :</strong>{" "}
                        {c.duration}
                      </p>
                    </div>
                    <div className="md:col-span-3 md:text-right">
                      {c.required ? (
                        <span className="text-cri-canopy inline-flex items-center gap-1 text-sm font-bold">
                          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                          Toujours actif
                        </span>
                      ) : (
                        <span className="text-cri-ink-muted inline-flex items-center gap-1 text-sm font-bold">
                          <Eye className="h-4 w-4" aria-hidden="true" />
                          Optionnel
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── GESTION DU CONSENTEMENT ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                  Vos droits
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl">Gérez vos préférences</h2>
                <p className="text-cri-humus mt-4 text-lg">
                  Lors de votre première visite, un bandeau vous permet d&apos;accepter, refuser ou
                  personnaliser les cookies non essentiels. Vous pouvez modifier vos choix à tout
                  moment.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <button
                    type="button"
                    className="btn bg-cri-forest hover:bg-cri-canopy text-white"
                  >
                    <Settings className="mr-2 h-5 w-5" aria-hidden="true" />
                    Modifier mes préférences
                  </button>
                  <Link
                    href="/privacy"
                    className="btn border-cri-cacao text-cri-cacao hover:bg-cri-cacao border-2 hover:text-white"
                  >
                    Politique de confidentialité
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <div className="card bg-cri-gradient p-12 text-white">
                <h3 className="text-2xl text-white">Vous avez des questions ?</h3>
                <p className="text-cri-parchment mt-3">
                  Notre Délégué à la Protection des Données (DPO) répond à toutes vos questions sur
                  l&apos;utilisation de vos données personnelles.
                </p>
                <Link
                  href="/contact"
                  className="text-cri-gold hover:text-cri-gold-light mt-6 inline-flex items-center font-bold"
                >
                  Contacter le DPO
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
