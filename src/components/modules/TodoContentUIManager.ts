import UIManager from './UIManager';
import TodoFormFactory from './utils/TodoFormCreator';
import createListItemFromObject from './utils/createListItemFromObject';
import { TodoManagerInterface, FormTemplateObj } from './utils/interfaces';
import TodoFactory from './TodoFactory';

class TodoContentUIManager extends UIManager {
  todoContentSection: HTMLElement;

  selectedTodoGrouping: HTMLUListElement;

  createChildTodoBtn: HTMLButtonElement;

  constructor(public TodoManager: TodoManagerInterface) {
    super();
    this.TodoManager = TodoManager;
    this.todoContentSection = document.querySelector('#todo-content');
    this.selectedTodoGrouping = document.querySelector('#selected-grouping');
    this.createChildTodoBtn = document.querySelector('#create-child-todo');
    this.createChildTodoBtn.addEventListener('click', () =>
      this.addChildTodoForm(),
    );
  }

  /* revisit me. how can we reRender selected group when
  we add a new childTodo?? */
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

  addChildTodoForm() {
    if (!this.todoContentSection.querySelector('form')) {
      // abstract into fn?
      const form = TodoFormFactory();
      form.addEventListener('submit', (e) => this.submitForm(e, form), {
        once: true,
      });
      // abstract into fn?
      this.todoContentSection.append(form);
      this.hideElement(this.createChildTodoBtn);
    }
  }

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
    this.TodoManager.addChildTodoToCurrSelectedTodo(todo);
    // this.renderSelectedGroup()
    this.showElement(this.createChildTodoBtn);
  }
}

export default TodoContentUIManager;
