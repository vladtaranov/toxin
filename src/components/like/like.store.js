const state = {};

const addLike = (name, initialState) => {
  state[name] = initialState;
};

const getState = (likeName) => {
  return state[likeName];
};

const updateLike = (likeName) => {
  state[likeName].isLiked = !state[likeName].isLiked;
  state[likeName].isLiked
    ? state[likeName].likesCount += 1
    : state[likeName].likesCount -= 1
};

export default {
  addLike,
  getState,
  updateLike
};
