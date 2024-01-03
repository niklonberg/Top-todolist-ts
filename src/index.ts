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

log(childTodoOne);
log(childTodoTwo);
// const projectOne = ProjectFactory({ title: 'Paint house' });
// const projectTwo = ProjectFactory({
//   title: 'Refurnish Bedroomdkfsksdfkjsdfksdkfksdfdskf',
// });
// const projectThree = ProjectFactory({ title: 'Clean Laboratory' });

// const ProjectManagerOne = new ProjectManager();
// const UIManager = new AppUIManager(ProjectManagerOne);
// log(ProjectManagerOne);
// log(UIManager.sideBar);
// ProjectManagerOne.addItem(projectOne);
// ProjectManagerOne.addItem(projectTwo);
// ProjectManagerOne.addItem(projectThree);
// ProjectManagerOne.setSelectedProject(0);
// ProjectManagerOne.deleteItem(2, 'project');
// ProjectManagerOne.addItem(todoOne);
// ProjectManagerOne.addItem(todoTwo);
// ProjectManagerOne.addItem(todoFive);
// ProjectManagerOne.setSelectedProject(1);
// ProjectManagerOne.addItem(todoThree);
// ProjectManagerOne.addItem(todoFour);
// log(ProjectManagerOne.getItems('projects'));
// log(ProjectManagerOne.getItem(0, 'project'));
// log(ProjectManagerOne.getItem(3, 'todo'));
// log(ProjectManagerOne.getItems('todos'));
// ProjectManagerOne.deleteItem(4, 'todo');
// log(ProjectManagerOne.getItems('allTodos'));
// UIManager.renderProjectsList();
// // UIManager.renderSelectedGroup();
// log(ProjectManagerOne);
