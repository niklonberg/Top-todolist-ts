import UIManager from './abstract/UIManager';
import createListItemFromObject from './utils/createListItemFromObject';
import emptyListFallbackItem from './utils/emptyListFallbackItem';
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
    this.containerElement = document.querySelector(`#${containerElementID}`); // static
    this.containerElement.addEventListener('click', (e) => {
      const target = e.target as Element;
      const targetParentli = target.closest('LI') as TodoListItemWithDataset;
      if (targetParentli?.parentElement.id === 'top-level-todos') {
        [...targetParentli.parentElement.children].forEach((child) =>
          child.classList.remove('selected-list-item'),
        );
        targetParentli.classList.add('selected-list-item');
        this.TodoManager.setSelectedTodo(Number(targetParentli.dataset.todo));
        this.containerElement
          .querySelector('#selected-sub-todos')
          .parentElement.replaceWith(
            this.renderSelectedSubTodosList(this.TodoManager.currSelectedTodo),
          );
      }

      if (targetParentli?.parentElement.id === 'selected-sub-todos') {
        // we can do something else
      }

      if (target.classList.contains('delete-item')) {
        if (targetParentli?.parentElement.id === 'top-level-todos') {
          this.TodoManager.deleteTopLevelTodo(
            Number(targetParentli.dataset.todo),
          );
          this.TodoManager.resetSelectedTodo();
        } else {
          this.TodoManager.deleteChildTodo(Number(targetParentli.dataset.todo));
        }
        this.renderTodosSection();
      }

      if (target.classList.contains('add-todo-btn')) {
        if (target.id === 'add-top-level-todo-btn') {
          this.TodoManager.resetSelectedTodo();
          // reset currSelected to null, so addTodo inserts into topLevelTodos
        }
        this.containerElement.innerHTML = '';
        this.containerElement.append(this.FormManager?.insertTodoForm());
      }

      if (target.classList.contains('edit-item')) {
        this.containerElement.innerHTML = '';
        this.containerElement.append(
          this.FormManager?.insertTodoForm(
            this.TodoManager.getTodo(
              Number(targetParentli.dataset.todo),
              this.TodoManager.getTopLevelTodos(),
            ),
          ),
        );
      }

      if (target.classList.contains('cancel-form-btn')) {
        this.renderTodosSection();
      }
    });
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
    btn.textContent = 'Add Task';
    return btn;
  }

  renderTopLevelTodosList() {
    const todosListContainer = this.createTodosListContainer('To Do');
    const ul = this.createElement('ul', '', 'top-level-todos');
    this.TodoManager.getTopLevelTodos().forEach((todo) => {
      const targetParentli = createListItemFromObject(todo, 'top-level');
      if (this.TodoManager.currSelectedTodo === todo)
        targetParentli.classList.add('selected-list-item');
      ul.append(targetParentli);
    });
    if (ul.childNodes.length === 0) ul.append(emptyListFallbackItem());
    const addNewTodoBtn = this.createNewTodoBtn('add-top-level-todo-btn');
    todosListContainer.append(ul, addNewTodoBtn);
    return todosListContainer;
  }

  renderSelectedSubTodosList(todo: Todo) {
    const todosListContainer = this.createTodosListContainer('Subtasks');
    const ul = this.createElement('ul', '', 'selected-sub-todos');

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
