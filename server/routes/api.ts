import { Router } from "express";
import cors, { type CorsOptions } from "cors";
import DisruptionRouter from "./disruptions";

// CORS enabled to prevent API abuse from origins outside our domain(s)
const whitelist = ["http://localhost:3000", /\.isitbuses\.com$/];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const apiRouter = Router();

apiRouter.use(cors(corsOptions));
apiRouter.use("/disruptions", DisruptionRouter);

export default apiRouter;
