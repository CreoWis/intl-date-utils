export function formatDate(
  date: Date | number | string,
  locale?: string,
  style?: 'full' | 'long' | 'medium' | 'short'
): string

export function formatTime(
  date: Date | number | string,
  locale?: string,
  style?: 'full' | 'long' | 'medium' | 'short'
): string

export function formatDateTime(
  date: Date | number | string,
  locale?: string,
  options?: {
    dateStyle?: 'full' | 'long' | 'medium' | 'short'
    timeStyle?: 'full' | 'long' | 'medium' | 'short'
    timeZone?: string
  }
): string

export function formatInTimezone(
  date: Date | number | string,
  timeZone: string,
  locale?: string
): string

export function toLocaleDateISO(
  date: Date | number | string,
  timeZone?: string
): string

export function timeAgo(
  date: Date | number | string,
  locale?: string
): string

export function getMonthNames(
  locale?: string,
  style?: 'long' | 'short' | 'narrow'
): string[]

export function getDayNames(
  locale?: string,
  style?: 'long' | 'short' | 'narrow',
  startDay?: number
): string[]

export function formatRange(
  start: Date | number | string,
  end: Date | number | string,
  locale?: string,
  style?: 'full' | 'long' | 'medium' | 'short'
): string

export function isToday(date: Date | number | string): boolean
export function isYesterday(date: Date | number | string): boolean
export function isTomorrow(date: Date | number | string): boolean

export function startOfDay(date: Date | number | string): Date
export function endOfDay(date: Date | number | string): Date

export function addDays(
  date: Date | number | string,
  amount: number
): Date

export function addMonths(
  date: Date | number | string,
  amount: number
): Date

export function differenceInDays(
  a: Date | number | string,
  b: Date | number | string
): number

export function parseISO(value: string): Date

export function formatSmartDate(
  date: Date | number | string,
  locale?: string
): string