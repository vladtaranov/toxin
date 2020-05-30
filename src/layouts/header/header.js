const onMenuIconClick = () => {
  document.querySelector('.js__header-menu')
    .classList.toggle('is-active');
  document.querySelector('.js__header-menu-icon')
    .classList.toggle('is-active');
};

const init = () => {
  document.querySelector('.js__header-menu-icon')
    .addEventListener('click', onMenuIconClick);
};

export default {
  init
};
