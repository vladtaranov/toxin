import store from './calendar.store';
import chunk from 'lodash.chunk';
import getMonthTitle from '../../utils/getMonthTitle';
import getMonthLength from '../../utils/getMonthLength';
import isDateEqual from '../../utils/isDateEqual';
import setRootSelector from '../../utils/setRootSelector';
import cn from 'classnames';

let state;
let dates;
let setSelector;

const createDate = (day) => {
  const selectedYear = state.selectedMonth.getFullYear();
  const selectedMonth = state.selectedMonth.getMonth();

  return {
    value: new Date(selectedYear, selectedMonth, day),
    isSelectedMonth: selectedMonth === new Date(selectedYear, selectedMonth, day).getMonth()
  };
};

const composeDates = () => {
  const dates = [];
  const selectedYear = state.selectedMonth.getFullYear();
  const selectedMonth = state.selectedMonth.getMonth();

  const monthLength = getMonthLength(state.selectedMonth);
  const firstDayOfWeek = new Date(selectedYear, selectedMonth, 1).getDay();
  const lastDayOfWeek = new Date(selectedYear, selectedMonth + 1, -1).getDay();
  for (let day = -firstDayOfWeek + 2; day <= (monthLength + 6 - lastDayOfWeek); day++) {
    dates.push(createDate(day));
  }

  return chunk(dates, 7);
};

const renderMonth = () => {
  const monthContainer = document.querySelector(setSelector('.js__calendar-month'));

  const selectedYear = state.selectedMonth.getFullYear();
  const selectedMonth = state.selectedMonth.getMonth();
  monthContainer.innerHTML = `${getMonthTitle(selectedMonth)} ${selectedYear}`;
};

const renderDates = () => {
  dates = composeDates();
  const datesContainer = document.querySelector(setSelector('.js__calendar-dates'));

  const weeksNodes = [];
  dates.map((week) => {
    const weekContainer = document.createElement('div');
    weekContainer.classList.add('calendar__week');

    const datesNodes = [];
    week.map((date) => {
      const dateContainer = document.createElement('div');
      const year = date.value.getFullYear();
      const month = date.value.getMonth() + 1;
      const day = date.value.getDate();
      dateContainer.dataset.date = `${year}-${month}-${day}`;

      dateContainer.className = cn(
        'calendar__date',
        'js__calendar-date',
        { 'is-selected-month': date.isSelectedMonth },
        { 'is-start-date': isDateEqual(date.value, state.startDate) },
        {
          'with-gap-background':
            (isDateEqual(date.value, state.startDate) && state.endDate) ||
            (isDateEqual(date.value, state.endDate) && state.startDate)
        },
        {
          'is-gap-date': state.startDate &&
            date.value >= state.startDate &&
            date.value <= state.endDate
        },
        { 'is-end-date': isDateEqual(date.value, state.endDate) },
        { 'is-today': isDateEqual(date.value, state.today) }
      );
      dateContainer.innerHTML = date.value.getDate();
      datesNodes.push(dateContainer);
    });

    weekContainer.append(...datesNodes);
    weeksNodes.push(weekContainer);
  });

  datesContainer.append(...weeksNodes);
};

const renderClearButton = () => {
  const clearButton = document.querySelector(setSelector('.js__calendar-clear'));
  state.startDate || state.endDate
    ? clearButton.classList.remove('is-hidden')
    : clearButton.classList.add('is-hidden');
};

export default (name) => {
  state = store.getState(name);
  setSelector = setRootSelector(`[data-name="${name}"]`);

  const datesContainer = document.querySelector(setSelector('.js__calendar-dates'));
  while (datesContainer.firstChild) datesContainer.firstChild.remove();
  renderMonth();
  renderDates();
  renderClearButton();
};
