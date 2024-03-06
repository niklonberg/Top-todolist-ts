import { Task } from './interfaces';

function parseTaskDateProps(task: Task): Task {
  const parsedSubtasksDateProps = task.subtasks.map((subtask) => ({
    ...subtask,
    dueDate: subtask.dueDate ? new Date(subtask.dueDate) : null,
    dateCompleted: subtask.dateCompleted
      ? new Date(subtask.dateCompleted)
      : null,
  }));
  return {
    ...task,
    dueDate: task.dueDate ? new Date(task.dueDate) : null,
    dateCompleted: task.dateCompleted ? new Date(task.dateCompleted) : null,
    subtasks: parsedSubtasksDateProps,
  };
}

export default parseTaskDateProps;
