import UIManager from './abstract/UIManager';
import createTodoForm from './utils/createTodoForm';
import {
  Task,
  newTaskFormData,
  TaskManagerInterface,
} from './utils/interfaces';
import TaskFactory from './TaskFactory';

/* 
REFACTOR ME, SIMPLIFY AS MUCH AS POSSIBLE
*/

// think on how this could become a general FormManager
class TodoFormUIManager extends UIManager {
  private form: HTMLFormElement | null;

  insertTodoForm(DataManager: TaskManagerInterface, todoToEdit: Task = null) {
    if (todoToEdit) {
      this.form = createTodoForm(todoToEdit);
    } else {
      this.form = createTodoForm();
    }
    this.form.addEventListener(
      'submit',
      (e) => this.submitForm(e, DataManager, todoToEdit),
      {
        once: true,
      },
    );
    return this.form;
  }

  submitForm(
    e: Event,
    DataManager: TaskManagerInterface,
    todoToEdit: Task | null,
  ) {
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
  }
}

export default TodoFormUIManager;
