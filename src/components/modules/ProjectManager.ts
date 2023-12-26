import { User, Project } from './utils/interfaces';

// this would need an interface aswell eventually
// refactor ProjectManager into an entity that can be duplicated,
// so each user could have an instance of ProjectManager to manage their projects & todos
class ProjectManager {
  // private user: User;

  private projects: Project[];

  currSelectedProj: Project;

  constructor() {
    // this.user = user;
    this.projects = [];
  }

  findProject(projectID: number) {
    return this.projects.find((project) => project.projectID === projectID);
  }

  addProject(project: Project) {
    this.projects.push(project);
  }

  setSelectedProject(projectID: number) {
    this.currSelectedProj = this.findProject(projectID);
  }
}

export default ProjectManager;
