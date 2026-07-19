# Phase 2.4 — Architectural Patterns (architectural-patterns)

## Architecture TaskMaster MVP

### Pattern : Local-First Single-Page Application

```
┌─────────────────────────────────────────┐
│           BROWSER (Client)              │
│  ┌─────────────────────────────────┐     │
│  │         Next.js 15              │     │
│  │  ┌─────────────────────────┐   │     │
│  │  │      App Router         │   │     │
│  │  │  ┌─────────────────┐   │   │     │
│  │  │  │   page.tsx      │   │   │     │
│  │  │  │  (State + Coord)│   │   │     │
│  │  │  └────────┬────────┘   │   │     │
│  │  │           │            │   │     │
│  │  │  ┌────────┴────────┐   │   │     │
│  │  │  │   Components    │   │   │     │
│  │  │  │  TaskForm       │   │   │     │
│  │  │  │  TaskList       │   │   │     │
│  │  │  │  TaskItem       │   │   │     │
│  │  │  └─────────────────┘   │   │     │
│  │  └─────────────────────────┘   │     │
│  │           │                      │     │
│  │  ┌────────┴────────┐          │     │
│  │  │   Lib / Utils     │          │     │
│  │  │  storage.ts       │          │     │
│  │  │  (localStorage)   │          │     │
│  │  └───────────────────┘          │     │
│  └─────────────────────────────────┘     │
│           │                               │
│  ┌────────┴────────┐                     │
│  │   localStorage    │                     │
│  │  (Persistence)    │                     │
│  └───────────────────┘                     │
└─────────────────────────────────────────┘
```

### Patterns utilisés

| Pattern | Où | Pourquoi |
|---------|-----|----------|
| **Container/Presentational** | `page.tsx` = container, `TaskForm/List/Item` = presentational | Séparation state / UI |
| **Single Source of Truth** | State dans `page.tsx` | Pas de state dispersé |
| **Immutability** | Toujours nouveaux objets/tableaux | Prédictibilité, debugging |
| **Error Boundary** | `layout.tsx` (future) | Gestion des erreurs React |
| **Custom Hook** | `useTasks()` (future) | Réutilisation du state logic |

### Patterns NON utilisés (MVP)

| Pattern | Pourquoi pas | Quand l'ajouter |
|---------|-------------|---------------|
| Redux / Zustand | Trop complexe pour 1 page | v2 (multi-page, auth) |
| Context API | Pas de prop drilling profond | v2 (theme, user) |
| React Query / SWR | Pas de backend | v3 (API REST) |
| Server Components | localStorage = client only | v2 (SSR pour SEO) |
| Micro-frontends | 1 seule app | Jamais (probablement) |

### Structure des dossiers (Phase 3)

```
src/
├── app/
│   ├── page.tsx          # Container — state, coordination
│   ├── layout.tsx        # Root layout — providers, meta
│   └── globals.css       # Tailwind imports
├── components/
│   ├── TaskForm.tsx      # Presentational — formulaire
│   ├── TaskList.tsx      # Presentational — liste
│   └── TaskItem.tsx      # Presentational — item
├── lib/
│   └── storage.ts        # Data layer — localStorage
├── types/
│   └── task.ts           # Domain types
└── __tests__/
    └── storage.test.ts   # Tests unitaires
```

### Future architecture (v2-v3)

```
v2 : Context API + IndexedDB
v3 : Backend API (Supabase) + React Query
v4 : Microservices + GraphQL + Next.js Server Components
```
