import UIManager from './UIManager';
// import createListItemFromObject

class NavbarManager extends UIManager {
  navBar: HTMLElement;

  topLevelTodosList: HTMLUListElement;

  previousProjectSelection: null | HTMLLIElement;

  constructor() {
    super();
    this.topLevelTodosList = document.querySelector(
      '#top-level-todos-list',
    ) as HTMLUListElement;
    this.navBar = document.querySelector('#nav-bar') as HTMLElement;
  }

  renderProjectsList() {
    this.topLevelTodosList.innerHTML = '';
    // const projects = this.ProjectManager.getItems<Project>('projects');
    // projects.forEach((project) =>
    //   this.topLevelTodosList.appendChild(createListItemFromObject<Project>(project)),
    // );
  }
}

export default NavbarManager;
