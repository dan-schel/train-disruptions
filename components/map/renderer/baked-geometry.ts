import { BakedLine } from "./baked-line";
import { BakedInterchange } from "./baked-interchange";
import { BakedTerminus } from "./baked-terminus";
import { z } from "zod";

// TODO: [DS] Would be cool if this was just "geometry" not "baked geometry".
// Only the script cares about the distinction.

export class BakedGeometry {
  constructor(
    readonly lines: readonly BakedLine[],
    readonly interchanges: readonly BakedInterchange[],
    readonly termini: readonly BakedTerminus[],
  ) {}

  static readonly json = z
    .object({
      lines: BakedLine.json.array(),
      interchanges: BakedInterchange.json.array(),
      termini: BakedTerminus.json.array(),
    })
    .transform((x) => new BakedGeometry(x.lines, x.interchanges, x.termini));

  toJSON(): z.input<typeof BakedGeometry.json> {
    return {
      lines: this.lines.map((l) => l.toJSON()),
      interchanges: this.interchanges.map((i) => i.toJSON()),
      termini: this.termini.map((t) => t.toJSON()),
    };
  }
}
