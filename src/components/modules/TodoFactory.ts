import { FormTemplateObj, Todo } from './utils/interfaces';

let todoIDCounter: number = 0;
function TodoFactory(templateObj: FormTemplateObj): Todo {
  const todo: Todo = {
    todoID: todoIDCounter,
    title: templateObj.title,
    isUrgent: templateObj.isUrgent,
    isCompleted: false,
    dateCompleted: null,
    dueDate: templateObj.dueDate,
    description: templateObj.description,
    children: [],
  };

  todoIDCounter += 1;
  return todo;
}

export default TodoFactory;
