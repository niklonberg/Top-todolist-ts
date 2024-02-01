import UIManager from './abstract/UIManager';
import createTodoForm from './utils/createTodoForm';
import {
  FormTemplateObj,
  Todo,
  TodoManagerInterface,
} from './utils/interfaces';
import TodoFactory from './TodoFactory';
import TodoContentUIManager from './TodoContentUIManager';

/* 
Remove any use of Todo and TodoFactory. This must 
just send formdata to backend, which will use todofactory 
REFACTOR ME, SIMPLIFY AS MUCH AS POSSIBLE
*/

// think on how this could become a general FormManager
class TodoFormUIManager extends UIManager {
  private form: HTMLFormElement | null;

  insertTodoForm(
    ListUIManager: TodoContentUIManager,
    DataManager: TodoManagerInterface,
    todoToEdit: Todo = null,
  ) {
    if (todoToEdit) {
      this.form = createTodoForm(todoToEdit);
    } else {
      this.form = createTodoForm();
    }
    this.form.addEventListener(
      'submit',
      (e) => this.submitForm(e, ListUIManager, DataManager, todoToEdit),
      {
        once: true,
      },
    );
    return this.form;
  }

  // needs either post or put method, depending on todoToEdit
  submitForm(
    e: Event,
    ListUIManager: TodoContentUIManager,
    DataManager: TodoManagerInterface,
    todoToEdit: Todo | null,
  ) {
    e.preventDefault();
    const formData = new FormData(this.form);
    const tempObj: any = {};
    formData.forEach((value, key) => {
      if (key === 'dueDate') {
        tempObj[key] = new Date(value as string);
      }
      tempObj[key] = value;
    });
    const FormTemplateObject: FormTemplateObj = tempObj;
    const newTodo = TodoFactory(FormTemplateObject);
    // this.form = null;
    if (todoToEdit) {
      DataManager.editTodo(todoToEdit, newTodo);
    } else {
      DataManager.addTodo(newTodo);
    }
    ListUIManager.renderTodosSection();
  }
}

export default TodoFormUIManager;
