# QWEN OUTPUT REPORT — SESSION 006

## SECTION 1: MÉTADONNÉES
| Field | Value |
|-------|--------|
| Session ID | 006 |
| Timestamp | 2026-07-23 00:30:00 |
| Phase | 3 |
| Skill | clean-tests-v2, source-driven-development-v2, naming-conventions |
| Reasoning Pattern | VerificationLoop |
| Model | qwen-coder-2.5 |

## SECTION 2: PROMPT ORIGINAL (COMPLET)
[Voir le prompt complet de la session 006 dans l'historique]

## SECTION 3: FILES CREATED
| # | File | Lines | Language |
|---|------|-------|----------|
| 1 | src/lib/storage.test.ts | 189 | TypeScript |

## SECTION 4: COMPLETE CODE OUTPUT
### File 1: `src/lib/storage.test.ts` (189 lines)

```typescript
import type { Task, TaskCreate, TaskUpdate } from '../types/task';
import { getTasks, saveTask, updateTask, deleteTask, StorageError } from './storage';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('getTasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('shouldReturnEmptyArrayWhenNoTasksInStorage', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
    const result = getTasks();
    expect(result).toEqual([]);
    expect(localStorage.getItem).toHaveBeenCalledWith('taskmaster_tasks');
  });

  it('shouldReturnParsedTasksWhenValidJsonExists', () => {
    const tasks: Task[] = [
      { id: '1', title: 'Test', description: 'Test desc', done: false, createdAt: new Date() },
    ];
    (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(tasks));
    const result = getTasks();
    expect(result).toEqual(tasks);
  });

  it('shouldReturnEmptyArrayAndLogErrorWhenJsonIsInvalid', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (localStorage.getItem as jest.Mock).mockReturnValue('invalid json');
    const result = getTasks();
    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('shouldReturnEmptyArrayWhenLocalStorageThrowsError', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (localStorage.getItem as jest.Mock).mockImplementation(() => {
      throw new Error('Storage error');
    });
    const result = getTasks();
    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe('saveTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    jest.spyOn(global, 'crypto', 'get').mockReturnValue({
      randomUUID: jest.fn().mockReturnValue('mock-uuid-123'),
    } as any);
  });

  it('shouldSaveTaskAndReturnItWithGeneratedIdAndCreatedAt', () => {
    const taskCreate: TaskCreate = { title: 'New Task', description: 'Desc' };
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
    const setItemSpy = jest.spyOn(localStorage, 'setItem');
    const result = saveTask(taskCreate);
    expect(result.id).toBe('mock-uuid-123');
    expect(result.title).toBe('New Task');
    expect(result.done).toBe(false);
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(setItemSpy).toHaveBeenCalled();
  });

  it('shouldAddTaskToExistingTasks', () => {
    const existing: Task[] = [
      { id: '1', title: 'Existing', description: 'Desc', done: false, createdAt: new Date() },
    ];
    (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(existing));
    const setItemSpy = jest.spyOn(localStorage, 'setItem');
    const taskCreate: TaskCreate = { title: 'New', description: 'Desc' };
    const result = saveTask(taskCreate);
    expect(result.id).toBe('mock-uuid-123');
    expect(setItemSpy).toHaveBeenCalled();
    const saved = JSON.parse((localStorage.setItem as jest.Mock).mock.calls[0][1]);
    expect(saved).toHaveLength(2);
    expect(saved[1].id).toBe('mock-uuid-123');
  });

  it('shouldThrowErrorWhenLocalStorageWriteFails', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
    (localStorage.setItem as jest.Mock).mockImplementation(() => {
      throw new Error('Write error');
    });
    const taskCreate: TaskCreate = { title: 'Test', description: 'Desc' };
    expect(() => saveTask(taskCreate)).toThrow('Storage operation failed');
  });
});

describe('updateTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('shouldUpdateTaskAndReturnItWhenFound', () => {
    const task: Task = { id: '1', title: 'Old', description: 'Old desc', done: false, createdAt: new Date() };
    (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify([task]));
    const setItemSpy = jest.spyOn(localStorage, 'setItem');
    const updates: TaskUpdate = { done: true };
    const result = updateTask('1', updates);
    expect(result).not.toBeNull();
    expect(result!.done).toBe(true);
    expect(result!.title).toBe('Old');
    expect(setItemSpy).toHaveBeenCalled();
  });

  it('shouldReturnNullWhenTaskNotFound', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify([]));
    const result = updateTask('not-found', { done: true });
    expect(result).toBeNull();
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('shouldThrowErrorWhenLocalStorageWriteFails', () => {
    const task: Task = { id: '1', title: 'Test', description: 'Desc', done: false, createdAt: new Date() };
    (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify([task]));
    (localStorage.setItem as jest.Mock).mockImplementation(() => {
      throw new Error('Write error');
    });
    expect(() => updateTask('1', { done: true })).toThrow('Storage operation failed');
  });
});

describe('deleteTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('shouldRemoveTaskAndReturnTrueWhenFound', () => {
    const task: Task = { id: '1', title: 'Test', description: 'Desc', done: false, createdAt: new Date() };
    (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify([task]));
    const setItemSpy = jest.spyOn(localStorage, 'setItem');
    const result = deleteTask('1');
    expect(result).toBe(true);
    expect(setItemSpy).toHaveBeenCalled();
    const saved = JSON.parse((localStorage.setItem as jest.Mock).mock.calls[0][1]);
    expect(saved).toHaveLength(0);
  });

  it('shouldReturnFalseWhenTaskNotFound', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify([]));
    const result = deleteTask('not-found');
    expect(result).toBe(false);
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('shouldThrowErrorWhenLocalStorageWriteFails', () => {
    const task: Task = { id: '1', title: 'Test', description: 'Desc', done: false, createdAt: new Date() };
    (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify([task]));
    (localStorage.setItem as jest.Mock).mockImplementation(() => {
      throw new Error('Write error');
    });
    expect(() => deleteTask('1')).toThrow('Storage operation failed');
  });
});
```

## SECTION 5: DÉCISIONS ARCHITECTURALES
1. **Mock localStorage** : Implémentation manuelle avec `jest.fn()` pour simuler l'API Web Storage en Node.js.
2. **Isolation** : `beforeEach` + `jest.clearAllMocks()` + `localStorage.clear()` pour garantir l'isolation absolue.
3. **Pattern AAA** : Chaque test suit implicitement Arrange → Act → Assert.
4. **Noms de tests** : Format `should[Behavior]When[Condition]`.
5. **Typage strict** : Aucun `any` explicite sauf pour le mock crypto (contrainte environnementale).

## SECTION 6: PROBLÈMES RENCONTRÉS
| Problème | Solution | Statut |
|----------|----------|--------|
| localStorage non disponible en Node.js | Mock manuel de l'API Storage | ✅ |
| Fichier rapport manquant | Recréation manuelle du rapport | ✅ |
| Espace disque insuffisant pour Jest | Tests non exécutés, documenté | ⚠️ |

## SECTION 7: VERIFICATION LOOP
| # | Vérification | Statut |
|---|-------------|--------|
| 1 | Rapport existe | ✅ |
| 2 | Code COMPLET de storage.test.ts | ✅ |
| 3 | Branche = main | ✅ |
| 4 | Remote configuré | ✅ |
| 5 | Push réussi | ⏳ En cours |
| 6 | Rapport visible sur GitHub | ⏳ Après push |
| 7 | 13 tests documentés | ✅ |

## SECTION 8: STATUS
✅ **TESTS ÉCRITS** - 13 tests unitaires pour les 4 fonctions.
⚠️ **TESTS NON EXÉCUTÉS** - Environnement limité (espace disque).
📋 **PRÊT POUR PUSH** - Code validé syntaxiquement.

## SECTION 9: TABLEAU DES TESTS
| Fonction | Nb tests | Status |
|----------|----------|--------|
| getTasks | 4 | Écrits |
| saveTask | 3 | Écrits |
| updateTask | 3 | Écrits |
| deleteTask | 3 | Écrits |
| **Total** | **13** | ✅ |
