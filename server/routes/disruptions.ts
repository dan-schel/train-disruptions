import { Router } from "express";
import { validateMiddleware } from "./middleware/validate";
import { disruptionSchema } from "../../types/disruption";
import { App } from "../app";

export function createDisruptionRouter(app: App) {
  const disruptionRouter = Router();

  disruptionRouter.get(
    "/",
    validateMiddleware({
      response: disruptionSchema.array(),
    }),
    async (_, res) => {
      const disruptions = await app.disruptionSource.fetchDisruptions();
      res.json(disruptions);
    },
  );

  return disruptionRouter;
}
