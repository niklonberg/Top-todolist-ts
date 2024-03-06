import UIManager from './abstract/UIManager';
import TaskUIManager from './TaskUIManager';

class HeaderNavbarUIManager extends UIManager {
  navBar: HTMLElement;

  // previousListSelection: null | HTMLLIElement;

  toggleThemeBtn: HTMLButtonElement;

  constructor(public taskUIManager: TaskUIManager) {
    super();
    this.taskUIManager = taskUIManager;
    // this.previousListSelection = null;
    this.navBar = document.querySelector('#nav-bar');
    this.navBar.addEventListener('click', (e) => this.selectNavListItem(e));
    this.toggleThemeBtn = document.querySelector('#toggle-theme-btn');
    this.toggleThemeBtn.addEventListener('click', () =>
      this.toggleColorTheme(),
    );
  }

  toggleColorTheme() {
    document.body.classList.toggle('light-theme');
    this.toggleThemeBtn.classList.toggle('dark-fill');
  }

  selectNavListItem(e: Event) {
    const navListItem = (e.target as Element).closest('LI') as HTMLLIElement;

    if (navListItem) {
      this.navBar
        .querySelectorAll('li')
        .forEach((li) => li.classList.remove('selected-nav-item'));
      navListItem.classList.add('selected-nav-item');
      // this.previousListSelection = navListItem;

      const currentView = navListItem.id;
      localStorage.setItem('currentView', currentView);
      this.taskUIManager.renderCurrentView();
    }
  }
}

export default HeaderNavbarUIManager;
