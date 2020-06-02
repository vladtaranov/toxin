const onContentLoad = () => {
  document.body.classList.remove('is-inactive');
  document.querySelector('.js__loader').classList.add('is-inactive');
};

const init = () => {
  window.addEventListener('load', onContentLoad);
};

export default {
  init
};
