/**
 * Configuration Firebase côté client
 *
 * SÉCURITÉ :
 * - Configuration par variables d'env (NEXT_PUBLIC_*)
 * - Pas de secrets en dur
 * - App Check activable en production (reCAPTCHA Enterprise)
 *
 * ROBUSTESSE :
 * - Singleton : évite la réinitialisation en mode dev (Fast Refresh)
 * - Validation des env vars au démarrage
 * - Analytics chargé uniquement côté client et si supporté
 */

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

/**
 * Validation des variables d'environnement Firebase.
 * Échoue tôt avec un message clair si une variable manque.
 */
function validateFirebaseConfig(): void {
  const required = [
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    "NEXT_PUBLIC_FIREBASE_APP_ID",
  ] as const;

  const missing = required.filter((k) => !process.env[k] || process.env[k] === "");
  if (missing.length > 0) {
    throw new Error(
      `[Firebase] Variables d'environnement manquantes : ${missing.join(", ")}.\n` +
        `Vérifier apps/web/.env.local`
    );
  }
}

// Validation au chargement du module (côté client uniquement)
if (typeof window !== "undefined") {
  validateFirebaseConfig();
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Singleton : éviter la réinitialisation en mode dev (HMR / Fast Refresh)
const app: FirebaseApp = getApps().length
  ? (getApps()[0] as FirebaseApp)
  : initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

// Analytics : uniquement côté client et si supporté (évite les erreurs SSR)
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      // Silencieux : analytics est optionnel
    });
}
export { analytics };

// Emulators en dev (optionnel — décommenter pour activer)
// if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
//   connectAuthEmulator(auth, "http://localhost:9099");
//   connectFirestoreEmulator(db, "localhost", 8080);
//   connectStorageEmulator(storage, "localhost", 9199);
// }

export default app;
