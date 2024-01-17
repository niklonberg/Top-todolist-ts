import UIManager from './abstract/UIManager';
import createListItemFromObject from './utils/createListItemFromObject';
import emptyListFallbackItem from './utils/emptyListFallbackItem';
import addDragFunctionality from './utils/addDragFunctionality';
import TodoFormUIManager from './TodoFormUIManager';
import {
  Todo,
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
      if (targetParentLi?.parentElement.id === 'top-level-todos')
        this.selectItem(targetParentLi);

      if (targetParentLi?.parentElement.id === 'selected-sub-todos') {
        // we can do something else
      }

      if (target.classList.contains('delete-item'))
        this.deleteItem(targetParentLi);

      if (target.classList.contains('add-todo-btn')) this.addItem(target);

      if (target.classList.contains('edit-item')) this.editItem(targetParentLi);

      if (target.classList.contains('cancel-form-btn'))
        this.renderTodosSection();

      if (target.classList.contains('toggle-complete-btn')) {
        this.toggleItemComplete(target, targetParentLi);
      }
    });
  }

  toggleItemComplete(target: Element, parentLi: TodoListItemWithDataset) {
    target.classList.toggle('checked');
    parentLi.classList.toggle('todo-complete');
    this.TodoManager.toggleIsCompleted(Number(parentLi.dataset.todo));
  }

  selectItem(parentLi: TodoListItemWithDataset) {
    [...parentLi.parentElement.children].forEach((child) =>
      child.classList.remove('selected-list-item'),
    );
    parentLi.classList.add('selected-list-item');
    this.TodoManager.setSelectedTodo(Number(parentLi.dataset.todo));
    this.containerElement
      .querySelector('#selected-sub-todos')
      .parentElement.replaceWith(
        this.renderSelectedSubTodosList(this.TodoManager.currSelectedTodo),
      );
  }

  deleteItem(parentLi: TodoListItemWithDataset) {
    if (parentLi?.parentElement.id === 'top-level-todos') {
      this.TodoManager.deleteTopLevelTodo(Number(parentLi.dataset.todo));
      this.TodoManager.resetSelectedTodo();
    } else {
      this.TodoManager.deleteChildTodo(Number(parentLi.dataset.todo));
    }
    this.renderTodosSection();
  }

  addItem(target: Element) {
    if (target.id === 'add-top-level-todo-btn') {
      this.TodoManager.resetSelectedTodo();
      // reset currSelected to null, so addTodo inserts into topLevelTodos
    }
    this.containerElement.innerHTML = '';
    this.containerElement.append(
      this.FormManager?.insertTodoForm(this, this.TodoManager),
    );
  }

  editItem(parentLi: TodoListItemWithDataset) {
    this.containerElement.innerHTML = '';
    this.containerElement.append(
      this.FormManager?.insertTodoForm(
        this,
        this.TodoManager,
        this.TodoManager.getTodo(
          Number(parentLi.dataset.todo),
          this.TodoManager.getTopLevelTodos(),
        ),
      ),
    );
  }

  createTodosListContainer(headingTitle: string) {
    const todosListContainer = this.createElement<HTMLDivElement>(
      'div',
      'todos-list-container',
    );
    const h2 = this.createElement<HTMLHeadingElement>('H2');
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

  renderTopLevelTodosList() {
    const todosListContainer = this.createTodosListContainer('To Do');
    const ul = this.createElement<HTMLUListElement>(
      'ul',
      '',
      'top-level-todos',
    );
    this.TodoManager.getTopLevelTodos().forEach((todo) => {
      const targetParentLi = createListItemFromObject(todo, 'top-level');
      if (this.TodoManager.currSelectedTodo === todo)
        targetParentLi.classList.add('selected-list-item');
      ul.append(targetParentLi);
    });
    if (ul.childNodes.length === 0) ul.append(emptyListFallbackItem());
    const addNewTodoBtn = this.createNewTodoBtn('add-top-level-todo-btn');
    todosListContainer.append(ul, addNewTodoBtn);
    addDragFunctionality(ul);
    return todosListContainer;
  }

  renderSelectedSubTodosList(todo: Todo) {
    const todosListContainer = this.createTodosListContainer(
      `${todo.title} - Subtasks`,
    );
    const ul = this.createElement<HTMLUListElement>(
      'ul',
      '',
      'selected-sub-todos',
    );

    todo?.children.forEach((childTodo) => {
      ul.append(createListItemFromObject(childTodo, 'todo-list'));
    });

    if (ul.childNodes.length === 0) ul.append(emptyListFallbackItem());
    const addNewTodoBtn = this.createNewTodoBtn('add-child-level-todo-btn');
    todosListContainer.append(ul, addNewTodoBtn);
    return todosListContainer;
  }

  renderTodosSection() {
    this.containerElement.innerHTML = '';
    const todosLayoutContainer = this.createElement('div', '', 'todos-layout');
    const topLevelTodosList = this.renderTopLevelTodosList();
    const selectedSubTodosList = this.renderSelectedSubTodosList(
      this.TodoManager.currSelectedTodo,
    );
    todosLayoutContainer.append(topLevelTodosList, selectedSubTodosList);
    this.containerElement.append(todosLayoutContainer);
  }
}

export default TodoContentUIManager;
