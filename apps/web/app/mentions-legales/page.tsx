import type { Metadata } from "next";
import { Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales — Cocoa Ranch & Industry",
};

export default function LegalPage() {
  return (
    <main className="container-cri max-w-4xl py-16">
      <div className="mb-6 flex items-center gap-3">
        <Scale className="text-cri-cacao h-10 w-10" aria-hidden="true" />
        <h1>Mentions légales</h1>
      </div>
      <p className="text-cri-ink-muted text-sm">Dernière mise à jour : juillet 2026</p>

      <h2 className="mt-8">1. Éditeur du site</h2>
      <p>
        <strong>Cocoa Ranch &amp; Industry</strong> (CRI)
        <br />
        Programme porté par AGRO-PME Fondation
        <br />
        Cameroun, Bassin du Mungo
        <br />
        Email : <a href="mailto:contact@cri.africa">contact@cri.africa</a>
      </p>

      <h2 className="mt-8">2. Hébergement</h2>
      <p>
        <strong>Vercel Inc.</strong> — CDN edge global
        <br />
        <strong>Firebase / Google Cloud Platform</strong> — région europe-west1 (Belgique)
      </p>

      <h2 className="mt-8">3. Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus (textes, images, logos, vidéos, schémas) présents sur ce site
        est la propriété exclusive de Cocoa Ranch &amp; Industry / AGRO-PME Fondation ou de leurs
        partenaires. Toute reproduction sans autorisation préalable est interdite.
      </p>

      <h2 className="mt-8">4. Données personnelles</h2>
      <p>
        Voir notre <a href="/privacy">politique de confidentialité</a>.
      </p>

      <h2 className="mt-8">5. Limitation de responsabilité</h2>
      <p>
        Les informations publiées sur ce site sont fournies à titre indicatif. Malgré le soin
        apporté à leur mise à jour, Cocoa Ranch &amp; Industry ne saurait être tenu responsable des
        erreurs, d&apos;une absence de disponibilité des informations ou de la présence de virus sur
        le site.
      </p>

      <h2 className="mt-8">6. Droit applicable</h2>
      <p>
        Le présent site est soumis au droit camerounais et, en matière de protection des données
        personnelles, au RGPD (UE 2016/679) et à la Loi n° 2010/012 du Cameroun.
      </p>

      <h2 className="mt-8">7. Contact</h2>
      <p>
        Pour toute question : <a href="mailto:contact@cri.africa">contact@cri.africa</a>
      </p>
    </main>
  );
}
