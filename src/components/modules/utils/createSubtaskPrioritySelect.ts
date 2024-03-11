import createElement from './createElement';
import { type PriorityLevel } from '../definitions/types';

function createSubtaskPrioritySelect(prioritySortOrder: PriorityLevel) {
  const prioritySelectContainer = createElement('div');
  const template = `
  <label for="prioritySortOrder">Priority:</label>
  <select id="prioritySortOrder" class="priority-select" name="prioritySortOrder">
    <option value="Low" ${
      prioritySortOrder === 'Low' ? 'selected' : ''
    } >Low</option>
    <option value="High" ${
      prioritySortOrder === 'High' ? 'selected' : ''
    }>High</option>
  </select>`;
  prioritySelectContainer.innerHTML = template;

  const selectElement =
    prioritySelectContainer.querySelector<HTMLSelectElement>(
      '#prioritySortOrder',
    );
  selectElement.addEventListener('change', (event) => {
    const selectedPriority = (event.target as HTMLSelectElement)
      .value as PriorityLevel;
    console.log('hi');
  });

  return prioritySelectContainer;
}

export default createSubtaskPrioritySelect;
