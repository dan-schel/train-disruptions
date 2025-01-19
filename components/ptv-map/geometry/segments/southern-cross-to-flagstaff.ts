import { Path } from "../../lib/path";
import * as loop from "../utils-city-loop";

/** North-west corner of the city loop from Southern Cross to Flagstaff. */
export function southernCrossToFlagstaff(lineNumber: loop.LineNumber): Path {
  const southernCrossPos = loop.pos.southernCross(lineNumber);
  const flagstaffPos = loop.pos.flagstaff(lineNumber);

  const radius = loop.radius(lineNumber);

  return new Path()
    .straight(southernCrossPos.verticalDistanceTo(flagstaffPos).minus(radius))
    .curve(radius, 90)
    .straight(
      flagstaffPos.horizontalDistanceTo(southernCrossPos).minus(radius),
    );
}
