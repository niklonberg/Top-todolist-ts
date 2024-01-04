import UIManager from './UIManager';
import createListItemFromObject from './utils/createListItemFromObject';
import { TodoManagerInterface } from './utils/interfaces';

class NavbarManager extends UIManager {
  TodoManager: TodoManagerInterface;

  navBar: HTMLElement;

  topLevelTodosList: HTMLUListElement;

  previousProjectSelection: null | HTMLLIElement;

  constructor(TodoManager: TodoManagerInterface) {
    super();
    this.TodoManager = TodoManager;
    this.topLevelTodosList = document.querySelector(
      '#top-level-todos-list',
    ) as HTMLUListElement;
    this.navBar = document.querySelector('#nav-bar') as HTMLElement;
  }

  renderTopLevelTodosList() {
    this.topLevelTodosList.innerHTML = '';
    const topLevelTodos = this.TodoManager.getTopLevelTodos();
    topLevelTodos.forEach((todo) =>
      this.topLevelTodosList.appendChild(
        createListItemFromObject(todo, 'top-level'),
      ),
    );
  }
}

export default NavbarManager;
