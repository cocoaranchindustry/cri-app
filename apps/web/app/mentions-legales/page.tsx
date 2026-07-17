import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales — Cocoa Ranch & Industry",
};

export default function LegalPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
          imageAlt="Balance de justice et documents légaux"
          badge="Cadre juridique"
          title="Mentions légales"
          subtitle="Informations légales et conditions d'utilisation du site Cocoa Ranch & Industry."
          viewportHeight
        />

        <section className="bg-cri-parchment py-20 md:py-24">
          <div className="container-cri max-w-4xl">
            <p className="text-cri-ink-muted mb-8 text-sm">Dernière mise à jour : juillet 2026</p>

            <h2 className="text-cri-forest mb-3 mt-8 font-serif text-2xl font-bold">
              1. Éditeur du site
            </h2>
            <p className="text-cri-humus leading-relaxed">
              <strong>Cocoa Ranch &amp; Industry</strong> (CRI)
              <br />
              Programme porté par AGRO-PME Fondation
              <br />
              Cameroun, Bassin du Mungo
              <br />
              Email :{" "}
              <a href="mailto:contact@cri.africa" className="text-cri-cacao hover:underline">
                contact@cri.africa
              </a>
            </p>

            <h2 className="text-cri-forest mb-3 mt-8 font-serif text-2xl font-bold">
              2. Hébergement
            </h2>
            <p className="text-cri-humus leading-relaxed">
              <strong>Vercel Inc.</strong> — CDN edge global
              <br />
              <strong>Firebase / Google Cloud Platform</strong> — région europe-west1 (Belgique)
            </p>

            <h2 className="text-cri-forest mb-3 mt-8 font-serif text-2xl font-bold">
              3. Propriété intellectuelle
            </h2>
            <p className="text-cri-humus leading-relaxed">
              L&apos;ensemble des contenus (textes, images, logos, vidéos, schémas) présents sur ce
              site est la propriété exclusive de Cocoa Ranch &amp; Industry / AGRO-PME Fondation ou
              de leurs partenaires. Toute reproduction sans autorisation préalable est interdite.
            </p>

            <h2 className="text-cri-forest mb-3 mt-8 font-serif text-2xl font-bold">
              4. Données personnelles
            </h2>
            <p className="text-cri-humus leading-relaxed">
              Voir notre{" "}
              <a href="/privacy" className="text-cri-cacao hover:underline">
                politique de confidentialité
              </a>
              .
            </p>

            <h2 className="text-cri-forest mb-3 mt-8 font-serif text-2xl font-bold">
              5. Limitation de responsabilité
            </h2>
            <p className="text-cri-humus leading-relaxed">
              Les informations publiées sur ce site sont fournies à titre indicatif. Malgré le soin
              apporté à leur mise à jour, Cocoa Ranch &amp; Industry ne saurait être tenu
              responsable des erreurs, d&apos;une absence de disponibilité des informations ou de la
              présence de virus sur le site.
            </p>

            <h2 className="text-cri-forest mb-3 mt-8 font-serif text-2xl font-bold">
              6. Droit applicable
            </h2>
            <p className="text-cri-humus leading-relaxed">
              Le présent site est soumis au droit camerounais et, en matière de protection des
              données personnelles, au RGPD (UE 2016/679) et à la Loi n° 2010/012 du Cameroun.
            </p>

            <h2 className="text-cri-forest mb-3 mt-8 font-serif text-2xl font-bold">7. Contact</h2>
            <p className="text-cri-humus leading-relaxed">
              Pour toute question :{" "}
              <a href="mailto:contact@cri.africa" className="text-cri-cacao hover:underline">
                contact@cri.africa
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
