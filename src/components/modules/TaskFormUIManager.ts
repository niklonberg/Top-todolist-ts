import UIManager from './abstract/UIManager';
import createTaskForm from './utils/createTaskForm';
import createTaskFromFormData from './utils/createTaskFromFormData';
import { Task, TaskLevel, TaskManagerInterface } from './utils/interfaces';

class TaskFormUIManager extends UIManager {
  private form: HTMLFormElement | null;

  insertTaskForm(
    TaskManager: TaskManagerInterface,
    taskLevel: TaskLevel,
    taskToEdit: Task = null,
    subtaskIndex: number | null = null,
  ) {
    this.form = createTaskForm(taskToEdit);
    this.form.addEventListener(
      'submit',
      (e) =>
        this.submitForm(e, TaskManager, taskLevel, taskToEdit, subtaskIndex),
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
    subtaskIndex: number | null,
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
        // ensure this is the subtask, not parent task
        // newTask.subtasks = taskToEdit.subtasks; // ensure old subtasks arent lost
        TaskManager.editSubtask(subtaskIndex, newTask, taskToEdit._id);
      } else {
        TaskManager.addSubtask(newTask);
      }
    }
  }
}

export default TaskFormUIManager;
