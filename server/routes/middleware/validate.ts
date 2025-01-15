import { ZodIssue, ZodSchema } from "zod";
import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import {
  IValidationError,
  ValidationError,
} from "../../../types/errors/validation";

type ValidationRequest<TParams, TQuery, TBody, TResBody> = {
  params?: ZodSchema<TParams>;
  query?: ZodSchema<TQuery>;
  body?: ZodSchema<TBody>;
  response?: ZodSchema<TResBody>;
};

/**
 * Validates the request with the provided schemas and defines the type for the respective properties
 */
export const validateMiddleware = <
  TParams = ParamsDictionary,
  TQuery = qs.ParsedQs,
  TBody = unknown,
  TResBody = unknown,
>({
  params,
  query,
  body,
}: ValidationRequest<TParams, TQuery, TBody, TResBody>) => {
  return (
    req: Request<TParams, TResBody, TBody, TQuery>,
    res: Response<TResBody>,
    next: NextFunction,
  ) => {
    const errors: IValidationError = {};

    if (params) {
      const { success, error } = params.safeParse(req.params);
      if (!success) {
        errors.params = parseError(error.errors[0]);
      }
    }

    if (query) {
      const { success, error } = query.safeParse(req.query);
      if (!success) {
        errors.query = parseError(error.errors[0]);
      }
    }

    if (body) {
      const { success, error } = body.safeParse(req.body);
      if (!success) {
        errors.body = parseError(error.errors[0]);
      }
    }

    // If there are any errors, return a bad request error
    if (Object.values(errors).length) {
      throw new ValidationError(errors);
    }

    next();
  };
};

const parseError = (error: ZodIssue) => ({
  field: error.path.join("."),
  message: error.message,
});
