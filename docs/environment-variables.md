# Environment Variables

## Variables

### `NODE_ENV`

Either `development` (default) or `production`.

Tells the server whether it's running in production mode or not. In production mode, the `dist` folder has been pre-built using `npm run build`, and code does not hot-reload. Performance is prioritized over ease-of-debugging.

### `NPM_CONFIG_PRODUCTION`

Either `true` or `false`.

Should always be set to `false`, which tells NPM to install `devDependencies` even when in production. Without this, the server fails to start because `cross-env`, `tsx`, and more are in `devDependencies`.

### `DATABASE_URL`

The database connection string for MongoDB. An example is `mongodb://train-disruptions:password@localhost:27017/?authMechanism=DEFAULT`.

### `RELAY_KEY`

## Deployment (Digital Ocean)

When deployed to Digital Ocean, set the variables as follows:

| Variable                | Value                           | Comment                                                                             |
| ----------------------- | ------------------------------- | ----------------------------------------------------------------------------------- |
| `NODE_ENV`              | `production`                    | (Not actually required as it's configured by `cross-env` when running `npm start`.) |
| `NPM_CONFIG_PRODUCTION` | `false`                         | Required to install `devDependencies` in Digital Ocean.                             |
| `DATABASE_URL`          | `${trainquery-db.DATABASE_URL}` | Have Digital Ocean set the variable automatically from the connected DB.            |
| `RELAY_KEY`             | &lt;secret&gt;                  | The relay key for [VTAR](https://github/dan-schel/vic-transport-api-relay).         |
