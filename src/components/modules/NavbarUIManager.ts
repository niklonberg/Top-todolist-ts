import UIManager from './UIManager';
import TodoContentUIManager from './TodoContentUIManager';

class NavbarManager extends UIManager {
  navBar: HTMLElement;

  previousListSelection: null | HTMLLIElement;

  constructor(public todoContentUIManager: TodoContentUIManager) {
    super();
    this.todoContentUIManager = todoContentUIManager;
    this.previousListSelection = null;
    this.navBar = document.querySelector('#nav-bar');
    this.navBar.addEventListener('click', (e) => this.selectNavListItem(e));
  }

  selectNavListItem(e: Event) {
    const navListItem = (e.target as Element).closest('LI') as HTMLLIElement;

    if (navListItem !== this.previousListSelection && navListItem) {
      this.previousListSelection = navListItem;
      if (navListItem.id === 'all-tasks')
        this.todoContentUIManager.renderTodosSection();
    }
  }
}

export default NavbarManager;
