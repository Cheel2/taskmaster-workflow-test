# Phase 1.1 — Idea Refinement (idea-refine-v2)

## Idée brute
> "Une app pour gérer des tâches, simple, rapide, sans backend."

## Affinement du concept

### Problème résolu
Les apps de todo existantes sont trop complexes (comptes, sync cloud, notifications). 
TaskMaster est un gestionnaire de tâches **local-first**, instantané, zero-config.

### Utilisateur cible
Développeurs, étudiants, freelances qui veulent un outil simple sans friction.

### Proposition de valeur unique
- **Zero backend** — tout dans le navigateur (localStorage)
- **Zero compte** — ouvrir et utiliser
- **Zero complexité** — 3 actions : créer, terminer, supprimer
- **Zero déploiement** — static site, hébergable partout

### Scope MVP (Minimum Viable Product)
| Feature | In (MVP) | Out (v2) |
|---------|----------|----------|
| Créer une tâche | ✅ | |
| Marquer comme faite | ✅ | |
| Supprimer une tâche | ✅ | |
| Liste des tâches | ✅ | |
| Persistance localStorage | ✅ | |
| Catégories / tags | ❌ | ✅ |
| Dates d'échéance | ❌ | ✅ |
| Filtres (toutes/actives/terminées) | ❌ | ✅ |
| Drag & drop réordonnancement | ❌ | ✅ |
| Export / import | ❌ | ✅ |
| Backend + comptes | ❌ | ✅ |

### Hypothèses à valider
1. [ ] Les users préfèrent localStorage à un compte cloud
2. [ ] 3 actions suffisent (pas besoin de filtres pour MVP)
3. [ ] Le design minimaliste est suffisant

### Questions ouvertes
- Quelle stack technique ? (React, Vue, Svelte ?)
- Quel hébergement ? (Vercel, Netlify, GitHub Pages ?)
- Faut-il des tests ? (unit, e2e ?)
