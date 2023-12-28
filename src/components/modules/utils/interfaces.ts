export interface FormTemplateObj {
  title: string;
  dueDate?: null | Date;
  description?: string;
  isImportant?: boolean;
}

export interface Todo {
  todoID: number;
  title: string;
  dueDate: string | Date;
  isImportant: boolean;
  isCompleted: boolean;
  description?: string;
}

export interface Project {
  projectID: number;
  title: string;
  isSelected: boolean;
  todos: Todo[];
}

/* eslint-disable no-unused-vars */
export interface ProjectManagerInterface {
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
