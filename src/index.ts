import './index.css';
import createElement from './components/modules/utils/createElement';
import ProjectFactory from './components/modules/ProjectFactory';
import TodoFactory from './components/modules/TodoFactory';
import ProjectManager from './components/modules/ProjectManager';

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
log(ProjectManagerOne);

ProjectManagerOne.addProject(projectOne);
ProjectManagerOne.addProject(projectTwo);
ProjectManagerOne.addProject(projectThree);
ProjectManagerOne.setSelectedProject(0);
ProjectManagerOne.deleteProject(2);
ProjectManagerOne.addTodo(todoOne);
ProjectManagerOne.addTodo(todoTwo);
ProjectManagerOne.addTodo(todoFive);
ProjectManagerOne.setSelectedProject(1);
ProjectManagerOne.addTodo(todoThree);
ProjectManagerOne.addTodo(todoFour);
// log(ProjectManager.getProjects());
// TodoUIManager.renderProjectsList('projects');
// TodoUIManager.renderSelectedGroup();
log(ProjectManagerOne);
