function createElement(
  type: string = 'div',
  classname: string = '',
  id: string = '',
) {
  // missing return type above
  const ele = document.createElement(type);
  if (classname) ele.classList.add(classname);
  if (id) ele.setAttribute('id', id);
  return ele; // how can i get this to return the correct type?
  // so if it has an li element we create, the type is set correctly to HTMLLIElement
  // at the moment it is just HTMLElement returned it looks like
}

export default createElement;
