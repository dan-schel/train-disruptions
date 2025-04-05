import { SegmentBuilderFunction } from "@/scripts/generate-map-geometry/lib/line-builder";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";

/** Underground city loop section from Flagstaff to Melbourne Central. */
export function flagstaffToMelbourneCentral(
  lineNumber: loop.LineNumber,
): SegmentBuilderFunction {
  const flagstaffPos = loop.pos.flagstaff(lineNumber);
  const melbourneCentralPos = loop.pos.melbourneCentral(lineNumber);

  return (builder) =>
    builder.straight(flagstaffPos.horizontalDistanceTo(melbourneCentralPos));
}
