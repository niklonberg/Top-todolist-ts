import createElement from './createElement';

function createDeleteWarningContainer() {
  const warningDiv = createElement<HTMLDivElement>('DIV', 'warning-container');
  const text = createElement<HTMLParagraphElement>('P');
  text.textContent = 'Confirm deletion';
  const confirmBtn = createElement<HTMLButtonElement>(
    'button',
    'filled-btn',
    'confirm-delete-btn',
  );
  confirmBtn.textContent = 'Confirm';
  const cancelBtn = createElement<HTMLButtonElement>(
    'button',
    'filled-btn',
    'cancel-delete-btn',
  );
  cancelBtn.textContent = 'Cancel';
  warningDiv.append(text, confirmBtn, cancelBtn);
  return warningDiv;
}

export default createDeleteWarningContainer;
