"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

/**
 * Bouton WhatsApp flottant — accessible et discret.
 *
 * - Toujours visible (sticky bottom-right).
 * - Animation d'apparition après 1,2s pour ne pas distraire
 *   lors du premier rendu.
 * - Lien `wa.me` avec message pré-rempli professionnel.
 * - Conforme RGPD : aucune donnée collectée, pas de cookie.
 * - Conforme Brandbook : couleur or/cacao pour rester cohérent
 *   avec le système de design (pas de vert saturé cri-canopy).
 *
 * À utiliser dans le layout racine pour qu'il apparaisse
 * sur toutes les pages.
 */
const PHONE_E164 = "237694897710";
const DEFAULT_MESSAGE =
  "Bonjour CRI, je souhaite en savoir plus sur votre projet d'agropole circulaire au Cameroun.";

export const WhatsAppButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  const url = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 print:hidden"
      role="complementary"
      aria-label="Contact WhatsApp rapide"
    >
      {open && (
        <div
          className="border-cri-gold/40 animate-fade-in-up w-72 rounded-2xl border-2 bg-white p-5 shadow-2xl"
          role="dialog"
          aria-labelledby="wa-title"
        >
          <div className="mb-3 flex items-start justify-between">
            <div>
              <p id="wa-title" className="text-cri-forest font-serif text-base font-bold">
                Discutons sur WhatsApp
              </p>
              <p className="text-cri-ink-muted mt-0.5 text-xs">Réponse sous 24h ouvrées</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-cri-ink-muted hover:text-cri-forest focus:ring-cri-gold -m-1 rounded p-1 transition-colors focus:outline-none focus:ring-2"
              aria-label="Fermer la fenêtre WhatsApp"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-cri-ink-muted mb-4 text-sm leading-relaxed">
            Échangez directement avec notre équipe sur le cacao premium, les provendes brevetées
            OAPI ou les opportunités de partenariat.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1FB85A] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Démarrer la discussion
          </a>
          <p className="text-cri-ink-muted mt-3 text-center text-[10px]">
            +237 694 89 77 10 · Présidence CRI
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:bg-[#1FB85A] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label={open ? "Fermer le contact WhatsApp" : "Ouvrir le contact WhatsApp"}
        aria-expanded={open}
      >
        <span
          className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-50"
          aria-hidden="true"
        />
        <MessageCircle className="relative z-10 h-6 w-6" aria-hidden="true" />
        <span className="sr-only">Contacter CRI sur WhatsApp</span>
      </button>
    </div>
  );
};

export default WhatsAppButton;
