import UIManager from './UIManager';
import TodoFormFactory from './utils/TodoFormCreator';
import createListItemFromObject from './utils/createListItemFromObject';
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
          .replaceWith(
            this.renderSelectedSubTodosList(
              li as TodoListItemWithDataset,
            ).querySelector('ul'),
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

  renderTopLevelTodosList() {
    const todosListContainer = this.createTodosListContainer('To Do');
    const ul = this.createList('top-level-todos');
    this.TodoManager.getTopLevelTodos().forEach((todo) =>
      ul.append(createListItemFromObject(todo, 'top-level')),
    );
    todosListContainer.append(ul);
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

    // if ul has no children... APPEND single li to it with 'No subtasks' title

    todosListContainer.append(ul);

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
    // append buttons

    todosLayoutContainer.append(topLevelTodosList, selectedSubTodosList);
    this.mainContentSection.append(todosLayoutContainer);
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
