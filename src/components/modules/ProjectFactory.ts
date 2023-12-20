import { Todo } from './TodoFactory';
import FormTemplateObj from './utils/FormTemplateObjType';

export interface Project {
  projectID: number;
  title: string;
  isSelected: boolean;
  todos: Todo[];
}

// TODO: set types for all methods
const sharedMethods = {
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

  toggleTodoBoolProperty(todoID: number, todoProperty): void {
    const targetTodo = this.getTodo(todoID);
    targetTodo[todoProperty] = !targetTodo[todoProperty];
  },

  toggleSelected(): void {
    this.isSelected = !this.isSelected;
  },
};

// templateObj is different when it is fed into projectfactory or todofactory
// here it only has a title property

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
