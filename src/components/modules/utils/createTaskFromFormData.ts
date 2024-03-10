import { newTaskFormData } from '../definitions/interfaces';
import TaskFactory from '../TaskFactory';

function createTaskFromFormData(form: HTMLFormElement) {
  const formData = new FormData(form);
  const formDataObject: Record<keyof newTaskFormData, string> =
    Object.fromEntries(formData.entries()) as Record<
      keyof newTaskFormData,
      string
    >;
  return TaskFactory(formDataObject);
}

export default createTaskFromFormData;
