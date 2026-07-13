---
name: rgpd-antic-checker
description: Vérifie qu'un composant ou une page respecte la conformité RGPD (UE 2016/679) et la Loi camerounaise n° 2010/012 (régulation ANTIC). Couvre : consentement explicite, durée de conservation, hash IP, droits des personnes, transfert hors UE. À utiliser pour tout formulaire collectant des données personnelles.
---

# Skill : RGPD / ANTIC Checker

## Quand m'invoquer
- Création d'un formulaire (contact, KYC, producteur, newsletter)
- Modification d'une page qui collecte des données
- Avant d'ajouter un script tiers (analytics, chat, pixel)
- Audit annuel de conformité

## Bases légales à appliquer

| Type de traitement | Base légale | Action requise |
|---|---|---|
| Producteur (parcelles, ménage, économique) | **Consentement explicite** | Case à cocher + horodatage + hash IP |
| Investisseur (KYC, documents) | **Obligation légale** + **contractuel** | Conservation 10 ans (comptable) |
| Lead / Contact | **Consentement** | Opt-in newsletter séparé |
| Visiteur (analytics) | **Intérêt légitime** | Plausible (sans cookie) ou exempté CNIL |
| Sécurité, anti-fraude | **Intérêt légitime** | Logs 1 an max |

## Checklist par formulaire

### 1. Consentement explicite
- [ ] Case à cocher **non pré-cochée**
- [ ] Mention claire : "J'accepte que mes données soient traitées pour [finalité précise]"
- [ ] Lien vers `/privacy`
- [ ] Le submit est **bloqué** tant que la case n'est pas cochée

### 2. Données minimales
- [ ] Ne collecter que ce qui est nécessaire (principe de minimisation)
- [ ] Pas de champ "optionnel" devenu obligatoire
- [ ] Aucun identifiant unique non-essentiel (sauf obligation légale)

### 3. Sécurité technique
- [ ] HTTPS obligatoire (déjà garanti par Vercel)
- [ ] Pas de logs serveur contenant des données brutes
- [ ] IP hashée en SHA-256 avant stockage (lib `hashIP()` dans `lib/utils.ts`)
- [ ] Pas d'email en clair dans les logs Sentry

### 4. Transfert hors UE
- [ ] Sous-traitants listés dans `/privacy` (Plausible, Brevo, Sentry, Vercel, Firebase)
- [ ] Pour les sous-traitants hors UE : **SCC (Standard Contractual Clauses)** signées
- [ ] Firebase : région `europe-west1` (Belgique) ✅
- [ ] Brevo : serveurs UE ✅
- [ ] Vercel : CDN global mais données statiques (pas de PII hors UE)

### 5. Droits des personnes
- [ ] Lien `mailto:dpo@cri.africa` visible sur toute page de collecte
- [ ] Procédure interne pour répondre sous **30 jours**
- [ ] Procédure pour droit à l'effacement (Firestore `delete()` côté admin)
- [ ] Procédure pour portabilité (export JSON)

## Composants à connaître
- `apps/web/components/CookieBanner.tsx` — bannière cookies (déjà en place)
- `apps/web/features/traceability/components/ConsentForm.tsx` — consentement producteur RGPD
- `apps/web/app/privacy/page.tsx` — politique de confidentialité (déjà en place)
- `lib/utils.ts::hashIP` — hash SHA-256 d'une IP

## Format de sortie
```
🔒 RGPD/ANTIC — Audit [formulaire/page]
- Consentement : ✅/❌
- Minimisation : ✅/❌
- Sécurité (IP hash, TLS) : ✅/❌
- Transfert hors UE : ✅/❌
- Droits des personnes : ✅/❌
- Durée de conservation : ✅/❌
🔴/🟡/🟢 Verdict
Actions : [liste]
```

## Délais à connaître
- **CNIL** : notification de violation sous **72h**
- **Réponse à une demande** : **30 jours**
- **Conservation logs** : 1 an max
- **Conservation prospects** : 3 ans
- **Conservation KYC/comptable** : 10 ans
