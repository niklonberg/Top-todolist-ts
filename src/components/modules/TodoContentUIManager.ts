import UIManager from './UIManager';
import createListItemFromObject from './utils/createListItemFromObject';
import emptyListFallbackItem from './utils/emptyListFallbackItem';
import {
  TodoManagerInterface,
  FormTemplateObj,
  TodoListItemWithDataset,
} from './utils/interfaces';
import TodoFactory from './TodoFactory';

class TodoContentUIManager extends UIManager {
  mainContentSection: HTMLElement;

  // topLevelTodosList: HTMLUListElement;

  // selectedSubTodosList: HTMLUListElement;

  // createChildTodoBtn: HTMLButtonElement;

  constructor(public TodoManager: TodoManagerInterface) {
    super();
    this.TodoManager = TodoManager;
    this.mainContentSection = document.querySelector('#main-content');
    this.mainContentSection.addEventListener('click', (e) => {
      const li = (e.target as Element).closest('LI');
      if (li?.parentElement.id === 'top-level-todos') {
        this.mainContentSection
          .querySelector('#selected-sub-todos')
          .parentElement.replaceWith(
            this.renderSelectedSubTodosList(li as TodoListItemWithDataset),
          );
      }
      if (li?.parentElement.id === 'selected-sub-todos') {
        // do something else
      }
    });
  }

  createList(listIDName: string) {
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

  createNewChildTodoBtn(btnID: string) {
    const btn = this.createElement('button', 'add-todo-btn', btnID);
    btn.textContent = 'Add Task';
    return btn;
  }

  renderTopLevelTodosList() {
    const todosListContainer = this.createTodosListContainer('To Do');
    const ul = this.createList('top-level-todos');
    this.TodoManager.getTopLevelTodos().forEach((todo) =>
      ul.append(createListItemFromObject(todo, 'top-level')),
    );
    const addNewTodoBtn = this.createNewChildTodoBtn('add-top-level-todo-btn');
    todosListContainer.append(ul, addNewTodoBtn);
    return todosListContainer;
  }

  renderSelectedSubTodosList(todoItem: TodoListItemWithDataset) {
    const todosListContainer = this.createTodosListContainer('Subtasks');
    const ul = this.createList('selected-sub-todos');
    this.TodoManager.getTodo(
      Number(todoItem.dataset.todo),
      this.TodoManager.getTopLevelTodos(),
    ).children.forEach((childTodo) => {
      ul.append(createListItemFromObject(childTodo, 'todo-list'));
    });
    if (ul.childNodes.length === 0) ul.append(emptyListFallbackItem());
    const addNewTodoBtn = this.createNewChildTodoBtn(
      'add-child-level-todo-btn',
    );
    todosListContainer.append(ul, addNewTodoBtn);
    return todosListContainer;
  }

  renderTodosSection() {
    this.mainContentSection.innerHTML = '';
    const todosLayoutContainer = this.createElement('div', '', 'todos-layout');
    const topLevelTodosList = this.renderTopLevelTodosList();
    const selectedSubTodosList = this.renderSelectedSubTodosList(
      topLevelTodosList.querySelector('ul')
        .firstChild as TodoListItemWithDataset,
    );
    todosLayoutContainer.append(topLevelTodosList, selectedSubTodosList);
    this.mainContentSection.append(todosLayoutContainer);
  }
}

export default TodoContentUIManager;
