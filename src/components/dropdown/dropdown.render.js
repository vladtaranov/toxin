import store from './dropdown.store';
import setRootSelector from '../../utils/setRootSelector';
import getWordFormAfterNumber from '../../utils/getWordFormAfterNumber';

let state;
let setSelector;

const renderTextField = () => {
  let text;
  let sum;

  switch (state.sumMode) {
    case 'all':
      sum = Object.values(state.values)
        .reduce((acc, value) => acc + value, 0);
      sum > 0
        ? text = `${sum} ${getWordFormAfterNumber(sum, state.wordForms)}`
        : text = state.placeholder;
      break;

    case 'byCategory':
      text = [];
      Object.entries(state.values)
        .forEach(([option, value]) => {
          value > 0 &&
            text.push(`${value} ${getWordFormAfterNumber(value, state.wordForms[option])}`);
        });
      text.length > 0
        ? text = text.join(', ')
        : text = state.placeholder;
      break;
  }

  document.querySelector(setSelector('.js__dropdown-text-field'))
    .innerHTML = text;
};

const renderOptions = () => {
  Object.entries(state.values)
    .forEach(([option, value]) => {
      document.querySelector(setSelector(`[name="${option}"].js__dropdown-value`))
        .value = value;
      const btnDecrement = document.querySelector(
        setSelector(`[data-option="${option}"][data-action="dec"].js__dropdown-change`));
      value > 0
        ? btnDecrement.classList.add('is-active')
        : btnDecrement.classList.remove('is-active');
    });
};

const renderClearButton = () => {
  const sum = Object.values(state.values)
    .reduce((acc, value) => acc + value, 0);

  const clearButton = document.querySelector(setSelector('.js__dropdown-clear'));
  if (clearButton) {
    sum > 0
      ? clearButton.classList.remove('is-hidden')
      : clearButton.classList.add('is-hidden');
  }
};

export default (dropdownName) => {
  state = store.getState(dropdownName);
  setSelector = setRootSelector(`[data-name="${dropdownName}"].js__dropdown`);
  renderTextField();
  renderOptions();
  renderClearButton();
};
