import UIManager from './UIManager';

class HeaderManager extends UIManager {
  hideNavBarBtn: HTMLButtonElement;

  toggleThemeBtn: HTMLButtonElement;

  constructor() {
    super();
    /* this.hideNavBarBtn = document.querySelector('#hide-navbar');
    this.hideNavBarBtn.addEventListener('click', this.toggleSidebarVisibility); */
    this.toggleThemeBtn = document.querySelector('#toggle-theme-btn');
    this.toggleThemeBtn.addEventListener('click', () =>
      this.toggleColorTheme(),
    );
  }

  toggleSidebarVisibility() {
    // this.
  }

  toggleColorTheme() {
    console.log('i ran');
    document.body.classList.toggle('light-theme');
    this.toggleThemeBtn.classList.toggle('dark-bg');
  }
}

export default HeaderManager;
