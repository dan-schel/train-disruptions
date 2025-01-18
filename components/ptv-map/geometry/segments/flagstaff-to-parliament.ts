import { MELBOURNE_CENTRAL } from "../../../../server/data/station-ids";
import { curve, interchangeMarker, Path, straight } from "../../lib/geometry";
import * as loop from "../utils-city-loop";

/** Underground city loop section from Flagstaff to Parliament. */
export function flagstaffToParliament(lineNumber: loop.LineNumber): Path[] {
  const flagstaffPos = loop.pos.flagstaff(lineNumber);
  const melbourneCentralPos = loop.pos.melbourneCentral(lineNumber);
  const parliamentPos = loop.pos.parliament(lineNumber);

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
