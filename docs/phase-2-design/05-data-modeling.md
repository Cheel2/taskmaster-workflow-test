# Phase 2.5 — Data Modeling (data-modeling)

## Modèle de données — TaskMaster

### Entité principale : Task

```typescript
// src/types/task.ts
interface Task {
  id: string;           // UUID v4 — identifiant unique
  title: string;        // Max 100 chars — obligatoire
  description: string;  // Max 500 chars — optionnel (peut être vide)
  done: boolean;        // false par défaut
  createdAt: Date;      // Timestamp de création
}

// Types dérivés
type TaskCreate = Omit<Task, 'id' | 'createdAt' | 'done'>;
// { title: string; description: string }

type TaskUpdate = Partial<Pick<Task, 'done'>>;
// { done?: boolean }
```

### Contraintes du modèle

| Attribut | Type | Contrainte | Validation |
|----------|------|------------|------------|
| id | string | UUID v4, unique | Généré par crypto.randomUUID() |
| title | string | 1-100 chars, non vide | Trim + length check |
| description | string | 0-500 chars, optionnel | Trim + length check |
| done | boolean | false par défaut | Toggle uniquement |
| createdAt | Date | Auto-généré | new Date() au create |

### Format de persistence (localStorage)

```json
{
  "taskmaster_tasks": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Acheter du lait",
      "description": "2 litres, demi-écrémé",
      "done": false,
      "createdAt": "2026-07-18T14:30:00.000Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "title": "Réviser le code",
      "description": "",
      "done": true,
      "createdAt": "2026-07-18T10:00:00.000Z"
    }
  ]
}
```

### Migration de données (future)

```typescript
// src/lib/migration.ts (v2)
const CURRENT_VERSION = 1;

interface StoredData {
  version: number;
  tasks: Task[];
}

function migrate(data: any): StoredData {
  if (!data.version) {
    // v0 → v1 : ajout de createdAt
    return {
      version: 1,
      tasks: data.map((t: any) => ({
        ...t,
        createdAt: t.createdAt || new Date().toISOString()
      }))
    };
  }
  return data;
}
```

### Index et performance

| Index | Champ | Type | Usage |
|-------|-------|------|-------|
| Primaire | id | UUID | Recherche, update, delete |
| Secondaire | createdAt | Date | Tri (défaut) |
| Secondaire | done | boolean | Filtrage (future) |

### Limites du modèle

| Limite | Valeur | Raison |
|--------|--------|--------|
| Max tasks | ~1000 | localStorage 5MB |
| Max title | 100 chars | UI + storage |
| Max description | 500 chars | UI + storage |
| Max history | Aucune | Pas d'audit log (v2) |
