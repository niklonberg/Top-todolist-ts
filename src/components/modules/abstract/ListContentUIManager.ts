import UIManager from './UIManager';
import { DataManagerInterface } from '../utils/interfaces';

abstract class ListContentUIManager extends UIManager {
  containerElement: HTMLElement;

  constructor(
    // private DataManager: DataManagerInterface<T>,
    containerID: string,
  ) {
    super();
    // this.DataManager = DataManager;
    this.containerElement = document.querySelector(`#${containerID}`);
  }
}
