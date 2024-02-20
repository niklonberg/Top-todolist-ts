import UIManager from './abstract/UIManager';
import createTaskForm from './utils/createTaskForm';
import {
  Task,
  newTaskFormData,
  TaskManagerInterface,
} from './utils/interfaces';
import TaskFactory from './TaskFactory';

class TodoFormUIManager extends UIManager {
  private form: HTMLFormElement | null;

  private inputs: NodeListOf<HTMLInputElement> | null;

  insertTaskForm(DataManager: TaskManagerInterface, taskToEdit: Task = null) {
    if (taskToEdit) {
      console.log(taskToEdit);
      this.form = createTaskForm(taskToEdit);
    } else {
      this.form = createTaskForm();
    }
    this.form.addEventListener(
      'submit',
      (e) => this.submitForm(e, DataManager, taskToEdit),
      {
        once: true,
      },
    );
    this.inputs = this.form.querySelectorAll('.text-input');

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
    console.log('type of dueDate from factory: ', typeof newTask.dueDate);
    console.log('newTask.dueDate: ', newTask.dueDate);
    if (taskToEdit) {
      DataManager.editTask(taskToEdit, newTask);
    } else {
      DataManager.addTask(newTask);
    }
  }
}

export default TodoFormUIManager;
