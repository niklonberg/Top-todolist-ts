type PriorityLevel = 'Low' | 'Medium' | 'High'; // convert to enum?

export interface FormTemplateObj {
  title: string;
  priority?: PriorityLevel;
  dueDate?: null | Date;
  description?: string;
}

export interface Todo {
  todoID: number;
  title: string;
  priority: PriorityLevel;
  isCompleted: boolean;
  dateCompleted: null | Date;
  dueDate: null | Date;
  description?: string;
  children: Todo[];
}

export interface DataManagerInterface<T> {
  addItem(): void;
  getItem(): T;
  editItem(): T;
  deleteItem(): void;
}

/* eslint-disable no-unused-vars */
// this could extend DataManagerInterface?
export interface TodoManagerInterface {
  // topLevelTodos: Todo[];
  currSelectedTodo: Todo;
  parentTodo: Todo | null;
  getTopLevelTodos(): Todo[];
  getTodo(todoID: number, todoArray: Todo[]): Todo;
  setSelectedTodo(todoID: number): void;
  resetSelectedTodo(): void;
  addTodo(todo: Todo, parentTodo?: Todo): void;
  deleteTopLevelTodo(todoID: number): void;
  deleteChildTodo(todoID: number): void;
  editTodo(todoToEdit: Todo, newTodo: Todo): void;
  toggleComplete(todoID: number): void;
}
/* eslint-disable no-unused-vars */

export interface TodoListItemWithDataset extends HTMLElement {
  dataset: {
    todo: string;
  };
}

export interface User {
  name: string;
  email: string;
}
