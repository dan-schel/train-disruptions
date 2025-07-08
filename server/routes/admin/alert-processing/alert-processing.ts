import { Router } from "express";
import { validateMiddleware } from "@/server/routes/middleware/validate";
import { App } from "@/server/app";

export function createAlertProcessingRouter(_app: App) {
  const router = Router();

  // Process an alert
  router.post(
    "/process",
    validateMiddleware({
      // params: z.whatever(),
      // query: z.whatever(),
      // body: z.whatever(),
    }),
    async (_, res) => {
      res.json({
        // stuff
      });
    },
  );

  // Ignore an alert
  router.post(
    "/ignore",
    validateMiddleware({
      // params: z.whatever(),
      // query: z.whatever(),
      // body: z.whatever(),
    }),
    async (_, res) => {
      res.json({
        // stuff
      });
    },
  );

  return router;
}
