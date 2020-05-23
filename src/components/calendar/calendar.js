import store from './calendar.store';
import getFormattedDate from '../../utils/getFormattedDate';
import render from './calendar.render';

const onCalendarClick = ({ target }) => {
  const calendarName = target.closest('.js__calendar').dataset.name;

  if (target.closest('.js__calendar-previous-month')) {
    store.toPreviousMonth(calendarName);
  }

  if (target.closest('.js__calendar-next-month')) {
    store.toNextMonth(calendarName);
  }

  if (target.closest('.js__calendar-date')) {
    const newDate = new Date(target.dataset.date);
    store.updateDate(calendarName, newDate);
  }

  if (target.closest('.js__calendar-clear')) {
    store.clear(calendarName);
  }

  if (target.closest('.js__calendar-apply')) {
    target.closest('.js__calendar').classList.remove('is-open');
  }

  render(calendarName);
  document.querySelector(`[data-name="${calendarName}"] .js__calendar-start`)
    .value = getFormattedDate(store.getState(calendarName).startDate);
  document.querySelector(`[data-name="${calendarName}"] .js__calendar-end`)
    .value = getFormattedDate(store.getState(calendarName).endDate);
};

const onDocumentClick = ({ target }) => {
  const clickedCalendar = target.closest('.js__calendar');
  document.querySelectorAll('.js__calendar')
    .forEach((calendar) => {
      if (clickedCalendar !== calendar) {
        calendar.classList.remove('is-open');
      }
    });
};

const init = () => {
  document.querySelectorAll('.js__calendar')
    .forEach((calendar) => {
      const calendarName = calendar.dataset.name;
      let startDay =
        document.querySelector(`[data-name="${calendarName}"] .js__calendar-start`).value;
      let endDay =
        document.querySelector(`[data-name="${calendarName}"] .js__calendar-end`).value;
      startDay = startDay === ''
        ? null
        : new Date(...startDay.split('-'));
      endDay = endDay === ''
        ? null
        : new Date(...endDay.split('-'));

      const initialState = {
        today: new Date(),
        startDate: startDay,
        endDate: endDay,
        selectedMonth: new Date()
      };

      store.addCalendar(calendarName, initialState);
      render(calendarName);
      calendar.addEventListener('click', onCalendarClick);
    });

  document.addEventListener('click', onDocumentClick, true);
};

export default {
  init
};
