"use client";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";
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

        <section className="py-20 md:py-24 bg-cri-parchment">
          <div className="container-cri">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Coordonnées */}
              <div className="lg:col-span-2 space-y-6">
                <RevealOnScroll variant="slide-up">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-cri-forest mb-6">
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

                <RevealOnScroll variant="fade" className="mt-8 p-5 rounded-2xl bg-cri-cream border border-cri-moss/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cri-canopy flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-serif font-bold text-cri-forest">Présidence</p>
                      <p className="text-sm text-cri-ink-muted mt-1">
                        <span className="font-semibold text-cri-canopy">TCHAHA MONKAM</span> epouse AWUNGIA TAZINYA Lorraine Nadia
                        <br />Présidente — COCOA RANCH & INDUSTRY
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll variant="fade" className="mt-8 p-5 rounded-2xl bg-cri-cream border border-cri-moss/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cri-canopy flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-serif font-bold text-cri-forest">Réponse garantie sous 48h</p>
                      <p className="text-sm text-cri-ink-muted mt-1">
                        Notre équipe vous répond par email, dans la langue de votre choix (FR/EN).
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>

              {/* Formulaire */}
              <div className="lg:col-span-3">
                <RevealOnScroll variant="slide-up">
                  <div className="p-8 rounded-2xl bg-white border-2 border-cri-moss/20 shadow-soft">
                    <ContactForm />
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider variant="curve" fillClassName="fill-cri-cream" height={80} />

        <section className="py-20 md:py-24 bg-cri-cream">
          <div className="container-cri">
            <RevealOnScroll variant="slide-up" className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cri-cacao mb-2">
                Plan d&apos;accès
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-cri-forest">
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
      <div className="w-12 h-12 rounded-xl bg-cri-cacao/10 text-cri-cacao flex items-center justify-center flex-shrink-0" aria-hidden="true">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-cri-ink-muted">
          {title}
        </p>
        <p className="font-serif font-semibold text-cri-forest">{value}</p>
        {badge && (
          <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-cri-gold/20 text-cri-cacao-dark text-[10px] font-bold uppercase tracking-wider">
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
      className="flex items-center gap-4 p-4 rounded-xl bg-cri-cream border border-cri-moss/20 hover:border-cri-cacao/40 transition-colors"
    >
      {content}
    </a>
  ) : (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-cri-cream border border-cri-moss/20">
      {content}
    </div>
  );
};
