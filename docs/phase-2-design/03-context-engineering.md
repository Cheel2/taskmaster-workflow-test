# Phase 2.3 — Context Engineering (context-engineering-v2)

## Contexte pour Qwen — TaskMaster MVP

### Principe
Chaque prompt à Qwen doit inclure le contexte minimal nécessaire pour générer du code correct.
Pas de surcharge. Pas d'information inutile.

### Contexte par défaut (à inclure dans CHAQUE prompt)

```
CONTEXTE PROJET :
- Projet : TaskMaster — Gestionnaire de tâches local
- Stack : React 19 + TypeScript + Tailwind CSS + Next.js 15 (App Router)
- Architecture : Client-side only, localStorage, pas de backend
- Types définis dans src/types/task.ts
- Storage dans src/lib/storage.ts
- Composants dans src/components/
- Page principale dans src/app/page.tsx

RÈGLES DE CODE :
- TypeScript strict (pas de any)
- Tailwind uniquement (pas de CSS custom)
- Accessibilité WCAG 2.1 AA
- Pas de dangerouslySetInnerHTML
- Pas de console.log en production
- UUID v4 pour les IDs (crypto.randomUUID() ou uuid package)
```

### Contexte spécifique par tâche

#### Pour Tâche 2 (Types)
```
CONTEXTE SUPPLÉMENTAIRE :
- Interface Task déjà définie dans les requirements
- TaskCreate = Omit<Task, 'id' | 'createdAt' | 'done'>
- TaskUpdate = Partial<Pick<Task, 'done'>>
- Exporte tous les types depuis src/types/task.ts
```

#### Pour Tâche 3 (Storage)
```
CONTEXTE SUPPLÉMENTAIRE :
- Types disponibles : Task, TaskCreate, TaskUpdate (importe-les)
- Clé localStorage : 'taskmaster_tasks'
- Gère les cas : localStorage indisponible, JSON corrompu, données invalides
- Retourne des types stricts (pas de any)
```

#### Pour Tâche 5-6-7 (Composants)
```
CONTEXTE SUPPLÉMENTAIRE :
- Types disponibles : Task, TaskCreate, TaskUpdate
- Storage disponible : getTasks, saveTask, updateTask, deleteTask
- Style Tailwind : utiliser les classes standard (pas de valeurs arbitraires)
- Accessibilité : aria-label, role, focus-visible
```

#### Pour Tâche 8 (Page)
```
CONTEXTE SUPPLÉMENTAIRE :
- Composants disponibles : TaskForm, TaskList, TaskItem
- Storage disponible : getTasks, saveTask, updateTask, deleteTask
- Gestion du state : useState + useEffect
- Hydration : localStorage est client-side only, gérer le mismatch
- Layout : max-w-2xl, mx-auto, px-4, py-8
```

### Anti-patterns de contexte

| ❌ Mauvais | ✅ Bon |
|-----------|--------|
| "Crée un composant React" | "Crée src/components/TaskForm.tsx avec TypeScript strict" |
| "Fais un formulaire" | "Crée un formulaire avec input titre (max 100 chars), textarea description (optionnel), bouton submit" |
| "Gère le localStorage" | "Crée un wrapper type-safe localStorage avec getTasks, saveTask, updateTask, deleteTask" |
| "Style-le bien" | "Utilise Tailwind : bg-white, shadow-md, rounded-lg, p-4, focus:ring-2" |

### Template de prompt (à copier-coller)

```
[CONTEXTE]
Projet : TaskMaster — Gestionnaire de tâches
Stack : React 19 + TypeScript + Tailwind + Next.js 15
Fichiers existants : [liste des fichiers déjà créés]
Types disponibles : [liste des types]
Fonctions disponibles : [liste des fonctions]

[TÂCHE]
[Description précise de ce que Qwen doit créer]

[CONTRAINTES]
- TypeScript strict
- Tailwind uniquement
- Accessibilité WCAG 2.1 AA
- Pas de any
- Pas de dangerouslySetInnerHTML

[OUTPUT ATTENDU]
- Fichier : [chemin]
- Lignes estimées : [nombre]
- Tests : [oui/non]
```
