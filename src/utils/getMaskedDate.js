export default (value) => {
  const validatedValue = [...value].reduce((acc, char, index) => {
    if (char.match(/[0-9]/) && index < 10) return acc + char;
    return acc;
  }, '');

  let result = '';
  for (let i = 0; i < validatedValue.length; i++) {
    if (i === 2 || i === 4) result += '.';
    result += validatedValue[i];
  }
  return result;
};
