import UIManager from './UIManager';

class HeaderManager extends UIManager {
  hideSideBarBtn: HTMLButtonElement;

  toggleThemeBtn: HTMLButtonElement;

  constructor() {
    super();
    this.hideSideBarBtn = document.querySelector('#hide-sidebar');
    this.toggleThemeBtn = document.querySelector('#toggle-theme');
  }
}

export default HeaderManager;
