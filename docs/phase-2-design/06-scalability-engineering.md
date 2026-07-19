# Phase 2.6 — Scalability Engineering (scalability-engineering)

## Scalabilité — TaskMaster

### MVP (v1) : Pas de scalabilité requise

| Aspect | MVP | Justification |
|--------|-----|---------------|
| Utilisateurs | 1 | localStorage = single user |
| Données | < 1000 tâches | localStorage 5MB |
| Performance | < 100ms/op | Client-side, pas de réseau |
| Déploiement | Static site | Vercel free tier |

### Scalabilité horizontale (future — v2-v3)

```
v1 (MVP)                    v2 (Multi-user)              v3 (Scale)
┌─────────┐                 ┌─────────┐                  ┌─────────┐
│ 1 User  │                 │ N Users │                  │ N Users │
│ 1 Device│                 │ 1 Device│                  │ N Devices│
│localStorage│               │IndexedDB│                  │ Backend  │
└─────────┘                 └─────────┘                  └─────────┘
     │                            │                            │
     ▼                            ▼                            ▼
  Pas de sync                 Sync local                    Sync cloud
  Pas d'auth                  Auth local                    Auth OAuth
  Pas de backup               Export JSON                   Auto-backup
```

### Points de contention identifiés

| Point | MVP | v2 | v3 |
|-------|-----|-----|-----|
| Storage | localStorage (5MB) | IndexedDB (50MB+) | Backend (illimité) |
| Auth | Aucune | Local password | OAuth (GitHub, Google) |
| Sync | Aucune | Manual export/import | Real-time sync |
| Offline | Oui (local) | Oui (IndexedDB) | Oui (PWA + cache) |
| Collaboration | Non | Non | Oui (partage de listes) |

### Stratégies de scalabilité (documentées pour v2)

1. **Pagination** : Charger les tâches par batch (20 par page)
2. **Virtualization** : React-window pour les listes longues
3. **Debouncing** : Sauvegarde localStorage debounced (300ms)
4. **Compression** : Compresser JSON avant stockage (LZ-string)
5. **Sharding** : Splitter les tâches par mois/année

### Decision Record

**ADR-001 : Pas de backend pour MVP**
- Contexte : MVP doit être livré en 1-2 jours
- Decision : localStorage uniquement
- Conséquences : Pas de multi-user, pas de sync, limite 5MB
- Réversible : Oui, v2 ajoutera IndexedDB puis backend

**ADR-002 : Static export pour MVP**
- Contexte : Hébergement gratuit, pas de server-side logic
- Decision : `next export` → static HTML
- Conséquences : Pas de SSR, pas d'API routes, SEO limité
- Réversible : Oui, v3 passera à SSR si besoin SEO
