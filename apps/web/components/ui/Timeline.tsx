import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Timeline — Frise chronologique pour les jalons du projet
 *
 * Variantes :
 * - vertical (default) : colonne, bon pour les pages longues
 * - horizontal : ligne, bon pour les sections compactes
 */

export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  milestone?: boolean;
}

export interface TimelineProps {
  items: TimelineItem[];
  variant?: "vertical" | "horizontal";
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, variant = "vertical", className }) => {
  if (variant === "horizontal") {
    return (
      <div className={cn("grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5", className)}>
        {items.map((item, idx) => (
          <div key={idx} className="relative">
            <div className="bg-cri-gold text-cri-humus flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
              {idx + 1}
            </div>
            <div className="mt-4">
              <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
                {item.date}
              </span>
              <h4 className="text-cri-forest mt-2 text-lg font-bold">{item.title}</h4>
              <p className="text-cri-humus mt-1 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("relative space-y-8", className)}>
      {/* Ligne verticale */}
      <div className="bg-cri-cacao/30 absolute bottom-0 left-5 top-0 w-0.5" aria-hidden="true" />

      {items.map((item, idx) => (
        <div key={idx} className="relative flex items-start gap-6">
          {/* Point */}
          <div
            className={cn(
              "z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold",
              item.milestone
                ? "bg-cri-gold text-cri-humus shadow-cri-gold"
                : "bg-cri-forest text-white"
            )}
            aria-hidden="true"
          >
            {idx + 1}
          </div>

          {/* Contenu */}
          <div className="flex-1 pb-2">
            <span className="text-label text-cri-cacao font-bold uppercase tracking-wider">
              {item.date}
            </span>
            <h4 className="text-cri-forest mt-1 text-xl font-bold">{item.title}</h4>
            <p className="text-cri-humus mt-2">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
