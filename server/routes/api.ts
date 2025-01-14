import { NextFunction, Request, Response, Router } from "express";
import cors, { type CorsOptions } from "cors";
import DisruptionRouter from "./disruptions";
import { ValidationError } from "../../types/errors/validation";

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

/**
 * Handles any errors recovered via `next()`
 */
const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _: NextFunction,
) => {
  if (err instanceof ValidationError) {
    return res.status(err.status).json({ error: err.errors });
  }

  return res.status(400).json({ error: err.message });
};

const apiRouter = Router();

apiRouter.use(cors(corsOptions));

apiRouter.use("/disruptions", DisruptionRouter);

apiRouter.use(errorHandler);

export default apiRouter;
