interface SharedMethods {
  getTodos(): Todo[];
  getTodo(todoID: number): Todo;
  addTodo(todo: Todo): void;
  removeTodo(todoID: number): void;
  toggleTodoBoolProperty(todoID: number, todoProperty: string): void;
  toggleSelected(): void;
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
