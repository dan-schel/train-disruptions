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

export class DisruptionsColoringStrategy extends ColoringStrategy {
  getSegmentColoring(segment: Segment): SegmentColoring[] {
    const highlighting = condense(this._getHighlightingFor(segment));
    const remainder = subtractAll([{ min: 0, max: 1 }], highlighting);

    return [
      ...remainder.map(
        (h) => new SegmentColoring(segment, h.min, h.max, "ghost-line"),
      ),
      ...highlighting.map(
        (r) => new SegmentColoring(segment, r.min, r.max, segment.color),
      ),
    ];
  }

  getTerminusColor(terminus: Terminus): MapColor {
    const coverage = this._getNodeHighlightingCoverage(terminus.nodeId);
    return coverage !== "zero" ? terminus.color : "ghost-line";
  }
}
