import { format, formatISO } from 'date-fns';
import createElement from './createElement';
import { Todo } from './interfaces';

function createListContainer(todo: Todo) {
  const li = createElement<HTMLLIElement>('LI', 'list-item');
  li.setAttribute('draggable', 'true');
  li.classList.add('draggable');
  if (todo.isCompleted) li.classList.add('todo-complete');
  li.dataset.todo = todo.todoID.toString();
  return li;
}

function createPriorityContainer(todo: Todo) {
  const priorityContainer = createElement('div', 'list-item-priority');
  const img = createElement('div', 'list-item-priority-icon');
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
  const container = createElement<HTMLDivElement>('DIV', 'list-item-edits');
  const editActions = createElement<HTMLDivElement>('DIV', 'edit-actions');
  const editBtn = createElement<HTMLButtonElement>('button', 'edit-item-btn');
  editBtn.classList.add('icon-btn');
  editBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/></svg>';
  const deleteBtn = createElement<HTMLButtonElement>('button', 'delete-item');
  deleteBtn.classList.add('icon-btn');
  deleteBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>';

  editActions.append(editBtn, deleteBtn);
  container.append(editActions);
  return container;
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
  const li = createListContainer(todo);
  const listDetails = createListDetailsContainer(todo);
  const editActions = createEditActionsContainer();

  if (destination === 'top-level') {
    li.append(listDetails);
  }

  if (destination === 'todo-list') {
    if (todo.description) {
      const p = createElement<HTMLParagraphElement>('p');
      p.setAttribute('aria-label', 'item description');
      p.textContent = todo.description;
      listDetails.append(p);
    }

    let timeEle: HTMLTimeElement | HTMLParagraphElement;
    if (todo.dueDate) {
      timeEle = createElement<HTMLTimeElement>('time');
      timeEle.setAttribute(
        'datetime',
        formatISO(todo.dueDate, { representation: 'date' }),
      );
      timeEle.textContent = format(todo.dueDate, "MMM do, ccc - ''yy");
    } else {
      timeEle = createElement<HTMLParagraphElement>('p');
      timeEle.textContent = 'No Due Date';
    }
    timeEle.classList.add('completion-date');
    editActions.prepend(timeEle);

    editActions.lastElementChild.prepend(createCheckCompleteBtn(todo));

    li.append(listDetails);
  }

  li.append(editActions);
  return li;
}

export default createListItemFromObject;
