import { Project, Todo } from './utils/interfaces';

const TodoService = {
  getTodos(project: Project) {
    return project.todos;
  },

  getTodo(project: Project, todoID: number) {
    return project.todos.find((todo: Todo) => todo.todoID === todoID);
  },

  // addTodo(todo: unknown): void {
  //   this.todos.push(todo);
  // },

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
