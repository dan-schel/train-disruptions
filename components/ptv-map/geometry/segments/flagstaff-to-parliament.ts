import { MELBOURNE_CENTRAL } from "../../../../server/data/station-ids";
import { curve, interchangeMarker, Path, straight } from "../../lib/geometry";
import * as loop from "../utils-city-loop";

/** Underground city loop section from Flagstaff to Parliament. */
export function flagstaffToParliament(lineNumber: number): Path[] {
  const flagstaffPos = loop.flagstaffCoords(lineNumber);
  const melbourneCentralPos = loop.melbourneCentralCoords(lineNumber);
  const parliamentPos = loop.parliamentCoords(lineNumber);

  const radius = loop.radius(lineNumber);

  const addInterchangeMarker = lineNumber === 0 || lineNumber === 3;

  return [
    // Flagstaff
    straight(flagstaffPos.horizontalDistanceTo(melbourneCentralPos)),
    ...(addInterchangeMarker
      ? [interchangeMarker({ id: MELBOURNE_CENTRAL })]
      : []),
    straight(
      melbourneCentralPos.horizontalDistanceTo(parliamentPos).minus(radius),
    ),
    curve({ radius: radius, angle: 90 }),
    straight(
      parliamentPos.verticalDistanceTo(melbourneCentralPos).minus(radius),
    ),
    // Parliament
  ];
}
