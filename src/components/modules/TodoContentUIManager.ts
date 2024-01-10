import UIManager from './UIManager';
import createListItemFromObject from './utils/createListItemFromObject';
import emptyListFallbackItem from './utils/emptyListFallbackItem';
import {
  TodoManagerInterface,
  TodoListItemWithDataset,
} from './utils/interfaces';
import TodoFactory from './TodoFactory';

class TodoContentUIManager extends UIManager {
  containerElement: HTMLElement;

  constructor(
    private TodoManager: TodoManagerInterface,
    containerElementStr: string,
  ) {
    super();
    this.TodoManager = TodoManager;
    this.containerElement = document.querySelector(containerElementStr);
    this.containerElement.addEventListener('click', (e) => {
      const li = (e.target as Element).closest('LI') as TodoListItemWithDataset;
      if (li?.parentElement.id === 'top-level-todos') {
        this.TodoManager.setSelectedTodo(Number(li.dataset.todo));
        this.containerElement
          .querySelector('#selected-sub-todos')
          .parentElement.replaceWith(
            this.renderSelectedSubTodosList(Number(li.dataset.todo)),
          );
      }
      if (li?.parentElement.id === 'selected-sub-todos') {
        // we can do something else
      }
    });
  }

  createUList(listIDName: string) {
    return this.createElement<HTMLUListElement>('ul', '', listIDName);
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
    const btn = this.createElement('button', 'add-todo-btn', btnID);
    btn.textContent = 'Add Task';
    return btn;
  }

  renderTopLevelTodosList() {
    const todosListContainer = this.createTodosListContainer('To Do');
    const ul = this.createUList('top-level-todos');
    this.TodoManager.getTopLevelTodos().forEach((todo) =>
      ul.append(createListItemFromObject(todo, 'top-level')),
    );
    const addNewTodoBtn = this.createNewTodoBtn('add-top-level-todo-btn');
    todosListContainer.append(ul, addNewTodoBtn);
    return todosListContainer;
  }

  renderSelectedSubTodosList(todoID: number) {
    const todosListContainer = this.createTodosListContainer('Subtasks');
    const ul = this.createUList('selected-sub-todos');
    this.TodoManager.getTodo(
      todoID,
      this.TodoManager.getTopLevelTodos(),
    ).children.forEach((childTodo) => {
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
    const firstLi = topLevelTodosList.querySelector('ul')
      .firstChild as TodoListItemWithDataset;
    const selectedSubTodosList = this.renderSelectedSubTodosList(
      Number(firstLi.dataset.todo),
    );
    todosLayoutContainer.append(topLevelTodosList, selectedSubTodosList);
    this.containerElement.append(todosLayoutContainer);
  }
}

export default TodoContentUIManager;
