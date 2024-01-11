import createElement from './createElement';
import { Todo } from './interfaces';

function createTodoForm(todoToEdit?: Todo) {
  const form = createElement<HTMLFormElement>('form', 'todo-form');
  const templateStr = `
  <div class="input-container">
    <label for="title" class="text-input-label">Title</label>
    <span class="required-input">Required</span>
    <input
      class="text-input"
      type="text"
      name="title"
      id="title"
      value="${todoToEdit.title}"
      required
    />
  </div>
  <div class="input-container">
    <label for="description" class="text-input-label"
      >Description
    </label>
    <input
      type="text"
      name="description"
      id="description"
      class="text-input"
      value="${todoToEdit.description}"
    />
  </div>
  <div class="input-container">
    <label for="priority">Priority</label>
    <select id="priority" name="priority">
      <option value="low" ${
        todoToEdit.priority === 'Low' ? 'selected' : ''
      } >Low</option>
      <option value="medium" ${
        todoToEdit.priority === 'Medium' ? 'selected' : ''
      }>Medium</option>
      <option value="high" ${
        todoToEdit.priority === 'High' ? 'selected' : ''
      }>High</option>
    </select>
  </div>
  <div class="input-container">
    <label for="dueDate">Duedate</label>
    <input type="date" name="dueDate" id="dueDate" />
  </div>
  <button type="submit" class="submit-form-btn">Confirm</button>
  <button type="button" class="cancel-form-btn">Cancel</button>
  `;
  form.innerHTML = templateStr;
  return form;
}

export default createTodoForm;
