import {
  ColoringStrategy,
  SegmentColoring,
} from "@/components/map/renderer/coloring-strategy/coloring-strategy";
import { Segment } from "@/components/map/renderer/segment";
import { Terminus } from "@/components/map/renderer/terminus";
import { MapColor } from "@/components/map/renderer/utils";

export class DisruptionsColoringStrategy extends ColoringStrategy {
  getSegmentBackgroundColor(_segment: Segment): MapColor | null {
    // TODO: Can return null if the segment is fully highlighted.
    return "ghost-line";
  }

  getSegmentColoring(segment: Segment): SegmentColoring[] {
    // TODO: Can be optimized by merging adjacent highlights.
    return this._getHighlightingFor(segment).map(
      (h) => new SegmentColoring(segment, h.start, h.end, segment.color),
    );
  }

  getTerminusColor(terminus: Terminus): MapColor {
    const coverage = this._getNodeHighlightingCoverage(terminus.nodeId);
    return coverage !== "zero" ? terminus.color : "ghost-line";
  }
}
