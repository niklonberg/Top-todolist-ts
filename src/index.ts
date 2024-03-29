import './index.css';
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
    dueDate: new Date(2023, 11, 15),
  });
  const childTodoTwo = TodoFactory({
    title: 'Paint Bedroom',
    priority: 'Medium',
    description: 'Hi mom',
  });
  const childTodoThree = TodoFactory({
    title: 'Move Bed',
    priority: 'Low',
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
