import UIManager from './abstract/UIManager';
import createTodoForm from './utils/createTodoForm';
import TodoContentUIManager from './TodoContentUIManager';
import {
  FormTemplateObj,
  Todo,
  TodoManagerInterface,
  TodoListItemWithDataset,
} from './utils/interfaces';
import TodoFactory from './TodoFactory';

// think on how this could become a general FormManager
class TodoFormUIManager extends UIManager {
  mainContentSection: HTMLElement;

  constructor(
    private TodoManager: TodoManagerInterface,
    private ListUIManager: TodoContentUIManager,
  ) {
    super();
    this.TodoManager = TodoManager;
    this.ListUIManager = ListUIManager;
    this.mainContentSection = document.querySelector('#main-content');
    this.mainContentSection.addEventListener('click', (e) => {
      const target = e.target as Element;
      if (target.classList.contains('add-todo-btn')) {
        if (target.id === 'add-top-level-todo-btn') {
          this.TodoManager.resetSelectedTodo();
        }
        this.insertTodoForm();
      }
      /* pick up from here */
      if (target.classList.contains('edit-item')) {
        const li = target.closest('LI') as TodoListItemWithDataset;
        this.insertTodoForm(
          this.TodoManager.getTodo(
            Number(li.dataset.todo),
            this.TodoManager.getTopLevelTodos(),
          ),
        );
      }

      if ((e.target as Element).classList.contains('cancel-form-btn')) {
        this.ListUIManager.renderTodosSection();
      }
    });
  }

  insertTodoForm(todoToEdit: Todo = null) {
    this.mainContentSection.innerHTML = '';
    let form: HTMLFormElement;
    if (todoToEdit) {
      form = createTodoForm(todoToEdit);
    } else {
      form = createTodoForm();
    }
    form.addEventListener(
      'submit',
      (e) => this.submitForm(e, form, todoToEdit),
      {
        once: true,
      },
    );
    this.mainContentSection.append(form);
  }

  submitForm(e: Event, form: HTMLFormElement, todoToEdit: Todo | null) {
    e.preventDefault();
    const formData = new FormData(form);
    const tempObj: any = {};
    formData.forEach((value, key) => {
      tempObj[key] = value;
    });
    const FormTemplateObject: FormTemplateObj = tempObj;
    const newTodo = TodoFactory(FormTemplateObject);
    form.remove();
    if (todoToEdit) {
      this.TodoManager.editTodo(todoToEdit, newTodo);
    } else {
      this.TodoManager.addTodo(newTodo);
    }

    this.ListUIManager.renderTodosSection();
  }
}

export default TodoFormUIManager;
