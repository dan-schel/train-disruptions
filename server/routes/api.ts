import { Router } from "express";
import cors, { type CorsOptions } from "cors";
import { errorHandler } from "@/server/routes/middleware/error";
import { App } from "@/server/app";
import { createAuthRouter } from "@/server/routes/auth";
import { createAdminRouter } from "@/server/routes/admin/admin";

// CORS enabled to prevent API abuse from origins outside our domain(s)
const domains = ["http://localhost:3000", "https://beta.isitbuses.com"];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || domains.includes(origin)) {
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
  apiRouter.use("/auth", createAuthRouter(app));
  apiRouter.use("/admin", createAdminRouter(app));
  // (...add additional routes here.)

  // Must go last.
  apiRouter.use(errorHandler);
  return apiRouter;
}
