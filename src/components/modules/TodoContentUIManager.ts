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

// think on how this class could be a ListContentUIManager instead
// then we could have different types of lists instead of only Todos!
class TodoContentUIManager extends UIManager {
  containerElement: HTMLElement;

  constructor(
    private TodoManager: TaskManagerInterface,
    containerElementID: string,
    private FormManager?: TodoFormUIManager,
  ) {
    super();
    this.TodoManager = TodoManager;
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
      //   if (!this.containerElement.querySelector('.warning-container'))
      //     targetParentLi.append(createDeleteWarningContainer());

      // if (target.id === 'confirm-delete-btn') this.deleteItem(targetParentLi);

      // if (target.id === 'cancel-delete-btn')
      //   targetParentLi.querySelector('.warning-container').remove();

      // if (target.id === 'cancel-form-btn') this.renderTodosSection();

      // if (target.classList.contains('toggle-complete-btn'))
      //   this.toggleItemComplete(target, targetParentLi);
    });
  }

  // toggleItemComplete(target: Element, parentLi: TodoListItemWithDataset) {
  //   target.classList.toggle('checked');
  //   parentLi.classList.toggle('todo-complete');
  //   const todo = this.TodoManager.toggleIsCompleted(
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
    this.TodoManager.setSelectedTask(parentLi.dataset.task);
    this.containerElement
      .querySelector('#selected-subtasks')
      .parentElement.replaceWith(
        this.renderSelectedSubtasksList(this.TodoManager.currSelectedTask),
      );
  }

  // deleteItem(parentLi: TodoListItemWithDataset) {
  //   if (parentLi?.parentElement.id === 'top-level-todos') {
  //     this.TodoManager.deleteTopLevelTodo(Number(parentLi.dataset.todo));
  //     this.TodoManager.resetSelectedTodo();
  //   } else {
  //     this.TodoManager.deleteChildTodo(Number(parentLi.dataset.todo));
  //   }
  //   this.renderTodosSection();
  // }

  addTodoForm(target: Element) {
    // if (target.id === 'add-top-level-todo-btn') {
    //   this.TodoManager.resetSelectedTask();
    //   // reset currSelected to null, so addTodo inserts into topLevelTodos
    // }
    this.containerElement.innerHTML = '';
    this.containerElement.append(
      this.FormManager.insertTodoForm(this, this.TodoManager),
    );
  }

  // editItem(parentLi: TodoListItemWithDataset) {
  //   this.containerElement.innerHTML = '';
  //   this.containerElement.append(
  //     this.FormManager?.insertTodoForm(
  //       this,
  //       this.TodoManager,
  //       this.TodoManager.getTodo(
  //         Number(parentLi.dataset.todo),
  //         this.TodoManager.getTopLevelTodos(),
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
    this.TodoManager.getTasks().forEach((task) => {
      const parentLi = createListItemFromObject(task, 'top-level');
      if (this.TodoManager.currSelectedTask === task)
        parentLi.classList.add('selected-list-item');
      ul.append(parentLi);
    });
    insertEmptyListFallbackItem(ul);
    const addNewTaskBtn = this.createNewTaskBtn('add-task-btn');
    tasksListContainer.append(ul, addNewTaskBtn);
    addDragFunctionality(ul, this.TodoManager);
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
    console.log('todos section update ran');
    this.containerElement.innerHTML = '';
    const todosLayoutContainer = this.createElement('div', '', 'todos-layout');
    const topLevelTodosList = this.renderTasksList();
    const selectedSubTodosList = this.renderSelectedSubtasksList(
      this.TodoManager.currSelectedTask,
    );
    todosLayoutContainer.append(topLevelTodosList);
    todosLayoutContainer.append(selectedSubTodosList);
    this.containerElement.append(todosLayoutContainer);
  }

  // renderTodayTasks() {
  //   this.containerElement.innerHTML = '';
  //   const todosListContainer = this.createTodosListContainer('Todays tasks');
  //   const ul = this.createElement<HTMLUListElement>('ul');
  //   this.TodoManager.getTodayTasks().forEach((childTodo) =>
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
  //   this.TodoManager.getNext7DaysTasks().forEach((childTodo) =>
  //     ul.append(createListItemFromObject(childTodo, 'todo-list')),
  //   );
  //   insertEmptyListFallbackItem(ul);
  //   todosListContainer.append(ul);
  //   this.containerElement.append(todosListContainer);
  // }
}

export default TodoContentUIManager;
