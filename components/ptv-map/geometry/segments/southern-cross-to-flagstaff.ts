import { curve, Path, straight } from "../../lib/geometry";
import * as loop from "../utils-city-loop";

/** North-west corner of the city loop from Southern Cross to Flagstaff. */
export function southernCrossToFlagstaff(lineNumber: loop.LineNumber): Path[] {
  const southernCrossPos = loop.pos.southernCross(lineNumber);
  const flagstaffPos = loop.pos.flagstaff(lineNumber);

  const radius = loop.radius(lineNumber);

  return [
    // Southern Cross
    straight(southernCrossPos.verticalDistanceTo(flagstaffPos).minus(radius)),
    curve({ radius: radius, angle: 90 }),
    straight(flagstaffPos.horizontalDistanceTo(southernCrossPos).minus(radius)),
    // Flagstaff
  ];
}
