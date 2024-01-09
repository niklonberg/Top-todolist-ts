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
      if (li.parentElement.id === 'top-level-todos') {
        this.updateSubTodoList(li as TodoListItemWithDataset); // why do i gotta say as
      }

      if (li.parentElement.id === 'selected-sub-todos') {
        // do something else
      }
    });
  }

  createList(listID: string) {
    return this.createElement<HTMLUListElement>('ul', 'todos-list', listID);
  }

  renderTopLevelTodosList() {
    const topLevelTodosList = this.createList('top-level-todos');
    this.TodoManager.getTopLevelTodos().forEach((todo) =>
      topLevelTodosList.append(createListItemFromObject(todo, 'top-level')),
    );
    return topLevelTodosList;
  }

  renderSelectedSubTodosList(todoItem: TodoListItemWithDataset) {
    const selectedSubTodosList = this.createList('selected-sub-todos');
    this.TodoManager.getTodo(
      Number(todoItem.dataset.todo),
      this.TodoManager.getTopLevelTodos(),
    ).children.forEach((childTodo) => {
      selectedSubTodosList.append(
        createListItemFromObject(childTodo, 'todo-list'),
      );
    });
    return selectedSubTodosList;
  }

  renderTasksSection() {
    this.mainContentSection.innerHTML = '';
    const tasksLayoutContainer = this.createElement('div', '', 'todos-layout');
    const topLevelTodosList = this.renderTopLevelTodosList();
    const selectedSubTodosList = this.renderSelectedSubTodosList(
      topLevelTodosList.firstElementChild as TodoListItemWithDataset,
    ); // why do i gotta say as
    tasksLayoutContainer.append(topLevelTodosList, selectedSubTodosList);
    this.mainContentSection.append(tasksLayoutContainer);
  }

  updateSubTodoList(todoItem: TodoListItemWithDataset) {}

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
