"use client";

import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoMark } from "./Logo";

/**
 * Navbar — Brandbook CRI v6
 *
 * Sticky, fond vert profond (cri-forest), liens blancs/or.
 * Logo : emblème cabosse SVG (or) + wordmark "COCOA RANCH" en serif.
 * Menu mobile : drawer plein écran.
 * CTA "Investisseurs" en bouton or.
 */

const NAV_ITEMS = [
  { href: "/projet", label: "Le projet" },
  {
    href: "/activites",
    label: "Activités",
    children: [
      { href: "/activites/cacao", label: "Cacao Premium" },
      { href: "/activites/provendes", label: "Provendes & Ferme" },
    ],
  },
  { href: "/impact", label: "Impact RSE" },
  { href: "/produits", label: "Produits" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <header className="bg-cri-forest shadow-cri-lg border-cri-gold/20 sticky top-0 z-50 border-b-2 text-white">
      <nav
        className="container-cri flex h-20 items-center justify-between"
        aria-label="Navigation principale"
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="COCOA RANCH & INDUSTRY — Accueil"
        >
          <div className="relative">
            <LogoMark size={48} className="transition-transform group-hover:scale-105" />
            <div className="bg-cri-gold/20 absolute -inset-1 rounded-full opacity-0 blur-md transition-opacity group-hover:opacity-100" />
          </div>
          <div className="hidden leading-none sm:block">
            <div className="font-serif text-xl font-black tracking-tight text-white">
              COCOA <span className="text-cri-gold italic">RANCH</span>
            </div>
            <div className="text-cri-gold mt-1 text-[0.65rem] font-bold uppercase tracking-[0.2em]">
              & Industry
            </div>
            <div className="text-cri-parchment/60 mt-0.5 text-[0.6rem] uppercase tracking-wider">
              Agro-PME · Depuis 2010
            </div>
          </div>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="group relative">
              <Link
                href={item.href}
                className="hover:text-cri-gold flex items-center text-sm font-bold uppercase tracking-wider text-white transition-colors"
              >
                {item.label}
                {item.children && <ChevronDown className="ml-1 h-3 w-3" aria-hidden="true" />}
              </Link>
              {item.children && (
                <div className="text-cri-humus shadow-cri-lg rounded-cri invisible absolute left-0 top-full mt-2 w-56 bg-white opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="hover:bg-cri-parchment hover:text-cri-canopy block px-4 py-3 text-sm"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA Investisseurs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/lang/en"
            className="text-cri-gold hover:text-cri-gold-light text-sm font-bold"
            aria-label="Switch to English"
          >
            EN
          </Link>
          <Link
            href="/investisseurs"
            className="btn bg-cri-gold text-cri-humus hover:bg-cri-gold-light px-5 py-2 text-sm"
          >
            Investisseurs
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="hover:text-cri-gold p-2 text-white lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-cri-canopy bg-cri-forest border-t text-white lg:hidden">
          <ul className="container-cri space-y-1 py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => setOpenSubmenu(openSubmenu === item.href ? null : item.href)}
                  className={cn(
                    "hover:text-cri-gold flex w-full items-center justify-between px-2 py-3 text-sm font-bold uppercase tracking-wider text-white"
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openSubmenu === item.href && "rotate-180"
                      )}
                    />
                  )}
                </button>
                {item.children && openSubmenu === item.href && (
                  <ul className="pb-2 pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="text-cri-parchment hover:text-cri-gold block py-2 text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {!item.children && (
                  <Link
                    href={item.href}
                    className="hover:text-cri-gold block px-2 py-3 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="border-cri-canopy border-t pt-4">
              <Link
                href="/investisseurs"
                className="btn bg-cri-gold text-cri-humus block py-3 text-center"
                onClick={() => setIsOpen(false)}
              >
                Espace investisseurs
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
