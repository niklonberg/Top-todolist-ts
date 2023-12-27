import './index.css';
import createElement from './components/modules/utils/createElement';
import ProjectFactory from './components/modules/ProjectFactory';
import TodoFactory from './components/modules/TodoFactory';
import ProjectManager from './components/modules/ProjectManager';

const { log } = console;

const todo = TodoFactory({
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
const projectOne = ProjectFactory({ title: 'Paint house' });
const projectTwo = ProjectFactory({ title: 'Refurnish Bedroom' });

const ProjectManagerOne = new ProjectManager();
log(ProjectManagerOne);

ProjectManagerOne.addProject(projectOne);
ProjectManagerOne.addProject(projectTwo);
ProjectManagerOne.setSelectedProject(0);
// ProjectManager.addTodoToCurrSelectedProject({
//   title: 'move sofa',
//   description: 'lift dont drag',
//   dueDate: new Date(2023, 11, 15),
// });
// ProjectManager.addTodoToCurrSelectedProject({
//   title: 'move table',
//   description: 'drag it roughly',
//   dueDate: 'No Due Date',
// });
// ProjectManager.setSelectedProject(1);
// ProjectManager.addTodoToCurrSelectedProject({
//   // title: "buy paint",
//   description:
//     'mix it well before applying super long description just to make life annoying and harder and really push myself to handle extreme edge cases',
// });
// ProjectManager.addTodoToCurrSelectedProject({
//   title: 'buy brush',
//   dueDate: new Date(2023, 11, 12),
// });
// log(ProjectManager.getProjects());
// TodoUIManager.renderProjectsList('projects');
// TodoUIManager.renderSelectedGroup();
