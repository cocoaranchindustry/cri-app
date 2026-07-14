import Link from "next/link";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Building2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { SectionCTA } from "@/components/ui/SectionCTA";
import { MapMungo } from "@/components/ui/Illustrations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Nous écrire, nous appeler",
  description:
    "Contactez Cocoa Ranch & Industry : formulaire sécurisé (RGPD), email, téléphone, adresse au Cameroun. Réponse sous 48 h ouvrées.",
  keywords: ["contact CRI", "AGRO-PME Fondation", "Cameroun Mungo", "écrire cacao Cameroun"],
  openGraph: {
    title: "Contact — Cocoa Ranch & Industry",
    description: "Notre équipe vous répond sous 48 h ouvrées. Formulaire sécurisé RGPD/ANTIC.",
    type: "website",
  },
};

/**
 * Page /contact — Coordonnées + formulaire
 * Brandbook CRI v5 : dominante verte, or cacao, parchemin.
 *
 * Sections :
 * 1. Hero
 * 2. Coordonnées
 * 3. Formulaire de contact
 * 4. CTA
 */

const CONTACT_INFO = [
  {
    icon: Building2,
    title: "Siège opérationnel",
    lines: ["AGRO-PME Fondation", "Carrefour Njombé-Penja", "Bassin du Mungo, Cameroun"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["contact@cri.africa", "investisseurs@cri.africa", "presse@cri.africa"],
  },
  {
    icon: Phone,
    title: "Téléphone",
    lines: ["+237 6 90 00 00 00", "Lun-Ven 8 h - 17 h (GMT+1)"],
  },
  {
    icon: Clock,
    title: "Délai de réponse",
    lines: ["Sous 48 h ouvrées", "Réponse par email"],
  },
];

const SUBJECTS = [
  "Demande d'information générale",
  "Investissement / financement",
  "Achat de produits (cacao, provendes, biofertilisants)",
  "Partenariat technique ou commercial",
  "Presse / médias",
  "Recrutement / carrière",
  "Recherche / université",
  "Autre",
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main id="main">
        {/* ─────── HERO ─────── */}
        <PageHero
          badge="Contact"
          title="Échangeons sur votre projet"
          subtitle={
            <>
              Notre équipe vous répond sous <strong>48 h ouvrées</strong>. Tous les échanges sont
              sécurisés et conformes RGPD / ANTIC Cameroun.
            </>
          }
        />

        {/* ─────── CARTE MUNGO ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="card border-cri-cacao/30 overflow-hidden border-2">
              <div className="relative">
                <div className="bg-cri-cacao text-cri-parchment text-label rounded-cri shadow-cri absolute -top-3 left-8 z-10 px-4 py-1 font-bold uppercase tracking-wider">
                  Bassin du Mungo · Cameroun
                </div>
                <MapMungo className="w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* ─────── COORDONNÉES ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {CONTACT_INFO.map((info) => (
                <article key={info.title} className="card text-center">
                  <div className="bg-cri-cacao mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-white">
                    <info.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg">{info.title}</h3>
                  {info.lines.map((line) => (
                    <p key={line} className="text-cri-humus mt-1 text-sm">
                      {line}
                    </p>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── FORMULAIRE ─────── */}
        <section className="section bg-cri-cream">
          <div className="container-cri">
            <div className="grid items-start gap-12 md:grid-cols-2">
              <div>
                <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                  Formulaire de contact
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl">Écrivez-nous</h2>
                <p className="text-cri-humus mt-4 text-lg">
                  Pour toute demande, merci de remplir le formulaire ci-contre. Nous vous répondons
                  par email sous 48 h ouvrées.
                </p>
                <div className="text-cri-humus mt-6 space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MessageCircle
                      className="text-cri-cacao mt-0.5 h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Réponse humaine</strong> : votre message est traité par notre équipe,
                      pas par un chatbot.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="text-cri-cacao mt-0.5 h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Visite terrain</strong> : nous accueillons les visites sur rendez-vous
                      (institutionnels, chercheurs, partenaires).
                    </span>
                  </div>
                </div>
              </div>
              <form className="card space-y-4" action="/api/contact" method="POST">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-firstname" className="mb-1 block text-sm font-bold">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="c-firstname"
                      name="firstname"
                      required
                      className="border-cri-border rounded-cri w-full border px-3 py-2"
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="c-lastname" className="mb-1 block text-sm font-bold">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="c-lastname"
                      name="lastname"
                      required
                      className="border-cri-border rounded-cri w-full border px-3 py-2"
                      autoComplete="family-name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-1 block text-sm font-bold">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="c-email"
                    name="email"
                    required
                    className="border-cri-border rounded-cri w-full border px-3 py-2"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label htmlFor="c-phone" className="mb-1 block text-sm font-bold">
                    Téléphone (optionnel)
                  </label>
                  <input
                    type="tel"
                    id="c-phone"
                    name="phone"
                    className="border-cri-border rounded-cri w-full border px-3 py-2"
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label htmlFor="c-org" className="mb-1 block text-sm font-bold">
                    Organisation (optionnel)
                  </label>
                  <input
                    type="text"
                    id="c-org"
                    name="organization"
                    className="border-cri-border rounded-cri w-full border px-3 py-2"
                    autoComplete="organization"
                  />
                </div>
                <div>
                  <label htmlFor="c-subject" className="mb-1 block text-sm font-bold">
                    Sujet *
                  </label>
                  <select
                    id="c-subject"
                    name="subject"
                    required
                    className="border-cri-border rounded-cri w-full border px-3 py-2"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    {SUBJECTS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="c-message" className="mb-1 block text-sm font-bold">
                    Message *
                  </label>
                  <textarea
                    id="c-message"
                    name="message"
                    rows={5}
                    required
                    minLength={10}
                    className="border-cri-border rounded-cri w-full border px-3 py-2"
                    placeholder="Décrivez votre demande (10 caractères minimum)..."
                  />
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="c-consent" name="consent" required className="mt-1" />
                  <label htmlFor="c-consent" className="text-cri-humus text-xs">
                    J&apos;accepte que mes données soient traitées conformément à la{" "}
                    <Link href="/privacy" className="text-cri-cacao underline">
                      politique de confidentialité
                    </Link>{" "}
                    (RGPD, ANTIC). *
                  </label>
                </div>
                {/* Honeypot anti-spam */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <button
                  type="submit"
                  className="btn bg-cri-forest hover:bg-cri-canopy w-full text-white"
                >
                  <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ─────── CTA ─────── */}
        <SectionCTA
          title="Vous préférez nous rencontrer ?"
          description="Nous accueillons les visites sur le terrain (ferme, unité de transformation) sur rendez-vous. Durée moyenne : 2 h."
          primaryCta={{ href: "/contact", label: "Réserver une visite" }}
          secondaryCta={{ href: "/projet", label: "Découvrir le projet" }}
          variant="forest"
        />
      </main>

      <Footer />
    </>
  );
}
