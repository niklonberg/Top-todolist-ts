const AppUIManager = {
  appContent: document.querySelector('#app-content') as HTMLElement | null,
  mainContent: document.querySelector('#main-content') as HTMLElement | null,
  projectsList: document.querySelector('#projects-list') as HTMLElement | null,
  sideBar: document.querySelector('#side-bar') as HTMLElement | null,
  hideSideBarBtn: document.querySelector('#hide-sidebar') as HTMLElement | null,
  previousListGroupSelection: null as null | HTMLElement,
};
