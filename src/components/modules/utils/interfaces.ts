export interface FormTemplateObj {
  title: string;
  dueDate?: null | Date;
  description?: string; // should these be optional?
  isUrgent?: boolean;
}

export interface Todo {
  todoID: number;
  title: string;
  isUrgent: boolean;
  isCompleted: boolean;
  dateCompleted: null | Date;
  dueDate: null | Date;
  description?: string;
  children: Todo[];
}

/* eslint-disable no-unused-vars */
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
  // toggleProperty(
  //   itemID: number,
  //   itemType: string,
  //   propertyToToggle: string,
  // ): void;
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
