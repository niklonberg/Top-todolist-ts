import { format } from 'date-fns';
import createElement from './createElement';
import { Task } from './interfaces';

function createTaskForm(taskToEdit?: Task) {
  const form = createElement<HTMLFormElement>('form', 'task-form');
  const templateStr = `
  <div class="input-container">
    <label for="title" class="text-input-label">Title</label>
    <span class="required-input">Required</span>
    <input
      class="text-input"
      type="text"
      name="title"
      id="title"
      value="${taskToEdit?.title || ''}"
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
      value="${taskToEdit?.description || ''}"
    />
  </div>
  <div class="input-container select-container">
    <label for="priority">Priority:</label>
    <select id="priority" class="priority-select" name="priority">
      <option value="Low" ${
        taskToEdit?.priority === 'Low' ? 'selected' : ''
      } >Low</option>
      <option value="Medium" ${
        taskToEdit?.priority === 'Medium' ? 'selected' : ''
      }>Medium</option>
      <option value="High" ${
        taskToEdit?.priority === 'High' ? 'selected' : ''
      }>High</option>
    </select>
  </div>
  <div class="input-container">
    <label for="dueDate">Duedate:</label>
    <input type="date" class="date-select" name="dueDate" id="dueDate" ${
      taskToEdit?.dueDate instanceof Date
        ? `value=${format(taskToEdit.dueDate, 'yyyy-MM-dd')}`
        : `value=''`
    } />
  </div>
  <div class="task-form-actions">
    <button type="button" class="btn outlined-btn" id="cancel-form-btn">Cancel</button>
    <button type="submit" class="btn filled-btn raised-btn">Confirm</button>
  </div>
  `;
  form.innerHTML = templateStr;
  return form;
}

export default createTaskForm;
