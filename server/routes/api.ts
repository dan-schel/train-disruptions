import { Router } from "express";
import cors, { type CorsOptions } from "cors";
import DisruptionRouter from "./disruptions";
import { errorHandler } from "./middleware/error";

// CORS enabled to prevent API abuse from origins outside our domain(s)
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const apiRouter = Router();

apiRouter.use(cors(corsOptions));

/**
 * Routes - START
 */
apiRouter.use("/disruptions", DisruptionRouter);

/**
 * Routes - END
 */

apiRouter.use(errorHandler);

export default apiRouter;
