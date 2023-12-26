import { User, Project } from './utils/interfaces';

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

  findProject(projectID: number): Project {
    return this.projects.find((project) => project.projectID === projectID);
  }

  addProject(project: Project): void {
    this.projects.push(project);
  }

  setSelectedProject(projectID: number): void {
    this.currSelectedProject = this.findProject(projectID);
  }
}

export default ProjectManager;
