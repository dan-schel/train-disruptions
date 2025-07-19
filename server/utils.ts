import { parseFloatNull } from "@dan-schel/js-utils";
import { z } from "zod";

/** Accepts any string which can be converted to a number. */
export const stringNumberSchema = z.string().transform((input, ctx) => {
  const result = parseFloatNull(input);
  if (result == null) {
    ctx.issues.push({
      code: "custom",
      message: "Not a number.",
      input,
    });
    return z.NEVER;
  }
  return result;
});
