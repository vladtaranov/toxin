import isDateEqual from '../../utils/isDateEqual';

const state = {};

const addCalendar = (name, initialState) => {
  state[name] = initialState;
};

const getState = (calendarName) => {
  return state[calendarName];
};

const toPreviousMonth = (calendarName) => {
  const selectedMonth = state[calendarName].selectedMonth;

  state[calendarName].selectedMonth =
    new Date(selectedMonth.setMonth(selectedMonth.getMonth() - 1));
};

const toNextMonth = (calendarName) => {
  const selectedMonth = state[calendarName].selectedMonth;

  state[calendarName].selectedMonth =
    new Date(selectedMonth.setMonth(selectedMonth.getMonth() + 1));
};

const updateDate = (calendarName, newDate) => {
  if (isDateEqual(state[calendarName].startDate, newDate)) {
    setStartDate();
    return;
  }

  if (!state[calendarName].startDate) {
    setStartDate();
    return;
  }

  if (!state[calendarName].endDate) {
    if (newDate < state[calendarName].startDate) {
      setStartDate();
      return;
    }

    state[calendarName].endDate = newDate;
    return;
  }

  setStartDate();

  function setStartDate () {
    state[calendarName].startDate = newDate;
    state[calendarName].endDate = null
  }
};

const clear = (calendarName) => {
  state[calendarName] = {
    ...state[calendarName],
    startDate: null,
    endDate: null,
    selectedMonth: new Date()
  }
};

export default {
  addCalendar,
  getState,
  toPreviousMonth,
  toNextMonth,
  updateDate,
  clear
};
