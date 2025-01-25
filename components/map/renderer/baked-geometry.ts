import { BakedLine } from "./baked-line";
import { BakedInterchange } from "./baked-interchange";
import { BakedTerminus } from "./baked-terminus";
import { z } from "zod";

export class BakedGeometry {
  constructor(
    readonly lines: readonly BakedLine[],
    readonly interchanges: readonly BakedInterchange[],
    readonly terminii: readonly BakedTerminus[],
  ) {}

  static readonly json = z
    .object({
      lines: BakedLine.json.array(),
      interchanges: BakedInterchange.json.array(),
      terminii: BakedTerminus.json.array(),
    })
    .transform((x) => new BakedGeometry(x.lines, x.interchanges, x.terminii));

  toJSON(): z.input<typeof BakedGeometry.json> {
    return {
      lines: this.lines.map((l) => l.toJSON()),
      interchanges: this.interchanges.map((i) => i.toJSON()),
      terminii: this.terminii.map((t) => t.toJSON()),
    };
  }
}
