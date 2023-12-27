import { User, Project, Todo } from './utils/interfaces';
import TodoService from './TodoService';

// this would need an interface aswell eventually
// refactor ProjectManager into an entity that can be duplicated,
// so each user could have an instance of ProjectManager to manage their projects & todos
class ProjectManager {
  // private user: User;

  private projects: Project[];

  currSelectedProject: Project;

  constructor() {
    // this.user = user;
    this.projects = [];
  }

  /* project methods */
  getProject(projectID: number): Project {
    return this.projects.find((project) => project.projectID === projectID);
  }

  getProjects(): Project[] {
    return this.projects;
  }

  setSelectedProject(projectID: number): void {
    this.currSelectedProject = this.getProject(projectID);
  }

  addProject(project: Project): void {
    this.projects.push(project);
  }

  deleteProject(projectID: number): void {
    // could also use getProject method maybe?
    this.projects = this.projects.filter(
      (project) => project.projectID !== projectID,
    );
  }

  /* todo methods */
  addTodo(todo: Todo): void {
    TodoService.add(this.currSelectedProject, todo);
  }
  /* getTodo(todoID:number): Todo {
    const todo = TodoService.getTodo(todoID)
  }

  addTodo(todo: Todo):void {
    
  } */
}

export default ProjectManager;
