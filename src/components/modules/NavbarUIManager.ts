import UIManager from './UIManager';
import createListItemFromObject from './utils/createListItemFromObject';
import TodoContentUIManager from './TodoContentUIManager';
import { TodoManagerInterface, FormTemplateObj } from './utils/interfaces';
import TodoFormFactory from './utils/TodoFormCreator';
import TodoFactory from './TodoFactory';

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
    // ?below if statement needed when we hide the create new btn?
    if (!this.navBar.querySelector('form')) {
      // abstract into fn?
      const form = TodoFormFactory();
      form.addEventListener('submit', (e) => this.submitForm(e, form), {
        once: true,
      });
      // abstract into fn?
      this.navBar.append(form);
      this.hideElement(this.createTodoBtn);
    }
  }

  // maybe make the contents of this into a utility function
  submitForm(e: Event, form: HTMLFormElement) {
    // abstract into fn?
    e.preventDefault();
    const formData = new FormData(form);
    const tempObj: any = {};
    formData.forEach((value, key) => {
      tempObj[key] = value;
    });
    const FormTemplateObject: FormTemplateObj = tempObj;
    const todo = TodoFactory(FormTemplateObject);
    form.remove();
    // abstract into fn?
    this.TodoManager.addTopLevelTodo(todo);
    this.renderTopLevelTodosList();
    this.showElement(this.createTodoBtn);
  }
}

export default NavbarManager;
