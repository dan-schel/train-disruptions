import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { createVikeHandler } from "./server/vike-handler";
import express from "express";
import cookieParser from "cookie-parser";
import { env } from "./server/env";
import { createApiRouter } from "./server/routes/api";
import { createDevMiddleware } from "vike/server";
import { App } from "./server/app";
import { lines } from "./server/data/static/lines";
import { stations } from "./server/data/static/stations";
import { initDatabase } from "./server/database/init-database";
import { initDisruptionSource } from "./server/disruption-source/init-disruption-source";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;

export default (await main()) as unknown;

async function main() {
  const database = await initDatabase();
  const disruptionSource = initDisruptionSource();

  const app = new App(lines, stations, database, disruptionSource);
  await app.init();

  await startWebServer(app);
}

async function startWebServer(app: App) {
  const server = express();
  server.use(cookieParser());

  if (env.NODE_ENV === "production") {
    server.use(express.static(`${root}/dist/client`));
  } else {
    const { devMiddleware } = await createDevMiddleware({ root });
    server.use(devMiddleware);
  }

  server.use("/api", express.json(), createApiRouter(app));
  server.all(/(.*)/, createVikeHandler(app));

  server.listen(env.PORT, () => {
    app.onServerStarted(env.PORT);
  });

  return server;
}
