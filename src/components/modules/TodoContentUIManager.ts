import UIManager from './UIManager';
import createListItemFromObject from './utils/createListItemFromObject';
import { TodoManagerInterface } from './utils/interfaces';

class TodoContentUIManager extends UIManager {
  TodoManager: TodoManagerInterface;

  todoContentSection: HTMLElement;

  selectedTodoGrouping: HTMLUListElement;

  constructor(TodoManager: TodoManagerInterface) {
    super();
    this.TodoManager = TodoManager;
    this.todoContentSection = document.querySelector('#todo-content');
    this.selectedTodoGrouping = document.querySelector('#selected-grouping');
  }

  renderSelectedGroup() {
    this.selectedTodoGrouping.innerHTML = '';
  }
}

export default TodoContentUIManager;
