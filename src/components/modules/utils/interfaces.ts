export interface FormTemplateObj {
  title: string;
  dueDate?: null | Date;
  description?: string;
  isImportant?: boolean;
}

// remove Project interface and just have todo
// that can have children which are child todos
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
  // projects: Project[];
  currSelectedProject: Project;
  getItem<T>(itemID: number, itemType: string): T;
  getItems<T>(itemsToGet: string): T[];
  setSelectedProject(projectID: number): void;
  addItem(item: Project | Todo): void;
  deleteItem(itemID: number, itemType: string): void;
  toggleProperty(
    itemID: number,
    itemType: string,
    propertyToToggle: string,
  ): void;
}
/* eslint-disable no-unused-vars */

export interface User {
  name: string;
  email: string;
}
