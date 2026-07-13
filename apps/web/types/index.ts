/**
 * Types partagés — Cocoa Ranch & Industry
 */

// ─── VILLAGES AUTORISÉS (CDC traçabilité) ──────────────────────────────────
export const AUTHORIZED_VILLAGES = [
  "Bouba",
  "Njombé",
  "Mombo",
  "Tombel",
  "Penja",
  "Loum",
] as const;

export type Village = (typeof AUTHORIZED_VILLAGES)[number];

export const AUTHORIZED_COMMUNES = ["Njombé-Penja", "Mombo", "Tombel"] as const;
export type Commune = (typeof AUTHORIZED_COMMUNES)[number];

// ─── USER ROLES (RBAC) ────────────────────────────────────────────────────
export const USER_ROLES = [
  "public",
  "admin",
  "manager",
  "enqueteur",
  "supervisor",
  "investor",
] as const;
export type UserRole = (typeof USER_ROLES)[number];

// ─── PRODUCER ─────────────────────────────────────────────────────────────
export interface Producer {
  code: string;
  fullName: string;
  gender: "M" | "F" | "O";
  birthYear: number;
  childrenCount: number;
  phone?: string;
  village: Village;
  commune: Commune;
  parcels?: string[];
  collecteur?: string;
  consentRGPD: boolean;
  consentDate: string; // ISO timestamp
  clmrs?: {
    childLabourRisk: "none" | "low" | "medium" | "high";
    schoolAttendance: number;
    lastSurvey: string;
  };
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

// ─── PARCEL ───────────────────────────────────────────────────────────────
export type GeometryType = "point" | "polygon";
export type ForestStatus = "ok" | "risque" | "alerte";
export type DFStatus = "DFN" | "DFnP" | "private";

export interface Parcel {
  producer: string;
  type: GeometryType;
  areaHa: number;
  geometry: {
    type: "Point" | "Polygon";
    coordinates: number[] | number[][] | number[][][];
  };
  centroid?: { lat: number; lng: number };
  precision: number; // >= 6 décimales
  forestStatus: ForestStatus;
  forestCheckDate?: string;
  dfStatus?: DFStatus;
  photoUrl?: string;
  createdBy: string;
  createdAt: string;
  verifiedBy?: string;
}

// ─── LOT ──────────────────────────────────────────────────────────────────
export const LOT_STAGES = [
  "reception",
  "fermentation",
  "sechage",
  "tri",
  "conditionnement",
  "stockage",
  "expedition",
] as const;
export type LotStage = (typeof LOT_STAGES)[number];

export interface Lot {
  code: string;
  originParcels: string[];
  producers: string[];
  weightKg: number;
  harvestDate: string;
  stage: LotStage;
  stageHistory?: Array<{
    stage: LotStage;
    date: string;
    user: string;
    notes?: string;
  }>;
  qualityGrade?: "A" | "B" | "C";
  moisturePct?: number;
  fermentationDays?: number;
  exportContainer?: string;
  eudrReference?: string;
  blockchainHash?: string;
  createdBy: string;
  createdAt: string;
}

// ─── ARTICLE (CMS) ───────────────────────────────────────────────────────
export type ArticleStatus = "draft" | "published" | "archived";
export type ArticleLocale = "fr" | "en";
export type ArticleCategory =
  | "Cacao"
  | "Provendes"
  | "RSE"
  | "Investissement"
  | "Agroécologie";

export interface Article {
  slug: string;
  locale: ArticleLocale;
  title: string;
  excerpt: string;
  contentMD: string;
  coverImage?: string;
  category: ArticleCategory;
  tags?: string[];
  author: string;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  status: ArticleStatus;
}

// ─── PRODUCT ──────────────────────────────────────────────────────────────
export type ProductCategory = "cacao" | "provende" | "elevage";

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  imageUrl: string;
  certifications?: string[];
  specs?: Record<string, string>;
  indicativePriceXAF?: number;
  orderable: boolean;
}

// ─── IMPACT KPI ───────────────────────────────────────────────────────────
export interface ImpactKpi {
  key: string;
  valueFR: number;
  valueEN?: number;
  labelFR: string;
  labelEN?: string;
  updatedAt: string;
  trend?: "up" | "down" | "flat";
}

// ─── INVESTOR ─────────────────────────────────────────────────────────────
export type InvestorType =
  | "family_office"
  | "fund"
  | "corporate"
  | "bailleur"
  | "institutionnel";
export type InvestorTier = "standard" | "premium";
export type KYCStatus = "pending" | "verified" | "rejected";

export interface Investor {
  userId: string;
  organisation: string;
  type: InvestorType;
  tier: InvestorTier;
  country: string;
  amountEnvisagedEUR?: number;
  kycStatus: KYCStatus;
  ndaSignedAt?: string;
  createdAt: string;
}

// ─── LEAD ─────────────────────────────────────────────────────────────────
export type LeadType = "contact" | "investor" | "commande" | "newsletter";
export type LeadStatus = "new" | "contacted" | "qualified" | "closed" | "spam_suspect";

export interface Lead {
  type: LeadType;
  data: Record<string, unknown>;
  source?: string;
  locale?: string;
  ipHash: string; // RGPD : hash de l'IP
  userAgent?: string;
  status: LeadStatus;
  createdAt: string;
}

// ─── AUDIT LOG ────────────────────────────────────────────────────────────
export interface AuditLog {
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  metadata?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
  timestamp: string;
}
