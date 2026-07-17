import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité — Cocoa Ranch & Industry",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          variant="image"
          image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=80"
          imageAlt="Cadenas de sécurité numérique sur fond bleu"
          badge="Vie privée"
          title="Politique de confidentialité"
          subtitle="Notre engagement pour la protection de vos données personnelles — RGPD, ANTIC Cameroun et EUDR."
          viewportHeight
        />

        <section className="bg-cri-parchment py-20 md:py-24">
          <div className="container-cri max-w-4xl">
            <p className="text-cri-ink-muted mb-8 text-sm">Dernière mise à jour : juillet 2026</p>

            <h2 className="text-cri-forest mb-3 mt-8 font-serif text-2xl font-bold">
              1. Responsable du traitement
            </h2>
            <p className="text-cri-humus leading-relaxed">
              <strong>Cocoa Ranch &amp; Industry</strong> — Programme porté par AGRO-PME Fondation
              (Cameroun).
              <br />
              Contact DPO :{" "}
              <a href="mailto:dpo@cri.africa" className="text-cri-cacao hover:underline">
                dpo@cri.africa
              </a>
            </p>

            <h2 className="text-cri-forest mb-3 mt-8 font-serif text-2xl font-bold">
              2. Données collectées
            </h2>
            <ul className="text-cri-humus list-disc space-y-2 pl-6 leading-relaxed">
              <li>
                <strong>Producteurs</strong> : identité, géolocalisation des parcelles (≥ 6
                décimales WGS84), composition du ménage (CLMRS), données économiques
              </li>
              <li>
                <strong>Visiteurs du site</strong> : analytique anonymisée (Plausible, sans cookie),
                cookies strictement nécessaires (session)
              </li>
              <li>
                <strong>Investisseurs</strong> : identité, organisation, KYC, accès aux documents,
                adresse IP (journalisée)
              </li>
              <li>
                <strong>Leads/Contacts</strong> : nom, email, message, IP hashée (SHA-256)
              </li>
            </ul>

            <h2 className="text-cri-forest mb-3 mt-8 font-serif text-2xl font-bold">
              3. Bases légales
            </h2>
            <ul className="text-cri-humus list-disc space-y-2 pl-6 leading-relaxed">
              <li>
                <strong>Consentement explicite</strong> pour les producteurs et la newsletter
              </li>
              <li>
                <strong>Intérêt légitime</strong> pour la sécurité, l&apos;anti-fraude, la
                traçabilité agricole
              </li>
              <li>
                <strong>Exécution contractuelle</strong> pour les investisseurs, clients et
                partenaires
              </li>
              <li>
                <strong>Obligation légale</strong> pour la conformité EUDR 2023/1115 et la
                régulation ANTIC
              </li>
            </ul>

            <h2 className="text-cri-forest mb-3 mt-8 font-serif text-2xl font-bold">
              4. Durée de conservation
            </h2>
            <div className="overflow-x-auto">
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="border-cri-cacao/30 border-b-2">
                    <th className="text-cri-forest py-2 text-left">Catégorie</th>
                    <th className="text-cri-forest py-2 text-left">Durée</th>
                  </tr>
                </thead>
                <tbody className="text-cri-humus">
                  <tr className="border-cri-moss/20 border-b">
                    <td className="py-2">Producteurs</td>
                    <td className="py-2">10 ans après dernière relation</td>
                  </tr>
                  <tr className="border-cri-moss/20 border-b">
                    <td className="py-2">Prospects / Leads</td>
                    <td className="py-2">3 ans</td>
                  </tr>
                  <tr className="border-cri-moss/20 border-b">
                    <td className="py-2">Investisseurs (KYC)</td>
                    <td className="py-2">10 ans (obligation comptable)</td>
                  </tr>
                  <tr className="border-cri-moss/20 border-b">
                    <td className="py-2">Logs serveur</td>
                    <td className="py-2">1 an</td>
                  </tr>
                  <tr>
                    <td className="py-2">Cookies de session</td>
                    <td className="py-2">Session (supprimés à la fermeture)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-cri-forest mb-3 mt-8 font-serif text-2xl font-bold">
              5. Sous-traitants
            </h2>
            <ul className="text-cri-humus list-disc space-y-2 pl-6 leading-relaxed">
              <li>
                <strong>Firebase / Google Cloud</strong> (région europe-west1) — hébergement, base
                de données, authentification
              </li>
              <li>
                <strong>Vercel</strong> — hébergement du site web (CDN edge)
              </li>
              <li>
                <strong>Brevo</strong> (ex-Sendinblue) — envoi d&apos;emails (UE)
              </li>
              <li>
                <strong>Plausible</strong> — analytics anonymisée (UE, sans cookie)
              </li>
              <li>
                <strong>Sentry</strong> — monitoring d&apos;erreurs (UE)
              </li>
            </ul>
            <p className="text-cri-humus mt-3 leading-relaxed">
              Tous nos sous-traitants sont signataires de clauses contractuelles types (SCC) pour
              les transferts hors UE.
            </p>

            <h2 className="text-cri-forest mb-3 mt-8 font-serif text-2xl font-bold">
              6. Vos droits
            </h2>
            <p className="text-cri-humus leading-relaxed">
              Conformément au RGPD, vous disposez à tout moment des droits suivants :
            </p>
            <ul className="text-cri-humus list-disc space-y-2 pl-6 leading-relaxed">
              <li>
                <strong>Droit d&apos;accès</strong> : savoir quelles données nous détenons sur vous
              </li>
              <li>
                <strong>Droit de rectification</strong> : corriger des données inexactes
              </li>
              <li>
                <strong>Droit à l&apos;effacement</strong> : demander la suppression (droit à
                l&apos;oubli)
              </li>
              <li>
                <strong>Droit à la portabilité</strong> : recevoir vos données dans un format
                structuré (JSON)
              </li>
              <li>
                <strong>Droit d&apos;opposition</strong> : vous opposer à un traitement
              </li>
              <li>
                <strong>Droit à la limitation</strong> : geler temporairement un traitement
              </li>
            </ul>
            <p className="text-cri-humus mt-3 leading-relaxed">
              Pour exercer vos droits :{" "}
              <a href="mailto:dpo@cri.africa" className="text-cri-cacao hover:underline">
                dpo@cri.africa
              </a>
              . Réponse sous <strong>30 jours</strong>.
            </p>
            <p className="text-cri-humus mt-2 leading-relaxed">
              En cas de réclamation, vous pouvez saisir la <strong>CNIL</strong> (France) ou l&apos;
              <strong>ANTIC</strong> (Cameroun).
            </p>

            <h2 className="text-cri-forest mb-3 mt-8 font-serif text-2xl font-bold">7. Sécurité</h2>
            <p className="text-cri-humus leading-relaxed">
              Nous mettons en œuvre les mesures techniques et organisationnelles appropriées :
            </p>
            <ul className="text-cri-humus list-disc space-y-2 pl-6 leading-relaxed">
              <li>Chiffrement TLS 1.3 (en transit) et AES-256 (at-rest)</li>
              <li>Firestore Security Rules strictes (multi-rôles, validation des données)</li>
              <li>Authentification multi-facteur (MFA TOTP) pour les rôles sensibles</li>
              <li>Audit logs immutables (toutes les écritures sensibles sont journalisées)</li>
              <li>Headers de sécurité HTTP stricts (CSP, HSTS, X-Frame-Options, etc.)</li>
              <li>Tests d&apos;intrusion réguliers et audits de sécurité</li>
            </ul>

            <h2 className="text-cri-forest mb-3 mt-8 font-serif text-2xl font-bold">
              8. Notification de violation
            </h2>
            <p className="text-cri-humus leading-relaxed">
              En cas de violation de données personnelles, nous notifierons la CNIL et/ou
              l&apos;ANTIC dans les <strong>72 heures</strong> et informerons les personnes
              concernées si la violation présente un risque élevé pour leurs droits.
            </p>

            <h2 className="text-cri-forest mb-3 mt-8 font-serif text-2xl font-bold">9. Cookies</h2>
            <p className="text-cri-humus leading-relaxed">Notre site utilise uniquement :</p>
            <ul className="text-cri-humus list-disc space-y-2 pl-6 leading-relaxed">
              <li>
                <strong>Cookies strictement nécessaires</strong> (session, sécurité) — pas de
                consentement requis
              </li>
              <li>
                <strong>Plausible Analytics</strong> — analytique anonymisée, sans cookie
              </li>
            </ul>
            <p className="text-cri-humus mt-3 leading-relaxed">
              Nous n&apos;utilisons aucun cookie publicitaire ou de traçage tiers.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
