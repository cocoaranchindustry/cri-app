import * as React from "react";
import Link from "next/link";
import { LogoMark } from "./Logo";

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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo + description */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <LogoMark size={48} />
              <div className="leading-none">
                <div className="font-serif text-xl font-black text-white">
                  COCOA <span className="text-cri-gold italic">RANCH</span>
                </div>
                <div className="text-cri-gold mt-1 text-[0.65rem] font-bold uppercase tracking-[0.2em]">
                  & Industry
                </div>
              </div>
            </div>
            <p className="text-cri-parchment/80 max-w-md text-sm">
              Agropole agro-industriel camerounais à économie circulaire : cacao premium zéro
              déforestation, provendes animales brevetées, 5 000 producteurs accompagnés.
            </p>
            <div className="mt-6 flex flex-col gap-1">
              <p className="text-cri-gold text-xs font-bold uppercase tracking-wider">
                Cameroun · Bassin du Mungo
              </p>
              <p className="text-cri-parchment/60 text-xs">AGRO-PME Fondation · Depuis 2010</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-cri-gold text-label mb-4 font-bold uppercase tracking-wider">
              Le projet
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.projet.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cri-parchment/80 hover:text-cri-gold text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Activités */}
          <div>
            <h3 className="text-cri-gold text-label mb-4 font-bold uppercase tracking-wider">
              Activités
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.activites.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cri-parchment/80 hover:text-cri-gold text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="text-cri-gold text-label mb-4 font-bold uppercase tracking-wider">
              Ressources
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.ressources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cri-parchment/80 hover:text-cri-gold text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-cri-canopy/30 mt-12 flex flex-col gap-4 border-t pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-cri-parchment/60 text-xs">
            © {year} Cocoa Ranch &amp; Industry · AGRO-PME Fondation · Tous droits réservés
          </p>
          <ul className="text-cri-parchment/60 flex flex-wrap gap-4 text-xs">
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
