import './index.css';
import TaskManager from './components/modules/TaskManager';
import TaskUIManager from './components/modules/TaskUIManager';
import HeaderNavbarUIManager from './components/modules/HeaderNavbarUIManager';
import TodoFormUIManager from './components/modules/TodoFormUIManager';

async function init() {
  const tasks = await getTasks();
  const tasksUrl = 'http://localhost:3000/tasks';
  const MyTaskManager = new TaskManager(tasks, tasksUrl);
  const MyTaskUIManager = new TaskUIManager(
    MyTaskManager,
    'main-content',
    new TodoFormUIManager(),
  );
  const MyHeaderNavbarManager = new HeaderNavbarUIManager(MyTaskUIManager);

  MyTaskManager.onTaskFormSubmitSuccess(() => {
    MyTaskUIManager.renderTasksSection();
  });
}

init();

/* TESTING */

async function getTasks() {
  const url = 'http://localhost:3000/tasks';
  try {
    const response = await fetch(url);
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
