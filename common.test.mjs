import {
  getNthWeekdayOfMonth,
  getLastWeekdayOfMonth,
  getCommemorativeDate,
} from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("getNthWeekdayOfMonth: second Tuesday of October 2024 is the 8th", () => {
  const result = getNthWeekdayOfMonth(2024, 9, 2, 2); // month 9 = October (0-indexed)
  assert.equal(result.getFullYear(), 2024);
  assert.equal(result.getMonth(), 9);
  assert.equal(result.getDate(), 8);
});

test("getNthWeekdayOfMonth: second Tuesday of October 2025 is the 14th", () => {
  const result = getNthWeekdayOfMonth(2025, 9, 2, 2);
  assert.equal(result.getDate(), 14);
});

test("getNthWeekdayOfMonth: second Tuesday of October 2020 is the 13th", () => {
  const result = getNthWeekdayOfMonth(2020, 9, 2, 2);
  assert.equal(result.getDate(), 13);
});

test("getNthWeekdayOfMonth: second Saturday of May 2030 is the 11th (Binturong Day)", () => {
  const result = getNthWeekdayOfMonth(2030, 4, 6, 2); // month 4 = May, 6 = Saturday
  assert.equal(result.getDate(), 11);
});

test("getNthWeekdayOfMonth: first Saturday of September 2024 is the 7th (Vulture Day)", () => {
  const result = getNthWeekdayOfMonth(2024, 8, 6, 1); // month 8 = September
  assert.equal(result.getDate(), 7);
});

// getLastWeekdayOfMonth ────────────────────────────────────────────────────

test("getLastWeekdayOfMonth: last Friday of October 2024 is the 25th (Lemur Day)", () => {
  const result = getLastWeekdayOfMonth(2024, 9, 5); // 5 = Friday
  assert.equal(result.getDate(), 25);
});

test("getLastWeekdayOfMonth: last Friday of October 2020 is the 30th", () => {
  const result = getLastWeekdayOfMonth(2020, 9, 5);
  assert.equal(result.getDate(), 30);
});

test("getLastWeekdayOfMonth: last Friday of October 2025", () => {
  const result = getLastWeekdayOfMonth(2025, 9, 5);
  // October 2025: Oct 31 is a Friday, so last Friday = 31
  assert.equal(result.getDate(), 31);
});

// ── getCommemorativeDate ─────────────────────────────────────────────────────

test("getCommemorativeDate: Ada Lovelace Day 2024 is October 8th", () => {
  const ada = {
    name: "Ada Lovelace Day",
    monthName: "October",
    dayName: "Tuesday",
    occurrence: "second",
  };
  const result = getCommemorativeDate(ada, 2024);
  assert.equal(result.getMonth(), 9); // October
  assert.equal(result.getDate(), 8);
});

test("getCommemorativeDate: World Lemur Day 2024 is October 25th", () => {
  const lemur = {
    name: "World Lemur Day",
    monthName: "October",
    dayName: "Friday",
    occurrence: "last",
  };
  const result = getCommemorativeDate(lemur, 2024);
  assert.equal(result.getDate(), 25);
});

test("getCommemorativeDate: International Vulture Awareness Day 2024 is September 7th", () => {
  const vulture = {
    name: "International Vulture Awareness Day",
    monthName: "September",
    dayName: "Saturday",
    occurrence: "first",
  };
  const result = getCommemorativeDate(vulture, 2024);
  assert.equal(result.getMonth(), 8); // September
  assert.equal(result.getDate(), 7);
});

test("getCommemorativeDate: International Red Panda Day 2024 is September 21st", () => {
  const redPanda = {
    name: "International Red Panda Day",
    monthName: "September",
    dayName: "Saturday",
    occurrence: "third",
  };
  const result = getCommemorativeDate(redPanda, 2024);
  assert.equal(result.getDate(), 21);
});
