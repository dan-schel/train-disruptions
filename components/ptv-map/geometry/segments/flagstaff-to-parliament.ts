import { MELBOURNE_CENTRAL } from "../../../../server/data/station-ids";
import { Path } from "../../lib/path";
import * as loop from "../utils-city-loop";

/** Underground city loop section from Flagstaff to Parliament. */
export function flagstaffToParliament(lineNumber: loop.LineNumber): Path {
  const flagstaffPos = loop.pos.flagstaff(lineNumber);
  const melbourneCentralPos = loop.pos.melbourneCentral(lineNumber);
  const parliamentPos = loop.pos.parliament(lineNumber);

  const radius = loop.radius(lineNumber);

  const addInterchangeMarker = lineNumber === 0 || lineNumber === 3;

  let result = new Path().straight(
    flagstaffPos.horizontalDistanceTo(melbourneCentralPos),
  );

  if (addInterchangeMarker) {
    result = result.interchange(MELBOURNE_CENTRAL);
  } else {
    result = result.station(MELBOURNE_CENTRAL);
  }

  return result
    .straight(
      melbourneCentralPos.horizontalDistanceTo(parliamentPos).minus(radius),
    )
    .curve(radius, 90)
    .straight(
      parliamentPos.verticalDistanceTo(melbourneCentralPos).minus(radius),
    );
}
