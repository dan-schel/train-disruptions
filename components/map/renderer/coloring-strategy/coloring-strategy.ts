import { Geometry } from "@/components/map/renderer/geometry";
import { Segment } from "@/components/map/renderer/segment";
import { Terminus } from "@/components/map/renderer/terminus";
import { MapColor } from "@/components/map/renderer/utils";
import {
  SerializedHighlightedMapSegment,
  SerializedMapHighlighting,
} from "@/shared/types/map-data";

const fpff = 0.00001;

export class SegmentColoring {
  constructor(
    readonly segment: Segment,
    readonly startPercentage: number,
    readonly endPercentage: number,
    readonly color: MapColor,
  ) {}
}

export abstract class ColoringStrategy {
  constructor(
    private readonly geometry: Geometry,
    private readonly _mapHighlighting: SerializedMapHighlighting,
  ) {}

  abstract getSegmentBackgroundColor(segment: Segment): MapColor | null;

  abstract getSegmentColoring(segment: Segment): SegmentColoring[];

  abstract getTerminusColor(terminus: Terminus): MapColor;

  protected _getNodeHighlightingCoverage(
    nodeId: number,
  ): "full" | "partial" | "zero" {
    const segments = this.geometry.getSegmentsInvolving(nodeId);
    const highlightedCount = segments.reduce((acc, segment) => {
      const highlighting = this._getHighlightingFor(segment);
      if (highlighting.some((h) => this._highlightsNode(h, nodeId))) {
        return acc + 1;
      }
      return acc;
    }, 0);

    if (highlightedCount === 0) {
      return "zero";
    } else if (highlightedCount === segments.length) {
      return "full";
    } else {
      return "partial";
    }
  }

  protected _getHighlightingFor(
    segment: Segment,
  ): SerializedHighlightedMapSegment[] {
    return (
      this._mapHighlighting.segments.filter(
        (h) =>
          h.nodeIdA === segment.startNodeId && h.nodeIdB === segment.endNodeId,
      ) ?? null
    );
  }

  protected _highlightsNode(
    highlighting: SerializedHighlightedMapSegment,
    nodeId: number,
  ): boolean {
    return (
      (highlighting.nodeIdA === nodeId && highlighting.start <= fpff) ||
      (highlighting.nodeIdB === nodeId && highlighting.end >= 1 - fpff)
    );
  }
}
