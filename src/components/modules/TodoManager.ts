import { User, Todo, TodoManagerInterface } from './utils/interfaces';

// refactor TodoManager into an entity that can be duplicated,
// so each user could have an instance of TodoManager to manage their todos

// add documentation to below class like this:
/**
 * Get a specific Todo from the project.
 * @param projects - The project containing the Todos.
 * @param todoID - The ID of the Todo to retrieve.
 * @returns The Todo with the specified ID.
 */
class TodoManager implements TodoManagerInterface {
  // private user: User;

  private topLevelTodos: Todo[];

  currSelectedTodo: null | Todo; // Should we bother with this?
  // could just split addTodo into two functions.

  parentTodo: Todo | null; // we need me?

  constructor() {
    // this.user = user;
    this.topLevelTodos = [];
  }

  /* Get methods */
  getTopLevelTodos(): Todo[] {
    return this.topLevelTodos;
  }

  getTodo(todoID: number, todoArray: Todo[] = this.topLevelTodos): Todo {
    let todoWeAreSearchingFor: Todo = null;
    todoArray.forEach((childTodo) => {
      if (childTodo.todoID === todoID) {
        todoWeAreSearchingFor = childTodo;
        this.parentTodo = null;
      } else {
        const foundTodo = this.getTodo(todoID, childTodo.children);
        if (foundTodo) {
          todoWeAreSearchingFor = foundTodo;
          this.parentTodo = childTodo;
          console.log('parent todo is: ', this.parentTodo);
          console.log('todo we searched for is: ', todoWeAreSearchingFor);
        }
      }
    });

    return todoWeAreSearchingFor;
  }

  /* Edit methods */

  editTodo(
    todoToEdit: Todo,
    newTodo: Todo,
    todoArray: Todo[] = this.topLevelTodos,
  ) {
    const foundTodo = todoArray.find(
      (currTodo) => currTodo.todoID === todoToEdit.todoID,
    );
    if (foundTodo) {
      Object.assign(foundTodo, { ...newTodo, children: foundTodo.children });
    } else {
      todoArray.forEach((childTodo) =>
        this.editTodo(todoToEdit, newTodo, childTodo.children),
      );
    }
  }

  /* Set methods */
  setSelectedTodo(todoID: number): void {
    console.log('todoID is: ', todoID);
    this.currSelectedTodo = this.getTodo(todoID);
    console.log('curr selected todo: ', this.currSelectedTodo);
  }

  resetSelectedTodo(): void {
    this.currSelectedTodo = null;
  }

  /* Add methods */
  addTodo(todo: Todo): void {
    if (this.currSelectedTodo) {
      this.currSelectedTodo.children.push(todo);
    } else {
      this.topLevelTodos.push(todo);
    }
    console.log(this.topLevelTodos);
  }

  /* Delete methods */
  deleteTopLevelTodo(todoID: number): void {
    this.topLevelTodos = this.topLevelTodos.filter(
      (todo) => todo.todoID !== todoID,
    );
  }

  deleteChildTodo(todoID: number): void {
    const todo = this.getTodo(todoID);
    console.log('todo to delete: ', todo);
    this.parentTodo.children = this.parentTodo.children.filter(
      (childTodo) => childTodo !== todo,
    );
  }

  // toggleProperty() {}
}

export default TodoManager;
