
# intl-date-utils

Lightweight date utilities powered by the modern JavaScript Intl API.

Features:

- Zero dependencies
- Intl based formatting
- Timezone aware
- Relative time utilities
- Small bundle size
- Works in Node.js and modern browsers

## Installation

npm install intl-date-utils

## Usage

```js
import { formatDate, timeAgo } from 'intl-date-utils'

formatDate(new Date())
timeAgo(new Date(Date.now() - 86400000))
```

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

MIT
