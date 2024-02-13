export type PriorityLevel = 'Low' | 'Medium' | 'High'; // convert to enum?

// will replace FormTemplateObj
export interface newTaskFormData {
  title: string;
  priority: PriorityLevel;
  dueDate: string;
  description: string;
}

export interface FormTemplateObj {
  title: string;
  priority?: PriorityLevel;
  dueDate?: null | Date;
  description?: string;
}

export interface Task {
  _id?: string;
  sortOrder?: number;
  title: string;
  priority: PriorityLevel;
  isCompleted: boolean;
  dateCompleted: null | Date;
  dueDate: null | Date;
  description: string;
  subtasks: Task[];
}

export interface DataManagerInterface<T> {
  addItem(): void;
  getItem(): T;
  editItem(): T;
  deleteItem(): void;
}

export interface TodoListItemWithDataset extends HTMLElement {
  dataset: {
    task: string;
  };
}

/* eslint-disable no-unused-vars */
// this could extend DataManagerInterface?
export interface TaskManagerInterface {
  // topLevelTodos: Todo[];
  currSelectedTask: Task | null;
  parentTask: Task | null;
  getTasks(): Task[];
  getTask(taskID: string): Task;
  getSubtasks(taskID: string): Task[];
  // getTodayTasks(): Task[];
  // getNext7DaysTasks(): Task[];
  setSelectedTask(taskID: string): void;
  // resetSelectedTask(): void;
  addTask(task: Task): void;
  // deleteTopLevelTask(taskID: number): void;
  // deleteChildTask(taskID: number): void;
  // editTask(TaskToEdit: Task, newTask: Task): void;
  // toggleIsCompleted(taskID: number): Task;
  // toggleCompletedDate(task: Task): void;
  // reorderTask(index: number, TaskListItem: TodoListItemWithDataset): void;
}
/* eslint-disable no-unused-vars */

export interface User {
  name: string;
  email: string;
}
