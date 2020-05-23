import getFormattedDate from './getFormattedDate';

export default (date1, date2) => {
  if (!(date1 instanceof Date ||
     date2 instanceof Date)) return false;

  return getFormattedDate(date1) === getFormattedDate(date2);
};
