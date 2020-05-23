const state = {};

const addDropdown = (name, initialState) => {
  state[name] = initialState;
};

const getState = (dropdownName) => {
  return state[dropdownName];
};

const decrement = (dropdownName, option) => {
  if (state[dropdownName].values[option] > 0) {
    state[dropdownName].values[option] -= 1;
  }
};

const increment = (dropdownName, option) => {
  state[dropdownName].values[option] += 1;
};

const clear = (dropdownName) => {
  Object.keys(state[dropdownName].values)
    .forEach((option) => {
      state[dropdownName].values[option] = 0;
    });
};

export default {
  addDropdown,
  getState,
  decrement,
  increment,
  clear
};
