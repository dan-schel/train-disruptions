import { nonNull, parseFloatThrow } from "@dan-schel/js-utils";
import { z } from "zod";

export class BakedPoint {
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
    if (!/^\d\.\d\d \d\.\d\d \d\.\d\d \d\.\d\d$/.test(s)) {
      return null;
    }

    const [minX, minY, maxX, maxY] = s
      .split(" ")
      .map((n) => parseFloatThrow(n));
    return new BakedPoint(minX, minY, maxX, maxY);
  }

  static readonly pathJson = z.string().transform((x, ctx) => {
    const points = x.split(",").map((x) => BakedPoint.fromString(x));
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
    path: readonly BakedPoint[],
  ): z.input<typeof BakedPoint.pathJson> {
    return path.map((x) => x.toString()).join(",");
  }
}
