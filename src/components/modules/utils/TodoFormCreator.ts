import createElement from './createElement';

function TodoFormFactory() {
  return `
  <form action="#" id="todo-form">
    <label for="title">Title: </label>
    <input type="text" name="title" id="title"/>
    <label for="description">Description: </label>
    <input type="text" name="description" id="description"/>
    <label for="isUrgent">Urgent</label>
    <input type="checkbox" name="isUrgent" id="isUrgent"/>
    <label for="dueDate">Have a date its due for ?</label>
    <input type="date" name="dueDate" id="dueDate">
    <button type="submit">Confirm</button>
    <button type="button" class="cancel-form">Cancel</button>
  </form>
  `;
}

export default TodoFormFactory;
