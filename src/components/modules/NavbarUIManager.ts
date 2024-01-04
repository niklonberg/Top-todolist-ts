import UIManager from './UIManager';
import createListItemFromObject from './utils/createListItemFromObject';
import TodoContentUIManager from './TodoContentUIManager';
import { TodoManagerInterface } from './utils/interfaces';

class NavbarManager extends UIManager {
  navBar: HTMLElement;

  topLevelTodosList: HTMLUListElement;

  previousListSelection: null | HTMLLIElement;

  constructor(
    public TodoManager: TodoManagerInterface,
    public TodoContentUIManager: TodoContentUIManager,
  ) {
    super();
    this.TodoManager = TodoManager;
    this.TodoContentUIManager = TodoContentUIManager;
    this.topLevelTodosList = document.querySelector('#top-level-todos-list');
    this.navBar = document.querySelector('#nav-bar');
    this.previousListSelection = null;

    this.navBar.addEventListener('click', (event) =>
      this.selectNavListItem(event),
    );
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

  selectNavListItem(event: Event) {
    const navListItem = (event.target as Element).closest(
      'LI',
    ) as HTMLLIElement;

    if (navListItem !== this.previousListSelection && navListItem) {
      this.previousListSelection = navListItem;
      // if navListItem has data.todo attr do below line
      this.TodoManager.setSelectedTodo(Number(navListItem.dataset.todo));
      this.TodoContentUIManager.renderSelectedGroup(navListItem);
    }
  }
}

export default NavbarManager;
