import store from './range.store';
import render from './range.render';
import setRootSelector from '../../utils/setRootSelector';

let setSelector;
let lastClickedRange;
let lastStartPageX;

const onThumbMouseDown = (event) => {
  const { target } = event;
  lastClickedRange = target.closest('.js__range');
  setSelector = setRootSelector(`[data-name="${lastClickedRange.dataset.name}"].js__range`);
  lastStartPageX = event.pageX;
  const thumb = target.closest('.js__range-start-thumb');

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onThumbMouseUp);
};

const onMouseMove = (event) => {
  const sliderWidth = document.querySelector(setSelector('.js__range-slider')).offsetWidth;
  const currentPosition = document.querySelector(setSelector('.js__range-start-thumb')).style.left;
  const newPosition =
    (event.pageX - lastStartPageX) / (sliderWidth / 100) + parseInt(currentPosition);
  store.changeStart(lastClickedRange.dataset.name, newPosition);
  console.log(newPosition)
  // render(lastClickedRange.dataset.name);
};

const onThumbMouseUp = () => {
  document.removeEventListener('mousemove', onMouseMove);
};

const init = () => {
  document.querySelectorAll('.js__range')
    .forEach((range) => {
      const rangeName = range.dataset.name;
      setSelector = setRootSelector(`[data-name="${rangeName}"].js__range`);

      const initialState = {};
      initialState.min = +range.dataset.min;
      initialState.max = +range.dataset.max;
      initialState.step = +range.dataset.step;
      initialState.start = +range.dataset.start;
      initialState.end = +range.dataset.end;
      initialState.unit = range.dataset.unit;

      store.addRange(rangeName, initialState);
      render(rangeName);

      document.querySelector(setSelector('.js__range-start-thumb'))
        .addEventListener('mousedown', onThumbMouseDown);
    });
};

export default {
  init
};
