import { Task } from './interfaces';

function parseTaskDueDate(task: Task): Task {
  return {
    ...task,
    dueDate: new Date(task.dueDate),
  };
}

export default parseTaskDueDate;
