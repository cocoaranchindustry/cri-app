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
          className="bg-white rounded-2xl shadow-2xl border-2 border-cri-gold/40 p-5 w-72 animate-fade-in-up"
          role="dialog"
          aria-labelledby="wa-title"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <p
                id="wa-title"
                className="font-serif font-bold text-cri-forest text-base"
              >
                Discutons sur WhatsApp
              </p>
              <p className="text-xs text-cri-ink-muted mt-0.5">
                Réponse sous 24h ouvrées
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-cri-ink-muted hover:text-cri-forest transition-colors p-1 -m-1 rounded focus:outline-none focus:ring-2 focus:ring-cri-gold"
              aria-label="Fermer la fenêtre WhatsApp"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-cri-ink-muted leading-relaxed mb-4">
            Échangez directement avec notre équipe sur le cacao premium,
            les provendes brevetées OAPI ou les opportunités de partenariat.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#1FB85A] text-white font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Démarrer la discussion
          </a>
          <p className="text-[10px] text-center text-cri-ink-muted mt-3">
            +237 694 89 77 10 · Présidence CRI
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1FB85A] text-white shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 flex items-center justify-center"
        aria-label={open ? "Fermer le contact WhatsApp" : "Ouvrir le contact WhatsApp"}
        aria-expanded={open}
      >
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-ping"
          aria-hidden="true"
        />
        <MessageCircle className="h-6 w-6 relative z-10" aria-hidden="true" />
        <span className="sr-only">Contacter CRI sur WhatsApp</span>
      </button>
    </div>
  );
};

export default WhatsAppButton;
