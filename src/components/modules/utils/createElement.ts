function createElement(
  eleType: string = 'div',
  className: string = '',
  idName: string = '',
) {
  // missing return type above
  const ele = document.createElement(eleType);
  if (className) ele.classList.add(className);
  if (idName) ele.setAttribute('id', idName);
  return ele; // how can i get this to return the correct type?
  // so if it has an li element we create, the type is set correctly to HTMLLIElement
  // at the moment it is just HTMLElement returned it looks like
}

export default createElement;
