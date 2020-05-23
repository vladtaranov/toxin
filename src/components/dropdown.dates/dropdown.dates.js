const placeholder = 'ДД.ММ.ГГГГ';

const formatDate = (date) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) month = `0${month}`;
  let day = date.getDate();
  if (day < 10) day = `0${day}`;

  return `${day}.${month}.${year}`;
};

const render = (calendarName) => {
  const calendarStartInput = document
    .querySelector(`[data-name="${calendarName}"] .js__calendar-start`);
  const calendarEndInput = document
    .querySelector(`[data-name="${calendarName}"] .js__calendar-end`);

  const datesStartContainer = document
    .querySelector(`[data-name="${calendarName}"] .js__dates-start`);
  const datesEndContainer = document
    .querySelector(`[data-name="${calendarName}"] .js__dates-end`);

  let startDay;
  let endDay;
  if (calendarStartInput.value) {
    startDay = formatDate(new Date(...calendarStartInput.value.split('-')));
  }
  if (calendarEndInput.value) {
    endDay = formatDate(new Date(...calendarEndInput.value.split('-')));
  }

  datesStartContainer.innerHTML = startDay || placeholder;
  datesEndContainer.innerHTML = endDay || placeholder;
};

const onDatesClick = ({ target }) => {
  const calendarName = target.closest('.js__dates').dataset.name;
  document.querySelector(`[data-name="${calendarName}"].js__calendar`)
    .classList.add('is-open');
};

const onDatesChange = ({ currentTarget }) => {
  const calendarName = currentTarget.dataset.name;
  render(calendarName);
};

const init = () => {
  document.querySelectorAll('.js__dates')
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
