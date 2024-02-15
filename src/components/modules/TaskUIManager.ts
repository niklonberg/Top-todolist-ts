import createListItemFromObject, {
  createDateCompleted,
} from './utils/createListItemFromObject';
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

      if (target.classList.contains('add-task-btn')) this.addTaskForm(target);

      // if (target.closest('button')?.classList.contains('edit-item-btn'))
      //   this.editItem(targetParentLi);

      if (target.closest('button')?.classList.contains('delete-item-btn'))
        if (!this.containerElement.querySelector('.warning-container'))
          targetParentLi.append(createDeleteWarningContainer());

      if (target.id === 'confirm-delete-btn') this.deleteItem(targetParentLi);

      if (target.id === 'cancel-delete-btn')
        targetParentLi.querySelector('.warning-container').remove();

      if (target.id === 'cancel-form-btn') this.renderTodosSection();

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
    if (parentLi.parentElement.id === 'top-level-tasks') {
      const response = await this.TaskManager.deleteTask(parentLi.dataset.task);
      if (!response.ok) {
        // TODO: render error dialog popup for user?
        console.log('Apologies, an error occured. Please try again');
      } else {
        this.TaskManager.resetSelectedTask();
        this.renderTodosSection();
      }
    }
    // } else {
    //   this.TaskManager.deleteChildTodo(Number(parentLi.dataset.todo));
    //   re render subtasks list
    // }
  }

  addTaskForm(target: Element) {
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
      'add-task-btn',
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
      const parentLi = createListItemFromObject(task, 'top-level');
      if (this.TaskManager.currSelectedTask === task)
        parentLi.classList.add('selected-list-item');
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
    const addNewSubtaskBtn = this.createNewTaskBtn('add-child-level-todo-btn');
    addNewSubtaskBtn.textContent = '+ Add Subtask';
    subtasksListContainer.append(ul, addNewSubtaskBtn);
    return subtasksListContainer;
  }

  renderTodosSection() {
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

export default TaskUIManager;
