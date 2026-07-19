# Phase 2.2 — API & Interface Design (api-and-interface-design-v2)

## API Interne — TaskMaster

### Pas de backend API
TaskMaster est **100% client-side**. Pas de REST API, pas de GraphQL.
L'"API" est l'interface entre les composants React et le storage layer.

### Interface Storage (src/lib/storage.ts)

```typescript
// Contrat public du storage
export interface StorageAPI {
  getTasks(): Task[];
  saveTask(task: TaskCreate): Task;
  updateTask(id: string, updates: TaskUpdate): Task | null;
  deleteTask(id: string): boolean;
}

// Implémentation actuelle : localStorage
// Implémentation future : IndexedDB, Backend API, etc.
```

### Interface Composants

#### TaskForm
```typescript
interface TaskFormProps {
  onTaskCreated: (task: TaskCreate) => void;
}
// Émet : TaskCreate (sans id, createdAt, done)
// Ne reçoit pas de données, émet seulement
```

#### TaskItem
```typescript
interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}
// Reçoit : Task (données complètes)
// Émet : id (string) pour toggle et delete
```

#### TaskList
```typescript
interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}
// Reçoit : Task[] (données complètes)
// Émet : id (string) pour toggle et delete
// Ne gère pas le state, reçoit tout en props
```

### Flux de données (unidirectionnel)

```
┌─────────────┐     TaskCreate     ┌─────────────┐
│  TaskForm   │───────────────────▶│   Page      │
│  (émet)     │                    │  (state)    │
└─────────────┘                    └──────┬──────┘
                                        │
                              ┌─────────┼─────────┐
                              │         │         │
                              ▼         ▼         ▼
                         ┌────────┐ ┌────────┐ ┌────────┐
                         │Storage │ │ TaskList│ │ TaskItem│
                         │(persist)│  (affiche)│  (affiche)│
                         └────────┘ └────────┘ └────────┘
                              │
                              │ Task[]
                              ▼
                         ┌────────┐
                         │localStorage│
                         │(persist)  │
                         └────────┘
```

### Principes d'interface

1. **Props down, events up** — Les composants enfants reçoivent des données et émettent des événements
2. **Single source of truth** — Le state est dans `page.tsx`, jamais dans les composants enfants
3. **Immutability** — Toujours créer de nouveaux tableaux/objets, jamais muter
4. **Type safety** — Toutes les props sont typées, pas de `any`

### Future API (v2)

| Version | API | Persistence |
|---------|-----|-------------|
| MVP (v1) | React props | localStorage |
| v2 | React props + Context API | IndexedDB |
| v3 | REST API | Backend (Supabase/Firebase) |
| v4 | GraphQL | Backend custom |
