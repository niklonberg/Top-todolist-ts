// TODO: set types for methods
const sharedMethods = {
  getTodos() {
    return this.todos;
  },

  getTodo(todoID) {
    return this.todos.find((todo) => todo.todoID === todoID);
  },

  addTodo(todo): void {
    this.todos.push(todo);
  },

  removeTodo(todoID): void {
    this.todos = this.todos.filter((todo) => todo.todoID !== todoID);
  },

  toggleTodoBoolProperty(todoID, todoProperty): void {
    const targetTodo = this.getTodo(todoID);
    targetTodo[todoProperty] = !targetTodo[todoProperty];
  },

  toggleSelected(): void {
    this.isSelected = !this.isSelected;
  },
};

interface Project {
  title: string;
  projectID: number;
  isSelected: boolean;
  todos: object[]; // should be todo object, object seems too vague
}

// if i define a todo interface in TodoFactory, can i use it in this module?
// will this module know of the existance of a todo interface if it doesnt import it?

// what is this object it gets below? It has a string title certainly, anything else?
function ProjectFactory(object: { title: string }): Project {
  let projectIDCounter = 0;

  const project: Project = {
    title: object.title,
    projectID: projectIDCounter,
    isSelected: false,
    todos: [], // should be todo object
  };

  // use object.setPrototypeOf to assign methods to protoype, to avoid duplication
  Object.setPrototypeOf(project, sharedMethods);

  projectIDCounter += 1;
  return project;
}

export default ProjectFactory;
