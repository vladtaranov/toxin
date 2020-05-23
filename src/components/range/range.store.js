const state = {};

const addRange = (name, initialState) => {
  state[name] = initialState;
};

const getState = (rangeName) => {
  return state[rangeName];
};

const changeStart = (rangeName, newPosition) => {
  const step = state[rangeName].step;
  const notRoundedValue = (state[rangeName].max - state[rangeName].min) / 100 * newPosition;
  console.log(step * Math.round(notRoundedValue / step))
  state[rangeName].start = step * Math.round(notRoundedValue / step);
};

const changeEnd = (rangeName, newPosition) => {
  const step = state[rangeName].step;
  const roundedValue = value;
  state[rangeName].end = roundedValue;
};

export default {
  addRange,
  getState,
  changeStart,
  changeEnd
};
