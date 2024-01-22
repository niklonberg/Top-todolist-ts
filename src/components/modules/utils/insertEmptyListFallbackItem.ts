import createElement from './createElement';

function emptyListFallbackItem() {
  const li = createElement('li', 'list-item');
  const h3 = createElement('h3');
  h3.textContent = 'No items found';
  li.append(h3);
  return li;
}

function insertEmptyListFallbackItem(ul: HTMLUListElement) {
  if (ul.childNodes.length === 0) ul.append(emptyListFallbackItem());
}

export default insertEmptyListFallbackItem;
