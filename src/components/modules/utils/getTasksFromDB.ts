import { Task } from './interfaces';
import tasksUrl from './tasksUrl';
import formatTaskDueDate from './formatTaskDueDate';

async function getTasksFromDB() {
  try {
    const response = await fetch(tasksUrl);
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const tasks = (await response.json()) as Task[];
    const tasksDueDateFormatted = tasks.map((task) =>
      task.dueDate ? formatTaskDueDate(task) : task,
    );
    return tasksDueDateFormatted;
  } catch (error) {
    console.error(error.message);
  }
  return [];
}

export default getTasksFromDB;
