/**
 * Cloud Functions — Cocoa Ranch & Industry
 *
 * Modules :
 * - auth : custom claims (RBAC)
 * - validation : géométrie parcelles, consentement producteur
 * - audit : logs automatiques
 * - security : anti-spam leads, rate limiting
 * - webhooks : Brevo (newsletter)
 * - scheduled : cleanup, exports
 */

export { setUserRole, getUserRole } from "./auth/setUserRole";
export {
  validateParcelGeometry,
  auditProducerWrite,
  rateLimitLeads,
} from "./security/validators";
export { onNewInvestorLead } from "./webhooks/brevo";
