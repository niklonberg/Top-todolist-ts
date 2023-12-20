import createElement from './createElement';

function createBaseGroupHTML(listGroupSelection: HTMLLIElement) {
  const h1: HTMLHeadingElement = createElement(
    'h1',
    'test',
    'grouping-title',
  ); /* as HTMLHeadingElement */
  h1.textContent =
    listGroupSelection?.querySelector('h3').textContent ?? 'All Tasks';

  const list: HTMLUListElement = createElement(
    'ul',
    'test2',
    'curr-grouping-todos',
  ); /* as HTMLUListElement */

  return [h1, list];
}

export default createBaseGroupHTML;
