import type { Task, TaskCreate, TaskUpdate } from '../types/task';

const STORAGE_KEY = 'taskmaster_tasks';

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
    const parsed = JSON.parse(data) as Task[];
    return parsed;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
}

/**
 * Crée et sauvegarde une nouvelle tâche.
 * Génère un UUID v4 et un timestamp createdAt.
 * Lève une erreur en cas d'échec d'écriture.
 */
export function saveTask(task: TaskCreate): Task {
  const newTask: Task = {
    id: crypto.randomUUID(),
    title: task.title,
    description: task.description,
    done: false,
    createdAt: new Date(),
  };

  try {
    const existingTasks = getTasks();
    existingTasks.push(newTask);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingTasks));
    return newTask;
  } catch (error) {
    console.error('Error saving task to localStorage:', error);
    throw error;
  }
}

/**
 * Met à jour une tâche existante par son ID.
 * Retourne null si la tâche n'est pas trouvée.
 * Lève une erreur en cas d'échec d'écriture.
 */
export function updateTask(id: string, updates: TaskUpdate): Task | null {
  try {
    const existingTasks = getTasks();
    const taskIndex = existingTasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return null;
    }

    const updatedTask: Task = { ...existingTasks[taskIndex], ...updates };
    existingTasks[taskIndex] = updatedTask;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingTasks));
    return updatedTask;
  } catch (error) {
    console.error('Error updating task in localStorage:', error);
    throw error;
  }
}

/**
 * Supprime une tâche par son ID.
 * Retourne true si la suppression a réussi, false si la tâche n'a pas été trouvée.
 * Lève une erreur en cas d'échec d'écriture.
 */
export function deleteTask(id: string): boolean {
  try {
    const existingTasks = getTasks();
    const filteredTasks = existingTasks.filter((task) => task.id !== id);

    if (filteredTasks.length === existingTasks.length) {
      return false;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTasks));
    return true;
  } catch (error) {
    console.error('Error deleting task from localStorage:', error);
    throw error;
  }
}
