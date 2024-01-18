import createElement from './createElement';

function createDeleteWarningContainer(parentElement: HTMLElement) {
  const warningDiv = createElement<HTMLDivElement>('DIV', 'warning-container');
  const text = createElement<HTMLParagraphElement>('P');
  text.textContent = 'Are you sure?';
  const cancelBtn = createElement<HTMLButtonElement>(
    'button',
    'cancel-delete-btn',
  );
  cancelBtn.textContent = 'Cancel';
  warningDiv.append(text, cancelBtn);
  parentElement.append(warningDiv);
}

export default createDeleteWarningContainer;
