import store from './dropdown.store';
import render from './dropdown.render';
import setRootSelector from '../../utils/setRootSelector';

let setSelector;

const onDropdownClick = ({ target }) => {
  const dropdownName = target.closest('.js__dropdown').dataset.name;

  if (target.closest('.js__dropdown')) {
    target.closest('.js__dropdown').classList.add('is-open');
  }

  const changeButton = target.closest('.js__dropdown-change');
  if (changeButton) {
    const { option, action } = changeButton.dataset;

    if (action === 'dec') store.decrement(dropdownName, option);
    if (action === 'inc') store.increment(dropdownName, option);
  }

  if (target.closest('.js__dropdown-clear')) {
    store.clear(dropdownName);
  }

  if (target.closest('.js__dropdown-apply')) {
    target.closest('.js__dropdown').classList.remove('is-open');
  }

  render(dropdownName);
};

const onDocumentClick = ({ target }) => {
  const clickedDropdown = target.closest('.js__dropdown');
  document.querySelectorAll('.js__dropdown')
    .forEach((dropdown) => {
      if (clickedDropdown !== dropdown) {
        dropdown.classList.remove('is-open');
      }
    });
};

const init = () => {
  document.querySelectorAll('.js__dropdown')
    .forEach((dropdown) => {
      const dropdownName = dropdown.dataset.name;
      setSelector = setRootSelector(`[data-name="${dropdownName}"].js__dropdown`);

      const initialState = { values: {} };
      document.querySelectorAll(setSelector('.js__dropdown-value'))
        .forEach((item) => {
          initialState.values[item.name] = +item.value;
        });

      initialState.sumMode = dropdown.dataset.summode;
      initialState.placeholder = dropdown.dataset.placeholder;

      if (dropdown.dataset.wordforms) {
        initialState.wordForms = dropdown.dataset.wordforms.split(', ');
      } else {
        initialState.wordForms = {};
        document.querySelectorAll(setSelector('.js__dropdown-value'))
          .forEach((item) => {
            initialState.wordForms[item.name] =
              item.dataset.wordforms.split(', ');
          });
      }
      store.addDropdown(dropdownName, initialState);

      dropdown.addEventListener('click', onDropdownClick);
      render(dropdownName);
    });

  document.addEventListener('click', onDocumentClick);
};

export default {
  init
};
