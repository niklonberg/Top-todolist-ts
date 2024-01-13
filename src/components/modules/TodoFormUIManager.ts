import UIManager from './abstract/UIManager';
import createTodoForm from './utils/createTodoForm';
import { FormTemplateObj, Todo } from './utils/interfaces';
import TodoFactory from './TodoFactory';

// think on how this could become a general FormManager
class TodoFormUIManager extends UIManager {
  constructor() {
    super();
  }

  insertTodoForm(todoToEdit: Todo = null) {
    let form: HTMLFormElement;
    if (todoToEdit) {
      form = createTodoForm(todoToEdit);
    } else {
      form = createTodoForm();
    }
    form.addEventListener(
      'submit',
      (e) => this.submitForm(e, form, todoToEdit),
      {
        once: true,
      },
    );
    return form;
  }

  submitForm(e: Event, form: HTMLFormElement, todoToEdit: Todo | null) {
    // e.preventDefault();
    // const formData = new FormData(form);
    // const tempObj: any = {};
    // formData.forEach((value, key) => {
    //   tempObj[key] = value;
    // });
    // const FormTemplateObject: FormTemplateObj = tempObj;
    // const newTodo = TodoFactory(FormTemplateObject);
    // form.remove();
    // if (todoToEdit) {
    //   this.TodoManager.editTodo(todoToEdit, newTodo);
    // } else {
    //   this.TodoManager.addTodo(newTodo);
    // }
    // this.ListUIManager.renderTodosSection();
  }
}

export default TodoFormUIManager;
