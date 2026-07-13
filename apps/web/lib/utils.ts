import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusionne des classes Tailwind en gérant les conflits
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formate un nombre en FCFA (espace fine + abréviation si gros)
 */
export function formatXAF(amount: number): string {
  if (amount === 0) return "0 FCFA";
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(1).replace(/\.0$/, "")} Md FCFA`;
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1).replace(/\.0$/, "")} M FCFA`;
  }
  return `${new Intl.NumberFormat("fr-FR").format(amount)} FCFA`;
}

/**
 * Tronque une chaîne avec ellipse
 */
export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return `${str.slice(0, max - 3)}...`;
}

/**
 * Hash SHA-256 côté serveur d'une IP (RGPD)
 */
export async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Slugify une chaîne pour URL
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Validation email basique
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 200;
}

/**
 * Validation d'un numéro de téléphone camerounais
 */
export function isValidCameroonPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, "");
  return /^(\+?237)?[6-9]\d{7,8}$/.test(cleaned);
}

/**
 * Validation coordonnées WGS84
 *
 * Note : la précision retournée est le MINIMUM entre lat et lng.
 * Pour les coordonnées saisies par l'utilisateur, le `toString()`
 * natif peut tronquer les zéros finaux (ex. 9.750 → 9.75 = 2 décimales).
 * Pour une précision exacte, transmettre la chaîne d'origine.
 */
export function isValidCoordinate(lat: number, lng: number): { valid: boolean; precision: number } {
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return { valid: false, precision: 0 };
  }
  // toString() peut tronquer : utiliser une regex sur la représentation
  const countDecimals = (n: number): number => {
    const s = n.toString();
    if (!s.includes(".") && !s.includes("e")) return 0;
    if (s.includes("e")) {
      // Notation scientifique : convertir en string complet
      return n.toFixed(20).replace(/0+$/, "").split(".")[1]?.length ?? 0;
    }
    return s.split(".")[1]?.replace(/0+$/, "").length ?? s.split(".")[1]?.length ?? 0;
  };
  return { valid: true, precision: Math.min(countDecimals(lat), countDecimals(lng)) };
}

/**
 * Date relative (FR)
 */
export function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return "à l'instant";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `il y a ${days} j`;
  const months = Math.floor(days / 30);
  if (months < 12) return `il y a ${months} mois`;
  return `il y a ${Math.floor(months / 12)} an(s)`;
}
