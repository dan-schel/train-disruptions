import { Router } from "express";
import { validateMiddleware } from "@/server/routes/middleware/validate";
import { App } from "@/server/app";
import z from "zod";
import { AlertProcessingInputJson } from "@/shared/schemas/alert-processing/alert-processing-input";
import { processAlert } from "@/server/actions/process-alert";
import { ignoreAlert } from "@/server/actions/ignore-alert";

export function createAlertProcessingRouter(app: App) {
  const router = Router();

  router.post(
    "/process/:id",
    validateMiddleware({
      params: z.object({
        id: z.string(),
      }),
      body: z.object({
        input: AlertProcessingInputJson,
      }),
    }),
    async (req, res) => {
      const id = req.params.id;
      const input = AlertProcessingInputJson.parse(req.body.input);
      const result = await processAlert(app, id, input);

      if ("success" in result) {
        res.sendStatus(200);
      } else {
        res.status(400).json(result);
      }
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
      const permanently = req.body.permanently;
      const result = await ignoreAlert(app, id, permanently);

      if ("success" in result) {
        res.sendStatus(200);
      } else {
        res.status(400).json(result);
      }
    },
  );

  return router;
}
