import UIManager from './UIManager';
import createListItemFromObject from './utils/createListItemFromObject';
import TodoContentUIManager from './TodoContentUIManager';
import { TodoManagerInterface } from './utils/interfaces';
import TodoFormFactory from './utils/TodoFormCreator';

class NavbarManager extends UIManager {
  navBar: HTMLElement;

  topLevelTodosList: HTMLUListElement;

  previousListSelection: null | HTMLLIElement;

  createTodoBtn: HTMLButtonElement;

  constructor(
    public TodoManager: TodoManagerInterface,
    public TodoContentUIManager: TodoContentUIManager,
  ) {
    super();
    this.TodoManager = TodoManager;
    this.TodoContentUIManager = TodoContentUIManager;
    this.previousListSelection = null;
    this.topLevelTodosList = document.querySelector('#top-level-todos-list');
    this.navBar = document.querySelector('#nav-bar');
    this.navBar.addEventListener('click', (event) =>
      this.selectNavListItem(event),
    );
    this.createTodoBtn = document.querySelector('#create-todo');
    this.createTodoBtn.addEventListener('click', () => {
      console.log('iran');
      this.addParentTodoForm();
    });
  }

  renderTopLevelTodosList() {
    this.topLevelTodosList.innerHTML = '';
    const topLevelTodos = this.TodoManager.getTopLevelTodos();
    topLevelTodos.forEach((todo) =>
      this.topLevelTodosList.appendChild(
        createListItemFromObject(todo, 'top-level'),
      ),
    );
  }

  selectNavListItem(event: Event) {
    const navListItem = (event.target as Element).closest(
      'LI',
    ) as HTMLLIElement;

    if (navListItem !== this.previousListSelection && navListItem) {
      this.previousListSelection = navListItem;
      // if navListItem has data.todo attr do below line
      this.TodoManager.setSelectedTodo(Number(navListItem.dataset.todo));
      this.TodoContentUIManager.renderSelectedGroup(navListItem);
    }
  }

  addParentTodoForm() {
    if (!this.topLevelTodosList.querySelector('form')) {
      const form = this.createElement<HTMLFormElement>('form', 'todo-form');
      form.innerHTML = TodoFormFactory();
      this.topLevelTodosList.append(form);
    }
  }
}

export default NavbarManager;
