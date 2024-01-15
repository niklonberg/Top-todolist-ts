import { format, formatISO } from 'date-fns';
import createElement from './createElement';
import { Todo } from './interfaces';
// import circleIcon from '../../../images/icons/circle.svg';

function createPriorityContainer(todo: Todo) {
  const priorityContainer = createElement('div', 'list-item-priority');
  const img = createElement('img', 'list-item-priority-icon');
  // img.src = icon source
  const text = createElement('span');
  text.textContent = `${todo.priority} Priority`;
  priorityContainer.append(img, text);
  return priorityContainer;
}

function createListDetailsContainer(todo: Todo) {
  const listDetails = createElement<HTMLDivElement>('DIV', 'list-item-details');
  const titleDetails = createElement<HTMLDivElement>('DIV');
  const title = createElement<HTMLHeadingElement>('H3', 'list-item-title');
  title.textContent = todo.title;
  const priority = createPriorityContainer(todo);
  titleDetails.append(title, priority);
  listDetails.append(titleDetails);
  return listDetails;
}

function createEditActionsContainer() {
  const editActions = createElement<HTMLDivElement>('DIV', 'list-item-edits');
  const options = createElement<HTMLDivElement>('DIV', 'item-options');
  const editBtn = createElement<HTMLButtonElement>('button', 'edit-item');
  editBtn.textContent = 'Edit';
  const deleteBtn = createElement<HTMLButtonElement>('button', 'delete-item');
  deleteBtn.textContent = 'Delete';
  options.append(editBtn, deleteBtn);
  editActions.append(options);
  return editActions;
}

function createCheckCompleteBtn(todo: Todo) {
  const checkCompleteBtn = createElement('button', 'toggle-complete-btn');
  checkCompleteBtn.setAttribute('aria-label', 'Toggle complete');
  if (todo.isCompleted) {
    checkCompleteBtn.classList.add('checked');
  }
  return checkCompleteBtn;
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
    // make element draggable
    let timeEle: HTMLTimeElement | HTMLParagraphElement;
    if (todo.description) {
      const p = createElement<HTMLParagraphElement>('p');
      p.textContent = todo.description;
      listDetails.append(p);
    }

    if (todo.dueDate) {
      timeEle = createElement<HTMLTimeElement>('time');
      timeEle.setAttribute(
        'datetime',
        formatISO(todo.dueDate, { representation: 'date' }),
      );
      timeEle.textContent = format(todo.dueDate, 'MMM do, ccc - yy');
    } else {
      timeEle = createElement<HTMLParagraphElement>('p');
      timeEle.textContent = 'No Due Date';
    }
    li.append(listDetails, timeEle);
  }

  li.append(editActions);
  return li;
}

export default createListItemFromObject;
