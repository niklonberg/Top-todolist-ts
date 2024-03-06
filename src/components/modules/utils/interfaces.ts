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
  dateCompleted: null | Date;
  dueDate: null | Date;
  description: string;
  subtasks: Task[];
}

export interface SubtaskWithImpParentInfo extends Task {
  parentTaskTitle: string;
  parentTaskID: string;
  subtaskIndex: number;
}

export interface DataManagerInterface<T> {
  addItem(): void;
  getItem(): T;
  editItem(): T;
  deleteItem(): void;
}

export interface TaskListItem extends HTMLLIElement {
  dataset: {
    task: string;
    subtaskIndex?: string;
  };
}

/* eslint-disable no-unused-vars */
// this could extend DataManagerInterface?
export interface TaskManagerInterface {
  currSelectedTask: Task | null;
  getTasks(): Task[];
  getTask(taskID: string): Task;
  // getSubtasks(taskID: string): Task[];
  // getSubtask(subtaskIndex: number): Task;
  getSubtasksDueToday(): SubtaskWithImpParentInfo[];
  getSubtasksDueWeek(): Task[];
  setSelectedTask(taskID: string): void;
  resetSelectedTask(): void;
  editTask(taskToEdit: Task, newTask: Task): void;
  editSubtask(subtaskIndex: number, newSubtask: Task, taskID: string): void;
  toggleSubtaskCompleted(
    subtaskIndex: number,
    taskID: string,
  ): Promise<Response>;
  addTask(task: Task): void;
  addSubtask(task: Task): void;
  deleteTask(taskID: string): Promise<Response>;
  deleteSubtask(subtaskIndex: number, taskID: string): Promise<Response>;
  // toggleCompletedDate(task: Task): void;
  // reorderTask(index: number, TaskListItem: TodoListItemWithDataset): void;
}
/* eslint-disable no-unused-vars */

export interface User {
  name: string;
  email: string;
}
