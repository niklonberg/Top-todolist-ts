// TODO: set types for methods
const sharedMethods = {
  getTodos() {
    return this.todos;
  },

  getTodo(todoID: number) {
    return this.todos.find((todo) => todo.todoID === todoID);
  },

  addTodo(todo): void {
    this.todos.push(todo);
  },

  removeTodo(todoID: number): void {
    this.todos = this.todos.filter((todo) => todo.todoID !== todoID);
  },

  toggleTodoBoolProperty(todoID: number, todoProperty): void {
    const targetTodo = this.getTodo(todoID);
    targetTodo[todoProperty] = !targetTodo[todoProperty];
  },

  toggleSelected(): void {
    this.isSelected = !this.isSelected;
  },
};

interface Project {
  projectID: number;
  title: string;
  isSelected: boolean;
  todos: object[]; // should be todo object, object seems too vague
}

// if i define a todo interface in TodoFactory, can i use it in this module?
// will this module know of the existance of a todo interface if it doesnt import it?

// templateObj differs when it is fed into projectfactory or todofactory

let projectIDCounter = 0;
function ProjectFactory(templateObj: { title: string }): Project {
  const project: Project = {
    projectID: projectIDCounter,
    title: templateObj.title,
    isSelected: false,
    todos: [], // should be todo objects only allowed inside
  };

  // use object.setPrototypeOf to assign methods to protoype, to avoid duplication
  Object.setPrototypeOf(project, sharedMethods);

  projectIDCounter += 1;
  return project;
}

export default ProjectFactory;
