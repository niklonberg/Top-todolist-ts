import { FormTemplateObj, Todo } from './utils/interfaces';

let todoIDCounter: number = 0;
function TodoFactory(templateObj: FormTemplateObj): Todo {
  const todo: Todo = {
    todoID: todoIDCounter,
    title: templateObj.title,
    isUrgent: templateObj.isUrgent || false,
    isCompleted: false,
    dateCompleted: null,
    dueDate: templateObj.dueDate || null, // ensure correct creation of date object
    description: templateObj.description,
    children: [],
  };

  todoIDCounter += 1;
  return todo;
}

export default TodoFactory;
