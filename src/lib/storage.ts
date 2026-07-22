import type { Task, TaskCreate, TaskUpdate } from '../types/task';

const STORAGE_KEY = 'taskmaster_tasks';

/**
 * Erreur personnalisée pour les opérations de stockage.
 */
class StorageError extends Error {
  constructor(action: string, cause: unknown) {
    super(`Storage operation failed: ${action}. Cause: ${cause instanceof Error ? cause.message : String(cause)}`);
    this.name = 'StorageError';
  }
}

/**
 * Valide que les données parsées correspondent à un tableau de tâches valide.
 */
function isValidTaskArray(data: unknown): data is Task[] {
  return Array.isArray(data) && data.every(item => 
    typeof item === 'object' && item !== null &&
    'id' in item && typeof item.id === 'string' &&
    'title' in item && typeof item.title === 'string' &&
    'description' in item && typeof item.description === 'string' &&
    'done' in item && typeof item.done === 'boolean' &&
    'createdAt' in item
  );
}

/**
 * Persiste un tableau de tâches dans localStorage.
 * Lève une StorageError en cas d'échec.
 */
function persistTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    const action = `write tasks to localStorage (key: ${STORAGE_KEY})`;
    console.error(`[Storage] Failed to ${action}. ` +
                  `Cause: ${error instanceof Error ? error.message : String(error)}. ` +
                  `Action: Check storage quota or permissions.`);
    throw new StorageError(action, error);
  }
}

/**
 * Lit les tâches depuis localStorage.
 * Retourne un tableau vide si la clé n'existe pas, si le JSON est invalide,
 * ou si localStorage lève une erreur.
 */
export function getTasks(): Task[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data === null) {
      return [];
    }
    const parsed = JSON.parse(data);
    if (!isValidTaskArray(parsed)) {
      console.error(`[Storage] Invalid task structure in localStorage (key: ${STORAGE_KEY}). ` +
                    `Fallback: returning empty array.`);
      return [];
    }
    return parsed;
  } catch (error) {
    console.error(`[Storage] Failed to read tasks from localStorage (key: ${STORAGE_KEY}). ` +
                  `Cause: ${error instanceof Error ? error.message : String(error)}. ` +
                  `Fallback: returning empty array.`);
    return [];
  }
}

/**
 * Crée et sauvegarde une nouvelle tâche.
 * Génère un UUID v4 et un timestamp createdAt.
 * Lève une StorageError en cas d'échec d'écriture.
 */
export function saveTask(task: TaskCreate): Task {
  const newTask: Task = {
    id: crypto.randomUUID(),
    title: task.title,
    description: task.description,
    done: false,
    createdAt: new Date(),
  };

  const existingTasks = getTasks();
  const updatedTasks = [...existingTasks, newTask];
  persistTasks(updatedTasks);
  return newTask;
}

/**
 * Met à jour une tâche existante par son ID.
 * Retourne null si la tâche n'est pas trouvée.
 * Lève une StorageError en cas d'échec d'écriture.
 */
export function updateTask(id: string, updates: TaskUpdate): Task | null {
  const existingTasks = getTasks();
  const taskIndex = existingTasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return null;
  }

  const updatedTask: Task = { ...existingTasks[taskIndex], ...updates };
  const updatedTasks = existingTasks.map(t => t.id === id ? updatedTask : t);
  persistTasks(updatedTasks);
  return updatedTask;
}

/**
 * Supprime une tâche par son ID.
 * Retourne true si la suppression a réussi, false si la tâche n'a pas été trouvée.
 * Lève une StorageError en cas d'échec d'écriture.
 */
export function deleteTask(id: string): boolean {
  const existingTasks = getTasks();
  const filteredTasks = existingTasks.filter((task) => task.id !== id);

  if (filteredTasks.length === existingTasks.length) {
    return false;
  }

  persistTasks(filteredTasks);
  return true;
}
