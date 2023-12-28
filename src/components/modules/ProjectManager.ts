import { User, Project, Todo } from './utils/interfaces';
import TodoService from './TodoService';

// this would need an interface aswell eventually
// refactor ProjectManager into an entity that can be duplicated,
// so each user could have an instance of ProjectManager to manage their projects & todos

/* MERGE get'X', add'X', delete'X' methods into singular methods, 
that do different things according to whether a project or todo is passed in */
class ProjectManager {
  // private user: User;

  private projects: Project[];

  currSelectedProject: Project;

  constructor() {
    // this.user = user;
    this.projects = [];
  }

  /* get methods */
  getItem<T>(itemID: number, itemType: string): T {
    if (itemType === 'project') {
      return this.projects.find((project) => project.projectID === itemID) as T;
    }
    if (itemType === 'todo') {
      return TodoService.get(this.projects, itemID) as T;
    }
    throw new Error('Invalid item type');
  }

  // getProjectFromTodoID(todoID: number): Project {
  //   return this.projects.find((project) => TodoService.get(project, todoID));
  // }

  // getItems<T>(): T[] {

  // }

  // getProjects(): Project[] {
  //   return this.projects;
  // }

  // getSelectedProjectTodos(): Todo[] {
  //   return TodoService.getAll(this.currSelectedProject);
  // }

  // getAllTodos(): Todo[] {
  //   return this.projects.flatMap((project) => TodoService.getAll(project));
  // }

  setSelectedProject(projectID: number): void {
    this.currSelectedProject = this.getItem(projectID, 'project');
  }

  addProject(project: Project): void {
    this.projects.push(project);
  }

  deleteProject(projectID: number): void {
    this.projects = this.projects.filter(
      (project) => project.projectID !== projectID,
    );
  }

  addTodo(todo: Todo): void {
    TodoService.add(this.currSelectedProject, todo);
  }

  // deleteTodo(todoID: number): void {
  //   const projectToDeleteFrom = this.getProjectFromTodoID(todoID);
  //   projectToDeleteFrom.todos = TodoService.deleteTodo(
  //     projectToDeleteFrom,
  //     todoID,
  //   );
  // }
}

export default ProjectManager;
