---
name: eudr-traceability-reviewer
description: Vérifie qu'un flux ou composant de traçabilité respecte le Règlement européen 2023/1115 (EUDR — déforestation). Couvre : polygon GeoJSON des parcelles, précision ≥ 6 décimales, pays de production, date de géolocalisation, lien parcelle→lot→export. À utiliser pour toute feature de traçabilité produit.
---

# Skill : EUDR Traceability Reviewer

## Quand m'invoquer
- Création d'un composant carte (Leaflet, Mapbox) pour parcelles
- Création d'un flux producteur (enregistrement, ajout parcelle)
- Création d'un flux lot (récolte → fermentation → séchage → export)
- Modification d'un export (DDL, EUDR statement, JSON traçabilité)

## Règlement UE 2023/1115 (EUDR) — résumé

**Entrée en application** : 30 décembre 2024 (report éventuel selon catégorie).

**Objet** : interdire la mise sur le marché UE de produits liés à la déforestation.
**Pour le cacao camerounais** : obligation de prouver que la production n'a pas causé de déforestation après le 31 décembre 2020.

### Données minimales exigées par parcela
1. **Géolocalisation** : polygon GeoJSON (idéalement) ou point centroïde
2. **Précision** : ≥ **6 décimales WGS84** (≈ 0,11 m à l'équateur)
3. **Date de géolocalisation** : timestamp de la mesure GPS
4. **Pays de production** : ISO 3166-1 alpha-2 (CM pour Cameroun)
5. **Surface** : en hectares, cohérente avec le polygon
6. **Identifiant unique** :.UUID stable
7. **Preuve de non-déforestation** : photo satellite datée (optionnel mais recommandé)

### Données minimales par lot
1. **Référence au parcel source** : `parcelId`
2. **Date de récolte**
3. **Poids (kg)**
4. **Statut** : `harvested` → `fermenting` → `drying` → `stored` → `exported`
5. **Destination** : pays d'export, client, contrat
6. **Hash du statement EUDR** : pour audit

## Vérifications systématiques

### 1. Précision GPS
```typescript
// Côté serveur (Firestore Rules)
function isValidCoordinate(lat, lng) {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}
// ⚠️ Les rules ne peuvent pas garantir 6 décimales (JS tronque les zéros).
// → Garantir côté client avant écriture
```

### 2. Polygon vs point
- Une parcelle < 4 ha peut être un point
- Une parcelle ≥ 4 ha doit être un polygon (multi-point insuffisant)
- Le polygon doit être fermé (premier point == dernier point)

### 3. Cohérence parcel ↔ lot
- Un lot DOIT référencer un `parcelId` valide
- Le poids total des lots d'une parcelle ne doit pas dépasser la capacité estimée (sanity check)
- La somme des surfaces des parcelles d'un producteur ne doit pas dépasser un seuil de signalement (200 ha par exemple)

### 4. Date de géolocalisation
- Doit être **apérieure** au 31 décembre 2020 (date pivot EUDR)
- Ne doit pas être dans le futur
- Recommandation : forcer l'usage de `gpsTimestamp` (timestamp GPS réel) plutôt que `serverTimestamp`

## Composants à connaître
- `apps/web/features/traceability/components/ConsentForm.tsx`
- `apps/web/firebase/client.ts` (Firestore)
- `firestore.rules` (validations `parcels`, `lots`)
- `functions/src/security/validators.ts::validateParcelGeometry`

## Format de sortie
```
🌍 EUDR — Audit [feature]
- Géolocalisation ≥ 6 décimales : ✅/❌
- Date post-2020 : ✅/❌
- Polygon (si ≥ 4 ha) : ✅/❌
- Lien parcel→lot : ✅/❌
- Pays de production (ISO) : ✅/❌
- Hash du statement : ✅/❌
🔴/🟡/🟢 Verdict
Actions : [liste]
```

## Risques si non conforme
- 🚫 Interdiction d'exporter vers l'UE (perte de marché)
- 💰 Amende jusqu'à **4% du chiffre d'affaires annuel mondial**
- ⚖️ Mise en demeure de la Commission européenne
