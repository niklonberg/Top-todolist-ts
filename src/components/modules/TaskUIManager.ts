import createListItemFromObject from './utils/createListItemFromObject';
import UIManager from './abstract/UIManager';
import insertEmptyListFallbackItem from './utils/insertEmptyListFallbackItem';
import addDragFunctionality from './utils/addDragFunctionality';
import TodoFormUIManager from './TaskFormUIManager';
import createDeleteWarningContainer from './utils/createWarningContainer';
import {
  Task,
  TaskLevel,
  TaskManagerInterface,
  TodoListItemWithDataset,
} from './utils/interfaces';

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
      const targetParentLi = target.closest('LI') as TodoListItemWithDataset;
      if (targetParentLi?.parentElement.id === 'top-level-tasks')
        this.selectItem(targetParentLi);

      if (target.id === 'add-task-btn') this.addTaskForm('task');

      if (target.id === 'add-subtask-btn' && TaskManager.currSelectedTask)
        this.addTaskForm('subtask');

      if (target.closest('button')?.classList.contains('edit-item-btn'))
        this.editTaskForm(targetParentLi);

      if (target.closest('button')?.classList.contains('delete-item-btn')) {
        this.containerElement.querySelector('.warning-container')?.remove();
        targetParentLi.append(createDeleteWarningContainer());
      }

      if (target.id === 'confirm-delete-btn') this.deleteItem(targetParentLi);

      if (target.closest('button')?.id === 'cancel-delete-btn')
        targetParentLi.querySelector('.warning-container').remove();

      if (target.id === 'cancel-form-btn') this.renderTasksSection();

      // if (target.classList.contains('toggle-complete-btn'))
      //   this.toggleItemComplete(target, targetParentLi);
    });
  }

  // toggleItemComplete(target: Element, parentLi: TodoListItemWithDataset) {
  //   target.classList.toggle('checked');
  //   parentLi.classList.toasyncggle('todo-complete');
  //   const todo = this.TaskManager.toggleIsCompleted(
  //     Number(parentLi.dataset.todo),
  //   );
  //   if (todo.isCompleted) {
  //     parentLi.append(createDateCompleted(todo));
  //   } else {
  //     parentLi.querySelector('.completion-date').remove();
  //   }
  // }

  selectItem(parentLi: TodoListItemWithDataset) {
    [...parentLi.parentElement.children].forEach((child) =>
      child.classList.remove('selected-list-item'),
    );
    parentLi.classList.add('selected-list-item');
    this.TaskManager.setSelectedTask(parentLi.dataset.task);
    this.containerElement
      .querySelector('#selected-subtasks')
      .parentElement.replaceWith(
        this.renderSelectedSubtasksList(this.TaskManager.currSelectedTask),
      );
  }

  async deleteItem(parentLi: TodoListItemWithDataset) {
    if (parentLi.dataset.task) {
      const response = await this.TaskManager.deleteTask(parentLi.dataset.task);
      if (!response.ok) {
        // TODO: render error dialog popup for user?
        console.log('Apologies, an error occured. Please try again');
      } else {
        this.renderTasksSection();
      }
    } else {
      const subtaskIndex = [...parentLi.parentElement.children].indexOf(
        parentLi,
      );
      const response = await this.TaskManager.deleteSubtask(subtaskIndex);
      if (!response.ok) {
        // TODO: render error dialog popup for user?
        console.log('Apologies, an error occured. Please try again');
      } else {
        this.renderTasksSection();
      }
    }
  }

  addTaskForm(taskLevel: TaskLevel) {
    this.containerElement.innerHTML = '';
    this.containerElement.append(
      this.FormManager?.insertTaskForm(this.TaskManager, taskLevel),
    );
  }

  // TODO: add taskLevel as arg like in addTaskForm
  editTaskForm(parentLi: TodoListItemWithDataset) {
    this.containerElement.innerHTML = '';
    this.containerElement.append(
      this.FormManager?.insertTaskForm(
        this.TaskManager,
        'task',
        this.TaskManager.getTask(parentLi.dataset.task),
      ),
    );
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

  createNewTaskBtn(btnID: string) {
    const btn = this.createElement<HTMLButtonElement>(
      'button',
      'create-task-btn',
      btnID,
    );
    btn.textContent = '+ Add Task';
    return btn;
  }

  renderTasksList() {
    const tasksListContainer = this.createTasksContainer('Tasks');
    const ul = this.createElement<HTMLUListElement>(
      'ul',
      '',
      'top-level-tasks',
    );
    this.TaskManager.getTasks().forEach((task) => {
      const parentLi = createListItemFromObject(task, 'task');
      if (this.TaskManager.currSelectedTask === task) {
        parentLi.classList.add('selected-list-item');
      }
      ul.append(parentLi);
    });
    insertEmptyListFallbackItem(ul);
    const addNewTaskBtn = this.createNewTaskBtn('add-task-btn');
    tasksListContainer.append(ul, addNewTaskBtn);
    addDragFunctionality(ul, this.TaskManager);
    return tasksListContainer;
  }

  renderSelectedSubtasksList(task: Task) {
    const subtasksListContainer = this.createTasksContainer(
      `Subtasks - ${task ? task.title : 'No task selected'}`,
    );
    const ul = this.createElement<HTMLUListElement>(
      'ul',
      '',
      'selected-subtasks',
    );
    task?.subtasks.forEach((subtask) => {
      ul.append(createListItemFromObject(subtask, 'subtask'));
    });
    insertEmptyListFallbackItem(ul);
    const addNewSubtaskBtn = this.createNewTaskBtn('add-subtask-btn');
    addNewSubtaskBtn.textContent = '+ Add Subtask';
    subtasksListContainer.append(ul, addNewSubtaskBtn);
    return subtasksListContainer;
  }

  renderTasksSection() {
    this.containerElement.innerHTML = '';
    const todosLayoutContainer = this.createElement('div', '', 'todos-layout');
    const topLevelTodosList = this.renderTasksList();
    const selectedSubTodosList = this.renderSelectedSubtasksList(
      this.TaskManager.currSelectedTask,
    );
    todosLayoutContainer.append(topLevelTodosList);
    todosLayoutContainer.append(selectedSubTodosList);
    this.containerElement.append(todosLayoutContainer);
  }

  renderTodayTasks() {
    this.containerElement.innerHTML = '';
    const todosListContainer = this.createTasksContainer('Todays tasks');
    const ul = this.createElement<HTMLUListElement>('ul');
    this.TaskManager.getTodayTasks().forEach((subtask) =>
      ul.append(createListItemFromObject(subtask, 'subtask')),
    );
    insertEmptyListFallbackItem(ul);
    todosListContainer.append(ul);
    this.containerElement.append(todosListContainer);
  }

  // renderNext7DaysTasks() {
  //   this.containerElement.innerHTML = '';
  //   const todosListContainer =
  //     this.createTodosListContainer('Next 7 days tasks');
  //   const ul = this.createElement<HTMLUListElement>('ul');
  //   this.TaskManager.getNext7DaysTasks().forEach((childTodo) =>
  //     ul.append(createListItemFromObject(childTodo, 'todo-list')),
  //   );
  //   insertEmptyListFallbackItem(ul);
  //   todosListContainer.append(ul);
  //   this.containerElement.append(todosListContainer);
  // }
}

export default TaskUIManager;
