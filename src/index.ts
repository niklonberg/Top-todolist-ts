import './index.css';
import ProjectFactory from './components/modules/ProjectFactory';
import TodoFactory from './components/modules/TodoFactory';
import ProjectManager from './components/modules/ProjectManager';
import AppUIManager from './components/modules/AppUIManager';

/* CREATE initAPP() that does all the below */

const { log } = console;

const todoOne = TodoFactory({
  title: 'Paint Walls',
  isImportant: true,
});
const todoTwo = TodoFactory({
  title: 'Paint Bedroom',
  isImportant: false,
  description: 'Hi mom',
});
const todoThree = TodoFactory({
  title: 'Move Bed',
  isImportant: true,
  description: 'lift it properly',
});
const todoFour = TodoFactory({
  title: 'Move closet',
  description: 'scrape it along the floor',
});
const todoFive = TodoFactory({
  title: 'Buy Paintbrush',
  description: 'less than 5$',
});
const projectOne = ProjectFactory({ title: 'Paint house' });
const projectTwo = ProjectFactory({ title: 'Refurnish Bedroom' });
const projectThree = ProjectFactory({ title: 'Clean Laboratory' });

const ProjectManagerOne = new ProjectManager();
const UIManager = new AppUIManager(ProjectManagerOne);
log(ProjectManagerOne);

ProjectManagerOne.addItem(projectOne);
ProjectManagerOne.addItem(projectTwo);
ProjectManagerOne.addItem(projectThree);
ProjectManagerOne.setSelectedProject(0);
ProjectManagerOne.deleteItem(2, 'project');
ProjectManagerOne.addItem(todoOne);
ProjectManagerOne.addItem(todoTwo);
ProjectManagerOne.addItem(todoFive);
ProjectManagerOne.setSelectedProject(1);
ProjectManagerOne.addItem(todoThree);
ProjectManagerOne.addItem(todoFour);
log(ProjectManagerOne.getItems('projects'));
log(ProjectManagerOne.getItem(0, 'project'));
log(ProjectManagerOne.getItem(3, 'todo'));
log(ProjectManagerOne.getItems('todos'));
ProjectManagerOne.deleteItem(4, 'todo');
log(ProjectManagerOne.getItems('allTodos'));
UIManager.renderProjectsList();
// UIManager.renderSelectedGroup();
log(ProjectManagerOne);
