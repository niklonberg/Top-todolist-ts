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
  confirmBtn.classList.add('btn');
  confirmBtn.textContent = 'Confirm';
  const cancelBtn = createElement<HTMLButtonElement>(
    'button',
    'icon-btn',
    'cancel-delete-btn',
  );
  cancelBtn.setAttribute('aria-label', 'cancel deletion');
  cancelBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>';
  warningDiv.append(text, confirmBtn, cancelBtn);
  return warningDiv;
}

export default createDeleteWarningContainer;
