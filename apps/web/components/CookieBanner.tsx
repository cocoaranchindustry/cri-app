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
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Délai pour ne pas bloquer le rendu initial
      const t = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(t);
    }
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
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-cri-forest text-white p-6 rounded-cri shadow-cri-lg border-2 border-cri-gold animate-slide-up"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 id="cookie-title" className="text-cri-gold font-serif font-bold text-lg">
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
      <p id="cookie-desc" className="text-sm text-cri-parchment/90 mt-3">
        Nous utilisons des cookies <strong>strictement nécessaires</strong> (session)
        et un outil d&apos;analyse anonymisé (Plausible, sans cookie).
        Aucun traceur publicitaire.
        <Link href="/privacy" className="text-cri-gold underline ml-1">
          Politique de confidentialité
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={accept}
          className="flex-1 bg-cri-gold text-cri-humus font-bold py-2 px-4 rounded-cri text-sm hover:bg-cri-gold-light transition-colors"
        >
          Accepter
        </button>
        <button
          type="button"
          onClick={refuse}
          className="flex-1 bg-transparent border border-cri-parchment/30 text-white font-bold py-2 px-4 rounded-cri text-sm hover:bg-cri-canopy transition-colors"
        >
          Refuser
        </button>
      </div>
    </div>
  );
};
