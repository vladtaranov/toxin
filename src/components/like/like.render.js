import store from './like.store';
import setRootSelector from '../../utils/setRootSelector';

export default (likeName) => {
  const state = store.getState(likeName);
  const setSelector = setRootSelector(`[data-name="${likeName}"].js__like`);

  const likeContainer = document.querySelector(setSelector(''));
  state.isLiked
    ? likeContainer.classList.add('is-active')
    : likeContainer.classList.remove('is-active');

  document.querySelector(setSelector('.js__like-count'))
    .innerHTML = state.likesCount;
};
