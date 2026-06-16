// Shared date calculation logic to be used by both web.mjs and generate-ical.mjs

export const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const MONTH_NAMES = [
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

const OCCURRENCE_MAP = { first: 1, second: 2, third: 3, fourth: 4 };

export function getNthWeekdayOfMonth(year, month, weekday, n) {
  // Start on the 1st of the month
  const first = new Date(year, month, 1);
  const firstWeekday = first.getDay();

  let daysUntilTarget = (weekday - firstWeekday + 7) % 7;

  const firstOccurrence = 1 + daysUntilTarget;

  const dayOfMonth = firstOccurrence + (n - 1) * 7;

  return new Date(year, month, dayOfMonth);
}

export function getLastWeekdayOfMonth(year, month, weekday) {
  const lastDay = new Date(year, month + 1, 0);
  const lastWeekday = lastDay.getDay();

  const daysBack = (lastWeekday - weekday + 7) % 7;
  const dayOfMonth = lastDay.getDate() - daysBack;

  return new Date(year, month, dayOfMonth);
}

export function getCommemorativeDate(dayConfig, year) {
  const month = MONTH_NAMES.indexOf(dayConfig.monthName);
  const weekday = WEEKDAY_NAMES.indexOf(dayConfig.dayName);

  if (dayConfig.occurrence === "last") {
    return getLastWeekdayOfMonth(year, month, weekday);
  }

  const n = OCCURRENCE_MAP[dayConfig.occurrence];
  return getNthWeekdayOfMonth(year, month, weekday, n);
}
