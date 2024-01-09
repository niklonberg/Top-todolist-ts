import UIManager from './UIManager';
import TodoContentUIManager from './TodoContentUIManager';

class NavbarManager extends UIManager {
  navBar: HTMLElement;

  previousListSelection: null | HTMLLIElement;

  constructor(public TodoContentUIManager: TodoContentUIManager) {
    super();
    this.TodoContentUIManager = TodoContentUIManager;
    this.previousListSelection = null;
    this.navBar = document.querySelector('#nav-bar');
    this.navBar.addEventListener('click', (e) => this.selectNavListItem(e));
  }

  selectNavListItem(e: Event) {
    const navListItem = (e.target as Element).closest('LI') as HTMLLIElement;

    if (navListItem !== this.previousListSelection && navListItem) {
      this.previousListSelection = navListItem;
      if (navListItem.id === 'all-tasks')
        // this will eventually be a "renderTodoSection()"
        this.TodoContentUIManager.renderTasksSection();
    }
  }
}

export default NavbarManager;
