import { deleteDisruption } from "@/server/actions/delete-disruption";
import { App } from "@/server/app";
import { validateMiddleware } from "@/server/routes/middleware/validate";
import { Router } from "express";
import z from "zod";

export function createDisruptionRouter(app: App) {
  const router = Router();

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
