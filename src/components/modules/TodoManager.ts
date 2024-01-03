import { User, Todo, ProjectManagerInterface } from './utils/interfaces';
import TodoService from './TodoService';

/* convert ProjectManager into TodoManager */

// should i be storing TodoService inside the class instead?

// refactor ProjectManager into an entity that can be duplicated,
// so each user could have an instance of ProjectManager to manage their projects & todos
class TodoManager implements TodoManagerInterface {
  // private user: User;

  private projects: Project[];

  currSelectedProject: Project;

  constructor() {
    // this.user = user;
    this.projects = [];
  }

  /* Get methods */
  // hang on, is this right? do i need itemType variable, if
  // when we call it we specify <Project> or <Todo>?
  getItem<T>(itemID: number, itemType: string): T {
    if (itemType === 'project') {
      return this.projects.find((project) => project.projectID === itemID) as T;
    }
    if (itemType === 'todo') {
      return TodoService.get(this.projects, itemID) as T;
    }
    throw new Error('Invalid item type');
  }

  getItems<T>(itemsToGet: string): T[] {
    if (itemsToGet === 'projects') {
      return this.projects as T[];
    }
    if (itemsToGet === 'todos') {
      return TodoService.getAll(this.currSelectedProject) as T[];
    }
    if (itemsToGet === 'allTodos') {
      return this.projects.flatMap((project) =>
        TodoService.getAll(project),
      ) as T[];
    }
    throw new Error('Invalid items to get');
  }

  /* Set methods */
  setSelectedProject(projectID: number): void {
    this.currSelectedProject = this.getItem(projectID, 'project');
  }

  /* Add methods */
  addItem(item: Project | Todo): void {
    if ('projectID' in item) {
      this.projects.push(item);
    } else {
      TodoService.add(this.currSelectedProject, item);
    }
  }

  /* Delete methods */
  deleteItem(itemID: number, itemType: string): void {
    if (itemType === 'project') {
      this.projects = this.projects.filter(
        (project) => project.projectID !== itemID,
      );
    } else {
      TodoService.delete(this.projects, itemID);
    }
  }

  /* Edit methods */
  toggleProperty(
    itemID: number,
    itemType: string,
    propertyToToggle: string,
  ): void {
    if (itemType === 'project') {
      // const project = this.getItem<Project>(itemID, itemType);
      console.log('toggle some property');
    } else {
      TodoService.toggleTodoBoolProperty(
        this.projects,
        propertyToToggle,
        itemID,
      );
    }
  }
}

export default ProjectManager;

// getProjectFromTodoID(todoID: number): Project {
//   return this.projects.find((project) => TodoService.get(project, todoID));
// }
