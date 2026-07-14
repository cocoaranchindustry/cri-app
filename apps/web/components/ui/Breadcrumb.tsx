import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Breadcrumb — Fil d'Ariane brandbook-compliant
 *
 * Affiche : Accueil > Rubrique > Page
 */

export interface BreadcrumbItem {
  label: string;
  href?: string; // pas de href = page courante
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav
      aria-label="Fil d'Ariane"
      className={cn("container-cri text-cri-ink-muted py-4 text-sm", className)}
    >
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const isFirst = idx === 0;
          return (
            <li key={idx} className="flex items-center gap-1">
              {isFirst && <Home className="mr-1 h-4 w-4" aria-hidden="true" />}
              {item.href && !isLast ? (
                <Link href={item.href} className="text-cri-cacao hover:text-cri-gold font-medium">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn("font-medium", isLast ? "text-cri-forest" : "text-cri-ink-muted")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="text-cri-ink-muted h-4 w-4" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
