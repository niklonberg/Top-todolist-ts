interface Todo {
  todoID: number;
  isCompleted: boolean;
  isImportant: boolean;
}

let todoIDCounter = 0;
function TodoFactory(obj): Todo {
  const todo = {};
  todo.todoID = todoIDCounter;
  todo.isCompleted = false;
  todo.isImportant = false;

  // how do i make an interface work with optional properties/keys below?

  for (const [key, value] of Object.entries(obj)) {
    todo[key] = value;
  }

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
