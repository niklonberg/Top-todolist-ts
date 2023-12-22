import { Todo } from './TodoFactory';
import FormTemplateObj from './utils/FormTemplateObjType';

interface SharedMethods {
  getTodos(): any;
  getTodo(): any;
  addTodo(todo: Todo): void;
  removeTodo(): any;
  toggleTodoBoolProperty(): any;
  toggleSelected(): any;
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

const projectOne = ProjectFactory({ title: 'MyTitle' });
projectOne.addTodo({
  title: 'Wash floor',
  todoID: 1,
  dueDate: 'No due date',
  isImportant: false,
  isCompleted: false,
});
projectOne.getTodos();

export default ProjectFactory;
