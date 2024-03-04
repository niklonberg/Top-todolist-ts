/* eslint-disable no-undef */
function applyInputLabelBehavior(form: HTMLFormElement) {
  const inputs = form.querySelectorAll(
    '.text-input',
  ) as NodeListOf<HTMLInputElement>;
  inputs.forEach((input) => {
    const label = input.parentElement.querySelector('.text-input-label');
    if (input.value.trim() !== '') label.classList.add('move-label');

    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        label.classList.add('move-label');
      } else {
        label.classList.remove('move-label');
      }
    });
  });
}
/* eslint-disable no-undef */

export default applyInputLabelBehavior;
