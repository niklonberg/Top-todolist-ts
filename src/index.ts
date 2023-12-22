import './index.css';
import createElement from './components/modules/createElement';
import ProjectFactory from './components/modules/ProjectFactory';
import TodoFactory from './components/modules/TodoFactory';

const p = createElement('p', 'p-test', 'p-id');
p.textContent = 'hello';
const { log } = console;
log(p);
document.body.appendChild(p);
log(ProjectFactory);

const todo = TodoFactory({ title: 'Paint Walls', isImportant: true });
log(todo);
const todoTwo = TodoFactory({
  title: 'Paint Bedroom',
  isImportant: false,
  description: 'Hi mom',
});
log(todoTwo);

/* log(ProjectManager);

ProjectManager.addProject({
  title: "Refurnish Homedfgvdfgdfgdfgdfgdfgdfgsdefsdf",
});
ProjectManager.addProject({ title: "Paint Walls" });
ProjectManager.setSelectedProject(0);
ProjectManager.addTodoToCurrSelectedProject({
  title: "move sofa",
  description: "lift dont drag",
  dueDate: new Date(2023, 11, 15),
});
ProjectManager.addTodoToCurrSelectedProject({
  title: "move table",
  description: "drag it roughly",
  dueDate: "No Due Date",
});
ProjectManager.setSelectedProject(1);
ProjectManager.addTodoToCurrSelectedProject({
  // title: "buy paint",
  description:
    "mix it well before applying super long description just to make life annoying and harder and really push myself to handle extreme edge cases",
});
ProjectManager.addTodoToCurrSelectedProject({
  title: "buy brush",
  dueDate: new Date(2023, 11, 12),
});
log(ProjectManager.getProjects());
TodoUIManager.renderProjectsList("projects");
TodoUIManager.renderSelectedGroup(); */
