import { Task } from './interfaces';
import tasksUrl from './tasksUrl';
import parseTaskDateProps from './parseTaskDateProps';

async function getTasksFromDB() {
  try {
    const response = await fetch(tasksUrl);
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const tasks = (await response.json()) as Task[];
    const tasksDatePropsParsed = tasks.map((task) => parseTaskDateProps(task));
    return tasksDatePropsParsed;
  } catch (error) {
    console.error(error.message);
  }
  return [];
}

export default getTasksFromDB;
