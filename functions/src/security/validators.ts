/**
 * Validateurs de sécurité
 *
 * - validateParcelGeometry : vérifie qu'une parcelle est au Cameroun
 * - auditProducerWrite : journalise les écritures sensibles
 * - rateLimitLeads : anti-spam sur les leads
 */

import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { getFirestore } from "firebase-admin/firestore";
import { logger } from "firebase-functions";

const db = getFirestore();

// Limites géographiques du Cameroun
const CAMEROON_BOUNDS = {
  minLat: 1.6,
  maxLat: 13.0,
  minLng: 8.5,
  maxLng: 16.5,
};

/**
 * Valider qu'une parcelle est bien au Cameroun
 * Marque forestStatus = "alerte" sinon
 */
export const validateParcelGeometry = onDocumentCreated(
  "parcels/{parcelId}",
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    const coords = data.geometry?.coordinates;
    if (!Array.isArray(coords)) {
      logger.warn(`Parcel ${event.params.parcelId} : coordonnées invalides`);
      await event.data?.ref.update({ forestStatus: "alerte" });
      return;
    }

    // Extraire toutes les coordonnées (récursif pour polygones)
    const flat: number[] = [];
    const flatten = (arr: unknown[]): void => {
      for (const v of arr) {
        if (Array.isArray(v)) flatten(v);
        else if (typeof v === "number") flat.push(v);
      }
    };
    flatten(coords);

    if (flat.length < 2 || flat.length % 2 !== 0) {
      await event.data?.ref.update({ forestStatus: "alerte" });
      return;
    }

    let outOfBounds = false;
    for (let i = 0; i < flat.length; i += 2) {
      const [lng, lat] = [flat[i], flat[i + 1]];
      if (
        lat < CAMEROON_BOUNDS.minLat ||
        lat > CAMEROON_BOUNDS.maxLat ||
        lng < CAMEROON_BOUNDS.minLng ||
        lng > CAMEROON_BOUNDS.maxLng
      ) {
        outOfBounds = true;
        break;
      }
    }

    if (outOfBounds) {
      logger.warn(`Parcel ${event.params.parcelId} hors Cameroun`, { coords: flat });
      await event.data?.ref.update({
        forestStatus: "alerte",
        forestCheckDate: new Date(),
      });
    } else {
      await event.data?.ref.update({
        forestStatus: "ok",
        forestCheckDate: new Date(),
      });
    }
  }
);

/**
 * Journaliser les écritures sur producers
 */
export const auditProducerWrite = onDocumentCreated(
  "producers/{producerId}",
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    await db.collection("auditLogs").add({
      userId: data.createdBy ?? "unknown",
      action: "CREATE",
      resource: "producers",
      resourceId: event.params.producerId,
      metadata: {
        village: data.village,
        consentRGPD: data.consentRGPD,
      },
      timestamp: new Date(),
    });
  }
);

/**
 * Rate limit basique sur les leads (5 / heure par IP hashée)
 */
const leadsByIP = new Map<string, number[]>();
const MAX_LEADS_PER_HOUR = 5;

export const rateLimitLeads = onDocumentCreated(
  "leads/{leadId}",
  async (event) => {
    const data = event.data?.data();
    if (!data?.ipHash) return;

    const now = Date.now();
    const arr = (leadsByIP.get(data.ipHash) || []).filter(
      (t) => now - t < 3600_000
    );
    arr.push(now);
    leadsByIP.set(data.ipHash, arr);

    if (arr.length > MAX_LEADS_PER_HOUR) {
      await event.data?.ref.update({ status: "spam_suspect" });
      logger.warn(
        `Lead suspect (IP hash ${data.ipHash}) : ${arr.length} soumissions / h`
      );
    }
  }
);
