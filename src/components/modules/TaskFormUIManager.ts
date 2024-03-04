import UIManager from './abstract/UIManager';
import createTaskForm from './utils/createTaskForm';
import createTaskFromFormData from './utils/createTaskFromFormData';
import applyInputLabelBehavior from './utils/applyInputLabelBehavior';
import { Task, TaskLevel, TaskManagerInterface } from './utils/interfaces';

class TaskFormUIManager extends UIManager {
  private form: HTMLFormElement | null;

  insertTaskForm(
    TaskManager: TaskManagerInterface,
    taskLevel: TaskLevel,
    taskToEdit: Task = null,
    subtaskIndex: number | null = null,
  ) {
    if (typeof subtaskIndex === 'number') {
      this.form = createTaskForm(taskToEdit.subtasks[subtaskIndex]);
    } else {
      this.form = createTaskForm(taskToEdit);
    }
    applyInputLabelBehavior(this.form);
    this.form.addEventListener(
      'submit',
      (e) =>
        this.submitForm(e, TaskManager, taskLevel, taskToEdit, subtaskIndex),
      {
        once: true,
      },
    );
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
        newTask.subtasks = taskToEdit.subtasks[subtaskIndex].subtasks; // ensure old subtasks arent lost
        TaskManager.editSubtask(subtaskIndex, newTask, taskToEdit._id);
      } else {
        TaskManager.addSubtask(newTask);
      }
    }
  }
}

export default TaskFormUIManager;
