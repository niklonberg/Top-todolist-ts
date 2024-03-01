import { newTaskFormData, PriorityLevel, Task } from './utils/interfaces';

function TaskFactory(formData: Record<keyof newTaskFormData, string>): Task {
  return {
    title: formData.title,
    priority: formData.priority as PriorityLevel,
    dateCompleted: null,
    dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
    description: formData.description,
    subtasks: [],
  };
}

export default TaskFactory;
