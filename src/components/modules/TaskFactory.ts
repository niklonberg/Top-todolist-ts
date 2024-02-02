import { newTaskFormData, PriorityLevel, Task } from './utils/interfaces';

function TaskFactory(formData: Record<keyof newTaskFormData, string>): Task {
  return {
    title: formData.title,
    priority: formData.priority as PriorityLevel,
    isCompleted: false,
    dateCompleted: null,
    dueDate: formData.dueDate === '' ? null : new Date(formData.dueDate),
    description: formData.description,
    subtasks: [],
  };
}

export default TaskFactory;
