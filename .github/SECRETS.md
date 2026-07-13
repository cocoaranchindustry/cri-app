# GitHub Secrets à configurer

## Vercel
- `VERCEL_TOKEN` : token personnel Vercel
- `VERCEL_ORG_ID` : ID de l'organisation
- `VERCEL_PROJECT_ID` : ID du projet

## Firebase
- `FIREBASE_SERVICE_ACCOUNT` : JSON du service account (pour GitHub Action)
- `FIREBASE_PROJECT_ID` : ID du projet Firebase

## Next.js (Public)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## Sécurité (privé, server-side uniquement)
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`
- `SESSION_COOKIE_SECRET`
- `ENCRYPTION_KEY`

## Services tiers
- `BREVO_API_KEY`
- `SENTRY_AUTH_TOKEN`
- `SNYK_TOKEN` (optionnel)

## Notes
- Les variables `NEXT_PUBLIC_*` sont exposées au client
- Les autres restent server-side (Cloud Functions, Server Components)
- Ne jamais commit un `.env.local` ou `.env.production`
- Utiliser `firebase functions:secrets:set` pour les secrets Firebase
