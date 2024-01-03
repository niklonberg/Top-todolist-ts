import { FormTemplateObj, Project } from './utils/interfaces';

/* delete me */

let projectIDCounter: number = 0;
function ProjectFactory(templateObj: FormTemplateObj): Project {
  const project: Project = {
    projectID: projectIDCounter,
    title: templateObj.title,
    isSelected: false, // do we actually need this?
    todos: [],
  };

  projectIDCounter += 1;
  return project;
}

export default ProjectFactory;
