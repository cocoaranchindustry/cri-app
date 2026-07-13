/**
 * Configuration Firebase Admin SDK (server-side uniquement)
 *
 * USAGE :
 * - Server Components
 * - Route Handlers (API)
 * - Server Actions
 * - Cloud Functions
 *
 * SÉCURITÉ :
 * - JAMAIS exposer FIREBASE_PRIVATE_KEY au client
 * - Singleton pattern (évite la réinitialisation)
 * - Validation des env vars au démarrage
 */

import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage, type Storage } from "firebase-admin/storage";

function getPrivateKey(): string {
  const key = process.env.FIREBASE_PRIVATE_KEY;
  if (!key) {
    throw new Error(
      "FIREBASE_PRIVATE_KEY manquante. Vérifier .env.local et les variables d'environnement."
    );
  }
  // Les retours à la ligne sont stockés en JSON (\n)
  return key.replace(/\\n/g, "\n");
}

function validateConfig(): void {
  const required = [
    "FIREBASE_PROJECT_ID",
    "FIREBASE_CLIENT_EMAIL",
    "FIREBASE_PRIVATE_KEY",
  ];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    throw new Error(
      `Variables d'environnement Firebase Admin manquantes : ${missing.join(", ")}`
    );
  }
}

if (typeof window === "undefined") {
  validateConfig();
}

const app: App =
  getApps().length > 0
    ? (getApps()[0] as App)
    : initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: getPrivateKey(),
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });

export const adminAuth: Auth = getAuth(app);
export const adminDb: Firestore = getFirestore(app);
export const adminStorage: Storage = getStorage(app);

export default app;
