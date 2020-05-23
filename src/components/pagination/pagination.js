import store from './pagination.store';
import render from './pagination.render';

const onPaginationClick = ({ target }) => {
  const paginationName = target.closest('.js__pagination').dataset.name;

  if (target.closest('.js__pagination-page')) {
    const newPage = +target.closest('.js__pagination-page').dataset.page;
    store.updatePage(paginationName, newPage);
    render(paginationName);
  }
};

const init = () => {
  document.querySelectorAll('.js__pagination')
    .forEach((pagination) => {
      const paginationName = pagination.dataset.name;

      const initialState = {};
      initialState.itemsCount = +pagination.dataset.count;
      initialState.itemsOnPage = +pagination.dataset.onpage;
      initialState.currentPage = +pagination.dataset.current;
      initialState.wordForms = pagination.dataset.wordforms.split(', ');
      store.addPagination(paginationName, initialState);

      pagination.addEventListener('click', onPaginationClick);
      render(paginationName);
    });
};

export default {
  init
};
