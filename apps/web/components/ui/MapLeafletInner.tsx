"use client";

import * as React from "react";
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapLeafletProps, MapMarker, MarkerKind } from "./MapLeaflet";

/**
 * MapLeafletInner — Composant Leaflet interne
 *
 * Importé en dynamic({ ssr: false }) depuis MapLeaflet.
 * Crée des icônes SVG inline (pas de bug d'icônes Leaflet cassées).
 */

const SVG_ICONS: Record<MarkerKind, L.DivIcon> = {
  city: L.divIcon({
    className: "cri-marker",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    html: `<div style="
      width:28px;height:28px;border-radius:50%;
      background:#1F4A2E;color:#F5EFE0;
      display:flex;align-items:center;justify-content:center;
      border:3px solid #F5EFE0;
      box-shadow:0 2px 6px rgba(0,0,0,0.3);
      font-size:11px;font-weight:700;
    ">★</div>`,
  }),
  village: L.divIcon({
    className: "cri-marker",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    html: `<div style="
      width:22px;height:22px;border-radius:50%;
      background:#2D6B3E;color:#F5EFE0;
      display:flex;align-items:center;justify-content:center;
      border:2px solid #F5EFE0;
      box-shadow:0 2px 4px rgba(0,0,0,0.3);
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22V12"/>
        <path d="M5 12c0-3.5 3-6 7-6s7 2.5 7 6c0 2-1 4-3 5h-8c-2-1-3-3-3-5z"/>
      </svg>
    </div>`,
  }),
  site: L.divIcon({
    className: "cri-marker",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    html: `<div style="
      width:30px;height:30px;border-radius:6px;transform:rotate(45deg);
      background:#9C4A1A;color:#F5EFE0;
      display:flex;align-items:center;justify-content:center;
      border:3px solid #F5EFE0;
      box-shadow:0 2px 8px rgba(0,0,0,0.4);
    "></div>`,
  }),
  farm: L.divIcon({
    className: "cri-marker",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    html: `<div style="
      width:30px;height:30px;border-radius:6px;transform:rotate(45deg);
      background:#D4A024;color:#1F4A2E;
      display:flex;align-items:center;justify-content:center;
      border:3px solid #F5EFE0;
      box-shadow:0 2px 8px rgba(0,0,0,0.4);
    "></div>`,
  }),
};

const CIRCLE_COLORS: Record<MarkerKind, string> = {
  city: "#1F4A2E",
  village: "#2D6B3E",
  site: "#9C4A1A",
  farm: "#D4A024",
};

const MapLeafletInner: React.FC<MapLeafletProps> = ({
  center,
  zoom = 11,
  markers = [],
  height = 400,
}) => {
  return (
    <div
      className="rounded-2xl overflow-hidden border-2 border-cri-moss/20 shadow-soft"
      style={{ height }}
    >
      <LeafletMapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((m: MapMarker) => (
          <React.Fragment key={m.id}>
            <Marker position={m.position} icon={SVG_ICONS[m.kind]}>
              <Popup>
                <div className="font-sans">
                  <strong className="text-cri-forest text-sm">{m.name}</strong>
                  {m.description && (
                    <p className="text-xs text-cri-ink-muted mt-1 max-w-[200px]">
                      {m.description}
                    </p>
                  )}
                </div>
              </Popup>
              <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                {m.name}
              </Tooltip>
            </Marker>
            {/* Halo de visibilité */}
            <CircleMarker
              center={m.position}
              radius={m.kind === "city" ? 18 : 12}
              pathOptions={{
                color: CIRCLE_COLORS[m.kind],
                fillColor: CIRCLE_COLORS[m.kind],
                fillOpacity: 0.08,
                weight: 1,
                opacity: 0.5,
              }}
            />
          </React.Fragment>
        ))}
      </LeafletMapContainer>
    </div>
  );
};

export default MapLeafletInner;
