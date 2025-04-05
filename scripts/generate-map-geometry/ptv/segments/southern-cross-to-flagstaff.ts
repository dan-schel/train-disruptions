import {
  curve,
  SegmentInstruction,
  straight,
} from "@/scripts/generate-map-geometry/lib/segment-instructions";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";

/** North-west corner of the city loop from Southern Cross to Flagstaff. */
export function southernCrossToFlagstaff(
  lineNumber: loop.LineNumber,
): SegmentInstruction[] {
  const southernCross = loop.pos.southernCross(lineNumber);
  const flagstaff = loop.pos.flagstaff(lineNumber);
  const radius = loop.radius(lineNumber);

  return [
    straight(southernCross.verticalDistanceTo(flagstaff).minus(radius)),
    curve(radius, 90),
    straight(flagstaff.horizontalDistanceTo(southernCross).minus(radius)),
  ];
}
