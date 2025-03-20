import MongoStore from "connect-mongo";
import { NextFunction, Request, Response } from "express";
import session from "express-session";

export const SessionCookieName = "sess_id";

export function AuthSession(
  secret: string,
  url: string,
  name: string,
  secure: boolean,
) {
  return session({
    secret,
    cookie: {
      secure,
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: "lax",
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    name: SessionCookieName,
    store: MongoStore.create({
      mongoUrl: url,
      dbName: name,
      stringify: false,
    }),
  });
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.session.user) next();
  else return res.status(401).json({ error: "Unauthorized" });
}
