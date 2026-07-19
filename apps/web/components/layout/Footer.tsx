"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "./Logo";

/**
 * Footer — Brandbook CRI v6
 *
 * Fond vert profond, liens parchemin, mentions légales.
 * 4 colonnes : Logo+description, Le projet, Activités, Ressources + barre légale.
 *
 * Internationalisation : tous les libellés et les liens sont lus
 * depuis les JSON `i18n/{fr,en}.json` via `useTranslations("footer")`
 * et `useTranslations("nav")`. Le `Link` provient de `@/i18n/navigation`
 * (et non `next/link` brut) afin de conserver le préfixe `/en` lors
 * d'une navigation depuis la version anglaise.
 */

type FooterLink = { href: string; key: "project" | "impact" | "brevet" };

const FOOTER_LINKS: {
  projet: FooterLink[];
  activites: { href: string; key: "cacao" | "provendes" | "elevage" }[];
  ressources: { href: string; key: "news" | "publications" | "contact" }[];
  legal: { href: string; key: "legal" | "privacy" | "cookies" }[];
} = {
  projet: [
    { href: "/projet", key: "project" },
    { href: "/impact", key: "impact" },
    { href: "/brevet", key: "brevet" },
  ],
  activites: [
    { href: "/activites/cacao", key: "cacao" },
    { href: "/activites/provendes", key: "provendes" },
    { href: "/activites/elevage", key: "elevage" },
  ],
  ressources: [
    { href: "/actualites", key: "news" },
    { href: "/publications", key: "publications" },
    { href: "/contact", key: "contact" },
  ],
  legal: [
    { href: "/mentions-legales", key: "legal" },
    { href: "/privacy", key: "privacy" },
    { href: "/cookies", key: "cookies" },
  ],
};

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const tFooter = useTranslations("footer");
  const tNav = useTranslations("nav");
  return (
    <footer className="bg-cri-forest text-cri-parchment">
      <div className="container-cri py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo + description */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              aria-label="COCOA RANCH & INDUSTRY — Accueil"
              className="mb-4 inline-block"
            >
              <LogoMark size={56} />
            </Link>
            <p className="text-cri-parchment/80 max-w-md text-sm">{tFooter("tagline")}</p>
            <div className="mt-6 flex flex-col gap-1">
              <p className="text-cri-gold text-xs font-bold uppercase tracking-wider">
                {tFooter("address")}
              </p>
              <p className="text-cri-parchment/60 text-xs">AGRO-PME Fondation · Depuis 2010</p>
            </div>
          </div>

          {/* Le projet */}
          <div>
            <h3 className="text-label text-cri-gold mb-4 font-bold uppercase tracking-wider">
              {tFooter("project")}
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.projet.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cri-parchment/80 hover:text-cri-gold text-sm"
                  >
                    {tFooter(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Activités */}
          <div>
            <h3 className="text-label text-cri-gold mb-4 font-bold uppercase tracking-wider">
              {tFooter("activities")}
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.activites.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cri-parchment/80 hover:text-cri-gold text-sm"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="text-label text-cri-gold mb-4 font-bold uppercase tracking-wider">
              {tFooter("resources")}
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.ressources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cri-parchment/80 hover:text-cri-gold text-sm"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-cri-canopy/30 mt-12 flex flex-col gap-4 border-t pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-cri-parchment/60 text-xs">{tFooter("copyright", { year })}</p>
          <ul className="text-cri-parchment/60 flex flex-wrap gap-4 text-xs">
            {FOOTER_LINKS.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-cri-gold">
                  {tFooter(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
