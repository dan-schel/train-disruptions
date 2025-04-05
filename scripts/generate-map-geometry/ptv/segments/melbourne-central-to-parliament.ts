import { SegmentBuilderFunction } from "@/scripts/generate-map-geometry/lib/line-builder";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";

/** Underground city loop section from Melbourne Central to Parliament. */
export function melbourneCentralToParliament(
  lineNumber: loop.LineNumber,
): SegmentBuilderFunction {
  const melbourneCentralPos = loop.pos.melbourneCentral(lineNumber);
  const parliamentPos = loop.pos.parliament(lineNumber);
  const radius = loop.radius(lineNumber);

  return (builder) =>
    builder
      .straight(
        melbourneCentralPos.horizontalDistanceTo(parliamentPos).minus(radius),
      )
      .curve(radius, 90)
      .straight(
        parliamentPos.verticalDistanceTo(melbourneCentralPos).minus(radius),
      );
}
