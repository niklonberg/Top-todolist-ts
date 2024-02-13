import UIManager from './abstract/UIManager';
import createTodoForm from './utils/createTodoForm';
import {
  Task,
  newTaskFormData,
  TaskManagerInterface,
} from './utils/interfaces';
import TaskFactory from './TaskFactory';
import TodoContentUIManager from './TodoContentUIManager';

/* 
REFACTOR ME, SIMPLIFY AS MUCH AS POSSIBLE
*/

// think on how this could become a general FormManager
class TodoFormUIManager extends UIManager {
  private form: HTMLFormElement | null;

  insertTodoForm(
    ListUIManager: TodoContentUIManager,
    DataManager: TaskManagerInterface,
    todoToEdit: Task = null,
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

  submitForm(
    e: Event,
    ListUIManager: TodoContentUIManager,
    DataManager: TaskManagerInterface,
    todoToEdit: Task | null,
  ) {
    e.preventDefault();
    const formData = new FormData(this.form);
    const formDataObject: Record<keyof newTaskFormData, string> =
      Object.fromEntries(formData.entries()) as Record<
        keyof newTaskFormData,
        string
      >;
    const newTask = TaskFactory(formDataObject);
    if (todoToEdit) {
      // DataManager.editTask(todoToEdit, newTodo);
    } else {
      DataManager.addTask(newTask);
    }
    ListUIManager.renderTodosSection();
  }
}

export default TodoFormUIManager;
