window.onload = function () {
  const monthSelect = document.getElementById("month-select");
  const yearSelect = document.getElementById("year-select");
  const prevBtn = document.getElementById("prev-month");
  const nextBtn = document.getElementById("next-month");

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
};
