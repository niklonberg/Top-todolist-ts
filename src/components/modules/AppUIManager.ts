import { ProjectManagerInterface } from './utils/interfaces';

class AppUIManager {
  appContent: HTMLDivElement;

  mainContent: HTMLDivElement;

  projectsList: HTMLUListElement;

  sideBar: HTMLElement;

  hideSideBarBtn: HTMLButtonElement;

  previousProjectSelection: null | HTMLLIElement;

  ProjectManager: ProjectManagerInterface;

  constructor(ProjectManager: ProjectManagerInterface) {
    this.appContent = document.querySelector('#app-content') as HTMLDivElement;
    this.mainContent = document.querySelector(
      '#main-content',
    ) as HTMLDivElement;
    this.projectsList = document.querySelector(
      '#projects-list',
    ) as HTMLUListElement;
    this.sideBar = document.querySelector('#side-bar') as HTMLElement;
    this.hideSideBarBtn = document.querySelector(
      '#hide-sidebar',
    ) as HTMLButtonElement;
    this.previousProjectSelection = null;
    this.ProjectManager = ProjectManager;
  }

  renderProjectsList() {
    this.projectsList.innerHTML = '';
  }
}
