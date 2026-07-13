---
name: firestore-rules-auditor
description: Audite une règle Firestore (firestore.rules) pour vérifier qu'elle respecte (1) le RBAC multi-rôles (anonymous, producer, staff, investor, admin), (2) la validation RGPD (consentement, hash IP, durées de conservation), (3) la précision GPS ≥ 6 décimales WGS84, (4) la conformité EUDR 2023/1115. À utiliser avant tout déploiement de rules.
---

# Skill : Firestore Rules Auditor

## Quand m'invoquer
- Avant un `firebase deploy --only firestore:rules`
- Quand on ajoute une nouvelle collection
- Quand on modifie un rôle ou un custom claim
- Lors d'un audit de sécurité

## Rôles et custom claims

| Rôle | Custom claim | Capacités |
|---|---|---|
| `anonymous` | (aucun) | Lecture publique articles/projets validés |
| `producer` | `role: "producer"` | CRUD sur ses propres parcelles, lots, consentements |
| `investor` | `role: "investor"` | Lecture data room (KYC validé), lecture restreinte parcels |
| `staff` | `role: "staff"` | CRUD sur producteurs assignés, validation KYC |
| `admin` | `role: "admin"` | Full access + audit logs |

## Vérifications systématiques

### 1. RBAC — chaque collection a-t-elle ses règles ?
```bash
# Vérifier que toutes les collections ont un match
grep -E "match /[a-z_-]+/" firestore.rules | wc -l
# Attendu : ≥ 8 (producers, parcels, lots, articles, projects, leads, kyc, audit_logs)
```

### 2. Validation GPS — 6 décimales WGS84
```bash
# Toute coordonnée doit être entre -90/90 (lat) ou -180/180 (lng)
# et le caller doit garantir la précision côté client
```

### 3. RGPD — consentement obligatoire
- `producers` doivent avoir `consent.dataProcessing: true` pour toute écriture non-archive
- `consent.timestamp` doit être un timestamp Firebase
- `consent.ipHash` (SHA-256) au lieu de l'IP brute

### 4. Pas d'accès public en écriture
- Aucune règle ne doit autoriser `request.auth == null` sur `create/update/delete`
- Seules les **lectures** peuvent être publiques (et encore, filtrées par `status: 'published'`)

### 5. EUDR — traçabilité géographique
- `parcels` doit contenir `polygon` (GeoJSON) ET `centroid` (lat/lng ≥ 6 décimales)
- `lots` doit référencer un `parcelId` valide
- Impossibilité de supprimer une parcel référencée par un lot

## Format de sortie
```
🛡️ Firestore Rules — Audit [collection]
- RBAC : ✅/❌
- RGPD (consentement, IP hash) : ✅/❌
- EUDR (géométrie, traçabilité) : ✅/❌
- Pas d'écriture anonyme : ✅/❌
- Lecture publique filtrée : ✅/❌
🔴/🟡/🟢 Verdict
Actions : [liste]
```

## Tests recommandés (à exécuter après chaque modif)
```bash
firebase emulators:exec --only firestore "npm test"
```
