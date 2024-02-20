import './index.css';
import TaskManager from './components/modules/TaskManager';
import TaskUIManager from './components/modules/TaskUIManager';
import HeaderNavbarUIManager from './components/modules/HeaderNavbarUIManager';
import TaskFormUIManager from './components/modules/TaskFormUIManager';
import tasksUrl from './components/modules/utils/tasksUrl';
import getTasksFromDB from './components/modules/utils/getTasksFromDB';

async function init() {
  const tasks = await getTasksFromDB();
  const MyTaskManager = new TaskManager(tasks, tasksUrl);
  const MyTaskUIManager = new TaskUIManager(
    MyTaskManager,
    'main-content',
    new TaskFormUIManager(),
  );
  const MyHeaderNavbarManager = new HeaderNavbarUIManager(MyTaskUIManager);

  MyTaskManager.onTaskFormSubmitSuccess(() => {
    MyTaskUIManager.renderTasksSection();
  });
}

init();
