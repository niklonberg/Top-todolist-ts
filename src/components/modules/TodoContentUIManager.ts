import UIManager from './UIManager';
import TodoFormFactory from './utils/TodoFormCreator';
import createListItemFromObject from './utils/createListItemFromObject';
import { TodoManagerInterface, FormTemplateObj } from './utils/interfaces';
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
  }

  createList(listID: string) {
    return this.createElement<HTMLUListElement>('ul', '', listID);
  }

  renderTasksSection() {
    this.mainContentSection.innerHTML = '';
    const tasksLayoutContainer = this.createElement('div', '', 'todos-layout');
    const topLevelTodosList = this.renderTopLevelTodosList();
    const selectedSubTodosList = this.createList('selected-sub-todos');
    topLevelTodosList.addEventListener('click', (e) =>
      this.renderSelectedSubTodosList(e),
    ); // do we need event listeners for each list?
    // add eventListeners
    tasksLayoutContainer.append(topLevelTodosList, selectedSubTodosList);
    this.mainContentSection.append(tasksLayoutContainer);
  }

  renderTopLevelTodosList() {
    const topLevelTodosList = this.createList('top-level-todos-list');
    this.TodoManager.getTopLevelTodos().forEach((todo) =>
      topLevelTodosList.append(createListItemFromObject(todo, 'top-level')),
    );
    return topLevelTodosList;
  }

  renderSelectedSubTodosList(e: Event) {
    const todoItem = (e.target as Element).closest('LI') as HTMLLIElement;
    // i break if you dont click an li inside this topLevelTodosList
    // if (todoItem.dataset.todo) {
    //   this.selectedSubTodosList.innerHTML = '';
    //   this.TodoManager.getTodo(
    //     Number(todoItem.dataset.todo),
    //     this.TodoManager.getTopLevelTodos(),
    //   ).children.forEach((childTodo) => {
    //     this.selectedSubTodosList.append(
    //       createListItemFromObject(childTodo, 'todo-list'),
    //     );
    //   });
    // }
  }

  // put form management into seperate class??
  addChildTodoForm() {
    if (!this.mainContentSection.querySelector('form')) {
      const form = TodoFormFactory();
      form.addEventListener('submit', (e) => this.submitForm(e, form), {
        once: true,
      });

      this.mainContentSection.append(form);
    }
  }

  // put form management into seperate class??
  submitForm(e: Event, form: HTMLFormElement) {
    e.preventDefault();
    const formData = new FormData(form);
    const tempObj: any = {};
    formData.forEach((value, key) => {
      tempObj[key] = value;
    });
    const FormTemplateObject: FormTemplateObj = tempObj;
    const todo = TodoFactory(FormTemplateObject);
    form.remove();

    this.TodoManager.addChildTodoToCurrSelectedTodo(todo);
    // reRender whatever was edited
  }
}

export default TodoContentUIManager;

/* 
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

    this.showElement(this.createChildTodoBtn);
  }
   */
