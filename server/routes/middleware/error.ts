import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../../types/errors/validation";

/**
 * Handles any errors recovered via `next()`
 */
export const errorHandler = (
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
