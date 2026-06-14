import daysData from "./days.json" with { type: "json" };

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function createCalendarGrid(month, year) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  const daysInMonth = getDaysInMonth(month, year);
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.textContent = "";
    calendar.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.textContent = day;
    calendar.appendChild(cell);
  }
}

function renderCalendar(month, year) {
  createCalendarGrid(month, year);
}

window.onload = function () {
  const monthSelect = document.getElementById("month-select");
  const yearSelect = document.getElementById("year-select");

  const currentYear = new Date().getFullYear();

  months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }

  monthSelect.value = new Date().getMonth();
  yearSelect.value = currentYear;

  renderCalendar(Number(monthSelect.value), Number(yearSelect.value));

  console.log(`Loaded ${daysData.length} commemorative days`);
};
