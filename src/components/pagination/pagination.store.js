const state = {};

const addPagination = (name, initialState) => {
  state[name] = initialState;
};

const getState = (paginationName) => {
  return state[paginationName];
};

const updatePage = (paginationName, newPage) => {
  state[paginationName].currentPage = newPage;
};

export default {
  addPagination,
  getState,
  updatePage
};
