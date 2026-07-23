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
