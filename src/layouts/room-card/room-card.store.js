const state = {};

const addCardGallery = (name, initialState) => {
  state[name] = initialState;
};

const getState = (galleryID) => {
  return state[galleryID];
};

const changeCurrentImage = (galleryID, nextImage) => {
  if (nextImage < 0) {
    state[galleryID].currentImage = state[galleryID].imagesCount - 1;
    return;
  }
  if (nextImage > state[galleryID].imagesCount - 1) {
    state[galleryID].currentImage = 0;
    return;
  }
  state[galleryID].currentImage = nextImage;
};

export default {
  addCardGallery,
  getState,
  changeCurrentImage
};
