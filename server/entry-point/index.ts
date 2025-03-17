import { createVikeHandler } from "@/server/vike-handler";
import express from "express";
import cookieParser from "cookie-parser";
import { env } from "@/server/entry-point/env";
import { createApiRouter } from "@/server/routes/api";
import { createDevMiddleware } from "vike/server";
import { App } from "@/server/app";
import { lines } from "@/server/entry-point/data/lines";
import { stations } from "@/server/entry-point/data/stations";
import { initDatabase } from "@/server/entry-point/services/database";
import { initAlertSource } from "@/server/entry-point/services/alert-source";
import { initDiscordClient } from "@/server/entry-point/services/discord";
import { RealTimeProvider } from "@/server/time-provider";
import session from "express-session";
import MongoStore from "connect-mongo";
import { config } from "@/server/entry-point/config";

declare module "express-session" {
  interface SessionData {
    user: { id: string; role: "super" | "admin" } | null;
  }
}

export async function run(root: string) {
  const database = await initDatabase();
  const alertSource = initAlertSource();
  const discordClient = initDiscordClient();
  const time = new RealTimeProvider();

  const app = new App(
    lines,
    stations,
    database,
    alertSource,
    discordClient,
    time,
    env.COMMIT_HASH ?? null,
    env.USERNAME ?? null,
    env.PASSWORD ?? null,
  );
  await app.init();

  await startWebServer(app, root);
}

async function startWebServer(app: App, root: string) {
  const server = express();
  // TODO: extract into separate file
  server.use(
    session({
      secret: "test",
      cookie: {
        secure: env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: "lax",
        httpOnly: true,
      },
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: env.DATABASE_URL,
        dbName: config.DATABASE_NAME,
        stringify: false,
      }),
    }),
  );
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
