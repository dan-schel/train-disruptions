import { z } from "zod";

type Viewport = {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
};

const viewportJson = z.object({
  x: z.number(),
  y: z.number(),
  h: z.number(),
  w: z.number(),
});

export class BakedViewport {
  constructor(
    readonly min: Viewport,
    readonly max: Viewport,
  ) {}

  amplify(amplification: number) {
    return {
      x: this.min.x + (this.max.x - this.min.x) * amplification,
      y: this.min.y + (this.max.y - this.min.y) * amplification,
      w: this.min.w + (this.max.w - this.min.w) * amplification,
      h: this.min.h + (this.max.h - this.min.h) * amplification,
    };
  }

  static readonly json = z
    .object({
      min: viewportJson,
      max: viewportJson,
    })
    .transform((x) => new BakedViewport(x.min, x.max));

  toJSON(): z.input<typeof BakedViewport.json> {
    return {
      min: this.min,
      max: this.max,
    };
  }
}
