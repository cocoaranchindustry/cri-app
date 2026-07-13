"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

/**
 * Bandeau cookies — RGPD / CNIL
 *
 * - Plausible = sans cookie, pas de consentement requis
 * - Bandeau minimal, refus par défaut des cookies non-essentiels
 * - Stockage du choix dans localStorage (clé "cri-consent")
 */

const CONSENT_KEY = "cri-consent";

export const CookieBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Délai pour ne pas bloquer le rendu initial
      const t = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(t);
    }
    return undefined;
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setShow(false);
  };

  const refuse = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="bg-cri-forest rounded-cri shadow-cri-lg border-cri-gold animate-slide-up fixed bottom-4 left-4 right-4 z-50 border-2 p-6 text-white md:left-auto md:right-4 md:max-w-md"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 id="cookie-title" className="text-cri-gold font-serif text-lg font-bold">
          🍪 Cookies &amp; confidentialité
        </h2>
        <button
          type="button"
          onClick={refuse}
          className="text-cri-parchment/80 hover:text-white"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <p id="cookie-desc" className="text-cri-parchment/90 mt-3 text-sm">
        Nous utilisons des cookies <strong>strictement nécessaires</strong> (session) et un outil
        d&apos;analyse anonymisé (Plausible, sans cookie). Aucun traceur publicitaire.
        <Link href="/privacy" className="text-cri-gold ml-1 underline">
          Politique de confidentialité
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={accept}
          className="bg-cri-gold text-cri-humus rounded-cri hover:bg-cri-gold-light flex-1 px-4 py-2 text-sm font-bold transition-colors"
        >
          Accepter
        </button>
        <button
          type="button"
          onClick={refuse}
          className="border-cri-parchment/30 rounded-cri hover:bg-cri-canopy flex-1 border bg-transparent px-4 py-2 text-sm font-bold text-white transition-colors"
        >
          Refuser
        </button>
      </div>
    </div>
  );
};
