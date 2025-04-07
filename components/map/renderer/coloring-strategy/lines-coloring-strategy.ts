import {
  ColoringStrategy,
  SegmentColoring,
} from "@/components/map/renderer/coloring-strategy/coloring-strategy";
import {
  condense,
  subtractAll,
} from "@/components/map/renderer/coloring-strategy/range-fns";
import { Segment } from "@/components/map/renderer/segment";
import { Terminus } from "@/components/map/renderer/terminus";
import { MapColor } from "@/components/map/renderer/utils";

export class LinesColoringStrategy extends ColoringStrategy {
  // TODO: This is temporary implementation. Drawing ghost-line over the
  // segment's default color looks kinda awful, and isn't layered properly.

  getSegmentColoring(segment: Segment): SegmentColoring[] {
    const highlighting = condense(this._getHighlightingFor(segment));
    const remainder = subtractAll([{ min: 0, max: 1 }], highlighting);

    return [
      ...highlighting.map(
        (h) => new SegmentColoring(segment, h.min, h.max, "ghost-line"),
      ),
      ...remainder.map(
        (r) => new SegmentColoring(segment, r.min, r.max, segment.color),
      ),
    ];
  }

  getTerminusColor(terminus: Terminus): MapColor {
    const coverage = this._getNodeHighlightingCoverage(terminus.nodeId);
    return coverage !== "full" ? terminus.color : "ghost-line";
  }
}
