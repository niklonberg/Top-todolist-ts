import FormTemplateObj from './utils/FormTemplateObj';

export interface Todo {
  todoID: number;
  title: string;
  dueDate: string | Date;
  isImportant: boolean;
  isCompleted: boolean;
}

// templateObj is different when it is fed into projectfactory or todofactory
// here it has title, isImportant, dueDate and optionally a description

let todoIDCounter: number = 0;
function TodoFactory(templateObj: FormTemplateObj): Todo {
  const todo = {
    todoID: todoIDCounter,
    title: templateObj.title,
    dueDate: templateObj.dueDate,
    isImportant: templateObj.isImportant,
    isCompleted: false,
  };

  // how do i make this work if templateObj has the description key?
  /* if (templateObj.hasOwnProperty('description'))
    todo.description = templateObj.description; */
  // if i uncomment the above, an error occurs

  todoIDCounter += 1;
  return todo;
}

export default TodoFactory;
