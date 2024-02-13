import { format, formatISO, differenceInDays, addDays } from 'date-fns';
import createElement from './createElement';
import { Task } from './interfaces';

function createListContainer(task: Task) {
  const li = createElement<HTMLLIElement>('LI', 'list-item');
  li.setAttribute('draggable', 'true');
  li.classList.add('draggable');
  if (task.isCompleted) li.classList.add('task-complete');
  if (task._id) {
    li.dataset.task = task._id.toString();
  }
  return li;
}

function createPriorityContainer(task: Task) {
  const priorityContainer = createElement('div', 'list-item-priority');
  const img = createElement('div', 'list-item-priority-icon');
  const text = createElement('span');
  text.textContent = `${task.priority} Priority`;
  priorityContainer.append(img, text);
  return priorityContainer;
}

function createListDetailsContainer(task: Task) {
  const listDetails = createElement<HTMLDivElement>('DIV', 'list-item-details');
  const title = createElement<HTMLHeadingElement>('H3', 'list-item-title');
  title.textContent = task.title;
  const priority = createPriorityContainer(task);
  listDetails.append(title, priority);
  return listDetails;
}

function createEditActionsContainer() {
  const container = createElement<HTMLDivElement>('DIV', 'list-item-edits');
  const editActions = createElement<HTMLDivElement>('DIV', 'edit-actions');
  const editBtn = createElement<HTMLButtonElement>('button', 'edit-item-btn');
  editBtn.classList.add('icon-btn');
  editBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/></svg>';
  const deleteBtn = createElement<HTMLButtonElement>(
    'button',
    'delete-item-btn',
  );
  deleteBtn.classList.add('icon-btn');
  deleteBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>';

  editActions.append(editBtn, deleteBtn);
  container.append(editActions);
  return container;
}

function createCheckCompleteBtn(task: Task) {
  const checkCompleteBtn = createElement('button', 'toggle-complete-btn');
  checkCompleteBtn.setAttribute('aria-label', 'Toggle complete');
  if (task.isCompleted) {
    checkCompleteBtn.classList.add('checked');
  }
  return checkCompleteBtn;
}

export function createDateCompleted(task: Task) {
  const dateCompleted = createElement<HTMLTimeElement>(
    'time',
    'completion-date',
  );
  const now = new Date();
  const dayDifference = differenceInDays(task.dateCompleted, now);
  let dateText = 'Completed: ';
  if (dayDifference < 1) {
    dateText += 'Today';
  } else if (dayDifference < 2) {
    dateText += '1 day ago';
  } else if (dayDifference < 7) {
    dateText += `${dayDifference} days ago`;
  } else {
    dateText += 'Over 1 week ago';
  }
  dateCompleted.textContent = dateText;
  dateCompleted.setAttribute(
    'datetime',
    formatISO(task.dateCompleted, { representation: 'date' }),
  );
  return dateCompleted;
}

function createListItemFromObject(
  task: Task,
  destination: 'top-level' | 'subtask',
) {
  const li = createListContainer(task);
  const listDetails = createListDetailsContainer(task);
  const editActions = createEditActionsContainer();

  if (destination === 'top-level') {
    li.append(listDetails);
  }

  if (destination === 'subtask') {
    if (task.description) {
      const p = createElement<HTMLParagraphElement>('p');
      p.setAttribute('aria-label', 'item description');
      p.textContent = task.description;
      listDetails.append(p);
    }

    let timeEle: HTMLTimeElement | HTMLParagraphElement;
    if (task.dueDate) {
      timeEle = createElement<HTMLTimeElement>('time');
      timeEle.setAttribute(
        'datetime',
        formatISO(task.dueDate, { representation: 'date' }),
      );
      timeEle.textContent = format(task.dueDate, "MMM do, ccc - ''yy");
    } else {
      timeEle = createElement<HTMLParagraphElement>('p');
      timeEle.textContent = 'No Due Date';
    }
    timeEle.classList.add('deadline-date');
    timeEle.setAttribute('aria-label', 'deadline date');
    editActions.prepend(timeEle);

    if (task.dateCompleted) {
      li.append(createDateCompleted(task));
    }

    editActions.lastElementChild.prepend(createCheckCompleteBtn(task));

    li.append(listDetails);
  }

  li.append(editActions);
  return li;
}

export default createListItemFromObject;
