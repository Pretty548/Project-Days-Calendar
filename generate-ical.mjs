// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

import { getCommemorativeDate } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };
import { writeFileSync } from "fs";

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + month + day;
}

function generateEvent(day, year) {
  const startDate = getCommemorativeDate(day, year);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 1);

  return `BEGIN:VEVENT
SUMMARY:${day.name}
DTSTART;VALUE=DATE:${formatDate(startDate)}
DTEND;VALUE=DATE:${formatDate(endDate)}
END:VEVENT`;
}

const events = [];

daysData.forEach((day) => {
  for (let year = 2020; year <= 2030; year++) {
    events.push(generateEvent(day, year));
  }
});

const output = `BEGIN:VCALENDAR\nVERSION:2.0\n${events.join("\n")}\nEND:VCALENDAR`;

writeFileSync("days.ics", output);
