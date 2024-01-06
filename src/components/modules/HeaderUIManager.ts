import UIManager from './UIManager';

class HeaderManager extends UIManager {
  hideNavBarBtn: HTMLButtonElement;

  toggleThemeBtn: HTMLButtonElement;

  constructor() {
    super();
    this.hideNavBarBtn = document.querySelector('#hide-navbar');
    this.hideNavBarBtn.addEventListener('click', this.toggleSidebarVisibility);
    this.toggleThemeBtn = document.querySelector('#toggle-theme');
  }

  toggleSidebarVisibility() {
    // this.
  }
}

export default HeaderManager;
