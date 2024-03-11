import createListItemFromTask, {
  createDateCompleted,
  createDueDate,
  createParentTaskInfoContainer,
} from './utils/createTaskListItem';
import UIManager from './abstract/UIManager';
import insertEmptyListFallbackItem from './utils/insertEmptyListFallbackItem';
import addDragFunctionality from './utils/addDragFunctionality';
import TodoFormUIManager from './TaskFormUIManager';
import createDeleteWarningContainer from './utils/createWarningContainer';
import createSubtaskPrioritySelect from './utils/createSubtaskPrioritySelect';
import {
  Task,
  TaskManagerInterface,
  TaskListItem,
  SubtaskWithImpParentInfo,
} from './definitions/interfaces';
import { type TaskLevel } from './definitions/types';

class TaskUIManager extends UIManager {
  containerElement: HTMLElement;

  constructor(
    private TaskManager: TaskManagerInterface,
    containerElementID: string,
    private FormManager?: TodoFormUIManager,
  ) {
    super();
    this.TaskManager = TaskManager;
    this.FormManager = FormManager;
    // add error handling for below line? what happens if dev gets id wrong
    this.containerElement = document.querySelector(`#${containerElementID}`);
    this.containerElement.addEventListener('click', (e) => {
      const target = e.target as Element;
      const targetParentLi = target.closest('LI') as TaskListItem;
      if (targetParentLi?.parentElement.id === 'top-level-tasks')
        this.selectItem(targetParentLi);

      if (target.classList.contains('create-task-btn'))
        this.addTaskForm(target);

      if (target.closest('button')?.classList.contains('edit-item-btn'))
        this.editTaskForm(targetParentLi);

      if (target.closest('button')?.classList.contains('delete-item-btn')) {
        this.containerElement.querySelector('.warning-container')?.remove();
        targetParentLi.append(createDeleteWarningContainer());
      }

      if (target.id === 'confirm-delete-btn') this.deleteItem(targetParentLi);

      if (target.closest('button')?.id === 'cancel-delete-btn')
        targetParentLi.querySelector('.warning-container').remove();

      if (target.id === 'cancel-form-btn') this.renderCurrentView();

      if (target.closest('button')?.classList.contains('toggle-complete-btn'))
        this.toggleItemComplete(targetParentLi);
    });
  }

  addTaskForm(target: Element) {
    const taskContainer = target.parentElement.querySelector('ul');
    const taskLevel: TaskLevel =
      taskContainer.id === 'selected-subtasks' ? 'subtask' : 'task';
    this.containerElement.innerHTML = '';
    this.containerElement.append(
      this.FormManager?.insertTaskForm(this.TaskManager, taskLevel),
    );
  }

  editTaskForm(parentLi: TaskListItem) {
    let taskLevel: TaskLevel = 'task';
    let subtaskIndex: number | null = null;
    if (parentLi.dataset.subtaskIndex) {
      taskLevel = 'subtask';
      subtaskIndex = Number(parentLi.dataset.subtaskIndex);
    }
    const taskToEdit = this.TaskManager.getTask(parentLi.dataset.task);

    this.containerElement.innerHTML = '';
    this.containerElement.append(
      this.FormManager.insertTaskForm(
        this.TaskManager,
        taskLevel,
        taskToEdit,
        subtaskIndex,
      ),
    );
  }

  selectItem(parentLi: TaskListItem) {
    [...parentLi.parentElement.children].forEach((child) =>
      child.classList.remove('selected-list-item'),
    );
    parentLi.classList.add('selected-list-item');
    this.TaskManager.setSelectedTask(parentLi.dataset.task);
    this.containerElement
      .querySelector('#selected-subtasks')
      .parentElement.replaceWith(
        this.createSelectedSubtasksList(this.TaskManager.currSelectedTask),
      );
  }

  async toggleItemComplete(parentLi: TaskListItem) {
    const subtaskIndex = Number(parentLi.dataset.subtaskIndex);
    const response = await this.TaskManager.toggleSubtaskCompleted(
      subtaskIndex,
      parentLi.dataset.task,
    );
    if (!response.ok) {
      console.error('An error occured, could not toggle task completion');
    } else {
      parentLi.classList.toggle('task-complete');
      const subtask = this.TaskManager.currSelectedTask.subtasks[subtaskIndex];
      if (subtask.dateCompleted) {
        parentLi
          .querySelector('.task-date')
          .replaceWith(createDateCompleted(subtask));
      } else {
        parentLi
          .querySelector('.task-date')
          .replaceWith(createDueDate(subtask));
      }
    }
  }

  async deleteItem(parentLi: TaskListItem) {
    if (parentLi.dataset.subtaskIndex) {
      const subtaskIndex = Number(parentLi.dataset.subtaskIndex);
      const response = await this.TaskManager.deleteSubtask(
        subtaskIndex,
        parentLi.dataset.task,
      );
      if (!response.ok) {
        // TODO: render error dialog popup for user?
        console.log('Apologies, an error occured. Please try again');
      } else {
        this.renderCurrentView();
      }
    } else {
      const response = await this.TaskManager.deleteTask(parentLi.dataset.task);
      if (!response.ok) {
        // TODO: render error dialog popup for user?
        console.log('Apologies, an error occured. Please try again');
      } else {
        this.renderCurrentView();
      }
    }
  }

  createTasksContainer(headingTitle: string) {
    const taskContainer = this.createElement<HTMLDivElement>(
      'div',
      'tasks-container',
    );
    const h2 = this.createElement<HTMLHeadingElement>('H2', 'list-item-title');
    h2.textContent = headingTitle;
    taskContainer.append(h2);
    return taskContainer;
  }

  createNewTaskBtn(taskLevel: TaskLevel) {
    const btn = this.createElement<HTMLButtonElement>(
      'button',
      'create-task-btn',
    );
    btn.textContent = `+ Add ${taskLevel}`;
    return btn;
  }

  createTasksList() {
    const tasksListContainer = this.createTasksContainer('Tasks');
    const ul = this.createElement<HTMLUListElement>(
      'ul',
      '',
      'top-level-tasks',
    );
    this.TaskManager.getTasks().forEach((task) => {
      const parentLi = createListItemFromTask(task, 'task');
      if (this.TaskManager.currSelectedTask === task)
        parentLi.classList.add('selected-list-item');
      ul.append(parentLi);
    });
    insertEmptyListFallbackItem(ul);
    const addNewTaskBtn = this.createNewTaskBtn('task');
    tasksListContainer.append(ul, addNewTaskBtn);
    addDragFunctionality(ul, this.TaskManager);
    return tasksListContainer;
  }

  createSelectedSubtasksList(task: Task) {
    const subtasksListContainer = this.createTasksContainer(
      `Subtasks - ${task ? task.title : 'No task selected'}`,
    );
    const ul = this.createElement<HTMLUListElement>(
      'ul',
      '',
      'selected-subtasks',
    );
    task?.subtasks.forEach((subtask, subtaskIndex) => {
      ul.append(
        createListItemFromTask(subtask, 'subtask', task._id, subtaskIndex),
      );
    });
    insertEmptyListFallbackItem(ul);
    const addNewSubtaskBtn = this.createNewTaskBtn('subtask');
    subtasksListContainer.append(ul, addNewSubtaskBtn);
    return subtasksListContainer;
  }

  renderTasksSection() {
    this.containerElement.innerHTML = '';
    const tasksListContainer = this.createElement('div', '', 'tasks-layout');
    const tasksList = this.createTasksList();
    const selectedSubtasksList = this.createSelectedSubtasksList(
      this.TaskManager.currSelectedTask,
    );
    tasksListContainer.append(tasksList, selectedSubtasksList);
    this.containerElement.append(tasksListContainer);
  }

  renderFilteredSubtasks(
    title: string,
    filteredSubtasks: SubtaskWithImpParentInfo[],
    sortOrderElement?: HTMLElement,
  ) {
    this.containerElement.innerHTML = '';
    const tasksListContainer = this.createTasksContainer(title);
    const ul = this.createElement<HTMLUListElement>('ul', 'filtered-tasks');
    filteredSubtasks.forEach((subtask) => {
      const li = createListItemFromTask(
        subtask,
        'subtask',
        subtask.parentTaskID,
        subtask.subtaskIndex,
      );
      const parentTaskInfoContainer = createParentTaskInfoContainer(
        subtask.parentTaskTitle,
      );
      li.prepend(parentTaskInfoContainer);
      ul.append(li);
    });
    insertEmptyListFallbackItem(ul);
    tasksListContainer.append(ul);
    if (sortOrderElement) tasksListContainer.prepend(sortOrderElement);
    this.containerElement.append(tasksListContainer);
  }

  renderCurrentView() {
    const currentView = localStorage.getItem('currentView');
    if (currentView === 'all-tasks') this.renderTasksSection();
    if (currentView === 'today-tasks')
      this.renderFilteredSubtasks(
        'Subtasks due today',
        this.TaskManager.getSubtasksDueToday(),
      );
    if (currentView === 'week-tasks')
      this.renderFilteredSubtasks(
        'Subtasks due following 7 days',
        this.TaskManager.getSubtasksDueWeek(),
      );
    if (currentView === 'priority-tasks')
      this.renderFilteredSubtasks(
        'Subtasks by priority level',
        this.TaskManager.getSubtasksByPriority(),
        createSubtaskPrioritySelect(this.TaskManager),
      );
  }
}

export default TaskUIManager;
