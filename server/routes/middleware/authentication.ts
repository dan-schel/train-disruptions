import { NextFunction, Request, Response } from "express";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.session.user) next();
  else return res.status(401).json({ error: "Unauthorized" });
}
