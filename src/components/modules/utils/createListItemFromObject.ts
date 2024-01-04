import createElement from './createElement';
import { Todo } from './interfaces';

function createListDetailsContainer(object: any) {
  const listDetails = createElement<HTMLDivElement>('DIV', 'list-item-details');
  const title = createElement<HTMLHeadingElement>('H3', 'list-item-title');
  title.textContent = object.title;
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

function createListContainers(todo: Todo) {
  const listDetails = createListDetailsContainer(todo);
  const editActions = createEditActionsContainer();

  return [listDetails, editActions];
}

function createDragIcon() {
  const img = createElement<HTMLImageElement>('img');
  img.src = './src/images/drag.png'; // would like this to always find the img
  img.alt = '';
  img.height = 25;
  img.width = 25;
  return img;
}

function createListItemFromObject(
  todo: Todo,
  destination: string,
): HTMLLIElement {
  const li = createElement<HTMLLIElement>('LI', 'list-item');
  li.dataset.todo = todo.todoID.toString();
  const [listDetails, editActions] = createListContainers(todo);

  // do top level todos specific things
  if (destination === 'top-level') {
    // now we know we have a project

    li.appendChild(createDragIcon());
  }

  // do todo specific things
  if (destination === 'todo-list') {
    if (todo.description) {
      const p = createElement('p');
      p.textContent = todo.description;
      listDetails.append(p);
    }

    if (todo.dueDate) {
    }
  }

  li.append(listDetails, editActions);

  return li;
}

export default createListItemFromObject;
