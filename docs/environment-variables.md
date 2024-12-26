# Environment Variables

## Deployment (Digital Ocean)

When deployed to Digital Ocean, set the variables as follows:

| Variable                | Value                           | Comment                                                                             |
| ----------------------- | ------------------------------- | ----------------------------------------------------------------------------------- |
| `NODE_ENV`              | `production`                    | (Not actually required as it's configured by `cross-env` when running `npm start`.) |
| `NPM_CONFIG_PRODUCTION` | `false`                         | Required to install `devDependencies` in Digital Ocean.                             |
| `DATABASE_URL`          | `${trainquery-db.DATABASE_URL}` | Have DO set the variable automatically from the connected DB.                       |
| `RELAY_KEY`             | &lt;secret&gt;                  | The relay key for [VTAR](https://github/dan-schel/vic-transport-api-relay).         |
