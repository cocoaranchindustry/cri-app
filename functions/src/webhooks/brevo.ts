/**
 * Webhook Brevo — Synchronisation des leads investisseurs
 */

import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { logger } from "firebase-functions";

export const onNewInvestorLead = onDocumentCreated(
  "leads/{leadId}",
  async (event) => {
    const data = event.data?.data();
    if (!data || data.type !== "investor") return;

    const brevoKey = process.env.BREVO_API_KEY;
    if (!brevoKey) {
      logger.warn("BREVO_API_KEY manquant, sync Brevo désactivée");
      return;
    }

    // TODO: implémenter l'appel API Brevo
    // POST https://api.brevo.com/v3/contacts
    logger.info(`Lead investisseur créé : ${event.params.leadId}`);
  }
);
