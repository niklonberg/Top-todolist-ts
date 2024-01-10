import UIManager from './UIManager';

class HeaderManager extends UIManager {
  hideNavBarBtn: HTMLButtonElement;

  toggleThemeBtn: HTMLButtonElement;

  constructor() {
    super();
    this.toggleThemeBtn = document.querySelector('#toggle-theme-btn');
    this.toggleThemeBtn.addEventListener('click', () =>
      this.toggleColorTheme(),
    );
  }

  toggleColorTheme() {
    document.body.classList.toggle('light-theme');
    this.toggleThemeBtn.classList.toggle('dark-bg');
  }
}

export default HeaderManager;
