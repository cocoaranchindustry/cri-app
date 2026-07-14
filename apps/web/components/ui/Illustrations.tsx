import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Bibliothèque d'illustrations vectorielles immersives — Brandbook CRI v6
 *
 * Toutes les illustrations respectent la charte officielle :
 * - Forêt / canopée (#1F4A2E, #2D6B3E)
 * - Cacao brûlé / cabosse (#9C4A1A, #7A3812)
 * - Or vif (#D4A024)
 * - Crème (#F5EFE0, #E5DCC8)
 *
 * Aucune couleur rouge ou bleue. Pas d'emoji.
 *
 * Ces illustrations sont des **fallbacks immersifs** lorsque les photos
 * terrain ne sont pas disponibles. Elles utilisent des SVG natifs (zéro
 * dépendance externe, zero requete reseau) et restent legeres en bundle.
 *
 * Catalogue :
 *  - HeroCabosse   : cabosse ouverte avec fèves dorées (hero home)
 *  - PlantationSun : plantation + soleil + mont Mungo
 *  - FactoryBelt   : usine avec bande transporteuse
 *  - CattlePasture : pâturage bovin + arbre
 *  - CocoaPods     : motif de cabosses pour backgrounds
 *  - MapMungo      : carte stylisée du Bassin du Mungo
 *  - LabFlask      : laboratoire / brevet
 *  - HandsSoil     : mains + terre (producteur)
 *  - TruckLogistic : camion logistique
 *  - ChartGrowth   : graphique de croissance (impact)
 */

type IllustrationProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
  title?: string;
};

/* ============================================
   1. Hero Cabosse — cabosse ouverte avec fèves
   ============================================ */
export const HeroCabosse: React.FC<IllustrationProps> = ({
  className,
  title = "Cabosse de cacao ouverte avec fèves dorées",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 600"
    className={cn("h-auto w-full", className)}
    role="img"
    aria-label={title}
    {...props}
  >
    <defs>
      <radialGradient id="hc-bg" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#2D6B3E" />
        <stop offset="60%" stopColor="#1F4A2E" />
        <stop offset="100%" stopColor="#14322B" />
      </radialGradient>
      <linearGradient id="hc-pod" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#B5651F" />
        <stop offset="50%" stopColor="#9C4A1A" />
        <stop offset="100%" stopColor="#7A3812" />
      </linearGradient>
      <radialGradient id="hc-bean" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#E5B946" />
        <stop offset="100%" stopColor="#A87E15" />
      </radialGradient>
    </defs>

    {/* Fond gradient forêt */}
    <rect width="600" height="600" fill="url(#hc-bg)" />

    {/* Orbes décoratives */}
    <circle cx="120" cy="120" r="80" fill="#D4A024" opacity="0.12" />
    <circle cx="500" cy="500" r="120" fill="#9C4A1A" opacity="0.15" />

    {/* Cabosse ouverte (forme ovale) */}
    <g transform="translate(300 320)">
      {/* Coque arrière (cabosse coupée en deux) */}
      <ellipse cx="0" cy="0" rx="180" ry="220" fill="url(#hc-pod)" />
      <ellipse
        cx="0"
        cy="0"
        rx="180"
        ry="220"
        fill="none"
        stroke="#5A2A0E"
        strokeWidth="3"
        opacity="0.5"
      />

      {/* Côtes verticales */}
      {[-120, -80, -40, 0, 40, 80, 120].map((x) => (
        <path
          key={x}
          d={`M ${x} -200 Q ${x * 0.95} 0 ${x} 200`}
          fill="none"
          stroke="#5A2A0E"
          strokeWidth="2.5"
          opacity="0.4"
        />
      ))}

      {/* Chair blanche centrale (mucilage) */}
      <ellipse cx="0" cy="0" rx="120" ry="160" fill="#F5EFE0" opacity="0.95" />

      {/* Fibres blanches du mucilage */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = Math.cos(angle) * 40;
        const y1 = Math.sin(angle) * 50;
        const x2 = Math.cos(angle) * 110;
        const y2 = Math.sin(angle) * 140;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#E5DCC8"
            strokeWidth="1.5"
            opacity="0.7"
          />
        );
      })}

      {/* Fèves de cacao dorées */}
      {[
        { x: -50, y: -60, r: 22 },
        { x: 0, y: -80, r: 24 },
        { x: 55, y: -50, r: 22 },
        { x: -70, y: 10, r: 24 },
        { x: -10, y: -10, r: 26 },
        { x: 60, y: 20, r: 23 },
        { x: -45, y: 70, r: 22 },
        { x: 20, y: 80, r: 24 },
        { x: 75, y: 80, r: 21 },
        { x: -30, y: -130, r: 20 },
        { x: 30, y: 130, r: 20 },
      ].map((bean, i) => (
        <g key={i} transform={`translate(${bean.x} ${bean.y})`}>
          <ellipse cx="0" cy="0" rx={bean.r} ry={bean.r * 1.3} fill="url(#hc-bean)" />
          <ellipse
            cx="0"
            cy="0"
            rx={bean.r}
            ry={bean.r * 1.3}
            fill="none"
            stroke="#5A2A0E"
            strokeWidth="1.5"
          />
          <line x1="0" y1={-bean.r} x2="0" y2={bean.r} stroke="#5A2A0E" strokeWidth="1.5" />
        </g>
      ))}

      {/* Pédoncule */}
      <rect x="-12" y="-240" width="24" height="40" fill="#5A2A0E" rx="4" />
    </g>

    {/* Pédoncule + feuilles en haut */}
    <g transform="translate(300 80)">
      <path d="M 0 0 Q -25 -20 -45 -10 Q -25 5 0 0 Z" fill="#1F4A2E" />
      <path d="M 0 0 Q 25 -20 45 -10 Q 25 5 0 0 Z" fill="#2D6B3E" />
      <path d="M 0 0 L 0 25" stroke="#5A2A0E" strokeWidth="6" strokeLinecap="round" />
    </g>
  </svg>
);

/* ============================================
   2. PlantationSun — plantation + soleil + Mungo
   ============================================ */
export const PlantationSun: React.FC<IllustrationProps> = ({
  className,
  title = "Plantation de cacaoyers au soleil avec mont Mungo en arrière-plan",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 500"
    className={cn("h-auto w-full", className)}
    role="img"
    aria-label={title}
    {...props}
  >
    <defs>
      <linearGradient id="ps-sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F5EFE0" />
        <stop offset="60%" stopColor="#E5B946" />
        <stop offset="100%" stopColor="#D4A024" />
      </linearGradient>
      <linearGradient id="ps-mountain" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4A7C59" />
        <stop offset="100%" stopColor="#1F4A2E" />
      </linearGradient>
    </defs>

    {/* Ciel */}
    <rect width="800" height="500" fill="url(#ps-sky)" />

    {/* Soleil levant */}
    <circle cx="600" cy="160" r="60" fill="#F5EFE0" />
    <circle cx="600" cy="160" r="80" fill="#F5EFE0" opacity="0.3" />

    {/* Montagnes (Mungo) */}
    <path
      d="M 0 320 L 150 200 L 280 280 L 420 180 L 560 250 L 700 190 L 800 240 L 800 500 L 0 500 Z"
      fill="url(#ps-mountain)"
    />

    {/* Brume de la canopée */}
    <rect x="0" y="290" width="800" height="50" fill="#1F4A2E" opacity="0.3" />

    {/* Sol */}
    <rect x="0" y="380" width="800" height="120" fill="#7A3812" />
    <rect x="0" y="380" width="800" height="20" fill="#9C4A1A" />

    {/* Rangées de cacaoyers */}
    {[0, 1, 2].map((row) => (
      <g key={row} transform={`translate(0 ${400 + row * 30})`}>
        {[80, 220, 360, 500, 640, 760].map((x) => (
          <g key={x} transform={`translate(${x} 0)`}>
            {/* Tronc */}
            <rect x="-4" y="-60" width="8" height="60" fill="#5A2A0E" />
            {/* Feuillage */}
            <ellipse cx="0" cy="-70" rx="35" ry="25" fill="#1F4A2E" />
            <ellipse cx="-10" cy="-75" rx="20" ry="15" fill="#2D6B3E" />
            <ellipse cx="12" cy="-68" rx="18" ry="13" fill="#4A7C59" />
            {/* Cabosse */}
            <ellipse cx="6" cy="-50" rx="6" ry="9" fill="#9C4A1A" />
          </g>
        ))}
      </g>
    ))}

    {/* Oiseaux */}
    <path
      d="M 200 80 Q 210 70 220 80 Q 210 75 200 80"
      fill="none"
      stroke="#1F4A2E"
      strokeWidth="2"
    />
    <path
      d="M 250 100 Q 260 90 270 100 Q 260 95 250 100"
      fill="none"
      stroke="#1F4A2E"
      strokeWidth="2"
    />
    <path
      d="M 350 60 Q 360 50 370 60 Q 360 55 350 60"
      fill="none"
      stroke="#1F4A2E"
      strokeWidth="2"
    />
  </svg>
);

/* ============================================
   3. FactoryBelt — usine + bande transporteuse
   ============================================ */
export const FactoryBelt: React.FC<IllustrationProps> = ({
  className,
  title = "Usine de transformation avec bande transporteuse et fèves",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 500"
    className={cn("h-auto w-full", className)}
    role="img"
    aria-label={title}
    {...props}
  >
    <defs>
      <linearGradient id="fb-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#14322B" />
        <stop offset="100%" stopColor="#1F4A2E" />
      </linearGradient>
    </defs>

    <rect width="800" height="500" fill="url(#fb-bg)" />

    {/* Bâtiment usine (silhouette) */}
    <rect x="100" y="150" width="500" height="280" fill="#14322B" />
    <polygon points="100,150 350,80 600,150" fill="#1F4A2E" />

    {/* Fenêtres éclairées (or vif) */}
    {[
      { x: 140, y: 200, w: 30, h: 40 },
      { x: 200, y: 200, w: 30, h: 40 },
      { x: 260, y: 200, w: 30, h: 40 },
      { x: 320, y: 200, w: 30, h: 40 },
      { x: 380, y: 200, w: 30, h: 40 },
      { x: 440, y: 200, w: 30, h: 40 },
      { x: 500, y: 200, w: 30, h: 40 },
    ].map((w, i) => (
      <rect key={i} {...w} fill="#D4A024" opacity="0.7" />
    ))}

    {/* Cheminée avec vapeur */}
    <rect x="600" y="60" width="40" height="180" fill="#14322B" />
    <ellipse cx="620" cy="50" rx="30" ry="15" fill="#F5EFE0" opacity="0.4" />
    <ellipse cx="640" cy="30" rx="25" ry="12" fill="#F5EFE0" opacity="0.3" />

    {/* Bande transporteuse */}
    <rect x="0" y="380" width="800" height="40" fill="#7A3812" />
    <rect x="0" y="380" width="800" height="6" fill="#5A2A0E" />
    {/* Galets */}
    {Array.from({ length: 16 }).map((_, i) => (
      <circle key={i} cx={25 + i * 50} cy={420} r={12} fill="#1F4A2E" />
    ))}

    {/* Fèves sur la bande */}
    {Array.from({ length: 30 }).map((_, i) => (
      <ellipse key={i} cx={20 + i * 27} cy={395 + (i % 3) * 3} rx={6} ry={9} fill="#9C4A1A" />
    ))}

    {/* Sol */}
    <rect x="0" y="440" width="800" height="60" fill="#1F4A2E" />
  </svg>
);

/* ============================================
   4. CattlePasture — pâturage bovin + arbre
   ============================================ */
export const CattlePasture: React.FC<IllustrationProps> = ({
  className,
  title = "Pâturage bovin avec arbre ombragé pour la ferme intégrée",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 500"
    className={cn("h-auto w-full", className)}
    role="img"
    aria-label={title}
    {...props}
  >
    <defs>
      <linearGradient id="cp-sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#E5B946" />
        <stop offset="100%" stopColor="#F5EFE0" />
      </linearGradient>
    </defs>

    <rect width="800" height="500" fill="url(#cp-sky)" />

    {/* Soleil couchant */}
    <circle cx="200" cy="180" r="50" fill="#F5EFE0" />

    {/* Collines */}
    <path d="M 0 300 Q 200 250 400 280 T 800 270 L 800 500 L 0 500 Z" fill="#2D6B3E" />
    <path d="M 0 320 Q 200 290 400 310 T 800 300 L 800 500 L 0 500 Z" fill="#1F4A2E" />

    {/* Pâturage */}
    <rect x="0" y="350" width="800" height="150" fill="#4A7C59" />

    {/* Grand arbre central */}
    <g transform="translate(400 280)">
      <rect x="-12" y="0" width="24" height="100" fill="#5A2A0E" />
      <ellipse cx="0" cy="-30" rx="100" ry="70" fill="#1F4A2E" />
      <ellipse cx="-30" cy="-40" rx="60" ry="40" fill="#2D6B3E" />
      <ellipse cx="30" cy="-50" rx="55" ry="35" fill="#4A7C59" />
    </g>

    {/* Vaches */}
    {[
      { x: 150, y: 400 },
      { x: 280, y: 420 },
      { x: 600, y: 410 },
      { x: 700, y: 430 },
    ].map((cow, i) => (
      <g key={i} transform={`translate(${cow.x} ${cow.y})`}>
        {/* Corps */}
        <ellipse cx="0" cy="0" rx="35" ry="18" fill="#F5EFE0" />
        <ellipse cx="0" cy="0" rx="35" ry="18" fill="none" stroke="#5A2A0E" strokeWidth="2" />
        {/* Taches brunes */}
        <ellipse cx="-15" cy="-5" rx="10" ry="6" fill="#7A3812" />
        <ellipse cx="10" cy="2" rx="8" ry="5" fill="#7A3812" />
        {/* Pattes */}
        <rect x="-25" y="15" width="4" height="15" fill="#5A2A0E" />
        <rect x="-10" y="15" width="4" height="15" fill="#5A2A0E" />
        <rect x="10" y="15" width="4" height="15" fill="#5A2A0E" />
        <rect x="25" y="15" width="4" height="15" fill="#5A2A0E" />
        {/* Tête */}
        <ellipse
          cx="-40"
          cy="-5"
          rx="10"
          ry="8"
          fill="#F5EFE0"
          stroke="#5A2A0E"
          strokeWidth="1.5"
        />
        {/* Cornes */}
        <path d="M -45 -12 L -50 -20" stroke="#5A2A0E" strokeWidth="2" />
        <path d="M -35 -12 L -30 -20" stroke="#5A2A0E" strokeWidth="2" />
      </g>
    ))}

    {/* Herbe */}
    {Array.from({ length: 40 }).map((_, i) => (
      <line
        key={i}
        x1={20 + i * 20}
        y1={470}
        x2={20 + i * 20 + 3}
        y2={460}
        stroke="#2D6B3E"
        strokeWidth="1.5"
      />
    ))}
  </svg>
);

/* ============================================
   5. CocoaPods — motif de cabosses (background)
   ============================================ */
export const CocoaPods: React.FC<IllustrationProps> = ({
  className,
  title = "Motif de cabosses de cacao",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 400"
    className={cn("h-auto w-full", className)}
    role="img"
    aria-label={title}
    {...props}
  >
    <rect width="400" height="400" fill="transparent" />
    {[
      { x: 80, y: 100, r: 50, rot: 0 },
      { x: 220, y: 80, r: 60, rot: 20 },
      { x: 320, y: 200, r: 55, rot: -15 },
      { x: 120, y: 280, r: 65, rot: 30 },
      { x: 280, y: 330, r: 50, rot: -10 },
    ].map((pod, i) => (
      <g key={i} transform={`translate(${pod.x} ${pod.y}) rotate(${pod.rot})`}>
        <ellipse cx="0" cy="0" rx={pod.r} ry={pod.r * 1.3} fill="#9C4A1A" opacity="0.15" />
        <ellipse
          cx="0"
          cy="0"
          rx={pod.r}
          ry={pod.r * 1.3}
          fill="none"
          stroke="#9C4A1A"
          strokeWidth="2"
          opacity="0.3"
        />
        {[-0.6, -0.3, 0, 0.3, 0.6].map((t) => (
          <path
            key={t}
            d={`M ${t * pod.r} ${-pod.r * 1.3} Q ${t * pod.r * 0.95} 0 ${t * pod.r} ${pod.r * 1.3}`}
            fill="none"
            stroke="#7A3812"
            strokeWidth="1.5"
            opacity="0.4"
          />
        ))}
      </g>
    ))}
  </svg>
);

/* ============================================
   6. MapMungo — carte stylisée du Bassin du Mungo
   ============================================ */
export const MapMungo: React.FC<IllustrationProps> = ({
  className,
  title = "Carte stylisée du Bassin du Mungo, Cameroun",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 500"
    className={cn("h-auto w-full", className)}
    role="img"
    aria-label={title}
    {...props}
  >
    <defs>
      <linearGradient id="mm-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#E5DCC8" />
        <stop offset="100%" stopColor="#F5EFE0" />
      </linearGradient>
    </defs>

    <rect width="600" height="500" fill="url(#mm-bg)" />

    {/* Contour Cameroun stylisé */}
    <path
      d="M 80 150 L 180 100 L 280 120 L 380 90 L 480 130 L 530 200 L 510 290 L 480 370 L 420 420 L 320 430 L 220 410 L 150 380 L 90 320 L 70 240 Z"
      fill="#2D6B3E"
      stroke="#1F4A2E"
      strokeWidth="3"
    />

    {/* Régions intérieures */}
    <path
      d="M 150 180 L 250 160 L 350 180 L 430 220 L 410 290 L 350 340 L 250 350 L 170 320 L 130 250 Z"
      fill="#4A7C59"
      opacity="0.5"
    />

    {/* Mont Cameroun (triangle) */}
    <polygon points="220,200 260,140 290,210" fill="#7A3812" />
    <polygon points="240,180 260,140 270,190" fill="#F5EFE0" opacity="0.7" />

    {/* Bassin du Mungo (zone d'intérêt) */}
    <circle cx="320" cy="280" r="35" fill="#D4A024" opacity="0.4" />
    <circle
      cx="320"
      cy="280"
      r="35"
      fill="none"
      stroke="#9C4A1A"
      strokeWidth="2"
      strokeDasharray="6 4"
    />
    <circle cx="320" cy="280" r="10" fill="#9C4A1A" />

    {/* Marqueurs plantations (cabosses) */}
    {[
      { x: 280, y: 240 },
      { x: 360, y: 260 },
      { x: 340, y: 310 },
      { x: 300, y: 320 },
      { x: 380, y: 300 },
    ].map((p, i) => (
      <g key={i} transform={`translate(${p.x} ${p.y})`}>
        <ellipse cx="0" cy="0" rx="6" ry="9" fill="#9C4A1A" />
        <line x1="0" y1="-9" x2="0" y2="-13" stroke="#5A2A0E" strokeWidth="1.5" />
      </g>
    ))}

    {/* Légende */}
    <g transform="translate(40 430)">
      <circle cx="10" cy="10" r="6" fill="#9C4A1A" />
      <text x="25" y="14" fontSize="12" fill="#3D3320" fontFamily="Georgia, serif">
        Plantations CRI
      </text>
    </g>
    <g transform="translate(220 430)">
      <circle
        cx="10"
        cy="10"
        r="6"
        fill="none"
        stroke="#9C4A1A"
        strokeWidth="2"
        strokeDasharray="3 2"
      />
      <text x="25" y="14" fontSize="12" fill="#3D3320" fontFamily="Georgia, serif">
        Bassin du Mungo
      </text>
    </g>
  </svg>
);

/* ============================================
   7. LabFlask — laboratoire / brevet
   ============================================ */
export const LabFlask: React.FC<IllustrationProps> = ({
  className,
  title = "Éprouvette de laboratoire symbolisant la R&D et le brevet",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 500"
    className={cn("h-auto w-full", className)}
    role="img"
    aria-label={title}
    {...props}
  >
    <defs>
      <linearGradient id="lf-liquid" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D4A024" />
        <stop offset="50%" stopColor="#9C4A1A" />
        <stop offset="100%" stopColor="#7A3812" />
      </linearGradient>
    </defs>

    <rect width="400" height="500" fill="#F5EFE0" />

    {/* Éprouvette */}
    <g transform="translate(200 250)">
      {/* Col */}
      <rect x="-15" y="-150" width="30" height="40" fill="none" stroke="#3D3320" strokeWidth="4" />
      {/* Corps */}
      <path
        d="M -40 -110 Q -40 -110 -40 -100 L -40 100 Q -40 130 0 130 Q 40 130 40 100 L 40 -100 Q 40 -110 40 -110 Z"
        fill="#F5EFE0"
        stroke="#3D3320"
        strokeWidth="4"
      />
      {/* Liquide cacao */}
      <clipPath id="lf-clip">
        <path d="M -36 0 L -36 100 Q -36 126 0 126 Q 36 126 36 100 L 36 0 Z" />
      </clipPath>
      <rect x="-40" y="0" width="80" height="130" fill="url(#lf-liquid)" clipPath="url(#lf-clip)" />

      {/* Graduations */}
      {[-80, -40, 0, 40, 80].map((y) => (
        <g key={y}>
          <line x1="20" y1={y} x2="35" y2={y} stroke="#3D3320" strokeWidth="2" />
          <line x1="25" y1={y - 20} x2="35" y2={y - 20} stroke="#3D3320" strokeWidth="1.5" />
          <line x1="25" y1={y + 20} x2="35" y2={y + 20} stroke="#3D3320" strokeWidth="1.5" />
        </g>
      ))}

      {/* Bulles */}
      <circle cx="-10" cy="40" r="4" fill="#F5EFE0" opacity="0.6" />
      <circle cx="15" cy="70" r="3" fill="#F5EFE0" opacity="0.5" />
      <circle cx="-5" cy="100" r="5" fill="#F5EFE0" opacity="0.6" />
      <circle cx="20" cy="20" r="3" fill="#F5EFE0" opacity="0.5" />
    </g>

    {/* Étoile brevet (or) */}
    <g transform="translate(320 100)">
      <polygon
        points="0,-30 9,-9 30,-9 13,5 19,26 0,14 -19,26 -13,5 -30,-9 -9,-9"
        fill="#D4A024"
        stroke="#7A3812"
        strokeWidth="2"
      />
    </g>
  </svg>
);

/* ============================================
   8. HandsSoil — mains + terre (producteur)
   ============================================ */
export const HandsSoil: React.FC<IllustrationProps> = ({
  className,
  title = "Mains de planteur tenant une cabosse et de la terre fertile",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 500"
    className={cn("h-auto w-full", className)}
    role="img"
    aria-label={title}
    {...props}
  >
    <defs>
      <linearGradient id="hs-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7A3812" />
        <stop offset="100%" stopColor="#5A2A0E" />
      </linearGradient>
    </defs>

    <rect width="600" height="500" fill="url(#hs-bg)" />

    {/* Mains en coupe (silhouettes) */}
    <path
      d="M 100 250 Q 100 380 200 420 L 400 420 Q 500 380 500 250 Q 500 200 450 200 L 150 200 Q 100 200 100 250 Z"
      fill="#9C4A1A"
      stroke="#3D3320"
      strokeWidth="3"
    />

    {/* Lignes des doigts */}
    {[-3, -1, 1, 3].map((offset) => (
      <path
        key={offset}
        d={`M ${200 + offset * 40} 250 Q ${200 + offset * 40} 350 ${200 + offset * 40} 400`}
        stroke="#3D3320"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
    ))}

    {/* Terre */}
    <ellipse cx="300" cy="350" rx="180" ry="50" fill="#5A2A0E" />
    <ellipse cx="300" cy="345" rx="170" ry="45" fill="#7A3812" />

    {/* Cabosse plantée dans la terre */}
    <g transform="translate(300 320)">
      <ellipse cx="0" cy="0" rx="40" ry="55" fill="#9C4A1A" />
      {[-20, -10, 0, 10, 20].map((x) => (
        <path
          key={x}
          d={`M ${x} -50 Q ${x * 0.95} 0 ${x} 50`}
          fill="none"
          stroke="#5A2A0E"
          strokeWidth="2"
        />
      ))}
      {/* Pédoncule + feuille */}
      <path d="M 0 -55 L 0 -75" stroke="#1F4A2E" strokeWidth="4" strokeLinecap="round" />
      <path d="M 0 -75 Q -15 -85 -25 -75 Q -15 -70 0 -75 Z" fill="#1F4A2E" />
      <path d="M 0 -75 Q 15 -85 25 -75 Q 15 -70 0 -75 Z" fill="#2D6B3E" />
    </g>

    {/* Petites feuilles qui poussent */}
    <g transform="translate(220 330)">
      <path d="M 0 0 Q -8 -10 -2 -20 Q 4 -12 0 0 Z" fill="#1F4A2E" />
    </g>
    <g transform="translate(380 335)">
      <path d="M 0 0 Q 8 -10 2 -20 Q -4 -12 0 0 Z" fill="#2D6B3E" />
    </g>
  </svg>
);

/* ============================================
   9. TruckLogistic — camion logistique
   ============================================ */
export const TruckLogistic: React.FC<IllustrationProps> = ({
  className,
  title = "Camion de logistique transportant des sacs de fèves de cacao",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 400"
    className={cn("h-auto w-full", className)}
    role="img"
    aria-label={title}
    {...props}
  >
    <defs>
      <linearGradient id="tl-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1F4A2E" />
        <stop offset="100%" stopColor="#14322B" />
      </linearGradient>
    </defs>

    <rect width="800" height="400" fill="url(#tl-bg)" />

    {/* Route */}
    <rect x="0" y="320" width="800" height="80" fill="#3D3320" />
    <line
      x1="0"
      y1="360"
      x2="800"
      y2="360"
      stroke="#D4A024"
      strokeWidth="3"
      strokeDasharray="20 20"
    />

    {/* Camion */}
    <g transform="translate(150 180)">
      {/* Cabine */}
      <rect
        x="380"
        y="20"
        width="120"
        height="120"
        fill="#7A3812"
        stroke="#3D3320"
        strokeWidth="3"
        rx="6"
      />
      <rect x="400" y="40" width="80" height="50" fill="#D4A024" />
      <line x1="440" y1="40" x2="440" y2="90" stroke="#3D3320" strokeWidth="2" />

      {/* Remorque */}
      <rect
        x="0"
        y="40"
        width="380"
        height="100"
        fill="#9C4A1A"
        stroke="#3D3320"
        strokeWidth="3"
        rx="6"
      />

      {/* Sacs de fèves empilés */}
      {[
        { x: 30, y: 70 },
        { x: 110, y: 70 },
        { x: 190, y: 70 },
        { x: 270, y: 70 },
      ].map((sack, i) => (
        <g key={i} transform={`translate(${sack.x} ${sack.y})`}>
          <ellipse cx="0" cy="0" rx="30" ry="20" fill="#F5EFE0" stroke="#3D3320" strokeWidth="2" />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontSize="10"
            fill="#3D3320"
            fontFamily="Georgia, serif"
            fontWeight="bold"
          >
            CRI
          </text>
        </g>
      ))}

      {/* Roues */}
      <circle cx="60" cy="150" r="22" fill="#3D3320" />
      <circle cx="60" cy="150" r="10" fill="#8B7860" />
      <circle cx="200" cy="150" r="22" fill="#3D3320" />
      <circle cx="200" cy="150" r="10" fill="#8B7860" />
      <circle cx="340" cy="150" r="22" fill="#3D3320" />
      <circle cx="340" cy="150" r="10" fill="#8B7860" />
      <circle cx="440" cy="150" r="22" fill="#3D3320" />
      <circle cx="440" cy="150" r="10" fill="#8B7860" />
    </g>
  </svg>
);

/* ============================================
   10. ChartGrowth — graphique de croissance
   ============================================ */
export const ChartGrowth: React.FC<IllustrationProps> = ({
  className,
  title = "Graphique de croissance symbolisant l'impact du programme",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 400"
    className={cn("h-auto w-full", className)}
    role="img"
    aria-label={title}
    {...props}
  >
    <defs>
      <linearGradient id="cg-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F5EFE0" />
        <stop offset="100%" stopColor="#E5DCC8" />
      </linearGradient>
      <linearGradient id="cg-area" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D4A024" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#9C4A1A" stopOpacity="0.1" />
      </linearGradient>
    </defs>

    <rect width="600" height="400" fill="url(#cg-bg)" />

    {/* Axes */}
    <line x1="60" y1="50" x2="60" y2="350" stroke="#3D3320" strokeWidth="2" />
    <line x1="60" y1="350" x2="560" y2="350" stroke="#3D3320" strokeWidth="2" />

    {/* Grille */}
    {[100, 150, 200, 250, 300].map((y) => (
      <line
        key={y}
        x1="60"
        y1={y}
        x2="560"
        y2={y}
        stroke="#3D3320"
        strokeWidth="0.5"
        opacity="0.2"
      />
    ))}

    {/* Aire sous la courbe */}
    <path
      d="M 60 300 L 140 280 L 220 240 L 300 200 L 380 160 L 460 110 L 540 80 L 540 350 L 60 350 Z"
      fill="url(#cg-area)"
    />

    {/* Courbe */}
    <path
      d="M 60 300 L 140 280 L 220 240 L 300 200 L 380 160 L 460 110 L 540 80"
      fill="none"
      stroke="#9C4A1A"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Points */}
    {[
      { x: 140, y: 280 },
      { x: 220, y: 240 },
      { x: 300, y: 200 },
      { x: 380, y: 160 },
      { x: 460, y: 110 },
      { x: 540, y: 80 },
    ].map((p, i) => (
      <circle key={i} cx={p.x} cy={p.y} r="6" fill="#D4A024" stroke="#7A3812" strokeWidth="2" />
    ))}

    {/* Flèche de croissance */}
    <g transform="translate(540 80)">
      <line x1="0" y1="0" x2="20" y2="-20" stroke="#9C4A1A" strokeWidth="3" />
      <polygon points="20,-20 15,-15 10,-25" fill="#9C4A1A" />
    </g>

    {/* Labels années (axe X) */}
    {["2020", "2021", "2022", "2023", "2024", "2025", "2026"].map((year, i) => (
      <text
        key={year}
        x={60 + i * 80}
        y="375"
        textAnchor="middle"
        fontSize="12"
        fill="#3D3320"
        fontFamily="Calibri, sans-serif"
      >
        {year}
      </text>
    ))}

    {/* Titre */}
    <text x="60" y="35" fontSize="16" fontWeight="bold" fill="#1F4A2E" fontFamily="Georgia, serif">
      Croissance de la production
    </text>
  </svg>
);

/* ============================================
   11. SproutLeaf — petite pousse (RSE / impact)
   ============================================ */
export const SproutLeaf: React.FC<IllustrationProps> = ({
  className,
  title = "Jeune pousse symbolisant la durabilité et l'impact environnemental",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 300"
    className={cn("h-auto w-full", className)}
    role="img"
    aria-label={title}
    {...props}
  >
    <rect width="300" height="300" fill="transparent" />

    {/* Sol */}
    <ellipse cx="150" cy="240" rx="100" ry="20" fill="#5A2A0E" />
    <ellipse cx="150" cy="235" rx="90" ry="15" fill="#7A3812" />

    {/* Tige */}
    <path d="M 150 230 L 150 130" stroke="#1F4A2E" strokeWidth="6" strokeLinecap="round" />

    {/* Feuille gauche */}
    <path
      d="M 150 180 Q 100 160 90 120 Q 130 130 150 180 Z"
      fill="#2D6B3E"
      stroke="#1F4A2E"
      strokeWidth="2"
    />
    <line x1="150" y1="180" x2="100" y2="135" stroke="#1F4A2E" strokeWidth="1" />

    {/* Feuille droite */}
    <path
      d="M 150 150 Q 200 130 210 90 Q 170 100 150 150 Z"
      fill="#1F4A2E"
      stroke="#14322B"
      strokeWidth="2"
    />
    <line x1="150" y1="150" x2="200" y2="105" stroke="#14322B" strokeWidth="1" />

    {/* Cabosse en haut */}
    <g transform="translate(150 100)">
      <ellipse cx="0" cy="0" rx="14" ry="20" fill="#9C4A1A" />
      {[-7, -3, 0, 3, 7].map((x) => (
        <path
          key={x}
          d={`M ${x} -18 Q ${x * 0.95} 0 ${x} 18`}
          fill="none"
          stroke="#5A2A0E"
          strokeWidth="1.5"
        />
      ))}
    </g>

    {/* Halo doré */}
    <circle cx="150" cy="100" r="35" fill="#D4A024" opacity="0.2" />
  </svg>
);

/* ============================================
   Helper : Image immersive "full-bleed"
   ============================================ */
export interface ImmersivePanelProps {
  illustration: React.ReactNode;
  variant?: "default" | "dark" | "forest" | "cacao";
  className?: string;
  height?: string;
  pattern?: boolean;
}

export const ImmersivePanel: React.FC<ImmersivePanelProps> = ({
  illustration,
  variant = "default",
  className,
  height = "h-72 md:h-96",
  pattern = true,
}) => {
  const variantClasses = {
    default: "bg-cri-parchment",
    dark: "bg-cri-forest",
    forest: "bg-cri-canopy",
    cacao: "bg-cri-cacao",
  } as const;

  return (
    <div
      className={cn(
        "rounded-cri relative w-full overflow-hidden",
        height,
        variantClasses[variant],
        className
      )}
    >
      <div className="absolute inset-0">{illustration}</div>
      {pattern && (
        <div
          className="bg-cri-pattern-feve pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay"
          aria-hidden="true"
        />
      )}
      {/* Orbe dorée décorative */}
      <div
        className="bg-cri-gold/20 pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full blur-3xl"
        aria-hidden="true"
      />
    </div>
  );
};
