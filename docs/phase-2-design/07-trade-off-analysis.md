# Phase 2.7 — Trade-off Analysis (trade-off-analysis)

## Analyse des compromis — TaskMaster MVP

### Trade-off 1 : localStorage vs Backend API

| Critère | localStorage (choisi) | Backend API (rejeté) |
|---------|----------------------|----------------------|
| Setup | ✅ Instantané | ❌ Config serveur, DB, auth |
| Coût | ✅ Gratuit | ❌ Hébergement + DB |
| Complexité | ✅ Zero | ❌ Architecture, sécurité, scaling |
| Multi-device | ❌ Non | ✅ Oui |
| Data safety | ❌ Local only | ✅ Backup cloud |
| **Décision** | ✅ **Choisir** | Rejeter pour MVP |
| **Justification** | MVP = 1-2 jours. Backend ajouterait 1-2 semaines. | |

### Trade-off 2 : Next.js vs Vite / Create React App

| Critère | Next.js 15 (choisi) | Vite (alternatif) | CRA (rejeté) |
|---------|---------------------|-------------------|--------------|
| Static export | ✅ `next export` | ✅ `vite build` | ⚠️ Complexe |
| Tailwind intégration | ✅ Natif | ✅ Plugin | ❌ Config manuelle |
| App Router | ✅ Moderne | N/A | ❌ Obsolete |
| Learning curve | ⚠️ Moyenne | ✅ Faible | ❌ Élevée (outdated) |
| **Décision** | ✅ **Choisir** | Alternative viable | Rejeter (obsolete) |
| **Justification** | Stack moderne, static export facile, Tailwind natif. | | |

### Trade-off 3 : TypeScript strict vs Relaxed

| Critère | Strict (choisi) | Relaxed (rejeté) |
|---------|-----------------|------------------|
| Qualité du code | ✅ Élevée | ❌ Moyenne |
| Debugging | ✅ Facile | ❌ Difficile |
| Productivité initiale | ⚠️ Plus lente | ✅ Plus rapide |
| Refactoring | ✅ Sûr | ❌ Risqué |
| **Décision** | ✅ **Choisir** | Rejeter |
| **Justification** | MVP = fondation. Relaxed = dette technique dès le départ. | |

### Trade-off 4 : Tests MVP vs Tests complets

| Critère | Tests unitaires (choisi) | Tests E2E (rejeté) | Pas de tests (rejeté) |
|---------|-------------------------|-------------------|----------------------|
| Couverture | ⚠️ Storage layer | ✅ Full user journey | ❌ Aucune |
| Temps | ✅ 10 min | ❌ 1 heure | ✅ 0 min |
| Valeur | ✅ Validation logique | ✅ Validation UX | ❌ Aucune |
| **Décision** | ✅ **Choisir** | Rejeter (trop long) | Rejeter (trop risqué) |
| **Justification** | Tests unitaires = meilleur ROI pour MVP. E2E = Phase 4 si temps. | | |

### Trade-off 5 : Design minimaliste vs Design premium

| Critère | Minimaliste (choisi) | Premium (rejeté) |
|---------|---------------------|-------------------|
| Temps | ✅ 30 min | ❌ 2-3 heures |
| Maintenance | ✅ Faible | ❌ Élevée |
| UX | ⚠️ Suffisante | ✅ Excellente |
| **Décision** | ✅ **Choisir** | Rejeter pour MVP |
| **Justification** | MVP = fonctionnel. Design premium = v2 si feedback positif. | |

### Matrice de décision globale

| Decision | Option A | Option B | Gagnant | Risque principal |
|----------|----------|----------|---------|------------------|
| Persistence | localStorage | Backend | localStorage | Perte de données |
| Framework | Next.js | Vite | Next.js | Learning curve |
| Typage | Strict | Relaxed | Strict | Productivité initiale |
| Tests | Unit | E2E | Unit | Couverture limitée |
| Design | Minimal | Premium | Minimal | UX moyenne |

### Risques acceptés

1. **Perte de données** : localStorage = pas de backup. Accepté pour MVP.
2. **Pas de multi-device** : Accepté pour MVP.
3. **UX basique** : Accepté pour MVP.
4. **Tests limités** : Accepté, complétés en Phase 4.
