import { isToday, addDays, isWithinInterval } from 'date-fns';
import {
  Task,
  TodoManagerInterface,
  TodoListItemWithDataset,
} from './utils/interfaces';

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

  private topLevelTodos: Task[];

  currSelectedTask: null | Task; // Should we bother with this?
  // could just split addTodo into two functions.

  parentTask: Task | null; // we need me?

  constructor(tasksFromDB: Task[]) {
    // this.user = user;
    this.topLevelTodos = tasksFromDB;
    console.log(this.topLevelTodos);
  }

  /* Get methods */
  getTopLevelTasks(): Task[] {
    return this.topLevelTodos;
  }

  // getTask(taskID: number, tasks: Task[] = this.topLevelTodos): Task {
  // let todoWeAreSearchingFor: Task = null;
  // todoArray.forEach((childTodo) => {
  //   if (childTodo.todoID === todoID) {
  //     todoWeAreSearchingFor = childTodo;
  //     this.parentTodo = null;
  //   } else {
  //     const foundTodo = this.getTodo(todoID, childTodo.children);
  //     if (foundTodo) {
  //       todoWeAreSearchingFor = foundTodo;
  //       this.parentTodo = childTodo;
  //       console.log('parent todo is: ', this.parentTodo);
  //       console.log('todo we searched for is: ', todoWeAreSearchingFor);
  //     }
  //   }
  // });
  // return todoWeAreSearchingFor;
  // }

  // getTodayTasks(): Task[] {
  //   const todos = this.getTopLevelTasks();
  //   return todos.reduce(
  //     (acc, curr) => [
  //       ...acc,
  //       ...curr.children.filter((childTodo) => isToday(childTodo.dueDate)),
  //     ],
  //     [],
  //   );
  // }

  // getNext7DaysTasks() {
  //   const todos = this.getTopLevelTasks();
  //   const today = new Date();
  //   today.setHours(0, 0, 0);
  //   const sevenDaysLater = addDays(today, 7);
  //   return todos.reduce(
  //     (acc, curr) => [
  //       ...acc,
  //       ...curr.children.filter((childTodo) =>
  //         isWithinInterval(childTodo.dueDate, {
  //           start: today,
  //           end: sevenDaysLater,
  //         }),
  //       ),
  //     ],
  //     [],
  //   );
  // }

  // /* Edit methods */
  // editTodo(
  //   todoToEdit: Task,
  //   newTodo: Task,
  //   todoArray: Task[] = this.topLevelTodos,
  // ): void {
  //   const foundTodo = todoArray.find(
  //     (currTodo) => currTodo.todoID === todoToEdit.todoID,
  //   );
  //   if (foundTodo) {
  //     Object.assign(foundTodo, { ...newTodo, children: foundTodo.children });
  //   } else {
  //     todoArray.forEach((childTodo) =>
  //       this.editTodo(todoToEdit, newTodo, childTodo.children),
  //     );
  //   }
  // }

  // toggleIsCompleted(todoID: number): Task {
  //   const todo = this.getTodo(todoID);
  //   todo.isCompleted = !todo.isCompleted;
  //   console.log('Todo complete: ', todo.isCompleted);
  //   this.toggleCompletedDate(todo);
  //   if (this.parentTodo.children.every((childTodo) => childTodo.isCompleted)) {
  //     // toggle parent complete
  //   }
  //   return todo;
  // }

  // /* eslint-disable no-param-reassign, class-methods-use-this */
  // toggleCompletedDate(todo: Task): void {
  //   if (!todo.dateCompleted) {
  //     todo.dateCompleted = new Date();
  //   } else {
  //     todo.dateCompleted = null;
  //   }
  //   console.log(todo.dateCompleted);
  // }
  // /* eslint-enable no-param-reassign */

  // reorderTodo(
  //   indexToReorderTodoTo: number,
  //   todoItem: TodoListItemWithDataset,
  // ): void {
  //   const todoToReorder = this.getTodo(Number(todoItem.dataset.todo));
  //   this.topLevelTodos = this.topLevelTodos.filter(
  //     (todo) => todo.todoID !== todoToReorder.todoID,
  //   );
  //   this.topLevelTodos.splice(indexToReorderTodoTo, 0, todoToReorder);

  //   setTimeout(
  //     () => console.log('Toplevel Todos after: ', this.topLevelTodos),
  //     0,
  //   );
  // }

  // /* Set methods */
  // setSelectedTodo(todoID: number): void {
  //   console.log('todoID is: ', todoID);
  //   this.currSelectedTodo = this.getTodo(todoID);
  //   console.log('curr selected todo: ', this.currSelectedTodo);
  // }

  // resetSelectedTodo(): void {
  //   this.currSelectedTodo = null;
  // }

  // /* Add methods */
  // addTodo(todo: Task): void {
  //   if (this.currSelectedTodo) {
  //     this.currSelectedTodo.children.push(todo);
  //   } else {
  //     this.topLevelTodos.push(todo);
  //   }
  //   console.log(this.topLevelTodos);
  // }

  // /* Delete methods */
  // deleteTopLevelTodo(todoID: number): void {
  //   this.topLevelTodos = this.topLevelTodos.filter(
  //     (todo) => todo.todoID !== todoID,
  //   );
  // }

  // deleteChildTodo(todoID: number): void {
  //   const todo = this.getTodo(todoID);
  //   console.log('todo to delete: ', todo);
  //   this.parentTodo.children = this.parentTodo.children.filter(
  //     (childTodo) => childTodo !== todo,
  //   );
  // }
}

export default TodoManager;
