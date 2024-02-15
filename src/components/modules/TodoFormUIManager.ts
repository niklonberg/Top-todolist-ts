import UIManager from './abstract/UIManager';
import createTodoForm from './utils/createTodoForm';
import {
  Task,
  newTaskFormData,
  TaskManagerInterface,
} from './utils/interfaces';
import TaskFactory from './TaskFactory';

class TodoFormUIManager extends UIManager {
  private form: HTMLFormElement | null;

  insertTaskForm(DataManager: TaskManagerInterface, taskToEdit: Task = null) {
    if (taskToEdit) {
      console.log(taskToEdit);
      this.form = createTodoForm(taskToEdit);
    } else {
      this.form = createTodoForm();
    }
    this.form.addEventListener(
      'submit',
      (e) => this.submitForm(e, DataManager, taskToEdit),
      {
        once: true,
      },
    );
    return this.form;
  }

  submitForm(
    e: Event,
    DataManager: TaskManagerInterface,
    taskToEdit: Task | null,
  ) {
    e.preventDefault();
    const formData = new FormData(this.form);
    const formDataObject: Record<keyof newTaskFormData, string> =
      Object.fromEntries(formData.entries()) as Record<
        keyof newTaskFormData,
        string
      >;
    const newTask = TaskFactory(formDataObject);
    if (taskToEdit) {
      DataManager.editTask(taskToEdit, newTask);
    } else {
      DataManager.addTask(newTask);
    }
  }
}

export default TodoFormUIManager;
