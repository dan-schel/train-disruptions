import { curve, Path, straight } from "../../lib/geometry";
import * as loop from "../utils-city-loop";

/** North-west corner of the city loop from Southern Cross to Flagstaff. */
export function southernCrossToFlagstaff(lineNumber: number): Path[] {
  const southernCrossPos = loop.southernCrossCoords(lineNumber);
  const flagstaffPos = loop.flagstaffCoords(lineNumber);

  const radius = loop.radius(lineNumber);

  const southernCrossToCorner = {
    min: southernCrossPos.min.y - flagstaffPos.min.y - radius,
    max: southernCrossPos.max.y - flagstaffPos.max.y - radius,
  };

  // TODO: [DS] southernCrossPos.horizontalDistance(flagstaffPos).minus(radius)
  // TODO: [DS] Name idea: FlexiPoint (instead of BakedPoint), FlexiLength.
  const cornerToFlagstaff = {
    min: flagstaffPos.min.x - southernCrossPos.min.x - radius,
    max: flagstaffPos.max.x - southernCrossPos.max.x - radius,
  };

  return [
    // SOUTHERN_CROSS
    straight(southernCrossToCorner),
    curve({ radius: radius, angle: 90 }),
    straight(cornerToFlagstaff),
    // FLAGSTAFF
  ];
}
