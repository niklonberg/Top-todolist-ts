import UIManager from './abstract/UIManager';
import TodoContentUIManager from './TodoContentUIManager';

class HeaderNavbarUIManager extends UIManager {
  navBar: HTMLElement;

  previousListSelection: null | HTMLLIElement;

  toggleThemeBtn: HTMLButtonElement;

  constructor(public todoContentUIManager: TodoContentUIManager) {
    super();
    this.todoContentUIManager = todoContentUIManager;
    this.previousListSelection = null;
    this.navBar = document.querySelector('#nav-bar');
    this.navBar.addEventListener('click', (e) => this.selectNavListItem(e));
    this.toggleThemeBtn = document.querySelector('#toggle-theme-btn');
    this.toggleThemeBtn.addEventListener('click', () =>
      this.toggleColorTheme(),
    );
  }

  toggleColorTheme() {
    document.body.classList.toggle('light-theme');
    this.toggleThemeBtn.classList.toggle('dark-bg');
  }

  selectNavListItem(e: Event) {
    const navListItem = (e.target as Element).closest('LI') as HTMLLIElement;

    // smarter way to do this?
    if (navListItem !== this.previousListSelection && navListItem) {
      this.previousListSelection = navListItem;
      if (navListItem.id === 'all-tasks')
        // can we maybe query the dom instead and if the element this works
        // with already exists, dont run the following? or the opposite
        this.todoContentUIManager.renderTodosSection();
    }
  }
}

export default HeaderNavbarUIManager;
