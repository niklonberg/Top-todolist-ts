import { Task } from './interfaces';

function formatTaskDueDate(task: Task): Task {
  return {
    ...task,
    dueDate: new Date(task.dueDate),
  };
}

export default formatTaskDueDate;
