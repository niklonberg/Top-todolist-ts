export interface FormTemplateObj {
  title: string;
  dueDate?: null | Date;
  description?: string;
  isImportant?: boolean;
}

export interface Todo {
  todoID: number;
  title: string;
  isImportant: boolean;
  isCompleted: boolean;
  dateCompleted: null | Date;
  dueDate?: null | Date;
  description?: string;
  children: Todo[];
}

/* eslint-disable no-unused-vars */
export interface TodoManagerInterface {
  // topLevelTodos: Todo[];
  currSelectedTodo: Todo;
  // getItem<T>(itemID: number, itemType: string): T;
  // getItems<T>(itemsToGet: string): T[];
  // setSelectedProject(projectID: number): void;
  // addItem(item: Todo): void;
  // deleteItem(itemID: number, itemType: string): void;
  // toggleProperty(
  //   itemID: number,
  //   itemType: string,
  //   propertyToToggle: string,
  // ): void;
}
/* eslint-disable no-unused-vars */

export interface User {
  name: string;
  email: string;
}
