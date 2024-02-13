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
  TodoManagerInterface,
  TodoListItemWithDataset,
} from './utils/interfaces';

// think on how this class could be a ListContentUIManager instead
// then we could have different types of lists instead of only Todos!
class TodoContentUIManager extends UIManager {
  containerElement: HTMLElement;

  constructor(
    private TodoManager: TodoManagerInterface,
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
      // if (targetParentLi?.parentElement.id === 'top-level-todos')
      //   this.selectItem(targetParentLi);

      // if (target.classList.contains('add-todo-btn')) this.addItem(target);

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

  // selectItem(parentLi: TodoListItemWithDataset) {
  //   [...parentLi.parentElement.children].forEach((child) =>
  //     child.classList.remove('selected-list-item'),
  //   );
  //   parentLi.classList.add('selected-list-item');
  //   this.TodoManager.setSelectedTodo(Number(parentLi.dataset.todo));
  //   this.containerElement
  //     .querySelector('#selected-sub-todos')
  //     .parentElement.replaceWith(
  //       this.renderSelectedSubTodosList(this.TodoManager.currSelectedTodo),
  //     );
  // }

  // deleteItem(parentLi: TodoListItemWithDataset) {
  //   if (parentLi?.parentElement.id === 'top-level-todos') {
  //     this.TodoManager.deleteTopLevelTodo(Number(parentLi.dataset.todo));
  //     this.TodoManager.resetSelectedTodo();
  //   } else {
  //     this.TodoManager.deleteChildTodo(Number(parentLi.dataset.todo));
  //   }
  //   this.renderTodosSection();
  // }

  // addItem(target: Element) {
  //   if (target.id === 'add-top-level-todo-btn') {
  //     this.TodoManager.resetSelectedTodo();
  //     // reset currSelected to null, so addTodo inserts into topLevelTodos
  //   }
  //   this.containerElement.innerHTML = '';
  //   this.containerElement.append(
  //     this.FormManager?.insertTodoForm(this, this.TodoManager),
  //   );
  // }

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

  createTodosListContainer(headingTitle: string) {
    const todosListContainer = this.createElement<HTMLDivElement>(
      'div',
      'todos-list-container',
    );
    const h2 = this.createElement<HTMLHeadingElement>('H2', 'list-item-title');
    h2.textContent = headingTitle;
    todosListContainer.append(h2);
    return todosListContainer;
  }

  createNewTodoBtn(btnID: string) {
    const btn = this.createElement<HTMLButtonElement>(
      'button',
      'add-todo-btn',
      btnID,
    );
    btn.textContent = '+ Add Task';
    return btn;
  }

  renderTasksList() {
    const tasksListContainer = this.createTodosListContainer('Tasks');
    const ul = this.createElement<HTMLUListElement>(
      'ul',
      '',
      'top-level-tasks',
    );
    this.TodoManager.getTopLevelTasks().forEach((task) => {
      const parentLi = createListItemFromObject(task, 'top-level');
      if (this.TodoManager.currSelectedTask === task)
        parentLi.classList.add('selected-list-item');
      ul.append(parentLi);
    });
    insertEmptyListFallbackItem(ul);
    const addNewTaskBtn = this.createNewTodoBtn('add-task-btn');
    tasksListContainer.append(ul, addNewTaskBtn);
    addDragFunctionality(ul, this.TodoManager);
    return tasksListContainer;
  }

  renderSelectedSubTodosList(todo: Task) {
    const todosListContainer = this.createTodosListContainer(
      `Subtasks - ${todo ? todo.title : 'No todo selected'}`,
    );
    const ul = this.createElement<HTMLUListElement>(
      'ul',
      '',
      'selected-sub-todos',
    );

    todo?.subtasks.forEach((childTodo) => {
      ul.append(createListItemFromObject(childTodo, 'subtask'));
    });

    insertEmptyListFallbackItem(ul);
    const addNewTodoBtn = this.createNewTodoBtn('add-child-level-todo-btn');
    addNewTodoBtn.textContent = '+ Add Subtask';
    todosListContainer.append(ul, addNewTodoBtn);
    return todosListContainer;
  }

  renderTodosSection() {
    this.containerElement.innerHTML = '';
    const todosLayoutContainer = this.createElement('div', '', 'todos-layout');
    const topLevelTodosList = this.renderTasksList();
    const selectedSubTodosList = this.renderSelectedSubTodosList(
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
