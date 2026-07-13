import type { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité — Cocoa Ranch & Industry",
};

export default function PrivacyPage() {
  return (
    <main className="container-cri max-w-4xl py-16">
      <div className="mb-6 flex items-center gap-3">
        <Shield className="text-cri-cacao h-10 w-10" aria-hidden="true" />
        <h1>Politique de confidentialité</h1>
      </div>
      <p className="text-cri-ink-muted text-sm">Dernière mise à jour : juillet 2026</p>

      <h2 className="mt-8">1. Responsable du traitement</h2>
      <p>
        <strong>Cocoa Ranch &amp; Industry</strong> — Programme porté par AGRO-PME Fondation
        (Cameroun).
        <br />
        Contact DPO : <a href="mailto:dpo@cri.africa">dpo@cri.africa</a>
      </p>

      <h2 className="mt-8">2. Données collectées</h2>
      <ul>
        <li>
          <strong>Producteurs</strong> : identité, géolocalisation des parcelles (≥ 6 décimales
          WGS84), composition du ménage (CLMRS), données économiques
        </li>
        <li>
          <strong>Visiteurs du site</strong> : analytique anonymisée (Plausible, sans cookie),
          cookies strictement nécessaires (session)
        </li>
        <li>
          <strong>Investisseurs</strong> : identité, organisation, KYC, accès aux documents, adresse
          IP (journalisée)
        </li>
        <li>
          <strong>Leads/Contacts</strong> : nom, email, message, IP hashée (SHA-256)
        </li>
      </ul>

      <h2 className="mt-8">3. Bases légales</h2>
      <ul>
        <li>
          <strong>Consentement explicite</strong> pour les producteurs et la newsletter
        </li>
        <li>
          <strong>Intérêt légitime</strong> pour la sécurité, l&apos;anti-fraude, la traçabilité
          agricole
        </li>
        <li>
          <strong>Exécution contractuelle</strong> pour les investisseurs, clients et partenaires
        </li>
        <li>
          <strong>Obligation légale</strong> pour la conformité EUDR 2023/1115 et la régulation
          ANTIC
        </li>
      </ul>

      <h2 className="mt-8">4. Durée de conservation</h2>
      <table className="mt-4 w-full text-sm">
        <thead>
          <tr>
            <th>Catégorie</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Producteurs</td>
            <td>10 ans après dernière relation</td>
          </tr>
          <tr>
            <td>Prospects / Leads</td>
            <td>3 ans</td>
          </tr>
          <tr>
            <td>Investisseurs (KYC)</td>
            <td>10 ans (obligation comptable)</td>
          </tr>
          <tr>
            <td>Logs serveur</td>
            <td>1 an</td>
          </tr>
          <tr>
            <td>Cookies de session</td>
            <td>Session (supprimés à la fermeture)</td>
          </tr>
        </tbody>
      </table>

      <h2 className="mt-8">5. Sous-traitants</h2>
      <ul>
        <li>
          <strong>Firebase / Google Cloud</strong> (région europe-west1) — hébergement, base de
          données, authentification
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
      <p>
        Tous nos sous-traitants sont signataires de clauses contractuelles types (SCC) pour les
        transferts hors UE.
      </p>

      <h2 className="mt-8">6. Vos droits</h2>
      <p>Conformément au RGPD, vous disposez à tout moment des droits suivants :</p>
      <ul>
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
          <strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré
          (JSON)
        </li>
        <li>
          <strong>Droit d&apos;opposition</strong> : vous opposer à un traitement
        </li>
        <li>
          <strong>Droit à la limitation</strong> : geler temporairement un traitement
        </li>
      </ul>
      <p>
        Pour exercer vos droits : <a href="mailto:dpo@cri.africa">dpo@cri.africa</a>. Réponse sous{" "}
        <strong>30 jours</strong>.
      </p>
      <p>
        En cas de réclamation, vous pouvez saisir la <strong>CNIL</strong> (France) ou l&apos;
        <strong>ANTIC</strong> (Cameroun).
      </p>

      <h2 className="mt-8">7. Sécurité</h2>
      <p>Nous mettons en œuvre les mesures techniques et organisationnelles appropriées :</p>
      <ul>
        <li>Chiffrement TLS 1.3 (en transit) et AES-256 (at-rest)</li>
        <li>Firestore Security Rules strictes (multi-rôles, validation des données)</li>
        <li>Authentification multi-facteur (MFA TOTP) pour les rôles sensibles</li>
        <li>Audit logs immutables (toutes les écritures sensibles sont journalisées)</li>
        <li>Headers de sécurité HTTP stricts (CSP, HSTS, X-Frame-Options, etc.)</li>
        <li>Tests d&apos;intrusion réguliers et audits de sécurité</li>
      </ul>

      <h2 className="mt-8">8. Notification de violation</h2>
      <p>
        En cas de violation de données personnelles, nous notifierons la CNIL et/ou l&apos;ANTIC
        dans les <strong>72 heures</strong> et informerons les personnes concernées si la violation
        présente un risque élevé pour leurs droits.
      </p>

      <h2 className="mt-8">9. Cookies</h2>
      <p>Notre site utilise uniquement :</p>
      <ul>
        <li>
          <strong>Cookies strictement nécessaires</strong> (session, sécurité) — pas de consentement
          requis
        </li>
        <li>
          <strong>Plausible Analytics</strong> — analytique anonymisée, sans cookie
        </li>
      </ul>
      <p>Nous n&apos;utilisons aucun cookie publicitaire ou de traçage tiers.</p>
    </main>
  );
}
