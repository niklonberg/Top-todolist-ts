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

    if (navListItem !== this.previousListSelection && navListItem) {
      this.navBar
        .querySelectorAll('li')
        .forEach((li) => li.classList.remove('selected-nav-item'));
      navListItem.classList.add('selected-nav-item');
      this.previousListSelection = navListItem;
      if (navListItem.id === 'all-tasks')
        this.todoContentUIManager.renderTodosSection();

      if (navListItem.id === 'today-tasks') {
        // this.todoContentUIManager.renderTodayTasks();
      }

      if (navListItem.id === 'week-tasks') {
        // this.todoContentUIManager.renderNext7DaysTasks();
      }
    }
  }
}

export default HeaderNavbarUIManager;
