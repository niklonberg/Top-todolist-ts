const AppUIManager = {
  appContent: document.querySelector('#app-content') as HTMLDivElement,
  mainContent: document.querySelector('#main-content') as HTMLDivElement,
  projectsList: document.querySelector('#projects-list') as HTMLUListElement,
  sideBar: document.querySelector('#side-bar') as HTMLElement,
  hideSideBarBtn: document.querySelector('#hide-sidebar') as HTMLButtonElement,
  previousListGroupSelection: null as null | HTMLLIElement,

  renderProjectsList: () => {},
};
