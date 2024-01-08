import UIManager from './UIManager';
import TodoFormFactory from './utils/TodoFormCreator';
import createListItemFromObject from './utils/createListItemFromObject';
import { TodoManagerInterface, FormTemplateObj } from './utils/interfaces';
import TodoFactory from './TodoFactory';

class TodoContentUIManager extends UIManager {
  mainContentSection: HTMLElement;

  topLevelTodosList: HTMLUListElement;

  selectedTodoGrouping: HTMLUListElement;

  createChildTodoBtn: HTMLButtonElement;

  constructor(public TodoManager: TodoManagerInterface) {
    super();
    this.TodoManager = TodoManager;
    this.mainContentSection = document.querySelector('#main-content');
    this.topLevelTodosList = document.querySelector('#top-level-todos-list');
    this.selectedTodoGrouping = document.querySelector('#selected-grouping');
    this.createChildTodoBtn = document.querySelector('#create-child-todo');
    this.createChildTodoBtn.addEventListener('click', () =>
      this.addChildTodoForm(),
    );
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

  /* revisit me. how can we reRender selected group when
  we add a new childTodo?? */
  renderSelectedGroup(navListItem: HTMLLIElement) {}

  addChildTodoForm() {
    if (!this.mainContentSection.querySelector('form')) {
      const form = TodoFormFactory();
      form.addEventListener('submit', (e) => this.submitForm(e, form), {
        once: true,
      });

      this.mainContentSection.append(form);
      this.hideElement(this.createChildTodoBtn);
    }
  }

  submitForm(e: Event, form: HTMLFormElement) {
    e.preventDefault();
    const formData = new FormData(form);
    const tempObj: any = {};
    formData.forEach((value, key) => {
      tempObj[key] = value;
    });
    const FormTemplateObject: FormTemplateObj = tempObj;
    const todo = TodoFactory(FormTemplateObject);
    form.remove();

    this.TodoManager.addChildTodoToCurrSelectedTodo(todo);
    // this.renderSelectedGroup()
    this.showElement(this.createChildTodoBtn);
  }
}

export default TodoContentUIManager;

/* 
renderSelectedGroup(navListItem: HTMLLIElement) {
    this.selectedTodoGrouping.innerHTML = '';
    const todoParentTitle = this.createElement<HTMLHeadingElement>('H1');
    todoParentTitle.textContent =
      navListItem.querySelector('.list-item-title').textContent;
    this.selectedTodoGrouping.append(todoParentTitle);

    if (navListItem.id === 'all-tasks') {
    }

    if (navListItem.id === 'today-tasks') {
    }

    if (navListItem.id === 'week-tasks') {
    }

    if (navListItem.id === 'urgent-tasks') {
    }

    if (navListItem.dataset.todo) {
      const todoToRender = this.TodoManager.getTodo(
        Number(navListItem.dataset.todo),
        this.TodoManager.getTopLevelTodos(),
      );

      todoToRender.children.forEach((childTodo) => {
        this.selectedTodoGrouping.append(
          createListItemFromObject(childTodo, 'todo-list'),
        );
      });
    }

    this.showElement(this.createChildTodoBtn);
  }
   */
