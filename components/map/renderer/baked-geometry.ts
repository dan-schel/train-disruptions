import { BakedLine } from "./baked-line";
import { BakedInterchange } from "./baked-interchange";
import { BakedTerminus } from "./baked-terminus";
import { z } from "zod";
import { BakedViewport } from "./baked-viewport";

// TODO: [DS] Would be cool if this was just "geometry" not "baked geometry".
// Only the script cares about the distinction.

export class BakedGeometry {
  constructor(
    readonly lines: readonly BakedLine[],
    readonly interchanges: readonly BakedInterchange[],
    readonly termini: readonly BakedTerminus[],
    readonly viewport: BakedViewport,
  ) {}

  static readonly json = z
    .object({
      lines: BakedLine.json.array(),
      interchanges: BakedInterchange.json.array(),
      termini: BakedTerminus.json.array(),
      viewport: BakedViewport.json,
    })
    .transform(
      (x) => new BakedGeometry(x.lines, x.interchanges, x.termini, x.viewport),
    );

  toJSON(): z.input<typeof BakedGeometry.json> {
    return {
      lines: this.lines.map((l) => l.toJSON()),
      interchanges: this.interchanges.map((i) => i.toJSON()),
      termini: this.termini.map((t) => t.toJSON()),
      viewport: this.viewport.toJSON(),
    };
  }

  suggestedAspectRatio() {
    return Math.max(
      this.viewport.min.w / this.viewport.min.h,
      this.viewport.max.w / this.viewport.max.h,
    );
  }
}
