import createElement from './createElement';

function createTodoForm() {
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
    />
  </div>
  <div class="input-container">
    <label for="priority">Priority</label>
    <select id="priority" name="priority">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
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
