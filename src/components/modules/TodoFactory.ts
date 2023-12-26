import { FormTemplateObj, Todo } from './utils/interfaces';

let todoIDCounter: number = 0;
function TodoFactory(templateObj: FormTemplateObj): Todo {
  const todo: Todo = {
    todoID: todoIDCounter,
    title: templateObj.title,
    dueDate: templateObj.dueDate,
    isImportant: templateObj.isImportant,
    isCompleted: false,
    description: templateObj.description,
  };

  // add incrementing of TodoID method

  todoIDCounter += 1;
  return todo;
}

export default TodoFactory;
