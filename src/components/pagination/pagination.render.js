import cn from 'classnames';
import store from './pagination.store';
import setRootSelector from '../../utils/setRootSelector';
import getWordFormAfterNumber from '../../utils/getWordFormAfterNumber';

let state;
let setSelector;

const renderCaption = () => {
  const startItemOnCurrentPage = state.itemsOnPage * (state.currentPage - 1) + 1;
  let endItemOnCurrentPage = startItemOnCurrentPage + state.itemsOnPage - 1;
  if (endItemOnCurrentPage > state.itemsCount) endItemOnCurrentPage = state.itemsCount;
  const totalItems = state.itemsCount > 100
    ? `${100 * Math.floor(state.itemsCount / 100)}+`
    : state.itemsCount;

  document.querySelector(setSelector('.js__pagination-caption')).innerHTML =
    `${startItemOnCurrentPage}&ndash;${endItemOnCurrentPage}
    из ${totalItems} ${getWordFormAfterNumber(parseInt(totalItems), state.wordForms)}`;
};

const createNode = (style, page = '', innerHTML = '') => {
  const node = document.createElement('div');
  node.className = style;
  node.innerHTML = innerHTML;
  node.dataset.page = page;
  return node;
};

const createToPreviousPage = () => {
  const style = 'pagination__page pagination__page--previous js__pagination-page';
  return createNode(style, state.currentPage - 1);
};

const createPage = (page) => {
  const style = cn(
    'pagination__page',
    { 'pagination__page--current': page === state.currentPage },
    'js__pagination-page'
  );
  return createNode(style, page, page);
};

const createGapPages = () => {
  const style = 'pagination__page pagination__page--gap';
  return createNode(style, null, '&hellip;');
};

const createToNextPage = () => {
  const style = 'pagination__page pagination__page--next js__pagination-page';
  return createNode(style, state.currentPage + 1);
};

const renderPages = () => {
  const pagesNodes = [];
  const pagesCount = Math.ceil(state.itemsCount / state.itemsOnPage);

  if (state.currentPage > 1) pagesNodes.push(createToPreviousPage());

  if (state.currentPage > 3) pagesNodes.push(createPage(1));
  if (state.currentPage > 4) pagesNodes.push(createGapPages());

  const pages = [];
  for (let i = state.currentPage - 2; i <= state.currentPage + 2; i++) {
    if (i > 0 && i <= pagesCount) pages.push(i);
  }

  pages.forEach((page) => {
    pagesNodes.push(createPage(page));
  });

  if (pagesCount - state.currentPage > 3) pagesNodes.push(createGapPages());
  if (pagesCount - state.currentPage > 2) pagesNodes.push(createPage(pagesCount));

  if (state.currentPage < pagesCount) pagesNodes.push(createToNextPage());

  document.querySelector(setSelector('.js__pagination-pages')).append(...pagesNodes);
};

export default (paginationName) => {
  state = store.getState(paginationName);
  setSelector = setRootSelector(`[data-name="${paginationName}"].js__pagination`);

  const pagesContainer = document.querySelector(setSelector('.js__pagination-pages'));
  while (pagesContainer.firstChild) pagesContainer.firstChild.remove();

  renderCaption();
  renderPages();
};
