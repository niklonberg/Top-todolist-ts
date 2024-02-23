export type PriorityLevel = 'Low' | 'Medium' | 'High'; // convert to enum?

export type TaskLevel = 'task' | 'subtask';

export interface newTaskFormData {
  title: string;
  priority: PriorityLevel;
  dueDate: string;
  description: string;
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
  currSelectedTask: Task | null;
  getTasks(): Task[];
  getTask(taskID: string): Task;
  getSubtasks(taskID: string): Task[];
  getTodayTasks(): Task[];
  // getNext7DaysTasks(): Task[];
  editTask(taskToEdit: Task, newTask: Task): void;
  setSelectedTask(taskID: string): void;
  resetSelectedTask(): void;
  addTask(task: Task): void;
  addSubtask(task: Task): void;
  deleteTask(taskID: string): Promise<Response>;
  deleteSubtask(subtaskIndex: number): Promise<Response>;
  // toggleIsCompleted(taskID: number): Task;
  // toggleCompletedDate(task: Task): void;
  // reorderTask(index: number, TaskListItem: TodoListItemWithDataset): void;
}
/* eslint-disable no-unused-vars */

export interface User {
  name: string;
  email: string;
}
