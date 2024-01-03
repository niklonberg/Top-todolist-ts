import './index.css';
import TodoFactory from './components/modules/TodoFactory';
import TodoManager from './components/modules/TodoManager';
import AppUIManager from './components/modules/AppUIManager';

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
// const UIManager = new AppUIManager(MyTodoManager);
log(MyTodoManager);
// log(UIManager.sideBar);
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
MyTodoManager.deleteItem(2);
// log(MyTodoManager.getItems('projects'));
// log(MyTodoManager.getItem(0, 'project'));
// log(MyTodoManager.getItem(3, 'todo'));
// log(MyTodoManager.getItems('todos'));
// MyTodoManager.deleteItem(4, 'todo');
// log(MyTodoManager.getItems('allTodos'));
// UIManager.renderProjectsList();
// // UIManager.renderSelectedGroup();
// log(MyTodoManager);
