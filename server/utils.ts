import { parseFloatNull } from "@dan-schel/js-utils";
import { z } from "zod";

/** Accepts any string which can be converted to a number. */
export const stringNumberSchema = z.string().transform((x, ctx) => {
  const result = parseFloatNull(x);
  if (result == null) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Not a number.",
    });
    return z.NEVER;
  }
  return result;
});
