import getMonthTitle from '../../utils/getMonthTitle';

const placeholder = 'Выберите даты';

const formatDate = (date) => {
  const month = getMonthTitle(date.getMonth())
    .slice(0, 3)
    .toLowerCase();
  const day = date.getDate();

  return `${day} ${month}`;
};

const render = (calendarName) => {
  const calendarStartInput = document
    .querySelector(`[data-name="${calendarName}"] .js__calendar-start`);
  const calendarEndInput = document
    .querySelector(`[data-name="${calendarName}"] .js__calendar-end`);

  const datesFilterContainer = document
    .querySelector(`[data-name="${calendarName}"] .js__dates-filter-field`);

  let dates;
  if (calendarStartInput.value) {
    dates = formatDate(new Date(...calendarStartInput.value.split('-')));
  }
  if (calendarEndInput.value) {
    dates += ` &ndash; ${formatDate(new Date(...calendarEndInput.value.split('-')))}`;
  }

  datesFilterContainer.innerHTML = dates || placeholder;
};

const onDatesClick = ({ target }) => {
  const calendarName = target.closest('.js__dates-filter').dataset.name;
  document.querySelector(`[data-name="${calendarName}"].js__calendar`)
    .classList.add('is-open');
};

const onDatesChange = ({ currentTarget }) => {
  const calendarName = currentTarget.dataset.name;
  render(calendarName);
};

const init = () => {
  document.querySelectorAll('.js__dates-filter')
    .forEach((item) => {
      const calendarName = item.dataset.name;
      const calendar =
        document.querySelector(`[data-name="${calendarName}"].js__calendar`);

      if (calendar) {
        render(calendarName);
        calendar.addEventListener('click', onDatesChange);
      }

      item.firstChild.addEventListener('click', onDatesClick);
    });
};

export default {
  init
};
