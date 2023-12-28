import createElement from './createElement';
import { Project, Todo } from './interfaces';

function createListItemFromObject<T>(object: T): HTMLLIElement {
  const li = createElement<HTMLLIElement>('LI', 'list-item');
}

export default createListItemFromObject;
