import { deleteDisruption } from "@/server/actions/delete-disruption";
import { processDisruption } from "@/server/actions/process-disruption";
import { App } from "@/server/app";
import { validateMiddleware } from "@/server/routes/middleware/validate";
import { DisruptionProcessingInputJson } from "@/shared/schemas/disruption-processing/disruption-processing-input";
import { Router } from "express";
import z from "zod";

export function createDisruptionRouter(app: App) {
  const router = Router();

  router.put(
    "/:id",
    validateMiddleware({
      params: z.object({
        id: z.string(),
      }),
      body: z.object({
        input: DisruptionProcessingInputJson,
      }),
    }),
    async (req, res) => {
      const id = req.params.id;
      const input = DisruptionProcessingInputJson.parse(req.body.input);
      const result = await processDisruption(app, id, input);

      if ("success" in result) {
        res.sendStatus(200);
      } else {
        res.status(400).json(result);
      }
    },
  );

  router.delete(
    "/:id",
    validateMiddleware({
      params: z.object({
        id: z.string(),
      }),
    }),
    async (req, res) => {
      const id = req.params.id;
      const result = await deleteDisruption(app, id);

      if ("success" in result) {
        res.sendStatus(200);
      } else {
        res.status(400).json(result);
      }
    },
  );

  return router;
}
