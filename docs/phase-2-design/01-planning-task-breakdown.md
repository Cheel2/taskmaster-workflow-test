# Phase 2.1 — Planning & Task Breakdown (planning-and-task-breakdown-v2)

## Décomposition en tâches exécutables — TaskMaster MVP

### Principe
Chaque tâche = 1 prompt Qwen = 1 fichier `.qwen-reports/session-NNN.md`
Chaque tâche produit du code testable et reviewable.

### Tâches Phase 3 : Implementation (10 prompts)

#### Tâche 1 : Setup projet (Session 001)
**Skill :** `incremental-implementation-v2`
**Prompt :** 
```
Crée un projet Next.js 15 avec TypeScript et Tailwind CSS.
Configuration minimale : package.json, tsconfig.json, tailwind.config.ts, next.config.ts.
Pas de pages supplémentaires. Structure : src/app/page.tsx (vide), src/app/layout.tsx (basique).
```
**Output attendu :** Fichiers de config, page.tsx vide, layout.tsx basique
**Review par :** Kimi (vérifie config, versions, structure)

#### Tâche 2 : Types & Interfaces (Session 002)
**Skill :** `source-driven-development-v2`
**Prompt :**
```
Crée le fichier src/types/task.ts avec :
- Interface Task { id: string; title: string; description: string; done: boolean; createdAt: Date }
- Type TaskCreate = Omit<Task, 'id' | 'createdAt' | 'done'>
- Type TaskUpdate = Partial<Pick<Task, 'done'>>
Exporte tout. Types stricts, pas de any.
```
**Output attendu :** `src/types/task.ts` (15-20 lignes)
**Review par :** Kimi (vérifie types, Omit, Partial, exports)

#### Tâche 3 : Storage Layer (Session 003)
**Skills :** `function-design` + `error-handling`
**Prompt :**
```
Crée src/lib/storage.ts avec un wrapper localStorage type-safe pour les tâches :
- getTasks(): Task[] — charge depuis localStorage, parse JSON, valide structure
- saveTask(task: TaskCreate): Task — génère UUID, ajoute createdAt, persist
- updateTask(id: string, updates: TaskUpdate): Task | null — update + persist
- deleteTask(id: string): boolean — supprime + persist
- Gère les erreurs JSON.parse, localStorage indisponible, données corrompues
- Clé localStorage : 'taskmaster_tasks'
- Exporte toutes les fonctions
```
**Output attendu :** `src/lib/storage.ts` (60-80 lignes)
**Review par :** Kimi (vérifie error handling, types, UUID, validation)

#### Tâche 4 : Tests unitaires Storage (Session 004)
**Skill :** `test-driven-development-v2`
**Prompt :**
```
Crée src/lib/storage.test.ts avec des tests Jest pour storage.ts :
- Test getTasks() : retourne [] si vide, retourne tasks si données existantes
- Test saveTask() : crée une tâche avec id et createdAt, persiste dans localStorage
- Test updateTask() : toggle done, retourne null si id inexistant
- Test deleteTask() : supprime, retourne false si id inexistant
- Mock localStorage avec jest
- Types stricts dans les tests
```
**Output attendu :** `src/lib/storage.test.ts` (80-100 lignes)
**Review par :** Kimi (vérifie couverture, mocks, edge cases)

#### Tâche 5 : TaskForm Component (Session 005)
**Skill :** `frontend-ui-engineering-v2`
**Prompt :**
```
Crée src/components/TaskForm.tsx :
- Formulaire avec input "Titre" (max 100 chars) et textarea "Description" (max 500 chars, optionnel)
- Bouton "Ajouter" désactivé si titre vide
- Validation : titre.trim().length > 0
- Au submit : appelle onTaskCreated(task: TaskCreate)
- Reset du formulaire après submit
- Accessible : labels, aria-label, focus management
- Style Tailwind : card blanche, ombre légère, inputs arrondis, bouton bleu
- Props : { onTaskCreated: (task: TaskCreate) => void }
```
**Output attendu :** `src/components/TaskForm.tsx` (50-70 lignes)
**Review par :** Kimi (vérifie accessibilité, validation, styles, props)

#### Tâche 6 : TaskItem Component (Session 006)
**Skill :** `frontend-ui-engineering-v2`
**Prompt :**
```
Crée src/components/TaskItem.tsx :
- Affiche titre (barré si done), description (grisée si done)
- Checkbox à gauche : toggle done
- Bouton 🗑️ à droite : onDelete
- Animation fade-out 200ms au delete (optionnel pour MVP)
- Accessible : aria-label sur checkbox et bouton delete
- Style Tailwind : border-b, hover:bg-gray-50, transition-colors
- Props : { task: Task; onToggle: (id: string) => void; onDelete: (id: string) => void }
```
**Output attendu :** `src/components/TaskItem.tsx` (40-60 lignes)
**Review par :** Kimi (vérifie accessibilité, styles, animation)

#### Tâche 7 : TaskList Component (Session 007)
**Skill :** `class-design`
**Prompt :**
```
Crée src/components/TaskList.tsx :
- Affiche la liste des TaskItem
- Ordre : actives en haut, terminées en bas, par date de création décroissante
- Message "Aucune tâche pour le moment. Créez-en une !" si vide
- Compteur : "X tâches" (total) + "Y terminées"
- Accessible : role="list", role="listitem"
- Style Tailwind : espace entre les items, padding
- Props : { tasks: Task[]; onToggle: (id: string) => void; onDelete: (id: string) => void }
```
**Output attendu :** `src/components/TaskList.tsx` (40-60 lignes)
**Review par :** Kimi (vérifie tri, compteur, accessibilité, empty state)

#### Tâche 8 : Page principale (Session 008)
**Skill :** `incremental-implementation-v2`
**Prompt :**
```
Crée src/app/page.tsx (remplace le vide) :
- Importe TaskForm, TaskList, storage functions
- State : tasks[] avec useState
- useEffect : charge tasks depuis localStorage au mount (client-side only)
- handleCreate : saveTask → setTasks([newTask, ...tasks])
- handleToggle : updateTask → met à jour le state
- handleDelete : deleteTask → met à jour le state
- Layout : centré, max-w-2xl, padding, header "TaskMaster"
- Gère hydration mismatch (pas de render côté serveur pour localStorage)
```
**Output attendu :** `src/app/page.tsx` (60-80 lignes)
**Review par :** Kimi (vérifie state management, useEffect, hydration, layout)

#### Tâche 9 : Polish & Styles (Session 009)
**Skill :** `naming-conventions`
**Prompt :**
```
Améliore le style global et la cohérence :
- Ajoute un header "TaskMaster" avec logo/emoji 📋
- Ajoute un footer simple "TaskMaster — Gestionnaire de tâches"
- Vérifie la cohérence des noms : TaskForm, TaskList, TaskItem (PascalCase)
- Vérifie les fonctions : handleCreate, handleToggle, handleDelete (camelCase)
- Vérifie les types : Task, TaskCreate, TaskUpdate (PascalCase)
- Vérifie les constantes : STORAGE_KEY (SCREAMING_SNAKE_CASE)
- Corrige tout inconsistance de naming
- Style Tailwind : gradient subtil sur le header, ombres, espacements cohérents
```
**Output attendu :** Modifs sur `page.tsx`, `layout.tsx`, potentiellement les composants
**Review par :** Kimi (vérifie naming, cohérence, styles)

#### Tâche 10 : Build & Vérification (Session 010)
**Skill :** `code-smells`
**Prompt :**
```
Vérifie que tout compile :
- npm run build doit passer
- Aucune erreur TypeScript
- Liste tous les fichiers créés avec leur nombre de lignes exact
- Liste tous les imports et vérifie qu'il n'y a pas de circular dependencies
- Vérifie qu'il n'y a pas de console.log ou de debugger
- Vérifie qu'il n'y a pas de any implicite
- Génère un résumé : X fichiers, Y lignes de code, Z lignes de tests
```
**Output attendu :** Build log, liste des fichiers, résumé
**Review par :** Kimi (vérifie build, tests, lint, code smells)

### Dépendances entre tâches

```
T1 (Setup) ──► T2 (Types) ──► T3 (Storage) ──► T4 (Tests)
                                              │
                                              ▼
T5 (Form) ──► T6 (Item) ──► T7 (List) ──► T8 (Page) ──► T9 (Polish) ──► T10 (Build)
```

### Estimation

| Tâche | Complexité | Prompts estimés | Temps Qwen |
|-------|-----------|-----------------|------------|
| T1 | 🟢 Low | 1 | 2 min |
| T2 | 🟢 Low | 1 | 2 min |
| T3 | 🟡 Medium | 1-2 | 3 min |
| T4 | 🟡 Medium | 1-2 | 3 min |
| T5 | 🟡 Medium | 1 | 3 min |
| T6 | 🟢 Low | 1 | 2 min |
| T7 | 🟡 Medium | 1 | 2 min |
| T8 | 🟡 Medium | 1-2 | 3 min |
| T9 | 🟢 Low | 1 | 2 min |
| T10 | 🟡 Medium | 1 | 3 min |
| **Total** | | **10-12** | **~25 min** |
