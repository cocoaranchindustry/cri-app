"use client";

import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/ui/ContactForm";
import { RevealOnScroll, StaggerGroup } from "@/components/ui/RevealOnScroll";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { MapLeaflet } from "@/components/ui/MapLeaflet";

/**
 * Page /contact — Formulaire, carte, coordonnées
 */

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          image="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80"
          imageAlt="Poignée de main entre partenaires professionnels"
          badge="Contact"
          title="Parlons de votre projet"
          subtitle="Une question, un partenariat, un devis ? Notre équipe vous répond sous 48h ouvrées."
          viewportHeight
        />

        <section className="bg-cri-parchment py-20 md:py-24">
          <div className="container-cri">
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Coordonnées */}
              <div className="space-y-6 lg:col-span-2">
                <RevealOnScroll variant="slide-up">
                  <h2 className="text-cri-forest mb-6 font-serif text-2xl font-bold md:text-3xl">
                    Nos coordonnées
                  </h2>
                </RevealOnScroll>

                <StaggerGroup className="space-y-4" staggerDelay={0.1}>
                  <ContactItem
                    icon={<Mail className="h-5 w-5" />}
                    title="Email"
                    value="tchahanadial@yahoo.com"
                    href="mailto:tchahanadial@yahoo.com"
                  />
                  <ContactItem
                    icon={<Phone className="h-5 w-5" />}
                    title="Téléphone"
                    value="+237 694 89 77 10"
                    href="tel:+237694897710"
                  />
                  <ContactItem
                    icon={<Phone className="h-5 w-5" />}
                    title="WhatsApp direct"
                    value="+237 694 89 77 10"
                    href="https://wa.me/237694897710?text=Bonjour%20CRI%2C%20je%20souhaite%20%C3%A9changer%20au%20sujet%20de%20votre%20projet"
                    badge="Réponse rapide"
                  />
                  <ContactItem
                    icon={<MapPin className="h-5 w-5" />}
                    title="Adresse"
                    value="Bassin du Mungo, Cameroun"
                  />
                  <ContactItem
                    icon={<Clock className="h-5 w-5" />}
                    title="Horaires"
                    value="Lun – Ven : 8h – 17h (GMT+1)"
                  />
                </StaggerGroup>

                <RevealOnScroll
                  variant="fade"
                  className="bg-cri-cream border-cri-moss/20 mt-8 rounded-2xl border p-5"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-cri-canopy mt-0.5 h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-cri-forest font-serif font-bold">Présidence</p>
                      <p className="text-cri-ink-muted mt-1 text-sm">
                        <span className="text-cri-canopy font-semibold">TCHAHA MONKAM</span> epouse
                        AWUNGIA TAZINYA Lorraine Nadia
                        <br />
                        Présidente — COCOA RANCH & INDUSTRY
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll
                  variant="fade"
                  className="bg-cri-cream border-cri-moss/20 mt-8 rounded-2xl border p-5"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-cri-canopy mt-0.5 h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-cri-forest font-serif font-bold">
                        Réponse garantie sous 48h
                      </p>
                      <p className="text-cri-ink-muted mt-1 text-sm">
                        Notre équipe vous répond par email, dans la langue de votre choix (FR/EN).
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>

              {/* Formulaire */}
              <div className="lg:col-span-3">
                <RevealOnScroll variant="slide-up">
                  <div className="border-cri-moss/20 shadow-soft rounded-2xl border-2 bg-white p-8">
                    <ContactForm />
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider variant="curve" fillClassName="fill-cri-cream" height={80} />

        <section className="bg-cri-cream py-20 md:py-24">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-cri-cacao mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                Plan d&apos;accès
              </p>
              <h2 className="text-cri-forest font-serif text-3xl font-bold md:text-4xl">
                Venez nous rencontrer
              </h2>
            </RevealOnScroll>
            <MapLeaflet height={450} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const ContactItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  badge?: string;
}> = ({ icon, title, value, href, badge }) => {
  const content = (
    <>
      <div
        className="bg-cri-cacao/10 text-cri-cacao flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-cri-ink-muted text-[10px] font-bold uppercase tracking-wider">{title}</p>
        <p className="text-cri-forest font-serif font-semibold">{value}</p>
        {badge && (
          <span className="bg-cri-gold/20 text-cri-cacao-dark mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            {badge}
          </span>
        )}
      </div>
    </>
  );
  return href ? (
    <a
      href={href}
      target={href.startsWith("https://wa.me") ? "_blank" : undefined}
      rel={href.startsWith("https://wa.me") ? "noopener noreferrer" : undefined}
      className="bg-cri-cream border-cri-moss/20 hover:border-cri-cacao/40 flex items-center gap-4 rounded-xl border p-4 transition-colors"
    >
      {content}
    </a>
  ) : (
    <div className="bg-cri-cream border-cri-moss/20 flex items-center gap-4 rounded-xl border p-4">
      {content}
    </div>
  );
};
