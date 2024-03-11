import createElement from './createElement';
import { type PriorityLevel } from '../definitions/types';

function addOnPriorityChangeFunctionality(element: HTMLSelectElement) {
  element.addEventListener('change', (event) => {
    const selectedPriority = (event.target as HTMLSelectElement)
      .value as PriorityLevel;
    console.log(selectedPriority);
  });
}

function createSubtaskPrioritySelect(
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
  );

  return prioritySelectContainer;
}

export default createSubtaskPrioritySelect;
