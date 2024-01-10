import UIManager from './UIManager';
import createTodoForm from './utils/createTodoForm';
import { FormTemplateObj, TodoManagerInterface } from './utils/interfaces';
import TodoFactory from './TodoFactory';

class TodoFormUIManager extends UIManager {
  mainContentSection: HTMLElement;

  constructor(private TodoManager: TodoManagerInterface) {
    super();
    this.TodoManager = TodoManager;
    this.mainContentSection = document.querySelector('#main-content');
    // can we move eventListener outside?
    this.mainContentSection.addEventListener('click', (e) => {
      if ((e.target as Element).classList.contains('add-todo-btn')) {
        if ((e.target as Element).id === 'add-top-level-todo-btn') {
          this.TodoManager.resetSelectedTodo();
        }
        this.insertTodoForm();
      }
    });
  }

  insertTodoForm() {
    this.mainContentSection.innerHTML = '';
    const form = createTodoForm();
    form.addEventListener('submit', (e) => this.submitForm(e, form), {
      once: true,
    });
    this.mainContentSection.append(form);
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
    this.TodoManager.addTodo(todo);
    // reRender whatever was edited
  }
}

export default TodoFormUIManager;
