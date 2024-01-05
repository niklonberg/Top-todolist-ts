import UIManager from './UIManager';
import createListItemFromObject from './utils/createListItemFromObject';
import { TodoManagerInterface } from './utils/interfaces';

class TodoContentUIManager extends UIManager {
  todoContentSection: HTMLElement;

  selectedTodoGrouping: HTMLUListElement;

  constructor(public TodoManager: TodoManagerInterface) {
    super();
    this.TodoManager = TodoManager;
    this.todoContentSection = document.querySelector('#todo-content');
    this.selectedTodoGrouping = document.querySelector('#selected-grouping');
  }

  renderSelectedGroup(navListItem: HTMLLIElement) {
    this.selectedTodoGrouping.innerHTML = '';
    const todoParentTitle = this.createElement<HTMLHeadingElement>('H1');
    todoParentTitle.textContent =
      navListItem.querySelector('.list-item-title').textContent;
    this.selectedTodoGrouping.append(todoParentTitle);

    if (navListItem.id === 'all-tasks') {
    }

    if (navListItem.id === 'today-tasks') {
    }

    if (navListItem.id === 'week-tasks') {
    }

    if (navListItem.id === 'urgent-tasks') {
    }

    if (navListItem.dataset.todo) {
      const todoToRender = this.TodoManager.getTodo(
        Number(navListItem.dataset.todo),
        this.TodoManager.getTopLevelTodos(),
      );

      todoToRender.children.forEach((childTodo) => {
        this.selectedTodoGrouping.append(
          createListItemFromObject(childTodo, 'todo-list'),
        );
      });
    }
  }
}

export default TodoContentUIManager;
