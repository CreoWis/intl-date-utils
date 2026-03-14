import test from "node:test"
import assert from "node:assert/strict"

import {
  formatDate,
  formatTime,
  formatDateTime,
  formatInTimezone,
  toLocaleDateISO,
  timeAgo,
  getMonthNames,
  getDayNames,
  formatRange,
  isToday,
  isYesterday,
  isTomorrow,
  startOfDay,
  endOfDay,
  addDays,
  addMonths,
  differenceInDays,
  parseISO,
  formatSmartDate
} from "../src/dateUtils.js"

const sampleDate = new Date("2026-03-15T14:30:00Z")

// ---------------------------------------------------
// formatDate
// ---------------------------------------------------

test("formatDate returns formatted date string", () => {
  const result = formatDate(sampleDate, "en-US", "long")
  assert.equal(typeof result, "string")
  assert.ok(result.includes("2026"))
})

// ---------------------------------------------------
// formatTime
// ---------------------------------------------------

test("formatTime returns formatted time", () => {
  const result = formatTime(sampleDate, "en-US")
  assert.equal(typeof result, "string")
})

// ---------------------------------------------------
// formatDateTime
// ---------------------------------------------------

test("formatDateTime formats date and time", () => {
  const result = formatDateTime(sampleDate, "en-US")
  assert.equal(typeof result, "string")
})

// ---------------------------------------------------
// formatInTimezone
// ---------------------------------------------------

test("formatInTimezone formats date in provided timezone", () => {
  const result = formatInTimezone(sampleDate, "Asia/Tokyo")
  assert.equal(typeof result, "string")
})

// ---------------------------------------------------
// toLocaleDateISO
// ---------------------------------------------------

test("toLocaleDateISO returns YYYY-MM-DD format", () => {
  const result = toLocaleDateISO(sampleDate)
  assert.match(result, /^\d{4}-\d{2}-\d{2}$/)
})

// ---------------------------------------------------
// timeAgo
// ---------------------------------------------------

test("timeAgo returns relative time string", () => {
  const past = addDays(new Date(), -2)
  const result = timeAgo(past)

  assert.equal(typeof result, "string")
})

// ---------------------------------------------------
// getMonthNames
// ---------------------------------------------------

test("getMonthNames returns 12 months", () => {
  const months = getMonthNames()

  assert.equal(months.length, 12)
  assert.equal(typeof months[0], "string")
})

// ---------------------------------------------------
// getDayNames
// ---------------------------------------------------

test("getDayNames returns 7 day names", () => {
  const days = getDayNames()

  assert.equal(days.length, 7)
  assert.equal(typeof days[0], "string")
})

// ---------------------------------------------------
// formatRange
// ---------------------------------------------------

test("formatRange returns formatted range string", () => {
  const start = new Date("2026-03-10")
  const end = new Date("2026-03-15")

  const result = formatRange(start, end)

  assert.equal(typeof result, "string")
})

// ---------------------------------------------------
// startOfDay
// ---------------------------------------------------

test("startOfDay resets time to midnight", () => {
  const d = startOfDay(sampleDate)

  assert.equal(d.getHours(), 0)
  assert.equal(d.getMinutes(), 0)
})

// ---------------------------------------------------
// endOfDay
// ---------------------------------------------------

test("endOfDay sets time to end of day", () => {
  const d = endOfDay(sampleDate)

  assert.equal(d.getHours(), 23)
  assert.equal(d.getMinutes(), 59)
})

// ---------------------------------------------------
// addDays
// ---------------------------------------------------

test("addDays correctly adds days", () => {
  const d = new Date("2026-03-10")

  const result = addDays(d, 5)

  assert.equal(result.getDate(), 15)
})

// ---------------------------------------------------
// addMonths
// ---------------------------------------------------

test("addMonths correctly adds months", () => {
  const d = new Date("2026-01-10")

  const result = addMonths(d, 2)

  assert.equal(result.getMonth(), 2)
})

// ---------------------------------------------------
// differenceInDays
// ---------------------------------------------------

test("differenceInDays calculates difference correctly", () => {
  const a = new Date("2026-03-15")
  const b = new Date("2026-03-10")

  const diff = differenceInDays(a, b)

  assert.equal(diff, 5)
})

// ---------------------------------------------------
// parseISO
// ---------------------------------------------------

test("parseISO parses ISO string correctly", () => {
  const d = parseISO("2026-03-15")

  assert.ok(d instanceof Date)
  assert.equal(d.getFullYear(), 2026)
})

test("parseISO throws for invalid date", () => {
  assert.throws(() => parseISO("invalid-date"))
})

// ---------------------------------------------------
// isToday
// ---------------------------------------------------

test("isToday detects today", () => {
  const today = new Date()

  assert.equal(isToday(today), true)
})

// ---------------------------------------------------
// isYesterday
// ---------------------------------------------------

test("isYesterday detects yesterday", () => {
  const yesterday = addDays(new Date(), -1)

  assert.equal(isYesterday(yesterday), true)
})

// ---------------------------------------------------
// isTomorrow
// ---------------------------------------------------

test("isTomorrow detects tomorrow", () => {
  const tomorrow = addDays(new Date(), 1)

  assert.equal(isTomorrow(tomorrow), true)
})

// ---------------------------------------------------
// formatSmartDate
// ---------------------------------------------------

test("formatSmartDate returns today format", () => {
  const result = formatSmartDate(new Date())

  assert.ok(result.startsWith("Today"))
})

test("formatSmartDate returns yesterday string", () => {
  const yesterday = addDays(new Date(), -1)

  const result = formatSmartDate(yesterday)

  assert.equal(result, "Yesterday")
})

test("formatSmartDate returns formatted date for older dates", () => {
  const oldDate = addDays(new Date(), -10)

  const result = formatSmartDate(oldDate)

  assert.equal(typeof result, "string")
})