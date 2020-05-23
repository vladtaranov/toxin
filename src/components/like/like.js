import store from './like.store';
import render from './like.render';

const onLikeClick = ({ target }) => {
  const likeName = target.closest('.js__like').dataset.name;
  store.updateLike(likeName);
  render(likeName);
};

const init = () => {
  document.querySelectorAll('.js__like')
    .forEach((item) => {
      const likeName = item.dataset.name;
      const initialState = {};
      initialState.likesCount = +item.dataset.count;
      initialState.isLiked = item.dataset.isliked;
      store.addLike(likeName, initialState);

      render(likeName);
      item.addEventListener('click', onLikeClick);
    });
};

export default {
  init
};
