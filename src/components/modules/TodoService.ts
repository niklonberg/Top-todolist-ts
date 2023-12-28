import { Project, Todo } from './utils/interfaces';

const TodoService = {
  /**
   * Get a specific Todo from the project.
   * @param projects - The project containing the Todos.
   * @param todoID - The ID of the Todo to retrieve.
   * @returns The Todo with the specified ID.
   */
  get(projects: Project[], todoID: number): Todo {
    return projects
      .flatMap((project) => project.todos)
      .find((todo) => todo.todoID === todoID);
  },

  /**
   * Returns all Todos from the project
   * @param project - The project from which to get all todos
   * @returns An array of Todos
   */
  getAll(project: Project): Todo[] {
    return project.todos;
  },

  add(project: Project, todo: Todo): void {
    project.todos.push(todo);
  },

  delete(projects: Project[], todoID: number): void {
    for (let i = 0; i < projects.length; i += 1) {
      const project = projects[i];
      for (let j = 0; j < project.todos.length; j += 1) {
        const todo = project.todos[j];
        if (todo.todoID === todoID) {
          project.todos.splice(j, 1);
          j -= 1;
        }
      }
    }
  },

  // toggleTodoBoolProperty(todoID: number, todoProperty): void {
  //   const targetTodo = this.getTodo(todoID);
  //   targetTodo[todoProperty] = !targetTodo[todoProperty];
  // },

  // toggleSelected(): void {
  //   this.isSelected = !this.isSelected;
  // },
};

export default TodoService;
