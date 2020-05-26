import store from './room-card.store';
import render, { renderPrice, renderReviews } from './room-card.render';

const updateGallery = (cardNumber, nextImage, event) => {
  event.preventDefault();
  store.changeCurrentImage(cardNumber, nextImage);
  render(cardNumber);
};

const onCardGalleryClick = (event) => {
  const { target } = event;
  const cardNumber = target.closest('.js__room-card').dataset.room;
  const currentImage = store.getState(cardNumber).currentImage;

  if (target.closest('.js__room-card-arrow-left')) {
    updateGallery(cardNumber, currentImage - 1, event);
  }
  if (target.closest('.js__room-card-arrow-right')) {
    updateGallery(cardNumber, currentImage + 1, event);
  }

  const pointer = target.closest('.js__room-card-pointer');
  if (pointer) {
    updateGallery(cardNumber, +pointer.dataset.image, event);
  }
};

const init = () => {
  document.querySelectorAll('.js__room-card')
    .forEach((card) => {
      const cardNumber = card.dataset.room;

      const initialState = {};
      initialState.currentImage = 0;
      initialState.imagesCount =
        card.querySelectorAll('.js__room-card-image').length;
      store.addCardGallery(cardNumber, initialState);

      card.querySelector('.js__room-card-gallery')
        .addEventListener('click', onCardGalleryClick);
      renderPrice(card, card.dataset.price);
      renderReviews(card, card.dataset.reviews);

      render(cardNumber);
    });
};

export default {
  init
};
