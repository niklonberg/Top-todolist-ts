import createElement from './createElement';
import { Project, Todo } from './interfaces';
// how can i use my Project and Todo interface in the below function

function createListItemFromObject<T extends Project>(object: T): HTMLLIElement {
  const li = createElement<HTMLLIElement>('LI', 'list-item');

  if ('projectID' in object) {
    // do project specific things
    li.dataset.projectID = object.projectID;
  }

  if ('todoID' in object) {
    // do todo specific things
  }

  // do general things

  return li;
}

export default createListItemFromObject;
