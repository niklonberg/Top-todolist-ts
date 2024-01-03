// is this no longer needed? perhaps
function createElement<T extends HTMLElement>(
  type: string = 'div',
  classname: string = '',
  id: string = '',
) {
  const ele = document.createElement(type) as T;
  if (classname) ele.classList.add(classname);
  if (id) ele.setAttribute('id', id);
  return ele;
}

export default createElement;
