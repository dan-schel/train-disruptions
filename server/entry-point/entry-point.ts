import { createVikeHandler } from "@/server/vike-handler";
import express from "express";
import cookieParser from "cookie-parser";
import { env } from "@/server/entry-point/env";
import { createApiRouter } from "@/server/routes/api";
import { createDevMiddleware } from "vike/server";
import { App } from "@/server/app";
import { lines } from "@/server/entry-point/data/lines";
import { stations } from "@/server/entry-point/data/stations";
import { initDatabase } from "@/server/database/init-database";
import { initDisruptionSource } from "@/server/disruption-source/init-disruption-source";
import { initDiscordClient } from "@/server/discord/init-discord";

export async function main(root: string) {
  const database = await initDatabase();
  const disruptionSource = initDisruptionSource();
  const discordClient = initDiscordClient();

  const app = new App(
    lines,
    stations,
    database,
    disruptionSource,
    discordClient,
  );
  await app.init();

  await startWebServer(app, root);
}

async function startWebServer(app: App, root: string) {
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
