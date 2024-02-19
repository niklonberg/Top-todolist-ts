import './index.css';
import TaskManager from './components/modules/TaskManager';
import TaskUIManager from './components/modules/TaskUIManager';
import HeaderNavbarUIManager from './components/modules/HeaderNavbarUIManager';
import TodoFormUIManager from './components/modules/TodoFormUIManager';
import tasksUrl from './components/modules/utils/tasksUrl';
import getTasksFromDB from './components/modules/utils/getTasksFromDB';

async function init() {
  const tasks = await getTasksFromDB();
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
