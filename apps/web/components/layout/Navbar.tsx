"use client";

import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

/**
 * Navbar — Brandbook CRI v5
 *
 * Sticky, fond vert profond (cri-forest), liens blancs/or.
 * Menu mobile : drawer plein écran.
 * CTA "Investisseurs" en bouton or.
 */

const NAV_ITEMS = [
  { href: "/projet", label: "Le projet" },
  { href: "/activites", label: "Activités", children: [
    { href: "/activites/cacao", label: "Cacao Premium" },
    { href: "/activites/provendes", label: "Provendes & Ferme" },
  ] },
  { href: "/impact", label: "Impact RSE" },
  { href: "/produits", label: "Produits" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-cri-forest text-white shadow-cri">
      <nav className="container-cri flex items-center justify-between h-20" aria-label="Navigation principale">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="h-12 w-12 text-cri-gold" />
          <div className="hidden sm:block">
            <div className="font-serif font-bold text-white text-lg leading-none">
              Cocoa Ranch
            </div>
            <div className="text-cri-gold text-xs uppercase tracking-wider font-bold">
              &amp; Industry
            </div>
          </div>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="relative group">
              <Link
                href={item.href}
                className="text-white hover:text-cri-gold transition-colors font-bold text-sm uppercase tracking-wider flex items-center"
              >
                {item.label}
                {item.children && (
                  <ChevronDown className="ml-1 h-3 w-3" aria-hidden="true" />
                )}
              </Link>
              {item.children && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white text-cri-humus shadow-cri-lg rounded-cri opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-3 hover:bg-cri-parchment hover:text-cri-canopy text-sm"
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
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/lang/en"
            className="text-cri-gold hover:text-cri-gold-light text-sm font-bold"
            aria-label="Switch to English"
          >
            EN
          </Link>
          <Link
            href="/investisseurs"
            className="btn bg-cri-gold text-cri-humus hover:bg-cri-gold-light text-sm px-5 py-2"
          >
            Investisseurs
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden p-2 text-white hover:text-cri-gold"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-cri-canopy bg-cri-forest text-white">
          <ul className="container-cri py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() =>
                    setOpenSubmenu(openSubmenu === item.href ? null : item.href)
                  }
                  className={cn(
                    "w-full flex items-center justify-between py-3 px-2 text-white hover:text-cri-gold font-bold uppercase text-sm tracking-wider"
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
                  <ul className="pl-4 pb-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block py-2 text-cri-parchment hover:text-cri-gold text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {(!item.children || openSubmenu !== item.href) && !item.children && (
                  <Link
                    href={item.href}
                    className="block py-3 px-2 text-white hover:text-cri-gold"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="pt-4 border-t border-cri-canopy">
              <Link
                href="/investisseurs"
                className="block text-center btn bg-cri-gold text-cri-humus py-3"
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
