interface Todo {
  todoID: number;
  title: string;
  dueDate: string | Date;
  isImportant: boolean;
  isCompleted: boolean;
}

let todoIDCounter = 0;
function TodoFactory(templateObj: {
  title: string;
  isImportant: boolean;
  dueDate: string | Date;
}): Todo {
  const todo = {
    todoID: todoIDCounter,
    title: templateObj.title,
    dueDate: templateObj.dueDate,
    isImportant: templateObj.isImportant,
    isCompleted: false,
  };

  // how do i make this work if templateObj has the description key?
  if (templateObj.hasOwnProperty('description'))
    todo.description = templateObj.description;

  todoIDCounter += 1;
  return todo;
}

export default TodoFactory;

/* loops through each key in argumentobj */
/* returns {} with key:value pairs */
/* title */
/* description */
/* dueDate */
/* priority */
/* notes */
/* checklist (sub steps) */
/* maybe add methods to the objects as well? */
