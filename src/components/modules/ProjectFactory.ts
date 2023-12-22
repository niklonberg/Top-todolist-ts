import { Todo } from './TodoFactory';
import FormTemplateObj from './utils/FormTemplateObjType';

/* eslint-disable */ //eslint complains about unused variables, hence the eslint-disable
interface SharedMethods {
  getTodos(): Todo[];
  getTodo(todoID: number): Todo;
  addTodo(todo: Todo): void;
  removeTodo(todoID: number): void;
  toggleTodoBoolProperty(todoID: number, todoProperty: string): void;
  toggleSelected(): void;
}

export interface Project extends SharedMethods {
  projectID: number;
  title: string;
  isSelected: boolean;
  todos: Todo[];
}

const sharedMethods: SharedMethods = {
  getTodos() {
    return this.todos;
  },

  getTodo(todoID: number) {
    return this.todos.find((todo: Todo) => todo.todoID === todoID);
  },

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  },

  removeTodo(todoID: number): void {
    this.todos = this.todos.filter((todo: Todo) => todo.todoID !== todoID);
  },

  toggleTodoBoolProperty(todoID: number, todoProperty: string): void {
    const targetTodo = this.getTodo(todoID);
    targetTodo[todoProperty] = !targetTodo[todoProperty];
  },

  toggleSelected(): void {
    this.isSelected = !this.isSelected;
  },
};

let projectIDCounter: number = 0;
function ProjectFactory(templateObj: FormTemplateObj): Project {
  const project: Project = {
    projectID: projectIDCounter,
    title: templateObj.title,
    isSelected: false,
    todos: [],
  };

  // use object.setPrototypeOf to assign methods to protoype, to avoid duplication
  Object.setPrototypeOf(project, sharedMethods);

  projectIDCounter += 1;
  return project;
}

export default ProjectFactory;
