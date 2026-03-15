// dateUtils.js
// Modern Intl-based date utilities
// Zero dependencies. Node 18+ and modern browsers.

// ─────────────────────────────────────────────
// Internal Helpers
// ─────────────────────────────────────────────

function toDate(value) {
  const d = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(d.getTime())) {
    throw new Error(`Invalid date value: ${value}`)
  }

  return d
}

// ─────────────────────────────────────────────
// Intl Formatter Cache
// ─────────────────────────────────────────────

const formatterCache = new Map()

function getFormatter(locale, options) {
  const key = locale + "|" + JSON.stringify(options)

  if (!formatterCache.has(key)) {
    formatterCache.set(key, new Intl.DateTimeFormat(locale, options))
  }

  return formatterCache.get(key)
}

// ─────────────────────────────────────────────
// Core Formatting Utilities
// ─────────────────────────────────────────────

function formatDate(date, locale = "en-US", style = "medium") {
  return getFormatter(locale, { dateStyle: style }).format(toDate(date))
}

function formatTime(date, locale = "en-US", style = "short") {
  return getFormatter(locale, { timeStyle: style }).format(toDate(date))
}

function formatDateTime(date, locale = "en-US", options = {}) {
  const { dateStyle = "medium", timeStyle = "short", timeZone } = options

  return getFormatter(locale, {
    dateStyle,
    timeStyle,
    timeZone
  }).format(toDate(date))
}

function formatInTimezone(date, timeZone, locale = "en-US") {
  return getFormatter(locale, {
    dateStyle: "long",
    timeStyle: "short",
    timeZone
  }).format(toDate(date))
}

// ─────────────────────────────────────────────
// ISO Calendar Date
// Useful for cross-timezone comparisons
// ─────────────────────────────────────────────

function toLocaleDateISO(date, timeZone = "UTC") {
  const fmt = getFormatter("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone
  })

  const parts = Object.fromEntries(
    fmt.formatToParts(toDate(date)).map(p => [p.type, p.value])
  )

  return parts.year + "-" + parts.month + "-" + parts.day
}

// ─────────────────────────────────────────────
// Relative Time
// ─────────────────────────────────────────────

const rtfCache = new Map()

function getRTF(locale, numeric = "auto") {
  const key = locale + "|" + numeric

  if (!rtfCache.has(key)) {
    rtfCache.set(key, new Intl.RelativeTimeFormat(locale, { numeric }))
  }

  return rtfCache.get(key)
}

const RELATIVE_UNITS = [
  ["year", 31536000],
  ["month", 2592000],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1]
]

function timeAgo(date, locale = "en") {
  const diffSeconds = (toDate(date).getTime() - Date.now()) / 1000
  const abs = Math.abs(diffSeconds)

  const rtf = getRTF(locale)

  for (const [unit, seconds] of RELATIVE_UNITS) {
    if (abs >= seconds) {
      return rtf.format(Math.round(diffSeconds / seconds), unit)
    }
  }

  return rtf.format(0, "second")
}

// ─────────────────────────────────────────────
// Calendar Helpers
// ─────────────────────────────────────────────

function getMonthNames(locale = "en-US", style = "long") {
  const fmt = getFormatter(locale, { month: style })

  return Array.from({ length: 12 }, (_, i) =>
    fmt.format(new Date(2026, i, 1))
  )
}

function getDayNames(locale = "en-US", style = "long", startDay = 0) {
  const fmt = getFormatter(locale, { weekday: style })

  return Array.from({ length: 7 }, (_, i) =>
    fmt.format(new Date(2026, 0, 4 + startDay + i))
  )
}

// ─────────────────────────────────────────────
// Date Range Formatting
// ─────────────────────────────────────────────

function formatRange(start, end, locale = "en-US", style = "long") {
  const fmt = getFormatter(locale, { dateStyle: style })

  return fmt.formatRange(toDate(start), toDate(end))
}

// ─────────────────────────────────────────────
// Date Comparison Helpers
// ─────────────────────────────────────────────

function sameCalendarDate(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isToday(date) {
  return sameCalendarDate(toDate(date), new Date())
}

function isYesterday(date) {
  const today = startOfDay(new Date())
  const yesterday = addDays(today, -1)

  return sameCalendarDate(toDate(date), yesterday)
}

function isTomorrow(date) {
  const today = startOfDay(new Date())
  const tomorrow = addDays(today, 1)

  return sameCalendarDate(toDate(date), tomorrow)
}

// ─────────────────────────────────────────────
// Date Math Utilities
// ─────────────────────────────────────────────

function startOfDay(date) {
  const d = toDate(date)
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function endOfDay(date) {
  const d = toDate(date)
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999)
}

function addDays(date, amount) {
  const d = toDate(date)
  const result = new Date(d)
  result.setDate(result.getDate() + amount)
  return result
}

function addMonths(date, amount) {
  const d = toDate(date)
  const result = new Date(d)
  result.setMonth(result.getMonth() + amount)
  return result
}

function differenceInDays(a, b) {
  const diff =
    startOfDay(toDate(a)).getTime() - startOfDay(toDate(b)).getTime()

  return Math.round(diff / 86400000)
}

// ─────────────────────────────────────────────
// ISO Parsing
// ─────────────────────────────────────────────

function parseISO(value) {
  const d = new Date(value)

  if (Number.isNaN(d.getTime())) {
    throw new Error(`Invalid ISO date: ${value}`)
  }

  return d
}

// ─────────────────────────────────────────────
// Smart UI Formatting
// Perfect for feeds / dashboards
// ─────────────────────────────────────────────

function formatSmartDate(date, locale = "en-US") {
  const d = toDate(date)

  if (isToday(d)) {
    return "Today " + formatTime(d, locale)
  }

  if (isYesterday(d)) {
    return "Yesterday"
  }

  const diff = Math.abs(Date.now() - d.getTime())

  if (diff < 7 * 86400000) {
    return timeAgo(d, locale)
  }

  return formatDate(d, locale, "medium")
}

export {
  addDays,
  addMonths,
  differenceInDays,
  endOfDay,
  formatDate,
  formatDateTime,
  formatInTimezone,
  formatRange,
  formatSmartDate,
  formatTime,
  getDayNames,
  getMonthNames,
  isToday,
  isTomorrow,
  isYesterday,
  parseISO,
  startOfDay,
  timeAgo,
  toLocaleDateISO
};
