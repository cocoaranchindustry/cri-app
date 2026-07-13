import * as React from "react";
import Link from "next/link";
import { Logo } from "./Logo";

/**
 * Footer — Brandbook CRI v5
 *
 * Fond vert profond, liens or cacao, mentions légales.
 * 4 colonnes : Logo+description, Navigation, Activités, Contact + Social.
 */

const FOOTER_LINKS = {
  projet: [
    { href: "/projet", label: "Notre mission" },
    { href: "/impact", label: "Impact RSE" },
    { href: "/brevet", label: "Brevet OAPI" },
  ],
  activites: [
    { href: "/activites/cacao", label: "Cacao Premium" },
    { href: "/activites/provendes", label: "Provendes animales" },
    { href: "/activites/elevage", label: "Ferme intégrée" },
  ],
  ressources: [
    { href: "/actualites", label: "Actualités" },
    { href: "/publications", label: "Publications" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/privacy", label: "Politique de confidentialité" },
    { href: "/cookies", label: "Gestion des cookies" },
  ],
};

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-cri-forest text-cri-parchment">
      <div className="container-cri py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo + description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Logo className="h-12 w-12 text-cri-gold" />
              <div>
                <div className="font-serif font-bold text-white text-lg">
                  Cocoa Ranch
                </div>
                <div className="text-cri-gold text-xs uppercase tracking-wider font-bold">
                  &amp; Industry
                </div>
              </div>
            </div>
            <p className="text-sm text-cri-parchment/80 max-w-md">
              Agropole agro-industriel camerounais à économie circulaire :
              cacao premium zéro déforestation, provendes animales brevetées,
              1 200 producteurs accompagnés.
            </p>
            <div className="mt-6">
              <p className="text-xs text-cri-gold uppercase font-bold tracking-wider">
                Cameroun · Bassin du Mungo
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-cri-gold text-label uppercase font-bold tracking-wider mb-4">
              Le projet
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.projet.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cri-parchment/80 hover:text-cri-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Activités */}
          <div>
            <h3 className="text-cri-gold text-label uppercase font-bold tracking-wider mb-4">
              Activités
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.activites.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cri-parchment/80 hover:text-cri-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="text-cri-gold text-label uppercase font-bold tracking-wider mb-4">
              Ressources
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.ressources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cri-parchment/80 hover:text-cri-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-cri-canopy/30 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-cri-parchment/60">
            © {year} Cocoa Ranch &amp; Industry · AGRO-PME Fondation · Tous droits réservés
          </p>
          <ul className="flex flex-wrap gap-4 text-xs text-cri-parchment/60">
            {FOOTER_LINKS.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-cri-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
