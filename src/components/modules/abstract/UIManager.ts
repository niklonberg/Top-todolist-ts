abstract class UIManager {
  // eslint-disable-next-line class-methods-use-this
  createElement<T extends HTMLElement>(
    type: string = 'div',
    classname: string = '',
    id: string = '',
  ) {
    const ele = document.createElement(type) as T;
    if (classname) ele.classList.add(classname);
    if (id) ele.setAttribute('id', id);
    return ele;
  }

  // eslint-disable-next-line class-methods-use-this
  hideElement(elementToHide: Element) {
    elementToHide.classList.add('hidden');
  }

  // eslint-disable-next-line class-methods-use-this
  showElement(elementToShow: Element) {
    elementToShow.classList.remove('hidden');
  }
}

export default UIManager;
