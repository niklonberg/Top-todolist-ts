import createElement from './createElement';
import { Todo } from './interfaces';

function createListDetailsContainer(todo: Todo) {
  const listDetails = createElement<HTMLDivElement>('DIV', 'list-item-details');
  const title = createElement<HTMLHeadingElement>('H3', 'list-item-title');
  title.textContent = todo.title;
  listDetails.append(title);
  return listDetails;
}

function createEditActionsContainer() {
  const editActions = createElement<HTMLDivElement>('DIV', 'list-item-edits');
  const editBtn = createElement('button', 'edit-item');
  editBtn.textContent = 'Edit';
  const deleteBtn = createElement('button', 'delete-item');
  deleteBtn.textContent = 'Delete';
  editActions.append(editBtn, deleteBtn);
  return editActions;
}

function createListItemFromObject(
  todo: Todo,
  destination: 'top-level' | 'todo-list',
): HTMLLIElement {
  const li = createElement<HTMLLIElement>('LI', 'list-item');
  li.dataset.todo = todo.todoID.toString();
  const listDetails = createListDetailsContainer(todo);
  const editActions = createEditActionsContainer();

  // do top level todos specific things
  if (destination === 'top-level') {
    // make element draggable

    li.append(listDetails);
  }

  // do child todo specific things
  if (destination === 'todo-list') {
    let timeEle: HTMLTimeElement | HTMLParagraphElement;
    if (todo.description) {
      const p = createElement('p');
      p.textContent = todo.description;
      listDetails.append(p);
    }

    if (todo.dueDate) {
      // timeEle.setAttribute('datetime', todo.dueDate)
      // timeEle.textContent = format(value, "MMMM do, ccc - yyyy");
    } else {
      timeEle = createElement<HTMLParagraphElement>('p');
      timeEle.textContent = 'No Due Date';
    }
    li.append(listDetails);
    li.append(timeEle);
  }

  li.append(editActions);
  return li;
}

export default createListItemFromObject;
