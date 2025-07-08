import { Router } from "express";
import { validateMiddleware } from "@/server/routes/middleware/validate";
import { App } from "@/server/app";
import z from "zod";
import { ALERTS } from "@/server/database/models/models";

export function createAlertProcessingRouter(app: App) {
  const router = Router();

  router.post(
    "/process",
    validateMiddleware({
      // TODO: [DS] Implement validation.
      // params: z.whatever(),
      // query: z.whatever(),
      // body: z.whatever(),
    }),
    async (req, res) => {
      // TODO: [DS] Implement processing API.

      res.json({
        // stuff
      });
    },
  );

  router.post(
    "/ignore/:id",
    validateMiddleware({
      params: z.object({
        id: z.string(),
      }),
      body: z.object({
        permanently: z.boolean(),
      }),
    }),
    async (req, res) => {
      const id = req.params.id;
      const alert = await app.database.of(ALERTS).get(id);

      if (alert == null) {
        res.sendStatus(404);
        return;
      }

      if (alert.getState() !== "new") {
        res.status(400).json({
          error: "Alert already processed/ignored",
        });
        return;
      }

      if (req.body.permanently) {
        await app.database.of(ALERTS).update(alert.ignored());
      } else {
        await app.database.of(ALERTS).update(alert.processed());
      }

      res.sendStatus(200);
    },
  );

  return router;
}
