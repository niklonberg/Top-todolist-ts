import { User, Todo, TodoManagerInterface } from './utils/interfaces';
import TodoService from './TodoService';

// should i be storing TodoService inside the class instead?

// refactor ProjectManager into an entity that can be duplicated,
// so each user could have an instance of ProjectManager to manage their projects & todos
class TodoManager implements TodoManagerInterface {
  // private user: User;

  private topLevelTodos: Todo[];

  currSelectedTodo: Todo;

  constructor() {
    // this.user = user;
    this.topLevelTodos = [];
  }

  /* Get methods */
  getTopLevelTodo(todoID: number): Todo {
    return this.topLevelTodos.find((todo) => todo.todoID === todoID);
  }

  getTodo(todoArray: Todo[], todoID: number): Todo {
    let todoWeAreSearchingFor: Todo = null;
    todoArray.forEach((childTodo) => {
      if (childTodo.todoID === todoID) {
        todoWeAreSearchingFor = childTodo;
      } else {
        const foundTodo = this.getTodo(childTodo.children, todoID);
        if (foundTodo) {
          todoWeAreSearchingFor = foundTodo;
        }
      }
    });

    return todoWeAreSearchingFor;
  }

  /* Set methods */
  setSelectedTodo(todoID: number): void {
    this.currSelectedTodo = this.getTodo(this.topLevelTodos, todoID);
    console.log('curr selected todo: ', this.currSelectedTodo);
  }

  /* Add methods */
  addTopLevelTodo(item: Todo): void {
    this.topLevelTodos.push(item);
  }

  addChildTodoToCurrSelectedTodo(item: Todo): void {
    this.currSelectedTodo.children.push(item);
  }

  /* Delete methods */
  // deleteItem(itemID: number, itemType: string): void {
  //   if (itemType === 'project') {
  //     this.projects = this.projects.filter(
  //       (project) => project.projectID !== itemID,
  //     );
  //   } else {
  //     TodoService.delete(this.projects, itemID);
  //   }
  // }

  /* Edit methods */
  // toggleProperty(
  //   itemID: number,
  //   itemType: string,
  //   propertyToToggle: string,
  // ): void {
  //   if (itemType === 'project') {
  //     const project = this.getItem<Project>(itemID, itemType);
  //     console.log('toggle some property');
  //   } else {
  //     TodoService.toggleTodoBoolProperty(
  //       this.projects,
  //       propertyToToggle,
  //       itemID,
  //     );
  //   }
  // }
}

export default TodoManager;

// getItems<T>(itemsToGet: string): T[] {
//   if (itemsToGet === 'projects') {
//     return this.projects as T[];
//   }
//   if (itemsToGet === 'todos') {
//     return TodoService.getAll(this.currSelectedProject) as T[];
//   }
//   if (itemsToGet === 'allTodos') {
//     return this.projects.flatMap((project) =>
//       TodoService.getAll(project),
//     ) as T[];
//   }
//   throw new Error('Invalid items to get');
// }

// getProjectFromTodoID(todoID: number): Project {
//   return this.projects.find((project) => TodoService.get(project, todoID));
// }
