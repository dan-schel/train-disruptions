import { lineWidth } from "@/components/map/renderer/utils";
import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { SegmentBuilderFunction } from "@/scripts/generate-map-geometry/lib/line-builder";

export const interchangeEdgeOffset = flexi(lineWidth / 2);
export const interchangeInnerOffset = flexi(1);
export const terminusExtents = flexi(5);

export function invert(
  segment: SegmentBuilderFunction,
): SegmentBuilderFunction {
  return (builder) => {
    segment(builder);
    builder.invert();
  };
}
