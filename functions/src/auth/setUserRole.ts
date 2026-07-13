/**
 * Gestion des rôles (custom claims)
 *
 * SÉCURITÉ :
 * - Seuls les admins peuvent modifier les rôles
 * - Whitelist des rôles autorisés
 * - Logging systématique
 */

import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getAuth } from "firebase-admin/auth";
import { logger } from "firebase-functions";

const ALLOWED_ROLES = [
  "admin",
  "manager",
  "enqueteur",
  "supervisor",
  "investor",
] as const;

type Role = (typeof ALLOWED_ROLES)[number];

/**
 * Définir le rôle d'un utilisateur (admin uniquement)
 */
export const setUserRole = onCall(
  { region: "europe-west1", enforceAppCheck: true },
  async (req) => {
    if (req.auth?.token.role !== "admin") {
      throw new HttpsError(
        "permission-denied",
        "Permission refusée : admin uniquement."
      );
    }

    const { uid, role } = req.data as { uid: string; role: string };

    if (!uid || typeof uid !== "string") {
      throw new HttpsError("invalid-argument", "uid requis.");
    }
    if (!ALLOWED_ROLES.includes(role as Role)) {
      throw new HttpsError("invalid-argument", `Rôle invalide : ${role}`);
    }

    try {
      await getAuth().setCustomUserClaims(uid, { role });
      logger.info(`Rôle ${role} défini pour ${uid} par ${req.auth?.uid}`);
      return { ok: true, uid, role };
    } catch (error) {
      logger.error("Erreur setUserRole", error);
      throw new HttpsError("internal", "Impossible de définir le rôle.");
    }
  }
);

/**
 * Récupérer le rôle d'un utilisateur
 */
export const getUserRole = onCall(
  { region: "europe-west1", enforceAppCheck: true },
  async (req) => {
    if (!req.auth) {
      throw new HttpsError("unauthenticated", "Authentification requise.");
    }

    const uid = (req.data as { uid?: string }).uid ?? req.auth.uid;

    try {
      const user = await getAuth().getUser(uid);
      return { uid, role: user.customClaims?.role ?? "public" };
    } catch (error) {
      logger.error("Erreur getUserRole", error);
      throw new HttpsError("not-found", "Utilisateur introuvable.");
    }
  }
);
