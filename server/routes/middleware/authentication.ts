import MongoStore from "connect-mongo";
import { NextFunction, Request, Response } from "express";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    user: { id: string; role: "super" | "admin" } | null;
  }
}

export const SessionCookieName = "sess_id";

export function AuthSession(
  secret: string,
  mongoUrl: string,
  dbName: string,
  secure: boolean,
) {
  return session({
    secret,
    cookie: {
      secure,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      sameSite: "lax",
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    name: SessionCookieName,
    store: MongoStore.create({
      mongoUrl,
      dbName,
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
