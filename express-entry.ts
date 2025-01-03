import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { vikeHandler } from "./server/vike-handler";
import { createHandler } from "@universal-middleware/express";
import express from "express";
import { runDemos } from "./server/demo/run-demos";
import { env } from "./server/env";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;

export default (await startServer()) as unknown;

async function startServer() {
  await runDemos();

  const app = express();

  if (env.NODE_ENV === "production") {
    app.use(express.static(`${root}/dist/client`));
  } else {
    // Instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We should instantiate it *only* in development. (It isn't needed in production
    // and would unnecessarily bloat our server in production.)
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true, hmr: { port: env.HMR_PORT } },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  /**
   * Vike route
   *
   * @link {@see https://vike.dev}
   **/
  app.all("*", createHandler(vikeHandler)());

  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🟢 Server listening on http://localhost:${env.PORT}`);
  });

  return app;
}
