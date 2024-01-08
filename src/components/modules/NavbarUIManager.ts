import UIManager from './UIManager';
import TodoContentUIManager from './TodoContentUIManager';
import { TodoManagerInterface } from './utils/interfaces';

class NavbarManager extends UIManager {
  navBar: HTMLElement;

  previousListSelection: null | HTMLLIElement;

  constructor(
    public TodoManager: TodoManagerInterface,
    public TodoContentUIManager: TodoContentUIManager,
  ) {
    super();
    this.TodoManager = TodoManager;
    this.TodoContentUIManager = TodoContentUIManager;
    this.previousListSelection = null;
    this.navBar = document.querySelector('#nav-bar');
    this.navBar.addEventListener('click', (event) =>
      this.selectNavListItem(event),
    );
  }

  selectNavListItem(event: Event) {
    const navListItem = (event.target as Element).closest(
      'LI',
    ) as HTMLLIElement;

    if (navListItem !== this.previousListSelection && navListItem) {
      this.previousListSelection = navListItem;
      if (navListItem.id === 'all-tasks')
        // this will eventually be a "renderTodoSection()"
        this.TodoContentUIManager.renderTopLevelTodosList();
    }
  }
}

export default NavbarManager;
