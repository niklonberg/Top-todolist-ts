import { User, Project } from './utils/interfaces';
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

  getProject(projectID: number): Project {
    return this.projects.find((project) => project.projectID === projectID);
  }

  setSelectedProject(projectID: number): void {
    this.currSelectedProject = this.getProject(projectID);
    console.log('selected proj: ', this.currSelectedProject);
  }

  addProject(project: Project): void {
    this.projects.push(project);
  }

  deleteProject(projectID: number): void {
    this.projects = this.projects.filter(
      (project) => project.projectID !== projectID,
    );
  }
}

export default ProjectManager;
