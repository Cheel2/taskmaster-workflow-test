export interface Task {
  id: string;              // UUID v4
  title: string;           // 1-100 chars, not empty
  description: string;     // 0-500 chars, optional
  done: boolean;           // default: false
  createdAt: Date;         // ISO8601 timestamp
}

export type TaskCreate = Omit<Task, 'id' | 'createdAt' | 'done'>;
// Résultat : { title: string; description: string }

export type TaskUpdate = Partial<Pick<Task, 'done'>>;
// Résultat : { done?: boolean }
