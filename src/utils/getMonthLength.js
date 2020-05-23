export default (month) => {
  return new Date(month.getFullYear(), month.getMonth() + 1, 0)
    .getDate();
};
