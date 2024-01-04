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

function createListContainers(object: any) {
  const listDetails = createListDetailsContainer(object);
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

// how can i get this function to understand when it has a Project or a Todo
function createListItemFromObject(
  todo: Todo,
  destination: string,
): HTMLLIElement {
  const li = createElement<HTMLLIElement>('LI', 'list-item');
  const [listDetails, editActions] = createListContainers(todo);

  // do project specific things
  if (destination === 'top-level') {
    // now we know we have a project
    li.dataset.project = todo.todoID.toString();

    li.appendChild(createDragIcon());
  }

  // do todo specific things
  // if ('todoID' in object) {
  // now we know we have a todo
  // li.dataset.todo = object.todoID.toString();
  // if (object.description) {
  //   const p = createElement('p');
  //   p.textContent = object.description;
  //   listDetails.append(p)
  // }

  // if (object.dueDate) {

  // }
  // }

  li.append(listDetails, editActions);

  return li;
}

export default createListItemFromObject;
