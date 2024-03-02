import { TaskManagerInterface, TaskListItem } from './interfaces';

function getDragAfterElement(container: HTMLElement, y: number) {
  const draggableElements = [
    ...container.querySelectorAll('.draggable:not(.dragging)'),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const boundingBox = child.getBoundingClientRect();
      const offset = y - boundingBox.top - boundingBox.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child } as {
          offset: number;
          element: Element;
        };
      }
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY } as {
      offset: number;
      element: Element;
    },
  ).element;
}

function addDragFunctionality(
  ul: HTMLUListElement,
  dataManager?: TaskManagerInterface,
) {
  const listItems = [...ul.children];
  listItems.forEach((li) => {
    li.setAttribute('draggable', 'true');
    li.classList.add('draggable');
  });
  // ul.addEventListener('dragstart', (e) => {
  //   const target = e.target as HTMLElement;
  //   if (target.classList.contains('draggable'))
  //     target.classList.add('dragging');
  //   ul.classList.add('highlight-drag-area');
  // });
  // ul.addEventListener('dragend', (e) => {
  //   const target = e.target as HTMLElement;
  //   if (target.classList.contains('draggable'))
  //     target.classList.remove('dragging');
  //   const todoItems = [...ul.querySelectorAll('.list-item')];
  //   console.log('target: ', target);
  //   console.log(todoItems.indexOf(target));
  //   dataManager?.reorderTodo(
  //     todoItems.indexOf(target),
  //     target as TaskListItem,
  //   );
  //   ul.classList.remove('highlight-drag-area');
  // });
  // ul.addEventListener('dragover', (e) => {
  //   e.preventDefault();
  //   const afterElement = getDragAfterElement(ul, e.clientY);
  //   const dragElement = ul.querySelector('.dragging');
  //   if (afterElement == null) {
  //     ul.appendChild(dragElement);
  //   } else {
  //     ul.insertBefore(dragElement, afterElement);
  //   }
  // });
}

export default addDragFunctionality;
