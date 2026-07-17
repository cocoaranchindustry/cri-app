"use client";

import * as React from "react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoMark } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Navbar — Brandbook CRI v6
 *
 * Sticky, fond vert profond (cri-forest), liens blancs/or.
 * Logo : image PNG officielle Cocoa Ranch + AGRO-PME.
 * Menu mobile : drawer plein écran.
 * CTA "Investisseurs" en bouton or.
 * Sélecteur de langue (FR/EN) via LanguageSwitcher.
 */

type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { href: "/projet", label: "Le projet" },
  {
    href: "/activites",
    label: "Activités",
    children: [
      { href: "/activites/cacao", label: "Cacao Premium" },
      { href: "/activites/provendes", label: "Provendes & Ferme" },
      { href: "/activites/elevage", label: "Élevage intégré" },
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
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-cri-gold/20 bg-cri-forest text-white shadow-cri-lg">
      <nav
        className="container-cri flex h-20 items-center justify-between"
        aria-label="Navigation principale"
      >
        {/* Logo — image PNG officielle */}
        <Link
          href="/"
          className="group flex items-center"
          aria-label="COCOA RANCH & INDUSTRY — Accueil"
        >
          <div className="relative">
            <LogoMark
              size={48}
              priority
              className="transition-transform group-hover:scale-105"
            />
            <div className="bg-cri-gold/20 absolute -inset-1 -z-10 rounded-full opacity-0 blur-md transition-opacity group-hover:opacity-100" />
          </div>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="group relative">
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex items-center text-sm font-bold uppercase tracking-wider transition-colors hover:text-cri-gold",
                  isActive(item.href) ? "text-cri-gold" : "text-white"
                )}
              >
                {item.label}
                {item.children && <ChevronDown className="ml-1 h-3 w-3" aria-hidden="true" />}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full z-10 mt-2 w-56 rounded-cri bg-white text-cri-humus opacity-0 shadow-cri-lg transition-all group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-3 text-sm hover:bg-cri-parchment hover:text-cri-canopy"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA Investisseurs + LanguageSwitcher */}
        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/investisseurs"
            aria-current={isActive("/investisseurs") ? "page" : undefined}
            className="btn bg-cri-gold px-5 py-2 text-sm text-cri-humus hover:bg-cri-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cri-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-cri-forest"
          >
            Investisseurs
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="p-2 text-white hover:text-cri-gold lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="border-t border-cri-canopy bg-cri-forest text-white lg:hidden"
        >
          <ul className="container-cri space-y-1 py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenSubmenu(openSubmenu === item.href ? null : item.href)
                      }
                      className="flex w-full items-center justify-between px-2 py-3 text-sm font-bold uppercase tracking-wider text-white hover:text-cri-gold"
                      aria-expanded={openSubmenu === item.href}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openSubmenu === item.href && "rotate-180"
                        )}
                      />
                    </button>
                    {openSubmenu === item.href && (
                      <ul className="pb-2 pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block py-2 text-sm text-cri-parchment hover:text-cri-gold"
                              onClick={() => setIsOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-2 py-3 text-white hover:text-cri-gold"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="border-t border-cri-canopy pt-4">
              <div className="flex items-center gap-3 px-2 pb-3">
                <LanguageSwitcher />
              </div>
              <Link
                href="/investisseurs"
                className="btn block bg-cri-gold py-3 text-center text-cri-humus"
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
