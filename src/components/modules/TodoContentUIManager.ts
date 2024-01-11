import UIManager from './abstract/UIManager';
import createListItemFromObject from './utils/createListItemFromObject';
import emptyListFallbackItem from './utils/emptyListFallbackItem';
import {
  Todo,
  TodoManagerInterface,
  TodoListItemWithDataset,
} from './utils/interfaces';
import TodoFactory from './TodoFactory';

// think on how this class could be a ListContentUIManager instead
// then we could have different types of lists instead of only Todos!
class TodoContentUIManager extends UIManager {
  containerElement: HTMLElement;

  constructor(
    private TodoManager: TodoManagerInterface,
    containerID: string,
  ) {
    super();
    this.TodoManager = TodoManager;
    this.containerElement = document.querySelector(`#${containerID}`); // static
    // can we move eventListener outside?
    this.containerElement.addEventListener('click', (e) => {
      const li = (e.target as Element).closest('LI') as TodoListItemWithDataset;
      if (li?.parentElement.id === 'top-level-todos') {
        [...li.parentElement.children].forEach((child) =>
          child.classList.remove('selected-list-item'),
        );
        li.classList.add('selected-list-item');
        this.TodoManager.setSelectedTodo(Number(li.dataset.todo));
        this.containerElement
          .querySelector('#selected-sub-todos')
          .parentElement.replaceWith(
            this.renderSelectedSubTodosList(this.TodoManager.currSelectedTodo),
          );
      }
      if (li?.parentElement.id === 'selected-sub-todos') {
        // we can do something else
      }

      if ((e.target as Element).classList.contains('delete-item')) {
        if (li?.parentElement.id === 'top-level-todos') {
          this.TodoManager.deleteTopLevelTodo(Number(li.dataset.todo));
          this.TodoManager.resetSelectedTodo();
        } else {
          this.TodoManager.deleteChildTodo(Number(li.dataset.todo));
        }
        this.renderTodosSection();
      }

      if ((e.target as Element).classList.contains('edit-item')) {
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
      const li = createListItemFromObject(todo, 'top-level');
      if (this.TodoManager.currSelectedTodo === todo)
        li.classList.add('selected-list-item');
      ul.append(li);
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
