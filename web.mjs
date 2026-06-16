import daysData from "./days.json" with { type: "json" };
import { getCommemorativeDate, MONTH_NAMES } from "./common.mjs";

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getEventsForMonth(month, year) {
  const events = {};

  daysData.forEach((day) => {
    const date = getCommemorativeDate(day, year);

    // Only include events that fall in the current month
    if (date.getMonth() === month) {
      const d = date.getDate();
      if (!events[d]) events[d] = [];
      events[d].push(day.name);
    }
  });

  return events;
}

function createCalendarGrid(month, year) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  const daysInMonth = getDaysInMonth(month, year);
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const events = getEventsForMonth(month, year);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  weekdays.forEach((dayName) => {
    const header = document.createElement("div");
    header.classList.add("calendar-cell");
    header.textContent = dayName;
    calendar.appendChild(header);
  });

  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("calendar-cell", "empty");
    calendar.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.classList.add("calendar-cell");
    cell.textContent = day;

    if (events[day]) {
      events[day].forEach((eventName) => {
        const eventEl = document.createElement("div");
        eventEl.classList.add("event");
        eventEl.textContent = eventName;
        cell.appendChild(eventEl);
      });
    }

    calendar.appendChild(cell);
  }
}

function renderCalendar(month, year) {
  createCalendarGrid(month, year);
}

window.onload = function () {
  const monthSelect = document.getElementById("month-select");
  const yearSelect = document.getElementById("year-select");
  const prevBtn = document.getElementById("prev-month");
  const nextBtn = document.getElementById("next-month");

  const currentYear = new Date().getFullYear();

  MONTH_NAMES.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  for (let year = currentYear - 100; year <= currentYear + 100; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }

  monthSelect.value = new Date().getMonth();
  yearSelect.value = currentYear;

  renderCalendar(Number(monthSelect.value), Number(yearSelect.value));

  monthSelect.addEventListener("change", () => {
    renderCalendar(Number(monthSelect.value), Number(yearSelect.value));
  });

  yearSelect.addEventListener("change", () => {
    renderCalendar(Number(monthSelect.value), Number(yearSelect.value));
  });

  prevBtn.addEventListener("click", () => {
    let month = Number(monthSelect.value);
    let year = Number(yearSelect.value);

    month--;

    if (month < 0) {
      month = 11;
      year--;
    }

    monthSelect.value = month;
    yearSelect.value = year;

    renderCalendar(month, year);
  });

  nextBtn.addEventListener("click", () => {
    let month = Number(monthSelect.value);
    let year = Number(yearSelect.value);

    month++;

    if (month > 11) {
      month = 0;
      year++;
    }

    monthSelect.value = month;
    yearSelect.value = year;

    renderCalendar(month, year);
  });

  console.log(`Loaded ${daysData.length} commemorative days`);
};
