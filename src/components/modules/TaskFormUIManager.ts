import UIManager from './abstract/UIManager';
import createTaskForm from './utils/createTaskForm';
import createTaskFromFormData from './utils/createTaskFromFormData';
import { Task, TaskLevel, TaskManagerInterface } from './utils/interfaces';
import TaskFactory from './TaskFactory';

class TaskFormUIManager extends UIManager {
  private form: HTMLFormElement | null;

  insertTaskForm(
    TaskManager: TaskManagerInterface,
    taskLevel: TaskLevel,
    taskToEdit: Task = null,
  ) {
    this.form = createTaskForm(taskToEdit);
    this.form.addEventListener(
      'submit',
      (e) => this.submitForm(e, TaskManager, taskLevel, taskToEdit),
      {
        once: true,
      },
    );

    const inputs = this.form.querySelectorAll(
      '.text-input',
    ) as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => {
      const label = input.parentElement.querySelector('.text-input-label');
      if (input.value.trim() !== '') label.classList.add('move-label');

      input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
          label.classList.add('move-label');
        } else {
          label.classList.remove('move-label');
        }
      });
    });

    return this.form;
  }

  submitForm(
    e: Event,
    TaskManager: TaskManagerInterface,
    taskLevel: TaskLevel,
    taskToEdit: Task | null,
  ) {
    e.preventDefault();
    const newTask = createTaskFromFormData(this.form);
    if (taskLevel === 'task') {
      if (taskToEdit) {
        newTask.subtasks = taskToEdit.subtasks; // ensure old subtasks arent lost
        TaskManager.editTask(taskToEdit, newTask);
      } else {
        TaskManager.addTask(newTask);
      }
    }
    if (taskLevel === 'subtask') {
      if (taskToEdit) {
        newTask.subtasks = taskToEdit.subtasks;
        // TaskManager.editSubtask(newTask);
      } else {
        TaskManager.addSubtask(newTask);
      }
    }
  }
}

export default TaskFormUIManager;
