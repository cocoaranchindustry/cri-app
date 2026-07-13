"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ConsentForm — Formulaire de consentement RGPD / ANTIC
 *
 * Obligatoire avant toute saisie producteur (CDC traçabilité).
 * - Consentement explicite requis
 * - Possibilité de refuser
 * - Lien vers la politique de confidentialité
 *
 * @example
 * <ConsentForm onConsent={() => goToForm()} onRefuse={() => goBack()} />
 */

export interface ConsentFormProps {
  onConsent: () => void;
  onRefuse?: () => void;
  className?: string;
}

export const ConsentForm: React.FC<ConsentFormProps> = ({
  onConsent,
  onRefuse,
  className,
}) => {
  const [accepted, setAccepted] = useState(false);
  const [understand, setUnderstand] = useState({
    collecte: false,
    finalite: false,
    droits: false,
  });

  const allChecked = accepted && Object.values(understand).every(Boolean);

  return (
    <div
      className={cn(
        "bg-cri-parchment p-6 md:p-8 rounded-cri border-2 border-cri-cacao",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <ShieldCheck className="h-8 w-8 text-cri-cacao" aria-hidden="true" />
        <h2 className="text-2xl text-cri-cacao font-serif italic">
          Consentement RGPD / ANTIC
        </h2>
      </div>

      <p className="text-sm text-cri-humus mb-4">
        Les informations vous concernant (identité, géolocalisation de vos
        parcelles, composition du ménage, données économiques) sont collectées
        par <strong>Cocoa Ranch &amp; Industry</strong> dans le cadre du
        programme de traçabilité du cacao, en conformité avec :
      </p>
      <ul className="text-sm text-cri-humus list-disc pl-6 mb-4 space-y-1">
        <li>Le Règlement Général sur la Protection des Données (RGPD, UE)</li>
        <li>La Loi n° 2010/012 du Cameroun sur la cybersécurité</li>
        <li>La régulation de l&apos;ANTIC (Agence Nationale des TIC)</li>
      </ul>

      <p className="text-sm text-cri-humus mb-4">
        Vos données sont utilisées <strong>exclusivement</strong> pour :
      </p>
      <ul className="text-sm text-cri-humus list-disc pl-6 mb-4 space-y-1">
        <li>La traçabilité de votre production (parcelles, lots, paiements)</li>
        <li>Le respect des normes de durabilité (EUDR, CacaoTrace)</li>
        <li>Le calcul de vos primes qualité</li>
      </ul>

      <p className="text-sm text-cri-humus mb-4">
        Vous pouvez à tout moment exercer vos droits d&apos;<strong>accès</strong>,
        de <strong>rectification</strong>, d&apos;<strong>effacement</strong> et de
        <strong> portabilité</strong> en écrivant à{" "}
        <a href="mailto:dpo@cri.africa" className="text-cri-cacao underline">
          dpo@cri.africa
        </a>
        . Réponse sous 30 jours.
      </p>

      {/* Cases à cocher de compréhension */}
      <div className="space-y-3 my-6 p-4 bg-white/50 rounded-cri">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={understand.collecte}
            onChange={(e) => setUnderstand({ ...understand, collecte: e.target.checked })}
            className="mt-1 h-4 w-4 accent-cri-forest"
          />
          <span className="text-sm text-cri-humus">
            Je comprends quelles données sont collectées.
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={understand.finalite}
            onChange={(e) => setUnderstand({ ...understand, finalite: e.target.checked })}
            className="mt-1 h-4 w-4 accent-cri-forest"
          />
          <span className="text-sm text-cri-humus">
            Je comprends pourquoi mes données sont utilisées.
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={understand.droits}
            onChange={(e) => setUnderstand({ ...understand, droits: e.target.checked })}
            className="mt-1 h-4 w-4 accent-cri-forest"
          />
          <span className="text-sm text-cri-humus">
            Je sais que je peux exercer mes droits à tout moment.
          </span>
        </label>
      </div>

      <label className="flex items-start gap-3 cursor-pointer my-4">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1 h-5 w-5 accent-cri-forest"
        />
        <span className="text-sm font-bold text-cri-humus">
          Je consens librement au traitement de mes données personnelles pour
          la traçabilité cacao.
        </span>
      </label>

      <div className="flex flex-wrap gap-3 mt-6">
        <button
          type="button"
          disabled={!allChecked}
          onClick={onConsent}
          className="flex-1 btn bg-cri-forest text-white hover:bg-cri-canopy disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuer l&apos;enregistrement
        </button>
        {onRefuse && (
          <button
            type="button"
            onClick={onRefuse}
            className="btn bg-transparent border-2 border-cri-cacao text-cri-cacao hover:bg-cri-cacao hover:text-white"
          >
            Refuser
          </button>
        )}
      </div>
    </div>
  );
};
