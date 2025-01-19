import { Router } from "express";

import { env } from "../env";
import { config } from "../config";
import { validateMiddleware } from "./middleware/validate";
import { disruptionSchema } from "../../types/disruption";
import { VtarDisruptionSource } from "../demo/disruption-source";

const DisruptionRouter = Router();

DisruptionRouter.get(
  "/",
  validateMiddleware({
    response: disruptionSchema.array(),
  }),
  async (_, res) => {
    // Temporary - only need this while `RELAY_KEY` is optional in the schema
    if (!env.RELAY_KEY) {
      // eslint-disable-next-line no-console
      console.log("🟡 Relay connection not set up yet.");
      return res.json([]);
    }

    const disruptionSource = new VtarDisruptionSource(
      config.VTAR_ENDPOINT_URL,
      env.RELAY_KEY,
    );
    const disruptions = await disruptionSource.fetchDisruptions();

    res.json(disruptions);
  },
);

export default DisruptionRouter;
