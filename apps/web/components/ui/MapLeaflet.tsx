"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { MapPin, Factory, TreePine, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * MapLeaflet — Carte interactive du Bassin du Mungo (Cameroun)
 *
 * Affiche 3 types de marqueurs :
 * - Ville centre (Penja)
 * - 6 villages de producteurs
 * - 2 sites industriels (usine de séchage + ferme intégrée)
 *
 * Lazy-loaded (next/dynamic) pour éviter SSR sur Leaflet.
 * Style de tuiles : OpenStreetMap (fallback OpenTopoMap).
 */
export type MarkerKind = "city" | "village" | "site" | "farm";

export interface MapMarker {
  id: string;
  name: string;
  position: [number, number];
  kind: MarkerKind;
  description?: string;
}

export interface MapLeafletProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
  height?: number;
}

const DEFAULT_CENTER: [number, number] = [4.65, 9.85]; // Njombé-Penja, Bassin du Mungo
const DEFAULT_ZOOM = 11;

const DEFAULT_MARKERS: MapMarker[] = [
  {
    id: "penja",
    name: "Penja (chef-lieu)",
    position: [4.6389, 9.8794],
    kind: "city",
    description: "Bassin du Mungo, département du Moungo",
  },
  { id: "njombe", name: "Njombé", position: [4.58, 9.85], kind: "city" },
  { id: "tombel", name: "Tombel", position: [4.75, 9.81], kind: "village" },
  { id: "ekombite", name: "Village Ekombité", position: [4.62, 9.92], kind: "village" },
  { id: "loumgou", name: "Loumgou", position: [4.69, 9.88], kind: "village" },
  { id: "mamelles", name: "Mamelles", position: [4.59, 9.83], kind: "village" },
  { id: "baboutcha", name: "Baboutcha", position: [4.71, 9.86], kind: "village" },
  { id: "nkongsamba", name: "Nkongsamba", position: [4.95, 9.93], kind: "village" },
  {
    id: "usine",
    name: "Usine de séchage CRI",
    position: [4.63, 9.87],
    kind: "site",
    description: "Capacité 1 200 t/an, fermentation 7 jours, séchage premium",
  },
  {
    id: "ferme",
    name: "Ferme intégrée",
    position: [4.66, 9.89],
    kind: "farm",
    description: "200 ha de cacao agroforestier, 15 000 poulets/an",
  },
];

/**
 * Skeleton affiché pendant le chargement de Leaflet.
 * Reproduit la structure d'une carte (légende + zone centrale).
 */
const MapSkeleton: React.FC<{ height: number }> = ({ height }) => (
  <div
    className="bg-cri-cream border-cri-moss/20 flex w-full items-center justify-center rounded-2xl border-2"
    style={{ height }}
    role="status"
    aria-label="Chargement de la carte"
  >
    <div className="text-cri-ink-muted flex flex-col items-center gap-3">
      <Loader2 className="text-cri-cacao h-8 w-8 animate-spin" aria-hidden="true" />
      <p className="text-sm font-medium">Chargement de la carte…</p>
    </div>
  </div>
);

const MapContainer = dynamic(() => import("./MapLeafletInner"), {
  ssr: false,
  loading: () => <MapSkeleton height={400} />,
});

const kindIcon: Record<MarkerKind, React.ReactNode> = {
  city: <MapPin className="h-3.5 w-3.5" aria-hidden="true" />,
  village: <TreePine className="h-3.5 w-3.5" aria-hidden="true" />,
  site: <Factory className="h-3.5 w-3.5" aria-hidden="true" />,
  farm: <Factory className="h-3.5 w-3.5" aria-hidden="true" />,
};

const kindColor: Record<MarkerKind, string> = {
  city: "bg-cri-forest text-cri-text-on-dark",
  village: "bg-cri-canopy text-cri-text-on-dark",
  site: "bg-cri-cacao text-cri-text-on-dark",
  farm: "bg-cri-gold text-cri-forest",
};

const kindLabel: Record<MarkerKind, string> = {
  city: "Ville centre",
  village: "Village producteur",
  site: "Site industriel",
  farm: "Ferme intégrée",
};

export const MapLeaflet: React.FC<MapLeafletProps> = ({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  markers = DEFAULT_MARKERS,
  className,
  height = 400,
}) => {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => setIsClient(true), []);

  // Comptage par type pour la légende
  const counts = markers.reduce(
    (acc, m) => {
      acc[m.kind] = (acc[m.kind] || 0) + 1;
      return acc;
    },
    {} as Record<MarkerKind, number>
  );

  return (
    <div className={cn("space-y-4", className)}>
      {/* Légende */}
      <div className="flex flex-wrap gap-3 text-xs" role="list" aria-label="Légende de la carte">
        {(Object.keys(kindLabel) as MarkerKind[]).map((kind) => (
          <div
            key={kind}
            role="listitem"
            className="bg-cri-parchment border-cri-moss/20 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
          >
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full",
                kindColor[kind]
              )}
              aria-hidden="true"
            >
              {kindIcon[kind]}
            </span>
            <span className="text-cri-forest font-semibold">{kindLabel[kind]}</span>
            <span className="text-cri-ink-muted tabular-nums">({counts[kind] || 0})</span>
          </div>
        ))}
      </div>

      {/* Carte */}
      {isClient ? (
        <MapContainer center={center} zoom={zoom} markers={markers} height={height} />
      ) : (
        <MapSkeleton height={height} />
      )}
    </div>
  );
};

export default MapLeaflet;
