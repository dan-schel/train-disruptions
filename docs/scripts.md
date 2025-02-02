# Scripts <!-- omit in toc -->

<!-- Table of contents created using "Markdown All in One" VSCode extension. -->
<!-- Command palette: "> Markdown All in One: Update Table of Contents" -->

## Contents <!-- omit in toc -->

- [Check for errors](#check-for-errors)
- [Format code](#format-code)
- [Run unit tests](#run-unit-tests)
- [Preview production-style build](#preview-production-style-build)
- [Regenerate map geometry](#regenerate-map-geometry)

## Check for errors

Runs [ESLint](https://eslint.org/) and the Typescript compiler to enforce code quality and check for errors:

```
npm run lint
```

## Format code

Runs [Prettier](https://prettier.io/) rewrite code into a consistent format:

```
npm run format
```

## Run unit tests

Runs unit tests defined in `tests` directory:

```
npm run test
```

## Preview production-style build

Runs the server in production-mode (i.e. without hot-reloading and with `NODE_ENV=production`):

```
npm run build && npm run start
```

## Regenerate map geometry

Regenerates the geometry `*.json` files used by the `<Map>` component. Required after any code changes within `scripts/generate-map-geometry`.

```
npx tsx scripts/generate-map-geometry/index.ts
```
