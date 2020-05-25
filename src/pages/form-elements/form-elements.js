import getMaskedDate from '../../utils/getMaskedDate';

const onDateTextFieldInput = ({ target }) => {
  target.value = getMaskedDate(target.value);
};

const init = () => {
  const dateTextField = document.querySelector('[name="text-field--masked"]');

  if (dateTextField) dateTextField.addEventListener('input', onDateTextFieldInput);
};

export default {
  init
};
