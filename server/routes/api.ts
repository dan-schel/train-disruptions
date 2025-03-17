import { Router } from "express";
import cors, { type CorsOptions } from "cors";
import { errorHandler } from "@/server/routes/middleware/error";
import { App } from "@/server/app";
import { createDisruptionRouter } from "@/server/routes/disruptions";
import { createAuthRouter } from "@/server/routes/auth";

// CORS enabled to prevent API abuse from origins outside our domain(s)
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === "http://localhost:3000") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

export function createApiRouter(app: App) {
  const apiRouter = Router();
  apiRouter.use(cors(corsOptions));

  // Start of routes.
  apiRouter.use("/disruptions", createDisruptionRouter(app));
  apiRouter.use("/auth", createAuthRouter(app));
  // (...add additional routes here.)

  // Must go last.
  apiRouter.use(errorHandler);
  return apiRouter;
}
