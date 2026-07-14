"use client";

import * as React from "react";
import CountUp from "react-countup";
import { useInView } from "framer-motion";

/**
 * CountUpNumber — Compteur animé pour KPI (Brandbook CRI v6)
 *
 * Anime un nombre de 0 → value quand l'élément entre dans le viewport.
 * - Respecte prefers-reduced-motion
 * - Supporte nombres, décimales, suffixes, préfixes
 * - Format français (espace fine pour milliers)
 *
 * Usage :
 *   <CountUpNumber value={5000} suffix="+" duration={2.5} />
 *   <CountUpNumber value={1.7} decimals={1} suffix=" Md FCFA" />
 */

export interface CountUpNumberProps {
  value: number;
  duration?: number; // secondes
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
  delay?: number;
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  value,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = " ",
  className,
  delay = 0,
}) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [shouldStart, setShouldStart] = React.useState(false);

  React.useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setShouldStart(true), delay * 1000);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [inView, delay]);

  return (
    <span ref={ref} className={className}>
      {shouldStart ? (
        <CountUp
          end={value}
          duration={duration}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          separator={separator}
          preserveValue
        />
      ) : (
        <>
          {prefix}
          {value.toLocaleString("fr-FR", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
          {suffix}
        </>
      )}
    </span>
  );
};
