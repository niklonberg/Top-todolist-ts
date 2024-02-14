import './index.css';
import TaskManager from './components/modules/TaskManager';
import TaskUIManager from './components/modules/TaskUIManager';
import HeaderNavbarUIManager from './components/modules/HeaderNavbarUIManager';
import TodoFormUIManager from './components/modules/TodoFormUIManager';
// to be removed later - here for testing
import { newTaskFormData } from './components/modules/utils/interfaces';
import TaskFactory from './components/modules/TaskFactory';

async function init() {
  const tasks = await getTasks();
  const MyTaskManager = new TaskManager(tasks);
  const MyTaskUIManager = new TaskUIManager(
    MyTaskManager,
    'main-content',
    new TodoFormUIManager(),
  );
  const MyHeaderNavbarManager = new HeaderNavbarUIManager(MyTaskUIManager);
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
    const users = await response.json();
    return users;
  } catch (error) {
    console.error(error.message);
  }
  return [];
}

const getUsersTasksBtn = document.querySelector('#get-users-tasks');
getUsersTasksBtn.addEventListener('click', () => {
  getTasks();
});

async function getTask(id: string) {
  const url = `http://localhost:3000/tasks/${id}`;
  try {
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      const serverErrorMessage = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, message: ${serverErrorMessage}`,
      );
    }
    const user = await response.json();
    console.log(user);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const getUsersTaskBtn = document.querySelector('#get-users-task');
getUsersTaskBtn.addEventListener('click', () => {
  getTask('65b8ca220ef08592b35d3f2a');
});

const testForm = document.querySelector('#test-create-form') as HTMLFormElement;
testForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(testForm);
  const formDataObject: Record<keyof newTaskFormData, string> =
    Object.fromEntries(formData.entries()) as Record<
      keyof newTaskFormData,
      string
    >;
  const newTask = TaskFactory(formDataObject);
  try {
    const response = await fetch('http://localhost:3000/tasks/createTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorMessage}`,
      );
    }

    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error('Error:', error.message);
  }
});

/* ***Ignore***

function init() {
  const MyTodoManager = new TodoManager();
  const MyTodoContentUIManager = new TodoContentUIManager(
    MyTodoManager,
    'main-content',
    new TodoFormUIManager(),
  );
  const MyHeaderNavbarManager = new HeaderNavbarUIManager(
    MyTodoContentUIManager,
  );

  // const childTodoOne = TodoFactory({
  //   title: 'Paint Walls',
  //   priority: 'High',
  //   dueDate: addDays(new Date(), 3),
  // });
  // childTodoOne.isCompleted = true;
  // childTodoOne.dateCompleted = new Date();
  // const childTodoTwo = TodoFactory({
  //   title: 'Paint Bedroom',
  //   priority: 'Medium',
  //   description: 'Hi mom',
  //   dueDate: new Date(),
  // });
  // const childTodoThree = TodoFactory({
  //   title: 'Move Bed',
  //   priority: 'Low',
  //   description: 'lift it properly',
  // });
  // const childTodoFour = TodoFactory({
  //   title: 'Move closet',
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //   dueDate: new Date(),
  // });
  // const childTodoFive = TodoFactory({
  //   title: 'Move bed',
  //   description: 'lift gently',
  // });
  // const topLevelTodoOne = TodoFactory({
  //   title: 'Paint house',
  //   priority: 'Low',
  // });
  // const topLevelTodoTwo = TodoFactory({
  //   title: 'Refurnish Bedroomdkfsksdfkjsdfksdkfksdfdskf',
  //   priority: 'Medium',
  // });
  // const topLevelTodoThree = TodoFactory({
  //   title: 'Clean Laboratory',
  //   priority: 'High',
  // });
  // MyTodoManager.addTodo(topLevelTodoOne);
  // MyTodoManager.addTodo(topLevelTodoTwo);
  // MyTodoManager.addTodo(topLevelTodoThree);
  // MyTodoManager.setSelectedTodo(5);
  // MyTodoManager.addTodo(childTodoOne);
  // MyTodoManager.addTodo(childTodoTwo);
  // MyTodoManager.addTodo(childTodoThree);
  // MyTodoManager.setSelectedTodo(6);
  // MyTodoManager.addTodo(childTodoFour);
  // MyTodoManager.addTodo(childTodoFive);
  // MyTodoManager.setSelectedTodo(MyTodoManager.getTopLevelTodos()[2].todoID);
  // console.log(MyTodoManager);
}

*/
