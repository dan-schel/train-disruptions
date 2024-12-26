# Environment Variables <!-- omit in toc -->

Environment variables allow us to change behaviour of the app depending on whether it's running locally on your development machine, or the cloud production server, and lets us avoid committing secret values (e.g. the relay key) to GitHub.

<!-- Table of contents created using "Markdown All in One" VSCode extension. -->
<!-- Command palette: "> Markdown All in One: Update Table of Contents" -->

## Contents <!-- omit in toc -->

- [Variables list](#variables-list)
  - [`DATABASE_URL`](#database_url)
  - [`RELAY_KEY`](#relay_key)
  - [`NODE_ENV`](#node_env)
  - [`NPM_CONFIG_PRODUCTION`](#npm_config_production)
  - [`PORT`](#port)
  - [`HMR_PORT`](#hmr_port)
- [Setting up variables](#setting-up-variables)
  - [Local development server](#local-development-server)
  - [Local preview of production build](#local-preview-of-production-build)
  - [Production server on Digital Ocean](#production-server-on-digital-ocean)

## Variables list

### `DATABASE_URL`

- The MongoDB connection string of the database to use.
- Takes the form of `mongodb://username:password@localhost:27017/?authMechanism=DEFAULT`, where `username`, `password`, and `27017` (the port) are changed as needed.
- Not required, the app will not remember anything across restarts unless provided!

### `RELAY_KEY`

- The relay key used to securely connect to [vtar.trainquery.com](https://vtar.trainquery.com) (more info [here](https://github.com/dan-schel/vic-transport-api-relay)).
- This is a secret value which cannot be committed to GitHub.
- Not required, but the app will not be able to fetch new disruption from the PTV API unless provided!

### `NODE_ENV`

- Either `production` or `development`.
- Defaults to `development`, but automatically set to `production` when run with `npm run start`.
- When `production`:
  - Can only be used after running `npm run build`.
  - Uses prebuilt & minified frontend code from the `dist` folder.
  - No hot-reloading.
- When `development`:
  - No build step required.
  - Frontend code hot-reloads for quick development.
  - Source maps and other debugging helpers are enabled.

### `NPM_CONFIG_PRODUCTION`

- Always `false`.
- If not set, Digital Ocean will skip installing `devDependencies`.
- No need to set locally.

### `PORT`

- The port which the server runs on.
- Defaults to `3000`.

### `HMR_PORT`

- Used internally by Vike to facilitate hot-reloading.
- Defaults to `24678`.

## Setting up variables

### Local development server

For local development, you only need to set:

- `DATABASE_URL`
- `RELAY_KEY`

To do so, create a file named `.env` in the root directory with the following content:

```dotenv
# Change username, password, and 27017 (the port) as required to connect to your
# locally running MongoDB server.
DATABASE_URL = "mongodb://username:password@localhost:27017/?authMechanism=DEFAULT"

# Secret value.
RELAY_KEY = "..."
```

The `.env` file is git-ignored, so secret values can be safely stored there.

### Local preview of production build

If you wish to preview a production build locally, simply run `npm run start` and `NODE_ENV=production` will automatically be set for you. Keep your `.env` file as-is!

### Production server on Digital Ocean

When deployed to Digital Ocean, set the variables as follows:

```dotenv
# Ensures Digital Ocean will also install `devDependencies`, which is required
# (e.g. for `cross-env`).
NPM_CONFIG_PRODUCTION = "false"

# Use this template string to have Digital Ocean automatically create database
# URL from the attached database in App Platform.
DATABASE_URL = ${trainquery-db.DATABASE_URL}

# Secret value.
RELAY_KEY = "..."
```
