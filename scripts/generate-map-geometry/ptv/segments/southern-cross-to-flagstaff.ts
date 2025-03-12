import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";

/** North-west corner of the city loop from Southern Cross to Flagstaff. */
export function southernCrossToFlagstaff(
  lineNumber: loop.LineNumber,
): PathBlueprint {
  const southernCrossPos = loop.pos.southernCross(lineNumber);
  const flagstaffPos = loop.pos.flagstaff(lineNumber);

  const radius = loop.radius(lineNumber);

  return new PathBlueprint()
    .straight(southernCrossPos.verticalDistanceTo(flagstaffPos).minus(radius))
    .curve(radius, 90)
    .straight(
      flagstaffPos.horizontalDistanceTo(southernCrossPos).minus(radius),
    );
}
