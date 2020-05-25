import getMaskedDate from '../../utils/getMaskedDate';

const onSignUpBirthdayInput = ({ target }) => {
  target.value = getMaskedDate(target.value);
};

const init = () => {
  const signUpBirthday = document.querySelector('.sign-up [name="birthday"]');

  if (signUpBirthday) signUpBirthday.addEventListener('input', onSignUpBirthdayInput);
};

export default {
  init
};
