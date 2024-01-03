// import createElement from './utils/createElement';

class UIManager {
  // createElement;

  // constructor() {
  // this.createElement = createElement;
  // }

  static createElement<T extends HTMLElement>(
    type: string = 'div',
    classname: string = '',
    id: string = '',
  ) {
    const ele = document.createElement(type) as T;
    if (classname) ele.classList.add(classname);
    if (id) ele.setAttribute('id', id);
    return ele;
  }
}

export default UIManager;

//   appContent: HTMLDivElement;
//   mainContent: HTMLDivElement;

//   hideSideBarBtn: HTMLButtonElement;
//   ProjectManager: ProjectManagerInterface;
//   constructor(ProjectManager: ProjectManagerInterface) {
//     this.appContent = document.querySelector('#app-content') as HTMLDivElement;
//     this.mainContent = document.querySelector(
//       '#main-content',
//     ) as HTMLDivElement;

//     this.hideSideBarBtn = document.querySelector(
//       '#hide-sidebar',
//     ) as HTMLButtonElement;
//     this.previousProjectSelection = null;
//     this.ProjectManager = ProjectManager;
//   }
//   renderSelectedGroup() {
//     this.mainContent.innerHTML = '';
//   }
