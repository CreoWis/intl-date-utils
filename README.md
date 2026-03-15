
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
# intl-date-utils

Lightweight date utilities powered by the modern JavaScript Intl API.

Features:

- Zero dependencies
- Intl-based formatting
- Timezone aware
- Relative time utilities
- Small bundle size
- Works in Node.js and modern browsers
- Types enabled to work with TypeScript Projects

## Installation
Using NPM

```bash
npm install intl-date-utils
```

Using Yarn

```bash
yarn add intl-date-utils
```

Using Pnpm

```bash
pnpm install intl-date-utils
```


## Usage

```js
import { formatDate, timeAgo } from 'intl-date-utils'

formatDate(new Date())
timeAgo(new Date(Date.now() - 86400000))
```

## Available Methods

| Method | Description | Example |
|------|-------------|--------|
| `formatDate(date, locale?, style?)` | Formats a date using locale-aware Intl date styles (`full`, `long`, `medium`, `short`). | `formatDate(new Date(), "en-US", "long")` |
| `formatTime(date, locale?, style?)` | Formats only the time portion of a date using Intl time styles. | `formatTime(new Date(), "en-US")` |
| `formatDateTime(date, locale?, options?)` | Formats date and time together with optional timezone support. | `formatDateTime(new Date(), "en-US", { timeZone: "Asia/Tokyo" })` |
| `formatInTimezone(date, timeZone, locale?)` | Formats a date in a specific timezone regardless of system timezone. | `formatInTimezone(new Date(), "Asia/Tokyo")` |
| `toLocaleDateISO(date, timeZone?)` | Returns a timezone-aware ISO calendar date string (`YYYY-MM-DD`). Useful for comparing dates across timezones. | `toLocaleDateISO(new Date(), "UTC")` |
| `timeAgo(date, locale?)` | Returns human-readable relative time like "3 days ago" or "in 2 hours". | `timeAgo(new Date(Date.now() - 86400000))` |
| `getMonthNames(locale?, style?)` | Returns an array of localized month names. | `getMonthNames("en-US")` |
| `getDayNames(locale?, style?, startDay?)` | Returns localized weekday names with optional start day (0 = Sunday, 1 = Monday). | `getDayNames("en-US", "long", 1)` |
| `formatRange(start, end, locale?, style?)` | Formats a date range using Intl range formatting. | `formatRange(new Date("2026-03-10"), new Date("2026-03-15"))` |
| `isToday(date)` | Returns `true` if the provided date is today. | `isToday(new Date())` |
| `isYesterday(date)` | Returns `true` if the date is yesterday. | `isYesterday(new Date(Date.now() - 86400000))` |
| `isTomorrow(date)` | Returns `true` if the date is tomorrow. | `isTomorrow(addDays(new Date(), 1))` |
| `startOfDay(date)` | Returns a new Date representing the start of the day (00:00:00). | `startOfDay(new Date())` |
| `endOfDay(date)` | Returns a new Date representing the end of the day (23:59:59.999). | `endOfDay(new Date())` |
| `addDays(date, amount)` | Adds or subtracts days from a date. | `addDays(new Date(), 5)` |
| `addMonths(date, amount)` | Adds or subtracts months from a date. | `addMonths(new Date(), 2)` |
| `differenceInDays(a, b)` | Returns the number of calendar days between two dates. | `differenceInDays(new Date("2026-03-15"), new Date("2026-03-10"))` |
| `parseISO(value)` | Parses an ISO date string and returns a Date object with validation. | `parseISO("2026-03-15")` |
| `formatSmartDate(date, locale?)` | Smart UI formatting (Today, Yesterday, relative time, or formatted date). | `formatSmartDate(new Date())` |

## Development

Install dependencies

```bash
npm install
```

Run tests

```bash
npm test
```

Build library

```bash
npm run build
```

## Test Package Locally

Create npm tarball

```bash
npm pack
```

This generates:

```bash
intl-date-utils-1.0.0.tgz
```

You can test install locally:

```bash
npm install ./intl-date-utils-1.0.0.tgz
```

## Publish to npm

Login

```bash
npm login
```

Publish

```bash
npm publish --access public
```

## License

[MIT](./LICENSE)

## 🤝 Contributing

Contributions are always welcome!

See [CONTRIBUTING.md](https://github.com/CreoWis/intl-date-utils/blob/main/CONTRIBUTING.md) for ways to get started.

Please adhere to this project's [code of conduct](https://github.com/CreoWis/intl-date-utils/blob/main/CODE_OF_CONDUCT.md).

## 🙏 Support Us

This is an OSS project maintained by [CreoWis](https://www.creowis.com/). We need all the support we can get. Please give this project a ⭐️ to encourage and show that you liked it.

If you found the project helpful, consider supporting us with a ☕

<a href="https://www.buymeacoffee.com/creowis">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50px">
</a>

## Change Logs
Read about changes here:[CHANGE LOGS](./CHANGE_LOGS.md)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://tapasadhikary.com"><img src="https://avatars.githubusercontent.com/u/3633137?v=4?s=100" width="100px;" alt="Tapas Adhikary"/><br /><sub><b>Tapas Adhikary</b></sub></a><br /><a href="https://github.com/CreoWis/intl-date-utils/commits?author=atapas" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ATechAjay"><img src="https://avatars.githubusercontent.com/u/76649353?v=4?s=100" width="100px;" alt="Ajay Yadav"/><br /><sub><b>Ajay Yadav</b></sub></a><br /><a href="https://github.com/CreoWis/intl-date-utils/commits?author=ATechAjay" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
