import { Project, Todo } from './utils/interfaces';

const TodoService = {
  get(project: Project, todoID: number) {
    return project.todos.find((todo: Todo) => todo.todoID === todoID);
  },

  getAll(project: Project) {
    return project.todos;
  },

  add(project: Project, todo: Todo): void {
    project.todos.push(todo);
  },

  // removeTodo(todoID: number): void {
  //   this.todos = this.todos.filter((todo) => todo.todoID !== todoID);
  // },

  // toggleTodoBoolProperty(todoID: number, todoProperty): void {
  //   const targetTodo = this.getTodo(todoID);
  //   targetTodo[todoProperty] = !targetTodo[todoProperty];
  // },

  // toggleSelected(): void {
  //   this.isSelected = !this.isSelected;
  // },
};

export default TodoService;
