import FormTemplateObj from './utils/FormTemplateObjType';
import ProjectFactory, { Project } from './ProjectFactory';
import TodoFactory from './TodoFactory';
/* import parse from "date-fns/parse"; */
/* import { isToday } from "date-fns"; */

const ProjectManager = (() => {
  let projects: Project[] = [];
  let currSelectedProj: Project;

  /* project operations */
  const addProject = (templateObj: FormTemplateObj) => {
    const project = ProjectFactory(templateObj);
    projects.push(project);
    return project;
  };

  // am reassigning projects, is that bad practice?
  const removeSelectedProject = (projectID: number) => {
    projects = projects.filter((project) => project.projectID !== projectID);
  };

  const getProject = (projectID: number) =>
    projects.find((project) => project.projectID === projectID);

  const getProjects = () => projects;

  const getProjectFromTodoID = (todoID: number) =>
    projects.find((project) => project.getTodo(todoID));

  /* currSelectedProject operations */
  const getCurrSelectedProjectTodos = () => currSelectedProj.getTodos();

  const deselectCurrProject = () => currSelectedProj?.toggleSelected();

  const setSelectedProject = (projectID: number) => {
    deselectCurrProject();
    currSelectedProj = getProject(projectID);
    currSelectedProj.toggleSelected();
  };

  const addTodoToCurrSelectedProject = (inputElements) => {
    const todo = TodoFactory(inputElements);
    currSelectedProj.addTodo(todo);
    return todo;
  };

  /* todo operations */
  const getSelectedTodo = (todoID: number) =>
    getProjectFromTodoID(todoID).getTodo(todoID);

  const removeSelectedTodo = (todoID: number) =>
    getProjectFromTodoID(todoID).removeTodo(todoID);

  /* edit operations */
  const editItem = (itemToEdit, templateObj) => {
    console.log('item to edit is: ', itemToEdit);
    console.log('templateObj is: ', templateObj);
    for (const key in templateObj) {
      itemToEdit[key] = templateObj[key];
    }
    console.log(projects);
  };

  const toggleSelectedTodoProperty = (todoID, todoProperty) =>
    getProjectFromTodoID(todoID).toggleTodoBoolProperty(todoID, todoProperty);

  const getSelectedItem = (objectType, ID) => {
    if (objectType === 'project') {
      return getProject(ID);
    }

    if (objectType === 'todo') {
      return getSelectedTodo(ID);
    }
    return null;
  };

  /* const getFilteredTasks = (listGroupSelectionID = 'all-tasks') => {
    if (listGroupSelectionID === 'all-tasks')
      return projects.flatMap((project) => project.getTodos());
    // am i even using dates properly?
    if (listGroupSelectionID === 'today-tasks') {
      return projects.flatMap((project) =>
        project.getTodos().filter((todo) => {
          if (typeof todo.dueDate === 'object') {
            if (isToday(todo.dueDate)) return todo;
          }
        }),
      );
    }
    if (listGroupSelectionID === 'week-tasks') {
      // filter through all projects todos
      // return the ones with a date within next 7 days
    }
    if (listGroupSelectionID === 'important-tasks') {
      return projects.flatMap((project) =>
        project.getTodos().filter((todo) => todo.isImportant),
      );
    }
  };
 */
  return {
    addProject,
    removeSelectedProject,
    getProjects,
    getProject,
    getCurrSelectedProjectTodos /* sure about export all of them?? */,
    setSelectedProject,
    addTodoToCurrSelectedProject,
    removeSelectedTodo,
    getSelectedTodo,
    editItem,
    getSelectedItem,
    toggleSelectedTodoProperty,
    // getFilteredTasks,
  };
})();

export default ProjectManager;