import { Task } from './interfaces';

function parseTaskDueDate(task: Task): Task {
  const parsedSubtasksDuedate = task.subtasks.map((subtask) => ({
    ...subtask,
    dueDate: subtask.dueDate ? new Date(subtask.dueDate) : null,
  }));
  return {
    ...task,
    dueDate: new Date(task.dueDate),
    subtasks: parsedSubtasksDuedate,
  };
}

export default parseTaskDueDate;
