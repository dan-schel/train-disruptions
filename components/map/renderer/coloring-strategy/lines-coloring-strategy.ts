import {
  ColoringStrategy,
  SegmentColoring,
} from "@/components/map/renderer/coloring-strategy/coloring-strategy";
import { Segment } from "@/components/map/renderer/segment";
import { Terminus } from "@/components/map/renderer/terminus";
import { MapColor } from "@/components/map/renderer/utils";

export class LinesColoringStrategy extends ColoringStrategy {
  // TODO: This is temporary implementation. Drawing ghost-line over the
  // segment's default color looks kinda awful, and isn't layered properly.

  getSegmentBackgroundColor(segment: Segment): MapColor | null {
    return segment.color;
  }

  getSegmentColoring(segment: Segment): SegmentColoring[] {
    return this._getHighlightingFor(segment).map(
      (h) => new SegmentColoring(segment, h.start, h.end, "ghost-line"),
    );
  }

  getTerminusColor(terminus: Terminus): MapColor {
    const coverage = this._getNodeHighlightingCoverage(terminus.nodeId);
    return coverage !== "full" ? terminus.color : "ghost-line";
  }
}
