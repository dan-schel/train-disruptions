# Train Disruptions

A hub for train disruption information in Melbourne and Victoria.

Very much still a work-in-progress!

✅ Beta deployment at https://beta.isitbuses.com.

## Getting started

Requires [NodeJS](https://nodejs.org/en) installed.

1. Clone the repo:

   ```
   git clone https://github.com/dan-schel/train-disruptions.git
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the server:

   ```
   npm run dev
   ```

4. Navigate to http://localhost:3000.

## Scripts

### Check for errors

Runs [ESLint](https://eslint.org/) and the Typescript compiler to enforce code quality and check for errors:

```
npm run lint
```

### Format code

Runs [Prettier](https://prettier.io/) rewrite code into a consistent format:

```
npm run format
```

### Run unit tests

Runs unit tests defined in `tests` directory:

```
npm run test
```

### Preview production-style build

Runs the server in production-mode (i.e. without hot-reloading and with `NODE_ENV=production`):

```
npm run build && npm run start
```

## Docs

### Typescript

- https://www.typescriptlang.org

### Express

- http://expressjs.com/

### Vike

- The README.md from the template: [VIKE-DOCS.md](./VIKE-DOCS.md)
- https://vike.dev

### Tailwind

- https://tailwindcss.com/
