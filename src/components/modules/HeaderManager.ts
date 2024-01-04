import UIManager from './UIManager';

class HeaderManager extends UIManager {
  hideSideBarBtn: HTMLButtonElement;

  constructor() {
    super();
    this.hideSideBarBtn = document.querySelector(
      '#hide-sidebar',
    ) as HTMLButtonElement;
  }
}
