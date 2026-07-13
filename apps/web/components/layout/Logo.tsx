import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Logo CRI — Triple emblème (cacaoyer, engrenage, feuille)
 *
 * Brandbook v5 : symbole composé (cacaoyer + engrenage industriel + feuille
 * agroécologique) dans un cercle doré.
 *
 * Cette implémentation est un placeholder stylisé (SVG simple) à remplacer
 * par le logo officiel validé par l'équipe Brandbook.
 */

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ size = 48, className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={cn("inline-block", className)}
      role="img"
      aria-label="Logo Cocoa Ranch & Industry"
      {...props}
    >
      {/* Cercle extérieur */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Cacaoyer stylisé (gauche) */}
      <g transform="translate(28, 30)">
        <path
          d="M 12 0 Q 8 10 12 20 Q 16 25 12 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Cabosse */}
        <ellipse cx="12" cy="22" rx="6" ry="9" fill="currentColor" />
        <line x1="12" y1="15" x2="12" y2="29" stroke="rgba(31,74,46,0.3)" strokeWidth="0.5" />
      </g>

      {/* Engrenage (droite) */}
      <g transform="translate(56, 30)">
        <circle
          cx="12"
          cy="15"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <circle cx="12" cy="15" r="3" fill="currentColor" />
        {/* Dents */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <rect
            key={deg}
            x="10.5"
            y="2"
            width="3"
            height="5"
            fill="currentColor"
            transform={`rotate(${deg} 12 15)`}
          />
        ))}
      </g>

      {/* Feuille (bas) */}
      <g transform="translate(50, 65)">
        <path
          d="M 0 0 Q 10 -5 15 0 Q 10 5 0 0 Z"
          fill="currentColor"
        />
        <line x1="0" y1="0" x2="15" y2="0" stroke="rgba(31,74,46,0.3)" strokeWidth="0.5" />
      </g>

      {/* Texte "CRI" en bas */}
      <text
        x="50"
        y="90"
        textAnchor="middle"
        fontSize="6"
        fontWeight="bold"
        fill="currentColor"
        fontFamily="Georgia, serif"
      >
        CRI
      </text>
    </svg>
  );
};
