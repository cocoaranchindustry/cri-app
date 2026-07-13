---
name: brandbook-cri-guardian
description: Valide qu'un composant, une page ou un design respecte le Brandbook CRI v5 (palette cacao/vert, typographie Georgia + Calibri, dominante verte 60-70%, pas de rouge/bleu, accessibilité AA). À utiliser avant tout merge d'UI ou création de composant.
---

# Skill : Brandbook CRI Guardian

## Quand m'invoquer
- Avant de merger un PR qui touche l'UI (composant, page, section)
- Quand on crée un nouveau composant dans `apps/web/components/` ou `apps/web/app/`
- Quand on hésite sur un choix de couleur, typo, espacement
- Pour auditer une page existante

## Charte CRI v5 — référence rapide

### Palette
| Token | Hex | Usage |
|---|---|---|
| `cri-cacao` | `#1F4A2E` | Vert profond — fond principal, header |
| `cri-vert` | `#2D6B3E` | Vert secondaire — CTA, hover |
| `cri-cacao-clair` | `#9C7A3A` | Brun cacao clair — accents, separators |
| `cri-or` | `#C8A84B` | Or lumière — KPIs, valeurs phares |
| `cri-cream` | `#F5F0E8` | Crème — fonds clairs, cartes |
| `cri-ink` | `#3D3320` | Brun foncé — texte principal |

### Règles strictes
- ❌ **INTERDIT** : rouge (`#FF...`, `red-*`, `bg-red-*`)
- ❌ **INTERDIT** : bleu (`blue-*`, `bg-blue-*`, `text-blue-*`) — y compris bleu info
- ❌ **INTERDIT** : violet/magenta saturé
- ✅ **Vert** = 60-70% de la surface visible
- ✅ **Or** uniquement pour les chiffres clés (KPIs, valeurs monétaires)
- ✅ **Crème** pour adoucir les zones de lecture

### Typographie
- **Titres & valeurs** : `font-serif` (Georgia) — élégance, terroir
- **Texte courant & UI** : `font-sans` (Calibri / Inter fallback) — lisibilité
- **Pas plus de 2 niveaux de serif** dans une page

### Accessibilité (RGPD + WCAG 2.1 AA)
- Contraste minimum **4.5:1** pour le texte normal
- Contraste **3:1** pour le texte large (>18pt) et les composants UI
- Tous les boutons icônes ont un `aria-label`
- Les images décoratives ont `aria-hidden="true"`
- Focus visible (outline 2px en `cri-or`)

## Vérifications à effectuer

```bash
# 1. Chercher les couleurs interdites dans le code
grep -rE "(red-|blue-|violet-|purple-|pink-)" apps/web/app apps/web/components apps/web/features
# Attendu : aucun résultat (ou justifié par commentaire)

# 2. Vérifier l'utilisation des tokens CRI
grep -rE "bg-cri-|text-cri-|border-cri-" apps/web/app apps/web/components | wc -l
# Attendu : > 0

# 3. Vérifier la typo
grep -rE "font-(serif|sans)" apps/web/app apps/web/components | wc -l
```

## Verdict attendu
- 🟢 **PASS** : 0 couleur interdite, tokens CRI utilisés, typo correcte, focus visible
- 🟡 **WARN** : quelques usages non-token (à migrer), sinon OK
- 🔴 **FAIL** : couleur interdite détectée, contraste insuffisant, ou typo par défaut

## Format de sortie
```
🎨 Brandbook CRI — Audit [fichier]
🟢/🟡/🔴 Verdict : [PASS|WARN|FAIL]
- Palette : ✅/❌
- Typo : ✅/❌
- Accessibilité : ✅/❌
- Dominante verte : ✅/❌
- Actions : [liste]
```
