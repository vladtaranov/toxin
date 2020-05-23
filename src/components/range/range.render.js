import store from './range.store';
import setRootSelector from '../../utils/setRootSelector';
import formatNumber from '../../utils/getDividedBySpacesNumber';

let state;
let setSelector;

const renderThumbs = () => {
  const startPosition = (state.start - state.min) / ((state.max - state.min) / 100);
  const endPosition = (state.end - state.min) / ((state.max - state.min) / 100);

  document.querySelector(setSelector('.js__range-start-thumb'))
    .style.left = `${startPosition}%`;
  document.querySelector(setSelector('.js__range-end-thumb'))
    .style.left = `${endPosition}%`;

  const gap = document.querySelector(setSelector('.js__range-gap'));
  gap.style.left = `${startPosition}%`;
  gap.style.width = `${endPosition - startPosition}%`;
};

const renderCaption = () => {
  document.querySelector(setSelector('.js__range-caption')).innerHTML =
    `${formatNumber(state.start)} ${state.unit} &ndash; ${formatNumber(state.end)} ${state.unit}`;
};

export default (rangeName) => {
  state = store.getState(rangeName);
  setSelector = setRootSelector(`[data-name="${rangeName}"].js__range`);
  renderThumbs();
  renderCaption();
};
