import createListItemFromObject, {
  createDateCompleted,
} from './utils/createListItemFromObject';
import createElement from './utils/createElement';
import UIManager from './abstract/UIManager';
import insertEmptyListFallbackItem from './utils/insertEmptyListFallbackItem';
import addDragFunctionality from './utils/addDragFunctionality';
import TodoFormUIManager from './TodoFormUIManager';
import createDeleteWarningContainer from './utils/createWarningContainer';
import {
  Task,
  TaskManagerInterface,
  TodoListItemWithDataset,
} from './utils/interfaces';

export default class TaskUIManager extends UIManager {
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

      if (target.classList.contains('add-task-btn')) this.addTodoForm(target);

      // if (target.closest('button')?.classList.contains('edit-item-btn'))
      //   this.editItem(targetParentLi);

      // if (target.closest('button')?.classList.contains('delete-item-btn'))
      //   if (!this.cUIManagerontainerElement.querySelector('.warning-container'))
      //     targetParentLi.append(createDeleteWarningContainer());

      // if (target.id === 'confirm-delete-btn') this.deleteItem(targetParentLi);

      // if (target.id === 'cancel-delete-btn')
      //   targetParentLi.querySelector('.warning-container').remove();

      if (target.id === 'cancel-form-btn') this.renderTodosSection();

      // if (target.classList.contains('toggle-complete-btn'))
      //   this.toggleItemComplete(target, targetParentLi);
    });
  }

  // toggleItemComplete(target: Element, parentLi: TodoListItemWithDataset) {
  //   target.classList.toggle('checked');
  //   parentLi.classList.toggle('todo-complete');
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

  // deleteItem(parentLi: TodoListItemWithDataset) {
  //   if (parentLi?.parentElement.id === 'top-level-todos') {
  //     this.TaskManager.deleteTopLevelTodo(Number(parentLi.dataset.todo));
  //     this.TaskManager.resetSelectedTodo();
  //   } else {
  //     this.TaskManager.deleteChildTodo(Number(parentLi.dataset.todo));
  //   }
  //   this.renderTodosSection();
  // }

  addTodoForm(target: Element) {
    // if (target.id === 'add-top-level-todo-btn') {
    //   this.TaskManager.resetSelectedTask();
    //   // reset currSelected to null, so addTodo inserts into topLevelTodos
    // }
    this.containerElement.innerHTML = '';
    this.containerElement.append(
      this.FormManager.insertTodoForm(this.TaskManager),
    );
  }

  // editItem(parentLi: TodoListItemWithDataset) {
  //   this.containerElement.innerHTML = '';
  //   this.containerElement.append(
  //     this.FormManager?.insertTodoForm(
  //       this,
  //       this.TaskManager,
  //       this.TaskManager.getTodo(
  //         Number(parentLi.dataset.todo),
  //         this.TaskManager.getTopLevelTodos(),
  //       ),
  //     ),
  //   );
  // }

  renderTasksList() {
    return createTasksList();
  }

  renderSelectedSubtasksList(task: Task) {
    return createSelectedSubtasksList(task);
  }

  renderTodosSection() {
    this.containerElement.innerHTML = '';
    this.containerElement.append(createTodosSection());
  }

  // renderTodayTasks() {
  //   this.containerElement.innerHTML = '';
  //   const todosListContainer = this.createTodosListContainer('Todays tasks');
  //   const ul = this.createElement<HTMLUListElement>('ul');
  //   this.TaskManager.getTodayTasks().forEach((childTodo) =>
  //     ul.append(createListItemFromObject(childTodo, 'todo-list')),
  //   );
  //   insertEmptyListFallbackItem(ul);
  //   todosListContainer.append(ul);
  //   this.containerElement.append(todosListContainer);
  // }

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

function createNewTaskBtn(btnID: string) {
  const btn = createElement<HTMLButtonElement>('button', 'add-task-btn', btnID);
  btn.textContent = '+ Add Task';
  return btn;
}

function createTasksContainer(headingTitle: string) {
  const taskContainer = createElement<HTMLDivElement>('div', 'tasks-container');
  const h2 = createElement<HTMLHeadingElement>('H2', 'list-item-title');
  h2.textContent = headingTitle;
  taskContainer.append(h2);
  return taskContainer;
}

function createTasksList() {
  const tasksListContainer = this.createTasksContainer('Tasks');
  const ul = createElement<HTMLUListElement>('ul', '', 'top-level-tasks');
  this.TaskManager.getTasks().forEach((task) => {
    const parentLi = createListItemFromObject(task, 'top-level');
    if (this.TaskManager.currSelectedTask === task)
      parentLi.classList.add('selected-list-item');
    ul.append(parentLi);
  });
  insertEmptyListFallbackItem(ul);
  const addNewTaskBtn = createNewTaskBtn('add-task-btn');
  tasksListContainer.append(ul, addNewTaskBtn);
  // addDragFunctionality(ul, this.TaskManager);
  return tasksListContainer;
}

function createSelectedSubtasksList(selectedTask: Task) {
  const subtasksListContainer = createTasksContainer(
    `Subtasks - ${selectedTask ? selectedTask.title : 'No task selected'}`,
  );
  const ul = createElement<HTMLUListElement>('ul', '', 'selected-subtasks');
  selectedTask?.subtasks.forEach((subtask) => {
    ul.append(createListItemFromObject(subtask, 'subtask'));
  });
  insertEmptyListFallbackItem(ul);
  const addNewSubtaskBtn = createNewTaskBtn('add-child-level-todo-btn');
  addNewSubtaskBtn.textContent = '+ Add Subtask';
  subtasksListContainer.append(ul, addNewSubtaskBtn);
  return subtasksListContainer;
}

export function createTodosSection(task: Task) {
  const todosLayoutContainer = createElement<HTMLDivElement>(
    'div',
    '',
    'todos-layout',
  );
  const topLevelTodosList = createTasksList();
  const selectedSubTodosList = createSelectedSubtasksList(task);
  todosLayoutContainer.append(topLevelTodosList);
  todosLayoutContainer.append(selectedSubTodosList);
  return todosLayoutContainer;
}
