import './index.css';
import { addDays } from 'date-fns';
import TodoFactory from './components/modules/TodoFactory';
import TodoManager from './components/modules/TodoManager';
import TodoContentUIManager from './components/modules/TodoContentUIManager';
import HeaderNavbarUIManager from './components/modules/HeaderNavbarUIManager';
import TodoFormUIManager from './components/modules/TodoFormUIManager';

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

  const childTodoOne = TodoFactory({
    title: 'Paint Walls',
    priority: 'High',
    dueDate: addDays(new Date(), 3),
  });
  childTodoOne.isCompleted = true;
  childTodoOne.dateCompleted = new Date();
  const childTodoTwo = TodoFactory({
    title: 'Paint Bedroom',
    priority: 'Medium',
    description: 'Hi mom',
    dueDate: new Date(),
  });
  const childTodoThree = TodoFactory({
    title: 'Move Bed',
    priority: 'Low',
    description: 'lift it properly',
  });
  const childTodoFour = TodoFactory({
    title: 'Move closet',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    dueDate: new Date(),
  });
  const childTodoFive = TodoFactory({
    title: 'Move bed',
    description: 'lift gently',
  });
  const topLevelTodoOne = TodoFactory({
    title: 'Paint house',
    priority: 'Low',
  });
  const topLevelTodoTwo = TodoFactory({
    title: 'Refurnish Bedroomdkfsksdfkjsdfksdkfksdfdskf',
    priority: 'Medium',
  });
  const topLevelTodoThree = TodoFactory({
    title: 'Clean Laboratory',
    priority: 'High',
  });
  MyTodoManager.addTodo(topLevelTodoOne);
  MyTodoManager.addTodo(topLevelTodoTwo);
  MyTodoManager.addTodo(topLevelTodoThree);
  MyTodoManager.setSelectedTodo(5);
  MyTodoManager.addTodo(childTodoOne);
  MyTodoManager.addTodo(childTodoTwo);
  MyTodoManager.addTodo(childTodoThree);
  MyTodoManager.setSelectedTodo(6);
  MyTodoManager.addTodo(childTodoFour);
  MyTodoManager.addTodo(childTodoFive);
  MyTodoManager.setSelectedTodo(MyTodoManager.getTopLevelTodos()[0].todoID);
  console.log(MyTodoManager);
}

init();

async function getUsersData() {
  const url = 'http://localhost:3000/users';
  try {
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const users = await response.json();
    console.log(users);
  } catch (error) {
    console.error(error.message);
  }
}

const getUsersDataBtn = document.querySelector('#get-users-data');
getUsersDataBtn.addEventListener('click', () => {
  getUsersData();
});
