const TodoService = {
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
