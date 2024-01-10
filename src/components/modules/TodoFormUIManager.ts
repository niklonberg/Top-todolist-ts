import UIManager from './UIManager';
import createTodoForm from './utils/createTodoForm';
import { FormTemplateObj } from './utils/interfaces';
import TodoFactory from './TodoFactory';

class TodoFormUIManager extends UIManager {
  mainContentSection: HTMLElement;

  constructor() {
    super();
    this.mainContentSection = document.querySelector('#main-content');
    this.mainContentSection.addEventListener('click', (e) => {
      if ((e.target as Element).classList.contains('add-todo-btn'))
        this.addChildTodoForm();
    });
  }

  addChildTodoForm() {
    this.mainContentSection.innerHTML = '';
    const form = createTodoForm();
    form.addEventListener('submit', (e) => this.submitForm(e, form), {
      once: true,
    });
    this.mainContentSection.append(form);
  }

  submitForm(e: Event, form: HTMLFormElement) {
    // e.preventDefault();
    // const formData = new FormData(form);
    // const tempObj: any = {};
    // formData.forEach((value, key) => {
    //   tempObj[key] = value;
    // });
    // const FormTemplateObject: FormTemplateObj = tempObj;
    // const todo = TodoFactory(FormTemplateObject);
    // form.remove();
    // this.TodoManager.addChildTodoToCurrSelectedTodo(todo);
    // reRender whatever was edited
  }
}

export default TodoFormUIManager;
