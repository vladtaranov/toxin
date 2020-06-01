const onMenuIconClick = () => {
  document.querySelector('.js__header-menu')
    .classList.toggle('is-active');
  document.querySelector('.js__header-menu-icon')
    .classList.toggle('is-active');
};

const init = () => {
  const menuIcon = document.querySelector('.js__header-menu-icon');
  if (menuIcon) menuIcon.addEventListener('click', onMenuIconClick);
};

export default {
  init
};
