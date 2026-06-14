// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

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

  console.log(`Loaded ${daysData.length} commemorative days`);
};
