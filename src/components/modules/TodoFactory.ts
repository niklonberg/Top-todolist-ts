import FormTemplateObj from './utils/FormTemplateObj';

export interface Todo {
  todoID: number;
  title: string;
  dueDate: string | Date;
  isImportant: boolean;
  isCompleted: boolean;
  description?: string;
}

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

  todoIDCounter += 1;
  return todo;
}

export default TodoFactory;
