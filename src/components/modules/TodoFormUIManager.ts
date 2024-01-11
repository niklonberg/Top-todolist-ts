import UIManager from './abstract/UIManager';
import createTodoForm from './utils/createTodoForm';
import TodoContentUIManager from './TodoContentUIManager';
import { FormTemplateObj, TodoManagerInterface } from './utils/interfaces';
import TodoFactory from './TodoFactory';

// think on how this could become a general FormManager
class TodoFormUIManager extends UIManager {
  mainContentSection: HTMLElement;

  constructor(
    private TodoManager: TodoManagerInterface,
    private ListUIManager: TodoContentUIManager,
  ) {
    super();
    this.TodoManager = TodoManager;
    this.ListUIManager = ListUIManager;
    this.mainContentSection = document.querySelector('#main-content');
    this.mainContentSection.addEventListener('click', (e) => {
      if ((e.target as Element).classList.contains('add-todo-btn')) {
        if ((e.target as Element).id === 'add-top-level-todo-btn') {
          this.TodoManager.resetSelectedTodo();
        }
        this.insertTodoForm();
      }

      if ((e.target as Element).classList.contains('edit-item')) {
        this.insertTodoForm(true);
      }

      if ((e.target as Element).classList.contains('cancel-form-btn')) {
        this.ListUIManager.renderTodosSection();
      }
    });
  }

  insertTodoForm(isEditAction: boolean = false) {
    this.mainContentSection.innerHTML = '';
    const form = createTodoForm();
    form.addEventListener(
      'submit',
      (e) => this.submitForm(e, form, isEditAction),
      {
        once: true,
      },
    );
    this.mainContentSection.append(form);
  }

  submitForm(e: Event, form: HTMLFormElement, isEditAction: boolean) {
    e.preventDefault();
    const formData = new FormData(form);
    const tempObj: any = {};
    formData.forEach((value, key) => {
      tempObj[key] = value;
    });
    const FormTemplateObject: FormTemplateObj = tempObj;
    const todo = TodoFactory(FormTemplateObject);
    form.remove();
    if (isEditAction) {
      this.TodoManager.editTodo(todo);
    } else {
      this.TodoManager.addTodo(todo);
    }

    this.ListUIManager.renderTodosSection();
  }
}

export default TodoFormUIManager;
