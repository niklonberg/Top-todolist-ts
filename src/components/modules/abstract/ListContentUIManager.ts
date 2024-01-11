import UIManager from './UIManager';

abstract class ListContentUIManager extends UIManager {
  containerElement: HTMLElement;

  constructor(
    private DataManager: any,
    containerID: string,
  ) {
    super();
    this.DataManager = DataManager;
    this.containerElement = document.querySelector(`#${containerID}`);
  }
}
