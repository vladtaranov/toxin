import store from './room-card.store';
import setRootSelector from '../../utils/setRootSelector';
import getWordFormAfterNumber from '../../utils/getWordFormAfterNumber';
import getDividedBySpacesNumber from '../../utils/getDividedBySpacesNumber';

let state;
let setSelector;

export const renderPrice = (card, price) => {
  card.querySelector('.js__room-card-price').innerHTML =
    `${getDividedBySpacesNumber(price)}&nbsp;₽`;
};

export const renderReviews = (card, reviewsCount) => {
  card.querySelector('.js__room-card-reviews').innerHTML =
    getWordFormAfterNumber(reviewsCount, ['отзыв', 'отзыва', 'отзывов']);
};

const renderImages = () => {
  document.querySelectorAll(setSelector('.js__room-card-image'))
    .forEach((image, index) => {
      index === state.currentImage
        ? image.classList.add('is-active')
        : image.classList.remove('is-active');
    });
};

const renderPointers = () => {
  document.querySelectorAll(setSelector('.js__room-card-pointer'))
    .forEach((pointer, index) => {
      index === state.currentImage
        ? pointer.classList.add('is-active')
        : pointer.classList.remove('is-active');
    });
};

export default (cardNumber) => {
  state = store.getState(cardNumber);
  setSelector = setRootSelector(`[data-room="${cardNumber}"] .js__room-card-gallery`);

  renderImages();
  renderPointers();
};
