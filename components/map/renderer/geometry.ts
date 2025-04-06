import { Segment } from "@/components/map/renderer/segment";
import { Interchange } from "@/components/map/renderer/interchange";
import { Terminus } from "@/components/map/renderer/terminus";
import { z } from "zod";
import { FlexiViewport } from "@/components/map/renderer/dimensions/flexi-viewport";
import { viewportPadding } from "@/components/map/renderer/utils";

export class Geometry {
  readonly segments: readonly Segment[];

  constructor(
    segments: readonly Segment[],
    readonly interchanges: readonly Interchange[],
    readonly termini: readonly Terminus[],
    readonly viewport: FlexiViewport,
  ) {
    this.segments = segments.map((s) => s.normalize());
  }

  static readonly json = z
    .object({
      segments: Segment.json.array(),
      interchanges: Interchange.json.array(),
      termini: Terminus.json.array(),
      viewport: FlexiViewport.json,
    })
    .transform(
      (x) => new Geometry(x.segments, x.interchanges, x.termini, x.viewport),
    );

  toJSON(): z.input<typeof Geometry.json> {
    return {
      segments: this.segments.map((l) => l.toJSON()),
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
