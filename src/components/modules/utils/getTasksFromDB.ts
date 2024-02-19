import tasksUrl from './tasksUrl';

async function getTasksFromDB() {
  try {
    const response = await fetch(tasksUrl);
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error(error.message);
  }
  return [];
}

export default getTasksFromDB;
