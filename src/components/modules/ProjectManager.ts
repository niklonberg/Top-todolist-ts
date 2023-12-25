import { User, Project } from './utils/interfaces';

// refactor ProjectManager into an entity that can be duplicated,
// so each user could have an instance of ProjectManager to manage their projects & todos
class ProjectManager {
  private user: User;

  private projects: Project[];

  currSelectedProj: Project;

  /* constructor(user: User) {
    this.user = user;
  } */

  addProject(project: Project) {
    this.projects.push(project);
  }
}

export default ProjectManager;
