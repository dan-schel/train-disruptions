# Scripts

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
