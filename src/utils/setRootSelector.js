export default (rootSelector) => (anotherSelector = '') => {
  return `${rootSelector} ${anotherSelector}`;
};
