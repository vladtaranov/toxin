export default (date) => {
  if (!(date instanceof Date)) return '';

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};
