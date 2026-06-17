import { getCommemorativeDate } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };
import { writeFileSync } from "fs";
import { fetchDescription } from "./description.mjs";

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + month + day;
}

function generateEvent(day, year, description) {
  const startDate = getCommemorativeDate(day, year);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 1);

  return `BEGIN:VEVENT
SUMMARY:${day.name}
DTSTART;VALUE=DATE:${formatDate(startDate)}
DTEND;VALUE=DATE:${formatDate(endDate)}
DESCRIPTION:${description}
END:VEVENT`;
}

async function main() {
  const events = [];

  for (const day of daysData) {
    const description = await fetchDescription(day.descriptionURL);
    for (let year = 2020; year <= 2030; year++) {
      events.push(generateEvent(day, year, description));
    }
  }

  const output = `BEGIN:VCALENDAR\nVERSION:2.0\n${events.join("\n")}\nEND:VCALENDAR`;
  writeFileSync("days.ics", output);
}

main();
