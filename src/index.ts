import './index.css';
import TodoFactory from './components/modules/TodoFactory';
import TodoManager from './components/modules/TodoManager';
import NavbarUIManager from './components/modules/NavbarUIManager';

/* CREATE initAPP() that does all the below */

const { log } = console;

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
  title: 'Buy Paintbrush',
  description: 'less than 5$',
});

const topLevelTodoOne = TodoFactory({ title: 'Paint house' });
const topLevelTodoTwo = TodoFactory({
  title: 'Refurnish Bedroomdkfsksdfkjsdfksdkfksdfdskf',
});
const topLevelTodoThree = TodoFactory({ title: 'Clean Laboratory' });

const MyTodoManager = new TodoManager();
const MyNavbarManager = new NavbarUIManager(MyTodoManager);
MyTodoManager.addTopLevelTodo(topLevelTodoOne);
MyTodoManager.addTopLevelTodo(topLevelTodoTwo);
MyTodoManager.addTopLevelTodo(topLevelTodoThree);
MyTodoManager.setSelectedTodo(5);
MyTodoManager.addChildTodoToCurrSelectedTodo(childTodoOne);
MyTodoManager.addChildTodoToCurrSelectedTodo(childTodoTwo);
MyTodoManager.addChildTodoToCurrSelectedTodo(childTodoThree);
MyTodoManager.setSelectedTodo(6);
MyTodoManager.addChildTodoToCurrSelectedTodo(childTodoFour);
MyTodoManager.addChildTodoToCurrSelectedTodo(childTodoFive);
MyTodoManager.deleteChildTodo(2);

MyNavbarManager.renderTopLevelTodosList();
MyNavbarManager.navBar.addEventListener(
  'click',
  MyNavbarManager.selectNavListItem,
);

/* make init functions, for the adding of event listeners
for the different UIManagers */

// // UIManager.renderSelectedGroup();
log(MyTodoManager);
log(MyNavbarManager);
