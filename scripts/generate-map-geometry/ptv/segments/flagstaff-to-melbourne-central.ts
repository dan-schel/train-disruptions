import {
  SegmentInstruction,
  straight,
} from "@/scripts/generate-map-geometry/lib/segment-instructions";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";

/** Underground city loop section from Flagstaff to Melbourne Central. */
export function flagstaffToMelbourneCentral(
  lineNumber: loop.LineNumber,
): SegmentInstruction[] {
  const flagstaff = loop.pos.flagstaff(lineNumber);
  const melbourneCentral = loop.pos.melbourneCentral(lineNumber);
  return [straight(flagstaff.horizontalDistanceTo(melbourneCentral))];
}
