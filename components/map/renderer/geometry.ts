import { Line } from "@/components/map/renderer/line";
import { Interchange } from "@/components/map/renderer/interchange";
import { Terminus } from "@/components/map/renderer/terminus";
import { z } from "zod";
import { DualViewport } from "@/components/map/renderer/dual-viewport";
import { viewportPadding } from "@/components/map/renderer/utils";

export class Geometry {
  constructor(
    readonly lines: readonly Line[],
    readonly interchanges: readonly Interchange[],
    readonly termini: readonly Terminus[],
    readonly viewport: DualViewport,
  ) {}

  static readonly json = z
    .object({
      lines: Line.json.array(),
      interchanges: Interchange.json.array(),
      termini: Terminus.json.array(),
      viewport: DualViewport.json,
    })
    .transform(
      (x) => new Geometry(x.lines, x.interchanges, x.termini, x.viewport),
    );

  toJSON(): z.input<typeof Geometry.json> {
    return {
      lines: this.lines.map((l) => l.toJSON()),
      interchanges: this.interchanges.map((i) => i.toJSON()),
      termini: this.termini.map((t) => t.toJSON()),
      viewport: this.viewport.toJSON(),
    };
  }

  suggestedAspectRatio() {
    const padding = viewportPadding * 2;
    return Math.min(
      (this.viewport.min.w + padding) / (this.viewport.min.h + padding),
      (this.viewport.max.w + padding) / (this.viewport.max.h + padding),
    );
  }
}
