import getMaskedDate from '../../utils/getMaskedDate';

const onDateTextFieldInput = ({ target }) => {
  target.value = getMaskedDate(target.value);
};

const init = () => {
  document.querySelector('[name="text-field--masked"]')
    .addEventListener('input', onDateTextFieldInput);
};

export default {
  init
};
