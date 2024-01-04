class UIManager {
  // do our child classes actually use this static method??
  static createElement<T extends HTMLElement>(
    type: string = 'div',
    classname: string = '',
    id: string = '',
  ) {
    const ele = document.createElement(type) as T;
    if (classname) ele.classList.add(classname);
    if (id) ele.setAttribute('id', id);
    return ele;
  }
}

export default UIManager;
