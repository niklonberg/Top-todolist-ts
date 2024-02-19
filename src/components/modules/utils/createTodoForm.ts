import { format } from 'date-fns';
import createElement from './createElement';
import { Task } from './interfaces';

// TODO: REFACTOR ME
function createTodoForm(todoToEdit?: Task) {
  console.log('task to edit: ', todoToEdit);
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
      value="${todoToEdit?.title || ''}"
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
      value="${todoToEdit?.description || ''}"
    />
  </div>
  <div class="input-container">
    <label for="priority">Priority</label>
    <select id="priority" name="priority">
      <option value="Low" ${
        todoToEdit?.priority === 'Low' ? 'selected' : ''
      } >Low</option>
      <option value="Medium" ${
        todoToEdit?.priority === 'Medium' ? 'selected' : ''
      }>Medium</option>
      <option value="High" ${
        todoToEdit?.priority === 'High' ? 'selected' : ''
      }>High</option>
    </select>
  </div>
  <div class="input-container">
    <label for="dueDate">Duedate</label>
    <input type="date" name="dueDate" id="dueDate" ${
      todoToEdit?.dueDate instanceof Date
        ? `value=${format(todoToEdit.dueDate, 'yyyy-MM-dd')}`
        : `value=''`
    } />
  </div>
  <button type="submit" class="filled-btn">Confirm</button>
  <button type="button" class="filled-btn" id="cancel-form-btn">Cancel</button>
  `;
  form.innerHTML = templateStr;
  return form;
}

export default createTodoForm;
