import './index.css';
import TodoFactory from './components/modules/TodoFactory';
import TodoManager from './components/modules/TodoManager';
import NavbarUIManager from './components/modules/NavbarUIManager';
import TodoContentUIManager from './components/modules/TodoContentUIManager';
import HeaderManager from './components/modules/HeaderUIManager';
import TodoFormUIManager from './components/modules/TodoFormUIManager';

/* CREATE initAPP() that does all the below */

const { log } = console;

const MyTodoManager = new TodoManager();
const MyTodoContentUIManager = new TodoContentUIManager(MyTodoManager);
const MyNavbarManager = new NavbarUIManager(MyTodoContentUIManager);
const MyHeaderManager = new HeaderManager();
const MyTodoFormUIManager = new TodoFormUIManager(MyTodoManager);

const childTodoOne = TodoFactory({
  title: 'Paint Walls',
  isUrgent: true,
  dueDate: new Date(2023, 11, 15),
});
const childTodoTwo = TodoFactory({
  title: 'Paint Bedroom',
  isUrgent: false,
  description: 'Hi mom',
});
const childTodoThree = TodoFactory({
  title: 'Move Bed',
  isUrgent: true,
  description: 'lift it properly',
});
const childTodoFour = TodoFactory({
  title: 'Move closet',
  description: 'scrape it along the floor',
});
const childTodoFive = TodoFactory({
  title: 'Move bed',
  description: 'lift gently',
});
const topLevelTodoOne = TodoFactory({ title: 'Paint house' });
const topLevelTodoTwo = TodoFactory({
  title: 'Refurnish Bedroomdkfsksdfkjsdfksdkfksdfdskf',
});
const topLevelTodoThree = TodoFactory({ title: 'Clean Laboratory' });
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
log(MyTodoManager);
