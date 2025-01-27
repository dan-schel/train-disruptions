import { nonNull, parseFloatNull } from "@dan-schel/js-utils";
import { z } from "zod";

// TODO: This is basically a copy of FlexiPoint. It's like that because I don't
// want this one to have the addition/subtraction/etc. methods, because once the
// Geometry is built by the script, we don't need those anymore.
export class DualPoint {
  constructor(
    readonly minX: number,
    readonly minY: number,
    readonly maxX: number,
    readonly maxY: number,
  ) {}

  amplify(amplification: number) {
    return {
      x: this.minX + (this.maxX - this.minX) * amplification,
      y: this.minY + (this.maxY - this.minY) * amplification,
    };
  }

  toString() {
    const minX = this.minX.toFixed(2);
    const minY = this.minY.toFixed(2);
    const maxX = this.maxX.toFixed(2);
    const maxY = this.maxY.toFixed(2);
    return `${minX} ${minY} ${maxX} ${maxY}`;
  }

  static fromString(s: string) {
    const parsed = s
      .split(" ")
      .map((n) => parseFloatNull(n))
      .filter(nonNull);

    if (parsed.length !== 4) {
      return null;
    }

    return new DualPoint(parsed[0], parsed[1], parsed[2], parsed[3]);
  }

  static readonly pathJson = z.string().transform((x, ctx) => {
    const points = x.split(",").map((x) => DualPoint.fromString(x));
    const parsed = points.filter(nonNull);

    if (parsed.length !== points.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Not a valid path.",
      });
      return z.NEVER;
    }

    return parsed;
  });

  static pathToJson(
    path: readonly DualPoint[],
  ): z.input<typeof DualPoint.pathJson> {
    return path.map((x) => x.toString()).join(",");
  }
}
