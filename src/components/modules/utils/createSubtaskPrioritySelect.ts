import createElement from './createElement';
import { type PriorityLevel } from '../definitions/types';
import { TaskManagerInterface } from '../definitions/interfaces';

function addOnPriorityChangeFunctionality(
  element: HTMLSelectElement,
  TaskManager: TaskManagerInterface,
) {
  element.addEventListener('change', (event) => {
    const selectedOption = (event.target as HTMLSelectElement)
      .value as PriorityLevel;
    const parentTasksContainer = element.closest('.tasks-container');
    const filteredSubtasksContainer =
      parentTasksContainer.querySelector('.filtered-tasks');
    const filteredSubtasks = TaskManager.getSubtasksByPriority(); // use selectedOption in this func
    console.log(filteredSubtasks);
  });
}

function createSubtaskPrioritySelect(
  TaskManager: TaskManagerInterface,
  prioritySortOrder: PriorityLevel = 'High',
) {
  const prioritySelectContainer = createElement('div');
  const template = `
  <label for="prioritySortOrder">Priority sort order:</label>
  <select id="prioritySortOrder" class="priority-select" name="prioritySortOrder">
    <option value="High" ${
      prioritySortOrder === 'High' ? 'selected' : ''
    }>High</option>  
    <option value="Low" ${
      prioritySortOrder === 'Low' ? 'selected' : ''
    } >Low</option>
  </select>`;
  prioritySelectContainer.innerHTML = template;

  addOnPriorityChangeFunctionality(
    prioritySelectContainer.querySelector<HTMLSelectElement>(
      '#prioritySortOrder',
    ),
    TaskManager,
  );

  return prioritySelectContainer;
}

export default createSubtaskPrioritySelect;
