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

export interface User {
  name: string;
  email: string;
}
