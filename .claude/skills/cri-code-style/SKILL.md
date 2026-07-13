---
name: cri-code-style
description: Rappel des conventions de code du projet Cocoa Ranch & Industry (TypeScript strict, PascalCase composants, paths aliases, format FCFA, commentaires français). À utiliser lors de la création de tout nouveau fichier.
---

# Skill : CRI Code Style

## Quand m'invoquer
- Création d'un nouveau fichier (composant, hook, lib, page, types)
- Réorganisation d'un module
- Avant de commit

## Conventions TypeScript

### Chemins (paths aliases)
```typescript
// ✅ Toujours utiliser les aliases (configurés dans tsconfig.json)
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { cn, formatXAF } from "@/lib/utils";
import { auth, db, storage } from "@/firebase/client";
import type { Producer, Parcel } from "@/types";

// ❌ Jamais de chemins relatifs au-delà d'un dossier
import { Button } from "../../../components/ui/Button";
```

### Nommage
| Élément | Convention | Exemple |
|---|---|---|
| Composants React | `PascalCase.tsx` | `KpiCard.tsx`, `Navbar.tsx` |
| Hooks | `useCamelCase.ts` | `useAuth.ts`, `useFirestoreDoc.ts` |
| Libs / utils | `camelCase.ts` | `utils.ts`, `validators.ts` |
| Types / interfaces | `PascalCase` | `Producer`, `ParcelGeometry` |
| Constantes | `UPPER_SNAKE_CASE` | `MAX_PARCEL_AREA_HA` |
| Variables / fonctions | `camelCase` | `formatXAF`, `isValidEmail` |
| Fichiers Firebase | `kebab-case` | `client.ts`, `admin.ts` |

### TypeScript strict
- ❌ Pas de `any` (utiliser `unknown` + narrowing)
- ❌ Pas de `@ts-ignore` (utiliser `@ts-expect-error` avec raison)
- ✅ Toujours typer les props de composants
- ✅ Toujours typer les retours de hooks custom
- ✅ Préférer les unions discriminées aux `boolean` multiples

```typescript
// ✅ Bon
type Result = { valid: true; precision: number } | { valid: false; reason: string };

// ❌ Mauvais
type Result = { valid: boolean; precision?: number; reason?: string };
```

### Commentaires
- En **français** (langue projet)
- Expliquer le **pourquoi**, pas le **quoi**
- JSDoc sur toutes les fonctions exportées
- Pas de commentaires évidents (`// incrémente i` au-dessus de `i++`)

```typescript
/**
 * Hash SHA-256 d'une IP pour conformité RGPD (on ne stocke jamais l'IP brute).
 * @param ip - Adresse IPv4 ou IPv6
 * @returns Hash hexadécimal 64 caractères
 */
export async function hashIP(ip: string): Promise<string> { ... }
```

## Conventions React

### Composants
- Un composant = un fichier (sauf fragments triviaux)
- `function` déclaration, pas `const` arrow
- Props destructurées dans les paramètres
- `export default` pour les pages uniquement
- `export named` pour les composants réutilisables

```typescript
// ✅ Bon
export function KpiCard({ label, value, variant = "default" }: KpiCardProps) {
  return <div>...</div>;
}

// Page
export default function HomePage() { ... }
```

### Server vs Client Components
- **Server** (par défaut) : fetch, accès admin SDK, données statiques
- **Client** (`"use client"`) : interactivité, hooks, state, Firebase client SDK
- Le strict minimum de `"use client"` (le plus haut possible dans l'arbre)

### Hooks
- Préférer les hooks Firestore officiels (`useFirestoreDoc`, `useFirestoreCollection`)
- Pas de fetch manuel dans `useEffect` si on peut utiliser TanStack Query
- Cleanup des listeners dans le `return` du `useEffect`

## Conventions Firebase

### Imports
```typescript
// Client SDK
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

// Admin SDK (server-side uniquement)
import { getFirestore } from "firebase-admin/firestore";
```

### Patterns
- **Singleton** : `getApps()` pour le client, `getApps()` pour l'admin
- **Custom claims** : `role: "producer" | "investor" | "staff" | "admin"`
- **Timestamps** : utiliser `Timestamp.fromDate()` côté admin, `serverTimestamp()` côté client
- **Chemins** : toujours en kebab-case (pas de CamelCase pour les segments)

## Formatage des valeurs

### Monnaie
```typescript
import { formatXAF } from "@/lib/utils";
formatXAF(1_500_000) // → "1.5 M FCFA"
formatXAF(0)          // → "0 FCFA"
```

### Dates
- Stockage : `Timestamp` Firestore ou ISO 8601 string
- Affichage : `Intl.DateTimeFormat("fr-FR", { dateStyle: "long" })`
- Relatif : `timeAgo(date)` de `lib/utils`

### Coordonnées
- Stockage : `number` (attention à la précision JS)
- Validation : `isValidCoordinate(lat, lng)` retourne `{ valid, precision }`
- Affichage : 6 décimales systématiques pour les parcelles

## Commandes utiles
```bash
npm run type-check    # Vérifie TypeScript
npm run lint          # ESLint
npm test              # Tests unitaires
npm run test:firebase # Config Firebase
```
